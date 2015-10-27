angular.module('perfect_scrollbar', []).directive('perfectScrollbar',
  ['$parse', '$window', '$timeout', function($parse, $window, $timeout) {
  var psOptions = [
    'wheelSpeed', 'wheelPropagation', 'minScrollbarLength', 'useBothWheelAxes',
    'useKeyboard', 'suppressScrollX', 'suppressScrollY', 'scrollXMarginOffset',
    'scrollYMarginOffset', 'includePadding'//, 'onScroll', 'scrollDown'
  ];

  return {
    restrict: 'EA',
    transclude: true,
    template: '<div><div ng-transclude></div></div>',
    replace: true,
    link: function($scope, $elem, $attr) {
      var jqWindow = angular.element($window);
      var options = {};

      for (var i=0, l=psOptions.length; i<l; i++) {
        var opt = psOptions[i];
        if ($attr[opt] !== undefined) {
          options[opt] = $parse($attr[opt])();
        }
      }

      $scope.$evalAsync(function() {
        $elem.perfectScrollbar(options);
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
            $timeout(function () {
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
        $scope.$watchCollection($attr.refreshOnChange, function() {
          update();
        });
      }

      // an array(model) can be provided so on change of that array, the scroll bar is updated
      /* say i have a list of users and i click on a button that loads more users, now the content is updated but the scroll bar won't until
         update is triggered
      */
      var arrayModel = $scope.$eval($attr.arrayModel); //get arrayModel string from attribute 'array-model'
      var modelString = $attr.arrayModel;
      if(arrayModel && modelString){   //model string can be 'userArray' or say 'myModel.users.array'
        $scope.$watch(modelString,function(newV,oldV){
          if(newV && !angular.equals(newV,oldV)){
            $timeout(function(){   //$timeout is used because updating might collide with the angular $digest cycle
              $elem.perfectScrollbar('update');
            },100);
          }
        });
      }

      // this is from a pull request - I am not totally sure what the original issue is but seems harmless
      if ($attr.refreshOnResize) {
        jqWindow.on('resize', update);
      }

      $elem.bind('$destroy', function() {
        jqWindow.off('resize', update);
        $elem.perfectScrollbar('destroy');
      });

    }
  };
}]);
