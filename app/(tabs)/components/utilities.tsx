import { Switch, Text, useColorScheme, View } from "react-native";

const Utilities = ()=>{
    const theme = useColorScheme();
    
    return <View
  style={{
    borderWidth: 1,
    paddingHorizontal: 8, // px-2
    paddingVertical: 16, // py-4
    borderRadius: 10, // rounded-2xl
    marginBottom: 12, // mb-3
    backgroundColor: theme === 'light' ? '#FFFFFF' : '#1D1F20',
    borderColor: theme === 'light' ? '#E7F4FD' : '#27292B',
  }}
>
  {/* First setting block */}
  <View
    style={{
      paddingHorizontal: 8, // px-2
      paddingVertical: 12, // py-3
      borderBottomWidth: 1,
      borderColor: theme === 'light' ? '#F7F7F7' : '#27292B',
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontSize: 16,
          fontWeight: '500',
          color: theme === 'light' ? '#000' : '#FFFFFF',
        }}
      >
        Open to contest
      </Text>
      <Switch
        value={true}
        onValueChange={(e) => {
         e = false
        }}
        style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
      />
    </View>
    <Text
      style={{
        fontSize: 11,
        color: theme === 'light' ? '#333333' : '#8F8F8F',
      }}
    >
      This will enable other users know when you are available to take a challenge
    </Text>
  </View>

  {/* Second setting block */}
  <View
    style={{
      paddingHorizontal: 8, // px-2
      paddingVertical: 12, // py-3
      borderBottomWidth: 1,
      borderColor: theme === 'light' ? '#F7F7F7' : '#27292B',
    }}
  >
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <Text
        style={{
          fontSize: 12,
          fontWeight: '500',
          color: theme === 'light' ? '#000' : '#FFFFFF',
        }}
      >
        Light or Dark Mode
      </Text>
      <Switch
        value={theme === 'light' ? false : true}
        onValueChange={() => {
          
        }}
        style={{ transform: [{ scaleX: 1 }, { scaleY: 1 }] }}
      />
    </View>
    <Text
      style={{
        fontSize: 10,
        color: theme === 'light' ? '#333333' : '#8F8F8F',
      }}
    >
      Be your own lead, switch any mode that matches your interest.
    </Text>
  </View>
</View>

}

export default Utilities