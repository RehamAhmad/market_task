
import React, { Component } from 'react';
import {
    TouchableOpacity,
    StyleSheet,
    Dimensions,
    View, Text,
    ImageBackground,
    Image
} from 'react-native';

import ScreenHeader from '../common/screenHeader';
import Icon from "react-native-vector-icons/Ionicons";
import { addProductToCart } from '../actions/action'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { ScrollView } from 'react-native-gesture-handler';

class CategoryDetailsScreen extends Component {
    state = {
        products: [],
        category_img: '',
        category_name: ''
    }
    componentDidMount() {
        this.setState({
            category_img: this.props.route.params.data.category_img ,
            category_name: this.props.route.params.data.name ,
            products: this.props.route.params.data.products ? this.props.route.params.data.products : []
        })
    }
    renderProductList() {
        return <ScrollView contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap' }}>
            {this.state.products.map((prod, i) => {
                var added = this.props.productsIds.includes(prod.id);
                return <View key={i} style={styles.prodView}>

                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('ProductDetailsScreen', { product: prod }) }}>
                        <Image source={{ uri: prod.product_img }} style={{ aspectRatio: 1.6, resizeMode: 'cover' }} />
                    </TouchableOpacity>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                        <View style={{ flexDirection: 'column' }}>
                            <Text style={{ fontSize: 15 }}>{prod.name}</Text>
                            <Text style={{ fontSize: 14, color: 'gray', lineHeight: 15 }}>{prod.weight}</Text>
                            <Text style={{ fontSize: 14, color: 'gray', lineHeight: 15 }}>{prod.price}</Text>
                        </View>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-end' }}>
                            <TouchableOpacity onPress={() => { this.props.addProductToCart(prod) }} style={[styles.addButton, { backgroundColor: added ? 'red' : '#9e9e9e8a', }]}>
                                <Icon name={added ? "md-checkmark" : "md-add"} color={added ? '#fff' : "#595757"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            })}</ScrollView>
    }

    render() {
        if (this.state.products.length < 1) {
            return null;
        }
        return <View style={{ minHeight: Dimensions.get('screen').height, backgroundColor: '#f2f2f2fa' }}>
            <ImageBackground source={{ uri: this.state.category_img }} style={{ width: '100%', height: 180 }}>
                <View style={{ height: '100%', width: '100%', backgroundColor: '#00000087' }}>
                    <ScreenHeader
                        iconColor={'#fff'}
                        cartIcon={true}
                        searchIcon={true}
                        backButton={true}
                        buttonAction={() => this.props.navigation.goBack()}
                        title={this.props.route.params.data.name}
                        searcIconAction={() => this.props.navigation.navigate('SearchProductsScreen')}
                        cartIconAction={() => this.props.navigation.navigate('ShoppingCartScreen')} />
                </View>
            </ImageBackground>
            {this.renderProductList()}
        </View>
    }
}
const styles = {
    prodView: {
        flexDirection: 'column',
        width: .5 * Dimensions.get('screen').width,
        height: 170,
        padding: '2%'
    },
    addButton: {
        width: 20,
        height: 20,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10
    }
}
const mapStateToProps = ({ Category }) => {
    const {  productsIds } = Category;
    return {  productsIds };
};


function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addProductToCart }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(CategoryDetailsScreen);