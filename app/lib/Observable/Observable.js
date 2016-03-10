class Observable {

  _observers(observable, event) {
    if (!observable.observers) {
      observable.observers = {};
    }

    if (!observable.observers[event]) {
      observable.observers[event] = [];
    }

    return observable.observers[event];
  }

  observe(event, observer) {
    if (typeof observer !== 'function') {
      throw new TypeError('Argument should be a Function');
    }

    this._observers(this, event).push(observer);
  };

  hasObserver(event, obs) {
    let observers = this._observers(this, event);
    for (var i = 0, l = observers.length; i < l; i++) {
      if (observers[i] === obs) {
        return true;
      }
    }

    return false;
  };

  notify(event) {
    let observers = this._observers(this, event);
    let args = Array.prototype.slice.call(arguments, 1);

    for (var i = 0, l = observers.length; i < l; i++) {
      try {
        observers[i].apply(this, args);
      } catch (e) {
        console.log('ERROR => ' + e.message);
      }
    }
  };
}
export
default Observable;
