import React, {useState} from "react";
import {styles} from "./styles";
import {useDispatch} from "react-redux";
import {checkStore, checkUser, setStore, setTokens} from "../../../utils";
import axiosInstance from "../../../networking/axiosInstance";
import {globalStyles, MapsScreenName, SET_CUSTOMER, SET_SHOP, SignupName, VerifyPhoneName} from "../../../constants";
import {Image, ScrollView, Text, TouchableOpacity, View, Alert} from "react-native";
import {AppButton, AppInput, Loading} from "../../../components";
import wing from "../../../assets/images/wing.png";
import axios from "axios";
import place from "../../../assets/images/place.png";
import search from "../../../assets/images/search.png";
import {YaMap, Marker} from "react-native-yamap";

export const MapsScreen = ({navigation}) => {
    const [countryText, setCountryText] = useState("");
    const [country, setCountry] = useState([]);
    const [selectedCountry, setSelectedCountry] = useState({});
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);


    const [location, setLocation] = useState({
        lat: 55.751244,
        lon: 37.618423,
        zoom: 7,
    });
    const onChangeTextFunc = (e, set) => {
        set(e);
    };
    const searchDataYandex = (st) => {
        axios.get(`https://geocode-maps.yandex.ru/1.x?apikey=da4e12cb-3403-409e-948c-c34e4dfaafaa&geocode=${countryText}&format=json`).then((res) => {
            setCountry(res.data.response.GeoObjectCollection.featureMember[0]);
            countryChangeFunc(res.data.response.GeoObjectCollection.featureMember[0],st);
        })
            .catch((e) => {
                setCountry([]);
                Alert.alert(
                    "",
                    "не найдено",
                );
                console.log(e, "ff");
            });
    };

    const countryChangeFunc = async (it,state) => {
        var str = it.GeoObject.Point.pos;
        var stringArray = str.split(/(\s+)/);
        if(!state){
            await axiosFunc({
                lat: +stringArray[2],
                lon: +stringArray[0],
                zoom: 8,
                name: it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[2].name,
                address:it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[3].name + ' ' + it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name    })
        } else {
            setLocation({
                lat: +stringArray[2],
                lon: +stringArray[0],
                zoom: 8,
                name: it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[2].name,
                address:it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[3].name + ' ' + it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name
            });
            setSelectedCountry({
                lat: +stringArray[2],
                lon: +stringArray[0],
                zoom: 8,
                name: it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[2].name,
                address:it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[3].name + ' ' + it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name    });
        }
    };

    const axiosFunc = async (location) => {
        await setStore(location);
        setLoading(true)
        try {
            const response = await axiosInstance.put(`/users/get-geo`, {city: location?.name,address:location?.address} );
             usersGet(location)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            console.log(e,'fff')
        }
    }
    const usersGet = async (location) => {
        try {
            const response = await axiosInstance.get("/users/profile/buyer");
            dispatch({
                type: SET_CUSTOMER,
                payload: response.data.user_data.user,
            });
             navigation.replace("TabNavigation");
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e,'ff');
        }
    };

    return (
        <View style={styles.container}>
            <YaMap
                userLocationIcon={{uri: "https://www.clipartmax.com/png/middle/180-1801760_pin-png.png"}}
                initialRegion={location}
                showUserPosition={false}
                rotateGesturesEnabled={false}
                zoomEnabled={true}
                nightMode={false}
                mapType={"vector"}
                style={{
                    flex: 1,
                    width: "100%",
                    height: "100%",
                }}>
                <Marker
                    point={location}
                    scale={2}
                    source={wing}
                />
            </YaMap>
            <View style={styles.footerCont}>
                <View style={styles.back_button_View}>

                </View>
                <View>
                    <Image source={place} style={styles.placeIcon} />
                    <AppInput
                        placeholder={"Введите адрес доставки"}
                        style={styles.input}
                        value={countryText}
                        onChangeText={(e) => onChangeTextFunc(e, setCountryText)}
                    />
                    <TouchableOpacity style={styles.searchCont} onPress={()=>searchDataYandex(true)}>
                        <Image source={search} style={styles.searchIcon}/>
                    </TouchableOpacity>
                </View>
                <AppButton
                    text={"Найти адрес"}
                    stylesContainer={styles.btn}
                    onPress={()=>searchDataYandex(false)}
                />
            </View>
            <Loading loading={loading}/>
        </View>
    );
};
