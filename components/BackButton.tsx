import React from 'react';
import {View, TouchableOpacity, Text, StyleSheet} from 'react-native';

interface BackButtonProps {
  onPress: () => void;
  previous?: string;
}

const BackButton: React.FC<BackButtonProps> = ({onPress, previous}) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress} style={styles.backButton}>
        <View style={styles.arrowContainer}>
          <View style={styles.arrowLeft} />
        </View>
        <Text style={styles.backButtonText}>{previous || 'Back'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  backButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  arrowContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 5,
  },
  arrowLeft: {
    width: 10,
    height: 10,
    borderLeftWidth: 2,
    borderBottomWidth: 2,
    transform: [{rotate: '45deg'}],
    borderColor: 'black',
  },
  backButtonText: {
    fontSize: 18,
    color: 'black',
  },
});

export default BackButton;
