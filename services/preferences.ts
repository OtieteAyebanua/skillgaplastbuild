import { API } from "./api";
import { Logger } from "./logger";
interface IPreferences {
  openToChallenge: boolean;
  darkMode: boolean;
}

export class preferences {
  static update = (openToContest: boolean, darkMode: boolean) => {
    return API.POST("/identity/preferences", {
      openToContest: openToContest,
      darkMode: darkMode,
    })
      .then(async (response) => {
        if (response.success) {
          return true;
        }
      })
      .catch((e) => {
        Logger.error(e);
        return false;
      });
  };
}
