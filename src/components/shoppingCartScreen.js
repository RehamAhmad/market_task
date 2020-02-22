import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity, Image, Dimensions, TextInput, View } from 'react-native'
import ScreenHeader from '../common/screenHeader';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProductToCart } from '../actions/action'

class ShoppingCartScreen extends Component {
    state = { products: [], searchInput: '' }

    componentDidMount() {
        this.setState({ products: this.props.cartProducts })
    }

    renderProductList() {
        return <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'flex-start', marginTop: 10 }}>
            {this.state.products.map((prod, i) => {
                var added = this.props.productsIds.includes(prod.id);
                return <View key={i} style={{ flexDirection: 'column', width: .5 * Dimensions.get('screen').width, height: 170, padding: '2%' }}>

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
                            <TouchableOpacity onPress={() => { this.props.addProductToCart(prod) }} style={{ width: 20, height: 20, backgroundColor: added ? 'red' : '#9e9e9e8a', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}>
                                <Icon name={added ? "md-checkmark" : "md-add"} color={added ? '#fff' : "#595757"} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            })}</ScrollView>
    }
    render() {
        if (this.props.cartProducts.length < 1) {
            return <View>
                <ScreenHeader buttonAction={() => this.props.navigation.goBack()} searchIcon={true} iconColor='#000' backButton={true} searcIconAction={() => this.props.navigation.navigate('SearchProductsScreen')} />
                <Text>Cart is empty</Text>
            </View>
        }
        return (
            <View style={{ minHeight: Dimensions.get('screen').height }}>
                <ScreenHeader buttonAction={() => this.props.navigation.goBack()} cartIcon={true} iconColor='#000' backButton={true} searcIconAction={() => this.props.navigation.navigate('SearchProductsScreen')} />
                {this.renderProductList()}
            </View>
        );
    }

}

const mapStateToProps = ({ Category }) => {
    const { cartProducts, productsIds } = Category;
    return { cartProducts, productsIds };
};



function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addProductToCart }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(ShoppingCartScreen);