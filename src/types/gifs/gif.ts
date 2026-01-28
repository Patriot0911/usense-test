export interface IGifResponse {
  data: IGifData[];
  pagination: {
    total_count: number;
    count: number;
    offset: number;
  };
}

export interface IGiphySearchParams {
  q?: string;
  limit?: number;
  offset?: number;
}

export interface IGifData {
  id: string;
  url: string;
  slug: string;
  title: string;
  rating: 'g' | 'pg' | 'pg-13' | 'r';
  images: {
    original: {
      height: number;
      width: number;
      url: string;
      webp: string;
    };
    downsized: {
      height: number;
      width: number;
      url: string;
    };
    fixed_width: {
      height: number;
      width: number;
      url: string;
      webp: string;
    },
  };
  user?: IUserGif;
}

export interface IUserGif {
  username: string;
  display_name?: string;
  avatar_url?: string;
  banner_url?: string;
  profile_url?: string;
  banner_image: string;
  description: string;
  instagram_url?: string;
  website_url?: string;
}
