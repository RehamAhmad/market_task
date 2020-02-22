import React from 'react';
import {
    View,
    Text,
    Image,
    Dimensions,
    Button
} from 'react-native';



const ScrollViewContent = ({ viewContent }) => {

    return <View style={styles.viewStyle}>
        <Image style={styles.imageStyle}
            source={{ uri: viewContent.imagePath }} />
        <View style={styles.textView}>
            <Text style={{ fontFamily: 'serif', fontSize: 20 }}>{viewContent.title}</Text>
            <Text style={styles.textStyle}>{viewContent.text}</Text>
        </View>
    </View>

};

const styles = {
    viewStyle: {
        flex: 1,
        width: Dimensions.get('screen').width,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    textView: {
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 30
    },
    imageStyle: {
        width: 280,
        height: 250,
        resizeMode: 'contain'
    },
    textStyle: {
        lineHeight: 24,
        fontSize: 14,
        fontWeight: "100",
        textAlign: 'center',
        color: '#514b4b',
        paddingTop: 20
    }
};
export { ScrollViewContent };