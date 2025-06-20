import { API, ApiErrorCodes } from "./api";
import { Logger } from "./logger";

interface IUserRecord {
  id: number;
  email: string;
  fullName: string;
  country: string;
  tag: string;
  bio: string | null;
  balance: number;
  isVerified: boolean;
  isOnline: boolean;
  canChangeTag: boolean;
  socials: {
    twitter: string | null;
    instagram: string | null;
    tiktok: string | null;
    youtube: string | null;
  };
  stats: {
    contests: number;
    wins: number;
    losses: number;
    disputes: number;
  };
  preferences: {
    openToContest: boolean;
    darkMode: boolean;
  };
}

export let SessionUser: IUserRecord | null;

let loadingUser = false;

export class User {
  static Load = (onLoaded?: () => void) => {
    if (loadingUser) return;

    try {
      loadingUser = true;

      return API.GET("/identity/me")
        .then(async (response) => {
          if (!response.success) {
            return false;
          }
          SessionUser = response.data;

          Logger.info(SessionUser);

          onLoaded?.();
        })
        .catch((err) => {
          Logger.error(err);
          return false;
        });
    } catch (err) {
      Logger.error(err);
      return false;
    } finally {
      loadingUser = false;
    }
  };

  static clear = () => {
    SessionUser = null;
  };

  static update = (user: any) => {
    try {
      return API.POST("/identity/me", {
        fullName: user.fullName,
        bio: user.bio,
        tag: user.tag,
        twitter: user.twitter,
        instagram: user.instagram,
        youtube: user.youtube,
        tikTok: user.tikTok,
      })
        .then(async (response) => {
          const reply = { success: false, error: "" };

          if (response.success && SessionUser) {
            SessionUser.fullName = user.fullName;
            SessionUser.bio = user.bio;
            SessionUser.tag = user.tag;
            SessionUser.socials.twitter = user.twitter;
            SessionUser.socials.instagram = user.instagram;
            SessionUser.socials.instagram = user.instagram;
            SessionUser.socials.youtube = user.youtube;

            return reply;
          }

          // handle different codes
          reply.error = "Something went wrong, please try that again.";
          const errorCode = response.errorCode;

          if (errorCode === ApiErrorCodes.NotAllowed) {
            reply.error = "User tag already used.";
          }

          return reply;
        })
        .catch((err) => {
          Logger.error(err);
          return {
            success: false,
            error: "Something went wrong, please try again.",
          };
        });
    } catch (err) {
      Logger.error(err);
      return {
        success: false,
        error: "Something went wrong, please try again.",
      };
    }
  };
}
