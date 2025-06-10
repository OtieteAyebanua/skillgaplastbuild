import React, { useState } from "react";
import { TextInput, TouchableOpacity, useColorScheme, View } from "react-native";
import {
  ExclamationCircleIcon,
  EyeIcon,
  EyeSlashIcon,
} from "react-native-heroicons/outline";
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from "react-native-responsive-screen";


interface IInput {
  type?: string;
  className?: string;
  isError?: boolean;
  icon?: string;
  placeholder: string;
  value?: (value: string) => void;
}

const Input = ({ type, value, isError, icon, placeholder }: IInput) => {
  const theme  = useColorScheme();
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
   <View
  style={{
    overflow: 'hidden',
    borderWidth: isFocused
      ? 1
      : isError
      ? 0.5
      : 1,
    borderColor: isFocused
      ? '#338AF3'
      : isError
      ? '#F87171' // red-500
      : '#D0D5DD',
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    borderRadius: 24, // rounded-3xl ≈ 24px
    paddingHorizontal: 12, // px-3 ≈ 12px
    marginTop: 8, // mt-2 = 2 * 4 hb 
    position: 'relative',
    ...(isFocused && {
      borderWidth: 2,
    }),
  }}
>
  <TextInput
    secureTextEntry={type === 'password' && !showPassword}
    onFocus={handleFocus}
    onBlur={handleBlur}
    placeholder={placeholder}
    placeholderTextColor={theme ? '#8F8F8F' : '#ffffff'}
    onChangeText={value}
    style={{
      color: theme === 'light' ? '#000000' : '#ffffff',
      width: wp('90%'),
      height: hp('5.5%'),
    
    }}
  />

  {icon && (
    <View
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        marginRight: 4,
      }}
    >
      {icon}
    </View>
  )}

  {isError ? (
    <View
      style={{
        position: 'absolute',
        right: 8,
        top: 8,
      }}
    >
      <ExclamationCircleIcon size={20} color="#F04438" />
    </View>
  ) : type === 'password' ? (
    <TouchableOpacity
      onPress={() => setShowPassword(!showPassword)}
      style={{
        position: 'absolute',
        right: 8,
        top: 8,
      }}
    >
      {showPassword ? (
        <EyeSlashIcon size={20} color="#1D9BF0" />
      ) : (
        <EyeIcon size={20} color="#1D9BF0" />
      )}
    </TouchableOpacity>
  ) : null}
</View>
  );
};

export default Input;

interface IPassWordTextBox {
  value?: (value: string) => void;
}

export const PasswordTextBox = ({ value }: IPassWordTextBox) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const  theme  = useColorScheme();
  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };
  return (
   <View
      style={{
        borderWidth: 1,
        borderColor: isFocused ? '#338AF3' : '#D0D5DD',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        borderRadius: 24, 
        paddingHorizontal: 12,
        marginTop: 8,
        position: 'relative',
        backgroundColor: 'transparent',
      }}
    >
      <TextInput
        secureTextEntry={!showPassword}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder="Enter password"
        placeholderTextColor={theme ? '#8F8F8F' : '#ffffff'}
        style={{
          color: theme === 'light' ? '#000000' : '#ffffff',
          width: wp('90%'),
          height: hp('5.5%'),
        }}
        onChangeText={value}
      />

      <TouchableOpacity
        onPress={() => setShowPassword(!showPassword)}
        style={{
          position: 'absolute',
          right: 8,
        }}
      >
        {showPassword ? (
          <EyeSlashIcon size={20} color="#1D9BF0" />
        ) : (
          <EyeIcon size={20} color="#1D9BF0" />
        )}
      </TouchableOpacity>
    </View>
  );
};
