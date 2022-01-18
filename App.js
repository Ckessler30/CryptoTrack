import { useRef, useMemo, useState, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { FlatList, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import ListItem from './components/ListItem';
import {
  BottomSheetModal,
  BottomSheetModalProvider,
} from "@gorhom/bottom-sheet";

import { SAMPLE_DATA } from './assets/data/sampleData'
import Chart from './components/Chart';
import { getMarketData } from './services/cryptoService';




export default function App() {
  const [selectedCoinData, setSelectedCoinData] = useState(null)
  const [data, setData] = useState([])

  useEffect(() => {
    const fetchMarketData = async () => {
      const marketData = await getMarketData();
      setData(marketData)
    }

    fetchMarketData()
  }, [])

  const bottomSheetModalRef = useRef(null);
  const snapPoints = useMemo(() => ["40%"], []);

  const openModal = (item) => {
    setSelectedCoinData(item)
    bottomSheetModalRef.current?.present()
    
  }

  return (
    <BottomSheetModalProvider>
      <SafeAreaView style={styles.container}>
        <View style={styles.titleWrapper}>
          <Text style={styles.largeTitle}>Markets</Text>
        </View>
        <View style={styles.divider} />

        <FlatList
          keyExtractor={(item) => item.id}
          data={data}
          // ListHeaderComponent={<ListHeader />}
          renderItem={({ item }) => (
            <ListItem
              name={item.name}
              symbol={item.symbol}
              currentPrice={item.current_price}
              changePercent={item.price_change_percentage_7d_in_currency}
              logo={item.image}
              onPress={() => openModal(item)}
            />
          )}
        />
      </SafeAreaView>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={0}
        snapPoints={snapPoints}
        style={styles.bottomSheet}
      >
        { selectedCoinData && 
          <Chart 
          currentPrice={selectedCoinData.current_price}
          logo={selectedCoinData.image}
          name={selectedCoinData.name}
          changePercent={selectedCoinData.price_change_percentage_7d_in_currency}
          sparkline={selectedCoinData.sparkline_in_7d.price}
          symbol={selectedCoinData.symbol}
          />
        }
      </BottomSheetModal>
    </BottomSheetModalProvider>
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
  bottomSheet: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: -4,
    },
    shadowOpacity: .25,
    shadowRadius: 4,
    elevation: 5
  }
});
