angular.module('perfect_scrollbar', []).directive('perfectScrollbar', function($parse) {
	return {
		restrict: 'E',
		transclude: true,
		template:  '<div><div ng-transclude></div></div>',
		replace: true,
		link: function($scope, $elem, $attr) {
		    $elem.perfectScrollbar({
				wheelSpeed: $parse($attr.wheelSpeed)() || 50,
				wheelPropagation: $parse($attr.wheelPropagation)() || false,
				minScrollbarLength: $parse($attr.minScrollbarLength)() || false,
			});

			if ($attr.refreshOnChange) {
				$scope.$watchCollection($attr.refreshOnChange, function(newNames, oldNames) {
					// I'm not crazy about setting timeouts but it sounds like thie is unavoidable per
					// http://stackoverflow.com/questions/11125078/is-there-a-post-render-callback-for-angular-js-directive
					setTimeout(function() { $elem.perfectScrollbar('update'); }, 10);
				});
			}
		}
	}
});