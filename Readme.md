
# bounds

  Mixin for checking if value is inside or outside of bounds
  You can use Bounds for any objects for which you can define compare function (dates, vectors etc.)

## Installation

    $ component install code42day/bounds

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

### .before

Return `true` if `v < min`

### .after

Return `true` if `v > max`

## License

  MIT
