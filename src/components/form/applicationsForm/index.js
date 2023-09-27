import React from "react";
import { styles } from "./styles";
import {Image, Text, TouchableOpacity, View} from "react-native";
import {ApplicationsDataName, BaseUrl, globalStyles} from "../../../constants";
import like from "../../../assets/images/likeTifany.png";

export const ApplicationsForm = ({ item,navigation }, index) => {
    const img  = Array.isArray(item.good_id.photo_list[0]) ? item.good_id.photo_list[0][0] : item.good_id.photo_list[0]

    // {uri : BaseUrl + '/' + item.store_id.logo_url}
    return (
        // item.delivery && (
            <View style={styles.applicationsContainer}>
      <View style={[globalStyles.row,styles.rowCont]}>
          <Image source={{uri : BaseUrl + '/' + img}} style={styles.imgForm} />
      </View>
        <Image source={like} style={styles.likeIc}/>
        <View style={styles.foot}>
            <View style={styles.applContent}>
                <Text style={[globalStyles.titleText,globalStyles.titleTextSmall,globalStyles.textAlignLeft,styles.name]}>{item.good_id.title}</Text>
            </View>
            <View style={styles.applicationsContent}>
                <View style={styles.shopCont}>
                    <Image source={like} style={styles.logo}/>
                    <Text style={[globalStyles.titleText,globalStyles.titleTextSmall4,globalStyles.textAlignLeft,globalStyles.weightLight,styles.name1]}>{item.good_id.title}</Text>
                </View>
                <View style={[globalStyles.row,styles.rowCont]}>
                    <Text style={[globalStyles.titleText,globalStyles.titleTextSmall4,globalStyles.textAlignLeft,globalStyles.weightLight,styles.name]}>{item.N}</Text>
                    <Text style={[globalStyles.titleText,globalStyles.weightBold]}>{item.good_id.price.$numberDecimal} р</Text>
                </View>
            </View>
        </View>
    </View>
        // )
  );
};
