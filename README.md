angular-perfect-scrollbar
=========================

This is a small directive to allow the use of perfect-scrollbar (https://github.com/noraesae/perfect-scrollbar) in angular.

You can just use the file (in the *src* directory) as is - you only need to pay attention to the other stuff for further development.

Install
=========================

Some small installation hints which will help you to set things up.

Install via Bower:

````
$ bower install angular-perfect-scrollbar --save
```

Include the angular-perfect-scrollbar files in your index.html:

````
<link rel="stylesheet" href="bower_components/perfect-scrollbar/min/perfect-scrollbar.min.css" />
<script src="bower_components/perfect-scrollbar/min/perfect-scrollbar.min.js"></script>
<script src="bower_components/perfect-scrollbar/min/perfect-scrollbar.with-mousewheel.min.js"></script>
<script src="bower_components/angular-perfect-scrollbar/src/angular-perfect-scrollbar.js"></script>
```

Include some css for your scrollable content:

````
.scroller {
    white-space: pre-line;
    height: 500px;
    overflow-y: hidden;
    position: relative;
}
````

Add it as module to your app.js:

````
['perfect_scrollbar']
````

Use it wherever you want:

<perfect-scrollbar class="scroller" wheel-propagation="true" wheel-speed="10" min-scrollbar-length="20">
  // your content
</perfect-scrollbar

Furhter installation and usage hints you can find here:
https://github.com/noraesae/perfect-scrollbar

Additionaly you will find a setup in the example folder of this repository.
