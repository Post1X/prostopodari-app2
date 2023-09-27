import React, {useEffect, useState} from "react";
import {styles} from "./styles";
import {FlatList, Image, Text, TouchableOpacity, View} from "react-native";
import {CategoryData, FormCategory, BackButton, chooseData, WaitingForm, AddTrushData} from "../../../../components";
import {AddScreenName, globalStyles, HomeScreenName, SignInName} from "../../../../constants";


export const AddTrushScreen = ({navigation, route}) => {
    // const onPressMainBtn = () => navigation.navigate();
    const deleteFunc = () => {
        navigation.navigate(HomeScreenName)
    }
    const data = {
        navigation,
        deleteFunc,
        ...AddTrushData
    }

    const addFunc = () =>{
        navigation.navigate(AddScreenName)
    }
    return (
        <View style={globalStyles.container}>
            <WaitingForm
                data={data}
                add={true}
                addFunc={addFunc}
            />
        </View>
    )
};
