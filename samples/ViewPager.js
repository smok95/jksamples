import React from 'react';
import { View, Text } from 'react-native';
import { PagerTabIndicator, IndicatorViewPager, PagerTitleIndicator, PagerDotIndicator } from 'rn-viewpager';

export class ViewPager extends React.Component {
    render() {
        return (
            <View style={{ flex: 1 }}>
                
                <IndicatorViewPager
                    style={{ flex: 1, paddingTop: 20, backgroundColor: 'white' }}
                    indicator={this._renderTitleIndicator()}
                >
                    <View style={{ backgroundColor: 'cadetblue' }}>
                        <Text>page one</Text>
                    </View>
                    <View style={{ backgroundColor: 'cornflowerblue' }}>
                        <Text>page two</Text>
                    </View>
                    <View style={{ backgroundColor: '#1AA094' }}>
                        <Text>page three</Text>
                    </View>
                </IndicatorViewPager>

            </View>
        );
    }

    _renderTitleIndicator() {
        return <PagerTitleIndicator titles={['one', 'two', 'three']} />;
    }

    _renderDotIndicator() {
        return <PagerDotIndicator pageCount={3} />;
    }
}