import { Image, StyleSheet, Platform, View, Text, FlatList, Button } from 'react-native';
import AppLoading from "expo-app-loading";
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { Collapsible } from '@/components/Collapsible';
import Camera from 'react-native-camera';
import ImagePicker from 'react-native-image-picker';

import {
  useFonts,
  Roboto_400Regular,
  Bangers_400Regular,
  OpenSans_400Regular
} from "@expo-google-fonts/dev";
import React, { useState } from 'react';

export default function HomeScreen() {
    const [items, setItem] = useState([
        {name: 'Eggs and spam',
         quantity: 1,
         expiration: '10/10/2021'
        },
        {name: 'Rice seaweed',
         quantity: 2,
         expiration: '10/10/2021'
        },
        {name: 'Dominic',
         quantity: 9,
         expiration: '10/10/2021'
        }
      ])

  let [fontsLoaded] = useFonts({
    Bangers_400Regular,
    Roboto_400Regular
  });

  if (!fontsLoaded) return <AppLoading/>

  const removeItem = (item: string): void => {
    const newItems = items.filter(i => i.name !== item);
    setItem(newItems);
  }

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }>
      <ThemedView>
        <View> 
          <View style={styles.topBar}>
          </View>
        </View>
      </ThemedView>
      <View>
        
        <View style={styles.recipeBox}>
        <View id='recipes-box' style={styles.topRecipes}>
          <Text style={styles.recipesText}>Inventory</Text>
        </View>
        <Text>(Check to remove item)</Text>
      <View style={styles.lowerBoxes}>
          <FlatList
        data={items}
        renderItem={({item}: {item: {name: string, quantity: number, expiration: string}}) => 
            <View style={styles.remove}>
                <Button 
                onPress={() => {
                    removeItem(item.name);
                }}
        title={item.name + " (Q:" + item.quantity + ", Exp:" + item.expiration + ")"}
      />
            </View>}
        />
      </View>
        </View>
        
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  stepContainer: {
    gap: 4,
    marginBottom: 4,
  },
  remove: {
    marginRight: 200,
    width: 200,
  },
  reactLogo: {
    height: 1,
    width:1,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  title: {
    textAlign: 'right',
    marginTop: 20,
    position: 'relative',
    fontSize: 30,
    fontFamily: "Roboto_400Regular"
  },
  topBar: {
    position: "relative",
  },
  first: {
    marginTop: -10,
  },
  menu: {
    fontSize: 30
  },
  recipeBox: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  topRecipes: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    fontSize: 30,
    marginTop: 20,
    backgroundColor: 'white',
    width: 320,
  }, 
  recipesText: {
    fontSize: 50,
    color: "black"
  },
  exp: {
    fontSize: 30,
    marginTop: 40,
    marginLeft: 20,
    marginRight: 20,
    backgroundColor: 'white',
    width: 130,
    borderWidth: 3,
    padding: 5,
  }, 
  recipeText: {
    fontSize: 30,
    color: "black"
  },
  lowerBoxes: {
    marginTop: 10,
    marginLeft: 70,
    flex: 1,
    flexDirection: "row",
    justifyContent: 'space-between'
  },
  lower: {
    fontSize: 20
  }, list: {
    fontSize: 18,
  }
});
