import React, {useState, useEffect} from 'react'
import { getAuth } from '@firebase/auth'
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot  } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const database = getFirestore();

export default function UserStatistics() {

  console.log("Retornou")

  let cont = false;

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('UserStatistics', jsonValue)
      console.log('AsyncStorage "UserStatistics": ' + await AsyncStorage.getItem('UserStatistics'))
    } catch (e) {
        console.log('Not storaged')
      }
  }

  if( cont === false){
    const docRef = onSnapshot(doc(database, "estatisticas", getAuth().currentUser.uid), (doc) => {
      if(doc.data().vitorias !== null || doc.data().vitorias !== '') {
        console.log("Statistics has been found sucessfully")
        const data = doc.data();
        storeData(data);
      } else {
            console.log("doc.data() retornou vazio")
        }
    })
  } else{
    storeData();
   }

}