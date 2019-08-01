function y_cor_generator(graph_x_labels , data, length_per_regression){
	var y = 0;
	var y_cor = [];
	for (i=0; i < graph_x_labels.length; i++){
		if (i%length_per_regression == 0){
			current_slope = data[y][0];
			current_y_int = data[y][1];
			if(y > data.length){
				continue;
			}else{
				y += 1
			}
		}
		y_cor.push(i*current_slope + current_y_int)

	}
    return y_cor
}

function create_line(y_cor, graph_x_labels, graph_y_label, graph_data, length_per_regression){

	//seeing how many x-values are present, and the number of regression lines generated
	x_set_length = graph_x_labels.length
	number_of_lines = x_set_length/length_per_regression

	//array to store the group of lines that will be generated from linear regression
	var calculated_lines = [{
                label: graph_y_label,
                //default data is the base line (actual line of stock)
                data: graph_data,
                borderColor: 'rgb(0,0,0)',
                pointRadius: 0.5
            }]

    //a loop to loop through each line
	for (i=0; i<number_of_lines; i++){
		var current_y_cor = new Array(x_set_length)

		//a loop to generate all the y-coordinates within the section
		for(y=i*length_per_regression; y<(i+1)*length_per_regression; y++){
			current_y_cor[y] = y_cor[y]
		}

		//pushing the new line into the array
		calculated_lines.push({
                label: false,
                data: current_y_cor,
                fill: false,
                borderColor: 'rgb(255,0,0)',
                pointRadius: 0.5
            })
	}
	return calculated_lines
}

function lin_regression_ajax(event){

	//getting the value required to conduct linear regression
	var input = $('#stockName').val();
    var days_past = $('#days').val();
    var regression_len = parseInt($('#lin_regression').val());

	//sending an ajax request to the server, sending the ticker requested by client
	$.ajax({
		url: '/lin_regression',
		type: 'POST',
        //sending the user's desired stock, how many days in the history they want, and how long they want their linear regression to be
		data: {name: input, history:days_past, regression_days:regression_len},
	})

	//creating the graph once the data has been received from flask backend
	.done(function(data) {
		create_bar_graph('line', data.date, data.open, "Open price", data.slope_yint, regression_len)
	});
	event.preventDefault();
}