/* ================================================================
   DAILY QUOTES — js/data/quotes.js
   ----------------------------------------------------------------
   365 bundled quotes, one per calendar day, for the Today widget.
   No quote API is used, so the widget works offline. Each entry is
   { q: "the quote", a: "author" }. Picking logic: getDailyLocalQuote()
   in app.js.
   ================================================================ */

const FALLBACK_QUOTES = [
  { q: "The journey of a thousand miles begins with one step.", a: "Lao Tzu" },
  {
    q: "When you are content to be simply yourself and don't compare or compete, everyone will respect you.",
    a: "Lao Tzu",
  },
  {
    q: "Knowing others is intelligence; knowing yourself is true wisdom.",
    a: "Lao Tzu",
  },
  {
    q: "A good traveler has no fixed plans and is not intent upon arriving.",
    a: "Lao Tzu",
  },
  { q: "Nature does not hurry, yet everything is accomplished.", a: "Lao Tzu" },
  { q: "Silence is a source of great strength.", a: "Lao Tzu" },
  {
    q: "The flame that burns Twice as bright burns half as long.",
    a: "Lao Tzu",
  },
  {
    q: "He who knows that enough is enough will always have enough.",
    a: "Lao Tzu",
  },
  {
    q: "A journey of a thousand miles begins beneath one's feet.",
    a: "Lao Tzu",
  },
  {
    q: "The sage does not hoard. The more he helps others, the more he benefits himself.",
    a: "Lao Tzu",
  },
  {
    q: "The softest things in the world overcome the hardest things in the world.",
    a: "Lao Tzu",
  },
  {
    q: "To attain knowledge, add things every day. To attain wisdom, remove things every day.",
    a: "Lao Tzu",
  },
  {
    q: "Mastering others is strength; mastering yourself is true power.",
    a: "Lao Tzu",
  },
  {
    q: "Do the difficult things while they are easy and do the great things while they are small.",
    a: "Lao Tzu",
  },
  {
    q: "If you do not change direction, you may end up where you are heading.",
    a: "Lao Tzu",
  },
  {
    q: "A man who asks is a fool for five minutes. A man who never asks is a fool for life.",
    a: "Chinese proverb",
  },
  {
    q: "The best time to plant a tree was twenty years ago. The second best time is now.",
    a: "Chinese proverb",
  },
  { q: "Fall seven times and stand up eight.", a: "Japanese proverb" },
  {
    q: "Even a journey of a thousand miles begins with a single step.",
    a: "Chinese proverb",
  },
  {
    q: "What you do not want done to yourself, do not do to others.",
    a: "Confucius",
  },
  { q: "Everything has beauty, but not everyone sees it.", a: "Confucius" },
  {
    q: "It does not matter how slowly you go as long as you do not stop.",
    a: "Confucius",
  },
  {
    q: "The will to win, the desire to succeed, the urge to reach your full potential—these are the keys that will unlock the door to personal excellence.",
    a: "Confucius",
  },
  {
    q: "He who learns but does not think, is lost! He who thinks but does not learn is in great danger.",
    a: "Confucius",
  },
  {
    q: "Our greatest glory is not in never falling, but in rising every time we fall.",
    a: "Confucius",
  },
  {
    q: "The man who asks a question is a fool for a minute, the man who does not ask is a fool for life.",
    a: "Confucius",
  },
  { q: "Study the past if you would define the future.", a: "Confucius" },
  { q: "Wheresoever you go, go with all your heart.", a: "Confucius" },
  { q: "Everything has its beauty, but not everyone sees it.", a: "Confucius" },
  {
    q: "Life is really simple, but we insist on making it complicated.",
    a: "Confucius",
  },
  {
    q: "To see and listen to the wicked is already the beginning of wickedness.",
    a: "Confucius",
  },
  {
    q: "The superior man is modest in his speech, but exceeds in his actions.",
    a: "Confucius",
  },
  {
    q: "The only person you are destined to become is the person you decide to be.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "What lies behind us and what lies before us are tiny matters compared to what lies within us.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "For every minute you are angry you lose sixty seconds of happiness.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "Nothing great was ever achieved without enthusiasm.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "Adopt the pace of nature: her secret is patience.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "The reward of a thing well done is having done it.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "Once you make a decision, the universe conspires to make it happen.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "The creation of a thousand forests is in one acorn.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "Life consists in what a man is thinking of all day.",
    a: "Ralph Waldo Emerson",
  },
  { q: "Earth laughs in flowers.", a: "Ralph Waldo Emerson" },
  {
    q: "All life is an experiment. The more experiments you make the better.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "Write it on your heart that every day is the best day in the year.",
    a: "Ralph Waldo Emerson",
  },
  { q: "Beauty without expression is boring.", a: "Ralph Waldo Emerson" },
  { q: "Hitch your wagon to a star.", a: "Ralph Waldo Emerson" },
  {
    q: "The purpose of life is not to be happy. It is to be useful, honorable, compassionate.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "Live in the sunshine, swim the sea, drink the wild air.",
    a: "Ralph Waldo Emerson",
  },
  { q: "Nothing can bring you peace but yourself.", a: "Ralph Waldo Emerson" },
  { q: "Self-trust is the first secret of success.", a: "Ralph Waldo Emerson" },
  {
    q: "Do not go where the path may lead, go instead where there is no path and leave a trail.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "The years teach much which the days never know.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "It is not length of life, but depth of life.",
    a: "Ralph Waldo Emerson",
  },
  {
    q: "The mass of men lead lives of quiet desperation.",
    a: "Henry David Thoreau",
  },
  {
    q: "Go confidently in the direction of your dreams. Live the life you have imagined.",
    a: "Henry David Thoreau",
  },
  {
    q: "How vain it is to sit down to write when you have not stood up to live.",
    a: "Henry David Thoreau",
  },
  {
    q: "All misfortune is but a stepping stone to fortune.",
    a: "Henry David Thoreau",
  },
  {
    q: "Goodness is the only investment that never fails.",
    a: "Henry David Thoreau",
  },
  { q: "Simplify, simplify.", a: "Henry David Thoreau" },
  {
    q: "Could a greater miracle take place than for us to look through each other's eyes for an instant?",
    a: "Henry David Thoreau",
  },
  {
    q: "The price of anything is the amount of life you exchange for it.",
    a: "Henry David Thoreau",
  },
  { q: "Things do not change; we change.", a: "Henry David Thoreau" },
  { q: "Live deliberately.", a: "Henry David Thoreau" },
  {
    q: "The fault-finder will find faults even in paradise.",
    a: "Henry David Thoreau",
  },
  {
    q: "An early-morning walk is a blessing for the whole day.",
    a: "Henry David Thoreau",
  },
  {
    q: "What you get by achieving your goals is not as important as what you become by achieving your goals.",
    a: "Henry David Thoreau",
  },
  {
    q: "Rather than love, than money, than fame, give me truth.",
    a: "Henry David Thoreau",
  },
  {
    q: "Disobedience is the true foundation of liberty.",
    a: "Henry David Thoreau",
  },
  {
    q: "If a man does not keep pace with his companions, perhaps it is because he hears a different drummer.",
    a: "Henry David Thoreau",
  },
  {
    q: "Heaven is under our feet as well as over our heads.",
    a: "Henry David Thoreau",
  },
  {
    q: "The question is not what you look at, but what you see.",
    a: "Henry David Thoreau",
  },
  {
    q: "As if you could kill time without injuring eternity.",
    a: "Henry David Thoreau",
  },
  {
    q: "A man is rich in proportion to the number of things which he can afford to let alone.",
    a: "Henry David Thoreau",
  },
  {
    q: "The best thing a man can do for his culture when he is rich is to endeavor to carry out those schemes which when he was poor he formed.",
    a: "Henry David Thoreau",
  },
  {
    q: "If you have built castles in the air, your work need not be lost; that is where they should be.",
    a: "Henry David Thoreau",
  },
  {
    q: "The only way to tell the truth is to speak with kindness.",
    a: "Leo Tolstoy",
  },
  {
    q: "Everyone thinks of changing the world, but no one thinks of changing himself.",
    a: "Leo Tolstoy",
  },
  { q: "If you want to be happy, be.", a: "Leo Tolstoy" },
  {
    q: "All, everything that I understand, I understand only because I love.",
    a: "Leo Tolstoy",
  },
  {
    q: "The strongest of all warriors are these two — Time and Patience.",
    a: "Leo Tolstoy",
  },
  { q: "Boredom: the desire for desires.", a: "Leo Tolstoy" },
  { q: "The sole meaning of life is to serve humanity.", a: "Leo Tolstoy" },
  {
    q: "Without knowing what I am and why I am here, life is impossible.",
    a: "Leo Tolstoy",
  },
  {
    q: "There is no greatness where there is no simplicity, goodness, and truth.",
    a: "Leo Tolstoy",
  },
  {
    q: "One of the first conditions of happiness is that the link between man and nature shall not be broken.",
    a: "Leo Tolstoy",
  },
  {
    q: "We can know only that we know nothing. And that is the highest degree of human wisdom.",
    a: "Leo Tolstoy",
  },
  {
    q: "Wrong does not cease to be wrong because the majority share in it.",
    a: "Leo Tolstoy",
  },
  {
    q: "In the name of God, stop a moment, cease your work, look around you.",
    a: "Leo Tolstoy",
  },
  {
    q: "Art is not a handicraft, it is the transmission of feeling the artist has experienced.",
    a: "Leo Tolstoy",
  },
  { q: "The greatest truths are the simplest.", a: "Leo Tolstoy" },
  {
    q: "Kindness is the language which the deaf can hear and the blind can see.",
    a: "Mark Twain",
  },
  { q: "The secret of getting ahead is getting started.", a: "Mark Twain" },
  {
    q: "Courage is resistance to fear, mastery of fear—not absence of fear.",
    a: "Mark Twain",
  },
  {
    q: "Whenever you find yourself on the side of the majority, it is time to pause and reflect.",
    a: "Mark Twain",
  },
  {
    q: "Age is an issue of mind over matter. If you don't mind, it doesn't matter.",
    a: "Mark Twain",
  },
  {
    q: "Part of the secret of a success in life is to eat what you like and let the food fight it out inside.",
    a: "Mark Twain",
  },
  {
    q: "Good friends, good books, and a sleepy conscience: this is the ideal life.",
    a: "Mark Twain",
  },
  {
    q: "The best way to cheer yourself is to try to cheer someone else up.",
    a: "Mark Twain",
  },
  {
    q: "Truth is stranger than fiction, but it is because Fiction is obliged to stick to possibilities; Truth isn't.",
    a: "Mark Twain",
  },
  {
    q: "The difference between the right word and the almost right word is the difference between lightning and a lightning bug.",
    a: "Mark Twain",
  },
  {
    q: "If you tell the truth, you don't have to remember anything.",
    a: "Mark Twain",
  },
  {
    q: "Give every day the chance to become the most beautiful day of your life.",
    a: "Mark Twain",
  },
  {
    q: "To succeed in life, you need two things: ignorance and confidence.",
    a: "Mark Twain",
  },
  {
    q: "The human race has one really effective weapon, and that is laughter.",
    a: "Mark Twain",
  },
  {
    q: "A successful man is one who makes more money than his wife can spend. A successful woman is one who can find such a man.",
    a: "Mark Twain",
  },
  {
    q: "Never put off till tomorrow what may be done day after tomorrow just as well.",
    a: "Mark Twain",
  },
  {
    q: "I have never let my schooling interfere with my education.",
    a: "Mark Twain",
  },
  {
    q: "The fear of death follows from the fear of life. A man who lives fully is prepared to die at any time.",
    a: "Mark Twain",
  },
  {
    q: "Forgiveness is the fragrance that the violet sheds on the heel that has crushed it.",
    a: "Mark Twain",
  },
  {
    q: "It is never too late to be what you might have been.",
    a: "George Eliot",
  },
  {
    q: "It's never too late to be what you might have been.",
    a: "George Eliot",
  },
  {
    q: "O, may I join the choir invisible of those immortal dead who live again in minds made better by their presence.",
    a: "George Eliot",
  },
  {
    q: "Blessed is he who, when there is no good to be done, has no evil to do.",
    a: "George Eliot",
  },
  {
    q: "What do we live for, if it is not to make life less difficult for each other?",
    a: "George Eliot",
  },
  {
    q: "Animals are such agreeable friends—they ask no questions; they pass no criticisms.",
    a: "George Eliot",
  },
  {
    q: "The strongest principle of growth lies in human choice.",
    a: "George Eliot",
  },
  {
    q: "Our deeds still travel with us from afar, and what we have been makes us what we are.",
    a: "George Eliot",
  },
  {
    q: "A difference of taste in jokes is a great strain on the affections.",
    a: "George Eliot",
  },
  {
    q: "Life began with waking up and loving my mother's face.",
    a: "George Eliot",
  },
  {
    q: "Don't judge each day by the harvest you reap but by the seeds that you plant.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "Keep your fears to yourself, but share your courage with others.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "Our business in life is not to succeed, but to continue to fail in good spirits.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "The most beautiful adventures are often the most dangerous.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "Sooner or later everyone sits down to a banquet of consequences.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "To be wholly devoted to some intellectual exercise is to have succeeded in life.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "There is so much good in the worst of us, and so much bad in the best of us.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "We are all travelers in the wilderness of this world, and the best we can find in our travels is an honest friend.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "Keep your fears to yourself, but share your inspiration with others.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "The world is full of a number of things, I'm sure we should all be as happy as kings.",
    a: "Robert Louis Stevenson",
  },
  {
    q: "Each day is a little life: every waking and rising a little birth, every fresh morning a little youth.",
    a: "Arthur Schopenhauer",
  },
  {
    q: "All truth passes through three stages. First it is ridiculed. Second it is opposed. Third it is regarded as self-evident.",
    a: "Arthur Schopenhauer",
  },
  { q: "Compassion is the basis of morality.", a: "Arthur Schopenhauer" },
  {
    q: "The greatest of follies is to sacrifice health for any other type of happiness.",
    a: "Arthur Schopenhauer",
  },
  {
    q: "Every man takes the limits of his own field of vision for the limits of the world.",
    a: "Arthur Schopenhauer",
  },
  {
    q: "It is difficult to find happiness within oneself, but it is impossible to find it anywhere else.",
    a: "Arthur Schopenhauer",
  },
  {
    q: "The two enemies of human happiness are pain and boredom.",
    a: "Arthur Schopenhauer",
  },
  { q: "Change alone is unchanging.", a: "Heraclitus" },
  {
    q: "No man ever steps in the same river twice, for it's not the same river and he's not the same man.",
    a: "Heraclitus",
  },
  { q: "The sun is new each day.", a: "Heraclitus" },
  { q: "Character is destiny.", a: "Heraclitus" },
  { q: "Nothing endures but change.", a: "Heraclitus" },
  { q: "Much learning does not teach understanding.", a: "Heraclitus" },
  {
    q: "Opposition brings concord. Out of discord comes the fairest harmony.",
    a: "Heraclitus",
  },
  { q: "The only thing constant is change.", a: "Heraclitus" },
  { q: "The unexamined life is not worth living.", a: "Socrates" },
  { q: "Know thyself.", a: "Socrates" },
  {
    q: "I cannot teach anybody anything. I can only make them think.",
    a: "Socrates",
  },
  { q: "Wonder is the beginning of wisdom.", a: "Socrates" },
  { q: "Wisdom begins in wonder.", a: "Socrates" },
  {
    q: "The secret of happiness, you see is not found in seeking more, but in developing the capacity to enjoy less.",
    a: "Socrates",
  },
  {
    q: "He who is not contented with what he has, would not be contented with what he would like to have.",
    a: "Socrates",
  },
  {
    q: "Strong minds discuss ideas, average minds discuss events, weak minds discuss people.",
    a: "Socrates",
  },
  { q: "To find yourself, think for yourself.", a: "Socrates" },
  {
    q: "Be kind, for everyone you meet is fighting a hard battle.",
    a: "Plato",
  },
  { q: "Courage is knowing what not to fear.", a: "Plato" },
  { q: "Opinion is the medium between knowledge and ignorance.", a: "Plato" },
  { q: "At the touch of love everyone becomes a poet.", a: "Plato" },
  { q: "The beginning is the most important part of the work.", a: "Plato" },
  {
    q: "Wise men speak because they have something to say; fools because they have to say something.",
    a: "Plato",
  },
  { q: "The measure of a man is what he does with power.", a: "Plato" },
  { q: "Ignorance, the root and stem of all evil.", a: "Plato" },
  {
    q: "Music gives a soul to the universe, wings to the mind, flight to the imagination and life to everything.",
    a: "Plato",
  },
  {
    q: "One of the penalties for refusing to participate in politics is that you end up being governed by your inferiors.",
    a: "Plato",
  },
  { q: "The greatest wealth is to live content with little.", a: "Plato" },
  {
    q: "Courage is the first of human qualities because it is the quality which guarantees the others.",
    a: "Aristotle",
  },
  {
    q: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
    a: "Aristotle",
  },
  { q: "Happiness depends upon ourselves.", a: "Aristotle" },
  { q: "The whole is greater than the sum of its parts.", a: "Aristotle" },
  {
    q: "It is during our darkest moments that we must focus to see the light.",
    a: "Aristotle",
  },
  { q: "Knowing yourself is the beginning of all wisdom.", a: "Aristotle" },
  { q: "Patience is bitter, but its fruit is sweet.", a: "Aristotle" },
  { q: "Pleasure in the job puts perfection in the work.", a: "Aristotle" },
  { q: "Quality is not an act, it is a habit.", a: "Aristotle" },
  { q: "The energy of the mind is the essence of life.", a: "Aristotle" },
  {
    q: "It is well to be up before daybreak, for such habits contribute to health, wealth, and wisdom.",
    a: "Aristotle",
  },
  {
    q: "Dignity does not consist in possessing honors, but in deserving them.",
    a: "Aristotle",
  },
  { q: "Hope is a waking dream.", a: "Aristotle" },
  { q: "My best skill was that I was teachable.", a: "Aristotle" },
  {
    q: "What is a friend? A single soul dwelling in two bodies.",
    a: "Aristotle",
  },
  {
    q: "The roots of education are bitter, but the fruit is sweet.",
    a: "Aristotle",
  },
  { q: "We are what we repeatedly do.", a: "Aristotle" },
  { q: "Excellence is never an accident.", a: "Aristotle" },
  { q: "A friend to all is a friend to none.", a: "Aristotle" },
  {
    q: "The good of the community cannot be achieved without the good of individuals.",
    a: "Aristotle",
  },
  {
    q: "Waste no more time arguing what a good man should be. Be one.",
    a: "Marcus Aurelius",
  },
  {
    q: "The happiness of your life depends upon the quality of your thoughts.",
    a: "Marcus Aurelius",
  },
  {
    q: "You have power over your mind—not outside events. Realize this, and you will find strength.",
    a: "Marcus Aurelius",
  },
  {
    q: "The soul becomes dyed with the colour of its thoughts.",
    a: "Marcus Aurelius",
  },
  {
    q: "The best revenge is to be unlike him who performed the injury.",
    a: "Marcus Aurelius",
  },
  {
    q: "When you arise in the morning, think of what a privilege it is to be alive.",
    a: "Marcus Aurelius",
  },
  {
    q: "Very little is needed to make a happy life; it is all within yourself, your way of thinking.",
    a: "Marcus Aurelius",
  },
  {
    q: "The impediment to action advances action. What stands in the way becomes the way.",
    a: "Marcus Aurelius",
  },
  {
    q: "If it is not right do not do it; if it is not true do not say it.",
    a: "Marcus Aurelius",
  },
  {
    q: "The things you think about determine the quality of your mind.",
    a: "Marcus Aurelius",
  },
  {
    q: "Accept the things to which fate binds you, and love the people with whom fate brings you together.",
    a: "Marcus Aurelius",
  },
  {
    q: "Loss is nothing else but change, and change is Nature's delight.",
    a: "Marcus Aurelius",
  },
  {
    q: "The universe is change; our life is what our thoughts make it.",
    a: "Marcus Aurelius",
  },
  {
    q: "Do every act of your life as though it were the last act of your life.",
    a: "Marcus Aurelius",
  },
  {
    q: "Think of yourself as dead. You have lived your life. Now take what's left and live it properly.",
    a: "Marcus Aurelius",
  },
  {
    q: "You should banish any thought of how you appear to others.",
    a: "Marcus Aurelius",
  },
  {
    q: "The only wealth you keep forever is the wealth you give away.",
    a: "Marcus Aurelius",
  },
  {
    q: "A man's worth is no greater than his ambitions.",
    a: "Marcus Aurelius",
  },
  {
    q: "Do not act as if you had ten thousand years to live.",
    a: "Marcus Aurelius",
  },
  { q: "The present is all you have and can control.", a: "Marcus Aurelius" },
  { q: "No man can escape his destiny.", a: "Marcus Aurelius" },
  {
    q: "It never ceases to amaze me: we all love ourselves more than other people, but care more about their opinions than our own.",
    a: "Marcus Aurelius",
  },
  {
    q: "If you are pained by any external thing, it is not this thing that disturbs you, but your own judgment about it.",
    a: "Marcus Aurelius",
  },
  {
    q: "You have power over your mind, not outside events.",
    a: "Marcus Aurelius",
  },
  { q: "The best revenge is not to be like your enemy.", a: "Marcus Aurelius" },
  {
    q: "Luck is what happens when preparation meets opportunity.",
    a: "Seneca",
  },
  { q: "We suffer more often in imagination than in reality.", a: "Seneca" },
  {
    q: "It is not that we have a short time to live, but that we waste a lot of it.",
    a: "Seneca",
  },
  {
    q: "Difficulties strengthen the mind, as labor does the body.",
    a: "Seneca",
  },
  { q: "He who is brave is free.", a: "Seneca" },
  {
    q: "Begin at once to live, and count each separate day as a separate life.",
    a: "Seneca",
  },
  {
    q: "A gift consists not in what is done or given, but in the intention of the giver.",
    a: "Seneca",
  },
  {
    q: "If one does not know to which port one is sailing, no wind is favorable.",
    a: "Seneca",
  },
  { q: "While we wait for life, life passes.", a: "Seneca" },
  { q: "No man was ever wise by chance.", a: "Seneca" },
  {
    q: "We are more often frightened than hurt; and we suffer more in imagination than in reality.",
    a: "Seneca",
  },
  {
    q: "Life is long enough, and a sufficiently generous measure has been given to us for the highest achievements.",
    a: "Seneca",
  },
  { q: "Associate with people who are likely to improve you.", a: "Seneca" },
  {
    q: "Every new beginning comes from some other beginning's end.",
    a: "Seneca",
  },
  { q: "The greatest remedy for anger is delay.", a: "Seneca" },
  { q: "Luck never made a man wise.", a: "Seneca" },
  {
    q: "Hang on to your youthful enthusiasms—you'll be able to use them better when you're older.",
    a: "Seneca",
  },
  { q: "It is the power of the mind to be unconquerable.", a: "Seneca" },
  { q: "If you wish to be loved, love.", a: "Seneca" },
  {
    q: "True happiness is to enjoy the present, without anxious dependence upon the future.",
    a: "Seneca",
  },
  { q: "It is quality rather than quantity that matters.", a: "Seneca" },
  {
    q: "A man who suffers before it is necessary, suffers more than is necessary.",
    a: "Seneca",
  },
  { q: "Time discovers truth.", a: "Seneca" },
  {
    q: "The mind that is anxious about future events is miserable.",
    a: "Seneca",
  },
  {
    q: "We should give as we would receive, cheerfully, quickly, and without hesitation.",
    a: "Seneca",
  },
  { q: "The greatest wealth is a mind at peace.", a: "Seneca" },
  {
    q: "No great genius has existed without an element of madness.",
    a: "Seneca",
  },
  {
    q: "It is a rough road that leads to the heights of greatness.",
    a: "Lucius Annaeus Seneca",
  },
  {
    q: "Fortune is of chameleon-like hue, and the more diligently it is watched, the more quickly it changes.",
    a: "Seneca",
  },
  { q: "He who has great power should use it lightly.", a: "Seneca" },
  {
    q: "Do not spoil what you have by desiring what you have not.",
    a: "Epicurus",
  },
  {
    q: "Of all the means to insure happiness throughout the whole life, by far the most important is the acquisition of friends.",
    a: "Epicurus",
  },
  {
    q: "Not what we have but what we enjoy constitutes our abundance.",
    a: "Epicurus",
  },
  {
    q: "It is not so much our friend's help that helps us, as the confidence of their help.",
    a: "Epicurus",
  },
  {
    q: "The misfortune of the wise is better than the prosperity of the fool.",
    a: "Epicurus",
  },
  {
    q: "Eat and drink with your friends, but do not eat and drink without them.",
    a: "Epicurus",
  },
  {
    q: "He who is not satisfied with a little is satisfied with nothing.",
    a: "Epicurus",
  },
  {
    q: "Empty is the argument of the philosopher which does not relieve any human suffering.",
    a: "Epicurus",
  },
  {
    q: "The art of living well and the art of dying well are one.",
    a: "Epicurus",
  },
  {
    q: "A free life cannot acquire many possessions, because this is not easy to do without servility to mobs or monarchs.",
    a: "Epicurus",
  },
  { q: "Pleasure is the beginning and end of living happily.", a: "Epicurus" },
  { q: "There is no such thing as a useless life.", a: "Epicurus" },
  {
    q: "We are all in the gutter, but some of us are looking at the stars.",
    a: "Oscar Wilde",
  },
  { q: "Be yourself; everyone else is already taken.", a: "Oscar Wilde" },
  {
    q: "Always forgive your enemies; nothing annoys them so much.",
    a: "Oscar Wilde",
  },
  {
    q: "Experience is simply the name we give our mistakes.",
    a: "Oscar Wilde",
  },
  {
    q: "To live is the rarest thing in the world. Most people exist, that is all.",
    a: "Oscar Wilde",
  },
  {
    q: "A dreamer is one who can find his way by moonlight.",
    a: "Oscar Wilde",
  },
  { q: "The truth is rarely pure and never simple.", a: "Oscar Wilde" },
  {
    q: "The only way to get rid of temptation is to yield to it.",
    a: "Oscar Wilde",
  },
  {
    q: "Life is far too important a thing ever to talk seriously about.",
    a: "Oscar Wilde",
  },
  {
    q: "With freedom, books, flowers, and the moon, who could not be happy?",
    a: "Oscar Wilde",
  },
  {
    q: "The smallest act of kindness is worth more than the grandest intention.",
    a: "Oscar Wilde",
  },
  {
    q: "Every saint has a past, and every sinner has a future.",
    a: "Oscar Wilde",
  },
  { q: "Memory is the diary we all carry about with us.", a: "Oscar Wilde" },
  {
    q: "What seems to us as bitter trials are often blessings in disguise.",
    a: "Oscar Wilde",
  },
  {
    q: "A cynic is a man who knows the price of everything and the value of nothing.",
    a: "Oscar Wilde",
  },
  {
    q: "Keep love in your heart. A life without it is like a sunless garden when the flowers are dead.",
    a: "Oscar Wilde",
  },
  { q: "There is no sin except stupidity.", a: "Oscar Wilde" },
  {
    q: "To love oneself is the beginning of a lifelong romance.",
    a: "Oscar Wilde",
  },
  {
    q: "One should always play fairly when one has the winning cards.",
    a: "Oscar Wilde",
  },
  {
    q: "We are each our own devil, and we make this world our hell.",
    a: "Oscar Wilde",
  },
  {
    q: "Never love anyone who treats you like you're ordinary.",
    a: "Oscar Wilde",
  },
  {
    q: "The best way to appreciate your job is to imagine yourself without one.",
    a: "Oscar Wilde",
  },
  { q: "A good friend will always stab you in the front.", a: "Oscar Wilde" },
  {
    q: "Success is the one unpardonable sin against our fellows.",
    a: "Oscar Wilde",
  },
  {
    q: "There is only one thing in life worse than being talked about, and that is not being talked about.",
    a: "Oscar Wilde",
  },
  {
    q: "We know what we are, but know not what we may be.",
    a: "William Shakespeare",
  },
  { q: "To thine own self be true.", a: "William Shakespeare" },
  { q: "All the world's a stage.", a: "William Shakespeare" },
  {
    q: "The course of true love never did run smooth.",
    a: "William Shakespeare",
  },
  {
    q: "There is nothing either good or bad, but thinking makes it so.",
    a: "William Shakespeare",
  },
  { q: "Love all, trust a few, do wrong to none.", a: "William Shakespeare" },
  { q: "We are such stuff as dreams are made on.", a: "William Shakespeare" },
  {
    q: "Better three hours too soon than a minute too late.",
    a: "William Shakespeare",
  },
  { q: "All that glisters is not gold.", a: "William Shakespeare" },
  {
    q: "One touch of nature makes the whole world kin.",
    a: "William Shakespeare",
  },
  { q: "The lady doth protest too much, methinks.", a: "William Shakespeare" },
  { q: "Brevity is the soul of wit.", a: "William Shakespeare" },
  {
    q: "Some are born great, some achieve greatness, and some have greatness thrust upon them.",
    a: "William Shakespeare",
  },
  {
    q: "Our doubts are traitors, and make us lose the good we oft might win, by fearing to attempt.",
    a: "William Shakespeare",
  },
  { q: "Sweet are the uses of adversity.", a: "William Shakespeare" },
  {
    q: "There is nothing either good or bad but thinking makes it so.",
    a: "William Shakespeare",
  },
  { q: "If music be the food of love, play on.", a: "William Shakespeare" },
  { q: "The better part of valor is discretion.", a: "William Shakespeare" },
  { q: "Give every man thy ear, but few thy voice.", a: "William Shakespeare" },
  {
    q: "The fault, dear Brutus, is not in our stars, but in ourselves.",
    a: "William Shakespeare",
  },
  {
    q: "To mourn a mischief that is past and gone is the next way to draw new mischief on.",
    a: "William Shakespeare",
  },
  { q: "This above all: to thine own self be true.", a: "William Shakespeare" },
  { q: "What's past is prologue.", a: "William Shakespeare" },
  {
    q: "Love looks not with the eyes, but with the mind.",
    a: "William Shakespeare",
  },
  {
    q: "The robbed that smiles steals something from the thief.",
    a: "William Shakespeare",
  },
  { q: "Hell is empty and all the devils are here.", a: "William Shakespeare" },
  {
    q: "The golden age is before us, not behind us.",
    a: "William Shakespeare",
  },
  {
    q: "A fool thinks himself to be wise, but a wise man knows himself to be a fool.",
    a: "William Shakespeare",
  },
  { q: "No legacy is so rich as honesty.", a: "William Shakespeare" },
  { q: "To be, or not to be: that is the question.", a: "William Shakespeare" },
  { q: "There is a tide in the affairs of men.", a: "William Shakespeare" },
  { q: "Our remedies oft in ourselves do lie.", a: "William Shakespeare" },
  { q: "The wheel is come full circle.", a: "William Shakespeare" },
  {
    q: "If we are true to ourselves, we can never go wrong.",
    a: "William Shakespeare",
  },
  { q: "We are all fools in love.", a: "William Shakespeare" },
  { q: "Love is blind.", a: "William Shakespeare" },
  {
    q: "A little more than kin, and less than kind.",
    a: "William Shakespeare",
  },
  {
    q: "It is not in the stars to hold our destiny but in ourselves.",
    a: "William Shakespeare",
  },
  { q: "The quality of mercy is not strained.", a: "William Shakespeare" },
  { q: "To sleep: perchance to dream.", a: "William Shakespeare" },
  {
    q: "There is a special providence in the fall of a sparrow.",
    a: "William Shakespeare",
  },
  { q: "The empty vessel makes the loudest sound.", a: "William Shakespeare" },
  { q: "All's well that ends well.", a: "William Shakespeare" },
  { q: "All is but toys.", a: "William Shakespeare" },
  {
    q: "If we cannot make our lives beautiful, we can at least make our lives less ugly.",
    a: "Virginia Woolf",
  },
  { q: "Arrange whatever pieces come your way.", a: "Virginia Woolf" },
  {
    q: "One cannot think well, love well, sleep well, if one has not dined well.",
    a: "Virginia Woolf",
  },
  { q: "Books are the mirrors of the soul.", a: "Virginia Woolf" },
  {
    q: "As a woman I have no country. As a woman my country is the whole world.",
    a: "Virginia Woolf",
  },
  {
    q: "Without self-awareness we are as babies in the cradles.",
    a: "Virginia Woolf",
  },
  {
    q: "Growing up is losing some illusions, in order to acquire others.",
    a: "Virginia Woolf",
  },
  { q: "I am rooted, but I flow.", a: "Virginia Woolf" },
  {
    q: "It is in our idleness, in our dreams, that the submerged truth sometimes comes to the top.",
    a: "Virginia Woolf",
  },
  {
    q: "No need to hurry. No need to sparkle. No need to be anybody but oneself.",
    a: "Virginia Woolf",
  },
  {
    q: "The eyes of others our prisons; their thoughts our cages.",
    a: "Virginia Woolf",
  },
  {
    q: "A self that goes on changing is a self that goes on living.",
    a: "Virginia Woolf",
  },
  { q: "Language is wine upon the lips.", a: "Virginia Woolf" },
  {
    q: "So long as you write what you wish to write, that is all that matters.",
    a: "Virginia Woolf",
  },
  {
    q: "I would venture to guess that Anon, who wrote so many poems without signing them, was often a woman.",
    a: "Virginia Woolf",
  },
  {
    q: "Books must be read as deliberately and reservedly as they were written.",
    a: "Virginia Woolf",
  },
  { q: "The journey is everything.", a: "Virginia Woolf" },
  {
    q: "No one can think well, love well, sleep well, if one has not dined well.",
    a: "Virginia Woolf",
  },
  {
    q: "A woman must have money and a room of her own if she is to write fiction.",
    a: "Virginia Woolf",
  },
  {
    q: "A man's reach should exceed his grasp, or what's a heaven for?",
    a: "Robert Browning",
  },
  { q: "Grow old along with me! The best is yet to be.", a: "Robert Browning" },
  { q: "Less is more.", a: "Robert Browning" },
  {
    q: "Ah, but a man's reach should exceed his grasp, Or what's a heaven for?",
    a: "Robert Browning",
  },
  {
    q: "God's in his heaven—All's right with the world!",
    a: "Robert Browning",
  },
  {
    q: "The year's at the spring, and day's at the morn.",
    a: "Robert Browning",
  },
  { q: "Truth never was indebted to a lie.", a: "Edward Gibbon" },
  {
    q: "The winds and waves are always on the side of the ablest navigators.",
    a: "Edward Gibbon",
  },
  {
    q: "History is indeed little more than the register of the crimes, follies, and misfortunes of mankind.",
    a: "Edward Gibbon",
  },
  {
    q: "All that is human must retrograde if it does not advance.",
    a: "Edward Gibbon",
  },
  {
    q: "The courage of a soldier is found to be the cheapest of qualities in a battle.",
    a: "Edward Gibbon",
  },
  {
    q: "The history of the world is but the biography of great men.",
    a: "Thomas Carlyle",
  },
  {
    q: "A great man shows his greatness by the way he treats little men.",
    a: "Thomas Carlyle",
  },
  {
    q: "The block of granite which was an obstacle in the pathway of the weak becomes a stepping-stone in the pathway of the strong.",
    a: "Thomas Carlyle",
  },
  {
    q: "Nothing builds self-esteem and self-confidence like accomplishment.",
    a: "Thomas Carlyle",
  },
  {
    q: "Silence is deep as Eternity; speech is shallow as Time.",
    a: "Thomas Carlyle",
  },
  {
    q: "The greatest of faults is to be conscious of none.",
    a: "Thomas Carlyle",
  },
  {
    q: "Our main business is not to see what lies dimly at a distance, but to do what lies clearly at hand.",
    a: "Thomas Carlyle",
  },
  {
    q: "Adversity is the diamond dust Heaven polishes its jewels with.",
    a: "Thomas Carlyle",
  },
  {
    q: "The work an unknown good man has done is like a vein of water flowing hidden underground, secretly making the ground green.",
    a: "Thomas Carlyle",
  },
  {
    q: "Nothing is more terrible than activity without insight.",
    a: "Thomas Carlyle",
  },
  {
    q: "The eternal stars shine out as soon as it is dark enough.",
    a: "Thomas Carlyle",
  },
  {
    q: "The only happiness a brave man ever troubles himself with is to win his own respect.",
    a: "Thomas Carlyle",
  },
  {
    q: "He who has health has hope; and he who has hope has everything.",
    a: "Thomas Carlyle",
  },
  {
    q: "A man without a purpose is like a ship without a rudder.",
    a: "Thomas Carlyle",
  },
];
