import React, {useEffect, useState} from "react";
import {styles} from "./styles";
import {Image, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";

import rightIcon from "../../../../assets/images/rightIcon.png";
import bottomIcon from "../../../../assets/images/bottomIcon.png";
import shopIcon from "../../../../assets/images/shopIcon.png";
import place from "../../../../assets/images/place.png";
import {
    BaseUrl,
    Colors,
    CreateShopName,
    FinancialReportName, globalStyles,
    MyDetailsScreenName,
    PromotionServicesName,
    ShopDataName,
    EditMyDetailsName
} from "../../../../constants";
import {ChangePasswordModal, ChangeShopModal, Loading} from "../../../../components";
import axiosInstance from "../../../../networking/axiosInstance";
import {useSelector} from "react-redux";

export const ProfileScreen = ({navigation}) => {
    const store = useSelector(st => st.customer);
    const [loading, setLoading] = useState(false);

    const loadingFunc = (val) => setLoading(val);
    const navigationFunc = (nav) => {
        navigation.navigate(nav);
    };

    console.log(store,'ffdsg')


    return (
        <View style={globalStyles.container}>
            <ScrollView contentContainerStyle={globalStyles.container}>
                <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground}/>
                <View style={styles.headerContainer}>
                    {store?.full_name && (
                        <Text
                            style={[globalStyles.titleText, globalStyles.titleTextSmall, globalStyles.textAlignLeft, styles.shopName]}>{store.full_name}</Text>
                    )}
                                <View style={globalStyles.row}>
                                    <Image source={place} style={styles.placeIcon}/>
                                    <Text
                                        style={[globalStyles.titleText, globalStyles.weightLight, styles.placeText]}>г.
                                        {store.city}</Text>
                                </View>
                </View>
                <View>
                    <TouchableOpacity style={[styles.buttonContainer, styles.activeInActiveContainer]}
                                      onPress={() => navigationFunc(PromotionServicesName)}>
                        <View style={styles.activeContainer}>
                            <Text
                                style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.titleTextSmall, globalStyles.weightLight,styles.activeTextHeader]}>
                                Значимые даты
                            </Text>

                        </View>
                        <Image source={rightIcon} style={styles.RightIcon}/>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={() => navigationFunc(FinancialReportName)}>
                        <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Мои покупки</Text>
                        <Image source={rightIcon} style={styles.RightIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}
                                      onPress={() => navigationFunc(EditMyDetailsName)}>
                        <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Мои данные</Text>
                        <Image source={rightIcon} style={styles.RightIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Частые вопросы</Text>
                        <Image source={rightIcon} style={styles.RightIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Условия предоставления
                            услуг</Text>
                        <Image source={rightIcon} style={styles.RightIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Политика обработки
                            персонал...</Text>
                        <Image source={rightIcon} style={styles.RightIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={[globalStyles.titleText, globalStyles.weightLight]}>О приложении</Text>
                        <Image source={rightIcon} style={styles.RightIcon}/>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonContainer}>
                        <Text style={[globalStyles.titleText, globalStyles.weightLight]}>Поддержка</Text>
                        <Image source={rightIcon} style={styles.RightIcon}/>
                    </TouchableOpacity>
                </View>
            </ScrollView>
            <Loading loading={loading}/>
        </View>
    );
};
