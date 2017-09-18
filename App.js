import React from 'react';
import { Text, Button, View, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LottoGenerator } from './samples/LottoGenerator.js';
import { Calculator } from './samples/Calculator.js';
import { BaseConverter } from './samples/BaseConverter';
import { LottoResult } from './samples/LottoResult';
import { Base64Convert } from './samples/Base64Convert';
import { ViewPager } from './samples/ViewPager';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'jksamples',
  };
  render() {
    const { navigate } = this.props.navigation;
    return (
      <View>
        <FlatList
          data={[
            { key: '로또번호 생성기', routeName: 'LottoGenerator' },
            { key: '로또당첨정보', routeName: 'LottoResult' },
            { key: '계산기', routeName: 'Calculator' },
            { key: '진법변환기', routeName: 'BaseConverter' },
            { key: 'Base64 인/디코딩', routeName: 'Base64Convert' },
            { key: 'ViewPager', routeName: 'ViewPager' },
          ]}
          renderItem={({ item }) => <Text style={{ fontSize: 20, padding: 15 }} onPress={() => navigate(item.routeName)}>{item.key}</Text>} />

      </View>
    );
  }
}

const RootNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  LottoGenerator: { screen: LottoGenerator },
  Calculator: { screen: Calculator },
  BaseConverter: { screen: BaseConverter },
  LottoResult: { screen: LottoResult },
  Base64Convert: { screen: Base64Convert },
  ViewPager: { screen: ViewPager },
});

export default class App extends React.Component {
  render() {
    return <RootNavigator />;
  }
}

//AppRegistry.registerComponent('SimpleApp', () => SimpleApp);