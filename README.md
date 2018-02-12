angular-perfect-scrollbar
=========================

This is a small directive to allow the use of [perfect-scrollbar](https://github.com/utatti/perfect-scrollbar) in AngularJS.

You can just use one of the files (in the *src* directory) as they are - you only need to pay attention to the other stuff for further development. It is also available from [Bower](http://bower.io) as 'angular-perfect-scrollbar'.


Installation
------------

Install via Bower:

```shell
$ bower install angular-perfect-scrollbar --save
```

Include the angular-perfect-scrollbar files in your index.html:

```html
<link href="bower_components/utatti-perfect-scrollbar/css/perfect-scrollbar.css" rel="stylesheet" />
<script src="bower_components/utatti-perfect-scrollbar/dist/perfect-scrollbar.js"></script>
<script src="bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js"></script>
```

---

Install via NPM:

```shell
$ npm install angular-perfect-scrollbar perfect-scrollbar --save
```

Import angular-perfect-scrollbar files in your JavaScript:

```js
import 'angular-perfect-scrollbar';
```

Webpack configuration:

```js
plugins: [
    new webpack.ProvidePlugin({
        'angular': 'angular',
        'PerfectScrollbar': ['perfect-scrollbar', 'default']
    })
]
```

Usage
-----

Inject the module into your app or component:

```js
['perfect_scrollbar']
```

Add some basic CSS for your scrollable content to your stylesheet:

```css
.scroller {
    position: relative; /* relative or absolute positioning required by Perfect Scrollbar */
    max-height: 500px;  /* height must be limited to induce scrolling behavior */
}
```

Include the directive in your markup:

```html
<perfect-scrollbar class="scroller" wheel-propagation="true" wheel-speed="10" min-scrollbar-length="20">
  <!-- Your content here. -->
</perfect-scrollbar>
```

Further installation and usage hints can be found at https://github.com/utatti/perfect-scrollbar.

You can find simple vertical and horizontal examples in the *examples* folder in this repository.  Much respect to [Hyunje Jun](https://github.com/utatti) for his great scrollbar library.

Would you like to be a co-maintainer?
-------------------------------------

Please [email me](https://github.com/itsdrewmiller).


Just for Angular
=========================
Rebuild the scrollbar on $broadcast events:

```html
<perfect-scrollbar class="scroller" update-on="rebuild:scrollbar" wheel-propagation="true" wheel-speed="10" min-scrollbar-length="20">
  // your content
</perfect-scrollbar>
```

In your controller:

````
$scope.$broadcast("rebuild:scrollbar");
````

License
-------

The MIT License (MIT) Copyright (c) 2013, 2014 Drew Miller and other contributors.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
