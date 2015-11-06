var app = angular.module('SalaryApp', []);

app.controller('SalaryController', function($scope) {
	$scope.BASICs = [{
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
		key: 'E',
		value: 60000
	}, {
		key: 'F',
		value: 20000
	}, {
		key: 'G',
		value: 32000
	}, {
		key: 'H',
		value: 90020
	}];

	$scope.HRAs = [{
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
		key: 'E',
		value: 6000
	}, {
		key: 'F',
		value: 7000
	}, {
		key: 'G',
		value: 8000
	}, {
		key: 'H',
		value: 9000
	}];


	$scope.TAs = [{
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
		value: 6000
	}, {
		key: 'E',
		value: 5000
	}, {
		key: 'E',
		value: 4000
	}, {
		key: 'F',
		value: 3000
	}, {
		key: 'G',
		value: 2000
	}, {
		key: 'H',
		value: 1000
	}];

	$scope.TDSs = [{
		key: 'A',
		value: 100
	}, {
		key: 'B',
		value: 200
	}, {
		key: 'C',
		value: 300
	}, {
		key: 'D',
		value: 400
	}, {
		key: 'E',
		value: 500
	}, {
		key: 'E',
		value: 600
	}, {
		key: 'F',
		value: 700
	}, {
		key: 'G',
		value: 800
	}, {
		key: 'H',
		value: 900
	}];

	$scope.$on('ValueChanged',function(e,data){
		switch(data.component){
			case 'basic':
			$scope.BASICs[data.index].value=data.value;
			break;
			case 'hra':
			$scope.HRAs[data.index].value=data.value;
			break;
			case 'ta':
			$scope.TAs[data.index].value=data.value;
			break;
			case 'tds':
			$scope.TDSs[data.index].value=data.value;
			break;
		}
		
		$scope.CalculateTotal();
	})

	$scope.Total = [];

	$scope.CalculateTotal=function(){
		$scope.Total=$scope.BASICs.map(function(basic,i){
			 return {key:basic.key,value:basic.value+$scope.HRAs[i].value+$scope.TAs[i].value - $scope.TDSs[i].value};
		});
	}

	$scope.CalculateTotal();
});