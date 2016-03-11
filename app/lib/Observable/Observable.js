class Observable {

  _observers(observable, event) {
    if (!observable.observers) {
      /*eslint no-param-reassign:1*/
      observable.observers = {};
    }

    if (!observable.observers[event]) {
      /*eslint no-param-reassign:1*/
      observable.observers[event] = [];
    }

    return observable.observers[event];
  }

  observe(event, observer) {
    if (typeof observer !== 'function') {
      throw new TypeError('Argument should be a Function');
    }

    this._observers(this, event).push(observer);
  }

  hasObserver(event, obs) {
    const observers = this._observers(this, event);
    for (let i = 0, l = observers.length; i < l; i++) {
      if (observers[i] === obs) {
        return true;
      }
    }

    return false;
  }

  notify(event) {
    const observers = this._observers(this, event);
    /*eslint prefer-rest-params:1*/
    const args = Array.prototype.slice.call(arguments, 1);

    for (let i = 0, l = observers.length; i < l; i++) {
      try {
        observers[i].apply(this, args);
      } catch (e) {
        console.log('ERROR => ' + e.message);
      }
    }
  }
}
export
default Observable;
