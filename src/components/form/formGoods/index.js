import React from "react";
import {styles} from "./styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {BaseUrl, globalStyles, GoodsDataName} from "../../../constants";
import dntLike from '../../../assets/images/dntLike.png'
import like from '../../../assets/images/likeTifany.png'

export function FormGoods({item, addFavoriteFunc, navigation,index}) {
    const img  = Array.isArray(item.photo_list[0]) ? item.photo_list[0][0] : item.photo_list[0]
    return (
        // item.is_promoted &&
        <TouchableOpacity style={styles.containerForm} onPress={() => navigation.navigate(GoodsDataName, {item})}>
            <View style={styles.imgFormCont}>
                <Image source={{uri : BaseUrl + '/' + img}} style={styles.imgForm} />
            </View>
            <View style={styles.formContent}>
                <View style={styles.goodsText}>
                    <View>
                        <View style={styles.rowLikesContainer}>
                            <Text
                                style={[globalStyles.titleText, globalStyles.weightLight, globalStyles.titleTextSmall, globalStyles.textAlignLeft,]}>{item.title}</Text>
                            <TouchableOpacity onPress={() => {
                                addFavoriteFunc(item,index)
                            }}>
                                <Image source={item.is_favorite ? like : dntLike} style={styles.likeIc}/>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Text
                    style={[globalStyles.titleText, globalStyles.weightBold, globalStyles.titleTextSmall, globalStyles.textAlignLeft, styles.goodsText]}>{item.price} р</Text>
            </View>
        </TouchableOpacity>
    );
}
