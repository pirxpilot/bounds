
# bounds

  Mixin for checking if value is inside or outside of bounds You can use `Bounds` for any objects for
  which you can define compare function (dates, vectors etc.)

  In addition to regular range checking `Bounds` supports reversed ranges: if
  min is bigger than max it considers values outside ot the max, min range as valid.

## Installation

    $ component install code42day/bounds

or

    $ npm install bounds

## API

###	.compare(fn)

Sets comparison function. `fn` should take 2 arguments and behave like sort comparison function i.e.
return 0 if items are equal, -1 if the first is smaller than the second, 1 is the first is bigger
than the second.

### .min(v)

Set lower bound (inclusive) to `v`

### .max(v)

Set upper bound (inclusive) to `v`

### .in(v)

Return `true` if `v` is in bounds i.e. `min <= v <= max`

### .out(v)

Return `true` if `v` is outside of bounds i.e. `v < min` OR `max < v`

### .before(v)

Return `true` if `v < min`

### .after(v)

Return `true` if `v > max`

### .valid(v)

For regular ranges it's the same as `in`. For reversed ranges it considers as valid values that are
outside of the range (it's still inclusive so `min` and `max` are still considered valid)

### .restrict(v)

Returns the passed value for `valid` values. For invalid values returns the closest boundary (`min`
or `max`). `restrict` only works for reverse ranges if `distance` function is defined.

###	.distance(fn)

Optional distance function: it's only used when calculating proper restriction for reversed ranges.
If restricted value is closed to `min` than to `max`, then the `min` is returned.

## License

  MIT
