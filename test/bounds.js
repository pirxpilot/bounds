const test = require('node:test');

const Bounds = require('../index.js');

function numcmp(a, b) {
  return a - b;
}

function numdistance(a, b) {
  return Math.abs(a - b);
}

function strcmp(a, b) {
  return a < b ? -1 : a > b ? 1 : 0;
}

test('should consider all values as valid if no min/max specified', t => {
  const b = new Bounds();
  t.assert.ok(!b.before(2));
  t.assert.ok(!b.after(5));
  t.assert.ok(b.in(2002));
  t.assert.ok(!b.out(15));
});

test('should consider values inside of the range as valid', t => {
  const b = new Bounds().compare(numcmp).min(-2).max(15);
  t.assert.ok(b.before(-3));
  t.assert.ok(b.out(-3));
  t.assert.ok(b.in(-2));
  t.assert.ok(b.in(0));
  t.assert.ok(b.in(15));
  t.assert.ok(b.out(16));
  t.assert.ok(b.after(17));
  t.assert.equal(b.min(), -2);
  t.assert.equal(b.max(), 15);
});

test('should consider values outside of the range as valid, when reversed', t => {
  const b = new Bounds().compare(numcmp).max(-2).min(15);
  t.assert.ok(b.valid(-3));
  t.assert.ok(b.valid(-2));
  t.assert.ok(b.invalid(0));
  t.assert.ok(b.valid(15));
  t.assert.ok(b.valid(16));
});

test('should work if only min is specified', t => {
  const b = new Bounds().compare(strcmp).min('abc');
  t.assert.ok(!b.valid('aac'));
  t.assert.ok(b.valid('abc'));
  t.assert.ok(b.valid('ade'));
});

test('should work if only max is specified', t => {
  const b = new Bounds().compare(strcmp).max('abc');
  t.assert.ok(b.valid('aac'));
  t.assert.ok(b.valid('abc'));
  t.assert.ok(!b.valid('ade'));
});

test('should restrict values to min or max', t => {
  const b = new Bounds().compare(strcmp).min('abc').max('pqrs');

  t.assert.equal('pqrs', b.restrict('z'));
  t.assert.equal('abc', b.restrict('a'));
  t.assert.equal('bef', b.restrict('bef'));
  t.assert.equal('pqrs', b.restrict('pqrs'));
});

test('should restrict reverse ranges to min or max', t => {
  const b = new Bounds().compare(strcmp).max('abc').min('pqrs');

  t.assert.equal('z', b.restrict('z'));
  t.assert.equal('a', b.restrict('a'));
  t.assert.equal('pqrs', b.restrict('pqrs'));
});

test('should restrict to min or max depending on the distance', t => {
  const b = new Bounds().distance(numdistance).compare(numcmp).max(-2).min(15);

  t.assert.equal(-2, b.restrict(-2));
  t.assert.equal(-2, b.restrict(0));
  t.assert.equal(15, b.restrict(13));
  t.assert.equal(15, b.restrict(15));
});

test('should reset reversed state', t => {
  const b = new Bounds();

  t.assert.ok(!b.reversed());

  b.compare(numcmp);
  t.assert.ok(!b.reversed());

  b.min(3);
  t.assert.ok(!b.reversed());

  b.max(10);
  t.assert.ok(!b.reversed());

  b.min(13);
  t.assert.ok(b.reversed());

  b.min(undefined);
  t.assert.ok(!b.reversed());

  b.min(13);
  t.assert.ok(b.reversed());

  b.max(undefined);
  t.assert.ok(!b.reversed());
});
