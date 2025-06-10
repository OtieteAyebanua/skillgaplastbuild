export const emailValidation = (email: string) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(email);
};

export const validatePhoneNumber = (phoneNumber: string) => {
  const phoneNumberRegex = /^[\d+()]+$/;
  return phoneNumberRegex.test(phoneNumber);
};
export const passwordValidation = (password: string) => {
  const passwordPattern =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;
  return passwordPattern.test(password);
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
