var Bounds = require('../index.js');
var assert = require('assert');


function numcmp(a, b) {
  return a - b;
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

  it('should consider dates inside of the range as valid', function(){
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
});
