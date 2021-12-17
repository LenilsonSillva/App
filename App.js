import { StatusBar } from 'expo-status-bar';
import React, {useEffect} from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import InitialLogo from './src/initial/InitialLogo';
import LoadingApp from './src/initial/LoadingApp';
import Constants from 'expo-constants';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import registrar from './src/pages/registrar/registrar';
import TelaInicio from './src/pages/TelaInicio/TelaInicio';
import Amigos from './src/pages/TelaAmigos/Amigos';
import Ajustes from './src/pages/TelaConfig/Ajustes';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Store from './src/pages/store/Store';
import Missoes from './src/pages/missoes/Missoes';
import {UserData} from './src/config/UserData/UserData';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppLoading from 'expo-app-loading';
import { useFonts} from '@expo-google-fonts/inter';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
const BGColor = "#4D4A95"

function OpcTabs() {
  return (
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarShowLabel: false,
        tabBarStyle: {
        position: 'absolute',
        backgroundColor:"#F4AF5F",
        height:hp('7'),
        borderRadius:50,
        justifyContent:"center",
        alignItems:"center",
        marginHorizontal: wp('2'),
        marginBottom: hp('1'),
        borderTopWidth:0,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconType;
          let iconSize = hp('4')

          if (route.name === 'Jogar') {
            iconName = true ? 'home' : 'home';
            iconType = 'Ionicons'
          } else if (route.name === 'Amigos') {
            iconName = focused ? 'person' : 'person';
            iconType = 'Ionicons'
          }  else if (route.name === 'Ajustes') {
            iconName = focused ? 'settings' : 'settings';
            iconType = 'Ionicons'
          } else if (route.name === 'Store') {
            iconName = focused ? 'settings' : 'settings';
            iconType = 'Ionicons'
          } else if (route.name === 'Missoes') {
            iconName = focused ? 'settings' : 'settings';
            iconType = 'Ionicons'
          }

          // You can return any component that you like here!
          return <Icon name={iconName} size={iconSize} color={color} type={iconType} />;
        },
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
      })}
      initialRouteName="Jogar"
    >
        <Tab.Screen name="Missoes" component={Missoes} options={{headerShown: false}}/>
        <Tab.Screen name="Amigos" component={Amigos} options={{headerShown: false}} />
        <Tab.Screen name="Jogar" component={TelaInicio} options={{headerShown: false}} lazy={false}/>
        <Tab.Screen name="Ajustes" component={Ajustes} options={{headerShown: false}} initialParams={{nome: 'getData()'}} lazy={false}/>
        <Tab.Screen name="Store" component={Store} options={{headerShown: false}}/>
      </Tab.Navigator>
  );
}

export default function App({navigation}) {

  const [loaded] = useFonts({
    'SSPLight': require('./assets/fonts/SourceSansPro/SourceSansProLight.ttf'),
    'SSPRegular': require('./assets/fonts/SourceSansPro/SourceSansProRegular.ttf'),
    'SSPBold': require('./assets/fonts/SourceSansPro/SourceSansProBold.ttf'),
  });

  if (!loaded) {
    return <AppLoading />;
  } else 
  return (
    <NavigationContainer>
        <StatusBar hidden={true} />
        <Stack.Navigator>
          <Stack.Screen name="LoadingApp" component={LoadingApp} options={{headerShown: false}}/>
            <Stack.Screen name="InitialLogo" component={InitialLogo} options={{headerShown: false}}/>
            <Stack.Screen name="registrar" component={registrar} options={{
              title: "",
              headerTransparent: true,
              headerShadowVisible: false,
              headerTintColor: 'white'
            }}/>
            <Stack.Screen name="TelaInicio" component={OpcTabs} options={{headerShown: false}} initialParams={{nome: 'oi'}}/>
        </Stack.Navigator>
    </NavigationContainer>
  );
}