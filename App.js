import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem';

import { SAMPLE_DATA } from './assets/data/sampleData'


const ListHeader = () => (

   <>
    <View style={styles.titleWrapper}>
         <Text style={styles.largeTitle}>Markets</Text>
       </View>
     <View style={styles.divider} />
  </>
)

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
     
      {/* <ListItem
        name={SAMPLE_DATA[0].name}
        symbol={SAMPLE_DATA[0].symbol}
        currentPrice={SAMPLE_DATA[0].current_price}
        changePercent={SAMPLE_DATA[0].price_change_percentage_7d_in_currency}
        logo={SAMPLE_DATA[0].image}
      /> */}
      <FlatList
        keyExtractor={(item) => item.id}
        data={SAMPLE_DATA}
        ListHeaderComponent={<ListHeader />}
        renderItem={({ item }) => (
          <ListItem
            name={item.name}
            symbol={item.symbol}
            currentPrice={item.current_price}
            changePercent={
              item.price_change_percentage_7d_in_currency
            }
            logo={item.image}
          />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  titleWrapper: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  largeTitle: {
    fontSize: 24,
    fontWeight: "bold",
  },
  divider: {
    height: StyleSheet.hairlineWidth,
    backgroundColor: "#A9ABB1",
    marginHorizontal: 16,
    marginTop: 16
  },
});
