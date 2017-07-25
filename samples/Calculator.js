import React from 'react';
import {View, Text, StyleSheet, Alert, TouchableHighlight} from 'react-native';

class NumPad extends React.Component{
    constructor(props){
        super(props);
    }

    _onPress(){
        if(this.props.onPress !== null)
            this.props.onPress(this.props.value);
    }

    render(){    
        var styles = StyleSheet.create({
            button:{
                flex:this.props.flex || 1, padding:0, marginRight:1, marginBottom:1, 
                backgroundColor:'white', 
                justifyContent:'center', alignItems:'center'
            }            
        });
``
        return(
            <TouchableHighlight style={styles.button} onPress={(() => this._onPress())}>
                <Text style={{color:'#555555', fontSize:25, fontWeight:'bold'}}>{this.props.value}</Text>
            </TouchableHighlight>
        );
    }
}

export class Calculator extends React.Component{
    static navigationOptions={
        title:'계산기',
    }
    
    constructor(props){
        super(props);

        this.state={displayText:''};

        this.onPressBtn.bind(this);
        this.curNum = '';
    }

    _clear(){
        this.curNum = '';        
    }

    _calc(){

    }

    onPressBtn(val){

        // 소수점 위치
        let dotIdx = this.curNum.indexOf('.');        
        let len = this.curNum.length;
        
        switch(val)
        {
            case '1': 
            case '2': 
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
            case '0': {
                // 소수점없이 0이 앞에 올 수 없음. 
                if(this.curNum === '0')
                    this.curNum = '';
                this.curNum += val;
            }break;
            case '00':{                
                 if(this.curNum === '0') // 0만 입력된 경우
                    this.curNum = '0';
                 else if(len === 0) // 00이 첫 입력값인 경우
                    this.curNum = '0';
                 else
                    this.curNum += val;
            }break;
            case '.':{
                // 소수점이 이미 있으면 추가하지 않는다.
                if(dotIdx === -1){
                    // 소수점이 1번째 입력값이면 0을 붙여준다.
                    if(len === 0)
                        this.curNum += '0' + val;
                    else
                        this.curNum += val;
                }
            }break;
            case 'C':   this._clear();   break;
            case '=':   this._calc();    break;
            default:{                
                //this.setState({displayText: this.curNum});
                //this.setState({displayText: this.state.displayText + val});                
            }break;
        }

        this.setState({displayText: this.curNum});
        //Alert.alert('onPressBtn ' + val);        
    }

    render(){
      var numPadText = [          
          '7', '8', '9', '×',
          '4', '5', '6', '-',
          '1', '2', '3', '+',
          '00','0', '.', '='];

      var rows = [];
      var cols = [];
      
      rows.push(          
          <View key='-1' style={styles.column}>
            <NumPad flex={1.5} onPress={(val) => this.onPressBtn(val)} value={'C'}/>
            <NumPad flex={1.5} onPress={(val) => this.onPressBtn(val)} value={'<='}/>
            <NumPad flex={1} onPress={(val) => this.onPressBtn(val)} value={'÷'}/>
          </View>
      );

      for(var i=0; i<4; i++)
      {
        cols.push(
          <View key={i} style={styles.column}>
            <NumPad onPress={(val) => this.onPressBtn(val)} value={numPadText[i*4]}/>
            <NumPad onPress={(val) => this.onPressBtn(val)} value={numPadText[i*4+1]}/>
            <NumPad onPress={(val) => this.onPressBtn(val)} value={numPadText[i*4+2]}/>
            <NumPad onPress={(val) => this.onPressBtn(val)} value={numPadText[i*4+3]}/>
          </View>
          );
      }
      
      for(i=0; i<4; i++)
        rows.push( <View style={styles.column} key={i}>
            <NumPad onPress={(val) => this.onPressBtn(val)} value={numPadText[i*4]}/>
            <NumPad onPress={(val) => this.onPressBtn(val)} value={numPadText[i*4+1]}/>
            <NumPad onPress={(val) => this.onPressBtn(val)} value={numPadText[i*4+2]}/>
            <NumPad onPress={(val) => this.onPressBtn(val)} value={numPadText[i*4+3]}/>
        </View> );
        
        return(
          <View style={styles.container}>
            <View style={{flex:0.35, backgroundColor:'lightblue', justifyContent:'flex-end'}}>
                <Text style={{fontSize:30, textAlign:'right'}}>{this.state.displayText}</Text>
            </View>
            <View style={{flex:0.65, flexDirection:'column', backgroundColor:'white'}}>                
              {rows}
            </View>
          </View>
        );
    }
}

const styles = StyleSheet.create({
  container:{
    flex:1,
    flexDirection:'column',
  },
  row:{
    flex:1, flexDirection:'row', margin:0, padding:0, backgroundColor:'blue'
  },
  column:{
      flex:1, flexDirection:'row', padding:0, backgroundColor:'silver'
  }
});