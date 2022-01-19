import { useRef, useMemo, useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { FlatList, SafeAreaView, StyleSheet, Text, View } from "react-native";
import AnimatedLoader from "react-native-animated-loader";
import ListItem from "../components/ListItem";
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { SAMPLE_DATA } from "../assets/data/sampleData";
import Chart from "../components/Chart";
import { getMarketData } from "../services/cryptoService";

export default function HomeScreen({navigation}) {
  const [selectedCoinData, setSelectedCoinData] = useState(null);
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true)
  const [refreshing, setRefreshing] = useState(false)

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      // console.log(marketData)
      if(marketData){
        setData(marketData);
        setLoading(false)
      }
    };
    const interval = setInterval(() => {
      fetchMarketData();
      // console.log("fetching new data")
    }, 5000)
    return () => clearInterval(interval)
  }, []);

  


  const handlePress = (item) => {
      navigation.navigate('Chart', item)
  };

  const handleRefresh = () => {
    setRefreshing(true)
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      // console.log(marketData)
      if(marketData){
        setData(marketData);
        setRefreshing(false)
        // setLoading(false)
      }
    };
    setTimeout(() => {
      fetchMarketData()
    }, 1000)
  }

  return (
    <>
      {loading ? (
        <AnimatedLoader
          visible={loading}
          overlayColor="black"
          source={require("./loader.json")}
          animationStyle={styles.lottie}
          speed={1}
          loop={true}
        ></AnimatedLoader>
      ) : (
        <SafeAreaView style={styles.container}>
          <View style={styles.titleWrapper}>
            <Text style={styles.largeTitle}>Crypto</Text>
          </View>
          <View style={styles.divider} />

          <FlatList
            keyExtractor={(item) => item.id}
            data={data}
            refreshing={refreshing}
            onRefresh={handleRefresh}
            // ListHeaderComponent={<ListHeader />}
            renderItem={({ item }) => (
              <ListItem
                name={item.name}
                symbol={item.symbol}
                currentPrice={item.current_price}
                changePercent={item.price_change_percentage_7d_in_currency}
                logo={item.image}
                onPress={() => handlePress(item)}
              />
            )}
          />
        </SafeAreaView>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
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
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  lottie: {
    width: 200,
    height: 200,
  },
});
