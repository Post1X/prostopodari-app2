import React from "react";
import { styles } from "./styles";
import { Image, Text, TouchableOpacity, View } from "react-native";
import {BaseUrl, globalStyles, GoodsImgName} from "../../../constants";


export function ImgForm({ item, index,navigation,data }) {
  return (
      <TouchableOpacity activeOpacity={1} style={styles.contImg}  onPress={()=>navigation && (navigation.navigate(GoodsImgName,{data}))}>
          <Image source={{ uri: BaseUrl + '/' + item }} style={styles.logoStyle} />
      </TouchableOpacity>
  );
}
