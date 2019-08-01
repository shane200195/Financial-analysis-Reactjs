import pandas as pd
from alpha_vantage.timeseries import TimeSeries
from app import alpha_vantage_timeseries


def linear_regression(data, starting, length, total):

	#generating an incrementing x_cor for each price
	data = data['close'][starting:starting + length][::-1]
	x_cor = list(range(total - starting, total - starting + length))

	#defining the mean of x and y
	mean_y = data.mean()
	mean_x = sum(x_cor)/length

	#generating the difference from mean list
	diff_y = [i - mean_y for i in data]
	diff_x = [i - mean_x for i in x_cor]

	#generating the top and bottom component
	top_comp = []
	for i in range(len(diff_y)):
		top_comp.append(diff_y[i] * diff_x[i])
	top_comp = sum(top_comp)/length
	bottom_comp = sum([abs(i)**2 for i in diff_x])/length

	#finishing up the equation of the line
	slope = top_comp/bottom_comp
	y_int = mean_y - slope*mean_x

	#graphing the generated line from linear regression
	return [slope, y_int]


#function to generate a graph
def generate_equation(stock ,num_of_data, length_of_regression):

	#list where the list of linear equation will be
	equations = []

	#graphing the base graph, without the linearly regressed line
	stock['close'][:num_of_data][::-1].plot()

	#making the count start at the last beginning of the data
	last_start = num_of_data - length_of_regression
	for i in range(last_start, -length_of_regression, -length_of_regression):
		set_slope_yint = linear_regression(stock, i, length_of_regression, last_start)
		equations.append(set_slope_yint)

	#showing the graph
	return equations


#print(generate_graph(200, 10))
