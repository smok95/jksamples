import React, { Component } from 'react';
import { Text, View, StyleSheet, StatusBar } from 'react-native';


export class LottoResult extends Component {
    static navigationOptions = {
        title: '로또당첨정보',
    };

  constructor(props) {
    super(props);
    this.state = {
      winNo:'', // 당첨번호 
      bonusNo:'', // 보너스 번호 
      prizeMoney:'', // 당첨금 
      date:'',  // 추첨일 
      round:'', // 회차
      winTickets:'', // 1등 당첨자수 
      isSuccess:false
    };
  }
  
  componentDidMount() {
    /*
    응답값 예.
    {"bnusNo":21,"firstWinamnt":2173637297,"totSellamnt":69500769000,"returnValue":"success","drwtNo3":34,"drwtNo2":30,"drwtNo1":9,"drwtNo6":41,"drwtNo5":39,"drwtNo4":35,"drwNoDate":"2017-08-05","drwNo":766,"firstPrzwnerCo":8}
    */
    return fetch('http://www.nlotto.co.kr/common.do?method=getLottoNumber')
      .then((response) => response.json())
      .then((v) => {
        
        let winNo = v.drwtNo1 + ', ' + v.drwtNo2 + ', ' + v.drwtNo3 + ', ' + v.drwtNo4 + ', ' + v.drwtNo5 + ', ' + v.drwtNo6;
        
        if(v.returnValue === 'success') {
          this.setState({
            isSuccess:true,
            winNo: winNo,
            bonusNo: v.bnusNo,
            prizeMoney: v.firstWinamnt,
            date: v.drwNoDate,
            round: v.drwNo,
            winTickets: v.firstPrzwnerCo });  
        }
        else {
          this.setState({isSuccess:false});
        }
      })
      .catch((e) => {
        this.setState({isSuccess:false});
      });
      
  }
  
  render() {
    if(this.state.isSuccess){
       return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>
          {this.state.round} 회 로또당첨번호 {'\n\n'}
          추첨일 : {this.state.date + '\n'}
          당첨번호 : {this.state.winNo + '\n'}
          당첨금 : {this.state.prizeMoney + '원\n'}
          당첨자 : {this.state.winTickets + '명\n'}
          </Text>
        </View>
      ); 
    }
    else{
      return (
        <View style={styles.container}>
          <Text style={styles.paragraph}>당첨정보를 확인할 수 없습니다.</Text>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: StatusBar.currentHeight,
    backgroundColor: '#ecf0f1',
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'left',
    color: '#34495e',
  },
});
