import React, {useState} from "react";
import {styles} from "./styles";
import {useDispatch} from "react-redux";
import {checkUser, setTokens} from "../../../utils";
import axiosInstance from "../../../networking/axiosInstance";
import {Colors, globalStyles, SET_CUSTOMER, SET_SHOP, SignupName, VerifyPhoneName} from "../../../constants";
import {Image, ScrollView, Text, TouchableOpacity, View} from "react-native";
import CheckBox from 'react-native-check-box'
import {
    AppButton,
    AppForm,
    AppInput,
    BackButton, Loading,
    passwordValidate,
    validateEmail,
} from "../../../components";

import line from "../../../assets/images/line.png";
import pinkMonster from "../../../assets/images/pinkMonster.png";
import giftIconPink from "../../../assets/images/giftIconPink.png";
import SwitchToggle from "react-native-switch-toggle";

export const SignIn = ({navigation}) => {
    const [phone, setPhone] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState(false);

    const onChangeTextFunc = (e, set) => {
        setError("");
        set(e);
    };
    const navigationFunc = async () => {
        setLoading(true)
        try {
            const data = {phone_number: phone}
            const response = await axiosInstance.post("/users/register/buyer/call", data);
            navigation.navigate(VerifyPhoneName, {phone})
            setLoading(false);
        } catch (e) {
            setLoading(false);
            console.log(e);
        }

    };
    const onPressFunc = () => {
        if (phone.length > 8 && status) {
            navigationFunc()
        } else if(phone.length <= 8){
            setError('неверный Телефон ');
        }else if(!status) {
            setError('нажмите на флажки');
        }
    }

    return (
        <ScrollView contentContainerStyle={globalStyles.scrollContainer}>
            <View style={[styles.container, globalStyles.container]}>
                <View style={styles.headerContainer}>
                    <View style={styles.backContainer}>
                        <BackButton navigation={navigation}/>
                    </View>
                    <Image source={pinkMonster} style={styles.pinkMonster}/>
                    <Image source={line} style={styles.lineImg}/>
                </View>
                <View style={styles.formContainer}>
                    <AppForm>
                        <View style={styles.formHeader}>
                            <Image source={giftIconPink} style={styles.giftIconPink}/>
                            <Text style={[styles.titleForm, globalStyles.titleText]}>Войти в учетную запись</Text>
                        </View>
                        <View>
                            <View style={styles.inputContainer}>
                                <AppInput
                                    placeholder={"Телефон"}
                                    keyboardType={'phone-pad'}
                                    onChangeText={(e) => {
                                        onChangeTextFunc(e, setPhone);
                                    }}
                                    style={styles.input}
                                />
                            </View>
                            <Text style={styles.error}>{error}</Text>
                            <AppButton
                                text={"Войти"}
                                onPress={() => onPressFunc()}
                            />
                            <View style={styles.switchContainer}>
                                <CheckBox
                                    onClick={()=>{
                                        setStatus(!status)
                                        setError('')
                                    }}
                                    isChecked={status}
                                    leftText={"CheckBox"}
                                />
                                <Text style={[globalStyles.titleText, globalStyles.titleTextSmall,styles.checkStyle]}>я соглашаюсь с
                                    <Text style={[styles.SignInTextBold]}>условиями использования сайта</Text> и <Text style={[styles.SignInTextBold]}>политикой обработки персональный данных</Text>
                                </Text>
                            </View>
                        </View>

                    </AppForm>
                </View>
            </View>
            <Loading loading={loading}/>


        </ScrollView>
    );
};
