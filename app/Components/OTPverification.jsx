import { useRef, useState } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';
import { useTheme } from '../theme.jsx';

const OTPverification = ({ value, onChange }) => {
    const { theme } = useTheme();
    const [otp, setOtp] = useState(['', '', '', '', '', '']);
    const [isComplete, setIsComplete] = useState(false);
    const inputs = useRef([]);

    const handleChange = (text, idx) => {
        if (/^\d*$/.test(text)) {
            const newOtp = [...otp];
            newOtp[idx] = text;
            setOtp(newOtp);

            if (text && idx < 5) {
                inputs.current[idx + 1].focus();
            }
            const complete = newOtp.every(val => val.length === 1);
            setIsComplete(complete);
            if (complete) {
                onChange && onChange(newOtp.join(''));
            }
        }
    };

    const handleKeyPress = (e, idx) => {
        if (e.nativeEvent.key === 'Backspace' && !otp[idx] && idx > 0) {
            inputs.current[idx - 1].focus();
        }
    };

    const handleLogin = () => {
        // Handle login logic
        console.log("Login pressed");
    };

    return (
        <View style={styles.container}>
            <Text style={[styles.title, { color: theme.primaryText }]}>
                Enter the verification code sent to your email
            </Text>
            <View style={styles.otpRow}>
                {otp.map((digit, idx) => (
                    <TextInput
                        key={idx}
                        ref={ref => (inputs.current[idx] = ref)}
                        style={[styles.input, { 
                            borderColor: digit ? theme.primaryGreen : theme.borderLight,
                            backgroundColor: theme.inputBackground,
                            color: theme.primaryText,
                        }]}
                        value={digit}
                        onChangeText={(text) => handleChange(text, idx)}
                        onKeyPress={(e) => handleKeyPress(e, idx)}
                        keyboardType="numeric"
                        maxLength={1}
                    />
                ))}
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        marginVertical: 20,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 20,
        textAlign: 'center',
    },
    otpRow: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginBottom: 30,
    },
    input: {
        width: 45,
        height: 45,
        borderWidth: 2,
        borderRadius: 8,
        marginHorizontal: 5,
        textAlign: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    loginButton: {
        paddingVertical: 12,
        paddingHorizontal: 40,
        borderRadius: 25,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    loginButtonText: {
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default OTPverification;
