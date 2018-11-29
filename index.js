const clone = require('clone-component');

class Bounds {

  static mixin(obj) {
    for (const key in Bounds.prototype) {
      obj[key] = Bounds.prototype[key];
    }
    return obj;
  }

  compare(fn) {
    this._compare = fn;
    return this;
  }

  distance(fn) {
    this._distance = fn;
    return this;
  }

  min(v) {
    if (!arguments.length) {
      return this._min;
    }
    this._min = v;
    delete this._reversed;
    return this;
  }

  max(v) {
    if (!arguments.length) {
      return this._max;
    }
    this._max = v;
    delete this._reversed;
    return this;
  }

  before(v) {
    return this._min && (this._compare(v, this._min) < 0);
  }

  after(v) {
    return this._max && (this._compare(v, this._max) > 0);
  }

  out(v) {
    return this.before(v) || this.after(v);
  }

  in(v) {
    return !this.out(v);
  }

  valid(v) {
    if (this.reversed()) {
      return !this.after(v) || !this.before(v);
    }
    return this.in(v);
  }

  invalid(v) {
    return !this.valid(v);
  }

  reversed() {
    if (this._reversed === undefined) {
      this._reversed = calculateReversed(this);
    }
    return this._reversed;
  }

  restrict(v) {
    if (this.reversed()) {
      if(this.after(v) && this.before(v)) {
        // select closer bound
        return (this._distance(this._max, v) < this._distance(v, this._min)) ?
          clone(this._max) :
          clone(this._min);
      }
      return v;
    }
    if(this.before(v)) {
      return clone(this._min);
    }
    if(this.after(v)) {
      return clone(this._max);
    }
    return v;
  }
}

function calculateReversed(self) {
  return self._min && self._max && self.before(self._max);
}

module.exports = Bounds;
