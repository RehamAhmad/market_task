
import React, { Component } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    Dimensions
} from 'react-native';

import { ScrollViewContent } from '../common/scrollViewContent';
import { Indicator } from '../common/indicator';




const scrollViewContent = [{ title: 'Lorem ipsum dolor sit', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget enim pretium, dictum diam ac, vulputate nulla.', imagePath: 'https://banner.holidaypng.com/20191015/ywr/play-toy-christmas-ornament-for-thanksgiving-5da5bab568a786.64207737.png' },
{ title: 'Lorem ipsum dolor sit', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget enim pretium, dictum diam ac, vulputate nulla.', imagePath: 'https://icon.holidaypng.com/20191112/sfo/natural-foods-vegetable-cucurbita-for-thanksgiving-5dca2c914b2b47.81622521.png' },
{ title: 'Lorem ipsum dolor sit', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris eget enim pretium, dictum diam ac, vulputate nulla.', imagePath: 'https://icon.holidaypng.com/20191113/jco/plastic-for-christmas-5dcbb0322af0a9.87352279.png' },]

class OnBoardingScreen extends Component {
    scrollView;
    state = {
        indicatorIndex: 0,
        scrollend: 0
    }
    
    goToHomeScreen() {
        this.state.scrollend++;
        if (this.state.indicatorIndex == 2 && this.state.scrollend > 2) {
            setTimeout(()=>{this.props.navigation.navigate('HomeScreen')},300);
        }
    }
    renderViewContent() {
        return scrollViewContent.map((content,i) => {
            return <ScrollViewContent key={i} viewContent={content} />;
        })
    }
    render() {
        return (
            <>
                <SafeAreaView style={styles.container}>
                    <ScrollView
                        ref={ref => this.scrollView = ref}
                        onMomentumScrollEnd={(event) => {

                            this.index = (event.nativeEvent.contentOffset.x / Dimensions.get('window').width);
                            this.setState({ indicatorIndex: Math.round(this.index) });
                        }}
                        onTouchEnd={() => this.goToHomeScreen()}
                        contentInsetAdjustmentBehavior="automatic"
                        horizontal={true} pagingEnabled={true} showsHorizontalScrollIndicator={false}>
                        {this.renderViewContent()}

                    </ScrollView>
                    <Indicator index={this.state.indicatorIndex} activeIndicatorStyle={{backgroundColor:'red',borderColor:'red'}} noneActiveIndicatorStyle={{backgroundColor:'#fff',borderColor:'grey'}} screensNum={scrollViewContent.length}/>
                </SafeAreaView>
            </>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        minHeight: '100%',
        paddingVertical:'15%',
        backgroundColor: '#FEFEFE',
    },


});


export default OnBoardingScreen