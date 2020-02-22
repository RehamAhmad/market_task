import * as React from 'react';
import { BackHandler, View, Text, ActivityIndicator, ImageBackground, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import CategoryApi from '../apis/categoryApi';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Indicator } from '../common/indicator';
import Icon from "react-native-vector-icons/Ionicons";
import ScreenHeader from '../common/screenHeader'
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { setAllProducts } from '../actions/action';

const homeHeaderImages = [
    'https://images.pexels.com/photos/2846123/pexels-photo-2846123.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1393382/pexels-photo-1393382.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/1855214/pexels-photo-1855214.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
    'https://images.pexels.com/photos/769289/pexels-photo-769289.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'


]
class HomeScreen extends React.Component {
    state = {
        data: [],
        indicatorIndex: 0,
        loading: false,
        error: false
    }
    componentDidMount() {
        this.setState({ loading: true });
        var products = [];
        CategoryApi.getCategoriesData().then(res => {
            this.setState({ data: res.data, loading: false, error: false });
            res.data.map(data => {
                products.push(...data.products);
            });
            this.props.setAllProducts(products);
        }).catch(err => {
            this.setState({ loading: false, error: true });
            console.log('error', err);
        });
        BackHandler.addEventListener('hardwareBackPress', this.onHardwareBackPress);
    };
    componentWillUnmount() {
        BackHandler.removeEventListener('hardwareBackPress', this.onHardwareBackPress);
    }
    onHardwareBackPress = () => {
        return true;
    }
    renderHomeHeader() {
        return <View style={{ height: 200 }}>
            <ScrollView
                ref={ref => this.scrollView = ref}
                onMomentumScrollEnd={(event) => {
                    this.index = (event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                    this.setState({ indicatorIndex: Math.round(this.index) });
                }}
                contentInsetAdjustmentBehavior="automatic"
                horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
                {homeHeaderImages.map((img, i) => {
                    return <View key={i} style={styles.viewStyle}><ImageBackground source={{ uri: img }} style={{ width: Dimensions.get('screen').width, aspectRatio: 1.2, resizeMode: 'contain' }}></ImageBackground></View>
                })}

            </ScrollView>
            <Indicator index={this.state.indicatorIndex} activeIndicatorStyle={{ backgroundColor: 'transparent', borderColor: '#fff' }} noneActiveIndicatorStyle={{ backgroundColor: '#fff', borderColor: 'transparent' }} screensNum={homeHeaderImages.length} />
        </View>
    }

    renderCategories() {
        if (this.state.data.length < 1 && !this.state.error) {
            return <View><Text>No Data</Text></View>
        }
        if (this.state.error) {
            return <View><Text>Error has been happened.. Contact support</Text></View>
        }
        return <View style={styles.listViewStyle}>
            {this.state.data.map(d => {
                return <ImageBackground key={d.id} source={{ uri: d.category_img }} style={styles.catStyle}>
                    <TouchableOpacity onPress={() => { this.props.navigation.navigate('CategoryDetailsScreen', { data: d }) }} style={styles.buttonStyle}>
                        <Text style={{ fontSize: 15, color: '#fff' }}>{d.name}</Text>
                    </TouchableOpacity>
                </ImageBackground>
            })}
        </View>
    }
    render() {
        if (this.state.loading) {
            return <ActivityIndicator />
        }
        return (
            <ScrollView style={{ minHeight: Dimensions.get('screen').height }}>
                <ScreenHeader
                    iconColor='#000'
                    cartIcon={true}
                    searchIcon={true}
                    menuButton={true}
                    searcIconAction={() => this.props.navigation.navigate('SearchProductsScreen')}
                    cartIconAction={() => this.props.navigation.navigate('ShoppingCartScreen')} />
                {this.renderHomeHeader()}
                {this.renderCategories()}
            </ScrollView>
        );
    }
}

const styles = {
    viewStyle: {
        flex: 1,
        width: Dimensions.get('screen').width,
        flexDirection: 'column',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    listViewStyle: {
        width: Dimensions.get('screen').width,
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        flexWrap: 'wrap',
        alignContent: 'flex-start'
    },
    catStyle: {
        width: '100%',
        aspectRatio: 1.2,
        resizeMode: 'contain',
        width: .47 * Dimensions.get('screen').width,
        height: '100%',
        margin: '1%'
    },
    buttonStyle: {
        width: '100%',
        height: '100%',
        backgroundColor: '#31303054',
        flexDirection: 'column',
        justifyContent: 'flex-end',
        padding: 10
    }
}

const mapDispatchToProps = dispatch => {
    return bindActionCreators({ setAllProducts }, dispatch)

};

export default connect(null, mapDispatchToProps)(HomeScreen)