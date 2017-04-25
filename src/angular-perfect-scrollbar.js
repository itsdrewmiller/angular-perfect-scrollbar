/*
 * Angular Perfect scrollbar
 * Version 0.1.0
 * https://github.com/itsdrewmiller/angular-perfect-scrollbar
 */

angular
  .module('perfect_scrollbar', [])

  .directive('perfectScrollbar', ['$parse', '$window', function ($parse, $window) {
    var psOptions = [
        'handlers',
        'wheelSpeed',
        'wheelPropagation',
        'swipePropagation',
        'minScrollbarLength',
        'maxScrollbarLength',
        'useBothWheelAxes',
        'useKeyboard',
        'suppressScrollX',
        'suppressScrollY',
        'scrollXMarginOffset',
        'scrollYMarginOffset',
        'theme'
    ];

    return {
      restrict: 'EA',
      transclude: true,
      template: '<div><div ng-transclude></div></div>',
      replace: true,
      //
      link: function ($scope, $elem, $attr) {
        var jqWindow = angular.element($window);
        var options = {};

        for (var i = 0, l = psOptions.length; i < l; i++) {
          var opt = psOptions[i];

          if ($attr[opt] !== undefined) {
            options[opt] = $parse($attr[opt])();
          }
        }

        $scope.$evalAsync(function () {
          $elem.perfectScrollbar(options);
          var onScrollHandler = $parse($attr.onScroll);

          $elem.scroll(function () {
            var scrollTop = $elem.scrollTop();
            var scrollHeight = $elem.prop('scrollHeight') - $elem.height();
            var scrollLeft = $elem.scrollLeft();
            var scrollWidth = $elem.prop('scrollWidth') - $elem.width();

            $scope.$apply(function () {
              onScrollHandler($scope, {
                scrollTop: scrollTop,
                scrollHeight: scrollHeight,
                scrollLeft: scrollLeft,
                scrollWidth: scrollWidth
              });
            });
          });
        });

        // Automatically update when content height changes
        $scope.$watch(function () {
          return $elem.prop('scrollHeight');
        }, function (newValue, oldValue) {
          if (newValue) {
            update('contentSizeChange');
          }
        });

        function update(event) {
          $scope.$evalAsync(function () {
            if ($attr.scrollDown == 'true' && event != 'mouseenter') {
              setTimeout(function () {
                $($elem).scrollTop($($elem).prop("scrollHeight"));
              }, 100);
            }

            $elem.perfectScrollbar('update');
          });
        }

        // This is necessary when you don't watch anything with the scrollbar
        $elem.on('mouseenter', function () {
          update('mouseenter');
        });

        // Possible future improvement: check the type here and use the appropriate watch for non-arrays
        if ($attr.refreshOnChange) {
          $scope.$watchCollection($attr.refreshOnChange, function () {
            update();
          });
        }

        // Rebuild on window resize
        if ($attr.refreshOnResize) {
          jqWindow.on('resize', function () {
            update();
          });
        }

        // Unbind resize event and destroy instance
        $elem.on('$destroy', function () {
          jqWindow.off('resize', function () {
            update();
          });

          $elem.perfectScrollbar('destroy');
        });
      }
    };
}]);
