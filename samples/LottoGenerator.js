import React from 'react';
import { StyleSheet, Text, View, Button, Alert } from 'react-native';

export class LottoGenerator extends React.Component {
  static navigationOptions = {
    title: '로또번호 생성기',
  };

  constructor(props){
    super(props);
    this.state = {numbers:this.generate()};
  }
  onPressButton(){
    this.setState({numbers:this.generate()});    
  }

  generate(){
    var nums = [];
    for(var i=1; i<=45; i++)
      nums.push(i);
    
    var retStr = '';
    for(var i=0; i<6; i++){
      var idx = Math.floor(Math.random()*nums.length);

      var sVal = nums[idx].toString();
      retStr += (sVal.length===2 ? sVal:' ' + sVal) + "  ";
      nums.splice(idx, 1);
    }
    
    return retStr;
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={{color:'white', marginBottom:20, fontSize:30, fontWeight:'bold'}}>{this.state.numbers}</Text>
        <Button color='skyblue' title={'로또번호 생성'} onPress={() => this.onPressButton()} />    
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'steelblue',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
