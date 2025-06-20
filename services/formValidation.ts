export const emailValidation = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = /^[\d+()]+$/;
  return phoneNumberRegex.test(phoneNumber);
};

export const passwordValidation = (password: string) => {
  return password.length >= 8;
};

export const passwordExactness = (
  newPassword: string,
  confirmNewPassword: string
) => {
  if (newPassword === confirmNewPassword) {
    return true;
  } else {
    return false;
  }
};
export const isValidUrl = (url: string): boolean => {
  try {
    new URL(url);
    return true;
  } catch (_) {
    return false;
  }
};

export const useDebounce = (callback: any, delay: any) => {
  let timeout: any;
  return (...args: any) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => callback(...args), delay);
  };
};

export const validTwitterUrl = (url:string)=>{
  const regex = /^(?:\s*|https?:\/\/(?:www\.)?(?:twitter\.com|x\.com)\/[A-Za-z0-9_]{1,15}\s*)$/;
  return regex.test(url);
}

export const validTiktokUrl = (url:string)=>{
  const regex = /^(?:\s*|https?:\/\/(?:www\.)?tiktok\.com\/@?[A-Za-z0-9_.]{1,24}\s*)$/;
  return regex.test(url);
}
export const validInstagramUrl = (url:string)=>{
  const regex = /^(?:\s*|https?:\/\/(?:www\.)?instagram\.com\/[A-Za-z0-9_.]{1,30}\s*)$/;
  return regex.test(url);
}
export const validYoutubeUrl = (url:string)=>{
  const regex = /^(?:\s*|https?:\/\/(?:www\.)?youtube\.com\/(?:c|channel|user)\/[A-Za-z0-9_-]{1,64}\s*)$/;
  return regex.test(url);
}
