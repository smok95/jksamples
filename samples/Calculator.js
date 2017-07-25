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

        this.state={displayText:'0'};

        this.onPressBtn.bind(this);
        this.curNum = '';
    }

    _clear(){
        this.setState({displayText:'0'});
    }

    _calc(){

    }

    onPressBtn(val){

        var isdigit = (val >= '0' && val <= '9') || val === '00';
        var ispoint = val==='.';

        var pointPos = this.curNum.toString().indexOf('.');
        if(isdigit){
            // 0중복 입력 방지            
            if(this.curNum.length===1 && this.curNum === '0' && (val === '0' || val === '00'))
                this.curNum = val;
            else
                this.curNum += val;
        }
        else if(ispoint){            
            // 소수점이 없는 경우에만 추가
            if(pointPos === -1){
                if(this.curNum.length===0)
                    this.curNum = '0';
                this.curNum += val;
            }
        }
        else{
            this.curNum = '';
        }

                
        switch(val)
        {
            case 'C':   this._clear();   break;
            case '=':   this._calc();    break;
            default:{                
                this.setState({displayText: this.curNum});
                //this.setState({displayText: this.state.displayText + val});                
            }break;
        }
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