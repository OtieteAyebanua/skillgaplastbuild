import { Image, Text, View } from "react-native";

const Notification =()=>{
    return   <View
                style={{
                    flex: 1,
                    backgroundColor: '#007BDB',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Image
                    source={require('../../../assets/images/splash-icon.png')}
                    style={{
                        width: 80,
                        height: 40,
                        marginBottom: 12,
                        resizeMode: 'contain',
                    }}
                />
                <Text
                    style={{
                        color: '#ffffff',
                        fontSize: 14,
                        textAlign: 'center',
                        opacity: 0.9,
                    }}
                >
                    Currently in test phase{'\n'}coming soon...
                </Text>
            </View>
}

export default Notification;