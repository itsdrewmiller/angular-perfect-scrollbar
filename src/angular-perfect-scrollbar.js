angular.module('perfect_scrollbar', []).directive('perfectScrollbar', ['$parse', function($parse) {
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
      var options = {};
      
      for (var i=0, l=psOptions.length; i<l; i++) {
        var opt = psOptions[i];
        if ($attr[opt] != undefined) {
          options[opt] = $parse($attr[opt])();
        }
      }
      
      $elem.perfectScrollbar(options);

      if ($attr.refreshOnChange) {
        $scope.$watchCollection($attr.refreshOnChange, function() {
          $scope.$evalAsync(function() {
            $elem.perfectScrollbar('update');
          });
        });
      }
      
      $elem.bind('$destroy', function() {
        $elem.perfectScrollbar('destroy');
      });
    }
  };
}]);
