import React from 'react';
import { Text, Button, View } from 'react-native';
import { StackNavigator } from 'react-navigation';

class ChatScreen extends React.Component{
  static navigationOptions = {
    title: 'Chat with Lucy',
  };

  render(){
    return(
      <View>
        <Text>Chat with Lucy</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  static navigationOptions = {
    title: 'Welcome',
  };
  render() {

    const { navigate } = this.props.navigation;

    return(
      <View>
        <Text>Hello, Navigation!</Text>
        <Button onPress={() => navigate('Chat')} title="Chat with Lucy"/>
      </View>
    ); 
  }
}

export default App = StackNavigator({
  Home: { screen: HomeScreen },
  Chat:{ screen: ChatScreen}
});

//AppRegistry.registerComponent('SimpleApp', () => SimpleApp);