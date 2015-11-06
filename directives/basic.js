app.directive('basic', function($timeout) {
    var directive = {
        restrict: 'E',
        templateUrl: './templates/basicTemplate.html',
        scope: {
            data: '='
        },
        controller: function($scope) {
            $scope.id = "basic";
            $scope.value = "";
            $scope.valueChanged = function() {
                $scope.$emit('ValueChanged', {
                    component: 'basic',
                    value: $scope.value,
                    index: $scope.index
                });
            }
            $scope.chart = "";
        },
        link: function(scope, element, attrs) {
            $timeout(function() {
                scope.chart = new chart.barChart();
                scope.chart.draw(scope, 'yellow', function(value, index) {
                    scope.$apply(function() {
                        scope.value = value;
                        scope.index = index;
                    });
                });
            }, 0);


            scope.$watch(function() {
                return scope.data;
            }, function(n, o) {
                if (n !== o) {
                    scope.chart.draw(scope, 'yellow', function(value, index) {
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