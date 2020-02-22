import React, { Component } from 'react';
import { Text, ScrollView, TouchableOpacity, Image, Dimensions, TextInput, View } from 'react-native'
import ScreenHeader from '../common/screenHeader';
import Icon from "react-native-vector-icons/Ionicons";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addProductToCart } from '../actions/action'
class SearchProductsScreen extends Component {
    state = { products: [], searchInput: '' }

    componentDidMount() {
        this.setState({ products: this.props.allProducts })
    }
    onChangeInput(text) {
        this.setState({
            searchInput: text,
            products: [...this.props.allProducts.filter(p => (p.name.toLowerCase()).includes((text).toLowerCase()))]
        });

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
                            <TouchableOpacity onPress={() => { this.props.addProductToCart(prod) }} style={{ width: 20, height: 20, backgroundColor: added ? 'red' : '#9e9e9e8a', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', borderRadius: 10 }}><Icon name={added ? "md-checkmark" : "md-add"} color={added ? '#fff' : "#595757"} /></TouchableOpacity>
                        </View>
                    </View>
                </View>
            })}</ScrollView>
    }
    render() {
        if (this.props.allProducts.length < 1) {
            return <View><Text>No DATAAA</Text></View>
        }
        return (
            <View style={{ minHeight: Dimensions.get('screen').height }}>
                <ScreenHeader
                    buttonAction={() => this.props.navigation.goBack()}
                    cartIcon={true} iconColor='#000'
                    backButton={true}
                    cartIconAction={() => this.props.navigation.navigate('ShoppingCartScreen')}
                />
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <View style={{ height: 40, width: '95%', paddingHorizontal: 5, marginTop: 5, borderColor: 'grey', borderWidth: 1, borderStyle: 'solid', borderRadius: 5 }}>
                        <TextInput
                            style={{ height: '100%', width: '100%', }}
                            value={this.state.searchInput}
                            onChangeText={(text) => { this.onChangeInput(text) }}
                            // autoFocus={true}
                            placeholder={'Search product....'}
                        />
                    </View>
                    {this.renderProductList()}
                </View>
            </View>
        );
    }

}

const mapStateToProps = ({ Category }) => {
    const { allProducts, productsIds } = Category;
    // console.log('allProducts', allProducts)
    return { allProducts, productsIds };
};



function mapDispatchToProps(dispatch) {
    return bindActionCreators({ addProductToCart }, dispatch)
}
export default connect(mapStateToProps, mapDispatchToProps)(SearchProductsScreen);