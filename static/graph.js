//function for creating bar graphs
function create_bar_graph(graph_type, graph_x_labels, graph_data, graph_y_label, regression_data, length_per_regression){
    $('#myChart').remove();
    $('.graph-container').append('<canvas id="myChart" width="400" height="200"></canvas>');
    var ctx = document.querySelector('#myChart').getContext('2d');
    var myChart = new Chart(ctx, {
        type: graph_type,
        data: {
            labels: graph_x_labels,
            datasets: create_line(y_cor_generator(graph_x_labels , regression_data, length_per_regression), graph_x_labels, graph_y_label, graph_data, length_per_regression)
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