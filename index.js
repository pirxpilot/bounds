module.exports = Bounds;

function Bounds(obj) {
  if (obj) return mixin(obj);
}

function mixin(obj) {
  for (var key in Bounds.prototype) {
    obj[key] = Bounds.prototype[key];
  }
  return obj;
}

Bounds.prototype.compare = function(fn) {
  this._compare = fn;
  return this;
};

Bounds.prototype.min = function(v) {
  this._min = v;
  return this;
};

Bounds.prototype.max = function(v) {
  this._max = v;
  return this;
};

Bounds.prototype.before = function(v) {
  return this._min && (this._compare(v, this._min) < 0);
};

Bounds.prototype.after = function(v) {
  return this._max && (this._compare(v, this._max) > 0);
};

Bounds.prototype.invalid =
Bounds.prototype.out = function(v) {
  return this.before(v) || this.after(v);
};

Bounds.prototype.valid =
Bounds.prototype.in = function(v) {
  return !this.out(v);
};

