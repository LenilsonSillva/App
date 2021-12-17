import { useState, useEffect, useRef } from "react";
import * as React from "react";
import { Animated, Image, StatusBar, StyleSheet, Text, View, Keyboard, Dimensions, TouchableWithoutFeedback, TouchableOpacity, TextInput } from 'react-native';
import * as Animatable from 'react-native-animatable'
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Logo from '../../assets/logoIcon/logo.png';
import AppLoading from 'expo-app-loading';
import { useFonts, Inter_900Black } from '@expo-google-fonts/inter';
import SSPLight from '../../assets/fonts/SourceSansPro/SourceSansProLight.ttf';
import SSPRegular from '../../assets/fonts/SourceSansPro/SourceSansProRegular.ttf';
import SSPBold from '../../assets/fonts/SourceSansPro/SourceSansProBold.ttf';
import { Icon } from 'react-native-elements';
import app from '../config/firebase/firebase.js';
import { getAuth, signInWithEmailAndPassword, sendPasswordResetEmail } from "firebase/auth";
import { NavigationContainer } from "@react-navigation/native";
import registrar from "../pages/registrar/registrar";
import RNModal from 'react-native-modal';
import Constants from 'expo-constants';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {
  responsiveScreenHeight,
  responsiveScreenWidth,
  responsiveScreenFontSize
} from "react-native-responsive-dimensions";
import UserData from '../config/UserData/UserData';

const BGColor = "#4D4A95";
const auth = getAuth();

export default function InitialLogo({navigation}) {

  const [loaded] = useFonts({
    SSPLight,
    SSPRegular,
    SSPBold,
  });

const edges = useSafeAreaInsets();
const upScreen = useRef(new Animated.Value(0)).current;
const fadeLogo = useRef(new Animated.Value(0)).current;
const fadeText = useRef(new Animated.Value(0)).current;

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [denyFX, setDenyFX] = useState();
const [rnmodalVisible, setRNModalVisible] = useState(false);
const [rnmodalVisible2, setRNModalVisible2] = useState(false);

const loginFB = async() => {

await signInWithEmailAndPassword(auth, email, password)
  .then(async(userCredential) => {
    // Signed in
    const user = userCredential.user;
    setDenyFX('pulse');

    setTimeout(() => {
      setDenyFX('');
    }, 1000)

    await navigation.reset({index:0, routes: [{name: "LoadingApp"}]});

    // ...
  })
  .catch((error) => {
    setDenyFX('wobble')
    const errorMessage = error.message;
    console.log(errorMessage);
    setTimeout(() => {
      setDenyFX('')
    }, 500);
  });

}

  const recovery = async() => {

    if( email !== null && email.length > 4 ) {
   await sendPasswordResetEmail(auth, email)
  .then(() => {
    
    setRNModalVisible(true);

  })
  .catch((error) => {
    setRNModalVisible2(true);
    const errorCode = error.code;
    const errorMessage = error.message;
    // ..
  }); } else {
    setRNModalVisible2(true);
  }
  }

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

},[]);

if (!loaded) {
  return <AppLoading />;
} else {
    return(
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{ flex: 1, backgroundColor: BGColor, alignItems: 'center', justifyContent: 'center' }}>
        <Animatable.Image 
          source={Logo}
          aspectRatio={1}
          style={{
            height: 150, 
            width: 150,
            bottom: hp('12%'),
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
          animation='fadeInUp'
          delay={1200}
        >
          QuizApp
        </Animatable.Text>
        <Animatable.View style={styles.bottomView} animation='fadeInUp' delay={1800}>
          <Text style={styles.loginText}>Entrar</Text>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='at-outline'
              type='ionicon'
              color='#5352ed'
            />
            <TextInput
              style={styles.input}
              placeholder='Email'
              autoCapitalize='none'
              keyboardType='email-address'
              textContentType='emailAddress'
              onChangeText={setEmail}
            />
          </View>
          <View style={styles.inputView}>
            <Icon
              style={styles.inputIcon}
              name='lock'
              type='ionicons'
              color='#5352ed'
            />
            <TextInput
              style={styles.input}
              placeholder='Senha'
              secureTextEntry={true}
              autoCapitalize='none'
              onChangeText={setPassword}
            />
          </View>

          <RNModal isVisible={rnmodalVisible} animationIn='bounceInDown' animationOut='rotate'>
                <View style={styles.rnmodalView}>
                    <Text style={{fontSize: 18, fontFamily: 'SSPBold'}}>Redefinição de senha enviado!</Text>
                    <Text style={{marginVertical: 10, fontFamily: 'SSPRegular'}}>Um email de redefinição de senha foi enviado para <Text style={{ fontFamily: 'SSPBold'}}>{email}</Text>. Siga os passos e depois entre com seu email e nova senha novamente.</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setRNModalVisible(false)}><Text style={styles.modalButtonText}>OK</Text></TouchableOpacity>
                    </View>
                </View>
            </RNModal>

            <RNModal isVisible={rnmodalVisible2} animationIn='shake' animationOut='bounceOutDown'>
                <View style={styles.rnmodalView}>
                    <Text style={{fontSize: 18, fontFamily: 'SSPBold'}}>Preencha o campo Email!</Text>
                    <Text style={{marginVertical: 10, fontFamily: 'SSPRegular'}}>Um email de redefinição de senha será enviado para o seu email. Para isso, preencha o campo email com um email válido e clique aqui novamente.</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setRNModalVisible2(false)}><Text style={styles.modalButtonText}>OK</Text></TouchableOpacity>
                    </View>
                </View>
            </RNModal>

          <TouchableOpacity onPress={recovery}>
          <Text style={styles.fpText}>Esqueci a senha</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.loginButton} onPress={loginFB}>
            <Animatable.Text animation={denyFX} style={styles.loginButtonText}>Entrar</Animatable.Text>
          </TouchableOpacity>
          <Text style={styles.registerText}>
            Não possui uma conta?
            <Text style={{ color: '#5352ed', fontFamily: 'SSPBold' }} onPress={() => navigation.navigate(registrar)}>
              {' Cadastrar'}
            </Text>
          </Text>
        </Animatable.View>
      </View>
    </TouchableWithoutFeedback>
    );
}
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
    fontSize: hp('8%'),
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
    paddingTop: hp('2%'),
    paddingBottom: hp('3%'),
    paddingHorizontal: hp('2%'),
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
  rnmodalView: {
    backgroundColor: 'white',
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 14,
    shadowColor: '#000',
    shadowOffset:{
        width: 0,
        height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5
},
modalButton: {
    backgroundColor: BGColor,
    paddingVertical: 6,
    paddingHorizontal: 10,
    borderRadius: 4,
    marginLeft: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset:{
        width: 2,
        height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5
},
modalButtonText: {
    color: '#fff',
    fontSize: 16,
    fontFamily: 'SSPBold'
}
  });