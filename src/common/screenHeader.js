import React, { Component } from 'react';
import {
    View,
    Dimensions, Text, Alert
} from 'react-native';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';


class ScreenHeader extends Component {
    render() {
        const { iconColor, backButton, menuButton, buttonAction, title, cartItemsNum, searchIcon, cartIcon, searcIconAction, cartIconAction } = this.props;

        return <View style={{ height: 45, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingHorizontal: 10 }}>
            <View style={{ flexDirection: 'row' }}>
                {menuButton ? <TouchableOpacity onPress={() => { Alert.alert('notworking') }}><Icon name="md-menu" size={25} color={iconColor} /></TouchableOpacity> : null}
                {backButton ? <TouchableOpacity onPress={buttonAction}><Icon name="md-arrow-back" size={25} color={iconColor} /></TouchableOpacity> : null}
                {title ? <Text style={styles.titleStyle}>{title}</Text> : null}
            </View>
            <View style={{ flexDirection: 'row' }}>
                {searchIcon ? <TouchableOpacity onPress={searcIconAction} >
                    <Icon name="md-search" size={25} color={iconColor} style={{ paddingRight: 15 }} />
                </TouchableOpacity> : null}
                {cartIcon ? <TouchableOpacity onPress={cartIconAction}>
                    <Text style={styles.cartTextStyle}>{cartItemsNum > 0 ? cartItemsNum : null}</Text>
                    <Icon name="md-cart" size={25} color={iconColor} />
                </TouchableOpacity> : null}
            </View>
        </View>
    };
}

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
    titleStyle: {
        fontSize: 14,
        color: '#fff',
        paddingLeft: 10,
        fontWeight: 'bold',
        paddingTop: 2
    },
    cartTextStyle: {
        color: 'red',
        position: 'absolute',
        right: 5,
        bottom: 9,
        zIndex: 9,
        fontSize: 17,
        fontWeight: 'bold',
        
    }
};

const mapStateToProps = ({ Category }) => {
    const cartItemsNum = Category.cartProducts.length;
    return { cartItemsNum };
};

export default connect(mapStateToProps)(ScreenHeader)