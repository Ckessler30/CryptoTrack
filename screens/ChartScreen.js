import React, {useEffect, useState} from 'react'
import { View, Text, StyleSheet, SafeAreaView, FlatList } from 'react-native'
import Chart from '../components/Chart'
import { getStatusUpdates } from '../services/cryptoService';
import AnimatedLoader from "react-native-animated-loader";
import ListUpdate from '../components/ListUpdate';

export default function ChartScreen({navigation}) {
    const [updates, setUpdates] = useState([]);
    const [loading, setLoading] = useState(true)
    const name = navigation.getParam('name')
    const symbol = navigation.getParam('symbol')
    const sparkline = navigation.getParam("sparkline_in_7d").price;
    const changePercent = navigation.getParam(
      "price_change_percentage_7d_in_currency"
    );
    const logo = navigation.getParam('image')
    const currentPrice = navigation.getParam("current_price");
    

    useEffect(() => {
      const fetchStatusUpdates = async () => {
        const statusUpdates = await getStatusUpdates();
        if (statusUpdates) {
          setUpdates(statusUpdates);
          setLoading(false)
        }
      };
      fetchStatusUpdates();
    }, []);
    // console.log(updates[0])


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
          <SafeAreaView style={styles.wrapper}>
            <Chart
              currentPrice={currentPrice}
              logo={logo}
              name={name}
              changePercent={changePercent}
              sparkline={sparkline}
              symbol={symbol}
            />
            <View style={styles.newsCont}>
              <Text style={styles.newsText}>News</Text>
              <View style={styles.divider} />
            </View>
            <View style={styles.listWrapper}>
              <FlatList
                keyExtractor={(item, ind) => ind.toString()}
                data={updates}
                // ListHeaderComponent={<ListHeader />}
                renderItem={({ item }, ind) => (
                  <ListUpdate
                    image={item.project.image.large}
                    category={item.category}
                    description={item.description}
                    name={item.project.name}
                    symbol={item.project.symbol}
                    user={item.user}
                    created={item.created_at}
                  />
                )}
              />
            </View>
          </SafeAreaView>
        )}
      </>
    );
}

const styles = StyleSheet.create({
  lottie: {
    width: 200,
    height: 200,
    // backgroundColor: 'black'
  },
  wrapper: {
    height: "100%",
    backgroundColor: "black",
  },
  newsCont: {
    marginTop: 10,
    marginBottom: 5
  },
  newsText: {
    color: "white",
    fontSize: 24,
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    // marginHorizontal: 16,
    marginTop: 12,
  },
  listWrapper: {
      height: '47%'
  },
 
});
