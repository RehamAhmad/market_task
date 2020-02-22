import React, { Component } from 'react';
import {
    View,
    Dimensions
} from 'react-native';


const Indicator = ({ index, screensNum, activeIndicatorStyle, noneActiveIndicatorStyle }) => {
    var indicators = [];

    for (var i = 0; i < screensNum; i++) {
        indicators.push(i);
    }

    return <View style={styles.viewStyle}>
        {indicators.map(ind => {
            return <View key={ind}
                style={[styles.indicatorStyle, index == ind ? activeIndicatorStyle : noneActiveIndicatorStyle]}>
            </View>
        })}
    </View>
};

const styles = {

    viewStyle: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        width: Dimensions.get('screen').width,
        bottom: 50,
    },
    indicatorStyle: {
        height: 8, width: 8,
        borderRadius: 4,
        borderStyle: 'solid',
        borderWidth: .6,
        margin: 4
    },
};
export { Indicator };