! function(context, chart) {
	context.chart = chart(context.d3);
}(this, function(d3) {

	var chart = {};
	chart.barChart = (function() {
			function barChart() {}

			barChart.prototype.draw = function(scope,color,clickHandler) {
				d3.select('#svg_'+scope.id).remove();
				this.color=color;
				this.clickHandler=clickHandler;
				var canvasHeight = document.getElementById(scope.id).offsetHeight;
				var canvasWidth = document.getElementById(scope.id).offsetWidth;

				var categories = scope.data.map(function(d) {
					return d.key
				});
				var values = scope.data.map(function(d) {
					return d.value
				});

				var margin = {
					top: 10,
					bottom: 20,
					left: 10,
					right: 30
				};

				var height = canvasHeight - margin.top - margin.bottom,
					width = canvasWidth - margin.left - margin.right;

				var svg = d3.select('#' + scope.id)
					.append('svg')
					.attr('id', 'svg_' + scope.id)
					.attr('height', canvasHeight)
					.attr('width', canvasWidth);

				var mainGroup = svg.append('g')
					.attr('id','maingrp_'+scope.id)
					.attr('height', canvasHeight - margin.top - margin.bottom)
					.attr('width', canvasWidth - margin.right - margin.left)
					.attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

				var si = d3.format('.2s');
				var siMod = function(val) {
					return si(val).replace(/G/, 'B');
				};

				svg = mainGroup;

				var xScale = scale = d3.scale.ordinal()
					.domain(categories)
					.rangeRoundBands([0, width], 0.3, 0.2);


				var xAxis = d3.svg.axis()
					.scale(scale)
					.orient('bottom');

				var horizontalAxis = svg.append("g")
					.attr("class", "x axis")
					.attr("id", 'x_axis')
					.call(xAxis)
					.attr("transform",
						"translate(" + 0 + "," + height + ")");


				var yScale = d3.scale.linear().range([height, 0]);
				var maxY = d3.max(values);
				yScale.domain([0, maxY + 0.1 * maxY]);


				var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient('right')
					.ticks(5)
					.tickSize(-width, 0, 0)
					.tickFormat(siMod);

				var verticalAxis = svg.append("g")
					.attr("class", "y axis")
					.attr("id", 'y_axis')
					.call(yAxis)
					.attr("transform",
						"translate(" + width + "," + 0 + ")");


				svg.select('.y.axis path').style('display', 'none');

				var bars = svg
					.selectAll('rect')
					.data(scope.data);

				bars.enter()
					.append("rect")
					.attr('class', 'bar')
					.attr("x", function(d) {
						return xScale(d.key);
					})
					.attr("width", xScale.rangeBand())
					.attr('y', height)
					.attr('rx', '1')
					.attr('ry', '1')
					.attr('height', 0)
					.style("fill", color)
					.style('opacity', 1)
					.on('click',function(d,i){
						clickHandler(d.value,i);
					})
					.transition()
					.ease('bounce')
					.duration(1000)
					.attr('y', function(d) {
						return yScale(d.value);
					})
					.attr('height', function(d) {
						return height - yScale(d.value);
					})
			}

			return barChart;
	})();
	return chart;
});