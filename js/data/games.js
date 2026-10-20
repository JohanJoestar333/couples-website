/* ================================================================
   OUR GAMES — data — js/data/games.js
   ----------------------------------------------------------------
   The five couples' card decks. Game flow, lobby, and rendering live in
   app.js (search "OUR GAMES").

   GAMES_META      title / emoji / accent / mechanic for each deck
   GAMES_DATA      the cards, one array per deck
   FUTURE_PHRASES  wording used in the "Someday" deck's summary

   Add cards any time by appending objects to GAMES_DATA[deckId]; no
   other code needs to change. Card shape:
     { id, category, level (optional), question,
       followUp (optional), rare (optional) }
   ================================================================ */

const GAMES_META = {
  deep: {
    emoji: "💚",
    title: "Really Know Us",
    subtitle: "Deep",
    accent: "green",
    desc: "Meaningful questions about memories, values, and each other.",
    mechanic: "reveal",
  },
  wyr: {
    emoji: "🎲",
    title: "You or Me?",
    subtitle: "Would You Rather",
    accent: "gold",
    desc: "Impossible choices, funny and romantic. Discuss, then reveal.",
    mechanic: "predict",
  },
  flirty: {
    emoji: "🔥",
    title: "After Dark",
    subtitle: "Flirty",
    accent: "blush",
    desc: "Playful, romantic, and a little bold. Skip anything, anytime.",
    mechanic: "reveal",
  },
  chaos: {
    emoji: "😂",
    title: "Couple Chaos",
    subtitle: "Chaos",
    accent: "amber",
    desc: "Ridiculous scenarios. Answer secretly, then see if you match.",
    mechanic: "match",
  },
  future: {
    emoji: "🌎",
    title: "Someday",
    subtitle: "Future",
    accent: "plum",
    desc: "Dream about the life you're building together.",
    mechanic: "summary",
  },
};

