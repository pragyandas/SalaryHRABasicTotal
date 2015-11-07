app.directive('chart', function($timeout) {
    var directive = {
        restrict: 'E',
        templateUrl: './templates/chartTemplate.html',
        scope: {
            data: '=',
            componentName: '@',
            index: '@'
        },
        controller: function($scope) {
            var colors = ['#A2C180', '#3D7930', '#FFC6A5', '#FFFF42', '#DEF3BD'];
            $scope.color = colors[$scope.index || colors.length - 1];
            $scope.visible=false;
            $scope.textValue = {};
            $scope.valueChanged = function() {
                $scope.$emit('ValueChanged', {
                    component: $scope.componentName,
                    value: $scope.textValue.data,
                    barIndex: $scope.barIndex
                });
                $scope.visible=$scope.index?!$scope.visible:false;
            }
        },
        link: function(scope, element, attrs) {

            $timeout(function() {
                scope.chart = new chart.barChart(scope.componentName, scope.color);
                scope.chart.draw(scope.data, function(value, barIndex) {
                    scope.$apply(function() {
                        scope.textValue.data = value;
                        scope.barIndex = barIndex;
                        scope.visible=scope.index?true:false;
                    });
                });
            }, 0);


            scope.$watch(function() {
                return scope.data;
            }, function(n, o) {
                if (n !== o) {
                    scope.chart.redraw(n);
                }
            }, true);
        },
        replace: true
    };
    return directive;
});