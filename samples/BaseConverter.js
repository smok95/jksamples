import React, { Component } from 'react';
import { Text, View, StyleSheet, Button, Alert } from 'react-native';
import { Constants } from 'expo';

export class BaseConverter extends Component {
    static navigationOptions = {
        title: '진법변환기',
    }
  
  _convert(v, base){
    var dec = '';
    
    // 어떤 진법수 수가 들어오든 10진수로 변환 후 다른 진법으로 변환.
    switch(base){
      case '10':  dec = v; break;
      case '16':  dec = parseInt(v, '16');  break;
      case '8':   dec = parseInt(v, '8');   break;
      case '2':   dec = parseInt(v, '2');   break;
    }
    
    this.setState({
      dec:dec.toString(),
      hex:dec.toString(16),
      oct:dec.toString(8),
      bin:dec.toString(2),
    });
  }
  _onPressButton(text){
    var dec = 1024;
    var hex = (512).toString(16);
    var oct = (256).toString(8);
    var bin = (128).toString(2);
    var str = '';
    switch(text){
      case '10': this._convert(dec, text); break;
      case '16': this._convert(hex, text); break;
      case '8':  this._convert(oct, text); break;
      case '2':  this._convert(bin, text); break;
    }
  }
  
  constructor(props){
    super(props);
    
    this.state = {
      hex:'',
      dec:'',
      oct:'',
      bin:'',
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Button title="Decimal" onPress={() => this._onPressButton('10')} />
        <Button title="Hexadecimal" onPress={() => this._onPressButton('16')} />
        <Button title="Octal" onPress={() => this._onPressButton('8')} />
        <Button title="Binary" onPress={() => this._onPressButton('2')} />
      
        <Text>hex= {this.state.hex} </Text>
        <Text>dec= {this.state.dec} </Text>
        <Text>oct= {this.state.oct} </Text>
        <Text>bin= {this.state.bin} </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
