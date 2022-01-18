import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function ListItem({name, symbol, currentPrice, changePercent, logo}) {

    const priceColor = changePercent > 0 ? "#34C759" : "#FF3B30";

    return (
      <TouchableOpacity>
        <View style={styles.itemWrapper}>
          <View style={styles.leftWraper}>
            <Image
              style={styles.image}
              source={{
                uri: logo,
              }}
            />
            <View style={styles.titlesWrapper}>
              <Text style={styles.title}>{name}</Text>
              <Text style={styles.subTitle}>{symbol.toUpperCase()}</Text>
            </View>
          </View>

          <View style={styles.rightWrapper}>
            <Text style={styles.title}>${currentPrice.toLocaleString('en-US', {currency: 'USD'})}</Text>
            <Text style={[styles.subTitle, { color: priceColor }]}>{changePercent.toFixed(2)}%</Text>
          </View>
        </View>
      </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
  itemWrapper: {
    paddingHorizontal: 16,
    marginTop: 24,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  leftWraper: {
    flexDirection: "row",
    alignItems: "center",
  },
  image: {
    height: 48,
    width: 48,
  },
  titlesWrapper: {
    marginLeft: 8,
  },
  rightWrapper: {
      alignItems: 'flex-end'
  },
  title: {
    fontSize: 18,
  },
  subTitle: {
    fontSize: 14,
    color: "#A9ABB1",
    marginTop: 4
  },
});