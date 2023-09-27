import React,{useState} from "react";
import { styles } from "./styles";
import { globalStyles } from "../../../../constants";
import { Dimensions, Image, TouchableOpacity, View,Text } from "react-native";
import backWhite from '../../../../assets/images/backWht.png'
import Carousel from "react-native-snap-carousel";
import { ImgForm } from "../../../../components";

let width = Dimensions.get("window").width;
let height = Dimensions.get("window").height;
export const GoodsImgScreen = ({ navigation, route }) => {
    const data = route.params.data;
    const [index,setIndex] = useState(1)
    console.log(data)
    return (
        <View style={[globalStyles.container,styles.containerImg]}>
            <TouchableOpacity style={styles.bckCont} onPress={()=>navigation.goBack()}>
                <Image source={backWhite} style={styles.bckImg}/>
            </TouchableOpacity>
            <View style={styles.containerImgCarousel}>
                <Carousel
                    inactiveSlideOpacity={0.6}
                    inactiveSlideScale={0.65}
                    firstItem={0}
                    sliderWidth={width}
                    itemWidth={width}
                    onSnapToItem={(index) => setIndex(index+1)}
                    data={data}
                    renderItem={({ item, index }) => {
                        return (
                            <ImgForm
                                item={item}
                                index={index}
                                data={data}
                                setIndex={setIndex}
                            />);
                    }}
                    containerCustomStyle={{ overflow: "visible" }}
                    contentContainerCustomStyle={{ overflow: "visible" }}
                />
            </View>
            <Text style={styles.colorText}>{index} - {data.length}</Text>
        </View>
    );
};
