import React, { useState, useEffect, useRef } from "react";
import { Animated, Image, StatusBar, StyleSheet, Text, View, Keyboard, Dimensions, TouchableWithoutFeedback, TouchableOpacity, TextInput, DrawerLayoutAndroidBase } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from '../../assets/logoIcon/logo.png';
import SSPLight from '../../assets/fonts/SourceSansPro/SourceSansProLight.ttf';
import SSPRegular from '../../assets/fonts/SourceSansPro/SourceSansProRegular.ttf';
import SSPBold from '../../assets/fonts/SourceSansPro/SourceSansProBold.ttf';
import { Icon } from 'react-native-elements';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import TelaInicio from "../pages/TelaInicio/TelaInicio";
import InitialLogo from "./InitialLogo";
import AsyncStorage from '@react-native-async-storage/async-storage'
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";
import UserData from '../config/UserData/UserData';
import UserStatistics from '../config/UserStatistics/UserStatistics';


const BGColor = "#4D4A95";
const auth = getAuth();
const database = getFirestore();

export default function LoadingApp( {navigation} ) {



const edges = useSafeAreaInsets();
const upScreen = useRef(new Animated.Value(0)).current;
const fadeLogo = useRef(new Animated.Value(0)).current;
const fadeText = useRef(new Animated.Value(0)).current;

const [contFx, setContFx] = useState(0)
const fadeInUp = {
  from:{
    opacity: 0,
  },
  to: {
    opacity: contFx,
  }
}

const isTheUserAuthenticated = async() => {
  if (getAuth().currentUser !== null) {
    setContFx('1');
    UserData();
    UserStatistics();
    
    setTimeout(async() => {
     await navigation.reset({
        index:0,
        routes: [{name: "TelaInicio"}]
      })
    }, 1000);


  } else {
    await navigation.navigate("InitialLogo");
    setContFx('0')
  }
};


useEffect(() => {

  setTimeout(() => {
    
    Animated.sequence([
      Animated.timing(fadeLogo,
        {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000
        }
      ),
      Animated.timing(fadeText,
        {
          toValue: 1,
          useNativeDriver: true,
          duration: 1000
        }
      ),
      Animated.timing(fadeText,
        {
          toValue: 0,
          delay: 1000,
          useNativeDriver: true,
          duration: 500
        }
        ),
        Animated.timing(upScreen,
          {
            toValue: 100,
            useNativeDriver: true,
            duration: 1000
          }
          ),

    ]).start()

  }, 350)
},[])

setTimeout(async() => {
  await isTheUserAuthenticated();
}, 1000)

    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: BGColor, alignItems: 'center', justifyContent: 'center' }}>
        <Animatable.Image 
          source={Logo} 
          style={{
            height: 150, 
            width: 150,
          }}
          animation='rubberBand'
          duration={2500}
          delay={2500}
          useNativeDriver
          iterationCount={Infinity}
            />
        </View>
        <Animatable.Text
          style={styles.titleText}
          animation={fadeInUp}
          delay={1200}
        >
          QuizApp
        </Animatable.Text>
      </View>
    </TouchableWithoutFeedback>
    );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.1,
    alignSelf: 'center',
    color: '#fff',
    fontFamily: 'SSPBold',
    fontSize: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  bottomView: {
    backgroundColor: '#fff',
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  loginText: {
    fontFamily: 'SSPBold',
    fontSize: 24,
    marginTop: 12,
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,
    fontFamily: 'SSPRegular',
    fontSize: 16,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#5352ed',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    fontFamily: 'SSPBold',
    alignSelf: 'center',
    fontSize: 18,
  },
  registerText: {
    alignSelf: 'center',
    marginTop: 12,
    fontFamily: 'SSPRegular',
    fontSize: 16,
  },
  fpText: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontFamily: 'SSPBold',
    fontSize: 16,
    color: '#5352ed',
  },
  });