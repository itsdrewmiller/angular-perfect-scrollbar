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
        'swipeEasing',
        'minScrollbarLength',
        'maxScrollbarLength',
        'scrollingThreshold',
        'useBothWheelAxes',
        'suppressScrollX',
        'suppressScrollY',
        'scrollXMarginOffset',
        'scrollYMarginOffset',
    ];

    return {
      restrict: 'E',
      transclude: true,
      template: '<div><div ng-transclude></div></div>',
      replace: true,
      //
      link: function ($scope, $elem, $attr) {
        var jqWindow = angular.element($window);
        var options = {};
        var perfect;

        for (var i = 0, l = psOptions.length; i < l; i++) {
          var opt = psOptions[i];

          if ($attr[opt] !== undefined) {
            options[opt] = $parse($attr[opt])();
          }
        }

        $scope.$evalAsync(function () {
          perfect = new PerfectScrollbar($elem[0], options);
          var onScrollHandler = $parse($attr.onScroll);

          $elem.on('scroll', function () {
            var scrollTop = $elem.prop('scrollTop');
            var scrollHeight = $elem.prop('scrollHeight') - $elem[0].clientHeight;
            var scrollLeft = $elem.prop('scrollLeft');
            var scrollWidth = $elem.prop('scrollWidth') - $elem[0].clientWidth;

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
                $elem[0].scrollTop = $elem.prop("scrollHeight");
              }, 100);
            }

            perfect.update();
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

        if($attr.updateOn) {
            $attr.updateOn.split(' ').forEach(function (eventName) {
                $scope.$on(eventName, update);
            });
        }

        // Unbind resize event and destroy instance
        $elem.on('$destroy', function () {
          jqWindow.off('resize', function () {
            update();
          });

          perfect.destroy();
          perfect = null;
        });
      }
    };
}]);
