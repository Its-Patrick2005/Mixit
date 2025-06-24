import React, { useRef, useState } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Button from './Button';
import { useNavigation } from 'expo-router';

const OTPInput = ({ length = 6, onComplete }) => {
    const navigation = useNavigation();
    const [otp, setOtp] = useState(Array(length).fill(''));
    const [isComplete, setIsComplete] = useState(false);
    const inputs = useRef([]);

    const handleChange = (text, idx) => {
        if (/^\d*$/.test(text)) {
            const newOtp = [...otp];
            newOtp[idx] = text;
            setOtp(newOtp);

            if (text && idx < length - 1) {
                inputs.current[idx + 1].focus();
            }
            const complete = newOtp.every(val => val.length === 1);
            setIsComplete(complete);
            if (complete) {
                onComplete && onComplete(newOtp.join(''));
            }
        }
    };

    const handleKeyPress = (e, idx) => {
        if (e.nativeEvent.key === 'Backspace' && otp[idx] === '' && idx > 0) {
            inputs.current[idx - 1].focus();
        }
    };

    const handleLogin = () => {
        // Add your login logic here
        onComplete && onComplete(otp.join(''));
    };

    return (
        <View style={styles.container}>
            <View style={styles.otpRow}>
                {otp.map((digit, idx) => (
                    <TextInput
                        key={idx}
                        ref={ref => (inputs.current[idx] = ref)}
                        style={styles.input}
                        keyboardType="number-pad"
                        maxLength={1}
                        value={digit}
                        onChangeText={text => handleChange(text, idx)}
                        onKeyPress={e => handleKeyPress(e, idx)}
                        autoFocus={idx === 0}
                    />
                ))}
            </View>
            {isComplete && (
                <Button
                    title="Login"
                    onPress={()=> navigation.navigate("Home")}
                    style={styles.loginButton}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    input: {
        width: 60,
        height: 60,
        borderWidth: 2,
        borderColor: '#004D00',
        borderRadius: 8,
        textAlign: 'center',
        fontSize: 20,
        backgroundColor: '#fff',
        marginHorizontal: 4,
    },
    loginButton: {
        marginTop: 24,
        width: 200,
    },
});

export default OTPInput;
