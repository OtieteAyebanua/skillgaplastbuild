import { API } from "./api";
import { Logger } from "./logger";

export interface IContestCategory {
  id: number;
  name: string;
  description: string;
  hasChildren: boolean;
  parentId?: number | null
}

export class Contest {
  static getCategories = (parentId?: number | null) => {
    const url = parentId
      ? `/contests/categories?parentId=${parentId}`
      : `/contests/categories`;

    return API.GET(url)
      .then(async (response) => {
        if (response.success && Array.isArray(response.data)) {
          return response.data as IContestCategory[];
        }
        return [] as IContestCategory[];
      })
      .catch((err) => {
        Logger.error(err);
        return [] as IContestCategory[];
      });
  };
}
