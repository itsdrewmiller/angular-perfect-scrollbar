angular
    .module('perfect_scrollbar', [])
    .directive('perfectScrollbar', ['$parse', '$window', '$perfectScrollBarService', function ($parse, $window, $perfectScrollBarService) {
      var psOptions = [
        'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'maxScrollbarLength', 'useBothWheelAxes',
        'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
        'scrollYMarginOffset', 'includePadding', 'onScroll'
      ];

      return {
        restrict: 'EA',
        transclude: true,
        template: '<div><div ng-transclude></div></div>',
        replace: true,
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
                })
              })
            });
          });

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
          $elem.bind('mouseenter', update('mouseenter'));

          // Possible future improvement - check the type here and use the appropriate watch for non-arrays
          if ($attr.refreshOnChange) {
            $scope.$watchCollection($attr.refreshOnChange, function () {
              update();
            });
          }

          // this is from a pull request - I am not totally sure what the original issue is but seems harmless
          if ($attr.refreshOnResize) {
            jqWindow.on('resize', update);
          }

          $elem.bind('$destroy', function () {
            jqWindow.off('resize', update);
            $elem.perfectScrollbar('destroy');
          });

          // It might be helpful when 'link function' invoked, but content had hidden (e.g. dropdown),
          // and so scrollbar doesn't appear for first time on hover because of zero sizes
          $perfectScrollBarService.subscribe($scope, 'update-perfect-scrollbar', function () {
            setTimeout(function(){ $elem.perfectScrollbar('update') }, 0);
          });
        }
      };
    }])
    .factory('$perfectScrollBarService', ['$rootScope', function($rootScope){
      function subscribe(scope, name, callback) {
        var handler = $rootScope.$on(name, callback);
        scope.$on('$destroy', handler);
      }

      function notify(name) {
        $rootScope.$emit(name);
      }

      return {
        subscribe: subscribe,
        notify: notify
      };
    }])
;
