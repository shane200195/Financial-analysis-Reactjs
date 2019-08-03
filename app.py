import flask
from flask import render_template, Flask, request, jsonify
import pandas as pd
from alpha_vantage.timeseries import TimeSeries

app = Flask(__name__)

"""@app.route('/')
def homepage():
    return render_template('test.html')"""
#using the alpha vantage api to get stock data that updates every 5min
def alpha_vantage_timeseries(ticker):
	ts = TimeSeries(key="4RKAADTMMAZ4U000", output_format = 'pandas')

	#retreiving the stock with appropriate tickers
    #add the ability to choose between daily or minutely states?
	data, meta_data = ts.get_daily(symbol='NASDAQ:' + ticker, outputsize='full')
	data = data.rename(columns={"1. open":"open", "2. high":"high", "3. low":"low", "4. close":"close", "5. volume":"volume"})

	#testing/manipulating pandas section
	return data

#home page
@app.route("/")
def test():
	return render_template('test.html')

#retreiving the input from the page, in order to obtain the ticker name of the stock
@app.route("/lin_regression", methods=["POST"])
def lin_regression():
	from analysis_tools.lin_regression import generate_equation

	#getting the stock data that the user wants
	stockName = request.form['name']
	data = alpha_vantage_timeseries(stockName)
	#getting how long the user wants to go back in history
	history = int(request.form['history'])
	#getting how many days regression should run for
	regression = int(request.form['regression_days'])

	#change how long the user wants to use linear regression
	slope_yint = generate_equation(data, history, regression)

	#implement feature to indicate how long in the past the user wants to see
	return jsonify({'prices': (stockName), 'open':list(data['open'])[:history][::-1], 'date':list(data.index)[:history][::-1], 'slope_yint':slope_yint})


@app.route("/moving_average", methods=["POST"])
def moving_average():
	from analysis_tools.moving_average import moving_average

	#getting the number of days you want to go back
	stockName = request.form['name']
	rolling = int(request.form['rolling'])
	history = int(request.form['history'])

	#retreiving the data from alpha vantage, and processing it with python
	data = alpha_vantage_timeseries(stockName)
	MA_price = moving_average(data[:history+rolling], rolling)

	#returning the result of processing
	return jsonify({'days': rolling, 'MA_price': MA_price[::-1], 'date':list(data.index[:history])[::-1]})

if __name__ == '__main__':
    app.run(debug=True, use_reloader=True)
