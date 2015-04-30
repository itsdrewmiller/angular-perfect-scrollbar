angular.module('perfect_scrollbar', []).directive('perfectScrollbar',
  ['$parse', '$window', function($parse, $window) {
    return {
      restrict: 'EA',
      transclude: true,
      template: '<div><div ng-transclude></div></div>',
      replace: true,
      link: function($scope, $elem, $attr) {
        var el = $elem[0];
        var jqWindow = angular.element($window);
        var options = {
          wheelSpeed: 1,
          wheelPropagation: true,
          minScrollbarLength: 20
        };

        $scope.$evalAsync(function() {
          Ps.initialize(el, options);
          var onScrollHandler = $parse($attr.onScroll);
          $elem.scroll(function(){
            var scrollTop = $elem.scrollTop();
            var scrollHeight = $elem.prop('scrollHeight') - $elem.height();
            $scope.$apply(function() {
              onScrollHandler($scope, {
                scrollTop: scrollTop,
                scrollHeight: scrollHeight
              })
            })
          });
        });

        function update(event) {
          $scope.$evalAsync(function() {
            if ($attr.scrollDown == 'true' && event != 'mouseenter') {
              setTimeout(function () {
                $($elem).scrollTop($($elem).prop("scrollHeight"));
              }, 100);
            }
            Ps.update(el);
          });
        }

        // This is necessary when you don't watch anything with the scrollbar
        $elem.bind('mouseenter', function() {update('mouseenter')});

        // Possible future improvement - check the type here and use the appropriate watch for non-arrays
        if ($attr.refreshOnChange) {
          $scope.$watchCollection($attr.refreshOnChange, function() {
            update();
          });
        }

        // this is from a pull request - I am not totally sure what the original issue is but seems harmless
        if ($attr.refreshOnResize) {
          jqWindow.on('resize', update);
        }

        $elem.bind('$destroy', function() {
          jqWindow.off('resize', update);
          Ps.destroy(el);
        });

      }
    };
  }]);
