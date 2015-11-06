app.directive('ta', function($timeout) {
    var directive = {
        restrict: 'E',
        templateUrl: './templates/taTemplate.html',
        scope: {
            data: '='
        },
        controller: function($scope) {
            $scope.id = 'ta';
            $scope.value = "";
            $scope.valueChanged = function() {
                $scope.$emit('ValueChanged', {
                    component: 'ta',
                    value: $scope.value,
                    index: $scope.index
                });
            }
        },
        link: function(scope, element, attrs) {
            $timeout(function() {
                scope.chart = new chart.barChart();
                scope.chart.draw(scope, 'green', function(value, index) {
                    scope.$apply(function() {
                        scope.value = value;
                        scope.index = index;
                    });
                });
            }, 0)

            scope.$watch(function() {
                return scope.data;
            }, function(n, o) {
                if (n !== o) {
                    scope.chart.draw(scope, 'green', function(value, index) {
                        scope.$apply(function() {
                            scope.value = value;
                            scope.index = index;
                        });
                    });
                }
            },true);

        },
        replace: true
    };
    return directive;
});