import { API } from "./api";
import { Logger } from "./logger";

export interface IOtherUserRecord {
  id: number;
  fullName: string;
  country: string;
  tag: string;
  bio: string;
  isOnline: true;
  socials: {
    twitter: string;
    instagram: string;
    tikTok: string;
    youtube: string;
  };
  stats: {
    contests: number;
    wins: number;
    losses: number;
    disputes: number;
  };
}

export class Debounce {
  static checkTagAvailability = (tag: string) => {
    return API.GET(`/profile/tag/${tag}`)
      .then(async (response) => {
        if (!response.success) {
          return false;
        }
        return response;
      })
      .catch((e) => {
        Logger.error(e);
        return;
      });
  };

  static blockUser = (userId: number) => {
    return API.POST(`/profile/block/${userId}`)
      .then(async (response) => {
        if (!response.success) {
          Logger.info("error from this end ");

          return false;
        }
        return response;
      })
      .catch((e) => {
        Logger.info("i got here too");
        Logger.error(e);
        return;
      });
  };
  static getBlockedList = (page: number) => {
    return API.GET(`/profile/block/${page}`)
      .then(async (response) => {
        if (!response.success) {
          return false;
        }
        return response;
      })
      .catch((e) => {
        Logger.error(e);
        return;
      });
  };
}
