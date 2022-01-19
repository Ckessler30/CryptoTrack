import React from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'

export default function ListUpdate({image, category, description, name, symbol, user, created}) {
    return (
        <TouchableOpacity style={styles.wrapper}>
            <Image style={styles.image} source={{uri: image}}/>
            <View style={styles.middleWrap}>
                <View style={styles.topTitle}>
                    <Text style={styles.titles}>{name}({symbol.toUpperCase()})</Text>
                    <Text style={styles.subTitle}> - {user}</Text>
                </View>
                <Text numberOfLines={3} style={styles.description}>{description}</Text>
            </View>
        </TouchableOpacity>
    )
}


const styles = StyleSheet.create({
  wrapper: {
    flexDirection: "row",
    width: "100%",
    // height: '100%',
    alignItems: "center",
    marginVertical: 10,
    // flexWrap: 'wrap'
  },
  image: {
    height: 70,
    width: 70,
    marginRight: 5,
    borderRadius: 40,
  },
  description: {
    flex: 1,
    color: "white",
  },
  middleWrap: {
    flex: 1,
  },
  titles: {
    color: "white",
    fontWeight: "bold",
  },
  topTitle: {
    flexDirection: "row",
  },
  subTitle: {
    color: "#A9ABB1",
  },
});