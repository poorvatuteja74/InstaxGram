import { Pressable, StyleSheet } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import Icon from '../assets/icons'
import { theme } from '../constants/theme'

const BackButton = ({ size = 26 }) => {
  const navigation = useNavigation(); // Access the navigation object

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.button}>
      <Icon name='arrowLeft' strokeWidth={2.5} size={size} color={theme.colors.text} />
    </Pressable>
  )
}

export default BackButton

const styles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    padding: 5,
    borderRadius: theme.radius.s,
    backgroundColor: 'rgba(0,0,0,0.07)'
  }
})