import { useState, useEffect, useRef } from "react";
import * as React from "react";
import * as Animatable from 'react-native-animatable'
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import SSPLight from '../../../assets/fonts/SourceSansPro/SourceSansProLight.ttf';
import SSPRegular from '../../../assets/fonts/SourceSansPro/SourceSansProRegular.ttf';
import SSPBold from '../../../assets/fonts/SourceSansPro/SourceSansProBold.ttf';
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Logo from '../../../assets/logoIcon/logo.png';
import { Icon } from 'react-native-elements';
import RNModal from 'react-native-modal';
import { getDatabase, ref, set } from "firebase/database";
import { doc, setDoc, getFirestore, collection, addDoc } from "firebase/firestore";

const BGColor = "#4D4A95"
const db = getFirestore();

export default function registrar() {

    const [uname,setUname] = useState('');
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [rnmodalVisible, setRNModalVisible] = useState(false);
    const [rnmodalVisible2, setRNModalVisible2] = useState(false);
    const [denyFX, setDenyFX] = useState();

    const registerFB = async() => {

        const auth = getAuth();
        createUserWithEmailAndPassword(auth, email, password)
          .then( async(userCredential) => {

            // Signed in
            const user = userCredential.user;

            setDenyFX('pulse')

            setTimeout(() => {
            setDenyFX('')
            }, 1000);

            setRNModalVisible(true);

            try {
              const docRef = await setDoc(doc(db, "usuarios", user.uid), {
                name: uname,
                email: user.email,
                id: user.uid,
                foto: user.photoURL,
              });
            } catch (e) {
              console.error("Error adding document into usuarios: ", e);
            }

            try {
              const docRefEst = await setDoc(doc(db, "estatisticas", user.uid), {
                vitorias: 0,
                empates: 0,
                derrotas: 0
              });
            } catch (e) {
              console.error("Error adding document into estatisticas: ", e);
            }

          })
          .catch((error) => {

            setDenyFX('wobble')

            setTimeout(() => {
                setDenyFX('')
              }, 1000);

            setRNModalVisible2(true);
            const errorCode = error.code;
            const errorMessage = error.message;
            // ..
          });
      
      }

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.centerizedView}>
          <View style={styles.authBox}>
            <View style={styles.logoBox}>
            <Animatable.Image 
          source={Logo} 
          style={{
            height: 125, 
            width: 125,
          }}
          animation='rubberBand'
          duration={2500}
          delay={2500}
          useNativeDriver
          iterationCount={Infinity}
            />
            </View>
            <Text style={styles.loginTitleText}>Cadastrar</Text>

            <RNModal isVisible={rnmodalVisible} animationIn='bounceInDown' animationOut='rotate'>
                <View style={styles.rnmodalView}>
                    <Text style={{fontSize: 18, fontFamily: 'SSPBold'}}>Cadastrado feito!</Text>
                    <Text style={{marginVertical: 10, fontFamily: 'SSPRegular'}}>Use essas credenciais para entrar na sua conta na próxima vez.</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setRNModalVisible(false)}><Text style={styles.modalButtonText}>OK</Text></TouchableOpacity>
                    </View>
                </View>
            </RNModal>

            <RNModal isVisible={rnmodalVisible2} animationIn='shake' animationOut='fadeOutDownBig'>
                <View style={styles.rnmodalView}>
                    <Text style={{fontSize: 18, fontFamily: 'SSPBold'}}>Usuáio inválido!</Text>
                    <Text style={{marginVertical: 10, fontFamily: 'SSPRegular'}}>Não foi possível cadastrar com esta conta. Tente cadastrar com outra.</Text>
                    <View style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setRNModalVisible2(false)}><Text style={styles.modalButtonText}>OK</Text></TouchableOpacity>
                    </View>
                </View>
            </RNModal>

            <View style={styles.inputBox}>
            <Icon
              style={styles.inputIcon}
              name='person'
              type='ionicons'
              color='#5352ed'
            />
              <TextInput
                style={styles.input}
                placeholder='Nome'
                autoCapitalize='none'
                keyboardType='default'
                textContentType='name'
                onChangeText={setUname}
              />
            </View>
            <View style={styles.inputBox}>
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
            <View style={styles.inputBox}>
            <Icon
              style={styles.inputIcon}
              name='lock'
              type='ionicons'
              color='#5352ed'
            />
              <TextInput
                placeholder='Senha'
                style={styles.input}
                autoCapitalize='none'
                secureTextEntry={true}
                textContentType='password'
                onChangeText={setPassword}
              />
            </View>
            <TouchableOpacity style={styles.loginButton} onPress={registerFB}>
              <Animatable.Text animation={denyFX} style={styles.loginButtonText}>Cadastrar</Animatable.Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: BGColor,
    justifyContent: 'center'
  },
  centerizedView: {
    width: '100%',
  },
  authBox: {
    width: '80%',
    backgroundColor: '#fafafa',
    borderRadius: 20,
    alignSelf: 'center',
    paddingHorizontal: 14,
    paddingBottom: 30,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  logoBox: {
    backgroundColor: BGColor,
    borderRadius: 1000,
    alignSelf: 'center',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    top: -50,
    marginBottom: -50,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 20,
  },
  loginTitleText: {
    fontSize: 24,
    fontFamily: 'SSPBold',
    marginTop: '5%',
    marginBottom: '3%'
  },
  inputBox: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    fontFamily: 'SSPLight'
  },
  inputLabel: {
    fontSize: 18,
    marginBottom: 6,
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
    marginTop: '15%',
    marginBottom: '5%',
    paddingVertical: 10,
    borderRadius: 4,
  },
  loginButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    fontFamily: 'SSPBold',
  },
  registerText: {
    textAlign: 'center',
    marginTop: 20,
    fontSize: 16,
  },
  forgotPasswordText: {
    textAlign: 'center',
    marginTop: 12,
    fontSize: 16,
  },
  inputIcon: {
    paddingHorizontal: 8,
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
      elevation: 5,
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