export interface IApiMovie {
  id: number;
  title: string;
  poster_path: string | null;
  adult: boolean;
  overview: string;
  vote_average: number;
  original_language: string;
}
export interface IApiMovieDetails extends IApiMovie {
  tagline: string | null;
  runtime: number | null;
  video: boolean;
}

export interface IApiSearch {
  results: IApiMovie[];
}
