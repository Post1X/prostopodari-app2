import React from "react";
import { styles } from "./styles";
import {BaseUrl, globalStyles, SubCategoryName} from "../../../constants";
import { Image, Text, TouchableOpacity, View } from "react-native";

import rightIcn from "../../../assets/images/rightIcon.png";

export function FormCategoryHorizontal({ item, index, changeFilterFunc }) {
  return (
    <TouchableOpacity style={[styles.containerForm]} onPress={()=>changeFilterFunc(item)}>
          <Image source={{ uri: BaseUrl + "/" + item.photo_url }} style={styles.img} />
          <Text style={[globalStyles.titleText, globalStyles.textAlignLeft,styles.title]}>{item.title}</Text>
    </TouchableOpacity>
  );
}
