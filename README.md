<!--

@license Apache-2.0

Copyright (c) 2026 The Stdlib Authors.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

   http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.

-->


<details>
  <summary>
    About stdlib...
  </summary>
  <p>We believe in a future in which the web is a preferred environment for numerical computation. To help realize this future, we've built stdlib. stdlib is a standard library, with an emphasis on numerical and scientific computation, written in JavaScript (and C) for execution in browsers and in Node.js.</p>
  <p>The library is fully decomposable, being architected in such a way that you can swap out and mix and match APIs and functionality to cater to your exact preferences and use cases.</p>
  <p>When you use stdlib, you can be absolutely certain that you are using the most thorough, rigorous, well-written, studied, documented, tested, measured, and high-quality code out there.</p>
  <p>To join us in bringing numerical computing to the web, get started by checking us out on <a href="https://github.com/stdlib-js/stdlib">GitHub</a>, and please consider <a href="https://opencollective.com/stdlib">financially supporting stdlib</a>. We greatly appreciate your continued support!</p>
</details>

# gsorthpBy

[![NPM version][npm-image]][npm-url] [![Build Status][test-image]][test-url] [![Coverage Status][coverage-image]][coverage-url] <!-- [![dependencies][dependencies-image]][dependencies-url] -->

> Sort a strided array using heapsort according to a provided callback function.



<section class="usage">

## Usage

To use in Observable,

```javascript
gsorthpBy = require( 'https://cdn.jsdelivr.net/gh/stdlib-js/blas-ext-base-gsorthp-by@umd/browser.js' )
```

To vendor stdlib functionality and avoid installing dependency trees for Node.js, you can use the UMD server build:

```javascript
var gsorthpBy = require( 'path/to/vendor/umd/blas-ext-base-gsorthp-by/index.js' )
```

To include the bundle in a webpage,

```html
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/blas-ext-base-gsorthp-by@umd/browser.js"></script>
```

If no recognized module system is present, access bundle contents via the global scope:

```html
<script type="text/javascript">
(function () {
    window.gsorthpBy;
})();
</script>
```

#### gsorthpBy( N, x, strideX, clbk\[, thisArg] )

Sorts a strided array using heapsort according to a provided callback function.

```javascript
function clbk( a, b ) {
    if ( a < b ) {
        return -1;
    }
    if ( a > b ) {
        return 1;
    }
    return 0;
}

var x = [ 1.0, -2.0, 3.0, -4.0 ];

gsorthpBy( x.length, x, 1, clbk );
// x => [ -4.0, -2.0, 1.0, 3.0 ]
```

The function has the following parameters:

-   **N**: number of indexed elements.
-   **x**: input [`Array`][mdn-array] or [`typed array`][mdn-typed-array].
-   **strideX**: stride length.
-   **clbk**: callback function. The function should compare two values `a` and `b` and return a negative value if `a` should come before `b`, a positive value if `a` should come after `b`, and zero if `a` and `b` are equivalent.
-   **thisArg**: callback execution context (_optional_).

To set the callback execution context, provide a `thisArg`.

```javascript
function clbk( a, b ) {
    this.count += 1;
    if ( a > b ) {
        return -1;
    }
    if ( a < b ) {
        return 1;
    }
    return 0;
}

var context = {
    'count': 0
};

var x = [ 10.0, -1.0, 3.0, 50.0 ];

gsorthpBy( x.length, x, 1, clbk, context );
// x => [ 50.0, 10.0, 3.0, -1.0 ]

var cnt = context.count;
// returns 7
```

The `N` and stride parameters determine which elements in the strided array are accessed at runtime. For example, to sort every other element:

```javascript
function clbk( a, b ) {
    if ( a > b ) {
        return -1;
    }
    if ( a < b ) {
        return 1;
    }
    return 0;
}

var x = [ 1.0, -2.0, 3.0, -4.0 ];

gsorthpBy( 2, x, 2, clbk );
// x => [ 3.0, -2.0, 1.0, -4.0 ]
```

Note that indexing is relative to the first index. To introduce an offset, use [`typed array`][mdn-typed-array] views.

```javascript
var Float64Array = require( '@stdlib/array-float64' );

function clbk( a, b ) {
    if ( a < b ) {
        return -1;
    }
    if ( a > b ) {
        return 1;
    }
    return 0;
}

var x0 = new Float64Array( [ 1.0, -2.0, 3.0, -4.0 ] );
var x1 = new Float64Array( x0.buffer, x0.BYTES_PER_ELEMENT*1 ); // start at 2nd element

gsorthpBy( 2, x1, 2, clbk );
// x0 => <Float64Array>[ 1.0, -4.0, 3.0, -2.0 ]
```

#### gsorthpBy.ndarray( N, x, strideX, offsetX, clbk\[, thisArg] )

Sorts a strided array using heapsort according to a provided callback function and using alternative indexing semantics.

```javascript
function clbk( a, b ) {
    if ( a < b ) {
        return -1;
    }
    if ( a > b ) {
        return 1;
    }
    return 0;
}

var x = [ 1.0, -2.0, 3.0, -4.0 ];

gsorthpBy.ndarray( x.length, x, 1, 0, clbk );
// x => [ -4.0, -2.0, 1.0, 3.0 ]
```

The function has the following additional parameters:

-   **offsetX**: starting index.

While [`typed array`][mdn-typed-array] views mandate a view offset based on the underlying buffer, the offset parameter supports indexing semantics based on a starting index. For example, to access only the last three elements:

```javascript
function clbk( a, b ) {
    if ( a < b ) {
        return -1;
    }
    if ( a > b ) {
        return 1;
    }
    return 0;
}

var x = [ 1.0, -2.0, 3.0, -4.0, 5.0, -6.0 ];

gsorthpBy.ndarray( 3, x, 1, x.length-3, clbk );
// x => [ 1.0, -2.0, 3.0, -6.0, -4.0, 5.0 ]
```

