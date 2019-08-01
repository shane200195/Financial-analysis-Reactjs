function moving_average_ajax(event){

	//getting the value required to conduct linear regression
	var input = $('#stockName').val();
    var days_past = $('#past_days').val();
    var total_day = $('#total_days').val();

	//sending an ajax request to the server, sending the ticker requested by client
	$.ajax({
		url: '/moving_average',
		type: 'POST',
        //sending the user's desired stock, how many days in the history they want, and how long they want their moving averages to be
		data: {name: input, rolling: days_past, history: total_day},
	})
	
	//creating the graph once the data has been received from flask backend
	.done(function(data) {
		graph_data('line', data.date, data.MA_price, "Moving Average")

	});
	event.preventDefault();
}

//potentially refactor this
function graph_data(graph_type, graph_x_labels, graph_data, graph_y_label){
	$('#myChart').remove();
    $('.graph-container').append('<canvas id="myChart" width="400" height="200"></canvas>');
    var ctx = document.querySelector('#myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: graph_type,
        data: {
            labels: graph_x_labels,
            datasets: [{
		            labels: graph_x_labels,
		            label: false,
		            data: graph_data,
		            fill: false,
		            borderColor: 'rgb(255,0,0)',
		            pointRadius: 0.5
        	}]
        },
        options: {
            legend:{
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: false
                    }
                }]
            }
        },
    });
}