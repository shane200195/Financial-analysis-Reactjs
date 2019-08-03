import pandas as pd

def moving_average(data, days):

	#getting the moving average
	df = data['close'].rolling(days).mean()

	#removing the nan
	MA = df[pd.notna(df)]
	return list(MA)