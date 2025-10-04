export type Ranking = {
  ranking_value: number;
  ranking_name: string;
};

export type Genre = {
  genre_id: number;
  genre_name: string;
};

export type MovieType = {
  _id: string;
  imdb_id: string;
  title: string;
  poster_path: string;
  youtube_id: string;
  genre?: Genre[];
  admin_review?: string; // ✅ added back
  ranking?: Ranking;
};

// export interface MovieType {
//   _id: string;
//   imdb_id: string;
//   title?: string;
//   poster_path?: string;
//   youtube_id?: string;
//   genre?: { genre_id: number; genre_name: string }[];
//   admin_review?: string;
//   ranking?: { ranking_name?: string; ranking_value?: number };
// }
