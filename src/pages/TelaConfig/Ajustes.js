import React, {useState, useEffect} from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Image, ScrollView, FlatList } from 'react-native';
import { getAuth } from "firebase/auth";
import db from "../../config/firebase/firebase"
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot  } from "firebase/firestore";
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import Logo from '../../../assets/logoIcon/logo.png';
import AsyncStorage from '@react-native-async-storage/async-storage'


const database = getFirestore();

export default function Ajustes({navigation, route}) {

    const [meusDados, setMeusDados] = useState('')
    const [vitorias, setVitorias] = useState(0)
    const [empates, setEmpates] = useState(0)
    const [derrotas, setDerrotas] = useState(0)


/*    const dataUser = async() => {
        const docRef = onSnapshot(doc(database, "usuarios", getAuth().currentUser.uid), (doc) => {
            console.log("Current data Ajustes dataUser function: ", doc.data());
            setMeuNome(doc.data().name)
        });
    }
    dataUser();

    const dataEstUser = async() => {
        const docRef = onSnapshot(doc(database, "estatisticas", getAuth().currentUser.uid), (doc) => {
            console.log("Current data into estatisticas: ", doc.data());
            setVitorias(doc.data().vitorias)
            setEmpates(doc.data().empates)
            setDerrotas(doc.data().derrotas)
        });
    }
    dataEstUser();

*/

useEffect(() => {
    
    const storeData = async () => {
        try {
          console.log('AsyncStorage AllKeys: ' + await AsyncStorage.getAllKeys());
          let userData = await AsyncStorage.getItem('UserData');
          setMeusDados(JSON.parse(userData));
        } catch (e) {
          console.log('UserData was not found')
        }
    }

    storeData();

    }, [])


    const signAway = async() => {
        AsyncStorage.clear();
        await getAuth().signOut();
        navigation.reset({index:0, routes: [{name: "InitialLogo"}]});
    }

    const statistics = [
        { id: 1, opc: 'Vitóras', quant: vitorias },
        { id: 2, opc: 'Empates', quant: empates },
        { id: 3, opc: 'Derrotas', quant: derrotas }
    ];
    function renderItem({item}) {
        return <View>
            <TouchableOpacity>
                <Text>{item.opc}</Text>
            </TouchableOpacity>
        </View>
    }

    return (
        <View style={styles.container}>
            <View style={styles.cover}>
            </View>
            <View>
                <View style={styles.photo}>
                    <TouchableOpacity>
                        <Image 
                        source={Logo} 
                        style={{
                            height: 125, 
                            width: 125,
                        }}
                        />
                    </TouchableOpacity>
                </View>
                <View style={styles.nameStl}>
                <Text>{meusDados.name}</Text>
                </View>
            </View>
            <View style={styles.progress}>
            </View>
            <View style={styles.opc}>
                <ScrollView>
                    {statistics.map((opcIn, keyOpc) => {
                        return (
                        <View style={{flexDirection: 'row'}} key={keyOpc}>
                            <Text>{opcIn.opc}</Text>
                            <Text>{opcIn.quant}</Text>
                        </View>
                        )
                    })}
                </ScrollView>
            </View>
            <TouchableOpacity onPress={signAway}><Text>Sair</Text></TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container:{
        flex: 1,
        backgroundColor: 'violet'
    },
    cover: {
        backgroundColor: 'black',
        height: hp('20')
    },
    photo: {
        backgroundColor: 'blue',
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
      nameStl: {
        alignItems: 'center',
        justifyContent: 'center',
        height: hp('5')
      },
      progress: {
          flex: 1,
          backgroundColor: 'green'
      },
      opc: {
          flex: 2,
          backgroundColor: 'red'
      }
})
