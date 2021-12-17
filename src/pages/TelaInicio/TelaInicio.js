import React, {useRef, useState} from 'react'
import * as react from 'react'
import { Animated,FlatList , ScrollView, StyleSheet, Text, View, SafeAreaView, Image, useWindowDimensions, TouchableOpacity} from 'react-native';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import * as Animatable from 'react-native-animatable'
import AppLoading from 'expo-app-loading';
import { getAuth } from "firebase/auth";
import { collection, doc, getDoc, getDocs, getFirestore } from "firebase/firestore";

const database = getFirestore();

const BGColor = "#4D4A95";

export default function TelaInicio({navigation, route}) {

    const scrollX = useRef(new Animated.Value(0)).current;
    const [animBtn1, setAnimBtn1] = useState(null);
    const [animBtn2, setAnimBtn2] = useState(null);
    const [animBtn3, setAnimBtn3] = useState(null);
    const [animBtn4, setAnimBtn4] = useState(null);

    let {width: windowWidth, height: windowHeight} = useWindowDimensions();
    windowHeight = windowHeight;

    const animBtn1FX = () => {
        setAnimBtn1('bounceIn')
    }
    const animBtn2FX = () => {
        setAnimBtn2('bounceIn')
    }
    const animBtn3FX = () => {
        setAnimBtn3('bounceIn')
    }
    const animBtn4FX = () => {
        setAnimBtn4('shake')
    }
    const fxOnTouchOut = () => {
        setTimeout(() => {
            setAnimBtn1(null)
            setAnimBtn2(null)
            setAnimBtn3(null)
            setAnimBtn4(null)
        }, 1000);
    }

    const images = [
    {id: 1, img: require("../../../assets/GameImg/NoImage.png"), title: "Treinamento", animFx: animBtn1, animFunction: animBtn1FX },
    {id: 2, img: require("../../../assets/GameImg/NoImage.png"), title: "Acerto de Contas", animFx: animBtn2, animFunction: animBtn2FX },
    {id: 3, img: require("../../../assets/GameImg/NoImage.png"), title: "Travar Batalha", animFx: animBtn3, animFunction: animBtn3FX },
    {id: 4, img: require("../../../assets/GameImg/NoImage.png"), title: "Guerra de Clãs", animFx: animBtn4, animFunction: animBtn4FX },
    ]
    
    return (
        <SafeAreaView style={styles.container}>
            <View style={{}}>
                <ScrollView
                horizontal={true}
                style={{paddingStart: wp('10')}}
                decelerationRate={"fast"}
                contentOffset={{x: wp('80')}}
                paddingEnabled
                showsHorizontalScrollIndicator={false}
                scrollEventThrottle={16}
                decelerationRate={0.99999999999}
                snapToInterval={wp('80')}
                onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {x: scrollX}}}],
                    {useNativeDriver: false}
                )}
                >
                    {images.map((image, imageIndex) => {
                        return (
                            <Animatable.View style={{width: wp('80')}} key={imageIndex} 
                            animation={image.animFx}>
                                <TouchableOpacity style={styles.btnOpt} activeOpacity={0.9} onPress={() => { image.animFunction(); fxOnTouchOut();}}>
                                    <Animatable.Image
                                    source={image.img}
                                    aspectRatio={0.81298828125}
                                    style={{
                                        width: windowWidth * 0.70,
                                        height: undefined,
                                        borderRadius: 35,
                                    }}/>
                                    <Text style={{position: 'absolute', fontSize: hp('1.9')}}>{image.title}</Text>
                                </TouchableOpacity>
                            </Animatable.View>
                        )
                    })}
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: BGColor,
    },
    SViewStyle:{
        
    },
    btnOpt:{
        flex: 1,
        marginVertical: '40%',
        overflow: 'hidden',
        alignSelf: 'center',
        alignItems: 'center', 
        justifyContent: 'flex-start'
    }
})
