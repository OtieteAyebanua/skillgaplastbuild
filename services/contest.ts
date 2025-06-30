import { API } from "./api";
import { Logger } from "./logger";

export interface IContestCategory {
  id: number;
  name: string;
  description: string;
  hasChildren: boolean;
  parentId?: number | null
}

export interface ITrendingCategory {
  id: number;
  name: string;
  description: string;
  contests: number;
  users: number;
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

  static getTrendingCategories = () => {
    return API.GET(`/contests/trending-categories`)
      .then(async (response) => {
        if (response.success && Array.isArray(response.data)) {
          return response.data as ITrendingCategory[];
        }
        return [] as ITrendingCategory[];
      })
      .catch((err) => {
        Logger.error(err);
        return [] as ITrendingCategory[];
      });
  }
}
