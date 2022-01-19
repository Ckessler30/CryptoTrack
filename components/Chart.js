import React, { useEffect, useState } from 'react'
import { View, Text, StyleSheet, Image, Dimensions, SafeAreaView} from 'react-native'
import {
  ChartDot,
  ChartPath,
  ChartPathProvider,
  ChartYLabel
} from "@rainbow-me/animated-charts";
import { useSharedValue } from 'react-native-reanimated';


export const { width: SIZE } = Dimensions.get("window");
export default function Chart({currentPrice, logo, changePercent, sparkline, name, symbol}) {
    const latestCurrentPrice = useSharedValue(currentPrice)
    const [loading, setLoading] = useState(true)

    const priceColor = changePercent > 0 ? "#34C759" : "#FF3B30";

    useEffect(() => {
        latestCurrentPrice.value = currentPrice
        setTimeout(() => {
            setLoading(false)
        }, 0)
    },[currentPrice])

    const formatUSD = value => {
        'worklet';
        if(value === ''){
            return `$${latestCurrentPrice.value.toLocaleString("en-US", { currency: "USD" })}`
        }
        const formattedValue = `$${parseFloat(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}`
        return formattedValue
    }


    return (
      <ChartPathProvider
        data={{ points: sparkline, smoothingStrategy: "bezier" }}
      >
        <SafeAreaView style={styles.chartContainer}>
          <View style={styles.titleWrapper}>
            <Text style={styles.largeTitle}>Markets</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.chartWrapper}>
            <View style={styles.titlesWrapper}>

              <View style={styles.lowerTitles}>
                <ChartYLabel format={formatUSD} style={styles.boldTitle} />
                {/* <Text style={styles.boldTitle}>
                ${currentPrice.toLocaleString("en-US", { currency: "USD" })}
              </Text> */}
                <Text style={[styles.title, { color: priceColor }]}>
                  {changePercent.toFixed(2)}%
                </Text>
              </View>
            </View>
            {loading === false ? (
              <View style={styles.chartLineWrapper}>
                <ChartPath height={SIZE / 2} stroke={priceColor} width={SIZE} />
                <ChartDot style={{ backgroundColor: "white" }} />
              </View>
            ) : null}
              <View style={styles.upperTitles}>
                <View style={styles.upperLeftTitle}>
                  <Image source={{ uri: logo }} style={styles.image} />
                  <Text style={styles.subtitle}>
                    {name} ({symbol.toUpperCase()}){" "}
                  </Text>
                </View>
                <Text style={styles.subtitle}>7d</Text>
              </View>
          </View>
        </SafeAreaView>
      </ChartPathProvider>
    );
}

const styles = StyleSheet.create({
  chartContainer: {
    backgroundColor: 'black',
    height: '100%'
  },
  chartWrapper: {
    marginVertical: 16,
  },
  titlesWrapper: {
    marginHorizontal: 16,
  },
  upperTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  upperLeftTitle: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    width: 24,
    height: 24,
    marginRight: 3,
  },
  subtitle: {
    fontSize: 14,
    color: "#A9ABB1",
  },
  lowerTitles: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  boldTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: 'white'
  },
  title: {
    fontSize: 18,
  },
  chartLineWrapper: {
    marginTop: 40,
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16,
  },
});