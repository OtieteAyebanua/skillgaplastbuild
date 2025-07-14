import Toast from 'react-native-toast-message';

export function ToastBox(type:string, text1:string, text2:string){
  const showToast = () => {
    Toast.show({
      type,
      text1,
      text2,
    });
  };
showToast();
}
