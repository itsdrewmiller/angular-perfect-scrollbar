angular.module('perfect_scrollbar', []).directive('perfectScrollbar',
    ['$parse', '$window', function($parse, $window) {
  var psOptions = [
    'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'useBothWheelAxes',
    'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
    'scrollYMarginOffset', 'includePadding'
  ];

  return {
    restrict: 'E',
    transclude: true,
    template: '<div><div ng-transclude></div></div>',
    replace: true,
    link: function($scope, $elem, $attr) {
      function updateScrollbar() {
          $scope.$evalAsync(function() {
              $elem.perfectScrollbar('update');
          });
      }

      var options = {};
      var jqWindow = angular.element($window);

      for (var i=0, l=psOptions.length; i<l; i++) {
        var opt = psOptions[i];
        if ($attr[opt] != undefined) {
          options[opt] = $parse($attr[opt])();
        }
      }

      $elem.perfectScrollbar(options);

      if ($attr.refreshOnChange) {
        $scope.$watchCollection($attr.refreshOnChange, updateScrollbar);
      }

      if ($attr.refreshOnResize) {
          jqWindow.on('resize', updateScrollbar);
      }

      $elem.bind('$destroy', function() {
          jqWindow.off('resize', updateScrollbar);
          $elem.perfectScrollbar('destroy');
      });
    }
  };
}]);
