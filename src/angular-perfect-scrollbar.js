var psOptions = [
    'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'useBothWheelAxes',
    'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
    'scrollYMarginOffset', 'includePadding'//, 'onScroll', 'scrollDown'
];

angular
    .module('perfect_scrollbar', [])
    .directive('perfectScrollbar', ['$parse', '$window', perfectScrollbar]);


function perfectScrollbar($parse, $window) {
    return {
        restrict: 'EA',
        transclude: true,
        template: '<div><div ng-transclude></div></div>',
        replace: true,
        link: function perfectScrollbarLink($scope, $elem, $attr) {
            var jqWindow = angular.element($window);
            var options = {};

            var updateResize = updateOfReason('resize');
            var updateMouseEnter = updateOfReason('mouseenter');
            var updateChange = updateOfReason('change');
            var updateChangeDelayed = function () {
                setTimeout(updateChange, 150);
            };

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
                    $scope.$apply(function () {
                        onScrollHandler($scope, {
                            scrollTop: scrollTop,
                            scrollHeight: scrollHeight
                        })
                    })
                });
            });


            // Possible future improvement - check the type here and use the appropriate watch for non-arrays
            if ($attr.refreshOnChange) {
                $scope.$watchCollection($attr.refreshOnChange, updateChangeDelayed);
            } else {
                $scope.$watch(function () {
                    return $elem.children('[ng-transclude]').prop('scrollHeight');
                }, updateChange);
            }

            // This is necessary when you don't watch anything with the scrollbar
            $elem.on('mouseenter', updateMouseEnter);

            jqWindow.on('resize', updateResize);

            $elem.on('$destroy', function () {
                jqWindow.off('resize', updateResize);
                $elem.perfectScrollbar('destroy');
            });


            function update(event) {
                $scope.$evalAsync(function () {
                    if ($attr.scrollDown == 'true' && event != 'mouseenter') {
                        setTimeout(function () {
                            $elem.scrollTop($elem.prop("scrollHeight"));
                        }, 100);
                    }
                    $elem.perfectScrollbar('update');
                });
            }

            function updateOfReason(eventName) {
                return function () {
                    update(eventName);
                };
            }


        }

    };
}
