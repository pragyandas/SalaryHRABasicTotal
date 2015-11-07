var app = angular.module('SalaryApp', []);

app.controller('SalaryController', function($scope) {

	$scope.data = {
		"basic": [{
			key: 'A',
			value: 10000
		}, {
			key: 'B',
			value: 40000
		}, {
			key: 'C',
			value: 30000
		}, {
			key: 'D',
			value: 50000
		}, {
			key: 'E',
			value: 52000
		}, {
			key: 'F',
			value: 60000
		}, {
			key: 'G',
			value: 20000
		}, {
			key: 'H',
			value: 32000
		}, {
			key: 'I',
			value: 90020
		}],
		"hra": [{
			key: 'A',
			value: 1000
		}, {
			key: 'B',
			value: 2000
		}, {
			key: 'C',
			value: 3000
		}, {
			key: 'D',
			value: 4000
		}, {
			key: 'E',
			value: 5000
		}, {
			key: 'F',
			value: 6000
		}, {
			key: 'G',
			value: 7000
		}, {
			key: 'H',
			value: 8000
		}, {
			key: 'I',
			value: 9000
		}],
		"ta": [{
			key: 'A',
			value: 9000
		}, {
			key: 'B',
			value: 8000
		}, {
			key: 'C',
			value: 7000
		}, {
			key: 'D',
			value: 6300
		}, {
			key: 'E',
			value: 5200
		}, {
			key: 'F',
			value: 4150
		}, {
			key: 'G',
			value: 3000
		}, {
			key: 'H',
			value: 2000
		}, {
			key: 'I',
			value: 4100
		}],
		"tds": [{
			key: 'A',
			value: 3200
		}, {
			key: 'B',
			value: 4500
		}, {
			key: 'C',
			value: 3000
		}, {
			key: 'D',
			value: 1900
		}, {
			key: 'E',
			value: 2300
		}, {
			key: 'F',
			value: 3100
		}, {
			key: 'G',
			value: 1200
		}, {
			key: 'H',
			value: 1000
		}, {
			key: 'I',
			value: 1300
		}]
	}

	$scope.total = [];

	$scope.$on('ValueChanged', function(e, data) {
		console.log(data);
		switch (data.component) {
			case 'basic':
				$scope.data.basic[data.barIndex].value = parseInt(data.value);
				break;
			case 'hra':
				$scope.data.hra[data.barIndex].value = parseInt(data.value);
				break;
			case 'ta':
				$scope.data.ta[data.barIndex].value = parseInt(data.value);
				break;
			case 'tds':
				$scope.data.tds[data.barIndex].value = parseInt(data.value);
				break;
		}

		$scope.CalculateTotal();
	})

	$scope.CalculateTotal = function() {
		if ($scope.total.length > 0) {
			$scope.data.basic.forEach(function(b, i) {
				$scope.total[i].value = b.value + $scope.data.ta[i].value + $scope.data.hra[i].value - $scope.data.tds[i].value;
			})
		} else {
			$scope.data.basic.forEach(function(b, i) {
				$scope.total.push({key:b.key,value:b.value + $scope.data.ta[i].value + $scope.data.hra[i].value - $scope.data.tds[i].value});
			})
		}
	}

	$scope.CalculateTotal();
});