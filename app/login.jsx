import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router'; 
import { wp, hp } from '../helpers/common';
import Icon from '../assets/icons';
import {Input } from 'react-native-elements'; // Make sure this import matches the library you're using
import { Svg, Path } from 'react-native-svg'; 
import Button from '../components/Button'

const Login = () => {
  const router = useRouter();
  const emailRef =useRef("");
  const passwordRef =useRef("");
  const [loading, setloading]=useState(false);

  const onSubmit = async()=>{
    if(!emailRef.current || !passwordRef.current){
      Alert.alert('Sign Up',"Please fill all the fields");
      return;
    }
  }
  return (
    <ScreenWrapper bg='white'>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <BackButton router={router} />
        <View>
          <Text style={styles.welcomeText}>Hey,</Text>
          <Text style={styles.welcomeText}>Welcome back!</Text>
        </View>
        
        {/* Form  */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text, marginBottom: hp(2.5)}}>
            Please login to continue
          </Text>
          <Input 
            leftIcon={<Icon name="mail" size={26} strokeWidth={1.6}/>}
            placeholder="Enter the email"
            onChangeText={value => emailRef.current=value }
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputBox}
            inputStyle={styles.inputText}
          />
          <Input 
            leftIcon={<Icon name="lock" size={26} strokeWidth={1.6}/>}
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={value => passwordRef.current=value }
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputBox}
            inputStyle={styles.inputText}
          />
          <Text style={styles.forgotPassword}>
             Forgot password ?
          </Text>
          <Button title={'Login'} loading={loading} onPress={onSubmit}/>
        </View>
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Don't have an account?
          </Text>
          <Pressable onPress={()=>router.push('signUp')}>
            <Text style={[styles.footerText, {color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold}]}>Sign Up</Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap:45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
    // marginBottom: hp(1),
    // marginTop: hp(3),
  },
  // subText: {
  //   fontSize: hp(2.5),
  //   fontWeight: theme.fonts.regular,
  //   color: theme.colors.text,
  //   marginBottom: hp(2),
  // },
  form: {
    flexGrow: 1,
    gap: 5,
    // justifyContent:'center'
  },
  // inputContainer: {
  //   marginBottom: hp(2),
  // },
  // input: {
  //   borderWidth: 1,
  //   borderColor: theme.colors.border,
  //   borderRadius: 5,
  //   padding: hp(1),
  // },
  forgotPassword: {
    textAlign: 'right',
    fontWeight: theme.fonts.semibold,
    color: theme.colors.text,
    marginBottom: hp(3),
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingBottom: hp(25),
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  inputContainer: {
    paddingHorizontal: 0, // Remove default padding if needed
    // marginBottom: hp(2),
  },
  inputBox: {
    borderWidth: 1,
    borderColor: theme.colors.border, // Define border color
    borderRadius: 12, // Rounded corners for the box
    paddingHorizontal: wp(1), // Inner padding for the text
    paddingVertical: hp(1), // Padding for vertical space
  },
  inputText: {
    color: theme.colors.text,
  },
  
});