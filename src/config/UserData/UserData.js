import React, {useState, useEffect} from 'react'
import { getAuth } from '@firebase/auth'
import { collection, doc, getDoc, getDocs, getFirestore, onSnapshot  } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';

const database = getFirestore();

export default function UserData() {

  console.log("Retornou")

  let cont = false;

  const storeData = async (value) => {
    try {
      const jsonValue = JSON.stringify(value)
      await AsyncStorage.setItem('UserData', jsonValue)
      console.log('AsyncStorage "UserData": ' + await AsyncStorage.getItem('UserData'))
    } catch (e) {
        console.log('Not storaged')
      }
  }

  if( cont === false){
    const docRef = onSnapshot(doc(database, "usuarios", getAuth().currentUser.uid), (doc) => {
      if(doc.data().name !== null || doc.data().name !== '') {
        console.log("UserData has been found sucessfully")
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

