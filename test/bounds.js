var Bounds = require('../index.js');
var assert = require('assert');


function numcmp(a, b) {
  return a - b;
}

function numdistance(a, b) {
  return Math.abs(a - b);
}

function strcmp(a, b) {
  return (a < b) ? -1 : (a > b ? 1 : 0);
}

describe('Bounds', function(){
  it('should consider all values as valid if no min/max specified', function(){
    var b = new Bounds();
    assert.ok(!b.before(2));
    assert.ok(!b.after(5));
    assert.ok(b.in(2002));
    assert.ok(!b.out(15));
  });

  it('should consider values inside of the range as valid', function(){
    var b = new Bounds()
      .compare(numcmp)
      .min(-2)
      .max(15);
    assert.ok(b.before(-3));
    assert.ok(b.out(-3));
    assert.ok(b.in(-2));
    assert.ok(b.in(0));
    assert.ok(b.in(15));
    assert.ok(b.out(16));
    assert.ok(b.after(17));
    assert.equal(b.min(), -2);
    assert.equal(b.max(), 15);
  });

  it('should consider values outside of the range as valid, when reversed', function(){
    var b = new Bounds()
      .compare(numcmp)
      .max(-2)
      .min(15);
    assert.ok(b.valid(-3));
    assert.ok(b.valid(-2));
    assert.ok(b.invalid(0));
    assert.ok(b.valid(15));
    assert.ok(b.valid(16));
  });

  it('should work if only min is specified', function(){
    var b = new Bounds()
      .compare(strcmp)
      .min('abc');
    assert.ok(!b.valid('aac'));
    assert.ok(b.valid('abc'));
    assert.ok(b.valid('ade'));
  });

  it('should work if only max is specified', function(){
    var b = new Bounds()
      .compare(strcmp)
      .max('abc');
    assert.ok(b.valid('aac'));
    assert.ok(b.valid('abc'));
    assert.ok(!b.valid('ade'));
  });

  it('should restrict values to min or max', function() {
    var b = new Bounds()
      .compare(strcmp)
      .min('abc')
      .max('pqrs');

    assert.equal('pqrs', b.restrict('z'));
    assert.equal('abc', b.restrict('a'));
    assert.equal('bef', b.restrict('bef'));
    assert.equal('pqrs', b.restrict('pqrs'));
  });

  it('should restrict reverse ranges to min or max', function() {
    var b = new Bounds()
      .compare(strcmp)
      .max('abc')
      .min('pqrs');

    assert.equal('z', b.restrict('z'));
    assert.equal('a', b.restrict('a'));
    assert.equal('pqrs', b.restrict('pqrs'));
  });


  it('should restrict to min or max depending on the distance', function(){
    var b = new Bounds()
      .distance(numdistance)
      .compare(numcmp)
      .max(-2)
      .min(15);

    assert.equal(-2, b.restrict(-2));
    assert.equal(-2, b.restrict(0));
    assert.equal(15, b.restrict(13));
    assert.equal(15, b.restrict(15));
  });


});
