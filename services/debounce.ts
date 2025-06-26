import { API } from "./api";
import { Logger } from "./logger";

export interface IOtherUserRecord {
  id: 3;
  fullName: "string";
  country: "ngn";
  tag: "string";
  bio: "string";
  isOnline: true;
  socials: {
    twitter: "string";
    instagram: "string";
    tikTok: "string";
    youtube: "string";
  };
  stats: {
    contests: 0;
    wins: 0;
    losses: 0;
    disputes: 0;
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
        return response.errorCode;
      })
      .catch((e) => {
        Logger.error(e);
        return;
      });
  };
}
