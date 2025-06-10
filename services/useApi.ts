
import ENV from "@/config";
import { ApiResponse } from "@/types/apiResponse";
import { IApi } from "@/types/apiTypes";
import { IAuthResponse, IUserDetail } from "@/types/auth";
import { IProfile, UserResponse } from "@/types/userResponse";

export const refreshAccessToken = (
  api: IApi,
  refreshToken: string
): Promise<IAuthResponse> => {
  const url = `${ENV.AUTHORITY_URL}oauth2/v2.0/token`;
  const payload = {
    grant_type: "refresh_token",
    client_id: ENV.CLIENT_ID,
    resource: ENV.CLIENT_ID,
    response_type: "id_token",
    refresh_token: refreshToken,
  };
  return api
    .postData(url, payload)
    .then((res: IAuthResponse) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const login = (
  api: IApi,
  email: string,
  password: string
): Promise<IAuthResponse> => {
  const url = `${ENV.AUTHORITY_URL}oauth2/v2.0/token`;
  const payload = {
    username: email,
    password: password,
    grant_type: "password",
    scope: ENV.SCOPE,
    client_id: ENV.CLIENT_ID,
    response_type: "token id_token",
  };
  return api
    .postData(url, payload)
    .then((res: IAuthResponse) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const signup = (
  api: IApi,
  payload: IUserDetail
): Promise<ApiResponse<boolean>> => {
  const url = "identity/register";
  return api
    .post(url, payload)
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const passwordReset = (
  api: IApi,
  email: string
): Promise<ApiResponse<boolean>> => {
  const url = "identity/passwordResetCode";
  return api
    .post(url, email)
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const getPasswordResetCode = (
  api: IApi,
  email: string
): Promise<ApiResponse<boolean>> => {
  const url = "identity/passwordResetCode";
  return api
    .post(url, { email })
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const sendPasswordResetCode = (
  api: IApi,
  email: string,
  otp: string
): Promise<ApiResponse<boolean>> => {
  const url = "identity/passwordResetValidate";
  const payload = {
    email: email,
    otp: otp,
  };
  return api
    .post(url, payload)
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const savePassword = (
  api: IApi,
  email: string,
  code: string,
  password: string
): Promise<ApiResponse<boolean>> => {
  const url = "identity/passwordResetValidate";
  const payload = {
    email: email,
    code: code,
    password: password,
  };
  return api
    .post(url, payload)
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const setTransactionPin = (
  api: IApi,
  pin: string
): Promise<ApiResponse<boolean>> => {
  const url = "identity/set-txn-pin";
  return api
    .post(url, { pin })
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const getMe = (api: IApi): Promise<UserResponse> => {
  const url = "identity/me";
  return api
    .get(url)
    .then((res: UserResponse) => {
      return res;
    })
    .catch((err:any) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const putMe = (api: IApi, payload: IProfile): Promise<UserResponse> => {
  const url = "identity/me";
  return api
    .post(url, payload)
    .then((res: UserResponse) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const preference = (
  api: IApi,
  openToContest: boolean,
  darkMode: boolean
): Promise<ApiResponse<boolean>> => {
  const url = "identity/preferences";
  const payload = {
    openToContest: openToContest,
    darkMode: darkMode,
  };
  return api
    .post(url, payload)
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const blockUserApi = (
  api: IApi,
  skillTag: string
): Promise<ApiResponse<boolean>> => {
  const url = `profile/blocked?userTag=${skillTag}`;
  return api
    .post(url)
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const isTagAvailable = (
  api: IApi,
  skillTag: string
): Promise<ApiResponse<boolean>> => {
  const url = `identity/tag-available?tag=${skillTag}`;
  return api
    .get(url)
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err:any) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const getBlockedList = (api: IApi): Promise<UserResponse> => {
  const url = `profile/blocked`;
  return api
    .get(url)
    .then((res: UserResponse) => {
      return res;
    })
    .catch((err:any) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};

export const unBlockUser = (
  api: IApi,
  skillTag: string
): Promise<ApiResponse<boolean>> => {
  const url = `profile/blocked?userTag=${skillTag}`;
  return api
    .deleteData(url)
    .then((res: ApiResponse<boolean>) => {
      return res;
    })
    .catch((err) => {
      return new Promise((resolve, reject) => {
        reject(err);
      });
    });
};


