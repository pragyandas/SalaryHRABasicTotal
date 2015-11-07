! function(context, chart) {
	context.chart = chart(context.d3);
}(this, function(d3) {

	var chart = {};
	chart.barChart = (function() {
			function barChart(id,color) {
				this.id=id;
				this.color=color;
				this.siMod = function(val) {
					var si = d3.format('.2s');
					return si(val).replace(/G/, 'B');
				};
			}

			barChart.prototype.draw = function(data,clickHandler) {
				this.clickHandler=clickHandler;
				var color=this.color;
				var id=this.id;
				this.canvasHeight = document.getElementById(id).offsetHeight;
				this.canvasWidth = document.getElementById(id).offsetWidth;

				var categories = data.map(function(d) {
					return d.key;
				});
				var values = data.map(function(d) {
					return d.value;
				});

				this.margin = {
					top: 10,
					bottom: 20,
					left: 10,
					right: 30
				};

				var height = this.canvasHeight - this.margin.top - this.margin.bottom,
					width = this.canvasWidth - this.margin.left - this.margin.right;

				var svg = d3.select('#' + id)
					.append('svg')
					.attr('id', id + '_svg')
					.attr('height', this.canvasHeight)
					.attr('width', this.canvasWidth);

				var mainGroup = svg.append('g')
					.attr('id',id+'_mainGroup')
					.attr('height', this.canvasHeight - this.margin.top - this.margin.bottom)
					.attr('width', this.canvasWidth - this.margin.right - this.margin.left)
					.attr('transform', 'translate(' + this.margin.left + ',' + this.margin.top + ')');

				

				svg = mainGroup;

				var xScale = scale = d3.scale.ordinal()
					.domain(categories)
					.rangeRoundBands([0, width], 0.3, 0.2);
				this.xScale=xScale;

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

				this.yScale=yScale;

				var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient('right')
					.ticks(5)
					.tickSize(-width, 0, 0)
					.tickFormat(this.siMod);

				var verticalAxis = svg.append("g")
					.attr("class", "y axis")
					.attr("id", id+'_yaxis')
					.call(yAxis)
					.attr("transform",
						"translate(" + width + "," + 0 + ")");


				svg.select('.y.axis path').style('display', 'none');

				var bars = svg
					.selectAll('rect')
					.data(data);

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
					.ease('linear')
					.duration(500)
					.attr('y', function(d) {
						return yScale(d.value);
					})
					.attr('height', function(d) {
						return height - yScale(d.value);
					})
			}

			barChart.prototype.redraw=function(data){
				var color=this.color;
				var id=this.id;
				var height = this.canvasHeight - this.margin.top - this.margin.bottom,
					width = this.canvasWidth - this.margin.left - this.margin.right;

				var svg=d3.select('#'+id+'_mainGroup');

				var values = data.map(function(d) {
					return d.value;
				});

				var yScale = d3.scale.linear().range([height, 0]);
				var maxY = d3.max(values);
				yScale.domain([0, maxY + 0.1 * maxY]);


				var yAxis = d3.svg.axis()
					.scale(yScale)
					.orient('right')
					.ticks(5)
					.tickSize(-width, 0, 0)
					.tickFormat(this.siMod);

				svg.select('#' + id+'_yaxis')
                        .transition()
                        .duration(500)
                        .ease("linear")
                        .call(yAxis);


                var bars = svg
					.selectAll('rect')
					.data(data);

				bars.exit().remove();

				bars.enter()
					.append("rect")
					.attr('class', 'bar')
					.transition()
					.ease('linear')
					.duration(500)
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