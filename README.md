angular-perfect-scrollbar
=========================

This is a small directive to allow the use of [perfect-scrollbar](https://github.com/noraesae/perfect-scrollbar) in AngularJS.

You can just use one of the files (in the *src* directory) as they are - you only need to pay attention to the other stuff for further development. It is also available from [Bower](http://bower.io) as 'angular-perfect-scrollbar'.

Installation
------------

Install via Bower:

```shell
$ bower install angular-perfect-scrollbar --save
```

Include the angular-perfect-scrollbar files in your index.html:

```html
<link href="bower_components/perfect-scrollbar/css/perfect-scrollbar.min.css" rel="stylesheet" />
<script src="bower_components/perfect-scrollbar/js/perfect-scrollbar.jquery.min.js"></script>
<script src="bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js"></script>
```

Include some CSS for your scrollable content:

```css
.scroller {
    white-space: pre-line;
    height: 500px;
    overflow-y: hidden;
    position: relative;
}
```

Inject the module into your app or component:

```js
['perfect_scrollbar']
```

Use it wherever you want with the custom directive:

```html
<perfect-scrollbar class="scroller" wheel-propagation="true" wheel-speed="10" min-scrollbar-length="20">
  <!-- Your content here. -->
</perfect-scrollbar>
```

Further installation and usage hints can be found at https://github.com/noraesae/perfect-scrollbar.

You can find simple vertical and horizontal examples in the *examples* folder in this repository.  Much respect to [Hyunje Alex Jun](https://github.com/noraesae) for his great scrollbar library.

Would you like to be a co-maintainer?
-------------------------------------

Please [email me](https://github.com/itsdrewmiller).


License
-------

The MIT License (MIT) Copyright (c) 2013, 2014 Drew Miller and other contributors.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
