angular.module('perfect_scrollbar', []).directive('perfectScrollbar', function($parse) {
	return {
		restrict: 'E',
		transclude: true,
		template:  '<div><div ng-transclude></div></div>',
		replace: true,
		scope: { 
		 	wheelSpeed: '&',
		 	wheelPropagation: '&'
		},
		link: function($scope, $elem, $attr) {

			$elem.perfectScrollbar({
				wheelSpeed: $scope.wheelSpeed() || 50,
				wheelPropagation: $scope.wheelPropagation() || false
			});
		}
	}
});