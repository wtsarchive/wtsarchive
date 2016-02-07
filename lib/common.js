/*
 * lib/common.js
 * Global utility methods for both client and server
 */

// Returning a translated string
__ = function(id, args) {
    var string = Strings.findOne({id: SHA256(id).slice(32)});
    if (!string) {
      setTimeout(function() {
        Meteor.call("addString", id);
      }, 1000);
    }

    var result = string ? string.text : id;

    // I18n support
    if (Meteor.isClient && Session.get("language")) {
        var lang = Session.get("language");
        if (typeof(string) != "undefined") {
            var localized = _.find(string.i18n, function(s) { return s.language == lang; });
            if (localized && localized.text) {
                result = localized.text;
            }
        }
    }

    if (typeof(args) != "undefined" && args.length > 0) {
        result = s.sprintf.apply(null, [result].concat(args));
    }

    return result;
};

// Source: http://www.curtismlarson.com/blog/2015/05/04/meteor-ironrouter-waitOn-server/

Util = {};

// We need to store the dep, ready flag, and data for each call
Util.d_waitOns = {};

// This function returns a handle with a reactive ready function, which
// is what waitOn expects. waitOn will complete when the reactive function
// returns true.
Util.waitOnServer = function(name) {
  console.log("waitOnServer init", name);
  // This prevents the waitOnServer call from being called multiple times
  // and the resulting infinite loop.
  if (this.d_waitOns[name] !== undefined) {
    return;
  }
  else {
    console.log("waitOnServer reset", name);
    this.d_waitOns[name] = {};
  }
  var self = this;
  // We need to store the dependency and the ready flag.
  this.d_waitOns[name].dep = new Deps.Dependency();
  this.d_waitOns[name].ready = false;
  console.log("waitOnServer new dep set", name);

  var callback = function(err, or) {
    // The call has complete, so set the ready flag, notify the reactive
    // function that we are ready, and store the data.
    console.log("waitOnServer callback", name);
    self.d_waitOns[name].ready = true;
    self.d_waitOns[name].dep.changed();
    self.d_waitOns[name].data = (err || or);
  };

  var args = Array.prototype.slice.call(arguments);
  args.push(callback);

  Meteor.call.apply(this, args);

  // The reactive handle that we are returning.
  var handle = {
    ready: function() {
      console.log("waitOnServer ready", name);
      self.d_waitOns[name].dep.depend();
      return self.d_waitOns[name].ready;
    }
  };
  return handle;
};

// Retrieve the data that we stored in the async callback.
Util.getResponse = function(name) {
  var data = this.d_waitOns[name].data;
  // Clear out the data so a second call with the same name wont return
  // the same data.
  delete this.d_waitOns[name];
  return data;
};

// Monkey-patch SubsManager to return proper ready status
SubsManager.prototype.ready = function() {
  this.dep.depend();
  return this._ready;
};

SubsManager.prototype._registerComputation = function() {
  var self = this;
  var computation = Deps.autorun(function() {
    self._applyExpirations();
    self._applyCacheLimit();

    var ready = self._cacheList.length !== 0;
    _.each(self._cacheList, function(sub) {
      sub.ready = Meteor.subscribe.apply(Meteor, sub.args).ready();
      ready = ready && sub.ready;
    });

    if(ready) {
      self._ready = true;
      self._notifyChanged();
    }
  });

  return computation;
};
