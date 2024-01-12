import { Article } from "./article";

export interface NewsApiResponse {

    status: string;
    totalResults: number;
    articles: Article[];
  
}
