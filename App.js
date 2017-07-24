import React from 'react';
import { Text, Button, View, FlatList } from 'react-native';
import { StackNavigator } from 'react-navigation';
import { LottoGenerator } from './samples/LottoGenerator.js';
import { Calculator } from './samples/Calculator.js';

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'jksamples',
  };
  render() {
    const { navigate } = this.props.navigation;
    return(
      <View>
        <FlatList
          data={[
            {key:'로또번호 생성기', routeName:'LottoGenerator'},
            {key:'계산기', routeName:'Calculator'},
          ]}
          renderItem={({item}) => <Text onPress={()=> navigate(item.routeName)}>{item.key}</Text>}/>
                  
      </View>
    ); 
  }
}

const RootNavigator = StackNavigator({
  Home: { screen: HomeScreen },
  LottoGenerator:{ screen : LottoGenerator},
  Calculator:{screen:Calculator},
});

export default class App extends React.Component{
  render(){
    return <RootNavigator/>;
  }
}

//AppRegistry.registerComponent('SimpleApp', () => SimpleApp);