</section>

<!-- /.usage -->

<section class="notes">

## Notes

-   If `N <= 0`, both functions return `x` unchanged.
-   Both functions support array-like objects having getter and setter accessors for array element access (e.g., [`@stdlib/array-base/accessor`][@stdlib/array/base/accessor]).
-   The algorithm has space complexity `O(1)` and time complexity `O(N log2 N)`.
-   The algorithm is **unstable**, meaning that the algorithm may change the order of strided array elements which are equal or equivalent.
-   The input strided array is sorted **in-place** (i.e., the input strided array is **mutated**).

</section>

<!-- /.notes -->

<section class="examples">

## Examples

<!-- eslint no-undef: "error" -->

```html
<!DOCTYPE html>
<html lang="en">
<body>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/random-array-discrete-uniform@umd/browser.js"></script>
<script type="text/javascript" src="https://cdn.jsdelivr.net/gh/stdlib-js/blas-ext-base-gsorthp-by@umd/browser.js"></script>
<script type="text/javascript">
(function () {

function clbk( a, b ) {
    if ( a > b ) {
        return -1;
    }
    if ( a < b ) {
        return 1;
    }
    return 0;
}

var x = discreteUniform( 10, -100, 100, {
    'dtype': 'float64'
});
console.log( x );

gsorthpBy( x.length, x, 1, clbk );
console.log( x );

})();
</script>
</body>
</html>
```

</section>

<!-- /.examples -->

* * *

<section class="references">

## References

-   Williams, John William Joseph. 1964. "Algorithm 232: Heapsort." _Communications of the ACM_ 7 (6). New York, NY, USA: Association for Computing Machinery: 347–49. doi:[10.1145/512274.512284][@williams:1964a].
-   Floyd, Robert W. 1964. "Algorithm 245: Treesort." _Communications of the ACM_ 7 (12). New York, NY, USA: Association for Computing Machinery: 701. doi:[10.1145/355588.365103][@floyd:1964a].

</section>

<!-- /.references -->

<!-- Section for related `stdlib` packages. Do not manually edit this section, as it is automatically populated. -->

<section class="related">

</section>

<!-- /.related -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->


<section class="main-repo" >

* * *

## Notice

This package is part of [stdlib][stdlib], a standard library for JavaScript and Node.js, with an emphasis on numerical and scientific computing. The library provides a collection of robust, high performance libraries for mathematics, statistics, streams, utilities, and more.

For more information on the project, filing bug reports and feature requests, and guidance on how to develop [stdlib][stdlib], see the main project [repository][stdlib].

#### Community

[![Chat][chat-image]][chat-url]

---

## License

See [LICENSE][stdlib-license].


## Copyright

Copyright &copy; 2016-2026. The Stdlib [Authors][stdlib-authors].

</section>

<!-- /.stdlib -->

<!-- Section for all links. Make sure to keep an empty line after the `section` element and another before the `/section` close. -->

<section class="links">

[npm-image]: http://img.shields.io/npm/v/@stdlib/blas-ext-base-gsorthp-by.svg
[npm-url]: https://npmjs.org/package/@stdlib/blas-ext-base-gsorthp-by

[test-image]: https://github.com/stdlib-js/blas-ext-base-gsorthp-by/actions/workflows/test.yml/badge.svg?branch=main
[test-url]: https://github.com/stdlib-js/blas-ext-base-gsorthp-by/actions/workflows/test.yml?query=branch:main

[coverage-image]: https://img.shields.io/codecov/c/github/stdlib-js/blas-ext-base-gsorthp-by/main.svg
[coverage-url]: https://codecov.io/github/stdlib-js/blas-ext-base-gsorthp-by?branch=main

<!--

[dependencies-image]: https://img.shields.io/david/stdlib-js/blas-ext-base-gsorthp-by.svg
[dependencies-url]: https://david-dm.org/stdlib-js/blas-ext-base-gsorthp-by/main

-->

[chat-image]: https://img.shields.io/badge/zulip-join_chat-brightgreen.svg
[chat-url]: https://stdlib.zulipchat.com

[stdlib]: https://github.com/stdlib-js/stdlib

[stdlib-authors]: https://github.com/stdlib-js/stdlib/graphs/contributors

[umd]: https://github.com/umdjs/umd
[es-module]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules

[deno-url]: https://github.com/stdlib-js/blas-ext-base-gsorthp-by/tree/deno
[deno-readme]: https://github.com/stdlib-js/blas-ext-base-gsorthp-by/blob/deno/README.md
[umd-url]: https://github.com/stdlib-js/blas-ext-base-gsorthp-by/tree/umd
[umd-readme]: https://github.com/stdlib-js/blas-ext-base-gsorthp-by/blob/umd/README.md
[esm-url]: https://github.com/stdlib-js/blas-ext-base-gsorthp-by/tree/esm
[esm-readme]: https://github.com/stdlib-js/blas-ext-base-gsorthp-by/blob/esm/README.md
[branches-url]: https://github.com/stdlib-js/blas-ext-base-gsorthp-by/blob/main/branches.md

[stdlib-license]: https://raw.githubusercontent.com/stdlib-js/blas-ext-base-gsorthp-by/main/LICENSE

[mdn-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array

[mdn-typed-array]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray

[@stdlib/array/base/accessor]: https://github.com/stdlib-js/array-base-accessor/tree/umd

[@williams:1964a]: https://doi.org/10.1145/512274.512284

[@floyd:1964a]: https://doi.org/10.1145/355588.365103

<!-- <related-links> -->

<!-- </related-links> -->

</section>

<!-- /.links -->
