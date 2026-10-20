/* ================================================================
   CONFIG — js/data/config.js
   ----------------------------------------------------------------
   Everything you personalize lives in this one object: names, dates,
   cities, photos, messages, playlists and the optional service keys.

   Loaded first (see index.html), so every other script can read CONFIG.
   Nothing outside js/data/ needs editing for normal personalization.

   Values like "__FIREBASE_API_KEY__" are placeholders. The GitHub
   Actions deploy replaces them from repository secrets — never paste
   real keys into this file. See docs/tutorial.md for a walkthrough.
   ================================================================ */

// ⭐ Your two names. Shown on moods, the calendar, "From …" menus, quizzes,
// playlists and the footer. Everything in the code calls you partnerA and
// partnerB — the names below are only what people see.
const NAMES = { partnerA: "Alex", partnerB: "Sam" };

const CONFIG = {
  names: NAMES,

  hero: {
    eyebrow: "a little place that's just ours",
    title: "For You, My Love",
    // Demo text — replace with your own words.
    subtitle: "Two cities, one sunset, and a little corner of the internet for us.",
    message: "Our moods, our plans, the films we keep meaning to watch, and flowers that never need water. Everything here is just for the two of us.",
  },

  // ISO date strings, e.g. "2023-06-14T00:00:00"
  relationshipStart: "2025-01-01T00:00:00",
  reunionDate: "2027-01-01T00:00:00",

  // City name + lat/lon (needed for weather; find coords with any map)
  partnerALocation: { city: "New York", lat: 40.71, lon: -74.01 },
  partnerBLocation: { city: "London", lat: 51.51, lon: -0.13 },

  photos: {
    // Demo pictures (original illustrations) — swap in your own photos.
    hero: "assets/photos/demo/hero.jpg", // path or URL; use null to hide
    final: "assets/photos/demo/final.jpg",
  },

  // Photo Booth editor stickers. Drop transparent PNGs into assets/stickers/,
  // then list each one here, e.g. "assets/stickers/heart.png".
  // Names must match the files exactly. They appear under
  // Stickers → My stickers on every device.
  // (The bouquet uses the same folder; its flowers, bows and wraps
  // are listed in js/app.js — search BOUQUET_FLOWERS.)
  // The ones below are the bundled bouquet flowers and bows (original art,
  // MIT like the code). Remove any you don't want, or add your own.
  photoBoothStickers: [
    "assets/stickers/bow-navy-satin.png",
    "assets/stickers/bow-pink-satin.png",
    "assets/stickers/bow-sage-satin.png",
    "assets/stickers/flower-blue-cornflower.png",
    "assets/stickers/flower-blue-hydrangea.png",
    "assets/stickers/flower-cherry-blossom.png",
    "assets/stickers/flower-eucalyptus.png",
    "assets/stickers/flower-lavender.png",
    "assets/stickers/flower-orange-gerbera.png",
    "assets/stickers/flower-pink-peony.png",
    "assets/stickers/flower-pink-tulip.png",
    "assets/stickers/flower-purple-anemone.png",
    "assets/stickers/flower-red-rose.png",
    "assets/stickers/flower-sunflower.png",
    "assets/stickers/flower-white-calla-lily.png",
    "assets/stickers/flower-white-daisy.png",
  ],

  // News backend (Cloudflare Worker). After deploy, paste your URL here:
  // e.g. "https://couple-news.YOUR_SUBDOMAIN.workers.dev"  (no trailing slash)
  // Leave "" to use public CORS proxies as fallback.
  newsBackendUrl: "",

  thingsIMiss: [
    {
      icon: "🤗",
      text: "Something you miss about them (1).",
      extra: "",
    },
    {
      icon: "🗣️",
      text: "Something you miss about them (2).",
      extra: "",
    },
    {
      icon: "🌙",
      text: "Something you miss about them (3).",
      extra: "",
    },
    {
      icon: "☀️",
      text: "Something you miss about them (4).",
      extra: "",
    },
    {
      icon: "🤝",
      text: "Something you miss about them (5).",
      extra: "",
    },
    {
      icon: "😄",
      text: "Something you miss about them (6).",
      extra: "",
    },
    {
      icon: "✨",
      text: "Something you miss about them (7).",
      extra: "",
    },
    {
      icon: "🛋️",
      text: "Something you miss about them (8).",
      extra: "",
    },
    {
      icon: "💫",
      text: "Something you miss about them (9).",
      extra: "",
    },
  ],

  youMadeMeBetter: [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
  ],

  littleThings: [
    "A little thing you love (1)",
    "A little thing you love (2)",
    "A little thing you love (3)",
    "A little thing you love (4)",
    "A little thing you love (5)",
    "A little thing you love (6)",
    "A little thing you love (7)",
    "A little thing you love (8)",
    "A little thing you love (9)",
  ],

  // ---------------------------------------------------------------------
  // ALBUM
  // ---------------------------------------------------------------------
  // Each category needs a "category" name — that's the album heading, and
  // the name shown in the "Add a photo" dropdown — and an "items" list.
  // "items" can stay empty: the category still shows up and still accepts
  // photos added live from the "Our Album" tab (those are stored separately,
  // not here). This is only for photos you want to hardcode into the code
  // itself, the way this file used to.
  //
  // To hardcode a photo, add an item to the matching category like this:
  //   {
  //     caption: "Us, somewhere ordinary",  // shown under the photo
  //     date: "08/02/2026",                 // optional, shown next to the caption
  //     img: "assets/photos/us-1.jpeg",            // path to a file in the /photos folder
  //   },
  //
  // The items below are demo pictures (assets/photos/demo/) so the album
  // isn't empty on a fresh copy. Delete them and add your own photos.
  album: [
    {
      category: "Us",
      items: [
        { caption: "Top of the ferris wheel", date: "07/14/2025", img: "assets/photos/demo/ferris-wheel.jpg" },
      ],
    },
    {
      category: "Favorite Memories",
      items: [
        { caption: "Picnic that turned into a nap", date: "05/03/2025", img: "assets/photos/demo/picnic.jpg" },
        { caption: "Watching the sun go down", date: "09/21/2025", img: "assets/photos/demo/hero.jpg" },
      ],
    },
    {
      category: "Foods We've Eaten",
      items: [
        { caption: "First coffee date", date: "02/14/2025", img: "assets/photos/demo/cafe-date.jpg" },
        { caption: "Ramen in the rain", date: "11/08/2025", img: "assets/photos/demo/ramen-night.jpg" },
      ],
    },
    {
      category: "Places We've Been",
      items: [
        { caption: "Our beach", date: "08/02/2025", img: "assets/photos/demo/beach-sunset.jpg" },
        { caption: "City lights from the bridge", date: "12/31/2025", img: "assets/photos/demo/city-night.jpg" },
        { caption: "The quiet lake", date: "06/19/2025", img: "assets/photos/demo/mountain-lake.jpg" },
      ],
    },
    { category: "Polaroid Pictures", items: [] },
    {
      category: "Party Pictures",
      items: [
        { caption: "Birthday surprise", date: "03/27/2025", img: "assets/photos/demo/birthday-cake.jpg" },
      ],
    },
  ],


  favorites: {
    "Favorite food": `${NAMES.partnerA}'s pick / ${NAMES.partnerB}'s pick`,
    "Favorite color": `${NAMES.partnerA}'s pick / ${NAMES.partnerB}'s pick`,
    "Favorite song": `${NAMES.partnerA}'s pick / ${NAMES.partnerB}'s pick`,
    "Favorite sports team": `${NAMES.partnerA}'s pick / ${NAMES.partnerB}'s pick`,
    "Favorite hour": `${NAMES.partnerA}'s pick / ${NAMES.partnerB}'s pick`,
    "Favorite weekday": `${NAMES.partnerA}'s pick / ${NAMES.partnerB}'s pick`,
  },

  funFacts: [
    `Who said "I love you" first: ${NAMES.partnerA}`,
    `Who is more stubborn: ${NAMES.partnerB}`,
    `Who takes longer to shower: ${NAMES.partnerA}`,
    `Who is more likely to fall asleep first: ${NAMES.partnerA}`,
    `Who eats more: ${NAMES.partnerB}`,
    `Who has the better tan: ${NAMES.partnerA}`,
    `Who is more dramatic: ${NAMES.partnerB}`,
    `Who misses the other person more: ${NAMES.partnerA}`,
  ],

  firsts: [
    {
      title: "First time we met",
      date: "January 10, 2026",
      desc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      title: "First conversation",
      date: "January 24, 2026",
      desc: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      title: "First date",
      date: "February 14, 2026",
      desc: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      title: "First photo together",
      date: "March 8, 2026",
      desc: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    },
    {
      title: "First trip",
      date: "April 18, 2026",
      desc: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      title: "First time we had to be apart",
      date: "May 30, 2026",
      desc: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
    },
  ],

  openWhen: [
    {
      icon: "💚",
      label: "Open when you're sad",
      title: "Open When You're Sad",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      icon: "💚",
      label: "Open when you're missing me",
      title: "Open When You're Missing Me",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      icon: "💚",
      label: "Open when you're happy",
      title: "Open When You're Happy",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      icon: "💚",
      label: "Open when you need motivation",
      title: "Open When You Need Motivation",
      text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    },
    {
      icon: "💚",
      label: "Open when you're stressed",
      title: "Open When You're Stressed",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      icon: "💚",
      label: "Open when you can't sleep",
      title: "Open When You Can't Sleep",
      text: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
    },
    {
      icon: "💚",
      label: "Open when you're angry",
      title: "Open When You're Angry",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      icon: "💚",
      label: "Open when you need a hug",
      title: "Open When You Need a Hug",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      icon: "💚",
      label: "Open when you're feeling insecure",
      title: "Open When You're Feeling Insecure",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      icon: "💚",
      label: "Open when you need to smile",
      title: "Open When You Need to Smile",
      text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    },
    {
      icon: "💚",
      label: "Open when you want to remember us",
      title: "Open When You Want to Remember Us",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      icon: "💚",
      label: "Open when you just want to hear from me",
      title: "Open When You Just Want to Hear From Me",
      text: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
    },
    {
      icon: "💚",
      label: "Open when you're overwhelmed",
      title: "Open When You're Overwhelmed",
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
    },
    {
      icon: "💚",
      label: "Open when you feel like giving up",
      title: "Open When You Feel Like Giving Up",
      text: "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
    },
    {
      icon: "💚",
      label: "Open when you did something you're proud of",
      title: "Open When You Did Something You're Proud Of",
      text: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    },
    {
      icon: "💚",
      label: "Open when you're homesick",
      title: "Open When You're Homesick",
      text: "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet.",
    },
    {
      icon: "💚",
      label: "Open when you need a distraction",
      title: "Open When You Need a Distraction",
      text: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    },
    {
      icon: "💚",
      label: "Open when it's a bad day",
      title: "Open When It's a Bad Day",
      text: "Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus.",
    },
  ],

  // ---- Firebase — live sync ----
  // Powers every shared feature (Bucket List, Movies, Music, Memories,
  // Calendar, Day Cards, Bouquet, moods, Photo Booth signaling, ...).
  // With no valid config the site still works, but each device only
  // remembers its own changes.
  // Leave the __PLACEHOLDERS__ as they are: the deploy fills them in from
  // GitHub secrets. Setup walkthrough: docs/firebase-setup.md.
  firebase: {
    apiKey: "__FIREBASE_API_KEY__",
    authDomain: "__FIREBASE_AUTH_DOMAIN__",
    projectId: "__FIREBASE_PROJECT_ID__",
    storageBucket: "__FIREBASE_STORAGE_BUCKET__",
    messagingSenderId: "__FIREBASE_MESSAGING_SENDER_ID__",
    appId: "__FIREBASE_APP_ID__",
  },

  // ---- TURN relay (Photo Booth across different networks) ----
  // The Photo Booth uses WebRTC. Two people on the same wifi connect
  // directly, but different networks (e.g. wifi vs mobile data) need a
  // TURN relay. Free Metered account, no card needed. Without it the
  // booth only works when you are on the same network.
  // Leave the placeholders; the deploy injects them. Setup:
  // docs/turn-setup.md.
  meteredTurn: {
    domain: "__METERED_TURN_DOMAIN__",
    apiKey: "__METERED_TURN_API_KEY__",
  },

  // ---- Cloudinary — "Our Memories" photo uploads ----
  // Photos are uploaded to Cloudinary's free tier; only the resulting
  // URL is saved in Firestore. The unsigned upload preset is designed to
  // sit in client-side code. Setup: docs/cloudinary-setup.md.
  cloudinary: {
    cloudName: "__CLOUDINARY_CLOUD_NAME__",
    uploadPreset: "__CLOUDINARY_UPLOAD_PRESET__",
  },

  // ---- TMDB (The Movie Database) — movie search for Movie Nights ----
  // Optional and free. Without it you can still add movies by typing the
  // title. Get the "API Read Access Token" from your TMDB account
  // (Settings > API) and store it as the GitHub secret TMDB_ACCESS_TOKEN.
  tmdb: {
    accessToken: "__TMDB_ACCESS_TOKEN__",
  },

  // Movies starting list (optional). Like bucketList below, these only
  // get loaded once, the very first time the site connects to a fresh/
  // empty Firestore database. Leave empty and just use the search box
  // on the live site instead — this is only here if you want to
  // pre-seed a couple of movies.
  movieList: [
    // { title: "The Princess Bride", year: "1987", status: "towatch" },
  ],

  // Bucket list starting items. These only get loaded once, the very
  // first time the site connects to a fresh/empty Firestore database
  // (or on any device before Firebase is configured at all).
  // After that, everyone's add/check/edit/delete actions on the live
  // site are what's shown — not this array.
  bucketList: [
    { text: "Watch the sunset from a rooftop together", done: false },
    { text: "Cook a full dinner together, start to finish", done: false },
    {
      text: "Take a spontaneous weekend trip, no real plan",
      done: false,
    },
    { text: "Go somewhere neither of us has ever been", done: false },
  ],

  /* ================================================================
     MUSIC / PLAYLISTS
     ---------------------------------------------------------------
     HOW TO EDIT:
     1. Each object in `playlists` is one category button (e.g. "Our Songs").
     2. `id`          — unique key, don't change once set.
     3. `label`       — English name shown on the button.
     4. `description` — short note under the track list.
     5. `songs`       — array of tracks in this playlist.

     HOW TO ADD A SONG (IMPORTANT — only the ID, not the full link):
       { title: "Song Name",
         artist: "Artist Name",
         youtubeId: "BW9Fzwuf43c",   // <-- ONLY this part
         description: "Why this song matters / when to play it" }

     From a link like:
       https://youtu.be/BW9Fzwuf43c?si=LXWukgoV6rc_x8j0
       https://www.youtube.com/watch?v=BW9Fzwuf43c
     the youtubeId is:  BW9Fzwuf43c
     (everything after youtu.be/ or v=  — stop before ? or &)

     You can also paste a full YouTube URL in youtubeId — the site
     will try to extract the ID automatically.

     TROUBLESHOOTING Error 153 / blank player:
     - Do NOT open index.html by double-clicking (file://).
       YouTube blocks many embeds on local files.
       Fix: host the site online, OR run a tiny local server, e.g.:
         cd folder-with-index.html
         python3 -m http.server 8000
       then open http://localhost:8000
     - Some videos have embedding disabled by the uploader — those
       will never play in an iframe. Use a different upload of the song.

     HOW TO ADD A NEW PLAYLIST:
       Copy an existing playlist object, give it a new id + labels,
       and fill in your songs array. It will appear as a new button
       automatically.
     ================================================================ */
  playlists: [
    {
      id: "our-playlist",
      label: "Our Playlist",
      description: "The shared playlist — everything we both like.",
      songs: [],
    },
    {
      id: "study",
      label: "Study Playlist",
      description: "Focus mode — softer tracks for studying.",
      songs: [
        {
          title: "Lofi Hip-hop radio",
          artist: "Lofi Girl",
          youtubeId: "https://www.youtube.com/watch?v=rFZHOHl-L8A",
          description: "Soft focus background.",
        },
      ],
    },
    {
      id: "listen-when",
      label: "Listen When…",
      description: "Songs for specific moods and moments.",
      songs: [],
    },
    {
      id: "partnerA-favs",
      label: `${NAMES.partnerA}'s Favorites`,
      description: `${NAMES.partnerA}'s go-to songs.`,
      songs: [],
    },
    {
      id: "partnerB-favs",
      label: `${NAMES.partnerB}'s Favorites`,
      description: `${NAMES.partnerB}'s go-to songs.`,
      songs: [],
    },
  ],

};
