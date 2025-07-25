import React, { useEffect, useRef } from 'react';
import { Animated, Dimensions, View, ViewStyle } from 'react-native';

const SCREEN_WIDTH = Dimensions.get('window').width;

interface SkeletonBoxProps {
  style?: ViewStyle;
}

const SkeletonBox: React.FC<SkeletonBoxProps> = ({ style }) => {
  const shimmerAnim = useRef(new Animated.Value(-1)).current;

  useEffect(() => {
    Animated.loop(
      Animated.timing(shimmerAnim, {
        toValue: 1,
        duration: 1200,
        useNativeDriver: true,
      })
    ).start();
  }, []);

  const translateX = shimmerAnim.interpolate({
    inputRange: [-1, 1],
    outputRange: [-SCREEN_WIDTH, SCREEN_WIDTH],
  });

  return (
    <View
      style={{
        backgroundColor: '#e0e0e0',
        overflow: 'hidden',
        borderRadius: 6,
        ...style, // apply passed-in custom style (e.g., width, height)
      }}
    >
      <Animated.View
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          transform: [{ translateX }],
        }}
      >
        <View
          style={{
            flex: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.5)',
            width: 40,
            borderRadius: 6,
            opacity: 0.8,
          }}
        />
      </Animated.View>
    </View>
  );
};

export default SkeletonBox;