const GAMES_DATA = {
  deep: [
    {
      id: "deep_001",
      category: "First Impressions",
      level: 1,
      question: "What was the very first thing you noticed about me?",
    },
    {
      id: "deep_002",
      category: "First Impressions",
      level: 1,
      question:
        "When did you first realize you liked me as more than a friend?",
    },
    {
      id: "deep_003",
      category: "First Impressions",
      level: 1,
      question: "What was your first impression of my laugh?",
    },
    {
      id: "deep_004",
      category: "Memories",
      level: 1,
      question:
        "What's a small, ordinary moment with me that you still think about?",
    },
    {
      id: "deep_005",
      category: "Memories",
      level: 1,
      question: "What is your favorite memory of us so far, and why?",
    },
    {
      id: "deep_006",
      category: "Memories",
      level: 1,
      question: "Describe a moment when you felt proud of us as a couple.",
    },
    {
      id: "deep_007",
      category: "Memories",
      level: 1,
      question: "What's a photo of us that always makes you smile?",
    },
    {
      id: "deep_008",
      category: "Appreciation",
      level: 1,
      question:
        "What's something small I do that you don't think I know you appreciate?",
    },
    {
      id: "deep_009",
      category: "Appreciation",
      level: 1,
      question: "What is one habit of mine that you secretly love?",
    },
    {
      id: "deep_010",
      category: "Appreciation",
      level: 1,
      question: "When do you feel most proud of me?",
    },
    {
      id: "deep_011",
      category: "Personality",
      level: 2,
      question:
        "What's a side of my personality that took you time to understand?",
    },
    {
      id: "deep_012",
      category: "Personality",
      level: 2,
      question: "How would you describe me to someone who has never met me?",
    },
    {
      id: "deep_013",
      category: "Personality",
      level: 2,
      question: "What do you think is my greatest strength?",
    },
    {
      id: "deep_014",
      category: "Personality",
      level: 2,
      question: "What is something about me that still surprises you?",
    },
    {
      id: "deep_015",
      category: "Love",
      level: 2,
      question:
        "What is something I do that makes you feel loved without me saying a word?",
    },
    {
      id: "deep_016",
      category: "Love",
      level: 2,
      question: "How do you prefer to receive love from me?",
    },
    {
      id: "deep_017",
      category: "Love",
      level: 2,
      question: "What does 'home' feel like when you're with me?",
    },
    {
      id: "deep_018",
      category: "Communication",
      level: 2,
      question: "When do you feel most heard by me?",
    },
    {
      id: "deep_019",
      category: "Communication",
      level: 2,
      question:
        "What's the best way for me to check in with you on a hard day?",
    },
    {
      id: "deep_020",
      category: "Communication",
      level: 2,
      question: "Is there a topic you wish we talked about more often?",
    },
    {
      id: "deep_021",
      category: "Childhood",
      level: 2,
      question:
        "What's something from your childhood you wish I understood better?",
    },
    {
      id: "deep_022",
      category: "Childhood",
      level: 2,
      question: "What childhood dream still lives somewhere in you?",
    },
    {
      id: "deep_023",
      category: "Childhood",
      level: 2,
      question: "Who in your family shaped how you love the most?",
    },
    {
      id: "deep_024",
      category: "Dreams",
      level: 2,
      question:
        "What is a dream of yours that you haven't told many people about?",
    },
    {
      id: "deep_025",
      category: "Dreams",
      level: 2,
      question: "What would a perfect ordinary day with me look like?",
    },
    {
      id: "deep_026",
      category: "Us",
      level: 2,
      question:
        "What is something about me that you think you understand better than most people?",
    },
    {
      id: "deep_027",
      category: "Us",
      level: 2,
      question:
        "What inside joke of ours would you never explain to a stranger?",
    },
    {
      id: "deep_028",
      category: "Us",
      level: 2,
      question: "What song will always remind you of us?",
    },
    {
      id: "deep_029",
      category: "Relationship",
      level: 3,
      question: "What do you think has changed most about us since we met?",
    },
    {
      id: "deep_030",
      category: "Relationship",
      level: 3,
      question: "What is one thing we do well as a team?",
    },
    {
      id: "deep_031",
      category: "Relationship",
      level: 3,
      question: "What is one thing you'd like us to get better at together?",
    },
    {
      id: "deep_032",
      category: "Relationship",
      level: 3,
      question: "When do you feel closest to me?",
    },
    {
      id: "deep_033",
      category: "Values",
      level: 3,
      question:
        "What's a value of mine that you didn't expect to admire so much?",
    },
    {
      id: "deep_034",
      category: "Values",
      level: 3,
      question: "What principle would you never want us to compromise on?",
    },
    {
      id: "deep_035",
      category: "Fears",
      level: 3,
      question: "What's a fear about us that you rarely say out loud?",
    },
    {
      id: "deep_036",
      category: "Fears",
      level: 3,
      question: "What helps you feel safe when you're anxious about us?",
    },
    {
      id: "deep_037",
      category: "Future",
      level: 3,
      question:
        "What part of our future are you most excited about, and what part scares you a little?",
    },
    {
      id: "deep_038",
      category: "Future",
      level: 3,
      question: "What tradition do you hope we create together?",
    },
    {
      id: "deep_039",
      category: "Vulnerability",
      level: 4,
      question:
        "What's something you've never told me because you were afraid of how I'd react?",
      followUp:
        "You don't have to answer fully — even sharing a little counts.",
    },
    {
      id: "deep_040",
      category: "Vulnerability",
      level: 4,
      question: "When was the last time you felt truly vulnerable with me?",
    },
    {
      id: "deep_041",
      category: "Vulnerability",
      level: 4,
      question:
        "What do you need from me when you're hurting that I might not always know?",
    },
    {
      id: "deep_042",
      category: "Things We Haven't Said",
      level: 4,
      question: "What is something you wish I asked you about more often?",
    },
    {
      id: "deep_043",
      category: "Things We Haven't Said",
      level: 4,
      question: "Is there a compliment you've wanted to give me but haven't?",
    },
    {
      id: "deep_044",
      category: "Things We Haven't Said",
      level: 4,
      question: "What's something hard you want to say, but gently?",
    },
    {
      id: "deep_045",
      category: "Trust",
      level: 4,
      question: "What builds trust for you the fastest in a relationship?",
    },
    {
      id: "deep_046",
      category: "Trust",
      level: 4,
      question: "When have you felt most trusted by me?",
    },
    {
      id: "deep_047",
      category: "Conflict",
      level: 3,
      question: "How do you prefer we repair after a disagreement?",
    },
    {
      id: "deep_048",
      category: "Conflict",
      level: 3,
      question:
        "What is something I do during conflict that helps you, even if I don't realize it?",
    },
    {
      id: "deep_049",
      category: "Conflict",
      level: 4,
      question:
        "What is a disagreement we handled well, and what made it work?",
    },
    {
      id: "deep_050",
      category: "Growth",
      level: 3,
      question: "In what way have I helped you grow since we met?",
    },
    {
      id: "deep_051",
      category: "Growth",
      level: 3,
      question:
        "What is something you've learned about love from being with me?",
    },
    {
      id: "deep_052",
      category: "Growth",
      level: 2,
      question: "What version of me do you hope I keep becoming?",
    },
    {
      id: "deep_053",
      category: "How Well Do You Know Me",
      level: 2,
      question: "What do you think I worry about more than I admit?",
    },
    {
      id: "deep_054",
      category: "How Well Do You Know Me",
      level: 2,
      question: "What do you think makes me feel most confident?",
    },
    {
      id: "deep_055",
      category: "How Well Do You Know Me",
      level: 3,
      question:
        "If you had to guess my biggest insecurity, what would you say?",
    },
    {
      id: "deep_056",
      category: "How Well Do You Know Me",
      level: 2,
      question: "What do you think is my love language, and why?",
    },
    {
      id: "deep_057",
      category: "Appreciation",
      level: 1,
      question: "Name three things you're grateful for about us right now.",
    },
    {
      id: "deep_058",
      category: "Memories",
      level: 2,
      question:
        "What was a moment when you thought, 'I really love this person'?",
    },
    {
      id: "deep_059",
      category: "Memories",
      level: 2,
      question:
        "Tell the story of a day with me that felt perfect in a simple way.",
    },
    {
      id: "deep_060",
      category: "Love",
      level: 3,
      question: "What does loyalty mean to you in our relationship?",
    },
    {
      id: "deep_061",
      category: "Love",
      level: 3,
      question: "How do you know when I need reassurance?",
    },
    {
      id: "deep_062",
      category: "Us",
      level: 3,
      question: "What is our superpower as a couple?",
    },
    {
      id: "deep_063",
      category: "Us",
      level: 3,
      question:
        "What would you miss most about us if we couldn't talk for a week?",
    },
    {
      id: "deep_064",
      category: "Communication",
      level: 3,
      question:
        "Do you feel more comfortable texting or talking when something is serious?",
    },
    {
      id: "deep_065",
      category: "Personality",
      level: 3,
      question:
        "What is a boundary of yours that you want me to always respect?",
    },
    {
      id: "deep_066",
      category: "Personality",
      level: 2,
      question: "What makes you feel most like yourself around me?",
    },
    {
      id: "deep_067",
      category: "Dreams",
      level: 3,
      question: "What shared goal feels most important to you this year?",
    },
    {
      id: "deep_068",
      category: "Values",
      level: 2,
      question: "What kind of partner do you try to be for me?",
    },
    {
      id: "deep_069",
      category: "Fears",
      level: 4,
      question:
        "What would make you feel distant from me, and how can we avoid that?",
    },
    {
      id: "deep_070",
      category: "Trust",
      level: 3,
      question:
        "What does honesty look like to you on ordinary days, not just big ones?",
    },
    {
      id: "deep_071",
      category: "Growth",
      level: 4,
      question:
        "What is something you're still learning about being in a relationship?",
    },
    {
      id: "deep_072",
      category: "Vulnerability",
      level: 3,
      question:
        "What is a soft spot of yours that you only show people you trust?",
    },
    {
      id: "deep_073",
      category: "Relationship",
      level: 4,
      question:
        "If our relationship were a season, which one would it be right now and why?",
    },
    {
      id: "deep_074",
      category: "Us",
      level: 5,
      question: "Tell them something you've never said out loud before.",
      rare: true,
    },
    {
      id: "deep_075",
      category: "Us",
      level: 5,
      question:
        "Pick a memory and tell the full story, with all the details you remember.",
      rare: true,
    },
    {
      id: "deep_076",
      category: "Love",
      level: 5,
      question:
        "In one minute, say everything you love about me without stopping.",
      rare: true,
    },
    {
      id: "deep_077",
      category: "Vulnerability",
      level: 5,
      question:
        "Share a fear about the future and let the other person respond with care.",
      rare: true,
    },
    {
      id: "deep_078",
      category: "Things We Haven't Said",
      level: 5,
      question: "Ask the question you've been avoiding — gently.",
      rare: true,
    },
    {
      id: "deep_079",
      category: "Appreciation",
      level: 2,
      question: "What is the kindest thing I've ever done for you?",
    },
    {
      id: "deep_080",
      category: "Memories",
      level: 3,
      question:
        "What trip or outing with me would you do again tomorrow if you could?",
    },
    {
      id: "deep_081",
      category: "First Impressions",
      level: 2,
      question: "What did you almost get wrong about me at the beginning?",
    },
    {
      id: "deep_082",
      category: "Childhood",
      level: 3,
      question:
        "What part of your younger self still shows up when you're with me?",
    },
    {
      id: "deep_083",
      category: "Communication",
      level: 4,
      question:
        "What is something you need me to hear, even if it's hard to say?",
    },
    {
      id: "deep_084",
      category: "Love",
      level: 1,
      question: "When was the last time I made you laugh until it hurt?",
    },
    {
      id: "deep_085",
      category: "Us",
      level: 1,
      question: "What is your favorite way we say goodbye or goodnight?",
    },
    {
      id: "deep_086",
      category: "Appreciation",
      level: 3,
      question: "What about my personality balances yours?",
    },
    {
      id: "deep_087",
      category: "Relationship",
      level: 2,
      question: "What does quality time look like for you with me?",
    },
    {
      id: "deep_088",
      category: "Dreams",
      level: 1,
      question:
        "If we could teleport somewhere for 24 hours, where would we go?",
    },
    {
      id: "deep_089",
      category: "Values",
      level: 4,
      question: "What does 'forever' mean to you in practical, everyday terms?",
    },
    {
      id: "deep_090",
      category: "Fears",
      level: 2,
      question: "What reassures you fastest when you overthink?",
    },
    {
      id: "deep_091",
      category: "Trust",
      level: 2,
      question: "What is a promise between us that means a lot to you?",
    },
    {
      id: "deep_092",
      category: "Growth",
      level: 1,
      question: "What is one thing I do better now than when we first met?",
    },
    {
      id: "deep_093",
      category: "How Well Do You Know Me",
      level: 1,
      question: "What snack would I pick if I were stressed?",
    },
    {
      id: "deep_094",
      category: "How Well Do You Know Me",
      level: 1,
      question: "What would I order at a café without looking at the menu?",
    },
    {
      id: "deep_095",
      category: "Conflict",
      level: 2,
      question:
        "What is a signal that you're done arguing and ready to reconnect?",
    },
    {
      id: "deep_096",
      category: "Personality",
      level: 1,
      question: "What emoji would you use to describe me today?",
    },
    {
      id: "deep_097",
      category: "Memories",
      level: 4,
      question: "What is a hard moment we got through that made us stronger?",
    },
    {
      id: "deep_098",
      category: "Love",
      level: 4,
      question: "What does commitment look like to you on the boring days?",
    },
    {
      id: "deep_099",
      category: "Us",
      level: 4,
      question: "What story about us do you hope we tell people in ten years?",
    },
    {
      id: "deep_100",
      category: "Vulnerability",
      level: 2,
      question: "When do you find it hardest to ask for help from me?",
    },
    {
      id: "deep_101",
      category: "Time Capsule",
      level: 2,
      question:
        "If we buried a time capsule today, what's the one object you'd insist goes in it?",
    },
    {
      id: "deep_102",
      category: "Time Capsule",
      level: 2,
      question: "What message would you leave for us to read in ten years?",
    },
    {
      id: "deep_103",
      category: "Time Capsule",
      level: 2,
      question:
        "What current inside joke do you hope we still laugh at in a decade?",
    },
    {
      id: "deep_104",
      category: "Time Capsule",
      level: 2,
      question:
        "What's a photo from this exact month you want us to remember forever?",
    },
    {
      id: "deep_105",
      category: "Time Capsule",
      level: 2,
      question:
        "If you could freeze one week of this year in amber, which would it be?",
    },
    {
      id: "deep_106",
      category: "Time Capsule",
      level: 2,
      question:
        "What's something about \"us right now\" that you don't want to change?",
    },
    {
      id: "deep_107",
      category: "Time Capsule",
      level: 2,
      question: "What would you tell past-you on the day we met?",
    },
    {
      id: "deep_108",
      category: "Time Capsule",
      level: 2,
      question:
        "What's a prediction you have for where we'll be exactly one year from today?",
    },
    {
      id: "deep_109",
      category: "Time Capsule",
      level: 2,
      question: "What object in our home tells the truest story about us?",
    },
    {
      id: "deep_110",
      category: "Time Capsule",
      level: 2,
      question:
        "If aliens found only our text messages, what would they think we're like?",
    },
    {
      id: "deep_111",
      category: "Roots",
      level: 3,
      question:
        "What tradition from your family do you hope we carry into our own?",
    },
    {
      id: "deep_112",
      category: "Roots",
      level: 3,
      question:
        "What's a lesson your parents taught you, on purpose or not, about love?",
    },
    {
      id: "deep_113",
      category: "Roots",
      level: 3,
      question: "What's a memory from home that shaped how you show affection?",
    },
    {
      id: "deep_114",
      category: "Roots",
      level: 3,
      question: "Who from your past changed how you love now, and how?",
    },
    {
      id: "deep_115",
      category: "Roots",
      level: 3,
      question:
        "What's something about your hometown you want me to understand better?",
    },
    {
      id: "deep_116",
      category: "Roots",
      level: 3,
      question: "What family recipe or ritual do you want to teach me?",
    },
    {
      id: "deep_117",
      category: "Roots",
      level: 3,
      question:
        "What's a story about your grandparents' love that stuck with you?",
      rare: true,
    },
    {
      id: "deep_118",
      category: "Roots",
      level: 3,
      question:
        "What did you learn about conflict from the adults around you growing up?",
    },
    {
      id: "deep_119",
      category: "Roots",
      level: 3,
      question:
        "What's a value your family instilled in you that still guides you?",
    },
    {
      id: "deep_120",
      category: "Roots",
      level: 3,
      question:
        "If your younger self met me today, what would surprise them most?",
    },
    {
      id: "deep_121",
      category: "Language of Love",
      level: 2,
      question:
        "Which love language do you think I express without realizing it?",
    },
    {
      id: "deep_122",
      category: "Language of Love",
      level: 2,
      question:
        'What\'s a way I could say "I love you" without using those words?',
    },
    {
      id: "deep_123",
      category: "Language of Love",
      level: 2,
      question:
        "Do you feel loved more through words, actions, or presence — and has that changed with us?",
    },
    {
      id: "deep_124",
      category: "Language of Love",
      level: 2,
      question:
        "What's a language, literal or made-up, we've built that's just ours?",
    },
    {
      id: "deep_125",
      category: "Language of Love",
      level: 2,
      question: "What's the kindest sentence I've ever said to you?",
    },
    {
      id: "deep_126",
      category: "Language of Love",
      level: 2,
      question: "What phrase do you wish I said more often?",
    },
    {
      id: "deep_127",
      category: "Language of Love",
      level: 2,
      question: "If our relationship had a motto, what would it be?",
    },
    {
      id: "deep_128",
      category: "Language of Love",
      level: 2,
      question: "What's a gesture that means more to you than any words could?",
    },
    {
      id: "deep_129",
      category: "Language of Love",
      level: 2,
      question: 'How do you say "I\'m sorry" best, and how do I?',
    },
    {
      id: "deep_130",
      category: "Language of Love",
      level: 2,
      question:
        "What's something you've never had to explain to me because I just understood?",
    },
    {
      id: "deep_131",
      category: "Identity",
      level: 3,
      question: "How has being with me changed the way you see yourself?",
    },
    {
      id: "deep_132",
      category: "Identity",
      level: 3,
      question:
        "What part of your identity feels safest to show only around me?",
    },
    {
      id: "deep_133",
      category: "Identity",
      level: 3,
      question: "What's a label or role you've outgrown since we got together?",
    },
    {
      id: "deep_134",
      category: "Identity",
      level: 3,
      question:
        "What do you want people to understand about you that they usually miss?",
    },
    {
      id: "deep_135",
      category: "Identity",
      level: 3,
      question:
        "What's something you're still figuring out about who you want to be?",
    },
    {
      id: "deep_136",
      category: "Identity",
      level: 3,
      question: "How do you want to be remembered by the people who love you?",
      rare: true,
    },
    {
      id: "deep_137",
      category: "Identity",
      level: 3,
      question: "What's a version of yourself you're proud you left behind?",
    },
    {
      id: "deep_138",
      category: "Identity",
      level: 3,
      question: 'What does "being yourself" around me actually feel like?',
    },
    {
      id: "deep_139",
      category: "Identity",
      level: 3,
      question:
        "What's a strength you didn't know you had until this relationship?",
    },
    {
      id: "deep_140",
      category: "Identity",
      level: 3,
      question:
        "If you had to introduce yourself only through what you love, what would you say?",
    },
    {
      id: "deep_141",
      category: "Gratitude",
      level: 1,
      question:
        "What's something ordinary today that you're quietly grateful for?",
    },
    {
      id: "deep_142",
      category: "Gratitude",
      level: 1,
      question: "Name a hard season that ended up giving you something good.",
    },
    {
      id: "deep_143",
      category: "Gratitude",
      level: 1,
      question:
        "What's a small kindness I did recently that you haven't mentioned?",
    },
    {
      id: "deep_144",
      category: "Gratitude",
      level: 1,
      question:
        "What's something about your health or body you're grateful for right now?",
    },
    {
      id: "deep_145",
      category: "Gratitude",
      level: 1,
      question:
        "Who besides me are you especially thankful for lately, and why?",
    },
    {
      id: "deep_146",
      category: "Gratitude",
      level: 1,
      question:
        "What's a comfort in your daily life you don't take for granted?",
    },
    {
      id: "deep_147",
      category: "Gratitude",
      level: 1,
      question:
        "What's something about this exact stage of our relationship you're thankful for?",
    },
    {
      id: "deep_148",
      category: "Gratitude",
      level: 1,
      question:
        "What's a mistake that taught you something you're now grateful for?",
    },
    {
      id: "deep_149",
      category: "Gratitude",
      level: 1,
      question: "What's a small luxury that makes your week better?",
    },
    {
      id: "deep_150",
      category: "Gratitude",
      level: 1,
      question:
        "What do you want to remember to be grateful for on a hard day?",
    },
    {
      id: "deep_151",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I remembered your stories in perfect detail or always show up when it matters most?",
    },
    {
      id: "deep_152",
      category: "This or That",
      level: 1,
      question:
        "Would you rather we grow slowly and steadily or in sudden big leaps?",
    },
    {
      id: "deep_153",
      category: "This or That",
      level: 1,
      question:
        "Would you rather know all my flaws upfront or discover them slowly?",
    },
    {
      id: "deep_154",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I comfort you with words or with quiet company?",
    },
    {
      id: "deep_155",
      category: "This or That",
      level: 1,
      question:
        "Would you rather matching daily routines or separate ones that overlap on weekends?",
    },
    {
      id: "deep_156",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I ask more about your day or share more about mine first?",
    },
    {
      id: "deep_157",
      category: "This or That",
      level: 1,
      question:
        "Would you rather celebrate wins loudly together or quietly between just us?",
    },
    {
      id: "deep_158",
      category: "This or That",
      level: 1,
      question:
        "Would you rather we process feelings out loud immediately or need time to think first?",
    },
    {
      id: "deep_159",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I challenge your ideas more or support them more?",
    },
    {
      id: "deep_160",
      category: "This or That",
      level: 1,
      question:
        "Would you rather build a life that's mostly familiar or mostly new?",
    },
    {
      id: "deep_161",
      category: "Two Truths and a Lie",
      level: 2,
      question:
        "Tell me two true things about how you feel today and one made-up one.",
      followUp: "Guess which one is the lie, then tell them.",
    },
    {
      id: "deep_162",
      category: "Two Truths and a Lie",
      level: 2,
      question: "Share two real childhood memories and one invented one.",
      followUp: "Guess which one is the lie, then tell them.",
    },
    {
      id: "deep_163",
      category: "Two Truths and a Lie",
      level: 2,
      question: "Give two true reasons you're with me and one fake reason.",
      followUp: "Guess which one is the lie, then tell them.",
      rare: true,
    },
    {
      id: "deep_164",
      category: "Two Truths and a Lie",
      level: 2,
      question: "Name two real fears and one fake one.",
      followUp: "Guess which one is the lie, then tell them.",
    },
    {
      id: "deep_165",
      category: "Two Truths and a Lie",
      level: 2,
      question: "Tell two true stories from before we met and one false one.",
      followUp: "Guess which one is the lie, then tell them.",
    },
    {
      id: "deep_166",
      category: "Two Truths and a Lie",
      level: 2,
      question: "Share two real dreams for our future and one made-up dream.",
      followUp: "Guess which one is the lie, then tell them.",
    },
    {
      id: "deep_167",
      category: "Two Truths and a Lie",
      level: 2,
      question: "Give two true opinions about me and one exaggerated one.",
      followUp: "Guess which one is the lie, then tell them.",
    },
    {
      id: "deep_168",
      category: "Two Truths and a Lie",
      level: 2,
      question: "Tell two real habits of yours and one you're making up.",
      followUp: "Guess which one is the lie, then tell them.",
    },
    {
      id: "deep_169",
      category: "Two Truths and a Lie",
      level: 2,
      question:
        "Share two true favorite memories of us and one invented memory.",
      followUp: "Guess which one is the lie, then tell them.",
    },
    {
      id: "deep_170",
      category: "Two Truths and a Lie",
      level: 2,
      question:
        "Name two real things you'd change about your day and one fake one.",
      followUp: "Guess which one is the lie, then tell them.",
    },
    {
      id: "deep_171",
      category: "Speed Round",
      level: 1,
      question: 'First word that comes to mind when you think of "us"?',
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_172",
      category: "Speed Round",
      level: 1,
      question: "One thing you need right now, in five words or less?",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_173",
      category: "Speed Round",
      level: 1,
      question: "Best decision you've made this year, in one sentence?",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_174",
      category: "Speed Round",
      level: 1,
      question: "Describe today in exactly three words.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_175",
      category: "Speed Round",
      level: 1,
      question: "What's the first memory of me that comes to mind, no filter?",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_176",
      category: "Speed Round",
      level: 1,
      question: "Name the last thing that made you laugh, fast.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_177",
      category: "Speed Round",
      level: 1,
      question:
        "One thing you're avoiding thinking about — just name it, don't explain.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_178",
      category: "Speed Round",
      level: 1,
      question: "What's the truest thing you know about yourself right now?",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_179",
      category: "Speed Round",
      level: 1,
      question:
        "Say the nicest thing about me you can think of in three seconds.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_180",
      category: "Speed Round",
      level: 1,
      question: "What do you want right this second — say it before you think.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_181",
      category: "Wildcard",
      level: 3,
      question: "Ask me any question you've been holding onto — right now.",
    },
    {
      id: "deep_182",
      category: "Wildcard",
      level: 3,
      question: "Skip the question. Instead, just tell me something true.",
    },
    {
      id: "deep_183",
      category: "Wildcard",
      level: 3,
      question: 'Ask me a "Really Know Us" question you make up on the spot.',
    },
    {
      id: "deep_184",
      category: "Wildcard",
      level: 3,
      question:
        "Whoever answers first gets to ask the next question instead of drawing.",
    },
    {
      id: "deep_185",
      category: "Wildcard",
      level: 3,
      question: 'Say a toast for us that starts with "To us, because..."',
    },
    {
      id: "deep_186",
      category: "Wildcard",
      level: 3,
      question: "Answer as if you were writing our story's next chapter.",
    },
    {
      id: "deep_187",
      category: "Wildcard",
      level: 3,
      question:
        "If this card were a plot twist in our story, what would it reveal?",
    },
    {
      id: "deep_188",
      category: "Wildcard",
      level: 3,
      question: "Give an answer using only questions.",
    },
    {
      id: "deep_189",
      category: "Wildcard",
      level: 3,
      question:
        "Pick a random object near you and explain how it reminds you of me.",
    },
    {
      id: "deep_190",
      category: "Wildcard",
      level: 3,
      question:
        "Say the truest, scariest, most honest thing on your mind about us right now.",
      rare: true,
    },
    {
      id: "deep_191",
      category: "Letters",
      level: 4,
      question:
        "If you wrote me a letter to open in a hard moment, what's one line it would include?",
      followUp: "Actually say it, not just think it.",
    },
    {
      id: "deep_192",
      category: "Letters",
      level: 4,
      question:
        "What would the subject line be if you emailed future-you about today?",
      followUp: "Actually say it, not just think it.",
    },
    {
      id: "deep_193",
      category: "Letters",
      level: 4,
      question:
        "Say the first sentence of a letter thanking me for something specific.",
      followUp: "Actually say it, not just think it.",
    },
    {
      id: "deep_194",
      category: "Letters",
      level: 4,
      question:
        "What would you want me to know if you couldn't tell me in person?",
      followUp: "Actually say it, not just think it.",
      rare: true,
    },
    {
      id: "deep_195",
      category: "Letters",
      level: 4,
      question:
        "If you left me a note for tomorrow morning, what would it say?",
      followUp: "Actually say it, not just think it.",
    },
    {
      id: "deep_196",
      category: "Letters",
      level: 4,
      question:
        "What's a letter you never sent to someone, and what would it say?",
      followUp: "Actually say it, not just think it.",
    },
    {
      id: "deep_197",
      category: "Letters",
      level: 4,
      question:
        "Compose one sentence you'd want read at our anniversary every year.",
      followUp: "Actually say it, not just think it.",
    },
    {
      id: "deep_198",
      category: "Letters",
      level: 4,
      question:
        "What's something you'd only have the courage to say in writing?",
      followUp: "Actually say it, not just think it.",
    },
    {
      id: "deep_199",
      category: "Letters",
      level: 4,
      question:
        "If our relationship got one page in a book, what's the last line?",
      followUp: "Actually say it, not just think it.",
    },
    {
      id: "deep_200",
      category: "Letters",
      level: 4,
      question:
        "Write a two-line apology for something small you never actually apologized for.",
      followUp: "Actually say it, not just think it.",
    },
    {
      id: "deep_201",
      category: "Comfort",
      level: 1,
      question: "What does comfort look like to you after a hard day?",
    },
    {
      id: "deep_202",
      category: "Comfort",
      level: 1,
      question: "What is the smallest thing I do that makes you feel calmer?",
    },
    {
      id: "deep_203",
      category: "Comfort",
      level: 2,
      question:
        "When you're overwhelmed, do you want solutions or just my presence?",
    },
    {
      id: "deep_204",
      category: "Comfort",
      level: 2,
      question:
        "What's a place, real or imagined, where you feel completely safe with me?",
    },
    {
      id: "deep_205",
      category: "Comfort",
      level: 2,
      question: "What sound or silence helps you settle down the fastest?",
    },
    {
      id: "deep_206",
      category: "Comfort",
      level: 3,
      question:
        "What's something you never had to ask me for, because I just noticed you needed it?",
    },
    {
      id: "deep_207",
      category: "Comfort",
      level: 1,
      question: "Do you prefer a hug, a joke, or silence when you're upset?",
    },
    {
      id: "deep_208",
      category: "Comfort",
      level: 3,
      question:
        "What's the most comforted you've ever felt in your life, and was I there?",
    },
    {
      id: "deep_209",
      category: "Comfort",
      level: 2,
      question: "What's one thing I say that instantly makes you feel better?",
    },
    {
      id: "deep_210",
      category: "Comfort",
      level: 4,
      question:
        "What comfort do you wish you'd asked for as a kid that you can ask me for now?",
      followUp:
        "You don't have to answer fully — even sharing a little counts.",
      rare: true,
    },
    {
      id: "deep_211",
      category: "Gratitude",
      level: 1,
      question: "What's one ordinary Tuesday you're quietly grateful for?",
    },
    {
      id: "deep_212",
      category: "Gratitude",
      level: 1,
      question:
        "Name a small thing about our routine you'd genuinely miss if it disappeared.",
    },
    {
      id: "deep_213",
      category: "Gratitude",
      level: 2,
      question:
        "What's something hard you went through that you're grateful I saw you through?",
    },
    {
      id: "deep_214",
      category: "Gratitude",
      level: 1,
      question:
        "What part of your day am I usually not there for, that you wish I could see?",
    },
    {
      id: "deep_215",
      category: "Gratitude",
      level: 2,
      question:
        "What's a risk you took because you knew I'd support you either way?",
    },
    {
      id: "deep_216",
      category: "Gratitude",
      level: 1,
      question:
        "What is something about your life now that you don't take for granted anymore?",
    },
    {
      id: "deep_217",
      category: "Gratitude",
      level: 3,
      question:
        "What's a version of gratitude you feel for me that's hard to put into words?",
    },
    {
      id: "deep_218",
      category: "Gratitude",
      level: 1,
      question: "What's a habit of mine you didn't expect to be thankful for?",
    },
    {
      id: "deep_219",
      category: "Gratitude",
      level: 2,
      question:
        "When do you catch yourself feeling lucky about us, out of nowhere?",
    },
    {
      id: "deep_220",
      category: "Gratitude",
      level: 4,
      question:
        "Say three things about me you've never actually thanked me for.",
    },
    {
      id: "deep_221",
      category: "Home",
      level: 1,
      question:
        "What makes a place feel like 'home' to you when I'm not physically there?",
    },
    {
      id: "deep_222",
      category: "Home",
      level: 1,
      question: "What smell or sound instantly makes you think of home?",
    },
    {
      id: "deep_223",
      category: "Home",
      level: 2,
      question:
        "Do you feel more 'home' in silence with me, or in noise and activity?",
    },
    {
      id: "deep_224",
      category: "Home",
      level: 1,
      question:
        "What is one object that, if lost, would feel like losing a piece of us?",
    },
    {
      id: "deep_225",
      category: "Home",
      level: 2,
      question:
        "Have I ever felt like home to you before we even had a shared address?",
    },
    {
      id: "deep_226",
      category: "Home",
      level: 3,
      question:
        "What does it mean to you to build a home, versus just live in a house?",
    },
    {
      id: "deep_227",
      category: "Home",
      level: 1,
      question:
        "What's your favorite corner of wherever you live right now, and why?",
    },
    {
      id: "deep_228",
      category: "Home",
      level: 2,
      question:
        "What routine, however small, makes a place feel lived-in and ours?",
    },
    {
      id: "deep_229",
      category: "Home",
      level: 1,
      question:
        "If home were a feeling instead of a place, how would you describe it?",
    },
    {
      id: "deep_230",
      category: "Home",
      level: 3,
      question:
        "What's something from your childhood home you want to recreate in ours someday?",
    },
    {
      id: "deep_231",
      category: "Identity",
      level: 2,
      question: "What part of who you are today did you build because of us?",
    },
    {
      id: "deep_232",
      category: "Identity",
      level: 2,
      question:
        "What's something about yourself you understand better since being with me?",
    },
    {
      id: "deep_233",
      category: "Identity",
      level: 3,
      question:
        "What identity or role matters most to you outside of being my partner?",
    },
    {
      id: "deep_234",
      category: "Identity",
      level: 2,
      question: "How do you protect your individuality inside a relationship?",
    },
    {
      id: "deep_235",
      category: "Identity",
      level: 3,
      question:
        "What's a label you used to define yourself by that you've outgrown?",
    },
    {
      id: "deep_236",
      category: "Identity",
      level: 1,
      question:
        "What's something true about you that has nothing to do with me at all?",
    },
    {
      id: "deep_237",
      category: "Identity",
      level: 4,
      question: "What part of yourself are you still figuring out, even now?",
    },
    {
      id: "deep_238",
      category: "Identity",
      level: 2,
      question:
        "Do you feel more like yourself when you're alone, or when you're with me?",
    },
    {
      id: "deep_239",
      category: "Identity",
      level: 3,
      question: "What's a belief about yourself I helped you unlearn?",
    },
    {
      id: "deep_240",
      category: "Identity",
      level: 2,
      question:
        "If you introduced yourself with no job title and no relationship status, who are you?",
    },
    {
      id: "deep_241",
      category: "Milestones",
      level: 2,
      question: "What moment made you realize 'this is serious' between us?",
    },
    {
      id: "deep_242",
      category: "Milestones",
      level: 1,
      question:
        "What's a milestone of ours, big or small, that people would underestimate?",
    },
    {
      id: "deep_243",
      category: "Milestones",
      level: 2,
      question: "What milestone are you most looking forward to next?",
    },
    {
      id: "deep_244",
      category: "Milestones",
      level: 3,
      question: "Which milestone changed how you saw our future the most?",
    },
    {
      id: "deep_245",
      category: "Milestones",
      level: 1,
      question: "What's a 'first' with me you still remember in detail?",
    },
    {
      id: "deep_246",
      category: "Milestones",
      level: 2,
      question: "What milestone do you wish we'd celebrated more than we did?",
    },
    {
      id: "deep_247",
      category: "Milestones",
      level: 3,
      question:
        "What private milestone, one nobody else knows about, matters most to you?",
    },
    {
      id: "deep_248",
      category: "Milestones",
      level: 1,
      question:
        "What's a small 'we made it' moment we don't talk about enough?",
    },
    {
      id: "deep_249",
      category: "Milestones",
      level: 4,
      question:
        "What milestone still ahead of us scares you a little, in a good way?",
    },
    {
      id: "deep_250",
      category: "Milestones",
      level: 5,
      question: "Tell the full story of the moment you knew we'd last.",
      rare: true,
    },
    {
      id: "deep_251",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I remembered your coffee order or your schedule perfectly?",
    },
    {
      id: "deep_252",
      category: "This or That",
      level: 1,
      question: "Would you rather we texted all day or called once at night?",
    },
    {
      id: "deep_253",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I noticed when you're quiet or when you're loud?",
    },
    {
      id: "deep_254",
      category: "This or That",
      level: 1,
      question:
        "Would you rather we made big plans together or lived more day by day?",
    },
    {
      id: "deep_255",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I asked more questions or shared more of my own thoughts?",
    },
    {
      id: "deep_256",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I was the one who worries or the one who reassures?",
    },
    {
      id: "deep_257",
      category: "This or That",
      level: 1,
      question:
        "Would you rather we kept most things private or shared almost everything with friends?",
    },
    {
      id: "deep_258",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I planned surprises or asked you what you actually want?",
    },
    {
      id: "deep_259",
      category: "This or That",
      level: 1,
      question:
        "Would you rather our love be loud and obvious or quiet and steady?",
    },
    {
      id: "deep_260",
      category: "This or That",
      level: 1,
      question:
        "Would you rather I forgave quickly or took time to really process first?",
    },
    {
      id: "deep_261",
      category: "Speed Round",
      level: 1,
      question: "One word for how you feel right now, no thinking.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_262",
      category: "Speed Round",
      level: 1,
      question: "The last thing that surprised you, in five words or less.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_263",
      category: "Speed Round",
      level: 1,
      question: "Name a smell that instantly reminds you of me.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_264",
      category: "Speed Round",
      level: 1,
      question: "The first place you'd want to go, right now, no planning.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_265",
      category: "Speed Round",
      level: 1,
      question: "One thing you're proud of yourself for this week.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_266",
      category: "Speed Round",
      level: 1,
      question: "Say the first nickname for me that comes to mind.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_267",
      category: "Speed Round",
      level: 1,
      question: "The emoji that best describes today, no explanation.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_268",
      category: "Speed Round",
      level: 1,
      question: "One thing you want more of in your life right now.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_269",
      category: "Speed Round",
      level: 1,
      question: "First song lyric that pops into your head.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_270",
      category: "Speed Round",
      level: 1,
      question: "The truest compliment you can give me in three words.",
      followUp: "No overthinking — first answer only.",
    },
    {
      id: "deep_271",
      category: "Wildcard",
      level: 3,
      question:
        "Trade questions: ask me anything you've always wanted to know, right now.",
    },
    {
      id: "deep_272",
      category: "Wildcard",
      level: 3,
      question: "Describe today as if it were a chapter title in our story.",
    },
    {
      id: "deep_273",
      category: "Wildcard",
      level: 3,
      question:
        "Pick one word to ban from our vocabulary for the rest of the night, and why.",
    },
    {
      id: "deep_274",
      category: "Wildcard",
      level: 3,
      question: "Answer this question, but only using questions of your own.",
    },
    {
      id: "deep_275",
      category: "Wildcard",
      level: 4,
      question:
        "Say something true about us that you've never said out loud before.",
    },
    {
      id: "deep_276",
      category: "Wildcard",
      level: 3,
      question:
        "If tonight had a soundtrack, what's the one song that plays right now?",
    },
    {
      id: "deep_277",
      category: "Wildcard",
      level: 3,
      question:
        "Invent a new rule for our relationship, on the spot, and commit to it.",
    },
    {
      id: "deep_278",
      category: "Wildcard",
      level: 4,
      question:
        "Skip your turn and instead do something kind for me right now.",
    },
    {
      id: "deep_279",
      category: "Wildcard",
      level: 3,
      question:
        "Pick an object nearby and explain, honestly, what it says about our life together.",
    },
    {
      id: "deep_280",
      category: "Wildcard",
      level: 5,
      question:
        "Say the most honest thing on your mind right now, no matter how small.",
      rare: true,
    },
    {
      id: "deep_281",
      category: "Values",
      level: 2,
      question:
        "What value did your family raise you with that you now question?",
    },
    {
      id: "deep_282",
      category: "Values",
      level: 2,
      question:
        "What matters more to you in a hard decision: logic or feeling?",
    },
    {
      id: "deep_283",
      category: "Values",
      level: 3,
      question:
        "What's a value we don't share but you've come to respect in me anyway?",
    },
    {
      id: "deep_284",
      category: "Values",
      level: 2,
      question:
        "What do you think a relationship owes each person, at minimum?",
    },
    {
      id: "deep_285",
      category: "Values",
      level: 3,
      question: "What's something you'd never compromise on, even for me?",
    },
    {
      id: "deep_286",
      category: "Values",
      level: 2,
      question:
        "What does integrity look like in the small, unwatched moments?",
    },
    {
      id: "deep_287",
      category: "Values",
      level: 3,
      question: "What value do you hope we pass on if we ever raise a family?",
    },
    {
      id: "deep_288",
      category: "Values",
      level: 1,
      question:
        "What's a small act of kindness that says a lot about someone's character?",
    },
    {
      id: "deep_289",
      category: "Values",
      level: 3,
      question: "What does 'showing up' for someone really mean to you?",
    },
    {
      id: "deep_290",
      category: "Values",
      level: 2,
      question:
        "What's a value you've had to defend, even when it wasn't easy?",
    },
    {
      id: "deep_291",
      category: "Time",
      level: 2,
      question:
        "If you could freeze one hour with me forever, which one would it be?",
    },
    {
      id: "deep_292",
      category: "Time",
      level: 1,
      question:
        "Do you feel like time moves faster or slower when you're with me?",
    },
    {
      id: "deep_293",
      category: "Time",
      level: 3,
      question: "What's a moment you wish had lasted longer than it did?",
    },
    {
      id: "deep_294",
      category: "Time",
      level: 2,
      question: "What do you want us to make more time for this year?",
    },
    {
      id: "deep_295",
      category: "Time",
      level: 2,
      question:
        "If we could relive any single day together exactly as it happened, which one?",
    },
    {
      id: "deep_296",
      category: "Time",
      level: 3,
      question:
        "What's something you used to think we had plenty of time for, and now don't take for granted?",
    },
    {
      id: "deep_297",
      category: "Time",
      level: 1,
      question: "What time of day do you feel most connected to me?",
    },
    {
      id: "deep_298",
      category: "Time",
      level: 4,
      question:
        "If you had one more hour with the version of us from a year ago, what would you say?",
    },
    {
      id: "deep_299",
      category: "Time",
      level: 2,
      question:
        "What's a slow, uneventful memory of us that you wouldn't trade for anything?",
    },
    {
      id: "deep_300",
      category: "Time",
      level: 3,
      question:
        "How has your sense of 'the future' changed since we started counting time together?",
    },
  ],
  wyr: [
    {
      id: "wyr_001",
      category: "Funny",
      question:
        "Would you rather I sang out loud every time I was happy, or danced badly every time I was excited?",
      followUp: "Why?",
    },
    {
      id: "wyr_002",
      category: "Funny",
      question:
        "Would you rather share a toothbrush for a week or a pillow for a year?",
      followUp: "Why?",
    },
    {
      id: "wyr_003",
      category: "Funny",
      question:
        "Would you rather only communicate in memes for a day or only in voice notes?",
      followUp: "Why?",
    },
    {
      id: "wyr_004",
      category: "Funny",
      question: "Would you rather I had a chaotic laugh or a chaotic sneeze?",
      followUp: "Why?",
    },
    {
      id: "wyr_005",
      category: "Funny",
      question:
        "Would you rather be stuck in a karaoke booth with me for 3 hours or a silent library?",
      followUp: "Why?",
    },
    {
      id: "wyr_006",
      category: "Romantic",
      question:
        "Would you rather relive our first date forever, or fast-forward to our future wedding day?",
      followUp: "Why?",
    },
    {
      id: "wyr_007",
      category: "Romantic",
      question:
        "Would you rather get one long love letter a year, or one small sweet note every week?",
      followUp: "Why?",
    },
    {
      id: "wyr_008",
      category: "Romantic",
      question:
        "Would you rather surprise me with flowers or with a home-cooked meal?",
      followUp: "Why?",
    },
    {
      id: "wyr_009",
      category: "Romantic",
      question: "Would you rather watch the sunrise together or the sunset?",
      followUp: "Why?",
    },
    {
      id: "wyr_010",
      category: "Romantic",
      question:
        "Would you rather hold hands in public always, or save the biggest affection for private?",
      followUp: "Why?",
    },
    {
      id: "wyr_011",
      category: "Impossible Choices",
      question:
        "Would you rather never argue again but rarely talk deeply, or argue sometimes but always talk deeply?",
      followUp: "Why?",
    },
    {
      id: "wyr_012",
      category: "Impossible Choices",
      question:
        "Would you rather know every thought I have for a day, or have me know every thought you have?",
      followUp: "Why?",
    },
    {
      id: "wyr_013",
      category: "Impossible Choices",
      question:
        "Would you rather give up social media for a month or give up desserts for a month?",
      followUp: "Why?",
    },
    {
      id: "wyr_014",
      category: "Impossible Choices",
      question:
        "Would you rather always be 10 minutes early or always fashionably late together?",
      followUp: "Why?",
    },
    {
      id: "wyr_015",
      category: "Travel",
      question:
        "Would you rather spend a year traveling on a tiny budget, or take one perfect two-week trip with no budget?",
      followUp: "Why?",
    },
    {
      id: "wyr_016",
      category: "Travel",
      question:
        "Would you rather explore a big city together or a quiet beach town?",
      followUp: "Why?",
    },
    {
      id: "wyr_017",
      category: "Travel",
      question:
        "Would you rather backpack with one backpack each, or travel with oversized suitcases?",
      followUp: "Why?",
    },
    {
      id: "wyr_018",
      category: "Travel",
      question:
        "Would you rather visit the same favorite place every year, or a new country every year?",
      followUp: "Why?",
    },
    {
      id: "wyr_019",
      category: "Travel",
      question:
        "Would you rather get lost together on purpose, or plan every hour of a trip?",
      followUp: "Why?",
    },
    {
      id: "wyr_020",
      category: "Food",
      question:
        "Would you rather I cooked for you every night for a month, or you cooked for me?",
      followUp: "Why?",
    },
    {
      id: "wyr_021",
      category: "Food",
      question:
        "Would you rather only eat spicy food for a week or only bland food for a week?",
      followUp: "Why?",
    },
    {
      id: "wyr_022",
      category: "Food",
      question:
        "Would you rather share every meal from the same plate, or never share food again?",
      followUp: "Why?",
    },
    {
      id: "wyr_023",
      category: "Food",
      question:
        "Would you rather try a scary new restaurant or stick to our usual place?",
      followUp: "Why?",
    },
    {
      id: "wyr_024",
      category: "Lifestyle",
      question:
        "Would you rather we lived somewhere loud and exciting, or somewhere quiet and slow?",
      followUp: "Why?",
    },
    {
      id: "wyr_025",
      category: "Lifestyle",
      question: "Would you rather a tiny cozy apartment or a big empty house?",
      followUp: "Why?",
    },
    {
      id: "wyr_026",
      category: "Lifestyle",
      question: "Would you rather mornings together or late nights together?",
      followUp: "Why?",
    },
    {
      id: "wyr_027",
      category: "Lifestyle",
      question: "Would you rather a pet that is chaos or a pet that is calm?",
      followUp: "Why?",
    },
    {
      id: "wyr_028",
      category: "Relationship",
      question:
        "Would you rather I planned every date for a month, or you did?",
      followUp: "Why?",
    },
    {
      id: "wyr_029",
      category: "Relationship",
      question: "Would you rather more deep talks or more silly adventures?",
      followUp: "Why?",
    },
    {
      id: "wyr_030",
      category: "Relationship",
      question:
        "Would you rather solve problems immediately or take space first?",
      followUp: "Why?",
    },
    {
      id: "wyr_031",
      category: "Relationship",
      question:
        "Would you rather matchy outfits or completely different styles?",
      followUp: "Why?",
    },
    {
      id: "wyr_032",
      category: "Future",
      question:
        "Would you rather know exactly where we'll be in 10 years, or be surprised by it?",
      followUp: "Why?",
    },
    {
      id: "wyr_033",
      category: "Future",
      question:
        "Would you rather live near family or build our own little world far away?",
      followUp: "Why?",
    },
    {
      id: "wyr_034",
      category: "Future",
      question:
        "Would you rather save aggressively for a big goal or enjoy more small treats along the way?",
      followUp: "Why?",
    },
    {
      id: "wyr_035",
      category: "Embarrassing",
      question:
        "Would you rather I accidentally sent you my whole search history, or my entire camera roll?",
      followUp: "Why?",
    },
    {
      id: "wyr_036",
      category: "Embarrassing",
      question:
        "Would you rather trip in public together or have a loud stomach growl on a quiet date?",
      followUp: "Why?",
    },
    {
      id: "wyr_037",
      category: "Embarrassing",
      question:
        "Would you rather mispronounce a word confidently or forget someone's name mid-intro?",
      followUp: "Why?",
    },
    {
      id: "wyr_038",
      category: "Personality",
      question: "Would you rather I was too honest, or too nice?",
      followUp: "Why?",
    },
    {
      id: "wyr_039",
      category: "Personality",
      question:
        "Would you rather a partner who teases you or a partner who is always gentle?",
      followUp: "Why?",
    },
    {
      id: "wyr_040",
      category: "Personality",
      question:
        "Would you rather be the planner or the spontaneous one in our duo?",
      followUp: "Why?",
    },
    {
      id: "wyr_041",
      category: "Hypothetical",
      question:
        "Would you rather we could read each other's minds for a day, or swap bodies for a day?",
      followUp: "Why?",
    },
    {
      id: "wyr_042",
      category: "Hypothetical",
      question:
        "Would you rather pause time for a perfect hour together, or rewind one imperfect moment?",
      followUp: "Why?",
    },
    {
      id: "wyr_043",
      category: "Hypothetical",
      question:
        "Would you rather have a theme song that plays when we hug, or subtitles for our sarcasm?",
      followUp: "Why?",
    },
    {
      id: "wyr_044",
      category: "Choose Between Us",
      question:
        "Would you rather I remembered every important date perfectly, or always showed up early?",
      followUp: "Why?",
    },
    {
      id: "wyr_045",
      category: "Choose Between Us",
      question:
        "Would you rather give up your phone for a week, or give up alone time for a week — just to be around me more?",
      followUp: "Why?",
      rare: true,
    },
    {
      id: "wyr_046",
      category: "Choose Between Us",
      question:
        "Would you rather I pick the movie always, or you pick the restaurant always?",
      followUp: "Why?",
    },
    {
      id: "wyr_047",
      category: "Chaos",
      question:
        "Would you rather we got stuck in an elevator together for six hours, or on a long delayed flight together?",
      followUp: "Why?",
    },
    {
      id: "wyr_048",
      category: "Chaos",
      question:
        "Would you rather a power outage date night or a rainstorm that cancels all plans?",
      followUp: "Why?",
    },
    {
      id: "wyr_049",
      category: "Chaos",
      question:
        "Would you rather lose our keys together or our phones together for a day?",
      followUp: "Why?",
    },
    {
      id: "wyr_050",
      category: "Romantic",
      question:
        "Would you rather plan our next date together right now, or let me plan it as a surprise?",
      followUp: "If you pick 'plan it now' — actually do it before moving on.",
      rare: true,
    },
    {
      id: "wyr_051",
      category: "Funny",
      question:
        "Would you rather only speak in questions for an hour or only answer with song lyrics?",
      followUp: "Why?",
    },
    {
      id: "wyr_052",
      category: "Travel",
      question:
        "Would you rather road trip with no playlist or flight with no snacks?",
      followUp: "Why?",
    },
    {
      id: "wyr_053",
      category: "Food",
      question:
        "Would you rather brunch every weekend or late-night snacks every night?",
      followUp: "Why?",
    },
    {
      id: "wyr_054",
      category: "Lifestyle",
      question:
        "Would you rather a clean minimalist home or a cozy cluttered one?",
      followUp: "Why?",
    },
    {
      id: "wyr_055",
      category: "Relationship",
      question:
        "Would you rather more physical affection or more verbal affection?",
      followUp: "Why?",
    },
    {
      id: "wyr_056",
      category: "Future",
      question:
        "Would you rather a small intimate wedding or a big joyful party?",
      followUp: "Why?",
    },
    {
      id: "wyr_057",
      category: "Embarrassing",
      question:
        "Would you rather your partner see your childhood photos or your middle-school diary?",
      followUp: "Why?",
    },
    {
      id: "wyr_058",
      category: "Personality",
      question:
        "Would you rather be called out lovingly or comforted first when you're wrong?",
      followUp: "Why?",
    },
    {
      id: "wyr_059",
      category: "Hypothetical",
      question:
        "Would you rather share one dream every night or one secret every week?",
      followUp: "Why?",
    },
    {
      id: "wyr_060",
      category: "Choose Between Us",
      question: "Would you rather I learn your hobby or you learn mine?",
      followUp: "Why?",
    },
    {
      id: "wyr_061",
      category: "Chaos",
      question:
        "Would you rather cook a complicated recipe together or assemble furniture together?",
      followUp: "Why?",
    },
    {
      id: "wyr_062",
      category: "Funny",
      question:
        "Would you rather a partner who steals the blankets or steals the fries?",
      followUp: "Why?",
    },
    {
      id: "wyr_063",
      category: "Romantic",
      question:
        "Would you rather slow dance in the kitchen or kiss in the rain?",
      followUp: "Why?",
    },
    {
      id: "wyr_064",
      category: "Travel",
      question: "Would you rather mountains or ocean for our next getaway?",
      followUp: "Why?",
    },
    {
      id: "wyr_065",
      category: "Food",
      question:
        "Would you rather try every street food in a city or one fancy tasting menu?",
      followUp: "Why?",
    },
    {
      id: "wyr_066",
      category: "Lifestyle",
      question:
        "Would you rather work from home together or commute and meet after work?",
      followUp: "Why?",
    },
    {
      id: "wyr_067",
      category: "Relationship",
      question:
        "Would you rather weekly check-ins about feelings or only talk when needed?",
      followUp: "Why?",
    },
    {
      id: "wyr_068",
      category: "Future",
      question:
        "Would you rather adopt a rescue pet next year or wait until we're more settled?",
      followUp: "Why?",
    },
    {
      id: "wyr_069",
      category: "Embarrassing",
      question:
        "Would you rather your laugh is the loudest in the room or your sneeze?",
      followUp: "Why?",
    },
    {
      id: "wyr_070",
      category: "Personality",
      question:
        "Would you rather a competitive partner or a cooperative partner in games?",
      followUp: "Why?",
    },
    {
      id: "wyr_071",
      category: "Hypothetical",
      question:
        "Would you rather switch our morning routines for a week or our sleep schedules?",
      followUp: "Why?",
    },
    {
      id: "wyr_072",
      category: "Choose Between Us",
      question: "Would you rather I text first always or you do?",
      followUp: "Why?",
    },
    {
      id: "wyr_073",
      category: "Chaos",
      question: "Would you rather host a chaotic dinner party or attend one?",
      followUp: "Why?",
    },
    {
      id: "wyr_074",
      category: "Funny",
      question: "Would you rather only whisper for a day or only shout?",
      followUp: "Why?",
    },
    {
      id: "wyr_075",
      category: "Romantic",
      question:
        "Would you rather a handwritten letter or a voice message that goes on forever?",
      followUp: "Why?",
    },
    {
      id: "wyr_076",
      category: "Travel",
      question:
        "Would you rather one long layover with me or a short flight with turbulence?",
      followUp: "Why?",
    },
    {
      id: "wyr_077",
      category: "Food",
      question:
        "Would you rather never eat pizza again or never eat ice cream again?",
      followUp: "Why?",
    },
    {
      id: "wyr_078",
      category: "Lifestyle",
      question:
        "Would you rather a plant-filled apartment or a candle-filled apartment?",
      followUp: "Why?",
    },
    {
      id: "wyr_079",
      category: "Relationship",
      question: "Would you rather more date nights out or more cozy nights in?",
      followUp: "Why?",
    },
    {
      id: "wyr_080",
      category: "Future",
      question: "Would you rather buy a house first or travel the world first?",
      followUp: "Why?",
    },
    {
      id: "wyr_081",
      category: "Embarrassing",
      question:
        "Would you rather your partner narrate your life like a documentary for a day?",
      followUp: "Why?",
    },
    {
      id: "wyr_082",
      category: "Personality",
      question:
        "Would you rather someone who challenges your ideas or always agrees?",
      followUp: "Why?",
    },
    {
      id: "wyr_083",
      category: "Hypothetical",
      question:
        "Would you rather freeze one perfect day with me or skip one hard day?",
      followUp: "Why?",
    },
    {
      id: "wyr_084",
      category: "Choose Between Us",
      question: "Would you rather share a calendar or keep some plans private?",
      followUp: "Why?",
    },
    {
      id: "wyr_085",
      category: "Chaos",
      question:
        "Would you rather a surprise visit or a planned weekend together?",
      followUp: "Why?",
    },
    {
      id: "wyr_086",
      category: "Funny",
      question:
        "Would you rather our pet could talk for one day or our furniture could gossip?",
      followUp: "Why?",
    },
    {
      id: "wyr_087",
      category: "Romantic",
      question: "Would you rather match necklaces or matching playlists?",
      followUp: "Why?",
    },
    {
      id: "wyr_088",
      category: "Travel",
      question: "Would you rather sleep in a tent or a fancy hotel?",
      followUp: "Why?",
    },
    {
      id: "wyr_089",
      category: "Food",
      question:
        "Would you rather cook with no recipe or follow a recipe exactly?",
      followUp: "Why?",
    },
    {
      id: "wyr_090",
      category: "Lifestyle",
      question:
        "Would you rather no notifications on dates or no phones in the bedroom?",
      followUp: "Why?",
    },
    {
      id: "wyr_091",
      category: "Relationship",
      question:
        "Would you rather long good morning texts or long goodnight calls?",
      followUp: "Why?",
    },
    {
      id: "wyr_092",
      category: "Future",
      question: "Would you rather raise kids in a city or in the countryside?",
      followUp: "Why?",
    },
    {
      id: "wyr_093",
      category: "Impossible Choices",
      question:
        "Would you rather always win board games or always win arguments?",
      followUp: "Why?",
    },
    {
      id: "wyr_094",
      category: "Impossible Choices",
      question:
        "Would you rather be slightly bored together or constantly busy apart?",
      followUp: "Why?",
    },
    {
      id: "wyr_095",
      category: "Romantic",
      question:
        "Would you rather a slow long-distance chapter with deep talks, or a chaotic in-person week?",
      followUp: "Why?",
    },
    {
      id: "wyr_096",
      category: "Funny",
      question:
        "Would you rather I adopt your slang or you adopt mine forever?",
      followUp: "Why?",
    },
    {
      id: "wyr_097",
      category: "Chaos",
      question:
        "Would you rather a spontaneous road trip tonight or a carefully planned one next month?",
      followUp: "Why?",
    },
    {
      id: "wyr_098",
      category: "Choose Between Us",
      question:
        "Would you rather I always choose the music or always choose the photos we post?",
      followUp: "Why?",
    },
    {
      id: "wyr_099",
      category: "Hypothetical",
      question: "Would you rather a movie about our love story or a book?",
      followUp: "Why?",
    },
    {
      id: "wyr_100",
      category: "Future",
      question:
        "Would you rather grow old in one city or move every five years?",
      followUp: "Why?",
    },
    {
      id: "wyr_101",
      category: "Funny",
      question:
        "Would you rather I narrated our relationship like a nature documentary or a soap opera?",
      followUp: "Why?",
    },
    {
      id: "wyr_102",
      category: "Funny",
      question:
        "Would you rather I always won at rock-paper-scissors or always lost on purpose to make you happy?",
      followUp: "Why?",
    },
    {
      id: "wyr_103",
      category: "Funny",
      question:
        "Would you rather have a signature dance move or a signature catchphrase as a couple?",
      followUp: "Why?",
    },
    {
      id: "wyr_104",
      category: "Funny",
      question:
        "Would you rather I laughed at all your jokes, even bad ones, or was brutally honest about them?",
      followUp: "Why?",
    },
    {
      id: "wyr_105",
      category: "Funny",
      question:
        "Would you rather we had a couple's theme song that played every time we entered a room?",
      followUp: "Why?",
      rare: true,
    },
    {
      id: "wyr_106",
      category: "Funny",
      question:
        "Would you rather I texted in all lowercase forever or ALL CAPS forever?",
      followUp: "Why?",
    },
    {
      id: "wyr_107",
      category: "Funny",
      question: "Would you rather our future pet judged only me or only you?",
      followUp: "Why?",
    },
    {
      id: "wyr_108",
      category: "Funny",
      question: "Would you rather I mispronounced one word forever or you did?",
      followUp: "Why?",
    },
    {
      id: "wyr_109",
      category: "Funny",
      question:
        "Would you rather we had matching ringtones or matching typing sounds?",
      followUp: "Why?",
    },
    {
      id: "wyr_110",
      category: "Funny",
      question:
        "Would you rather I snorted when I laughed or you did, for the rest of our lives?",
      followUp: "Why?",
    },
    {
      id: "wyr_111",
      category: "Romantic",
      question:
        "Would you rather a candlelit dinner at home or a picnic under the stars?",
      followUp: "Why?",
    },
    {
      id: "wyr_112",
      category: "Romantic",
      question:
        "Would you rather I wrote you poetry or sang you a love song, badly?",
      followUp: "Why?",
    },
    {
      id: "wyr_113",
      category: "Romantic",
      question:
        "Would you rather we recreate our first kiss every anniversary or invent a new tradition each year?",
      followUp: "Why?",
    },
    {
      id: "wyr_114",
      category: "Romantic",
      question:
        "Would you rather a slow dance in the kitchen at midnight or a quiet walk at sunrise?",
      followUp: "Why?",
    },
    {
      id: "wyr_115",
      category: "Romantic",
      question:
        "Would you rather I surprised you with breakfast in bed or a spontaneous day trip?",
      followUp: "Why?",
    },
    {
      id: "wyr_116",
      category: "Romantic",
      question:
        "Would you rather we exchange love letters once a year or leave little notes constantly?",
      followUp: "Why?",
      rare: true,
    },
    {
      id: "wyr_117",
      category: "Romantic",
      question:
        "Would you rather a shared playlist that grows forever or one perfect mixtape?",
      followUp: "Why?",
    },
    {
      id: "wyr_118",
      category: "Romantic",
      question:
        "Would you rather we renew our vows every five years or never need to because nothing changes?",
      followUp: "Why?",
    },
    {
      id: "wyr_119",
      category: "Romantic",
      question:
        "Would you rather I remembered every anniversary perfectly or surprised you on random ordinary days?",
      followUp: "Why?",
    },
    {
      id: "wyr_120",
      category: "Romantic",
      question:
        "Would you rather a long slow hug every morning or a quick kiss every time we part?",
      followUp: "Why?",
    },
    {
      id: "wyr_121",
      category: "Travel",
      question:
        "Would you rather we get hopelessly lost in a beautiful city or arrive exactly on schedule to somewhere boring?",
      followUp: "Why?",
    },
    {
      id: "wyr_122",
      category: "Travel",
      question:
        "Would you rather road trip through deserts or through mountains?",
      followUp: "Why?",
    },
    {
      id: "wyr_123",
      category: "Travel",
      question:
        "Would you rather visit ten countries fast or live in one country slowly for a year?",
      followUp: "Why?",
    },
    {
      id: "wyr_124",
      category: "Travel",
      question:
        "Would you rather camp under real stars or glamp with all the comforts?",
      followUp: "Why?",
    },
    {
      id: "wyr_125",
      category: "Travel",
      question:
        "Would you rather I planned every detail of our trip or we wing it completely?",
      followUp: "Why?",
    },
    {
      id: "wyr_126",
      category: "Travel",
      question:
        'Would you rather learn to say "I love you" in every language we visit, or order food perfectly instead?',
      followUp: "Why?",
    },
    {
      id: "wyr_127",
      category: "Travel",
      question:
        "Would you rather a trip with zero phone signal or one with perfect wifi the whole time?",
      followUp: "Why?",
    },
    {
      id: "wyr_128",
      category: "Travel",
      question:
        "Would you rather explore ancient ruins together or dive a coral reef together?",
      followUp: "Why?",
    },
    {
      id: "wyr_129",
      category: "Travel",
      question:
        "Would you rather travel with a huge group of friends or completely alone, just us?",
      followUp: "Why?",
    },
    {
      id: "wyr_130",
      category: "Travel",
      question:
        "Would you rather a spontaneous overnight train or a slow scenic ferry?",
      followUp: "Why?",
    },
    {
      id: "wyr_131",
      category: "Food",
      question:
        "Would you rather cook a five-course meal together or order the weirdest thing on a menu and share it?",
      followUp: "Why?",
    },
    {
      id: "wyr_132",
      category: "Food",
      question:
        "Would you rather share dessert always or never share dessert again?",
      followUp: "Why?",
    },
    {
      id: "wyr_133",
      category: "Food",
      question:
        "Would you rather I made your coffee perfectly every morning or you made mine?",
      followUp: "Why?",
    },
    {
      id: "wyr_134",
      category: "Food",
      question:
        "Would you rather try a food neither of us has heard of or go back to our favorite comfort meal?",
      followUp: "Why?",
    },
    {
      id: "wyr_135",
      category: "Food",
      question:
        'Would you rather a "no phones at dinner" rule forever or a "dessert before dinner sometimes" rule?',
      followUp: "Why?",
    },
    {
      id: "wyr_136",
      category: "Food",
      question:
        "Would you rather cook disasters together and laugh about it, or always follow the recipe perfectly?",
      followUp: "Why?",
    },
    {
      id: "wyr_137",
      category: "Food",
      question:
        "Would you rather a home that always smells like fresh bread or always like fresh coffee?",
      followUp: "Why?",
    },
    {
      id: "wyr_138",
      category: "Food",
      question:
        "Would you rather eat street food from every stall or one incredible tasting menu?",
      followUp: "Why?",
    },
    {
      id: "wyr_139",
      category: "Food",
      question:
        "Would you rather breakfast for dinner every week or dinner for breakfast every week?",
      followUp: "Why?",
    },
    {
      id: "wyr_140",
      category: "Food",
      question:
        "Would you rather I remembered your order exactly, or you remembered mine?",
      followUp: "Why?",
    },
    {
      id: "wyr_141",
      category: "Lifestyle",
      question:
        "Would you rather a home full of books or a home full of plants?",
      followUp: "Why?",
    },
    {
      id: "wyr_142",
      category: "Lifestyle",
      question:
        "Would you rather live somewhere with four real seasons or somewhere warm all year?",
      followUp: "Why?",
    },
    {
      id: "wyr_143",
      category: "Lifestyle",
      question:
        "Would you rather wake up early together or stay up late together, permanently?",
      followUp: "Why?",
    },
    {
      id: "wyr_144",
      category: "Lifestyle",
      question:
        "Would you rather a minimalist life with less stuff or a cozy life with more?",
      followUp: "Why?",
    },
    {
      id: "wyr_145",
      category: "Lifestyle",
      question:
        "Would you rather a weekly game night or a weekly movie night, forever?",
      followUp: "Why?",
    },
    {
      id: "wyr_146",
      category: "Lifestyle",
      question:
        "Would you rather split chores strictly by category or trade off randomly?",
      followUp: "Why?",
    },
    {
      id: "wyr_147",
      category: "Lifestyle",
      question:
        "Would you rather a loud, social weekend every week or a quiet one every week?",
      followUp: "Why?",
    },
    {
      id: "wyr_148",
      category: "Lifestyle",
      question: "Would you rather live near the ocean or near mountains?",
      followUp: "Why?",
    },
    {
      id: "wyr_149",
      category: "Lifestyle",
      question:
        "Would you rather a home office each, or one shared creative space?",
      followUp: "Why?",
    },
    {
      id: "wyr_150",
      category: "Lifestyle",
      question:
        "Would you rather a Sunday routine that never changes, or one that's different every week?",
      followUp: "Why?",
    },
    {
      id: "wyr_151",
      category: "Relationship",
      question:
        "Would you rather never run out of things to talk about, or never run out of comfortable silence?",
      followUp: "Why?",
    },
    {
      id: "wyr_152",
      category: "Relationship",
      question:
        "Would you rather always know exactly how the other feels, or always be a little curious?",
      followUp: "Why?",
    },
    {
      id: "wyr_153",
      category: "Relationship",
      question:
        "Would you rather compliment each other daily, or save them for when they really count?",
      followUp: "Why?",
    },
    {
      id: "wyr_154",
      category: "Relationship",
      question:
        "Would you rather resolve fights the same night, or take a full day to think first?",
      followUp: "Why?",
    },
    {
      id: "wyr_155",
      category: "Relationship",
      question:
        "Would you rather a couple's therapist we check in with yearly, or handle everything ourselves?",
      followUp: "Why?",
    },
    {
      id: "wyr_156",
      category: "Relationship",
      question:
        "Would you rather be best friends who fell in love, or lovers who became best friends?",
      followUp: "Why?",
    },
    {
      id: "wyr_157",
      category: "Relationship",
      question:
        "Would you rather express love through big gestures or tiny daily ones?",
      followUp: "Why?",
    },
    {
      id: "wyr_158",
      category: "Relationship",
      question:
        "Would you rather I remembered the small details, or the big milestones better?",
      followUp: "Why?",
    },
    {
      id: "wyr_159",
      category: "Relationship",
      question:
        "Would you rather we grow at the exact same pace, or take turns leading?",
      followUp: "Why?",
    },
    {
      id: "wyr_160",
      category: "Relationship",
      question:
        "Would you rather a relationship with zero secrets, or one with a little mystery left?",
      followUp: "Why?",
    },
    {
      id: "wyr_161",
      category: "Future",
      question:
        "Would you rather retire early and modestly, or retire late but wealthy?",
      followUp: "Why?",
    },
    {
      id: "wyr_162",
      category: "Future",
      question:
        "Would you rather a wedding abroad, or a wedding at home with everyone we love?",
      followUp: "Why?",
    },
    {
      id: "wyr_163",
      category: "Future",
      question:
        "Would you rather one big family reunion a year, or small visits often?",
      followUp: "Why?",
    },
    {
      id: "wyr_164",
      category: "Future",
      question:
        "Would you rather our kids, if any, look more like you or act more like you?",
      followUp: "Why?",
    },
    {
      id: "wyr_165",
      category: "Future",
      question:
        "Would you rather build our dream home from scratch, or renovate an old one full of character?",
      followUp: "Why?",
    },
    {
      id: "wyr_166",
      category: "Future",
      question:
        "Would you rather one joint bank account for everything, or separate with shared bills only?",
      followUp: "Why?",
    },
    {
      id: "wyr_167",
      category: "Future",
      question:
        "Would you rather move for my dream job, or yours, if it ever came down to it?",
      followUp: "Why?",
    },
    {
      id: "wyr_168",
      category: "Future",
      question:
        "Would you rather grow old in the same house, or move somewhere new later?",
      followUp: "Why?",
    },
    {
      id: "wyr_169",
      category: "Future",
      question:
        "Would you rather leave a legacy through work, or through the family and love we build?",
      followUp: "Why?",
    },
    {
      id: "wyr_170",
      category: "Future",
      question:
        "Would you rather plan our future in five-year chunks, or take it one year at a time?",
      followUp: "Why?",
    },
    {
      id: "wyr_171",
      category: "Chaos",
      question:
        "Would you rather get snowed in together for a week with no wifi, or stuck at an airport for 24 hours?",
      followUp: "Why?",
    },
    {
      id: "wyr_172",
      category: "Chaos",
      question:
        "Would you rather our car break down in the middle of nowhere, or our flight get cancelled at 3am?",
      followUp: "Why?",
    },
    {
      id: "wyr_173",
      category: "Chaos",
      question:
        "Would you rather accidentally match outfits at a party, or show up to the wrong event together?",
      followUp: "Why?",
    },
    {
      id: "wyr_174",
      category: "Chaos",
      question:
        "Would you rather lose the wifi password forever, or lose the TV remote forever?",
      followUp: "Why?",
    },
    {
      id: "wyr_175",
      category: "Chaos",
      question:
        "Would you rather both forget an anniversary in the same year, or both remember it twice?",
      followUp: "Why?",
    },
    {
      id: "wyr_176",
      category: "Chaos",
      question:
        "Would you rather survive a blackout with candles and card games, or a heatwave with one fan?",
      followUp: "Why?",
    },
    {
      id: "wyr_177",
      category: "Chaos",
      question:
        "Would you rather get soaked in a surprise storm on a date, or freeze walking home from one?",
      followUp: "Why?",
    },
    {
      id: "wyr_178",
      category: "Chaos",
      question:
        "Would you rather both oversleep and miss something important, or both show up two hours early?",
      followUp: "Why?",
    },
    {
      id: "wyr_179",
      category: "Chaos",
      question:
        "Would you rather adopt a chaotic puppy together, or foster ten fish that all need names?",
      followUp: "Why?",
      rare: true,
    },
    {
      id: "wyr_180",
      category: "Chaos",
      question:
        "Would you rather deal with a flat tire on a road trip, or a dead phone battery on a hike?",
      followUp: "Why?",
    },
    {
      id: "wyr_181",
      category: "Nostalgia",
      question:
        "Would you rather relive the day we met exactly as it happened, or relive our best date so far?",
      followUp: "Why?",
    },
    {
      id: "wyr_182",
      category: "Nostalgia",
      question:
        "Would you rather rewatch our first year together like a movie, or skip to a highlight reel?",
      followUp: "Why?",
    },
    {
      id: "wyr_183",
      category: "Nostalgia",
      question:
        "Would you rather keep every old photo of us, or keep only the best ten forever?",
      followUp: "Why?",
    },
    {
      id: "wyr_184",
      category: "Nostalgia",
      question:
        "Would you rather remember every text we ever sent, or only the handwritten notes?",
      followUp: "Why?",
    },
    {
      id: "wyr_185",
      category: "Nostalgia",
      question:
        "Would you rather revisit our first date spot every year, or find a new one every year?",
      followUp: "Why?",
    },
    {
      id: "wyr_186",
      category: "Nostalgia",
      question:
        "Would you rather relive our worst fight to fix it perfectly, or leave it in the past untouched?",
      followUp: "Why?",
    },
    {
      id: "wyr_187",
      category: "Nostalgia",
      question:
        "Would you rather rewatch how nervous we both were at the start, or skip to how comfortable we are now?",
      followUp: "Why?",
    },
    {
      id: "wyr_188",
      category: "Nostalgia",
      question:
        "Would you rather keep the exact playlist from when we started dating, or update it every year?",
      followUp: "Why?",
    },
    {
      id: "wyr_189",
      category: "Nostalgia",
      question:
        "Would you rather remember my first-date outfit forever, or forget it and be surprised by old photos?",
      followUp: "Why?",
    },
    {
      id: "wyr_190",
      category: "Nostalgia",
      question:
        "Would you rather relive the moment you knew you loved me, or the moment I first said it back?",
      followUp: "Why?",
      rare: true,
    },
    {
      id: "wyr_191",
      category: "Pop Culture",
      question:
        "Would you rather our love story be a slow-burn indie film, or a big flashy musical?",
      followUp: "Why?",
    },
    {
      id: "wyr_192",
      category: "Pop Culture",
      question:
        "Would you rather I serenaded you badly in public, or wrote you a private song instead?",
      followUp: "Why?",
    },
    {
      id: "wyr_193",
      category: "Pop Culture",
      question:
        "Would you rather cosplay as our favorite fictional couple for a day, or invent our own?",
      followUp: "Why?",
    },
    {
      id: "wyr_194",
      category: "Pop Culture",
      question:
        "Would you rather binge an entire series in one weekend, or watch one episode a week for a year?",
      followUp: "Why?",
    },
    {
      id: "wyr_195",
      category: "Pop Culture",
      question:
        "Would you rather our relationship playlist be all one genre, or a chaotic mix of everything?",
      followUp: "Why?",
    },
    {
      id: "wyr_196",
      category: "Pop Culture",
      question: "Would you rather I quoted movies constantly, or you did?",
      followUp: "Why?",
    },
    {
      id: "wyr_197",
      category: "Pop Culture",
      question:
        "Would you rather a couple's karaoke duet we're actually good at, or hilariously bad at?",
      followUp: "Why?",
      rare: true,
    },
    {
      id: "wyr_198",
      category: "Pop Culture",
      question:
        "Would you rather live in a rom-com plot, or a low-key slice-of-life story?",
      followUp: "Why?",
    },
    {
      id: "wyr_199",
      category: "Pop Culture",
      question:
        "Would you rather I dressed as your favorite character for Halloween, or you dressed as mine?",
      followUp: "Why?",
    },
    {
      id: "wyr_200",
      category: "Pop Culture",
      question:
        "Would you rather our text notification be a movie quote, or a song lyric?",
      followUp: "Why?",
    },
    {
      id: "wyr_201",
      category: "Funny",
      question:
        "Would you rather I narrated our whole day like a nature documentary, or in a movie-trailer voice?",
      followUp: "Why?",
    },
    {
      id: "wyr_202",
      category: "Funny",
      question:
        "Would you rather I laughed at my own jokes before finishing them, or never laughed at yours?",
      followUp: "Why?",
    },
    {
      id: "wyr_203",
      category: "Funny",
      question:
        "Would you rather we had matching ridiculous hats, or matching ringtones?",
      followUp: "Why?",
    },
    {
      id: "wyr_204",
      category: "Funny",
      question:
        "Would you rather I hummed constantly and off-key, or talked to myself out loud?",
      followUp: "Why?",
    },
    {
      id: "wyr_205",
      category: "Funny",
      question:
        "Would you rather we had a secret handshake we use in public, or a code word for 'save me'?",
      followUp: "Why?",
    },
    {
      id: "wyr_206",
      category: "Romantic",
      question:
        "Would you rather I wrote you poetry badly, or sang to you badly?",
      followUp: "Why?",
    },
    {
      id: "wyr_207",
      category: "Romantic",
      question:
        "Would you rather a candlelit dinner at home, or a picnic under the stars?",
      followUp: "Why?",
    },
    {
      id: "wyr_208",
      category: "Romantic",
      question:
        "Would you rather I left little notes around the house, or sent sweet texts during the day?",
      followUp: "Why?",
    },
    {
      id: "wyr_209",
      category: "Romantic",
      question: "Would you rather slow dance in the kitchen, or in the rain?",
      followUp: "Why?",
    },
    {
      id: "wyr_210",
      category: "Romantic",
      question:
        "Would you rather I remembered every anniversary exactly, or surprised you on random ordinary days instead?",
      followUp: "Why?",
    },
    {
      id: "wyr_211",
      category: "Impossible Choices",
      question:
        "Would you rather lose all our photos or all our voice messages?",
      followUp: "Why?",
    },
    {
      id: "wyr_212",
      category: "Impossible Choices",
      question:
        "Would you rather only be able to hug or only be able to hold hands, forever?",
      followUp: "Why?",
    },
    {
      id: "wyr_213",
      category: "Impossible Choices",
      question:
        "Would you rather I always told the truth bluntly, or softened it every time?",
      followUp: "Why?",
    },
    {
      id: "wyr_214",
      category: "Impossible Choices",
      question:
        "Would you rather have unlimited time but less money, or unlimited money but less time?",
      followUp: "Why?",
    },
    {
      id: "wyr_215",
      category: "Travel",
      question:
        "Would you rather road-trip with no destination, or fly somewhere with a strict itinerary?",
      followUp: "Why?",
    },
    {
      id: "wyr_216",
      category: "Travel",
      question:
        "Would you rather camp in the mountains together, or stay in a fancy city hotel?",
      followUp: "Why?",
    },
    {
      id: "wyr_217",
      category: "Travel",
      question:
        "Would you rather we learned a new language together for a trip, or relied entirely on translation apps?",
      followUp: "Why?",
    },
    {
      id: "wyr_218",
      category: "Travel",
      question:
        "Would you rather visit ten countries in a month, or one country for a whole year?",
      followUp: "Why?",
    },
    {
      id: "wyr_219",
      category: "Food",
      question:
        "Would you rather cook an elaborate meal together every Sunday, or always order in on Sundays?",
      followUp: "Why?",
    },
    {
      id: "wyr_220",
      category: "Food",
      question:
        "Would you rather share dessert every time, or always get your own?",
      followUp: "Why?",
    },
    {
      id: "wyr_221",
      category: "Food",
      question:
        "Would you rather I criticized your cooking honestly, or lied and said it's perfect?",
      followUp: "Why?",
    },
    {
      id: "wyr_222",
      category: "Lifestyle",
      question:
        "Would you rather we lived minimally with few things, or surrounded by things that remind us of memories?",
      followUp: "Why?",
    },
    {
      id: "wyr_223",
      category: "Lifestyle",
      question:
        "Would you rather have a strict weekly routine together, or completely wing it every week?",
      followUp: "Why?",
    },
    {
      id: "wyr_224",
      category: "Lifestyle",
      question:
        "Would you rather we hosted friends often, or kept our home mostly just for us?",
      followUp: "Why?",
    },
    {
      id: "wyr_225",
      category: "Relationship",
      question:
        "Would you rather we never went to bed angry, or always took space to cool off first?",
      followUp: "Why?",
    },
    {
      id: "wyr_226",
      category: "Relationship",
      question:
        "Would you rather I initiated conversations about feelings, or you did?",
      followUp: "Why?",
    },
    {
      id: "wyr_227",
      category: "Relationship",
      question:
        "Would you rather have one big yearly vacation, or several small weekend trips?",
      followUp: "Why?",
    },
    {
      id: "wyr_228",
      category: "Relationship",
      question:
        "Would you rather we celebrated small wins constantly, or saved celebration for big milestones?",
      followUp: "Why?",
    },
    {
      id: "wyr_229",
      category: "Future",
      question:
        "Would you rather we settled down early, or explored freely before settling?",
      followUp: "Why?",
    },
    {
      id: "wyr_230",
      category: "Future",
      question:
        "Would you rather have a detailed 10-year plan, or figure it out as we go?",
      followUp: "Why?",
    },
    {
      id: "wyr_231",
      category: "Future",
      question:
        "Would you rather prioritize career growth or lifestyle flexibility in our next big decision?",
      followUp: "Why?",
    },
    {
      id: "wyr_232",
      category: "Embarrassing",
      question:
        "Would you rather I told an embarrassing story about you at a party, or you told one about me?",
      followUp: "Why?",
    },
    {
      id: "wyr_233",
      category: "Embarrassing",
      question:
        "Would you rather sing karaoke terribly in front of my family, or dance terribly in front of yours?",
      followUp: "Why?",
    },
    {
      id: "wyr_234",
      category: "Embarrassing",
      question:
        "Would you rather accidentally like an old photo of mine from years ago, or comment the wrong thing publicly?",
      followUp: "Why?",
    },
    {
      id: "wyr_235",
      category: "Personality",
      question: "Would you rather I was more spontaneous, or more reliable?",
      followUp: "Why?",
    },
    {
      id: "wyr_236",
      category: "Personality",
      question:
        "Would you rather a partner who challenges you daily, or one who keeps things calm and steady?",
      followUp: "Why?",
    },
    {
      id: "wyr_237",
      category: "Personality",
      question:
        "Would you rather I was more competitive, or more laid-back about winning and losing?",
      followUp: "Why?",
    },
    {
      id: "wyr_238",
      category: "Hypothetical",
      question:
        "Would you rather live one perfect year together and forget it, or remember an average one forever?",
      followUp: "Why?",
    },
    {
      id: "wyr_239",
      category: "Hypothetical",
      question:
        "Would you rather have a soundtrack that plays whenever you're falling for me, or one for when you're mad at me?",
      followUp: "Why?",
    },
    {
      id: "wyr_240",
      category: "Hypothetical",
      question:
        "Would you rather we could pause time only for us once a year, or rewind one mistake once a year?",
      followUp: "Why?",
    },
    {
      id: "wyr_241",
      category: "Choose Between Us",
      question: "Would you rather I always drove, or you always drove?",
      followUp: "Why?",
    },
    {
      id: "wyr_242",
      category: "Choose Between Us",
      question:
        "Would you rather I handled all the planning, or you handled all the planning?",
      followUp: "Why?",
    },
    {
      id: "wyr_243",
      category: "Choose Between Us",
      question:
        "Would you rather I always picked the music, or you always picked the music?",
      followUp: "Why?",
    },
    {
      id: "wyr_244",
      category: "Chaos",
      question:
        "Would you rather our apartment flooded a little, or our internet died for a week?",
      followUp: "Why?",
    },
    {
      id: "wyr_245",
      category: "Chaos",
      question:
        "Would you rather both get food poisoning before a big event, or both oversleep and miss it entirely?",
      followUp: "Why?",
    },
    {
      id: "wyr_246",
      category: "Chaos",
      question:
        "Would you rather get a flat tire far from home, or lock ourselves out at midnight?",
      followUp: "Why?",
    },
    {
      id: "wyr_247",
      category: "Nostalgia",
      question:
        "Would you rather relive our very last fight to end it better, or forget it happened at all?",
      followUp: "Why?",
    },
    {
      id: "wyr_248",
      category: "Nostalgia",
      question:
        "Would you rather keep the exact voice memo from our first 'I love you,' or the memory alone, unrecorded?",
      followUp: "Why?",
    },
    {
      id: "wyr_249",
      category: "Nostalgia",
      question:
        "Would you rather relive the nervous excitement before our first kiss, or the comfort of a thousandth one?",
      followUp: "Why?",
    },
    {
      id: "wyr_250",
      category: "Pop Culture",
      question:
        "Would you rather our love story get a tragic prestige-drama ending, or a cheesy happy one?",
      followUp: "Why?",
    },
    {
      id: "wyr_251",
      category: "Pop Culture",
      question:
        "Would you rather I quoted your favorite show constantly, or you quoted mine constantly?",
      followUp: "Why?",
    },
    {
      id: "wyr_252",
      category: "Pop Culture",
      question:
        "Would you rather we had a couple's theme song chosen by our friends, or one we picked ourselves?",
      followUp: "Why?",
    },
    {
      id: "wyr_253",
      category: "Career",
      question:
        "Would you rather I worked from home forever, or traveled constantly for work?",
      followUp: "Why?",
    },
    {
      id: "wyr_254",
      category: "Career",
      question:
        "Would you rather have more free time with less money, or more money with less free time?",
      followUp: "Why?",
    },
    {
      id: "wyr_255",
      category: "Career",
      question:
        "Would you rather we worked in the same field, or completely different ones?",
      followUp: "Why?",
    },
    {
      id: "wyr_256",
      category: "Career",
      question:
        "Would you rather I took a big career risk with your full support, or played it safe together?",
      followUp: "Why?",
    },
    {
      id: "wyr_257",
      category: "Weather",
      question:
        "Would you rather be stuck together in a heatwave with no AC, or a snowstorm with no heating?",
      followUp: "Why?",
    },
    {
      id: "wyr_258",
      category: "Weather",
      question:
        "Would you rather rainy days in together, or sunny days out together?",
      followUp: "Why?",
    },
    {
      id: "wyr_259",
      category: "Weather",
      question:
        "Would you rather chase storms for the thrill, or always seek out calm, clear skies?",
      followUp: "Why?",
    },
    {
      id: "wyr_260",
      category: "Technology",
      question:
        "Would you rather we deleted social media for a year, or never turned off notifications?",
      followUp: "Why?",
    },
    {
      id: "wyr_261",
      category: "Technology",
      question:
        "Would you rather text in full sentences always, or only in abbreviations and emojis?",
      followUp: "Why?",
    },
    {
      id: "wyr_262",
      category: "Technology",
      question:
        "Would you rather have a smart home that does everything, or keep everything old-fashioned and manual?",
      followUp: "Why?",
    },
    {
      id: "wyr_263",
      category: "Movies",
      question:
        "Would you rather rewatch our favorite movie every year on the same day, or always find something new?",
      followUp: "Why?",
    },
    {
      id: "wyr_264",
      category: "Movies",
      question:
        "Would you rather I cried at every sad movie, or never showed emotion during them?",
      followUp: "Why?",
    },
    {
      id: "wyr_265",
      category: "Movies",
      question:
        "Would you rather our life be adapted into a comedy, or a romantic drama?",
      followUp: "Why?",
    },
    {
      id: "wyr_266",
      category: "Sports",
      question:
        "Would you rather play on the same team, or be friendly rivals in a sport?",
      followUp: "Why?",
    },
    {
      id: "wyr_267",
      category: "Sports",
      question:
        "Would you rather I was your loudest cheerleader, or your calm, quiet support?",
      followUp: "Why?",
    },
    {
      id: "wyr_268",
      category: "Sports",
      question:
        "Would you rather train for a marathon together, or take up a chill hobby instead?",
      followUp: "Why?",
    },
    {
      id: "wyr_269",
      category: "Choose Between Us",
      question:
        "Would you rather I remembered your childhood stories perfectly, or your daily preferences perfectly?",
      followUp: "Why?",
    },
    {
      id: "wyr_270",
      category: "Impossible Choices",
      question:
        "Would you rather never fight again but grow apart slowly, or fight sometimes but stay close?",
      followUp: "Why?",
    },
    {
      id: "wyr_271",
      category: "Impossible Choices",
      question:
        "Would you rather I always agreed with you, or always gave an honest opinion even if different?",
      followUp: "Why?",
    },
    {
      id: "wyr_272",
      category: "Impossible Choices",
      question:
        "Would you rather live near the beach, or in the mountains, for the rest of our lives?",
      followUp: "Why?",
    },
    {
      id: "wyr_273",
      category: "Funny",
      question:
        "Would you rather I made up a ridiculous nickname for everyone we meet, or narrated our arguments like a sports commentator?",
      followUp: "Why?",
    },
    {
      id: "wyr_274",
      category: "Funny",
      question:
        "Would you rather I did an accent for a full day, or only spoke in movie quotes?",
      followUp: "Why?",
    },
    {
      id: "wyr_275",
      category: "Romantic",
      question:
        "Would you rather write our love story down for our kids to read someday, or keep it just between us?",
      followUp: "Why?",
    },
    {
      id: "wyr_276",
      category: "Romantic",
      question:
        "Would you rather one grand romantic gesture a year, or tiny ones every single day?",
      followUp: "Why?",
    },
    {
      id: "wyr_277",
      category: "Relationship",
      question:
        "Would you rather always know exactly how the other feels, or keep a little mystery?",
      followUp: "Why?",
    },
    {
      id: "wyr_278",
      category: "Relationship",
      question:
        "Would you rather resolve conflict with humor, or with a serious, direct conversation?",
      followUp: "Why?",
    },
    {
      id: "wyr_279",
      category: "Future",
      question:
        "Would you rather chase one big shared dream, or support each other's separate dreams?",
      followUp: "Why?",
    },
    {
      id: "wyr_280",
      category: "Future",
      question:
        "Would you rather have kids early, later, or leave it open entirely?",
      followUp: "Why?",
    },
    {
      id: "wyr_281",
      category: "Travel",
      question:
        "Would you rather explore your home country fully first, or go abroad right away?",
      followUp: "Why?",
    },
    {
      id: "wyr_282",
      category: "Travel",
      question:
        "Would you rather travel with a big group of friends, or always just the two of us?",
      followUp: "Why?",
    },
    {
      id: "wyr_283",
      category: "Food",
      question:
        "Would you rather give up coffee together, or give up sweets together?",
      followUp: "Why?",
    },
    {
      id: "wyr_284",
      category: "Food",
      question:
        "Would you rather learn to cook one cuisine perfectly, or a little of every cuisine?",
      followUp: "Why?",
    },
    {
      id: "wyr_285",
      category: "Lifestyle",
      question:
        "Would you rather live somewhere with four seasons, or somewhere warm all year?",
      followUp: "Why?",
    },
    {
      id: "wyr_286",
      category: "Lifestyle",
      question:
        "Would you rather early bedtimes and early mornings, or late nights and slow mornings, together?",
      followUp: "Why?",
    },
    {
      id: "wyr_287",
      category: "Personality",
      question:
        "Would you rather I was quieter in public and louder at home, or the opposite?",
      followUp: "Why?",
    },
    {
      id: "wyr_288",
      category: "Personality",
      question:
        "Would you rather a partner who over-explains, or one who under-explains?",
      followUp: "Why?",
    },
    {
      id: "wyr_289",
      category: "Embarrassing",
      question:
        "Would you rather I mixed up your family members' names at a gathering, or forgot an important date out loud?",
      followUp: "Why?",
    },
    {
      id: "wyr_290",
      category: "Hypothetical",
      question:
        "Would you rather switch lives for a day to understand each other better, or never know exactly what the other's day is like?",
      followUp: "Why?",
    },
    {
      id: "wyr_291",
      category: "Choose Between Us",
      question:
        "Would you rather I chose our vacations, or you chose our vacations, every time?",
      followUp: "Why?",
    },
    {
      id: "wyr_292",
      category: "Chaos",
      question:
        "Would you rather both lose your voice the day before something important, or both catch a cold on a trip?",
      followUp: "Why?",
    },
    {
      id: "wyr_293",
      category: "Nostalgia",
      question:
        "Would you rather remember every single detail of how we met, or only the feeling of it?",
      followUp: "Why?",
    },
    {
      id: "wyr_294",
      category: "Pop Culture",
      question:
        "Would you rather our relationship be turned into a reality show, or a documentary?",
      followUp: "Why?",
    },
    {
      id: "wyr_295",
      category: "Career",
      question:
        "Would you rather I brought work stress home sometimes, or never talked about work at all?",
      followUp: "Why?",
    },
    {
      id: "wyr_296",
      category: "Weather",
      question:
        "Would you rather a perfect sunny wedding, or a dramatic rainy one we'll never forget?",
      followUp: "Why?",
    },
    {
      id: "wyr_297",
      category: "Technology",
      question:
        "Would you rather I read every message the second it arrives, or take hours to reply sometimes?",
      followUp: "Why?",
    },
    {
      id: "wyr_298",
      category: "Movies",
      question:
        "Would you rather cry together at a sad film, or laugh together through the whole thing instead?",
      followUp: "Why?",
    },
    {
      id: "wyr_299",
      category: "Sports",
      question:
        "Would you rather we bonded over watching sports together, or bonded over something totally different?",
      followUp: "Why?",
    },
    {
      id: "wyr_300",
      category: "Impossible Choices",
      question:
        "Would you rather relive our happiest day on repeat, or keep discovering new happiest days?",
      followUp: "Why?",
    },
  ],
  flirty: [
    {
      id: "flirty_001",
      category: "Flirting",
      level: 1,
      question:
        "What is the first thing you find yourself noticing about me when I walk into a room?",
    },
    {
      id: "flirty_002",
      category: "Flirting",
      level: 1,
      question: "What is your favorite flirty text I've ever sent you?",
    },
    {
      id: "flirty_003",
      category: "Flirting",
      level: 1,
      question: "How do you flirt when you're trying not to be obvious?",
    },
    {
      id: "flirty_004",
      category: "Compliments",
      level: 1,
      question: "Give me a compliment you don't say often enough.",
    },
    {
      id: "flirty_005",
      category: "Compliments",
      level: 1,
      question:
        "What is a physical feature of mine you notice more than I think?",
    },
    {
      id: "flirty_006",
      category: "Compliments",
      level: 1,
      question: "Compliment my personality in the most specific way you can.",
    },
    {
      id: "flirty_007",
      category: "Attraction",
      level: 1,
      question:
        "What's a completely ordinary thing I do that you secretly find attractive?",
    },
    {
      id: "flirty_008",
      category: "Attraction",
      level: 1,
      question: "What outfit of mine is your soft spot?",
    },
    {
      id: "flirty_009",
      category: "Attraction",
      level: 1,
      question: "When do I look most 'like myself' to you?",
    },
    {
      id: "flirty_010",
      category: "Chemistry",
      level: 2,
      question: "When did you first feel real chemistry between us?",
    },
    {
      id: "flirty_011",
      category: "Chemistry",
      level: 2,
      question: "What instantly puts you in a flirty mood with me?",
    },
    {
      id: "flirty_012",
      category: "Chemistry",
      level: 2,
      question: "Describe our chemistry in three words.",
    },
    {
      id: "flirty_013",
      category: "Kissing",
      level: 2,
      question: "Describe your favorite kiss we've had, and why it stands out.",
    },
    {
      id: "flirty_014",
      category: "Kissing",
      level: 2,
      question: "Are you more of a slow kiss or a sudden kiss person?",
    },
    {
      id: "flirty_015",
      category: "Kissing",
      level: 2,
      question: "Where is your favorite place to be kissed?",
    },
    {
      id: "flirty_016",
      category: "Preferences",
      level: 2,
      question:
        "Do you prefer slow and teasing, or spontaneous and a little wild? Tell me why.",
    },
    {
      id: "flirty_017",
      category: "Preferences",
      level: 2,
      question: "What kind of attention from me makes you melt?",
    },
    {
      id: "flirty_018",
      category: "Preferences",
      level: 2,
      question: "Lights on or lights off — and what else matters to you?",
    },
    {
      id: "flirty_019",
      category: "Date Night",
      level: 2,
      question: "Plan our perfect flirty date night in three sentences.",
    },
    {
      id: "flirty_020",
      category: "Date Night",
      level: 2,
      question: "What would make a regular night feel more romantic?",
    },
    {
      id: "flirty_021",
      category: "Date Night",
      level: 2,
      question: "Pick a song for a private dance in the living room.",
    },
    {
      id: "flirty_022",
      category: "Confessions",
      level: 3,
      question:
        "What's something flirty you've thought about saying to me but haven't?",
    },
    {
      id: "flirty_023",
      category: "Confessions",
      level: 3,
      question: "What is a fantasy of closeness you've imagined with me?",
    },
    {
      id: "flirty_024",
      category: "Confessions",
      level: 3,
      question: "Tell me a secret about how you feel when we're apart.",
    },
    {
      id: "flirty_025",
      category: "Rate",
      level: 3,
      question:
        "On a scale of 1-10, how good am I at flirting with you — and what would make it a 10?",
    },
    {
      id: "flirty_026",
      category: "Rate",
      level: 3,
      question: "Rate our last reunion energy from 1-10 and explain.",
    },
    {
      id: "flirty_027",
      category: "Tell Me",
      level: 3,
      question: "Tell me one thing you find irresistible about me.",
    },
    {
      id: "flirty_028",
      category: "Tell Me",
      level: 3,
      question: "What do you miss most about my voice?",
    },
    {
      id: "flirty_029",
      category: "Tell Me",
      level: 3,
      question: "What do you want to hear me say more often?",
    },
    {
      id: "flirty_030",
      category: "Show Me",
      level: 3,
      question:
        "What's your favorite way to be greeted when we finally see each other again?",
    },
    {
      id: "flirty_031",
      category: "Show Me",
      level: 3,
      question: "How do you want me to touch your hand in public?",
    },
    {
      id: "flirty_032",
      category: "Show Me",
      level: 3,
      question:
        "Describe the ideal good-morning after sleeping in the same bed.",
    },
    {
      id: "flirty_033",
      category: "Romantic Scenarios",
      level: 4,
      question: "Describe, in detail, how you'd want our reunion to go.",
    },
    {
      id: "flirty_034",
      category: "Romantic Scenarios",
      level: 4,
      question:
        "If we had a hotel room with nowhere to be, how would the first hour go?",
    },
    {
      id: "flirty_035",
      category: "Romantic Scenarios",
      level: 4,
      question: "Write a short scene of us on a rainy night.",
    },
    {
      id: "flirty_036",
      category: "Chemistry",
      level: 4,
      question:
        "What's something that instantly puts you in the mood to be close to me?",
    },
    {
      id: "flirty_037",
      category: "Chemistry",
      level: 4,
      question: "What scent, sound, or look of mine gets to you?",
    },
    {
      id: "flirty_038",
      category: "Choose",
      level: 4,
      question:
        "Would you rather I whispered something sweet, or something bold, in your ear right now?",
    },
    {
      id: "flirty_039",
      category: "Choose",
      level: 4,
      question: "Would you rather a long teasing text thread or a sudden call?",
    },
    {
      id: "flirty_040",
      category: "After Dark",
      level: 5,
      question:
        "Tell me, honestly, what you miss most about being physically close to me.",
      rare: true,
    },
    {
      id: "flirty_041",
      category: "After Dark",
      level: 5,
      question: "Write a one-sentence love letter to me, right now.",
      rare: true,
    },
    {
      id: "flirty_042",
      category: "Playful Challenges",
      level: 5,
      question:
        "Send me the flirtiest voice message or text you can think of, before the night is over.",
      rare: true,
    },
    {
      id: "flirty_043",
      category: "Flirting",
      level: 2,
      question: "What nickname energy do you like — soft, silly, or bold?",
    },
    {
      id: "flirty_044",
      category: "Attraction",
      level: 2,
      question: "What is attractive about the way I talk?",
    },
    {
      id: "flirty_045",
      category: "Compliments",
      level: 2,
      question: "Compliment something I do, not something I am.",
    },
    {
      id: "flirty_046",
      category: "Kissing",
      level: 3,
      question: "What makes a kiss feel meaningful to you?",
    },
    {
      id: "flirty_047",
      category: "Preferences",
      level: 3,
      question:
        "What pace feels right for us when we're reunited after time apart?",
    },
    {
      id: "flirty_048",
      category: "Date Night",
      level: 3,
      question: "Invent a flirty scavenger hunt for us in one city block.",
    },
    {
      id: "flirty_049",
      category: "Confessions",
      level: 4,
      question: "What is something tender you've never admitted out loud?",
    },
    {
      id: "flirty_050",
      category: "Tell Me",
      level: 4,
      question: "Tell me how you want to be desired.",
    },
    {
      id: "flirty_051",
      category: "Show Me",
      level: 4,
      question: "What is a small gesture that feels intimate to you?",
    },
    {
      id: "flirty_052",
      category: "Romantic Scenarios",
      level: 3,
      question: "Describe a perfect lazy Sunday morning together.",
    },
    {
      id: "flirty_053",
      category: "Chemistry",
      level: 3,
      question: "When do you feel the spark most — texts, calls, or in person?",
    },
    {
      id: "flirty_054",
      category: "Flirting",
      level: 3,
      question: "What is your favorite way I tease you?",
    },
    {
      id: "flirty_055",
      category: "Attraction",
      level: 3,
      question: "What is sexy about kindness to you?",
    },
    {
      id: "flirty_056",
      category: "Compliments",
      level: 3,
      question: "Say something flattering about my mind.",
    },
    {
      id: "flirty_057",
      category: "After Dark",
      level: 4,
      question: "What boundaries matter to you when things get more intimate?",
    },
    {
      id: "flirty_058",
      category: "After Dark",
      level: 3,
      question: "What helps you feel safe and open with me?",
    },
    {
      id: "flirty_059",
      category: "Playful Challenges",
      level: 3,
      question: "Challenge me to something flirty I can do today.",
    },
    {
      id: "flirty_060",
      category: "Choose",
      level: 3,
      question: "Would you rather slow music or silence when we're close?",
    },
    {
      id: "flirty_061",
      category: "Date Night",
      level: 1,
      question:
        "Where should we go that feels a little more special than usual?",
    },
    {
      id: "flirty_062",
      category: "Flirting",
      level: 1,
      question: "What emoji feels like 'us' when we're being flirty?",
    },
    {
      id: "flirty_063",
      category: "Attraction",
      level: 1,
      question: "What is cute about me that I probably underrate?",
    },
    {
      id: "flirty_064",
      category: "Kissing",
      level: 1,
      question: "Forehead kiss or hand kiss — pick and defend.",
    },
    {
      id: "flirty_065",
      category: "Preferences",
      level: 1,
      question: "Big hug first or kiss first when we meet?",
    },
    {
      id: "flirty_066",
      category: "Confessions",
      level: 2,
      question: "Have you ever rehearsed something sweet before saying it?",
    },
    {
      id: "flirty_067",
      category: "Tell Me",
      level: 2,
      question: "What do you notice about my eyes?",
    },
    {
      id: "flirty_068",
      category: "Show Me",
      level: 2,
      question: "How do you like to sit next to me on a couch?",
    },
    {
      id: "flirty_069",
      category: "Romantic Scenarios",
      level: 2,
      question: "Describe us cooking dinner while flirting the whole time.",
    },
    {
      id: "flirty_070",
      category: "Chemistry",
      level: 1,
      question: "What song feels like our chemistry?",
    },
    {
      id: "flirty_071",
      category: "After Dark",
      level: 2,
      question: "What is a soft limit you want me to know?",
    },
    {
      id: "flirty_072",
      category: "Playful Challenges",
      level: 2,
      question: "Dare me to say something bold in our next call.",
    },
    {
      id: "flirty_073",
      category: "Choose",
      level: 2,
      question: "Would you rather matching pajamas or a dressy date?",
    },
    {
      id: "flirty_074",
      category: "Flirting",
      level: 4,
      question:
        "How do you want me to flirt when we're around friends without being obvious?",
    },
    {
      id: "flirty_075",
      category: "Attraction",
      level: 4,
      question: "What is something about my body language you like?",
    },
    {
      id: "flirty_076",
      category: "Compliments",
      level: 4,
      question: "Give me a compliment you'd only say when we're alone.",
    },
    {
      id: "flirty_077",
      category: "Kissing",
      level: 4,
      question: "Describe a kiss you've imagined but we haven't had yet.",
    },
    {
      id: "flirty_078",
      category: "Preferences",
      level: 4,
      question:
        "What kind of aftercare or closeness do you want after intense moments?",
    },
    {
      id: "flirty_079",
      category: "Date Night",
      level: 4,
      question: "Plan a night that starts sweet and ends a little daring.",
    },
    {
      id: "flirty_080",
      category: "Confessions",
      level: 5,
      question: "Confess a crush-on-you moment from early on.",
      rare: true,
    },
    {
      id: "flirty_081",
      category: "Tell Me",
      level: 5,
      question: "Tell me exactly how you want me to miss you.",
      rare: true,
    },
    {
      id: "flirty_082",
      category: "Show Me",
      level: 5,
      question: "Act out (or describe) how you'd pull me closer.",
      rare: true,
    },
    {
      id: "flirty_083",
      category: "Romantic Scenarios",
      level: 5,
      question: "Narrate the next time we close a door behind us.",
      rare: true,
    },
    {
      id: "flirty_084",
      category: "Chemistry",
      level: 5,
      question: "What makes our connection feel unique compared to past ones?",
      rare: true,
    },
    {
      id: "flirty_085",
      category: "After Dark",
      level: 1,
      question: "What is a soft, non-physical thing that still feels intimate?",
    },
    {
      id: "flirty_086",
      category: "Playful Challenges",
      level: 1,
      question: "Send a flirty emoji only you would understand.",
    },
    {
      id: "flirty_087",
      category: "Choose",
      level: 1,
      question: "Would you rather candles or fairy lights?",
    },
    {
      id: "flirty_088",
      category: "Flirting",
      level: 5,
      question: "Flirt with me for 30 seconds without stopping.",
      rare: true,
    },
    {
      id: "flirty_089",
      category: "Attraction",
      level: 5,
      question: "List five things that attract you to me, fast.",
      rare: true,
    },
    {
      id: "flirty_090",
      category: "Compliments",
      level: 5,
      question: "Write a cheesy pickup line about me — then a sincere one.",
      rare: true,
    },
    {
      id: "flirty_091",
      category: "Date Night",
      level: 5,
      question: "Book (or pretend to book) our next flirty plan out loud.",
      rare: true,
    },
    {
      id: "flirty_092",
      category: "Confessions",
      level: 1,
      question: "What's a small crush detail you noticed this week?",
    },
    {
      id: "flirty_093",
      category: "Tell Me",
      level: 1,
      question: "What should I text you right now to make you smile?",
    },
    {
      id: "flirty_094",
      category: "Show Me",
      level: 1,
      question: "How do you want goodnight to feel when we're apart?",
    },
    {
      id: "flirty_095",
      category: "Romantic Scenarios",
      level: 1,
      question: "Describe us sharing headphones on public transit.",
    },
    {
      id: "flirty_096",
      category: "Chemistry",
      level: 1,
      question: "When did a simple 'hi' from me feel different?",
    },
    {
      id: "flirty_097",
      category: "Preferences",
      level: 5,
      question:
        "Tell me your honest preference about pace and pressure — no guessing.",
      rare: true,
    },
    {
      id: "flirty_098",
      category: "Kissing",
      level: 5,
      question: "Guide me: how do you like to be kissed when you've missed me?",
      rare: true,
    },
    {
      id: "flirty_099",
      category: "After Dark",
      level: 5,
      question: "Share one desire and one boundary in the same breath.",
      rare: true,
    },
    {
      id: "flirty_100",
      category: "Playful Challenges",
      level: 4,
      question: "Create a secret code word that means 'come closer'.",
    },
    {
      id: "flirty_101",
      category: "Flirting",
      level: 1,
      question: "What's a flirty habit of mine you wish I did more often?",
    },
    {
      id: "flirty_102",
      category: "Flirting",
      level: 1,
      question:
        "If you had to flirt with me using only your eyes across a room, how would you do it?",
    },
    {
      id: "flirty_103",
      category: "Flirting",
      level: 1,
      question: "What's the boldest way you've ever flirted with me?",
    },
    {
      id: "flirty_104",
      category: "Flirting",
      level: 1,
      question: "What flirty move works on you every single time?",
    },
    {
      id: "flirty_105",
      category: "Flirting",
      level: 1,
      question:
        "How would you flirt with me if we were meeting for the very first time again?",
    },
    {
      id: "flirty_106",
      category: "Flirting",
      level: 1,
      question: "What's a flirty text you've drafted but never sent?",
    },
    {
      id: "flirty_107",
      category: "Flirting",
      level: 1,
      question:
        "What's the difference between how you flirt in public versus in private?",
    },
    {
      id: "flirty_108",
      category: "Compliments",
      level: 1,
      question: "Compliment the way I say your name.",
    },
    {
      id: "flirty_109",
      category: "Compliments",
      level: 1,
      question:
        "What's a compliment about me you think I don't believe enough?",
    },
    {
      id: "flirty_110",
      category: "Compliments",
      level: 1,
      question:
        "Tell me something about my hands, my laugh, or my walk that you love.",
    },
    {
      id: "flirty_111",
      category: "Compliments",
      level: 1,
      question: "What compliment would surprise me the most right now?",
    },
    {
      id: "flirty_112",
      category: "Compliments",
      level: 1,
      question:
        "Say something flattering about how I make you feel, not just how I look.",
    },
    {
      id: "flirty_113",
      category: "Compliments",
      level: 1,
      question:
        "What's the most honest compliment you can give me in ten seconds?",
    },
    {
      id: "flirty_114",
      category: "Compliments",
      level: 1,
      question:
        "What do you compliment me on to other people when I'm not around?",
    },
    {
      id: "flirty_115",
      category: "Attraction",
      level: 2,
      question:
        "What's an unexpected thing about me that you find irresistibly attractive?",
    },
    {
      id: "flirty_116",
      category: "Attraction",
      level: 2,
      question:
        "When am I most attractive to you — dressed up, or completely relaxed at home?",
    },
    {
      id: "flirty_117",
      category: "Attraction",
      level: 2,
      question: "What's a sound I make that you find surprisingly attractive?",
    },
    {
      id: "flirty_118",
      category: "Attraction",
      level: 2,
      question:
        "What's something I do without thinking that pulls you in every time?",
    },
    {
      id: "flirty_119",
      category: "Attraction",
      level: 2,
      question:
        "Describe the moment you realize, mid-conversation, that you're really into me.",
    },
    {
      id: "flirty_120",
      category: "Attraction",
      level: 2,
      question: "What's an attraction you didn't expect to develop over time?",
    },
    {
      id: "flirty_121",
      category: "Attraction",
      level: 2,
      question:
        "What's the most attractive thing about the way I treat other people?",
    },
    {
      id: "flirty_122",
      category: "Chemistry",
      level: 2,
      question:
        "What's a look we give each other that says everything without words?",
    },
    {
      id: "flirty_123",
      category: "Chemistry",
      level: 2,
      question: "Describe the feeling of the room changing when we lock eyes.",
    },
    {
      id: "flirty_124",
      category: "Chemistry",
      level: 2,
      question:
        "What's a moment lately where our chemistry surprised even you?",
    },
    {
      id: "flirty_125",
      category: "Chemistry",
      level: 2,
      question: "How do you know, physically, when the mood between us shifts?",
    },
    {
      id: "flirty_126",
      category: "Chemistry",
      level: 2,
      question:
        "What's a color, scent, or song that instantly brings our chemistry to mind?",
    },
    {
      id: "flirty_127",
      category: "Chemistry",
      level: 2,
      question: "What happens in your body when I walk into the room?",
    },
    {
      id: "flirty_128",
      category: "Chemistry",
      level: 2,
      question:
        "Describe our chemistry as if it were the opening line of a novel.",
    },
    {
      id: "flirty_129",
      category: "Kissing",
      level: 2,
      question:
        "Slow and lingering or quick and playful — what's your mood tonight?",
    },
    {
      id: "flirty_130",
      category: "Kissing",
      level: 2,
      question: "What's the kiss you think about most when we're apart?",
    },
    {
      id: "flirty_131",
      category: "Kissing",
      level: 2,
      question: "Where on my face or neck do you love kissing most?",
    },
    {
      id: "flirty_132",
      category: "Kissing",
      level: 2,
      question:
        'Describe the perfect "hello" kiss versus the perfect "goodbye" kiss.',
    },
    {
      id: "flirty_133",
      category: "Kissing",
      level: 2,
      question: "What's a kiss we haven't had yet that you'd love to?",
    },
    {
      id: "flirty_134",
      category: "Kissing",
      level: 2,
      question: "How do you want to be kissed when you've had a hard day?",
    },
    {
      id: "flirty_135",
      category: "Kissing",
      level: 2,
      question: "What's the most unexpected place we've ever kissed?",
    },
    {
      id: "flirty_136",
      category: "After Dark",
      level: 4,
      question:
        "What's a boundary you want to reaffirm, even if we've talked about it before?",
      rare: true,
    },
    {
      id: "flirty_137",
      category: "After Dark",
      level: 4,
      question: "What helps you feel most desired by me?",
    },
    {
      id: "flirty_138",
      category: "After Dark",
      level: 4,
      question:
        "What's something intimate that has nothing to do with physical touch?",
    },
    {
      id: "flirty_139",
      category: "After Dark",
      level: 4,
      question:
        "What pace feels right for us tonight — slow, playful, or intense?",
      rare: true,
    },
    {
      id: "flirty_140",
      category: "After Dark",
      level: 4,
      question:
        "What word or signal could we use to check in with each other in the moment?",
    },
    {
      id: "flirty_141",
      category: "After Dark",
      level: 4,
      question: "What does feeling safe with me, physically, look like to you?",
    },
    {
      id: "flirty_142",
      category: "After Dark",
      level: 4,
      question:
        "What's something you want more of from me after dark — attention, patience, or playfulness?",
    },
    {
      id: "flirty_143",
      category: "Playful Challenges",
      level: 2,
      question:
        "Send me one flirty word, right now, and make me guess what you mean by it.",
    },
    {
      id: "flirty_144",
      category: "Playful Challenges",
      level: 2,
      question: "Dare me to whisper something to you before this game is over.",
    },
    {
      id: "flirty_145",
      category: "Playful Challenges",
      level: 2,
      question: "Give me thirty seconds to convince you to kiss me — go.",
      rare: true,
    },
    {
      id: "flirty_146",
      category: "Playful Challenges",
      level: 2,
      question: "Come up with a flirty nickname for me on the spot.",
    },
    {
      id: "flirty_147",
      category: "Playful Challenges",
      level: 2,
      question:
        "Challenge me to guess what you're thinking just from your face right now.",
    },
    {
      id: "flirty_148",
      category: "Playful Challenges",
      level: 2,
      question:
        "Dare me to slow dance with you to whatever song is stuck in your head.",
    },
    {
      id: "flirty_149",
      category: "Playful Challenges",
      level: 2,
      question:
        "Make up a flirty rule for the rest of tonight and I have to follow it.",
    },
    {
      id: "flirty_150",
      category: "Choose",
      level: 2,
      question: "Would you rather I whispered it or wrote it down?",
    },
    {
      id: "flirty_151",
      category: "Choose",
      level: 2,
      question:
        "Would you rather a slow build-up all evening, or straight to the point?",
    },
    {
      id: "flirty_152",
      category: "Choose",
      level: 2,
      question: "Would you rather soft lighting or total darkness?",
    },
    {
      id: "flirty_153",
      category: "Choose",
      level: 2,
      question: "Would you rather I initiated tonight, or you did?",
    },
    {
      id: "flirty_154",
      category: "Choose",
      level: 2,
      question:
        "Would you rather a long lingering hug, or a quick surprising kiss right now?",
    },
    {
      id: "flirty_155",
      category: "Choose",
      level: 2,
      question:
        "Would you rather music playing softly, or complete silence between us?",
    },
    {
      id: "flirty_156",
      category: "Choose",
      level: 2,
      question: "Would you rather I told you what I want, or showed you?",
    },
    {
      id: "flirty_157",
      category: "Date Night",
      level: 2,
      question:
        'Plan a "just the two of us" evening that starts ordinary and turns romantic.',
    },
    {
      id: "flirty_158",
      category: "Date Night",
      level: 2,
      question: "What's a date idea you've been too shy to suggest?",
    },
    {
      id: "flirty_159",
      category: "Date Night",
      level: 2,
      question: "Describe the perfect ending to tonight, step by step.",
    },
    {
      id: "flirty_160",
      category: "Date Night",
      level: 2,
      question: "What outfit do you want me in for our next date night?",
    },
    {
      id: "flirty_161",
      category: "Date Night",
      level: 2,
      question:
        "What's one thing you want to try on a date that we haven't yet?",
    },
    {
      id: "flirty_162",
      category: "Date Night",
      level: 2,
      question: "If tonight had a theme, what would it be?",
    },
    {
      id: "flirty_163",
      category: "Date Night",
      level: 2,
      question:
        'Describe the version of "staying in" that feels most romantic to you.',
    },
    {
      id: "flirty_164",
      category: "Confessions",
      level: 3,
      question:
        "Confess something you find yourself thinking about more than you'd admit.",
    },
    {
      id: "flirty_165",
      category: "Confessions",
      level: 3,
      question: "What's a moment recently you wished I could read your mind?",
    },
    {
      id: "flirty_166",
      category: "Confessions",
      level: 3,
      question: "Confess the last time you got a little jealous, even briefly.",
      rare: true,
    },
    {
      id: "flirty_167",
      category: "Confessions",
      level: 3,
      question: "What's something you've wanted to ask for but haven't?",
    },
    {
      id: "flirty_168",
      category: "Confessions",
      level: 3,
      question: "Confess a daydream you've had about us this week.",
      rare: true,
    },
    {
      id: "flirty_169",
      category: "Confessions",
      level: 3,
      question:
        "What's the boldest thought you've had about me and kept to yourself?",
    },
    {
      id: "flirty_170",
      category: "Confessions",
      level: 3,
      question:
        "Confess something you find charming about yourself when you're around me.",
    },
    {
      id: "flirty_171",
      category: "Tell Me",
      level: 3,
      question: "Tell me exactly what makes you feel wanted.",
    },
    {
      id: "flirty_172",
      category: "Tell Me",
      level: 3,
      question:
        "Tell me what you need to hear before things get more intimate.",
    },
    {
      id: "flirty_173",
      category: "Tell Me",
      level: 3,
      question: "Tell me one thing you want me to notice about you tonight.",
    },
    {
      id: "flirty_174",
      category: "Tell Me",
      level: 3,
      question:
        "Tell me how you want to be touched when words feel like too much.",
      rare: true,
    },
    {
      id: "flirty_175",
      category: "Tell Me",
      level: 3,
      question: 'Tell me what "in the mood" actually feels like for you.',
    },
    {
      id: "flirty_176",
      category: "Tell Me",
      level: 3,
      question:
        "Tell me the difference between how you want comfort versus how you want passion.",
    },
    {
      id: "flirty_177",
      category: "Tell Me",
      level: 3,
      question: "Tell me something you want me to ask you more often.",
    },
    {
      id: "flirty_178",
      category: "Show Me",
      level: 3,
      question: "Show me your favorite way to be held.",
    },
    {
      id: "flirty_179",
      category: "Show Me",
      level: 3,
      question: "Show me the look you give me when you're feeling flirty.",
    },
    {
      id: "flirty_180",
      category: "Show Me",
      level: 3,
      question: "Show me how you'd get my attention across a crowded room.",
    },
    {
      id: "flirty_181",
      category: "Show Me",
      level: 3,
      question: 'Show me your best "come here" without saying a word.',
    },
    {
      id: "flirty_182",
      category: "Show Me",
      level: 3,
      question: "Show me the face you make right before you kiss me.",
      rare: true,
    },
    {
      id: "flirty_183",
      category: "Show Me",
      level: 3,
      question:
        'Show me how close is "too close" and how close is "just right."',
    },
    {
      id: "flirty_184",
      category: "Show Me",
      level: 3,
      question:
        "Show me one thing your hands do when you're nervous around me.",
    },
    {
      id: "flirty_185",
      category: "Preferences",
      level: 2,
      question:
        "Do you prefer slow mornings together, or spontaneous middle-of-the-day moments?",
    },
    {
      id: "flirty_186",
      category: "Preferences",
      level: 2,
      question:
        "What's your ideal balance between playful teasing and sincere affection?",
    },
    {
      id: "flirty_187",
      category: "Preferences",
      level: 2,
      question: "Do you prefer being pursued, or being the one who pursues?",
    },
    {
      id: "flirty_188",
      category: "Preferences",
      level: 2,
      question:
        "What's more you: candlelight and music, or comfortable pajamas and honesty?",
    },
    {
      id: "flirty_189",
      category: "Preferences",
      level: 2,
      question:
        "Do you prefer affection in public, in private, or an even mix?",
    },
    {
      id: "flirty_190",
      category: "Preferences",
      level: 2,
      question:
        "What's your preferred way to be reassured when you feel insecure, intimately?",
      rare: true,
    },
    {
      id: "flirty_191",
      category: "Preferences",
      level: 2,
      question:
        "Do you prefer surprises in the moment, or a little advance warning?",
    },
    {
      id: "flirty_192",
      category: "Romantic Scenarios",
      level: 3,
      question: "Describe us slow dancing in the kitchen with nowhere to be.",
    },
    {
      id: "flirty_193",
      category: "Romantic Scenarios",
      level: 3,
      question: "Narrate a rainy day spent entirely wrapped up together.",
    },
    {
      id: "flirty_194",
      category: "Romantic Scenarios",
      level: 3,
      question:
        "Describe the drive home from a date that went a little too well.",
    },
    {
      id: "flirty_195",
      category: "Romantic Scenarios",
      level: 3,
      question:
        "Narrate the first five minutes after I surprise you at your door.",
    },
    {
      id: "flirty_196",
      category: "Romantic Scenarios",
      level: 3,
      question:
        "Describe a lazy Sunday morning that turns romantic without either of us planning it.",
    },
    {
      id: "flirty_197",
      category: "Romantic Scenarios",
      level: 3,
      question:
        "Narrate us getting ready for a night out and being a little too distracted by each other.",
      rare: true,
    },
    {
      id: "flirty_198",
      category: "Romantic Scenarios",
      level: 3,
      question:
        "Describe the quiet moment after a long day when all either of us wants is closeness.",
    },
    {
      id: "flirty_199",
      category: "Wildcard",
      level: 4,
      question:
        'Whisper, or write, the first word that comes to mind when you think "desire."',
    },
    {
      id: "flirty_200",
      category: "Wildcard",
      level: 4,
      question:
        "Skip this question and instead close the distance between us right now.",
      rare: true,
    },
    {
      id: "flirty_201",
      category: "Flirting",
      level: 1,
      question:
        "What's the smallest flirty gesture that gets your attention every time?",
    },
    {
      id: "flirty_202",
      category: "Flirting",
      level: 1,
      question:
        "How do you flirt when you're trying to make me laugh instead of blush?",
    },
    {
      id: "flirty_203",
      category: "Flirting",
      level: 2,
      question:
        "What's a look I give you that you've learned to read perfectly?",
    },
    {
      id: "flirty_204",
      category: "Flirting",
      level: 1,
      question: "What's your go-to flirty line, even if it's a little cheesy?",
    },
    {
      id: "flirty_205",
      category: "Flirting",
      level: 2,
      question: "Do you flirt more with words, with touch, or with teasing?",
    },
    {
      id: "flirty_206",
      category: "Compliments",
      level: 1,
      question:
        "What's a compliment about my hands, eyes, or smile that you actually mean?",
    },
    {
      id: "flirty_207",
      category: "Compliments",
      level: 1,
      question: "Compliment the way I text you good morning.",
    },
    {
      id: "flirty_208",
      category: "Compliments",
      level: 2,
      question:
        "What's something about my confidence, or lack of it, that you find endearing?",
    },
    {
      id: "flirty_209",
      category: "Compliments",
      level: 1,
      question:
        "Tell me the compliment you give me most in your head but rarely say out loud.",
    },
    {
      id: "flirty_210",
      category: "Attraction",
      level: 1,
      question:
        "What's an unexpected thing about me that caught your attention early on?",
    },
    {
      id: "flirty_211",
      category: "Attraction",
      level: 2,
      question:
        "What's a version of me — tired, focused, laughing — that you're most drawn to?",
    },
    {
      id: "flirty_212",
      category: "Attraction",
      level: 1,
      question: "What's something I wear that you secretly hope I wear again?",
    },
    {
      id: "flirty_213",
      category: "Chemistry",
      level: 2,
      question: "What moment recently made you feel a spark out of nowhere?",
    },
    {
      id: "flirty_214",
      category: "Chemistry",
      level: 2,
      question:
        "How does our chemistry show up differently now compared to the beginning?",
    },
    {
      id: "flirty_215",
      category: "Chemistry",
      level: 3,
      question:
        "What's a silent moment between us that felt more intense than words?",
    },
    {
      id: "flirty_216",
      category: "Kissing",
      level: 2,
      question:
        "What's the difference between a good kiss and a great one, for you?",
    },
    {
      id: "flirty_217",
      category: "Kissing",
      level: 1,
      question:
        "Forehead, cheek, or lips — which good morning kiss do you crave most?",
    },
    {
      id: "flirty_218",
      category: "Preferences",
      level: 2,
      question: "Do you like being surprised with affection, or asked first?",
    },
    {
      id: "flirty_219",
      category: "Preferences",
      level: 2,
      question:
        "What's more you: playful teasing all night, or one intense moment?",
    },
    {
      id: "flirty_220",
      category: "Date Night",
      level: 2,
      question: "Design a date night with zero talking allowed until dessert.",
    },
    {
      id: "flirty_221",
      category: "Date Night",
      level: 2,
      question:
        "What's a flirty twist you'd add to a totally normal dinner date?",
    },
    {
      id: "flirty_222",
      category: "Confessions",
      level: 3,
      question:
        "Confess something you find yourself wanting more of, physically, lately.",
    },
    {
      id: "flirty_223",
      category: "Confessions",
      level: 3,
      question:
        "What's a thought about me you had today that you're only now admitting?",
    },
    {
      id: "flirty_224",
      category: "Rate",
      level: 3,
      question:
        "Rate how well I read your mood today, and tell me what gave it away.",
    },
    {
      id: "flirty_225",
      category: "Tell Me",
      level: 3,
      question:
        "Tell me the exact moment today you thought about me unprompted.",
    },
    {
      id: "flirty_226",
      category: "Tell Me",
      level: 3,
      question: "Tell me what makes you feel most desired by me.",
    },
    {
      id: "flirty_227",
      category: "Show Me",
      level: 3,
      question:
        "Show me the exact face you make when you're pretending not to be flirting.",
    },
    {
      id: "flirty_228",
      category: "Show Me",
      level: 3,
      question:
        "Show me how you'd get my attention from across a room, no words.",
    },
    {
      id: "flirty_229",
      category: "Romantic Scenarios",
      level: 3,
      question:
        "Narrate the perfect five minutes right before we fall asleep together.",
    },
    {
      id: "flirty_230",
      category: "Romantic Scenarios",
      level: 4,
      question:
        "Describe a slow Saturday morning where neither of us wants to get up.",
    },
    {
      id: "flirty_231",
      category: "Chemistry",
      level: 4,
      question:
        "What builds anticipation for you more: waiting, or knowing exactly when?",
    },
    {
      id: "flirty_232",
      category: "Choose",
      level: 3,
      question:
        "Would you rather I surprised you with affection mid-day, or planned it for the evening?",
    },
    {
      id: "flirty_233",
      category: "Choose",
      level: 3,
      question:
        "Would you rather a slow, teasing goodbye, or a quick, intense one?",
    },
    {
      id: "flirty_234",
      category: "After Dark",
      level: 4,
      question:
        "What's a small thing I do that instantly shifts the mood for you?",
    },
    {
      id: "flirty_235",
      category: "After Dark",
      level: 5,
      question: "Tell me exactly what you want tonight, without hesitating.",
      rare: true,
    },
    {
      id: "flirty_236",
      category: "Playful Challenges",
      level: 3,
      question: "Dare me to say something bold before the next round starts.",
    },
    {
      id: "flirty_237",
      category: "Playful Challenges",
      level: 2,
      question: "Make up a silly rule about touching for the rest of the game.",
    },
    {
      id: "flirty_238",
      category: "Wildcard",
      level: 4,
      question:
        "Whisper, or write, one word that describes how you feel right now.",
    },
    {
      id: "flirty_239",
      category: "Wildcard",
      level: 4,
      question: "Skip this card and give me one long, slow kiss instead.",
      rare: true,
    },
    {
      id: "flirty_240",
      category: "Flirting",
      level: 2,
      question:
        "What's the flirtiest thing about the way I move through a room?",
    },
    {
      id: "flirty_241",
      category: "Flirting",
      level: 1,
      question:
        "When do you feel the most playful, flirty version of yourself with me?",
    },
    {
      id: "flirty_242",
      category: "Compliments",
      level: 2,
      question:
        "What's the sexiest compliment you've never actually said out loud?",
    },
    {
      id: "flirty_243",
      category: "Compliments",
      level: 1,
      question: "Compliment my voice, specifically, and what it does to you.",
    },
    {
      id: "flirty_244",
      category: "Attraction",
      level: 2,
      question:
        "What's something I do without thinking that you find irresistibly attractive?",
    },
    {
      id: "flirty_245",
      category: "Attraction",
      level: 1,
      question:
        "Casual clothes or dressed up — which version of me pulls your focus more?",
    },
    {
      id: "flirty_246",
      category: "Kissing",
      level: 2,
      question: "What's your favorite unexpected place we've kissed?",
    },
    {
      id: "flirty_247",
      category: "Kissing",
      level: 3,
      question: "Describe the kiss you think about when you miss me the most.",
    },
    {
      id: "flirty_248",
      category: "Preferences",
      level: 2,
      question:
        "Would you rather I initiated a kiss in public, or saved it for when we're alone?",
    },
    {
      id: "flirty_249",
      category: "Date Night",
      level: 3,
      question:
        "Plan a date that ends with neither of us wanting to say goodnight.",
    },
    {
      id: "flirty_250",
      category: "Confessions",
      level: 3,
      question:
        "Confess a small thing you do on purpose just to get my attention.",
    },
    {
      id: "flirty_251",
      category: "Confessions",
      level: 4,
      question:
        "What's a fantasy about us you've only recently let yourself think about?",
      rare: true,
    },
    {
      id: "flirty_252",
      category: "Tell Me",
      level: 3,
      question: "Tell me what 'missing me' actually feels like in your body.",
    },
    {
      id: "flirty_253",
      category: "Show Me",
      level: 3,
      question: "Show me your favorite way to be pulled closer.",
    },
    {
      id: "flirty_254",
      category: "Romantic Scenarios",
      level: 3,
      question:
        "Narrate the moment right after a long hug when neither of us lets go first.",
    },
    {
      id: "flirty_255",
      category: "Chemistry",
      level: 3,
      question:
        "What's a look across a crowded room that instantly says everything?",
    },
    {
      id: "flirty_256",
      category: "Choose",
      level: 3,
      question:
        "Would you rather a slow dance with no music, or music with no dancing?",
    },
    {
      id: "flirty_257",
      category: "After Dark",
      level: 4,
      question:
        "What's something intimate that feels different now than it did when we started?",
    },
    {
      id: "flirty_258",
      category: "Playful Challenges",
      level: 2,
      question:
        "Challenge me to a staring contest where the loser gives the winner a kiss.",
    },
    {
      id: "flirty_259",
      category: "Wildcard",
      level: 4,
      question:
        "Say the boldest true thing you're thinking, right now, out loud.",
      rare: true,
    },
    {
      id: "flirty_260",
      category: "Flirting",
      level: 2,
      question:
        "What's a flirty compliment you'd only say after a glass of wine?",
    },
    {
      id: "flirty_261",
      category: "Attraction",
      level: 2,
      question:
        "What's the most attractive thing about how I handle a hard day?",
    },
    {
      id: "flirty_262",
      category: "Kissing",
      level: 2,
      question:
        "Slow and lingering, or quick and surprising — what's your kiss mood today?",
    },
    {
      id: "flirty_263",
      category: "Preferences",
      level: 3,
      question: "What's your ideal way to be woken up in the morning?",
    },
    {
      id: "flirty_264",
      category: "Date Night",
      level: 2,
      question:
        "What's one flirty tradition you want us to start on date nights?",
    },
    {
      id: "flirty_265",
      category: "Confessions",
      level: 3,
      question:
        "Confess the last time you couldn't stop thinking about a specific moment with me.",
    },
    {
      id: "flirty_266",
      category: "Tell Me",
      level: 3,
      question: "Tell me one word for how you want tonight to feel.",
    },
    {
      id: "flirty_267",
      category: "Show Me",
      level: 3,
      question: "Show me the exact hug you need right now.",
    },
    {
      id: "flirty_268",
      category: "Romantic Scenarios",
      level: 4,
      question:
        "Describe getting ready together for a night out, distracted by each other the whole time.",
    },
    {
      id: "flirty_269",
      category: "Chemistry",
      level: 3,
      question:
        "What's something about tension between us that you secretly enjoy?",
    },
    {
      id: "flirty_270",
      category: "Choose",
      level: 4,
      question:
        "Would you rather I teased you all evening and delivered later, or got straight to the point?",
    },
    {
      id: "flirty_271",
      category: "After Dark",
      level: 4,
      question:
        "What's something you want more of that you haven't asked for directly?",
    },
    {
      id: "flirty_272",
      category: "Playful Challenges",
      level: 2,
      question:
        "Dare me to whisper something in your ear before this round ends.",
    },
    {
      id: "flirty_273",
      category: "Flirting",
      level: 1,
      question:
        "What's the flirtiest thing about my handwriting, my texts, or the way I type?",
    },
    {
      id: "flirty_274",
      category: "Compliments",
      level: 2,
      question: "Compliment the way I hold you, specifically.",
    },
    {
      id: "flirty_275",
      category: "Attraction",
      level: 2,
      question: "What version of confident-me do you find most magnetic?",
    },
    {
      id: "flirty_276",
      category: "Kissing",
      level: 2,
      question:
        "What's the perfect length for a goodbye kiss, in your opinion?",
    },
    {
      id: "flirty_277",
      category: "Preferences",
      level: 2,
      question:
        "Do you want more spontaneous affection, or more planned romantic moments?",
    },
    {
      id: "flirty_278",
      category: "Date Night",
      level: 3,
      question:
        "What's a flirty dare you'd want built into our next date night?",
    },
    {
      id: "flirty_279",
      category: "Confessions",
      level: 3,
      question:
        "Confess one thing you find yourself doing just to make me look at you.",
    },
    {
      id: "flirty_280",
      category: "Tell Me",
      level: 3,
      question: "Tell me what makes a regular Tuesday feel romantic to you.",
    },
    {
      id: "flirty_281",
      category: "Show Me",
      level: 3,
      question:
        "Show me how you look at me when you think I'm not paying attention.",
    },
    {
      id: "flirty_282",
      category: "Romantic Scenarios",
      level: 3,
      question:
        "Narrate the quiet moment right before either of us says something we've been holding back.",
    },
    {
      id: "flirty_283",
      category: "Chemistry",
      level: 4,
      question:
        "What's a physical detail of mine that gets more attractive to you over time, not less?",
    },
    {
      id: "flirty_284",
      category: "Choose",
      level: 3,
      question:
        "Would you rather a bold move from me first, or a bold move from you first?",
    },
    {
      id: "flirty_285",
      category: "After Dark",
      level: 4,
      question:
        "What makes you feel most wanted, specifically, versus just loved?",
    },
    {
      id: "flirty_286",
      category: "Playful Challenges",
      level: 2,
      question:
        "Make up a flirty forfeit for whoever answers the next card worst.",
    },
    {
      id: "flirty_287",
      category: "Wildcard",
      level: 4,
      question:
        "Say the one thing you'd want me to do right now if you could ask for anything.",
      rare: true,
    },
    {
      id: "flirty_288",
      category: "Flirting",
      level: 2,
      question: "What's a flirty habit of mine you hope I never grow out of?",
    },
    {
      id: "flirty_289",
      category: "Compliments",
      level: 1,
      question: "Compliment the last thing I said that made you smile.",
    },
    {
      id: "flirty_290",
      category: "Attraction",
      level: 2,
      question:
        "What's an attractive quality of mine that has nothing to do with looks?",
    },
    {
      id: "flirty_291",
      category: "Kissing",
      level: 3,
      question: "What's a moment you wish had turned into a kiss, but didn't?",
    },
    {
      id: "flirty_292",
      category: "Preferences",
      level: 2,
      question:
        "Do you prefer affection that starts slow, or affection that's sudden and surprising?",
    },
    {
      id: "flirty_293",
      category: "Date Night",
      level: 3,
      question:
        "What's the most romantic thing that could happen on an otherwise ordinary night in?",
    },
    {
      id: "flirty_294",
      category: "Confessions",
      level: 4,
      question:
        "Confess something about desire you've never said to anyone before, not just me.",
      rare: true,
    },
    {
      id: "flirty_295",
      category: "Tell Me",
      level: 3,
      question:
        "Tell me the difference between how you flirt now versus at the very beginning.",
    },
    {
      id: "flirty_296",
      category: "Show Me",
      level: 3,
      question: "Show me the exact reaction you have when I surprise you.",
    },
    {
      id: "flirty_297",
      category: "Romantic Scenarios",
      level: 3,
      question:
        "Describe the version of us, ten years from now, still flirting like this.",
    },
    {
      id: "flirty_298",
      category: "Chemistry",
      level: 3,
      question:
        "What's the fastest our chemistry has ever gone from calm to electric?",
    },
    {
      id: "flirty_299",
      category: "Choose",
      level: 3,
      question:
        "Would you rather a whispered compliment, or a written one you can keep?",
    },
    {
      id: "flirty_300",
      category: "After Dark",
      level: 4,
      question:
        "What's a boundary that, when respected, actually makes you feel closer to me?",
    },
  ],
  chaos: [
    {
      id: "chaos_001",
      category: "Who Would",
      question: "Who would survive longer in a zombie apocalypse?",
    },
    {
      id: "chaos_002",
      category: "Who Would",
      question: "Who would be the better reality TV contestant?",
    },
    {
      id: "chaos_003",
      category: "Who Would",
      question:
        "Who would accidentally start a cult with a group project speech?",
    },
    {
      id: "chaos_004",
      category: "Who Would",
      question: "Who would become friends with the flight attendant first?",
    },
    {
      id: "chaos_005",
      category: "Who Would",
      question: "Who would win in a dance-off with no practice?",
    },
    {
      id: "chaos_006",
      category: "Most Likely",
      question: "Who is more likely to accidentally become famous online?",
    },
    {
      id: "chaos_007",
      category: "Most Likely",
      question:
        "Who is more likely to trip in public and pretend it was on purpose?",
    },
    {
      id: "chaos_008",
      category: "Most Likely",
      question: "Who is more likely to cry during a movie?",
    },
    {
      id: "chaos_009",
      category: "Most Likely",
      question: "Who is more likely to adopt a street animal on impulse?",
    },
    {
      id: "chaos_010",
      category: "Most Likely",
      question: "Who is more likely to forget why they walked into a room?",
    },
    {
      id: "chaos_011",
      category: "Embarrassing",
      question:
        "Who is more likely to wave back at someone who wasn't waving at them?",
    },
    {
      id: "chaos_012",
      category: "Embarrassing",
      question: "Who is more likely to send a text to the wrong person?",
    },
    {
      id: "chaos_013",
      category: "Embarrassing",
      question:
        "Who is more likely to have food on their face without noticing?",
    },
    {
      id: "chaos_014",
      category: "Arguments",
      question: "Who would win an argument if neither of you could use facts?",
    },
    {
      id: "chaos_015",
      category: "Arguments",
      question: "Who is more stubborn when you're both wrong?",
    },
    {
      id: "chaos_016",
      category: "Arguments",
      question: "Who apologizes first after a silly fight?",
    },
    {
      id: "chaos_017",
      category: "Hypothetical Disasters",
      question: "Who would handle a sudden power outage better?",
    },
    {
      id: "chaos_018",
      category: "Hypothetical Disasters",
      question: "Who would stay calmer if the car broke down?",
    },
    {
      id: "chaos_019",
      category: "Hypothetical Disasters",
      question: "Who would negotiate better with a landlord?",
    },
    {
      id: "chaos_020",
      category: "Weird Scenarios",
      question: "Who would get lost even while using GPS?",
    },
    {
      id: "chaos_021",
      category: "Weird Scenarios",
      question: "Who would forget their own birthday first?",
    },
    {
      id: "chaos_022",
      category: "Weird Scenarios",
      question: "Who would talk to a plant like it's a roommate?",
    },
    {
      id: "chaos_023",
      category: "Ranking",
      question: "Who is the better cook, honestly?",
    },
    {
      id: "chaos_024",
      category: "Ranking",
      question: "Who has better taste in music?",
    },
    {
      id: "chaos_025",
      category: "Ranking",
      question: "Who is funnier at 1 a.m.?",
    },
    {
      id: "chaos_026",
      category: "Predictions",
      question: "Who will fall asleep first tonight?",
    },
    {
      id: "chaos_027",
      category: "Predictions",
      question: "Who will text first tomorrow morning?",
    },
    {
      id: "chaos_028",
      category: "Predictions",
      question: "Who will suggest dessert first?",
    },
    {
      id: "chaos_029",
      category: "Petty Debates",
      question: "Who is more dramatic about being a little sick?",
    },
    {
      id: "chaos_030",
      category: "Petty Debates",
      question: "Who steals more of the blanket?",
    },
    {
      id: "chaos_031",
      category: "Petty Debates",
      question: "Who is more likely to say 'I'm fine' when not fine?",
    },
    {
      id: "chaos_032",
      category: "Inside Jokes",
      question:
        "Which one of your inside jokes would confuse a stranger the most?",
    },
    {
      id: "chaos_033",
      category: "Inside Jokes",
      question: "Who starts the inside jokes more often?",
    },
    {
      id: "chaos_034",
      category: "Challenges",
      question: "Who would last longer without their phone?",
    },
    {
      id: "chaos_035",
      category: "Challenges",
      question: "Who would win a staring contest?",
    },
    {
      id: "chaos_036",
      category: "Challenges",
      question: "Who would survive a week of only spicy food?",
    },
    {
      id: "chaos_037",
      category: "Random",
      question: "Who would spend $500 on something completely unnecessary?",
    },
    {
      id: "chaos_038",
      category: "Random",
      question: "Who would win at charades?",
    },
    {
      id: "chaos_039",
      category: "Random",
      question: "Who would make a better podcast host?",
    },
    {
      id: "chaos_040",
      category: "Challenges",
      question:
        "Recreate your first date, right now, as best you can from memory.",
      rare: true,
    },
    {
      id: "chaos_041",
      category: "Random",
      question: "Whoever laughs first has to do a silly dance.",
      rare: true,
    },
    {
      id: "chaos_042",
      category: "Who Would",
      question: "Who would pack lighter for a trip?",
    },
    {
      id: "chaos_043",
      category: "Who Would",
      question: "Who would become the group chat admin everyone fears?",
    },
    {
      id: "chaos_044",
      category: "Most Likely",
      question: "Who is more likely to rewatch the same series again?",
    },
    {
      id: "chaos_045",
      category: "Most Likely",
      question: "Who is more likely to buy a gadget that never gets used?",
    },
    {
      id: "chaos_046",
      category: "Embarrassing",
      question: "Who is more likely to mishear lyrics confidently?",
    },
    {
      id: "chaos_047",
      category: "Arguments",
      question: "Who uses more sarcasm in a disagreement?",
    },
    {
      id: "chaos_048",
      category: "Hypothetical Disasters",
      question: "Who would lead if you got locked out of the house?",
    },
    {
      id: "chaos_049",
      category: "Weird Scenarios",
      question: "Who would befriend a raccoon energy person first?",
    },
    {
      id: "chaos_050",
      category: "Ranking",
      question: "Who takes better photos of the other person?",
    },
    {
      id: "chaos_051",
      category: "Predictions",
      question: "Who will say 'I told you so' next?",
    },
    {
      id: "chaos_052",
      category: "Petty Debates",
      question: "Who is slower to leave the house?",
    },
    {
      id: "chaos_053",
      category: "Inside Jokes",
      question: "What meme energy are you as a couple?",
    },
    {
      id: "chaos_054",
      category: "Challenges",
      question: "Who would win at Mario Kart with one hand?",
    },
    {
      id: "chaos_055",
      category: "Random",
      question: "Who would survive a week as a barista better?",
    },
    {
      id: "chaos_056",
      category: "Who Would",
      question: "Who would accidentally join a pyramid scheme first?",
    },
    {
      id: "chaos_057",
      category: "Most Likely",
      question: "Who is more likely to name a pet something ridiculous?",
    },
    {
      id: "chaos_058",
      category: "Embarrassing",
      question: "Who is more likely to have a public wardrobe fail?",
    },
    {
      id: "chaos_059",
      category: "Arguments",
      question: "Who changes the subject to food mid-fight?",
    },
    {
      id: "chaos_060",
      category: "Hypothetical Disasters",
      question: "Who would handle a cancelled flight better?",
    },
    {
      id: "chaos_061",
      category: "Weird Scenarios",
      question: "Who would talk during a horror movie more?",
    },
    {
      id: "chaos_062",
      category: "Ranking",
      question: "Who is messier in the kitchen?",
    },
    {
      id: "chaos_063",
      category: "Predictions",
      question: "Who will suggest a nap first this weekend?",
    },
    {
      id: "chaos_064",
      category: "Petty Debates",
      question: "Who is more competitive about board games?",
    },
    {
      id: "chaos_065",
      category: "Inside Jokes",
      question: "Who quotes movies more out of context?",
    },
    {
      id: "chaos_066",
      category: "Challenges",
      question: "Who can hold a plank longer?",
    },
    {
      id: "chaos_067",
      category: "Random",
      question: "Who would invent a worse startup idea?",
    },
    {
      id: "chaos_068",
      category: "Who Would",
      question: "Who would become a conspiracy theory believer as a bit?",
    },
    {
      id: "chaos_069",
      category: "Most Likely",
      question: "Who is more likely to cry at an airport goodbye?",
    },
    {
      id: "chaos_070",
      category: "Embarrassing",
      question: "Who is more likely to call a teacher 'mom'?",
    },
    {
      id: "chaos_071",
      category: "Arguments",
      question: "Who needs more time to cool down?",
    },
    {
      id: "chaos_072",
      category: "Hypothetical Disasters",
      question: "Who would remember the insurance password?",
    },
    {
      id: "chaos_073",
      category: "Weird Scenarios",
      question: "Who would name their WiFi something embarrassing?",
    },
    {
      id: "chaos_074",
      category: "Ranking",
      question: "Who is better at gift-giving?",
    },
    {
      id: "chaos_075",
      category: "Predictions",
      question: "Who will become a morning person first?",
    },
    {
      id: "chaos_076",
      category: "Petty Debates",
      question: "Who leaves more dishes 'to soak'?",
    },
    {
      id: "chaos_077",
      category: "Inside Jokes",
      question: "Who does the better impression of the other?",
    },
    {
      id: "chaos_078",
      category: "Challenges",
      question: "Who can name more capitals in 30 seconds?",
    },
    {
      id: "chaos_079",
      category: "Random",
      question: "Who would survive a reality dating show longer?",
    },
    {
      id: "chaos_080",
      category: "Who Would",
      question: "Who would write a viral tweet by accident?",
    },
    {
      id: "chaos_081",
      category: "Most Likely",
      question: "Who is more likely to fall for a prank twice?",
    },
    {
      id: "chaos_082",
      category: "Embarrassing",
      question: "Who is more likely to wave at a reflective window?",
    },
    {
      id: "chaos_083",
      category: "Arguments",
      question: "Who brings up old screenshots in a playful roast?",
    },
    {
      id: "chaos_084",
      category: "Hypothetical Disasters",
      question: "Who would stay calm in a haunted house?",
    },
    {
      id: "chaos_085",
      category: "Weird Scenarios",
      question: "Who would collect too many mugs?",
    },
    {
      id: "chaos_086",
      category: "Ranking",
      question: "Who is better at parallel parking?",
    },
    {
      id: "chaos_087",
      category: "Predictions",
      question: "Who will suggest ordering takeout first?",
    },
    {
      id: "chaos_088",
      category: "Petty Debates",
      question: "Who is more likely to say 'one more episode'?",
    },
    {
      id: "chaos_089",
      category: "Inside Jokes",
      question: "Who creates nicknames faster?",
    },
    {
      id: "chaos_090",
      category: "Challenges",
      question: "Who would win a silent contest for 5 minutes?",
    },
    {
      id: "chaos_091",
      category: "Random",
      question: "Who would become a food critic on pure confidence?",
    },
    {
      id: "chaos_092",
      category: "Who Would",
      question:
        "Who would accidentally become the favorite of a random grandma?",
    },
    {
      id: "chaos_093",
      category: "Most Likely",
      question: "Who is more likely to start a plant collection?",
    },
    {
      id: "chaos_094",
      category: "Embarrassing",
      question: "Who is more likely to trip while trying to look cool?",
    },
    {
      id: "chaos_095",
      category: "Arguments",
      question: "Who wins when the debate is about movie plots?",
    },
    {
      id: "chaos_096",
      category: "Hypothetical Disasters",
      question: "Who would fix a leaky faucet with pure stubbornness?",
    },
    {
      id: "chaos_097",
      category: "Weird Scenarios",
      question: "Who would talk to Alexa like a person?",
    },
    {
      id: "chaos_098",
      category: "Ranking",
      question: "Who has the better 'I told you so' face?",
    },
    {
      id: "chaos_099",
      category: "Predictions",
      question: "Who will finish their drink first on the next date?",
    },
    {
      id: "chaos_100",
      category: "Petty Debates",
      question: "Who is more likely to hide online shopping packages?",
      rare: true,
    },
    {
      id: "chaos_101",
      category: "Who Would",
      question: "Who would win a pillow fight in under 10 seconds?",
    },
    {
      id: "chaos_102",
      category: "Who Would",
      question: "Who would forget they're on a video call and start singing?",
    },
    {
      id: "chaos_103",
      category: "Who Would",
      question: "Who would talk their way out of a speeding ticket?",
    },
    {
      id: "chaos_104",
      category: "Who Would",
      question:
        "Who would end up on a first-name basis with every waiter in town?",
    },
    {
      id: "chaos_105",
      category: "Who Would",
      question: "Who would win an argument with a self-checkout machine?",
    },
    {
      id: "chaos_106",
      category: "Who Would",
      question:
        "Who would accidentally become a regular extra in someone else's vacation photos?",
    },
    {
      id: "chaos_107",
      category: "Who Would",
      question: "Who would survive being locked out in pajamas the longest?",
    },
    {
      id: "chaos_108",
      category: "Who Would",
      question: "Who would win a debate against a toddler?",
    },
    {
      id: "chaos_109",
      category: "Most Likely",
      question: 'Who is more likely to text "we need to talk" as a joke?',
    },
    {
      id: "chaos_110",
      category: "Most Likely",
      question: "Who is more likely to fall asleep during a movie they picked?",
    },
    {
      id: "chaos_111",
      category: "Most Likely",
      question:
        "Who is more likely to buy matching outfits without asking first?",
    },
    {
      id: "chaos_112",
      category: "Most Likely",
      question: "Who is more likely to start clapping at the wrong moment?",
    },
    {
      id: "chaos_113",
      category: "Most Likely",
      question: "Who is more likely to over-explain a simple answer?",
    },
    {
      id: "chaos_114",
      category: "Most Likely",
      question: "Who is more likely to name every houseplant?",
    },
    {
      id: "chaos_115",
      category: "Most Likely",
      question:
        "Who is more likely to get emotionally attached to a video game character?",
    },
    {
      id: "chaos_116",
      category: "Most Likely",
      question: "Who is more likely to save a spider instead of squashing it?",
    },
    {
      id: "chaos_117",
      category: "Embarrassing",
      question:
        "Who is more likely to laugh at their own joke before finishing it?",
    },
    {
      id: "chaos_118",
      category: "Embarrassing",
      question: "Who is more likely to walk into a glass door?",
    },
    {
      id: "chaos_119",
      category: "Embarrassing",
      question: "Who is more likely to clap when a plane lands?",
    },
    {
      id: "chaos_120",
      category: "Embarrassing",
      question:
        "Who is more likely to sing the wrong lyrics with total confidence?",
    },
    {
      id: "chaos_121",
      category: "Embarrassing",
      question:
        "Who is more likely to answer a call meant for someone else and keep talking?",
    },
    {
      id: "chaos_122",
      category: "Embarrassing",
      question:
        "Who is more likely to accidentally like an old photo while stalking someone's profile?",
    },
    {
      id: "chaos_123",
      category: "Embarrassing",
      question:
        'Who is more likely to say "you too" when a waiter says "enjoy your meal"?',
    },
    {
      id: "chaos_124",
      category: "Embarrassing",
      question:
        "Who is more likely to get caught talking to themselves in the mirror?",
    },
    {
      id: "chaos_125",
      category: "Arguments",
      question: "Who holds a grudge about the thermostat the longest?",
    },
    {
      id: "chaos_126",
      category: "Arguments",
      question:
        "Who is more likely to bring receipts, literal or figurative, into an argument?",
    },
    {
      id: "chaos_127",
      category: "Arguments",
      question: "Who wins the debate over who's the better driver?",
    },
    {
      id: "chaos_128",
      category: "Arguments",
      question: "Who is quicker to admit they're wrong, even a little?",
    },
    {
      id: "chaos_129",
      category: "Arguments",
      question: "Who turns an argument into a bit within five minutes?",
    },
    {
      id: "chaos_130",
      category: "Arguments",
      question:
        'Who is more stubborn about the "right" way to load a dishwasher?',
    },
    {
      id: "chaos_131",
      category: "Arguments",
      question:
        'Who wins the "who\'s more tired" competition every single time?',
    },
    {
      id: "chaos_132",
      category: "Arguments",
      question:
        "Who is more likely to fake being asleep to avoid a conversation?",
    },
    {
      id: "chaos_133",
      category: "Hypothetical Disasters",
      question: "Who would take charge if the wifi went out during a big game?",
    },
    {
      id: "chaos_134",
      category: "Hypothetical Disasters",
      question: "Who would handle discovering a leak under the sink better?",
    },
    {
      id: "chaos_135",
      category: "Hypothetical Disasters",
      question: "Who would stay calmer if we missed our own flight?",
    },
    {
      id: "chaos_136",
      category: "Hypothetical Disasters",
      question: "Who would improvise dinner best if the stove broke?",
    },
    {
      id: "chaos_137",
      category: "Hypothetical Disasters",
      question: "Who would be more useful in a zombie apocalypse grocery run?",
    },
    {
      id: "chaos_138",
      category: "Hypothetical Disasters",
      question:
        "Who would keep their cool if the GPS sent us the wrong way for an hour?",
    },
    {
      id: "chaos_139",
      category: "Hypothetical Disasters",
      question:
        "Who would handle a surprise in-law visit with zero notice better?",
    },
    {
      id: "chaos_140",
      category: "Hypothetical Disasters",
      question:
        "Who would fix a jammed door faster — with tools or brute force?",
    },
    {
      id: "chaos_141",
      category: "Weird Scenarios",
      question: "Who would try to befriend a very suspicious pigeon?",
    },
    {
      id: "chaos_142",
      category: "Weird Scenarios",
      question: "Who would narrate grocery shopping like a nature documentary?",
    },
    {
      id: "chaos_143",
      category: "Weird Scenarios",
      question:
        "Who would give a dramatic TED talk about their favorite snack?",
    },
    {
      id: "chaos_144",
      category: "Weird Scenarios",
      question: "Who would name their car something oddly specific?",
    },
    {
      id: "chaos_145",
      category: "Weird Scenarios",
      question:
        "Who would try to have a full conversation with a self-driving car?",
    },
    {
      id: "chaos_146",
      category: "Weird Scenarios",
      question: "Who would organize a spontaneous parade over good news?",
    },
    {
      id: "chaos_147",
      category: "Weird Scenarios",
      question:
        "Who would negotiate with a vending machine that ate their money?",
      rare: true,
    },
    {
      id: "chaos_148",
      category: "Weird Scenarios",
      question: "Who would treat a robot vacuum like a pet?",
    },
    {
      id: "chaos_149",
      category: "Ranking",
      question: "Who is the better multitasker, honestly?",
    },
    {
      id: "chaos_150",
      category: "Ranking",
      question: 'Who has the more useful "life hacks"?',
    },
    {
      id: "chaos_151",
      category: "Ranking",
      question: "Who is better at remembering directions without GPS?",
    },
    {
      id: "chaos_152",
      category: "Ranking",
      question: "Who tells a story with better pacing?",
    },
    {
      id: "chaos_153",
      category: "Ranking",
      question: "Who is more patient in long lines?",
    },
    {
      id: "chaos_154",
      category: "Ranking",
      question: "Who negotiates a better deal shopping?",
    },
    {
      id: "chaos_155",
      category: "Ranking",
      question: "Who has the stronger poker face?",
    },
    {
      id: "chaos_156",
      category: "Ranking",
      question: "Who packs a suitcase more efficiently?",
    },
    {
      id: "chaos_157",
      category: "Predictions",
      question: "Who will be the first to suggest getting a pet this year?",
    },
    {
      id: "chaos_158",
      category: "Predictions",
      question: "Who will bring up a vacation idea first this season?",
    },
    {
      id: "chaos_159",
      category: "Predictions",
      question: "Who will fall for the next viral trend first?",
    },
    {
      id: "chaos_160",
      category: "Predictions",
      question: "Who will start a new hobby first this year?",
    },
    {
      id: "chaos_161",
      category: "Predictions",
      question: "Who will cave and order dessert first tonight?",
    },
    {
      id: "chaos_162",
      category: "Predictions",
      question: "Who will remember to water the plants without being asked?",
    },
    {
      id: "chaos_163",
      category: "Predictions",
      question: "Who will suggest canceling plans to stay in first?",
    },
    {
      id: "chaos_164",
      category: "Predictions",
      question: "Who will bring up moving somewhere new first?",
    },
    {
      id: "chaos_165",
      category: "Petty Debates",
      question: "Who takes up more closet space, if we're honest?",
    },
    {
      id: "chaos_166",
      category: "Petty Debates",
      question: "Who is more particular about how the towels are folded?",
    },
    {
      id: "chaos_167",
      category: "Petty Debates",
      question: 'Who "borrows" the other\'s charger and never gives it back?',
    },
    {
      id: "chaos_168",
      category: "Petty Debates",
      question: "Who is louder chewing, and who will actually admit it?",
    },
    {
      id: "chaos_169",
      category: "Petty Debates",
      question: "Who leaves the cabinet doors open more?",
    },
    {
      id: "chaos_170",
      category: "Petty Debates",
      question: "Who hogs the good blanket first?",
    },
    {
      id: "chaos_171",
      category: "Petty Debates",
      question: 'Who is more particular about the "correct" TV volume?',
    },
    {
      id: "chaos_172",
      category: "Petty Debates",
      question: "Who takes longer to pick something to watch?",
    },
    {
      id: "chaos_173",
      category: "Inside Jokes",
      question:
        "What's a word only the two of you use, and what does it actually mean?",
    },
    {
      id: "chaos_174",
      category: "Inside Jokes",
      question:
        "What's a face one of you makes that instantly cracks the other up?",
    },
    {
      id: "chaos_175",
      category: "Inside Jokes",
      question:
        "What bit have you done so many times it's basically tradition now?",
      rare: true,
    },
    {
      id: "chaos_176",
      category: "Inside Jokes",
      question: "Who started your longest-running inside joke, and how?",
    },
    {
      id: "chaos_177",
      category: "Inside Jokes",
      question: "What's a movie line you two quote way too often?",
    },
    {
      id: "chaos_178",
      category: "Inside Jokes",
      question:
        "What's the weirdest thing that's become \"your song\" as a joke?",
    },
    {
      id: "chaos_179",
      category: "Inside Jokes",
      question:
        "What's an overreaction one of you had that's now a running bit?",
    },
    {
      id: "chaos_180",
      category: "Inside Jokes",
      question: "What nickname exists only because of an inside joke?",
    },
    {
      id: "chaos_181",
      category: "Challenges",
      question:
        "Who can go the longest without checking their phone right now?",
      rare: true,
    },
    {
      id: "chaos_182",
      category: "Challenges",
      question: "Who can list five countries faster?",
    },
    {
      id: "chaos_183",
      category: "Challenges",
      question: "Who can do a better impression of the other, right now?",
    },
    {
      id: "chaos_184",
      category: "Challenges",
      question: "Who can hold eye contact the longest without laughing?",
    },
    {
      id: "chaos_185",
      category: "Challenges",
      question: 'Who can come up with a rhyme for "us" the fastest?',
    },
    {
      id: "chaos_186",
      category: "Challenges",
      question: "Who can guess the other's next words in a familiar story?",
    },
    {
      id: "chaos_187",
      category: "Challenges",
      question:
        "Who can name more of each other's favorite things in 20 seconds?",
    },
    {
      id: "chaos_188",
      category: "Challenges",
      question:
        "Who can keep a straight face the longest while the other tries to make them laugh?",
    },
    {
      id: "chaos_189",
      category: "Random",
      question: "Who would win a debate about pineapple on pizza?",
    },
    {
      id: "chaos_190",
      category: "Random",
      question: "Who would be a better game show contestant, honestly?",
    },
    {
      id: "chaos_191",
      category: "Random",
      question: "Who would survive longer without coffee or tea?",
    },
    {
      id: "chaos_192",
      category: "Random",
      question: "Who would win at a trivia night about each other?",
    },
    {
      id: "chaos_193",
      category: "Random",
      question: "Who would make friends with a stranger in line faster?",
    },
    {
      id: "chaos_194",
      category: "Random",
      question: "Who would be more likely to cry at a commercial?",
    },
    {
      id: "chaos_195",
      category: "Random",
      question: 'Who would win a "who can be quieter" contest for one hour?',
    },
    {
      id: "chaos_196",
      category: "Random",
      question: "Who would be funnier live-tweeting a boring meeting?",
      rare: true,
    },
    {
      id: "chaos_197",
      category: "Superlatives",
      question:
        'Who is most likely to become the "fun one" at every party you both attend?',
    },
    {
      id: "chaos_198",
      category: "Superlatives",
      question:
        "Who is most likely to remember a stranger's name better than their own coworker's?",
    },
    {
      id: "chaos_199",
      category: "Superlatives",
      question:
        "Who is most likely to turn a five-minute errand into an hour-long adventure?",
    },
    {
      id: "chaos_200",
      category: "Superlatives",
      question:
        'Who is most likely to win "best hype person" at the other\'s big moment?',
      rare: true,
    },
    {
      id: "chaos_201",
      category: "Who Would",
      question: "Who would win a scavenger hunt in a place they've never been?",
    },
    {
      id: "chaos_202",
      category: "Who Would",
      question: "Who would talk their way out of a speeding ticket first?",
    },
    {
      id: "chaos_203",
      category: "Who Would",
      question:
        "Who would win a blindfolded taste test of our favorite snacks?",
    },
    {
      id: "chaos_204",
      category: "Who Would",
      question:
        "Who would become the unofficial mayor of any small town we visited?",
    },
    {
      id: "chaos_205",
      category: "Who Would",
      question: "Who would win an argument with a self-checkout machine?",
    },
    {
      id: "chaos_206",
      category: "Who Would",
      question:
        "Who would survive better if we suddenly had to live off-grid for a month?",
    },
    {
      id: "chaos_207",
      category: "Who Would",
      question: "Who would end up adopting a stray animal on a random walk?",
    },
    {
      id: "chaos_208",
      category: "Who Would",
      question:
        "Who would win a cooking competition with a mystery basket of ingredients?",
    },
    {
      id: "chaos_209",
      category: "Who Would",
      question: "Who would talk to literally every stranger at a party?",
    },
    {
      id: "chaos_210",
      category: "Who Would",
      question: "Who would win a spontaneous dance battle in the kitchen?",
    },
    {
      id: "chaos_211",
      category: "Most Likely",
      question: "Who is more likely to fall asleep during a movie they picked?",
    },
    {
      id: "chaos_212",
      category: "Most Likely",
      question: "Who is more likely to start a hobby and quit within a week?",
    },
    {
      id: "chaos_213",
      category: "Most Likely",
      question:
        "Who is more likely to talk to a pet like it fully understands English?",
    },
    {
      id: "chaos_214",
      category: "Most Likely",
      question: "Who is more likely to get emotionally attached to a plant?",
    },
    {
      id: "chaos_215",
      category: "Most Likely",
      question:
        "Who is more likely to send a voice message instead of just typing?",
    },
    {
      id: "chaos_216",
      category: "Most Likely",
      question:
        "Who is more likely to win an argument by simply outlasting the other?",
    },
    {
      id: "chaos_217",
      category: "Most Likely",
      question:
        "Who is more likely to buy something just because it was on sale?",
    },
    {
      id: "chaos_218",
      category: "Embarrassing",
      question: "Who is more likely to laugh at the worst possible moment?",
    },
    {
      id: "chaos_219",
      category: "Embarrassing",
      question: "Who is more likely to walk into a glass door in public?",
    },
    {
      id: "chaos_220",
      category: "Embarrassing",
      question:
        "Who is more likely to accidentally reply-all to an embarrassing message?",
    },
    {
      id: "chaos_221",
      category: "Arguments",
      question: "Who brings up an argument from months ago at the worst time?",
    },
    {
      id: "chaos_222",
      category: "Arguments",
      question:
        "Who is more likely to end an argument with a joke that actually works?",
    },
    {
      id: "chaos_223",
      category: "Hypothetical Disasters",
      question:
        "Who would handle losing the house keys in a foreign city better?",
    },
    {
      id: "chaos_224",
      category: "Hypothetical Disasters",
      question:
        "Who would stay calmer if we both got separated in a crowded place?",
    },
    {
      id: "chaos_225",
      category: "Weird Scenarios",
      question:
        "Who would end up giving a stranger unsolicited relationship advice?",
    },
    {
      id: "chaos_226",
      category: "Weird Scenarios",
      question: "Who would try to make friends with a very unfriendly cat?",
    },
    {
      id: "chaos_227",
      category: "Weird Scenarios",
      question:
        "Who would accidentally end up in the background of a stranger's photoshoot?",
    },
    {
      id: "chaos_228",
      category: "Ranking",
      question: "Who has better handwriting?",
    },
    {
      id: "chaos_229",
      category: "Ranking",
      question: "Who is the better dancer, honestly, no bias?",
    },
    {
      id: "chaos_230",
      category: "Ranking",
      question: "Who gives better advice under pressure?",
    },
    {
      id: "chaos_231",
      category: "Predictions",
      question: "Who will be the first to fall asleep on the couch tonight?",
    },
    {
      id: "chaos_232",
      category: "Predictions",
      question:
        "Who will suggest ordering dessert before we even finish the main course?",
    },
    {
      id: "chaos_233",
      category: "Petty Debates",
      question: "Who takes longer getting ready to leave the house?",
    },
    {
      id: "chaos_234",
      category: "Petty Debates",
      question: "Who is pickier about how the dishwasher gets loaded?",
    },
    {
      id: "chaos_235",
      category: "Inside Jokes",
      question:
        "What's the dumbest joke that still makes both of you laugh every time?",
    },
    {
      id: "chaos_236",
      category: "Inside Jokes",
      question:
        "What's a phrase that means something completely different only to you two?",
    },
    {
      id: "chaos_237",
      category: "Challenges",
      question: "Who can name more of each other's exes without flinching?",
    },
    {
      id: "chaos_238",
      category: "Challenges",
      question:
        "Who can go longer without saying 'um' or 'like' while talking?",
    },
    {
      id: "chaos_239",
      category: "Random",
      question:
        "Who would win if you both tried to build furniture with no instructions?",
    },
    {
      id: "chaos_240",
      category: "Random",
      question: "Who would be funnier narrating a nature documentary?",
    },
    {
      id: "chaos_241",
      category: "Superlatives",
      question:
        "Who is most likely to fall in love with a random dog on the street?",
    },
    {
      id: "chaos_242",
      category: "Superlatives",
      question:
        "Who is most likely to accidentally start a trend among your friends?",
    },
    {
      id: "chaos_243",
      category: "Who Would",
      question: "Who would win a debate about which decade had the best music?",
    },
    {
      id: "chaos_244",
      category: "Who Would",
      question:
        "Who would be the first to cave and check their phone during a 'no phones' rule?",
    },
    {
      id: "chaos_245",
      category: "Most Likely",
      question:
        "Who is more likely to plan an entire trip in one sitting out of excitement?",
    },
    {
      id: "chaos_246",
      category: "Most Likely",
      question:
        "Who is more likely to make a to-do list and never look at it again?",
    },
    {
      id: "chaos_247",
      category: "Embarrassing",
      question:
        "Who is more likely to laugh so hard they can't finish a sentence?",
    },
    {
      id: "chaos_248",
      category: "Arguments",
      question:
        "Who is more likely to text an apology instead of saying it in person?",
    },
    {
      id: "chaos_249",
      category: "Hypothetical Disasters",
      question:
        "Who would panic first if the power went out during a movie night?",
    },
    {
      id: "chaos_250",
      category: "Weird Scenarios",
      question:
        "Who would end up narrating their own life out loud without noticing?",
    },
    {
      id: "chaos_251",
      category: "Ranking",
      question: "Who is more likely to win a spelling bee under pressure?",
    },
    {
      id: "chaos_252",
      category: "Predictions",
      question: "Who will bring up getting a bigger TV first?",
    },
    {
      id: "chaos_253",
      category: "Petty Debates",
      question: "Who leaves more half-empty glasses of water around the house?",
    },
    {
      id: "chaos_254",
      category: "Inside Jokes",
      question:
        "What's a mispronounced word that became permanently part of your vocabulary as a couple?",
    },
    {
      id: "chaos_255",
      category: "Challenges",
      question: "Who can list the most countries in one minute?",
    },
    {
      id: "chaos_256",
      category: "Random",
      question: "Who would be a better contestant on a cooking reality show?",
    },
    {
      id: "chaos_257",
      category: "Superlatives",
      question: "Who is most likely to turn a boring chore into a game?",
    },
    {
      id: "chaos_258",
      category: "Who Would",
      question: "Who would win a competition for who can nap the fastest?",
    },
    {
      id: "chaos_259",
      category: "Who Would",
      question:
        "Who would give the more convincing fake excuse to skip a boring event?",
    },
    {
      id: "chaos_260",
      category: "Most Likely",
      question:
        "Who is more likely to become emotionally invested in a stranger's drama online?",
    },
    {
      id: "chaos_261",
      category: "Embarrassing",
      question:
        "Who is more likely to get caught talking about someone right as they walk in?",
    },
    {
      id: "chaos_262",
      category: "Arguments",
      question: "Who is quicker to say 'you're right' just to end an argument?",
    },
    {
      id: "chaos_263",
      category: "Hypothetical Disasters",
      question:
        "Who would come up with a better backup plan if our first plan totally failed?",
    },
    {
      id: "chaos_264",
      category: "Weird Scenarios",
      question: "Who would befriend the world's most talkative taxi driver?",
    },
    {
      id: "chaos_265",
      category: "Ranking",
      question: "Who tells better bedtime stories, even for adults?",
    },
    {
      id: "chaos_266",
      category: "Predictions",
      question: "Who will suggest a spontaneous weekend trip first this year?",
    },
    {
      id: "chaos_267",
      category: "Petty Debates",
      question: "Who is more particular about how the bed gets made?",
    },
    {
      id: "chaos_268",
      category: "Inside Jokes",
      question: "What's a text typo that became a running joke you still use?",
    },
    {
      id: "chaos_269",
      category: "Challenges",
      question: "Who can hold their breath longer, right now?",
    },
    {
      id: "chaos_270",
      category: "Random",
      question: "Who would win at karaoke on a song neither of you knows well?",
    },
    {
      id: "chaos_271",
      category: "Superlatives",
      question:
        "Who is most likely to accidentally befriend a celebrity in real life?",
    },
    {
      id: "chaos_272",
      category: "Who Would",
      question: "Who would out-negotiate a street vendor first?",
    },
    {
      id: "chaos_273",
      category: "Most Likely",
      question: "Who is more likely to fall for an obvious April Fools' joke?",
    },
    {
      id: "chaos_274",
      category: "Embarrassing",
      question:
        "Who is more likely to accidentally show up to a costume party in regular clothes?",
    },
    {
      id: "chaos_275",
      category: "Arguments",
      question:
        "Who is better at arguing calmly instead of raising their voice?",
    },
    {
      id: "chaos_276",
      category: "Hypothetical Disasters",
      question:
        "Who would be first to suggest calling it a night if a plan started going wrong?",
    },
    {
      id: "chaos_277",
      category: "Weird Scenarios",
      question: "Who would try to teach a parrot to say something ridiculous?",
    },
    {
      id: "chaos_278",
      category: "Ranking",
      question: "Who is a better judge of character on a first meeting?",
    },
    {
      id: "chaos_279",
      category: "Predictions",
      question: "Who will be the one to suggest redecorating a room first?",
    },
    {
      id: "chaos_280",
      category: "Petty Debates",
      question: "Who leaves their shoes in the most inconvenient spot?",
    },
    {
      id: "chaos_281",
      category: "Inside Jokes",
      question:
        "What's a costume, prop, or object that's become a couple's tradition prop?",
    },
    {
      id: "chaos_282",
      category: "Challenges",
      question:
        "Who can balance something on their head the longest, right now?",
      rare: true,
    },
    {
      id: "chaos_283",
      category: "Random",
      question:
        "Who would survive a week eating only what's in the fridge right now?",
    },
    {
      id: "chaos_284",
      category: "Superlatives",
      question:
        "Who is most likely to turn a five-star review into a personal mission?",
    },
    {
      id: "chaos_285",
      category: "Who Would",
      question:
        "Who would win a competition to make the other laugh first, no talking allowed?",
      rare: true,
    },
    {
      id: "chaos_286",
      category: "Most Likely",
      question:
        "Who is more likely to fall in love with a new hobby overnight?",
    },
    {
      id: "chaos_287",
      category: "Embarrassing",
      question:
        "Who is more likely to send a voice message that's way too long by accident?",
    },
    {
      id: "chaos_288",
      category: "Arguments",
      question:
        "Who is the one who needs the last word, even in a silly disagreement?",
    },
    {
      id: "chaos_289",
      category: "Hypothetical Disasters",
      question:
        "Who would take charge if we both got food poisoning on vacation?",
    },
    {
      id: "chaos_290",
      category: "Weird Scenarios",
      question:
        "Who would end up giving directions to a lost tourist, even in an unfamiliar city?",
    },
    {
      id: "chaos_291",
      category: "Ranking",
      question: "Who is better at keeping a secret, honestly?",
    },
    {
      id: "chaos_292",
      category: "Predictions",
      question: "Who will bring up trying a new restaurant first this month?",
    },
    {
      id: "chaos_293",
      category: "Petty Debates",
      question: "Who takes over the aux cord more often on car rides?",
    },
    {
      id: "chaos_294",
      category: "Inside Jokes",
      question:
        "What's an accent or voice one of you does that's become a household bit?",
    },
    {
      id: "chaos_295",
      category: "Challenges",
      question:
        "Who can come up with a better excuse for being late, on the spot?",
    },
    {
      id: "chaos_296",
      category: "Random",
      question:
        "Who would win an eating contest with something neither of you likes?",
    },
    {
      id: "chaos_297",
      category: "Superlatives",
      question:
        "Who is most likely to become the group's designated planner for every trip?",
    },
    {
      id: "chaos_298",
      category: "Superlatives",
      question:
        "Who is most likely to know the lyrics to a song neither of you claims to like?",
    },
    {
      id: "chaos_299",
      category: "Who Would",
      question:
        "Who would win a game of chess against a suspiciously confident stranger?",
    },
    {
      id: "chaos_300",
      category: "Most Likely",
      question:
        "Who is more likely to name every plant in the house something ridiculous?",
    },
  ],
  future: [
    {
      id: "future_001",
      category: "Travel",
      question: "What country should we visit together first?",
    },
    {
      id: "future_002",
      category: "Travel",
      question:
        "Beach vacation, city trip, or nature escape — what's our next move?",
    },
    {
      id: "future_003",
      category: "Travel",
      question: "What is a place from your childhood you'd like to show me?",
    },
    {
      id: "future_004",
      category: "Travel",
      question:
        "Would you rather a slow train journey or a quick flight for our trips?",
    },
    {
      id: "future_005",
      category: "Home",
      question: "What would our dream home look like?",
    },
    {
      id: "future_006",
      category: "Home",
      question: "What is non-negotiable in a place we live?",
    },
    {
      id: "future_007",
      category: "Home",
      question:
        "Do you picture plants, pets, art — what makes a house feel like ours?",
    },
    {
      id: "future_008",
      category: "Home",
      question: "City apartment or house with a yard?",
    },
    {
      id: "future_009",
      category: "Career",
      question: "Where do you picture your career five years from now?",
    },
    {
      id: "future_010",
      category: "Career",
      question: "How can I best support your work goals?",
    },
    {
      id: "future_011",
      category: "Career",
      question: "What does work-life balance look like for us as a team?",
    },
    {
      id: "future_012",
      category: "Money",
      question: "If money didn't matter for one year, what would we do?",
    },
    {
      id: "future_013",
      category: "Money",
      question: "What money habit do you want us to build together?",
    },
    {
      id: "future_014",
      category: "Money",
      question:
        "Save for a house, travel, or experiences first — what's your priority?",
    },
    {
      id: "future_015",
      category: "Lifestyle",
      question: "What would our perfect ordinary Sunday look like?",
    },
    {
      id: "future_016",
      category: "Lifestyle",
      question:
        "Are we more morning coffee people or late-night talk people long-term?",
    },
    {
      id: "future_017",
      category: "Lifestyle",
      question:
        "How social do you want our life to be — dinners out or quiet home?",
    },
    {
      id: "future_018",
      category: "Family",
      question: "What kind of family life do you picture for us?",
    },
    {
      id: "future_019",
      category: "Family",
      question:
        "How involved do you want extended family to be in our daily life?",
    },
    {
      id: "future_020",
      category: "Family",
      question: "What family tradition from your side do you want to keep?",
    },
    {
      id: "future_021",
      category: "Pets",
      question: "Do you picture a pet in our future — and if so, what kind?",
    },
    {
      id: "future_022",
      category: "Pets",
      question: "Dog, cat, or something unexpected?",
    },
    {
      id: "future_023",
      category: "Adventures",
      question:
        "What's one adventure you want us to take before we settle down?",
    },
    {
      id: "future_024",
      category: "Adventures",
      question:
        "What scare (skydiving, camping, karaoke) should we try together?",
    },
    {
      id: "future_025",
      category: "Marriage",
      question: "What does marriage mean to you, in your own words?",
    },
    {
      id: "future_026",
      category: "Marriage",
      question: "What would make a wedding feel like 'us'?",
    },
    {
      id: "future_027",
      category: "Marriage",
      question:
        "Describe, in one paragraph, what you imagine our wedding day feeling like.",
      rare: true,
    },
    {
      id: "future_028",
      category: "Traditions",
      question: "What tradition would you want us to create together?",
    },
    {
      id: "future_029",
      category: "Traditions",
      question: "Weekly date night, annual trip, or something weirder?",
    },
    {
      id: "future_030",
      category: "Holidays",
      question:
        "How do you imagine we'll spend the holidays once we're together full-time?",
    },
    {
      id: "future_031",
      category: "Holidays",
      question: "Do you prefer hosting or traveling for holidays?",
    },
    {
      id: "future_032",
      category: "Retirement",
      question: "What do you imagine us doing when we're old together?",
    },
    {
      id: "future_033",
      category: "Retirement",
      question: "Where do you hope we grow old?",
    },
    {
      id: "future_034",
      category: "Dreams",
      question: "What's a dream of yours that you want us to chase together?",
    },
    {
      id: "future_035",
      category: "Dreams",
      question:
        "What personal dream should never get lost because of the relationship?",
    },
    {
      id: "future_036",
      category: "Bucket List",
      question:
        "What's one thing you'd want on a shared bucket list right now?",
    },
    {
      id: "future_037",
      category: "Bucket List",
      question: "Name three things we should do before five years pass.",
    },
    {
      id: "future_038",
      category: "Where Will We Be",
      question: "Where do you think we'll be living five years from now?",
    },
    {
      id: "future_039",
      category: "Where Will We Be",
      question:
        "Do you see us in one of our hometowns, somewhere new, or splitting the year between places?",
    },
    {
      id: "future_040",
      category: "Future Memories",
      question: "Plan our next date, right now, in detail.",
      rare: true,
    },
    {
      id: "future_041",
      category: "Travel",
      question: "What language would you want us to learn together?",
    },
    {
      id: "future_042",
      category: "Home",
      question: "What color is our future kitchen, in your head?",
    },
    {
      id: "future_043",
      category: "Career",
      question: "Would you support a big career risk if one of us needed it?",
    },
    {
      id: "future_044",
      category: "Money",
      question: "How do you feel about joint vs separate finances long-term?",
    },
    {
      id: "future_045",
      category: "Lifestyle",
      question: "How important is living near friends?",
    },
    {
      id: "future_046",
      category: "Family",
      question: "How do you feel about kids — timing, openness, fears?",
    },
    {
      id: "future_047",
      category: "Pets",
      question: "What rules would our future pet have to follow?",
    },
    {
      id: "future_048",
      category: "Adventures",
      question: "What festival or concert should be on our list?",
    },
    {
      id: "future_049",
      category: "Marriage",
      question: "What vows matter more to you: poetic or practical?",
    },
    {
      id: "future_050",
      category: "Traditions",
      question: "What should we always do on our anniversary?",
    },
    {
      id: "future_051",
      category: "Holidays",
      question: "New Year's Eve in or out, years from now?",
    },
    {
      id: "future_052",
      category: "Retirement",
      question: "What hobby do you hope we're still doing at 70?",
    },
    {
      id: "future_053",
      category: "Dreams",
      question: "If we wrote a five-year plan tonight, what tops the list?",
    },
    {
      id: "future_054",
      category: "Bucket List",
      question: "One spontaneous item and one planned item for the list.",
    },
    {
      id: "future_055",
      category: "Where Will We Be",
      question: "Urban energy or quieter life — where does your gut go?",
    },
    {
      id: "future_056",
      category: "Future Memories",
      question: "What memory do you hope we create this year?",
    },
    {
      id: "future_057",
      category: "Travel",
      question: "Road trip across a country — which one?",
    },
    {
      id: "future_058",
      category: "Home",
      question: "Guest room or home office if we had to choose one?",
    },
    {
      id: "future_059",
      category: "Career",
      question: "How do we handle busy seasons without losing us?",
    },
    {
      id: "future_060",
      category: "Money",
      question: "What does 'enough' money mean to you?",
    },
    {
      id: "future_061",
      category: "Lifestyle",
      question: "How much routine vs spontaneity do you want long-term?",
    },
    {
      id: "future_062",
      category: "Family",
      question: "What values do you hope our household has?",
    },
    {
      id: "future_063",
      category: "Pets",
      question: "Would you rather foster first or adopt for life?",
    },
    {
      id: "future_064",
      category: "Adventures",
      question: "Camping for a weekend — yes, no, or luxury glamping only?",
    },
    {
      id: "future_065",
      category: "Marriage",
      question: "How do you want to handle last names, if at all?",
    },
    {
      id: "future_066",
      category: "Traditions",
      question: "Sunday morning ritual idea — go.",
    },
    {
      id: "future_067",
      category: "Holidays",
      question: "Which holiday do you want to make 'ours'?",
    },
    {
      id: "future_068",
      category: "Retirement",
      question: "Travel when old, or deep roots in one place?",
    },
    {
      id: "future_069",
      category: "Dreams",
      question: "What creative project could we do as a couple someday?",
    },
    {
      id: "future_070",
      category: "Bucket List",
      question: "A kind of food destination you want to travel for.",
    },
    {
      id: "future_071",
      category: "Where Will We Be",
      question: "Same city forever or chapters in different places?",
    },
    {
      id: "future_072",
      category: "Future Memories",
      question: "Describe a random Tuesday with us in ten years.",
    },
    {
      id: "future_073",
      category: "Travel",
      question: "First class once or more trips on a budget?",
    },
    {
      id: "future_074",
      category: "Home",
      question: "What is the first thing you'd hang on the wall?",
    },
    {
      id: "future_075",
      category: "Career",
      question: "Whose job would dictate a move, if either?",
    },
    {
      id: "future_076",
      category: "Money",
      question: "Big wedding vs big honeymoon budget — lean?",
    },
    {
      id: "future_077",
      category: "Lifestyle",
      question: "Gym partners, hobby partners, or independent hobbies?",
    },
    {
      id: "future_078",
      category: "Family",
      question: "How do you want to show up for each other's parents?",
    },
    {
      id: "future_079",
      category: "Pets",
      question: "Name a ridiculous pet name you'd actually consider.",
    },
    {
      id: "future_080",
      category: "Adventures",
      question: "Learn a sport together — which one?",
    },
    {
      id: "future_081",
      category: "Marriage",
      question: "What does partnership look like on hard financial months?",
    },
    {
      id: "future_082",
      category: "Traditions",
      question: "Photo tradition you want to keep every year.",
    },
    {
      id: "future_083",
      category: "Holidays",
      question: "Would you create a new holiday just for us?",
    },
    {
      id: "future_084",
      category: "Retirement",
      question: "What promise do you want us to keep into old age?",
    },
    {
      id: "future_085",
      category: "Dreams",
      question: "If fear weren't a factor, what would we build?",
    },
    {
      id: "future_086",
      category: "Bucket List",
      question: "One skill to learn side by side.",
    },
    {
      id: "future_087",
      category: "Where Will We Be",
      question: "Climate, culture, cost — what drives where we live?",
    },
    {
      id: "future_088",
      category: "Future Memories",
      question: "What should we document more so future-us can smile?",
    },
    {
      id: "future_089",
      category: "Travel",
      question: "Island hop or train across Europe?",
    },
    {
      id: "future_090",
      category: "Home",
      question: "Open-plan chaos or cozy separate rooms?",
    },
    {
      id: "future_091",
      category: "Career",
      question: "Sabbatical together someday — yes or no?",
    },
    {
      id: "future_092",
      category: "Money",
      question: "Charity or saving — how do we balance giving?",
    },
    {
      id: "future_093",
      category: "Lifestyle",
      question: "Digital detox weekends as a future rule?",
    },
    {
      id: "future_094",
      category: "Family",
      question: "Chosen family dinners — monthly idea?",
    },
    {
      id: "future_095",
      category: "Adventures",
      question: "Volunteer trip together — interested?",
    },
    {
      id: "future_096",
      category: "Marriage",
      question: "What support looks like during illness or stress.",
    },
    {
      id: "future_097",
      category: "Traditions",
      question: "First dance song energy — classic or our song?",
    },
    {
      id: "future_098",
      category: "Dreams",
      question: "A home project you'd love to do with me.",
    },
    {
      id: "future_099",
      category: "Bucket List",
      question: "See the northern lights or the Sahara?",
    },
    {
      id: "future_100",
      category: "Where Will We Be",
      question:
        "If we could only pick one city forever after next year, which?",
      rare: true,
    },
    {
      id: "future_101",
      category: "Travel",
      question:
        "What's a trip you'd want to take only after we've been together ten years?",
    },
    {
      id: "future_102",
      category: "Travel",
      question:
        'Would you want a "no itinerary" trip once a year, just to see what happens?',
    },
    {
      id: "future_103",
      category: "Travel",
      question:
        "What's one travel tradition you want us to have before we're forty?",
    },
    {
      id: "future_104",
      category: "Travel",
      question:
        "Should we chase bucket-list destinations first, or comfort-return trips?",
    },
    {
      id: "future_105",
      category: "Travel",
      question:
        "What's a country you'd want to live in for a few months someday, not just visit?",
    },
    {
      id: "future_106",
      category: "Travel",
      question:
        "What kind of trip do you imagine us taking to celebrate a big future milestone?",
    },
    {
      id: "future_107",
      category: "Home",
      question:
        "What's a room in our future home you want to design entirely yourself?",
    },
    {
      id: "future_108",
      category: "Home",
      question:
        "Would you want a home that changes as our life does, or one we settle into forever?",
    },
    {
      id: "future_109",
      category: "Home",
      question:
        "What's a small comfort you want guaranteed in every home we ever have?",
    },
    {
      id: "future_110",
      category: "Home",
      question:
        "Should our future home be closer to nature or closer to the city center?",
    },
    {
      id: "future_111",
      category: "Home",
      question:
        "What's something from your current home you'd want to bring into ours?",
    },
    {
      id: "future_112",
      category: "Home",
      question:
        "What do you want our future front door to feel like when people walk through it?",
    },
    {
      id: "future_113",
      category: "Career",
      question: 'What does "successful" mean to you ten years from now?',
    },
    {
      id: "future_114",
      category: "Career",
      question:
        "Would you want us to ever work on a project or business together?",
    },
    {
      id: "future_115",
      category: "Career",
      question: "What's a career risk you'd want my full support to take?",
    },
    {
      id: "future_116",
      category: "Career",
      question:
        "How should we handle it if one of us gets a huge opportunity in another city?",
    },
    {
      id: "future_117",
      category: "Career",
      question:
        "What does slowing down professionally look like for you someday?",
    },
    {
      id: "future_118",
      category: "Career",
      question:
        "What's a skill you want to have mastered by the time you're fifty?",
    },
    {
      id: "future_119",
      category: "Money",
      question:
        "What's a financial goal you want us to hit together in the next five years?",
    },
    {
      id: "future_120",
      category: "Money",
      question:
        "How do you feel about splitting big purchases evenly versus by income?",
    },
    {
      id: "future_121",
      category: "Money",
      question: "What's something you'd never want us to go into debt for?",
    },
    {
      id: "future_122",
      category: "Money",
      question:
        'Should we set a "fun fund" for spontaneous things, no questions asked?',
    },
    {
      id: "future_123",
      category: "Money",
      question:
        "What does financial security actually feel like to you, specifically?",
    },
    {
      id: "future_124",
      category: "Money",
      question:
        "How do you want us to handle money disagreements before they happen?",
    },
    {
      id: "future_125",
      category: "Lifestyle",
      question: "What's a daily ritual you hope we still have in twenty years?",
    },
    {
      id: "future_126",
      category: "Lifestyle",
      question: "Should our future be more social or more private, overall?",
    },
    {
      id: "future_127",
      category: "Lifestyle",
      question:
        "What's a habit you want us to build together this year that pays off later?",
    },
    {
      id: "future_128",
      category: "Lifestyle",
      question:
        "How much do you want technology involved in our future daily life?",
    },
    {
      id: "future_129",
      category: "Lifestyle",
      question: 'What does a "good week" look like for us five years from now?',
    },
    {
      id: "future_130",
      category: "Lifestyle",
      question:
        "What's something you want to simplify about how we live, eventually?",
    },
    {
      id: "future_131",
      category: "Family",
      question:
        "What role do you want grandparents, yours or future ones, to play in our life?",
    },
    {
      id: "future_132",
      category: "Family",
      question:
        "How should we handle differing family traditions once we blend our lives?",
    },
    {
      id: "future_133",
      category: "Family",
      question:
        "What's a family pattern you want to intentionally break with me?",
    },
    {
      id: "future_134",
      category: "Family",
      question:
        'What does "showing up" for extended family look like for us long-term?',
    },
    {
      id: "future_135",
      category: "Family",
      question:
        "How many close family members do you hope stay in our daily orbit?",
    },
    {
      id: "future_136",
      category: "Family",
      question:
        "What family value do you most want to pass down, if we ever have kids?",
    },
    {
      id: "future_137",
      category: "Pets",
      question:
        "Would you want one pet for a long life, or several over the years?",
    },
    {
      id: "future_138",
      category: "Pets",
      question:
        "What's a pet responsibility you'd happily take fully off my plate?",
    },
    {
      id: "future_139",
      category: "Pets",
      question:
        "Should our future pet have free rein of the house or clear boundaries?",
    },
    {
      id: "future_140",
      category: "Pets",
      question:
        "What's a trait you'd want in a future pet that matches our personalities?",
    },
    {
      id: "future_141",
      category: "Pets",
      question: "Would you want to foster animals together at some point?",
    },
    {
      id: "future_142",
      category: "Pets",
      question:
        'What would our pet\'s "job" be in the family, emotionally speaking?',
    },
    {
      id: "future_143",
      category: "Adventures",
      question:
        "What's a physically challenging adventure you want us to attempt together?",
    },
    {
      id: "future_144",
      category: "Adventures",
      question:
        'Should we have a yearly "do something scary together" tradition?',
    },
    {
      id: "future_145",
      category: "Adventures",
      question:
        "What's an adventure you'd want to have solo, that I fully support?",
    },
    {
      id: "future_146",
      category: "Adventures",
      question:
        "What's the wildest thing you'd want to try once, just to say we did?",
    },
    {
      id: "future_147",
      category: "Adventures",
      question:
        "Would you want to learn a new skill together purely for the adventure of it?",
    },
    {
      id: "future_148",
      category: "Adventures",
      question:
        "What's a \"someday\" adventure you've never said out loud until now?",
    },
    {
      id: "future_149",
      category: "Marriage",
      question:
        "What does a strong marriage look like to you, day to day, not just on paper?",
    },
    {
      id: "future_150",
      category: "Marriage",
      question:
        "What's a promise you'd want written into our vows that's uniquely us?",
    },
    {
      id: "future_151",
      category: "Marriage",
      question:
        "How do you want us to keep choosing each other, actively, years in?",
      rare: true,
    },
    {
      id: "future_152",
      category: "Marriage",
      question:
        "What tradition from a wedding you attended would you want to steal?",
    },
    {
      id: "future_153",
      category: "Marriage",
      question:
        "What's a compromise you'd already make for our future wedding?",
    },
    {
      id: "future_154",
      category: "Marriage",
      question:
        "How do you want us to celebrate our marriage on ordinary Tuesdays, not just anniversaries?",
    },
    {
      id: "future_155",
      category: "Traditions",
      question:
        "What's a tradition you want to start the very first year we live together?",
    },
    {
      id: "future_156",
      category: "Traditions",
      question:
        "Should our traditions be big and planned, or small and spontaneous?",
    },
    {
      id: "future_157",
      category: "Traditions",
      question:
        "What's one tradition from your childhood you refuse to give up?",
    },
    {
      id: "future_158",
      category: "Traditions",
      question:
        "What new tradition could only exist because the two of us exist?",
    },
    {
      id: "future_159",
      category: "Traditions",
      question:
        "What's a tradition you'd want passed down if we ever have kids or family?",
    },
    {
      id: "future_160",
      category: "Traditions",
      question:
        "What ritual do you want us to have for hard days, not just celebrations?",
    },
    {
      id: "future_161",
      category: "Holidays",
      question:
        "Should we alternate holidays between families or build our own new schedule?",
    },
    {
      id: "future_162",
      category: "Holidays",
      question: "What holiday do you want to eventually host at our own place?",
    },
    {
      id: "future_163",
      category: "Holidays",
      question:
        "What's a holiday tradition you want to invent that has nothing to do with either family?",
    },
    {
      id: "future_164",
      category: "Holidays",
      question:
        "How do you want us to handle holidays if we ever live far from family?",
    },
    {
      id: "future_165",
      category: "Holidays",
      question:
        "What's a low-key holiday you want to protect from ever becoming stressful?",
    },
    {
      id: "future_166",
      category: "Holidays",
      question: "What holiday gift tradition do you want us to keep forever?",
    },
    {
      id: "future_167",
      category: "Retirement",
      question: "What does an ideal retired Tuesday look like for us?",
    },
    {
      id: "future_168",
      category: "Retirement",
      question:
        "Would you want to travel constantly in retirement or settle somewhere and stay?",
    },
    {
      id: "future_169",
      category: "Retirement",
      question:
        "What hobby do you want us to pick up specifically for retirement?",
    },
    {
      id: "future_170",
      category: "Retirement",
      question:
        "What's something you want us to have finished, achieved, or built before we retire?",
    },
    {
      id: "future_171",
      category: "Retirement",
      question:
        "How do you want us to support each other if one of us struggles with aging?",
    },
    {
      id: "future_172",
      category: "Retirement",
      question: "What's a retirement dream you've never told anyone before?",
    },
    {
      id: "future_173",
      category: "Dreams",
      question:
        "What's a dream you've quietly given up on that I could help you revive?",
    },
    {
      id: "future_174",
      category: "Dreams",
      question:
        "If we had unlimited resources for one year, what would we build together?",
    },
    {
      id: "future_175",
      category: "Dreams",
      question:
        "What's a dream you have that has nothing to do with me, but that I should still know about?",
    },
    {
      id: "future_176",
      category: "Dreams",
      question:
        "What's the boldest version of our future you allow yourself to imagine?",
      rare: true,
    },
    {
      id: "future_177",
      category: "Dreams",
      question:
        "What dream do you want us to chase even if it doesn't fully make sense yet?",
    },
    {
      id: "future_178",
      category: "Dreams",
      question:
        "What's something you want to be true about us in twenty years that isn't yet?",
    },
    {
      id: "future_179",
      category: "Bucket List",
      question: "What's one experience you'd regret never sharing with me?",
    },
    {
      id: "future_180",
      category: "Bucket List",
      question:
        "Name a bucket list item that only counts if we do it together.",
    },
    {
      id: "future_181",
      category: "Bucket List",
      question:
        "What's something small you want on the list that people would find silly?",
    },
    {
      id: "future_182",
      category: "Bucket List",
      question:
        "What bucket list item should we actually schedule this year, not just talk about?",
    },
    {
      id: "future_183",
      category: "Bucket List",
      question:
        "What's a bucket list goal you'd want us to achieve before any major life change?",
    },
    {
      id: "future_184",
      category: "Bucket List",
      question: "What's on your list that scares you a little?",
    },
    {
      id: "future_185",
      category: "Where Will We Be",
      question:
        "In your gut, do you feel our future is here, abroad, or split between both?",
    },
    {
      id: "future_186",
      category: "Where Will We Be",
      question:
        "What's a place you've never lived that keeps quietly calling to you?",
    },
    {
      id: "future_187",
      category: "Where Will We Be",
      question:
        'What would make you feel most "arrived" — a city, a home, or a feeling?',
    },
    {
      id: "future_188",
      category: "Where Will We Be",
      question:
        "If we had to choose a home base for the next decade today, where would you lean?",
    },
    {
      id: "future_189",
      category: "Where Will We Be",
      question:
        "What's more important long-term: proximity to family or proximity to opportunity?",
      rare: true,
    },
    {
      id: "future_190",
      category: "Where Will We Be",
      question:
        "Where do you picture us celebrating a milestone birthday, twenty years from now?",
    },
    {
      id: "future_191",
      category: "Future Memories",
      question:
        "Describe a memory you hope we're making exactly one year from today.",
    },
    {
      id: "future_192",
      category: "Future Memories",
      question:
        "What's a moment you want to intentionally create, not just wait for?",
    },
    {
      id: "future_193",
      category: "Future Memories",
      question:
        "What ordinary future moment do you already know you'll want to remember?",
    },
    {
      id: "future_194",
      category: "Future Memories",
      question:
        "Describe the scene when we tell people how we built our life together.",
      rare: true,
    },
    {
      id: "future_195",
      category: "Future Memories",
      question: "What's a memory you want us to be laughing about at eighty?",
    },
    {
      id: "future_196",
      category: "Future Memories",
      question:
        "If our future had a highlight reel, what's one scene you'd insist stays in it?",
    },
    {
      id: "future_197",
      category: "Legacy",
      question: "What do you want the two of us, together, to be known for?",
      rare: true,
    },
    {
      id: "future_198",
      category: "Legacy",
      question:
        "What's something you hope people say about our relationship after knowing us a while?",
    },
    {
      id: "future_199",
      category: "Legacy",
      question:
        "What's a mark you want us to leave on the people closest to us?",
    },
    {
      id: "future_200",
      category: "Legacy",
      question:
        "If our life together were a story someone told for years, what would the moral be?",
    },
    {
      id: "future_201",
      category: "Travel",
      question:
        "What's a trip we should take specifically to celebrate a milestone?",
    },
    {
      id: "future_202",
      category: "Travel",
      question:
        "Would you rather explore one continent deeply, or touch every continent briefly?",
    },
    {
      id: "future_203",
      category: "Travel",
      question:
        "What's a travel tradition you want us to have every single year?",
    },
    {
      id: "future_204",
      category: "Home",
      question:
        "What's one room in our future home that's entirely your vision?",
    },
    {
      id: "future_205",
      category: "Home",
      question:
        "Do you want a home that's always ready for guests, or one that's just for us?",
    },
    {
      id: "future_206",
      category: "Home",
      question:
        "What's a small ritual you want built into how we start mornings at home?",
    },
    {
      id: "future_207",
      category: "Career",
      question: "What does success look like for you outside of a job title?",
    },
    {
      id: "future_208",
      category: "Career",
      question:
        "How do you want us to handle it if one of our careers takes off faster than the other's?",
    },
    {
      id: "future_209",
      category: "Money",
      question:
        "What's a splurge you want us to allow ourselves without guilt?",
    },
    {
      id: "future_210",
      category: "Money",
      question:
        "How do you want us to make big financial decisions — together every time, or with some independence?",
    },
    {
      id: "future_211",
      category: "Lifestyle",
      question: "What's a habit you hope we build together in the next year?",
    },
    {
      id: "future_212",
      category: "Lifestyle",
      question:
        "Do you want our weekends to be mostly planned, or mostly open?",
    },
    {
      id: "future_213",
      category: "Family",
      question:
        "What role do you hope our future household plays for extended family?",
    },
    {
      id: "future_214",
      category: "Family",
      question:
        "What's something from my family's way of doing things you'd want to adopt?",
    },
    {
      id: "future_215",
      category: "Pets",
      question: "If we got a pet tomorrow, what would we name it and why?",
    },
    {
      id: "future_216",
      category: "Adventures",
      question:
        "What's a physical challenge, like a hike or a race, you want us to train for together?",
    },
    {
      id: "future_217",
      category: "Marriage",
      question:
        "What's a wedding detail that would mean nothing to guests but everything to you?",
    },
    {
      id: "future_218",
      category: "Traditions",
      question:
        "What's a tradition from a friend's family you secretly want to steal for ours?",
    },
    {
      id: "future_219",
      category: "Holidays",
      question:
        "What's one holiday you'd want to completely reinvent for just the two of us?",
    },
    {
      id: "future_220",
      category: "Retirement",
      question:
        "What's a skill you want to have fully mastered by the time we retire?",
    },
    {
      id: "future_221",
      category: "Dreams",
      question:
        "What's a dream you'd chase even if it meant a few years of instability?",
    },
    {
      id: "future_222",
      category: "Bucket List",
      question:
        "What's a bucket list item that would surprise people who think they know you?",
    },
    {
      id: "future_223",
      category: "Where Will We Be",
      question:
        "If you had to bet, what city do you think we'll actually end up in?",
    },
    {
      id: "future_224",
      category: "Future Memories",
      question:
        "What's a moment you're already looking forward to remembering, even before it happens?",
    },
    {
      id: "future_225",
      category: "Legacy",
      question:
        "What's something you want people to say about how we treated each other?",
    },
    {
      id: "future_226",
      category: "Health",
      question:
        "What habit do you want us to build to take care of each other physically as we age?",
    },
    {
      id: "future_227",
      category: "Health",
      question:
        "How do you want us to support each other through a tough health scare, if it ever happens?",
    },
    {
      id: "future_228",
      category: "Health",
      question:
        "What does taking care of your mind, not just your body, look like for you long-term?",
    },
    {
      id: "future_229",
      category: "Community",
      question:
        "What kind of friend group do you hope we build together over the years?",
    },
    {
      id: "future_230",
      category: "Community",
      question:
        "How involved do you want us to be in a neighborhood or local community someday?",
    },
    {
      id: "future_231",
      category: "Community",
      question:
        "What's a cause or group you'd want us to volunteer for together?",
    },
    {
      id: "future_232",
      category: "Growth",
      question:
        "What's a fear you want to have outgrown together by next year?",
    },
    {
      id: "future_233",
      category: "Growth",
      question:
        "What's a version of 'us' five years from now that you're actively working toward?",
    },
    {
      id: "future_234",
      category: "Growth",
      question:
        "What skill do you want us to learn together purely to grow closer?",
    },
    {
      id: "future_235",
      category: "Travel",
      question:
        "What's a destination that scares you a little but you'd still want to visit with me?",
    },
    {
      id: "future_236",
      category: "Travel",
      question:
        "Would you rather move abroad for a year as an experiment, or never leave home for more than a month?",
    },
    {
      id: "future_237",
      category: "Home",
      question:
        "What's a piece of furniture or art you want to keep forever, no matter how many times we move?",
    },
    {
      id: "future_238",
      category: "Home",
      question:
        "Should our future home be closer to nature, or closer to everything convenient?",
    },
    {
      id: "future_239",
      category: "Career",
      question:
        "What's a professional dream of yours I might not fully know about yet?",
    },
    {
      id: "future_240",
      category: "Career",
      question:
        "How do you want us to celebrate each other's career wins, big and small?",
    },
    {
      id: "future_241",
      category: "Money",
      question:
        "What financial goal do you want us to hit together in the next three years?",
    },
    {
      id: "future_242",
      category: "Money",
      question:
        "Would you rather live below our means comfortably, or stretch for a bigger lifestyle?",
    },
    {
      id: "future_243",
      category: "Lifestyle",
      question: "What's something you want our future life to have less of?",
    },
    {
      id: "future_244",
      category: "Family",
      question:
        "What's a fear about family, yours or mine, that you want us to face together?",
    },
    {
      id: "future_245",
      category: "Pets",
      question:
        "How do you imagine our future pet fitting into a normal weekday?",
    },
    {
      id: "future_246",
      category: "Adventures",
      question:
        "What's an adventure you want to have before any major life change, like kids or a move?",
    },
    {
      id: "future_247",
      category: "Marriage",
      question:
        "What's a fear about marriage you want to talk through honestly before it happens?",
    },
    {
      id: "future_248",
      category: "Traditions",
      question:
        "What tradition do you want to be known for, specifically, among our friends?",
    },
    {
      id: "future_249",
      category: "Holidays",
      question:
        "What's your ideal balance between tradition and doing something completely new each year?",
    },
    {
      id: "future_250",
      category: "Retirement",
      question:
        "What conversation about retirement do you want us to start having now, even if it's far off?",
    },
    {
      id: "future_251",
      category: "Dreams",
      question:
        "What's a dream that would need both of us fully on board to actually happen?",
    },
    {
      id: "future_252",
      category: "Bucket List",
      question:
        "What's an item on the list that only makes sense once we're older?",
    },
    {
      id: "future_253",
      category: "Where Will We Be",
      question:
        "What would make you say 'yes, this is exactly where we're supposed to be'?",
    },
    {
      id: "future_254",
      category: "Future Memories",
      question:
        "What's a small future memory, not a big milestone, that you're quietly hoping for?",
    },
    {
      id: "future_255",
      category: "Legacy",
      question:
        "If we only left behind one lesson for people who knew us, what should it be?",
    },
    {
      id: "future_256",
      category: "Health",
      question:
        "What's a healthy habit you want us to hold each other accountable for?",
    },
    {
      id: "future_257",
      category: "Community",
      question:
        "How do you want us to stay connected to old friends as life gets busier?",
    },
    {
      id: "future_258",
      category: "Growth",
      question:
        "What's something about conflict you want us to get better at handling together?",
    },
    {
      id: "future_259",
      category: "Travel",
      question:
        "What's a trip you'd want to take completely unplanned, with nothing booked in advance?",
    },
    {
      id: "future_260",
      category: "Home",
      question:
        "What's the first thing you want to do the day we move into our first real home together?",
      rare: true,
    },
    {
      id: "future_261",
      category: "Career",
      question:
        "If our careers ever pulled us to different cities, how do you want us to decide what to do?",
      rare: true,
    },
    {
      id: "future_262",
      category: "Money",
      question:
        "What's something money-related that stressed you in the past that you want us to handle differently?",
    },
    {
      id: "future_263",
      category: "Lifestyle",
      question: "What does 'a good life,' in the simplest terms, mean to you?",
    },
    {
      id: "future_264",
      category: "Family",
      question:
        "What's a family pattern from your upbringing you actively want to break?",
      rare: true,
    },
    {
      id: "future_265",
      category: "Pets",
      question:
        "Would having a pet change how you picture our future travel plans?",
    },
    {
      id: "future_266",
      category: "Adventures",
      question:
        "What's an adventure that would only be fun because it's with me specifically?",
    },
    {
      id: "future_267",
      category: "Marriage",
      question:
        "What's one thing you'd want a close friend to say in a wedding speech about us?",
    },
    {
      id: "future_268",
      category: "Traditions",
      question:
        "What's a tradition we already have that you didn't realize was a tradition until now?",
    },
    {
      id: "future_269",
      category: "Holidays",
      question:
        "How do you want us to handle it if our families have very different holiday expectations?",
    },
    {
      id: "future_270",
      category: "Retirement",
      question:
        "What's something you want to have let go of completely by the time we retire?",
    },
    {
      id: "future_271",
      category: "Dreams",
      question:
        "What's a dream you have for me that you've never actually told me?",
      rare: true,
    },
    {
      id: "future_272",
      category: "Bucket List",
      question:
        "What's the most expensive item on your bucket list, and is it worth saving for?",
    },
    {
      id: "future_273",
      category: "Where Will We Be",
      question:
        "What's a place neither of us has considered yet that might actually be perfect for us?",
    },
    {
      id: "future_274",
      category: "Future Memories",
      question:
        "What everyday object do you think will one day remind us of exactly this era of our life?",
    },
    {
      id: "future_275",
      category: "Legacy",
      question:
        "What's a small kindness you hope becomes 'our thing' that others remember us for?",
    },
    {
      id: "future_276",
      category: "Health",
      question:
        "What's a stress-relief habit you want us to practice together regularly?",
    },
    {
      id: "future_277",
      category: "Community",
      question:
        "What kind of neighbors do you hope we become to the people around us?",
    },
    {
      id: "future_278",
      category: "Growth",
      question:
        "What's a version of yourself you're actively trying to grow into, and how can I help?",
    },
    {
      id: "future_279",
      category: "Travel",
      question:
        "What's a place we visited once that you'd want to live in for a season, just to try it?",
    },
    {
      id: "future_280",
      category: "Home",
      question:
        "How important is it to you that our home reflects both our personalities equally?",
    },
    {
      id: "future_281",
      category: "Career",
      question:
        "What's a boundary you want us to protect around work, even during busy seasons?",
    },
    {
      id: "future_282",
      category: "Money",
      question:
        "What's a purchase you'd want us to save up for together as a shared goal?",
    },
    {
      id: "future_283",
      category: "Lifestyle",
      question:
        "Would you rather a life full of variety, or a life with a few things done perfectly?",
    },
    {
      id: "future_284",
      category: "Family",
      question:
        "What's something about building a family, however that looks for us, that excites you most?",
    },
    {
      id: "future_285",
      category: "Pets",
      question:
        "If we ever had multiple pets, how do you imagine they'd each fit into our home?",
    },
    {
      id: "future_286",
      category: "Adventures",
      question:
        "What's a spontaneous adventure we could actually plan for next month?",
    },
    {
      id: "future_287",
      category: "Marriage",
      question:
        "What part of planning a future wedding are you most excited to do together?",
    },
    {
      id: "future_288",
      category: "Traditions",
      question:
        "What tradition do you want to make sure survives even a big move or life change?",
    },
    {
      id: "future_289",
      category: "Holidays",
      question:
        "What's the most 'us' way you can imagine spending a holiday that has nothing to do with tradition?",
    },
    {
      id: "future_290",
      category: "Retirement",
      question:
        "What's a version of 'slowing down' that actually sounds appealing to you, not scary?",
    },
    {
      id: "future_291",
      category: "Dreams",
      question:
        "What dream have you never said out loud because it felt too big to admit?",
      rare: true,
    },
    {
      id: "future_292",
      category: "Bucket List",
      question:
        "What's a bucket list item you'd only ever want to do with me, no one else?",
    },
    {
      id: "future_293",
      category: "Where Will We Be",
      question:
        "How much does being near the ocean, mountains, or a specific landscape matter to you long-term?",
    },
    {
      id: "future_294",
      category: "Future Memories",
      question:
        "What's a moment from a future birthday, yours or mine, that you're already imagining?",
    },
    {
      id: "future_295",
      category: "Legacy",
      question:
        "What do you hope this specific chapter of our life is remembered for, later on?",
    },
    {
      id: "future_296",
      category: "Health",
      question:
        "What's a way you want us to celebrate simply being healthy together, not just fix problems?",
    },
    {
      id: "future_297",
      category: "Community",
      question:
        "What's a local tradition or event you'd want us to make a yearly habit?",
    },
    {
      id: "future_298",
      category: "Growth",
      question:
        "What's a compliment about your own growth you'd want to hear from me a year from now?",
    },
    {
      id: "future_299",
      category: "Travel",
      question:
        "What's a trip that would be more about the journey than the destination for you?",
    },
    {
      id: "future_300",
      category: "Dreams",
      question:
        "What's a dream you'd chase differently now than you would have five years ago?",
    },
  ],
};

const FUTURE_PHRASES = {
  Travel: "traveling together often",
  Home: "building a home base you both love",
  Career: "growing your careers side by side",
  Money: "being aligned about money and plans",
  Lifestyle: "shaping a lifestyle that fits you both",
  Family: "family being a big part of your future",
  Pets: "having a pet in your life together",
  Adventures: "chasing adventures together",
  Marriage: "imagining a life fully committed to each other",
  Traditions: "creating your own little traditions",
  Holidays: "spending the holidays together",
  Retirement: "picturing life together, even far down the road",
  Dreams: "chasing big dreams as a team",
  "Bucket List": "checking things off a shared bucket list",
  "Where Will We Be": "picturing exactly where you'll end up",
  "Future Memories": "already imagining memories you haven't made yet",
};
