import React, {useEffect, useState} from "react";
import {styles} from "./styles";
import {FlatList, ScrollView, StatusBar, Text, TouchableOpacity, View} from "react-native";
import {Colors, globalStyles} from "../../../../constants";
import {
    ApplicationsData_,
    ApplicationsForm,
    FilterData,
    FilterForm,
    FormSubCategory, ShopDataForm,
    ShopFavorite
} from "../../../../components";
import axiosInstance from "../../../../networking/axiosInstance";


export const AplicationsScreen = ({navigation}) => {
    const [active, setActive] = useState("Товары");
    const [store, setStore] = useState([])
    const [good,setGood] = useState([])

    useEffect(() => {
        const unsubscribe = navigation.addListener("focus", () => {
            getStore()
            getShop()

        });
        return unsubscribe;
    }, [navigation]);

    const getStore = async () => {
        try {
            const response = await axiosInstance.get("/favorites");
            setGood(response.data);
        } catch (e) {
            console.log(e);
        }
    }

    const getShop = async () => {
        try {
            const response = await axiosInstance.get("/favorites/stores");
            setStore(response.data);

        } catch (e) {
            console.log(e);
        }
    }


    return (<View style={[globalStyles.container]}>
        <StatusBar barStyle="dark-content" hidden={false} backgroundColor={Colors.blueBackground}/>
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text
                    style={[globalStyles.titleText, globalStyles.textAlignLeft, globalStyles.weightBold, globalStyles.titleTextBig, styles.textZakaz]}>Заказы</Text>

                <View style={[globalStyles.row, styles.headerFooter]}>
                    <TouchableOpacity
                        style={active === 'Товары' && styles.activeText}
                        onPress={() => setActive('Товары')}>
                        <Text
                            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, styles.headerFooterText, active === 'Товары' && styles.activeTextContent]}>Товары</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={active === 'Магазины' && styles.activeText}
                        onPress={() => setActive('Магазины')}>
                        <Text
                            style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, styles.headerFooterText, active === 'Магазины' && styles.activeTextContent]}>Магазины</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </View>
        {active === 'Товары' ?
            <FlatList
                data={good}
                renderItem={({item, index}) => {
                    return (
                        <ApplicationsForm
                            item={item}
                            key={index}
                            navigation={navigation}
                        />);
                }}
            />
            :
            <FlatList
                data={store}
                renderItem={({item, index}) => {

                    return (<ShopDataForm
                        item={item}
                        key={index}
                        navigation={navigation}
                    />);
                }}
            />
        }

    </View>);
};
