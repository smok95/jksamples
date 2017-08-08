import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import base64 from 'base-64'; // 없는 경우 설치 : npm install base-64

export class Base64Convert extends React.Component {
    static navigationOptions = {
        title: 'Base64 Encode/Decode',
    };

    render() {
        let txt = "hello world!";
        let enc = base64.encode(txt);   // 인코딩
        let dec = base64.decode(enc);   // 디코딩

        return (
            <View style={styles.container}>
                <Text>encode</Text>
                <Text>{txt} -> {enc}</Text>
                <Text>decode</Text>
                <Text>{enc} -> {dec}</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
    },
});
