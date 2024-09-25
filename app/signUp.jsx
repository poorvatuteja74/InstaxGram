import { Alert, Pressable, StyleSheet, Text, View } from 'react-native';
import React, { useRef, useState } from 'react';
import ScreenWrapper from '../components/ScreenWrapper';
import { theme } from '../constants/theme';
import { StatusBar } from 'expo-status-bar';
import BackButton from '../components/BackButton';
import { useRouter } from 'expo-router'; 
import { wp, hp } from '../helpers/common';
import Icon from '../assets/icons';
import { Input } from 'react-native-elements'; 
import Button from '../components/Button';

const SignUp = () => {
  const router = useRouter();
  const emailRef = useRef("");
  const nameRef = useRef("");
  const passwordRef = useRef("");
  const [loading, setLoading] = useState(false);
  
  const onSubmit = async () => {
    if (!emailRef.current || !passwordRef.current) {
      Alert.alert('Sign Up', "Please fill all the fields");
      return;
    }

    let name = nameRef.current.trim();
    let email = emailRef.current.trim();
    let password = passwordRef.current.trim();

    console.log({ name, email, password });

    setLoading(true);

    const { 
      data: { session }, 
      error 
    } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    setLoading(false);

    console.log('session', session);
    console.log('error', error);
    if (error) {
      Alert.alert('Sign up', error.message);
    }
  }

  return (
    <ScreenWrapper bg='white'>
      <StatusBar style='dark' />
      <View style={styles.container}>
        <BackButton router={router} />
        <View>
          <Text style={styles.welcomeText}>Let's</Text>
          <Text style={styles.welcomeText}>Get Started</Text>
        </View>
        
        {/* Form  */}
        <View style={styles.form}>
          <Text style={{ fontSize: hp(1.5), color: theme.colors.text, marginBottom: hp(2.5) }}>
            Please fill the details to create an account
          </Text>
          
          <Input 
            leftIcon={<Icon name="user" size={26} strokeWidth={1.6} />}
            placeholder="Enter your name"
            onChangeText={value => nameRef.current = value}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputBox} // Updated
            inputStyle={styles.inputText} // Updated
          />
          <Input 
            leftIcon={<Icon name="mail" size={26} strokeWidth={1.6} />}
            placeholder="Enter the email"
            onChangeText={value => emailRef.current = value}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputBox} // Updated
            inputStyle={styles.inputText} // Updated
          />
          <Input 
            leftIcon={<Icon name="lock" size={26} strokeWidth={1.6} />}
            placeholder="Enter your Password"
            secureTextEntry
            onChangeText={value => passwordRef.current = value}
            containerStyle={styles.inputContainer}
            inputContainerStyle={styles.inputBox} // Updated
            inputStyle={styles.inputText} // Updated
          />
          <Button title={'Sign Up'} loading={loading} disabled={loading} onPress={onSubmit} />
        </View>
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Already have an account!
          </Text>
          <Pressable onPress={() => router.push('login')}>
            <Text style={[styles.footerText, { color: theme.colors.primaryDark, fontWeight: theme.fonts.semibold }]}>
              Login
            </Text>
          </Pressable>
        </View>
      </View>
    </ScreenWrapper>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 45,
    paddingHorizontal: wp(5),
  },
  welcomeText: {
    fontSize: hp(4),
    fontWeight: theme.fonts.bold,
    color: theme.colors.text,
  },
  form: {
    flexGrow: 1,
    gap: 5,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 5,
    paddingBottom: hp(20),
  },
  footerText: {
    textAlign: 'center',
    color: theme.colors.text,
    fontSize: hp(1.6),
  },
  inputContainer: {
    paddingHorizontal: 0,
  },
  inputBox: {
    borderWidth: 1,
    borderColor: theme.colors.border, // Define border color
    borderRadius: 8, // Rounded corners for the box
    paddingHorizontal: wp(3), // Inner padding for the text
    paddingVertical: hp(1.5), // Padding for vertical space
  },
  inputText: {
    color: theme.colors.text,
  },
});