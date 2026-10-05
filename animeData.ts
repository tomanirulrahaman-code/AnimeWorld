export interface Episode {
  id: string;
  epNumber: number;
  title: string;
  duration: string;
  hindiDubAvailable: boolean;
  streamUrl: string;
  summary: string;
}

export interface Anime {
  id: string;
  title: string;
  japaneseTitle?: string;
  hindiTitle?: string;
  poster: string;
  landscapeBanner?: string;
  backdropBg?: string;
  releaseYear?: string;
  rating: number;
  year: number;
  badge: string;
  subtitle: string;
  genres: string[];
  synopsis: string;
  episodes: Episode[];
  isMovie?: boolean;
  continueWatching?: {
    timeLeft: string;
    progressPercent: number;
    seasonEpisodeInfo: string;
  };
}

/**
 * DEFAULT DIRECT VIDEO URL CONFIGURATION
 * Replace this URL with your authorized direct .mp4 or .m3u8 stream link.
 */
export const VIDEO_URL = "https://media.w3.org/2010/05/sintel/trailer.mp4";

export const HERO_SLIDES: Anime[] = [
  {
    id: "one-piece",
    title: "ONE PIECE",
    poster: "/src/assets/images/poster_one_piece_1791177966343.jpg",
    landscapeBanner: "/src/assets/images/one_piece_hero_banner_1791182629860.jpg",
    rating: 9.6,
    year: 1999,
    badge: "Anime",
    subtitle: "Hindi Dub • Sub",
    genres: ["Action", "Adventure", "Fantasy", "Shonen"],
    synopsis: "Monkey D. Luffy sets sail with his pirate crew across the Grand Line in search of the legendary ultimate treasure known as the 'One Piece' to become the next Pirate King.",
    episodes: [
      {
        id: "op-1095",
        epNumber: 1095,
        title: "The Genius's Secret! Egghead Island Arc",
        duration: "23:00",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Luffy and the Straw Hat crew encounter Dr. Vegapunk's futuristic island of Egghead."
      },
      {
        id: "op-1094",
        epNumber: 1094,
        title: "Gears of Destiny! Luffy's Peak Performance",
        duration: "24:00",
        hindiDubAvailable: true,
        streamUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
        summary: "The battle reaches its ultimate climax as the crew faces powerful CP0 agents."
      }
    ]
  },
  {
    id: "jujutsu-kaisen",
    title: "Jujutsu Kaisen",
    poster: "/src/assets/images/jjk_continue_watching_1791182643396.jpg",
    landscapeBanner: "/src/assets/images/jjk_continue_watching_1791182643396.jpg",
    rating: 9.8,
    year: 2020,
    badge: "Anime",
    subtitle: "Hindi Dub • Sub",
    genres: ["Dark Fantasy", "Supernatural", "Action"],
    synopsis: "Yuji Itadori swallows a cursed finger of Ryomen Sukuna and enters Tokyo Jujutsu High to fight lethal curses alongside Gojo Satoru.",
    episodes: [
      {
        id: "jjk-12",
        epNumber: 12,
        title: "To You, Someday",
        duration: "23:00",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Satoru Gojo faces the cursed spirits inside Shibuya Station."
      }
    ]
  },
  {
    id: "demon-slayer",
    title: "Demon Slayer",
    poster: "/src/assets/images/demon_slayer_portrait_1791182664683.jpg",
    landscapeBanner: "/src/assets/images/demon_slayer_portrait_1791182664683.jpg",
    rating: 9.7,
    year: 2019,
    badge: "Anime",
    subtitle: "Hindi Dub • Sub",
    genres: ["Action", "Demons", "Shonen"],
    synopsis: "Tanjiro Kamado becomes a Demon Slayer after his family is slaughtered and his sister Nezuko is turned into a demon.",
    episodes: [
      {
        id: "ds-1",
        epNumber: 1,
        title: "Cruelty",
        duration: "25:00",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Tanjiro undergoes intensive training with the Hashira warriors."
      }
    ]
  }
];

export const CONTINUE_WATCHING: Anime[] = [
  {
    id: "jjk-continue",
    title: "Jujutsu Kaisen",
    poster: "/src/assets/images/jjk_continue_watching_1791182643396.jpg",
    landscapeBanner: "/src/assets/images/jjk_continue_watching_1791182643396.jpg",
    rating: 9.8,
    year: 2020,
    badge: "Anime",
    subtitle: "Hindi Dub",
    genres: ["Action", "Dark Fantasy"],
    synopsis: "Yuji Itadori battles deadly curses alongside Gojo Satoru.",
    continueWatching: {
      timeLeft: "23m left",
      progressPercent: 65,
      seasonEpisodeInfo: "S1 E12 • Hindi Dub"
    },
    episodes: [
      {
        id: "jjk-ep12",
        epNumber: 12,
        title: "Episode 12 - Shibuya Clash",
        duration: "23:00",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Gojo unleashes his domain expansion."
      }
    ]
  },
  {
    id: "naruto-continue",
    title: "Naruto",
    poster: "/src/assets/images/naruto_continue_watching_1791182654215.jpg",
    landscapeBanner: "/src/assets/images/naruto_continue_watching_1791182654215.jpg",
    rating: 9.5,
    year: 2002,
    badge: "Anime",
    subtitle: "Hindi Dub",
    genres: ["Ninja", "Action"],
    synopsis: "Naruto Uzumaki seeks to become the Hokage of the Hidden Leaf Village.",
    continueWatching: {
      timeLeft: "18m left",
      progressPercent: 40,
      seasonEpisodeInfo: "S1 E45 • Hindi Dub"
    },
    episodes: [
      {
        id: "naruto-ep45",
        epNumber: 45,
        title: "Episode 45 - Chunin Exams",
        duration: "23:00",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Naruto battles in the preliminary rounds."
      }
    ]
  }
];

