import React from 'react'
import { View, Text } from 'react-native'
import Chart from '../components/Chart'

export default function ChartScreen({navigation}) {
    const name = navigation.getParam('name')
    const symbol = navigation.getParam('symbol')
    const sparkline = navigation.getParam("sparkline_in_7d").price;
    const changePercent = navigation.getParam(
      "price_change_percentage_7d_in_currency"
    );
    const logo = navigation.getParam('image')
    const currentPrice = navigation.getParam("current_price");
    


    return (
      <Chart
        currentPrice={currentPrice}
        logo={logo}
        name={name}
        changePercent={changePercent}
        sparkline={sparkline}
        symbol={symbol}
      />
    );
}
