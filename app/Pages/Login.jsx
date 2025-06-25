import { MaterialIcons } from "@expo/vector-icons";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";
// import OtpInput from "react-otp-input"; // Not compatible with React Native
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../Components/Button";
import OTPverification from "../Components/OTPverification";

const Login = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Email validation function-
  const isValidEmail = (email) => {
    // Simple email regex for validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  return (
    <View className="flex-1 items-center py-[40%] bg-[#D9ECD9] relative">
      <View
        className="rounded-full overflow-hidden"
        style={{ width: "40%", aspectRatio: 1, alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/Asset 4.png")}
          className="w-full h-full object-cover"
          resizeMode="contain"
        />
      </View>

      <View style={{ width: "80%", marginTop: 32 }}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={"#ccc"}
          value={username}
          onChangeText={setUsername}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 12,
            padding: 10,
            backgroundColor: "#fff",
          }}
        />
        {submitted && !username ? (
          <Text style={{ color: "red" }}>Username is required</Text>
        ) : null}

        <TextInput
          placeholder="Email"
          placeholderTextColor={"#ccc"}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 12,
            padding: 10,
            backgroundColor: "#fff",
          }}
        />
        {submitted && !email ? (
          <Text style={{ color: "red" }}>Email is required</Text>
        ) : submitted && !isValidEmail(email) ? (
          <Text style={{ color: "red" }}>Enter a valid email address</Text>
        ) : null}

        <View style={{ position: "relative", marginBottom: 12 }}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#ccc"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#fff",
              paddingRight: 40,
            }}
          />
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#888"
            style={{ position: "absolute", right: 10, top: 12 }}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        {submitted && !password ? (
          <Text style={{ color: "red" }}>Password is required</Text>
        ) : null}

        <View style={{ position: "relative", marginBottom: 12 }}>
          <TextInput
            placeholder="Confirm Password"
            placeholderTextColor={"#ccc"}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={!showConfirmPassword}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#fff",
              paddingRight: 40,
            }}
          />
          <MaterialIcons
            name={showConfirmPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#888"
            style={{ position: "absolute", right: 10, top: 12 }}
            onPress={() => setShowConfirmPassword(!showConfirmPassword)}
          />
        </View>
        {submitted && !confirmPassword ? (
          <Text style={{ color: "red" }}>Confirm Password is required</Text>
        ) : null}

        <Button
          title="Create Account"
          onPress={() => {
            setSubmitted(true);
            if (
              username &&
              email &&
              isValidEmail(email) &&
              password &&
              confirmPassword
            ) {
              navigation.navigate("Login1");
            }
          }}
        />
      </View>
      <View className="mt-4 flex-row items-center">
        <Text className="text-xl">Already have an account?</Text>
        <TouchableOpacity
          className=""
          onPress={() => navigation.navigate("Login2")}>
          <Text className="text-[#008000] text-xl"> Log in</Text>
        </TouchableOpacity>
      </View>
      <View className="absolute bottom-10">
        <Text className="text-lg text-gray-500 text-center ">
          <MaterialIcons
            name="lock"
            size={20}
            color="#008000"
            style={{ marginRight: 6 }}
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          sapiente
        </Text>
      </View>
    </View>
  );
};
export const Login1 = () => {
  const navigation = useNavigation();
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const [showResend, setShowResend] = useState(false);
  const [otp, setOtp] = useState(""); // Track OTP input
  const [isVerified, setIsVerified] = useState(false);

  useEffect(() => {
    let interval;
    if (showResend && timer > 0) {
      interval = setInterval(() => setTimer((t) => t - 1), 1000);
    }
    if (showResend && timer === 0) {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer, showResend]);

  // Reset timer and canResend when showResend is triggered
  useEffect(() => {
    if (showResend) {
      setTimer(60);
      setCanResend(false);
    }
  }, [showResend]);

  return (
    <View className="flex-1 items-center py-[30%] bg-[#D9ECD9]">
      <View
        className="rounded-full overflow-hidden"
        style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/Asset 4.png")}
          className="w-full h-full object-cover"
          resizeMode="contain"
        />
      </View>
      {/* Pass setOtp to OTPverification so it can update otp state */}
      <OTPverification value={otp} onChange={setOtp} />
      {!showResend && (
        <Button
          title="Confirm Email"
          onPress={async () => {
            setShowResend(true);
            setIsVerified(true);
            // Automatically complete registration when OTP is confirmed
            try {
              await AsyncStorage.setItem('isLoggedIn', 'true');
              navigation.navigate("Home");
            } catch (error) {
              console.log('Error saving login status:', error);
              navigation.navigate("Home");
            }
          }}
        />
      )}
      {showResend && (
        <TouchableOpacity
          className="px-[28%] py-3 rounded-full mt-4 border flex-row justify-center items-center"
          style={{
            backgroundColor: canResend ? "#008000" : "#fff",
            borderColor: "#008000",
          }}
          disabled={!canResend}
          onPress={() => {
            if (canResend) {
              setTimer(60);
              setCanResend(false);
              // Add resend logic here
            }
          }}>
          <Text
            className="text-lg font-semibold text-center"
            style={{
              color: canResend ? "#fff" : "#008000",
              marginRight: timer > 0 ? 8 : 0,
            }}>
            Resend Code
          </Text>
          {timer > 0 && (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <MaterialIcons name="timer" size={20} color="#008000" />
              <Text style={{ marginLeft: 4, fontSize: 16, color: "#008000" }}>
                {timer}
              </Text>
            </View>
          )}
        </TouchableOpacity>
      )}
      <View className="absolute bottom-10">
        <Text className="text-lg text-gray-500 text-center ">
          <MaterialIcons
            name="lock"
            size={20}
            color="#008000"
            style={{ marginRight: 6 }}
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          sapiente
        </Text>
      </View>
    </View>
  );
};

export const Login2 = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  return (
    <View className="flex-1 items-center py-[40%] bg-[#D9ECD9] relative">
      <View
        className="rounded-full overflow-hidden"
        style={{ width: "30%", aspectRatio: 1, alignSelf: "center" }}>
        <Image
          source={require("../../assets/images/Asset 4.png")}
          className="w-full h-full object-cover"
          resizeMode="contain"
        />
      </View>

      <View style={{ width: "80%", marginTop: 32 }}>
        <TextInput
          placeholder="Username"
          placeholderTextColor={"#ccc"}
          value={username}
          onChangeText={setUsername}
          style={{
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            marginBottom: 12,
            padding: 10,
            backgroundColor: "#fff",
          }}
        />
        {submitted && !username ? (
          <Text style={{ color: "red" }}>Username is required</Text>
        ) : null}

        <View style={{ position: "relative", marginBottom: 12 }}>
          <TextInput
            placeholder="Password"
            placeholderTextColor={"#ccc"}
            value={password}
            onChangeText={setPassword}
            secureTextEntry={!showPassword}
            style={{
              borderWidth: 1,
              borderColor: "#ccc",
              borderRadius: 8,
              padding: 10,
              backgroundColor: "#fff",
              paddingRight: 40,
            }}
          />
          <MaterialIcons
            name={showPassword ? "visibility" : "visibility-off"}
            size={24}
            color="#888"
            style={{ position: "absolute", right: 10, top: 12 }}
            onPress={() => setShowPassword(!showPassword)}
          />
        </View>
        {submitted && !password ? (
          <Text style={{ color: "red" }}>Password is required</Text>
        ) : null}

        <Button
          title="Log In"
          onPress={async () => {
            setSubmitted(true);
            if (username && password) {
              try {
                // Set login status to true
                await AsyncStorage.setItem('isLoggedIn', 'true');
                // Navigate to Home
                navigation.navigate("Home");
              } catch (error) {
                console.log('Error saving login status:', error);
                // Still navigate to Home even if saving fails
                navigation.navigate("Home");
              }
            }
          }}
        />
      </View>

      <View className="absolute bottom-10">
        <Text className="text-lg text-gray-500 text-center ">
          <MaterialIcons
            name="lock"
            size={20}
            color="#008000"
            style={{ marginRight: 6 }}
          />
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi,
          sapiente
        </Text>
      </View>
    </View>
  );
};

export default Login;
