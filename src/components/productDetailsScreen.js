
import React, { Component } from 'react';
import {
    View, Text,
    ImageBackground
} from 'react-native';
import ScreenHeader from '../common/screenHeader';
import { connect } from 'react-redux';


class ProductDetailsScreen extends Component {
    state = {
        product: {},
    }
    componentDidMount() {
        this.setState({ product: this.props.route.params.product })
    }
    render() {

        return <View>
            <ImageBackground source={{ uri: this.state.product.product_img }} style={{ width: '100%', height: '100%' }}>
                <View style={{ height: '100%', width: '100%', backgroundColor: '#00000087' }}>
                    <ScreenHeader
                        iconColor={'#fff'}
                        cartIcon={true}
                        searchIcon={true}
                        backButton={true}
                        searcIconAction={() => this.props.navigation.navigate('SearchProductsScreen')}
                        cartIconAction={() => this.props.navigation.navigate('ShoppingCartScreen')}
                        buttonAction={() => this.props.navigation.goBack()}
                        title={this.state.product.name} />
                    <View style={{ height: '60%', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={{ color: '#edeaeaad', fontSize: 22, fontWeight: 'bold' }}>{this.state.product.name}</Text>
                        <Text style={{ color: '#edeaeaad', fontSize: 16, lineHeight: 30 }}>{this.state.product.weight}</Text>
                        <Text style={{ color: '#edeaeaad', fontSize: 16 }}>{this.state.product.price}</Text>
                    </View>
                </View>
            </ImageBackground>
        </View>
    }
}

const mapDispatchToProps = dispatch => {
    return {
        changeSettingsValue: (key, value) => {
            dispatch(changeSettingsValue(key, value));
        }
    };
};
export default connect(null, mapDispatchToProps)(ProductDetailsScreen);