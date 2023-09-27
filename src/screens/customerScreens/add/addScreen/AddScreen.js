import React, {useEffect, useState} from "react";
import {styles} from "./styles";
import {Alert, Dimensions, FlatList, Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import WebView from "react-native-webview";

import DatePicker from "react-native-date-picker";
import {
    AppButton,
    AppInput,
    ChooseImage,
    FormCategory, globalHeight, globalWidth,
    Loading,
    MultipleImage,
    TrushForm
} from "../../../../components";
import {
    AddScreenName,
    BaseUrl,
    Colors,
    globalStyles,
    HomeName,
    HomeScreenName,
    SaveItemName
} from "../../../../constants";
import SelectDropdown from "react-native-select-dropdown";
import axiosInstance from "../../../../networking/axiosInstance";
import {useSelector} from "react-redux";
import korz from "../../../../assets/images/korz.png";
import {checkCountry} from "../../../../utils/countryStroage";
import {Marker, Polyline, YaMap} from "react-native-yamap";
import wing from "../../../../assets/images/wing.png";
import axios from "axios";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;

export const AddScreen = ({navigation}) => {
    const [isCanCancelContentTouches, setCanCancelContentTouches] = React.useState(true);
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])
    const [price, setPrice] = useState(0)
    const [promoFlag, setPromoFlag] = useState(false)
    const [promoText, setPromoText] = useState('')
    const [banner, setBanner] = useState('')
    const [location, setLocation] = useState({
        lat: 55.751244,
        lon: 37.618423,
        zoom: 7,
    });
    const [locationEnd, setLocationEnd] = useState(null);
    const [points, setPoints] = useState([]);
    const [delivery, setDelivery] = useState(0)
    const store = useSelector((st) => st.customer);
    const [open, setOpen] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dateNum, setDateNum] = useState(null);
    const [dateDate, setDateDate] = useState('')
    const [promoCode, setPromoCode] = useState('');
    const [address, setAddress] = useState(null);
    const [address1, setAddress1] = useState(null);
    const [address2, setAddress2] = useState(null);
    const [name, setName] = useState(null);
    const [phone, setPhone] = useState(null);
    const [comment, setComment] = useState('')
    const [km, setKm] = useState('')
    const [error, setError] = useState('')
    const [dateTime, setDateTime] = useState("");
    const [addressAll, setAddressAll] = useState('')
    const storePlace = data[0]?.user.city + ' ' + data[0]?.user.address
    const userPlace = store.city + ' ' + store.address
    const [url, setUrl] = useState("");
    const [ref, setRef] = useState(null);
    const [postcard, setPostCard] = useState('')
    const [allCount, setAllCount] = useState(0)
    const onPressFunc = () => {
        if (Object.keys(data).length) {
            if (address && address1 && address2 && name && phone && dateDate && dateTime && addressAll && km) {
                axiosFunc()
            } else if (!address) {
                setError('Укажите подъезд')
            } else if (!address1) {
                setError('Укажите Этаж')
            } else if (!address2) {
                setError('Укажите квартирa')
            } else if (!name) {
                setError('Укажите Имя')
            } else if (!phone) {
                setError('Укажите Телефон')
            } else if (!dateDate) {
                setError('Укажите дата')
            } else if (!dateTime) {
                setError('Укажите время')
            } else if (!addressAll) {
                setError('Укажите адрес')
            } else if (!km) {
                setError('Укажите адрес')
            }
        }
    }

    const countryChangeFunc = (it) => {
        var str = it.GeoObject.Point.pos;
        var stringArray = str.split(/(\s+)/);
        setLocation({
            lat: +stringArray[2],
            lon: +stringArray[0],
            zoom: 12,
            name: it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[2].name,
            address: it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[3].name + ' ' + it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name
        });
    };

    const countryChangeFuncEnd = (it) => {
        var str = it.GeoObject.Point.pos;
        var stringArray = str.split(/(\s+)/);
        setLocationEnd({
            lat: +stringArray[2],
            lon: +stringArray[0],
            zoom: 12,
            name: it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[2].name,
            address: it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[3].name + '' + it.GeoObject.metaDataProperty.GeocoderMetaData.Address.Components[4].name
        });
    };
    const startDataYandex = () => {
        axios.get(`https://geocode-maps.yandex.ru/1.x?apikey=da4e12cb-3403-409e-948c-c34e4dfaafaa&geocode=${userPlace}&format=json`).then((res) => {
            countryChangeFunc(res.data.response.GeoObjectCollection.featureMember[0]);
        })
            .catch((e) => {
                Alert.alert(
                    "",
                    "не найдено",
                );
                console.log(e, "ff");
            });
    };

    useEffect(() => {
        if (addressAll.length > 5) {
            let timer = setTimeout(() => {
                searchDataYandex(store.city + " " + addressAll);
            }, 500)
            return () => clearTimeout(timer)
        }
    }, [addressAll])

    const searchDataYandex = (st) => {

        axios.get(`https://geocode-maps.yandex.ru/1.x?apikey=da4e12cb-3403-409e-948c-c34e4dfaafaa&geocode=${st}&format=json`).then((res) => {
            let loc = res.data.response.GeoObjectCollection.featureMember[0].GeoObject.name + ' ' + res.data.response.GeoObjectCollection.featureMember[0].GeoObject.description
            axios.get(`https://maps.googleapis.com/maps/api/directions/json?destination=${loc}&origin=${storePlace}&key=AIzaSyDGnTNMKk7nklAM7Z3dWTV5_JV_auarQVs`).then((res) => {
                let data = res.data.routes[0].legs[0];
                const k = data.distance.text.replace(/[^0-9\.]+/g, "");
                setKm(k)
                let polylineRes = [
                    {
                        lat: data.start_location.lat,
                        lon: data.start_location.lng,
                    }
                ]
                setLocationEnd({
                    lat: data.end_location.lat,
                    lon: data.end_location.lng,
                    zoom: 12,
                })
                for (let i = 0; i < data.steps.length; i++) {
                    polylineRes.push({
                        lat: data.steps[i].end_location.lat,
                        lon: data.steps[i].end_location.lng,
                    })
                }
                setPoints([...polylineRes]);
            })
                .catch((e) => {

                    Alert.alert(
                        "",
                        "не найдено",
                    );
                    console.log(e, "ff");
                });

        })
            .catch((e) => {
                Alert.alert(
                    "",
                    "не найдено",
                );
                console.log(e, "ff");
            });


    };

    useEffect(() => {
        startDataYandex()
    }, [])

    const axiosFunc = async () => {
        setLoading(true)
        try {
            const data = {
                address: `${address}п., ${address1}э., ${address2}кв.`,
                name,
                phone_number: phone,
                city: store.city,
                day: dateDate,
                time: dateTime,
                comment,
                addressAll: addressAll,
                delivery: +km
            }
            if (promoFlag) {
                data.promocode = promoCode
            }
            if (postcard) {
                data.postcard = postcard
            }
            const response = await axiosInstance.post('/orders', data)
            paymentFunc()
            // navigation.navigate(HomeScreenName)
            setLoading(false)
        } catch (e) {
            setLoading(false)
            if (e?.response?.data?.message) {
                setError(e?.response?.data?.message)
            }
            console.log(e)
        }
    }

    const paymentFunc = async () => {
        try {
            const response = await axiosInstance.post("/orders/payment", {value: 500});
            setUrl(response.data.data);
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            setLoading(true)
            getFav();
        });
        return unsubscribe;
    }, [navigation]);

    useEffect(() => {
        getBanner()
    }, []);

    const getBanner = async () => {
        try {
            const response = await axiosInstance.get('/goods/banner')
            setBanner(response.data.banner)
        } catch (e) {
            console.log(e)
        }
    }

    const activeFunc = async () => {
        try {
            const response = await axiosInstance.post('/promocodes/check', {text: promoCode})
            setPromoFlag(response.data)
            if (!response.data) {
                setPromoText('Неверный промокод')
            }
        } catch (e) {
            console.log(e)
        }
    }

    const onChangeFunc = (e, set) => {
        setError('')
        set(e)
    }

    const getFav = async () => {
        try {
            const response = await axiosInstance.get('/carts')
            if (Object.keys(response.data).length) {
                setData(response.data)
                let sum = 0
                for (let i = 0; i < response.data.length; i++) {
                    sum += response.data[i].items[0].good_id?.price * response.data[i].items[0].count
                }
                setAllCount(sum)
                setLoading(false)
                setDelivery(+response.data[0].items[0].store_id?.distance.$numberDecimal)
            }
        } catch (e) {
            setLoading(false)
            console.log(e)
        }
    }

    const setOpenFunc = (num) => {
        setDateNum(num)
        setOpen(true);
    };

    return (
        Object.keys(data).length ?
            url ?
                <WebView
                    ref={setRef} source={{uri: url}}
                    style={{flex: 1}}
                    onError={() => {
                        setUrl('');
                        navigation.replace(AddScreenName);
                    }}
                />
                :
                <View style={globalStyles.container}>
                    <ScrollView contentContainerStyle={globalStyles.scrollContainer}
                                canCancelContentTouches={isCanCancelContentTouches}
                                scrollEnabled={isCanCancelContentTouches}>
                        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground}/>
                        <View style={styles.headerContainer}>
                            <Text style={styles.addText}>Корзина</Text>
                            <View style={styles.cameraContainer}>
                                <Text
                                    style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, globalStyles.weightLight, styles.titleForm]}>Сделать
                                    заказ можно только выбрав товары одного магазина</Text>
                            </View>
                            <>
                                <View style={styles.shopContAll}>
                                    <View>
                                        <View style={styles.shopCont}>
                                            <Image source={{
                                                uri: BaseUrl + '/' +
                                                    data[0]?.items[0]?.store_id.logo_url
                                            }} style={styles.imgShop}/>
                                            <View style={styles.contShp}>
                                                <Text
                                                    style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, globalStyles.weightLight]}>Магазин</Text>
                                                <Text
                                                    style={[globalStyles.titleText, globalStyles.textAlignLeft, styles.ops]}>
                                                    {data[0]?.items[0]?.store_id.title}</Text>
                                            </View>
                                        </View>
                                    </View>
                                </View>
                                {data.map((item, index) => {
                                    return (
                                        <TrushForm
                                            item={item}
                                            key={index}
                                            index={index}
                                            navigation={navigation}
                                            setAllCount={setAllCount}
                                            allCount={allCount}
                                            // plusMinus={getFav}
                                        />
                                    )
                                })}
                                <View style={styles.applicationsContainer}>
                                    <View style={styles.changeContent}>
                                        <View style={[globalStyles.row]}>
                                            <Image source={{uri: BaseUrl + '/' + banner}} style={styles.imgForm}/>
                                            <View style={styles.textCont}>
                                                <Text
                                                    style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Текст
                                                    на открытке:</Text>
                                                <AppInput
                                                    placeholder={'Введите текст для открытки'}
                                                    style={styles.otkritka}
                                                    onChangeText={(e) => {
                                                        setPromoText('')
                                                        onChangeFunc(e, setPostCard)
                                                    }}
                                                />
                                            </View>

                                        </View>
                                    </View>
                                </View>
                            </>
                        </View>
                        <View style={styles.headerContainer}>
                            <View style={[globalStyles.row, styles.footHead]}>
                                <Text
                                    style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Сумма: <Text
                                    style={[globalStyles.weightBold,]}>{allCount} р</Text></Text>
                                <Text
                                    style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Доставка: <Text
                                    style={[globalStyles.weightBold,]}>{delivery} р</Text> </Text>
                            </View>
                            <View style={styles.cont}>
                                <Text
                                    style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft, styles.proText]}>Промокод</Text>
                                <View style={styles.proCont}>
                                    {promoFlag ?
                                        <Text
                                            style={[globalStyles.titleText, globalStyles.weightLight, styles.proTextActive]}>общая
                                            цена -5 %</Text>
                                        :
                                        <>
                                            <AppInput
                                                placeholder={'Промокод'}
                                                style={styles.inp}
                                                autoCapitalize={"characters"}
                                                value={promoCode}
                                                onChangeText={(e) => {
                                                    setPromoText('')
                                                    onChangeFunc(e.toUpperCase(), setPromoCode)
                                                }}
                                            />
                                            <AppButton
                                                text={'Активировать'}
                                                stylesText={styles.textBtn}
                                                stylesContainer={styles.contBtn}
                                                onPress={() => {
                                                    activeFunc()
                                                }}
                                            />
                                        </>
                                    }
                                </View>
                                {promoText && (<Text style={[globalStyles.error, styles.promoErr]}>{promoText}</Text>)}
                            </View>
                            <View>
                                <View style={styles.contAdd}>
                                    <Text
                                        style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Город</Text>
                                    <Text
                                        style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft, styles.text]}>{store.city}</Text>
                                </View>
                                <View style={styles.contAdd}>
                                    <Text
                                        style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>адрес</Text>
                                    <AppInput
                                        placeholder={'адрес'}
                                        style={styles.addressStyle}
                                        onChangeText={(e) => onChangeFunc(e, setAddressAll)}

                                    />
                                </View>
                                <View style={styles.flatmateCont}>
                                    <View>
                                        <Text
                                            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Подьезд</Text>
                                        <AppInput
                                            placeholder={''}
                                            style={styles.inpSmall}
                                            keyboardType={'numeric'}
                                            onChangeText={(e) => onChangeFunc(e, setAddress)}
                                        />
                                    </View>
                                    <View>
                                        <Text
                                            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Этаж</Text>
                                        <AppInput
                                            placeholder={''}
                                            style={styles.inpSmall}
                                            keyboardType={'numeric'}
                                            onChangeText={(e) => onChangeFunc(e, setAddress1)}
                                        />
                                    </View>
                                    <View>
                                        <Text
                                            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Квартира</Text>
                                        <AppInput
                                            placeholder={''}
                                            style={styles.inpSmall}
                                            keyboardType={'numeric'}
                                            onChangeText={(e) => onChangeFunc(e, setAddress2)}

                                        />
                                    </View>
                                </View>
                                <View>
                                    <Text
                                        style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft, styles.textCont]}>Имя
                                        получателя</Text>
                                    <AppInput
                                        placeholder={'Имя получателя'}
                                        onChangeText={(e) => onChangeFunc(e, setName)}

                                    />
                                </View>
                                <View style={styles.flatmateContCont}>

                                    <View style={styles.date}>
                                        <Text
                                            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft,]}>На
                                            когда</Text>
                                        <TouchableOpacity style={[globalStyles.row, styles.graphicContent]}
                                                          onPress={() => setOpenFunc(false)}>
                                            <Text
                                                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall]}>{dateDate ? dateDate : "00-00-00"}</Text>
                                        </TouchableOpacity>
                                    </View>
                                    <View>
                                        <Text
                                            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft]}>Время</Text>
                                        <TouchableOpacity style={[globalStyles.row, styles.graphicContent]}
                                                          onPress={() => setOpenFunc(true)}>
                                            <Text
                                                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall]}>{dateTime ? dateTime : "00-00"}</Text>
                                        </TouchableOpacity>
                                    </View>

                                </View>
                                <View>
                                    <Text
                                        style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft, styles.textCont]}>Телефон
                                        получателя</Text>
                                    <AppInput
                                        placeholder={'Телефон'}
                                        keyboardType={'numeric'}
                                        onChangeText={(e) => onChangeFunc(e, setPhone)}

                                    />
                                </View>
                                <View>
                                    <Text
                                        style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft, styles.textCont]}>Коментарий</Text>
                                    <AppInput
                                        style={styles.inputBig}
                                        editable
                                        numberOfLines={5}
                                        multiline
                                        onChangeText={(e) => onChangeFunc(e, setComment)}

                                    />
                                </View>
                            </View>
                            {error && (<Text style={globalStyles.error}>{error}</Text>)}
                            <AppButton
                                text={'Заказать'}
                                stylesContainer={styles.contButton}
                                onPress={onPressFunc}
                            />
                        </View>
                        <View style={{
                            flex: 1,
                            alignItems: 'center',
                            justifyContent: 'center',
                            marginVertical: globalHeight(20)
                        }}
                              onTouchStart={() => setCanCancelContentTouches(false)}
                              onTouchEnd={() => setCanCancelContentTouches(true)}>

                            <YaMap
                                userLocationIcon={{uri: "https://www.clipartmax.com/png/middle/180-1801760_pin-png.png"}}
                                initialRegion={location}
                                showUserPosition={false}
                                rotateGesturesEnabled={false}
                                zoomEnabled={true}
                                nightMode={false}
                                mapType={"vector"}
                                style={{
                                    width: '100%',
                                    height: height / 2,
                                }}>
                                {points.length ?
                                    <Polyline
                                        points={points}
                                        strokeColor={'black'}
                                    />
                                    :
                                    null
                                }
                                <Marker
                                    point={location}
                                    scale={2}
                                    source={wing}
                                />
                                {locationEnd ?
                                    <Marker
                                        point={locationEnd}
                                        scale={2}
                                        source={wing}
                                    />
                                    :
                                    null
                                }
                            </YaMap>


                        </View>
                    </ScrollView>

                    <Loading loading={loading}/>
                    <DatePicker
                        modal
                        open={open}
                        locale={"ru"}
                        is24hourSource={"locale"}
                        mode={dateNum ? "time" : "date"}
                        date={date}
                        onConfirm={(date) => {

                            if (dateNum) {
                                const hours = date.getHours();
                                const minutes = date.getMinutes();
                                const m = '' + minutes
                                const min = m.length === 1 ? `0${minutes}` : minutes
                                setDateTime(`${hours}:${min}`);
                                setDate(date);
                            } else {
                                const result = date.toLocaleDateString('en-GB')
                                let mm = date.getMonth() + 1;
                                const m = "" + mm
                                const mmm = m.length === 1 ? `0${m}` : m
                                let dd = date.getDate();
                                const d = "" + dd
                                const ddd = d.length === 1 ? `0${d}` : d
                                let yy = date.getFullYear();
                                let myDateString = ddd + '.' + mmm + '.' + yy; //(US)
                                setDateDate(myDateString)
                            }
                            setError('')
                            setOpen(false);
                        }}
                        onCancel={() => {
                            setOpen(false);
                        }}
                    />
                </View>
            :
            <View style={styles.contNoData}>
                <Text
                    style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextBig, styles.pustaText]}>Корзина</Text>
                <View>
                    <View style={styles.korzCont}>
                        <Image source={korz} style={styles.korz}/>
                    </View>
                    <Text
                        style={[globalStyles.titleText, globalStyles.titleTextBig, globalStyles.weightLight, styles.korzContText]}>Ваша
                        корзина пуста</Text>
                    <AppButton
                        text={'Выбрать товары'}
                        stylesContainer={styles.pustCont}
                        onPress={() => navigation.navigate(HomeScreenName)}
                    />
                </View>
                <View/>
            </View>

    );
};


