app.directive('total', function($timeout) {
    var directive = {
        restrict: 'E',
        templateUrl: './templates/totalTemplate.html',
        scope: {
            data: '='
        },
        controller: function($scope) {
            $scope.id = "total";
            $scope.value = "";
        },
        link: function(scope, element, attrs) {
            $timeout(function() {
                scope.chart = new chart.barChart();
                scope.chart.draw(scope, 'grey', function(value) {
                    console.log('Cannot edit total');
                });
            }, 0)

            scope.$watch(function() {
                return scope.data;
            }, function(n, o) {
                if (n !== o) {
                    scope.chart.draw(scope, 'grey', function(value) {
                        console.log('Cannot edit total');
                    });
                }
            },true);
        },
        replace: true
    };
    return directive;
});