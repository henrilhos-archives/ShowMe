type Image = {
  height?: number;
  url?: string;
  width?: number;
};

export type Album = {
  id: string;
  name: string;
  artists: Artist[];
  images?: Image[];
  album_type?: string;
  release_date?: string;
  tracks?: {
    total: number;
    items: Track[];
  };
};

export type Artist = {
  id: string;
  name: string;
  images?: Image[];
  followers?: {
    total: number;
  };
  genres?: string[];
};

export type Track = {
  album: Album;
  artists: [Artist];
  available_markets: [string];
  disc_number: number;
  duration_ms: number;
  explicit: boolean;
  id: string;
  name: string;
  preview_url: string;
  popularity: number;
};

export type Playlist = {
  collaborative: boolean;
  description?: string;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images?: Image[];
  name: string;
  owner?: {
    display_name?: string;
    external_urls: { spotify: string };
    href: string;
    id: string;
    type: string;
    uri: string;
  };
  primary_color?: string | null;
  public: boolean;
  snapshot_id: string;
  followers?: {
    total?: number;
  };
  items?: [{ added_at: string; track: Track }];
  tracks?: {
    href?: string;
    items?: [{ added_at: string; track: Track }];
    total: number;
  };
  type?: string;
  total?: number;
  uri?: string;
};

export type PlaylistItem = {
  track: Track;
};

export type User = {
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  type: string;
  uri: string;
};
