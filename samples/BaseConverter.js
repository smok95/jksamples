import React, { Component } from 'react';
import { Text, View, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import { Constants } from 'expo';

class KeyPad extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: this.props.backgroundColor || 'white',
      visible: true,
    };
  }
  render() {
    var styles = StyleSheet.create({
      button: {
        margin: 5,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: this.state.backgroundColor,
        flex: 1,
      },
    });

    return (
      <TouchableOpacity style={styles.button} onPress={this.props.onPress} disabled={this.props.disabled || false}>
        <Text style={{ fontSize: 30, color: this.props.disabled ? this.state.backgroundColor : 'black', }}>
          {this.props.value}
        </Text>
      </TouchableOpacity>
    );
  }
}

const BaseBIN = 2
const BaseOCT = 8
const BaseDEC = 10
const BaseHEX = 16

export class BaseConverter extends Component {
  constructor(props) {
    super(props);

    this.state = { temp: '', 
      curBase:BaseDEC,
      hex:'',
      dec:'',
      oct:'',
      bin:'',
    };
  }
  
  _clearAll(){
    this.setState({
      dec:'',
      hex:'',
      oct:'',
      bin:'',
    });
  }

  _backspace(){
    var val = '';

    switch(this.state.curBase){
      case 10:  val = this.state.dec.slice(0,-1); break;
      case 16:  val = this.state.hex.slice(0,-1); break;
      case 8:   val = this.state.oct.slice(0,-1); break;
      case 2:   val = this.state.bin.slice(0,-1); break;
    }
    
    if(val.length === 0)
      val = '0';

    this._convert(val, this.state.curBase);
  }

  _convert(v, base){    
    let dec = parseInt(v, base.toString());   
    
    if(dec > Number.MAX_SAFE_INTEGER)
    {
      Alert.alert("too big number!!!");
      return;
    }

    this.setState({
      dec:dec.toString(),
      hex:dec.toString(16),
      oct:dec.toString(8),
      bin:dec.toString(2),
    });
  }
  
  _onPress(key) {
    
    if(key === 'AC'){
      this._clearAll();
    }
    else if(key === '<-'){
      this._backspace();      
    }
    else{
      var val = '';
       // 어떤 진법수 수가 들어오든 10진수로 변환 후 다른 진법으로 변환.
      switch(this.state.curBase){
        case 10:  val = this.state.dec + key; break;
        case 16:  val = this.state.hex + key; break;
        case 8:   val = this.state.oct + key; break;
        case 2:   val = this.state.bin + key; break;
      }

      this._convert(val, this.state.curBase);
    }
  }
  
  _onBtnPress(title){
    var type = null;
    switch(title){
      case "HEX": type = BaseHEX; break;
      case "DEC": type = BaseDEC; break;
      case "OCT": type = BaseOCT; break;
      case "BIN": type = BaseBIN; break;
    }
    //Alert.alert('type=' + type.toString());
    this.setState({curBase:type});
  }
  
  render() {
    
    let disableHex = this.state.curBase < BaseHEX;
    let disableDec = this.state.curBase < BaseDEC;
    let disableOct = this.state.curBase < BaseOCT;
    let disableBin = this.state.curBase < BaseBIN;
    
    return (
      <View style={styles.container}>
        <View style={{backgroundColor: 'white', flex: 8, alignItems: 'stretch', justifyContent: 'space-between',}}>
          <TouchableOpacity onPress={()=> this._onBtnPress('DEC')} >
            <Text style={{fontSize:20}}>DEC={this.state.dec}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this._onBtnPress('HEX')} >
            <Text style={{fontSize:20}}>HEX={this.state.hex}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this._onBtnPress('OCT')} >
            <Text style={{fontSize:20}}>OCT={this.state.oct}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={()=> this._onBtnPress('BIN')} >
            <Text style={{fontSize:20}}>BIN={this.state.bin}</Text>
          </TouchableOpacity>            
        </View>
        <View style={{ backgroundColor: 'skyblue', flex: 7 }}>
          <View
            style={{
              flexDirection: 'row',
              backgroundColor: 'white',
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <KeyPad value="A" onPress={() => this._onPress('A')} disabled={disableHex} />
            <KeyPad value="B" onPress={() => this._onPress('B')} disabled={disableHex} />
            <KeyPad value="C" onPress={() => this._onPress('C')} disabled={disableHex} />
            <KeyPad value="D" onPress={() => this._onPress('D')} disabled={disableHex} />
          </View>
          <View
            style={{ flexDirection: 'row', backgroundColor: 'white', flex: 1 }}>
            <KeyPad value="7" onPress={() => this._onPress('7')} disabled={disableOct} />
            <KeyPad value="8" onPress={() => this._onPress('8')} disabled={disableDec} />
            <KeyPad value="9" onPress={() => this._onPress('9')} disabled={disableDec} />
            <KeyPad value="E" onPress={() => this._onPress('E')} disabled={disableHex} />
          </View>
          <View
            style={{ flexDirection: 'row', backgroundColor: 'white', flex: 1 }}>
            <KeyPad value="4" onPress={() => this._onPress('4')} disabled={disableOct} />
            <KeyPad value="5" onPress={() => this._onPress('5')} disabled={disableOct} />
            <KeyPad value="6" onPress={() => this._onPress('6')} disabled={disableOct} />
            <KeyPad value="F" onPress={() => this._onPress('F')} disabled={disableHex} />
          </View>
          <View
            style={{ flexDirection: 'row', backgroundColor: 'white', flex: 1 }}>
            <KeyPad value="1" onPress={() => this._onPress('1')} disabled={disableBin} />
            <KeyPad value="2" onPress={() => this._onPress('2')} disabled={disableOct} />
            <KeyPad value="3" onPress={() => this._onPress('3')} disabled={disableOct} />
            <KeyPad value="<-" onPress={() => this._onPress('<-')} />
          </View>
          <View
            style={{ flexDirection: 'row', backgroundColor: 'white', flex: 1 }}>
            <View style={{ flex: 1 }} />
            <KeyPad value="0" onPress={() => this._onPress('0')} disabled={disableBin} />
            <View style={{ flex: 1 }} />
            <KeyPad value="AC" onPress={() => this._onPress('AC')} />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: 'gray',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#34495e',
  },
});
