import React from 'react';
import {View, Text, StyleSheet, Alert, TouchableHighlight, TouchableOpacity} from 'react-native';

class CalcButton extends React.Component{
    constructor(props){
        super(props);
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
            <TouchableOpacity style={styles.button} onPress={this.props.onPress}>
                <Text style={{color:'#555555', fontSize:25, fontWeight:'bold'}}>{this.props.value}</Text>
            </TouchableOpacity>
        );
    }
}

export class Calculator extends React.Component{
    static navigationOptions={
        title:'계산기',
    }
    
    constructor(props){
        super(props);

        this.state={
            displayText:'',  // 입력값 문자열
            resultText:''   // 계산결과 문자열
        };

        this.onPressBtn.bind(this);
        this.curNum = '';
        this.prvNum = '';
    }

    _clear(){
        this.curNum = '';
        this.prvNum = '';  
        
        this.setState({
            resultText:'',
            displayText:''
        });
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

        this.setState({displayText: this.displayText});        
    }

    render(){
      var btnText = [          
          '7', '8', '9', '×',
          '4', '5', '6', '-',
          '1', '2', '3', '+',
          '00','0', '.', '='];

      var rows = [];      
      rows.push(          
          <View key='-1' style={styles.column}>
            <CalcButton flex={3} onPress={() => this.onPressBtn('C')} value={'C'}/>
            <CalcButton flex={1} onPress={() => this.onPressBtn('+')} value={'÷'}/>
          </View>
      );

      for(i=0; i<4; i++){
        let t1 = btnText[i*4];
        let t2 = btnText[i*4+1];
        let t3 = btnText[i*4+2];
        let t4 = btnText[i*4+3];
        rows.push( <View style={styles.column} key={i}>
            <CalcButton onPress={() => this.onPressBtn(t1)} value={t1}/>
            <CalcButton onPress={() => this.onPressBtn(t2)} value={t2}/>
            <CalcButton onPress={() => this.onPressBtn(t3)} value={t3}/>
            <CalcButton onPress={() => this.onPressBtn(t4)} value={t4}/>
        </View> );        
      }
        
        return(
          <View style={styles.container}>
            <View style={{flex:0.25, backgroundColor:'lightblue', justifyContent:'flex-end'}}>
                <Text style={{fontSize:30, textAlign:'right'}}>{this.state.resultText}</Text>
            </View>
            <View style={{flex:0.10, backgroundColor:'lightblue', justifyContent:'flex-end'}}>
                <Text style={{fontSize:20, textAlign:'right'}}>{this.state.displayText}</Text>
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