export const RECENTLY_ADDED: Anime[] = [
  {
    id: "one-piece-recent",
    title: "One Piece",
    poster: "/src/assets/images/poster_one_piece_1791177966343.jpg",
    rating: 9.6,
    year: 1999,
    badge: "Anime",
    subtitle: "Hindi Dub • Sub",
    genres: ["Action", "Adventure"],
    synopsis: "Luffy sails across the Grand Line.",
    episodes: [
      {
        id: "op-1095",
        epNumber: 1095,
        title: "Egghead Island Arc",
        duration: "23:00",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Egghead Island mysteries revealed."
      }
    ]
  },
  {
    id: "demon-slayer-recent",
    title: "Demon Slayer",
    poster: "/src/assets/images/demon_slayer_portrait_1791182664683.jpg",
    rating: 9.3,
    year: 2019,
    badge: "Anime",
    subtitle: "Hindi Dub • Sub",
    genres: ["Action", "Demons"],
    synopsis: "Tanjiro fights Demons in Hashira Training.",
    episodes: [
      {
        id: "ds-recent-1",
        epNumber: 11,
        title: "Hashira Training Finale",
        duration: "25:00",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Final preparations before Infinity Castle."
      }
    ]
  },
  {
    id: "solo-leveling-recent",
    title: "Solo Leveling",
    poster: "/src/assets/images/solo_leveling_portrait_1791182678840.jpg",
    rating: 9.1,
    year: 2024,
    badge: "Anime",
    subtitle: "Hindi Dub • Sub",
    genres: ["Action", "Fantasy"],
    synopsis: "Sung Jinwoo levels up endlessly.",
    episodes: [
      {
        id: "sl-recent-12",
        epNumber: 12,
        title: "Arise Shadow Army",
        duration: "24:00",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Jinwoo commands the shadows."
      }
    ]
  }
];

export const POPULAR_MOVIES: Anime[] = [
  {
    id: "jjk-0-movie",
    title: "Jujutsu Kaisen 0",
    poster: "/src/assets/images/jjk_continue_watching_1791182643396.jpg",
    rating: 9.6,
    year: 2021,
    badge: "Movie",
    subtitle: "Hindi Dub • Sub",
    genres: ["Action", "Supernatural"],
    synopsis: "Yuta Okkotsu controls Rika's cursed power.",
    isMovie: true,
    episodes: [
      {
        id: "jjk0-full",
        epNumber: 1,
        title: "Full Movie 1080p",
        duration: "1h 45m",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Yuta Okkotsu fights in Night Parade."
      }
    ]
  },
  {
    id: "dragon-ball-movie",
    title: "Dragon Ball Super",
    poster: "/src/assets/images/one_piece_hero_banner_1791182629860.jpg",
    rating: 9.4,
    year: 2022,
    badge: "Movie",
    subtitle: "Hindi Dub • Sub",
    genres: ["Action", "Martial Arts"],
    synopsis: "Goku and Gohan battle Red Ribbon Army.",
    isMovie: true,
    episodes: [
      {
        id: "dbs-full",
        epNumber: 1,
        title: "Super Hero Movie",
        duration: "1h 39m",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Gohan unlocks Beast form."
      }
    ]
  },
  {
    id: "naruto-movie",
    title: "Naruto Shippuden",
    poster: "/src/assets/images/naruto_continue_watching_1791182654215.jpg",
    rating: 9.2,
    year: 2012,
    badge: "Movie",
    subtitle: "Hindi Dub • Sub",
    genres: ["Ninja", "Action"],
    synopsis: "Road to Ninja feature film.",
    isMovie: true,
    episodes: [
      {
        id: "naruto-m1",
        epNumber: 1,
        title: "Road to Ninja",
        duration: "1h 49m",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Naruto enters the alternate Tsukuyomi world."
      }
    ]
  },
  {
    id: "your-name-movie",
    title: "Your Name",
    poster: "/src/assets/images/demon_slayer_portrait_1791182664683.jpg",
    rating: 9.9,
    year: 2016,
    badge: "Movie",
    subtitle: "Hindi Dub • Sub",
    genres: ["Romance", "Supernatural"],
    synopsis: "Mitsuha and Taki swap bodies across time.",
    isMovie: true,
    episodes: [
      {
        id: "yn-full",
        epNumber: 1,
        title: "Full Feature Film",
        duration: "1h 46m",
        hindiDubAvailable: true,
        streamUrl: VIDEO_URL,
        summary: "Makoto Shinkai masterpiece."
      }
    ]
  }
];

export const CATEGORIES = ["All", "Action", "Adventure", "Fantasy", "Shonen", "Romance", "Movies"];
