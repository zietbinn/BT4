import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Alert,
} from 'react-native';

const CustomKeyboardScreen = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [error, setError] = useState('');

  const handleKeyPress = (value) => {
    if (value === 'delete') {
      setPhoneNumber(phoneNumber.slice(0, -1));
    } else {
      setPhoneNumber(phoneNumber + value);
    }
    setError(''); // Reset lỗi khi nhập lại
  };

  const handleContinue = () => {
    const phoneRegex = /^[0-9]{10}$/; // Kiểm tra số điện thoại 10 chữ số
    if (!phoneRegex.test(phoneNumber)) {
      setError('Số điện thoại không hợp lệ! Vui lòng nhập lại.');
      return;
    }

    Alert.alert('Thành công', `Số điện thoại của bạn: ${phoneNumber}`);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Đăng nhập</Text>
        <Text style={styles.label}>Nhập số điện thoại</Text>
        <Text style={styles.description}>
          Dùng số điện thoại để đăng nhập hoặc đăng ký tài khoản tại OneHousing Pro
        </Text>
        <TextInput
          style={[styles.input, error ? styles.inputError : null]}
          value={phoneNumber}
          editable={false}
          placeholder="Nhập số điện thoại của bạn"
        />
        {error ? <Text style={styles.errorText}>{error}</Text> : null}
      </View>

      <View style={styles.keyboard}>
        {[
          ['1', '2', '3'],
          ['4', '5', '6'],
          ['7', '8', '9'],
          ['*', '0', 'delete'],
        ].map((row, rowIndex) => (
          <View key={rowIndex} style={styles.row}>
            {row.map((key) => (
              <TouchableOpacity
                key={key}
                style={styles.key}
                onPress={() => handleKeyPress(key === 'delete' ? 'delete' : key)}
              >
                <Text style={styles.keyText}>
                  {key === 'delete' ? '⌫' : key}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        ))}
      </View>

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: phoneNumber ? '#007AFF' : '#D1D1D6' },
        ]}
        onPress={handleContinue}
        disabled={!phoneNumber}
      >
        <Text style={styles.buttonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
  },
  header: {
    marginTop: 50,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  label: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 10,
  },
  description: {
    fontSize: 14,
    color: '#6D6D6D',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#E5E5E5',
    borderRadius: 8,
    paddingHorizontal: 15,
    height: 50,
    fontSize: 16,
    backgroundColor: '#F9F9F9',
    color: '#000',
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginTop: 5,
  },
  keyboard: {
    flex: 1,
    justifyContent: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  key: {
    width: 70,
    height: 70,
    backgroundColor: '#F9F9F9',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 35,
    borderWidth: 1,
    borderColor: '#E5E5E5',
  },
  keyText: {
    fontSize: 24,
    color: '#000',
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default CustomKeyboardScreen;
