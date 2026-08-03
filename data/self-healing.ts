// Auto-generated from docs

export interface LessonContent {
    type: 'intro' | 'science' | 'practice' | 'rating' | 'reflection' | 'conclusion';
    title?: string;
    quote?: string;
    author?: string;
    text: string[];
    image?: string;
    imageColor?: string;
    questions?: string[];
    ratingType?: 'confidence' | 'anxiety';
}

export interface Lesson {
    id: string;
    bookId: string;
    day: number;
    title: string;
    phase: string;
    description: string;
    content: LessonContent[];
}

export interface Book {
    id: string;
    title: string;
    subtitle: string;
    author: string;
    language: 'EN' | 'NL';
    coverColor: string;
    accentColor: string;
    description: string;
    totalDays: number;
    lessons: Lesson[];
}

export const BOOKS: Book[] = [
    {
        "id": "healing-journal-en",
        "title": "The Healing Journal",
        "subtitle": "A 30-Day Journey Back to Yourself",
        "author": "Joseph I.",
        "language": "EN",
        "coverColor": "bg-emerald-600",
        "accentColor": "emerald",
        "description": "A guided space for reflection, self-inquiry, and neuroplastic emotional healing.",
        "totalDays": 30,
        "lessons": [
            {
                "id": "healing-journal-en-1",
                "bookId": "healing-journal-en",
                "day": 1,
                "title": "Learning to Slow Down",
                "phase": "Week 1: Safety & Awareness",
                "description": "Learning to Slow Down",
                "content": [
                    {
                        "type": "intro",
                        "title": "Learning to Slow Down",
                        "quote": "\u201cRest is not the enemy of progress. It is often where progress quietly begins.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Learning to Slow Down",
                            "We live in a culture that treats speed as a virtue. The busier you are, the more important you must be. The faster you move, the more you must be achieving. Slow down, and someone might think you\u2019re falling behind."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "But something strange happens when we never slow down: we stop being able to hear ourselves think. Our inner life becomes noise. We lose track of what we actually feel, what we actually want, what is actually happening inside us. We become, in a very real sense, strangers to ourselves.",
                            "Slowing down is not laziness. Neurologically, it\u2019s one of the most productive things a human being can do. When we rest \u2014 genuinely rest, not just scroll-while-lying-down \u2014 the brain activates something called the default mode network. This is the system responsible for self-reflection, creative insight, emotional processing, and meaning-making. The brain is not idle when you\u2019re still. It\u2019s doing some of its most important work."
                        ],
                        "questions": [
                            "1.  When did you last feel genuinely unhurried? What was that like?",
                            "2.  What does \u201cbusy\u201d protect you from having to think about?",
                            "3.  What is one area of your life where you\u2019ve been rushing through things that deserve more attention?",
                            "4.  What would it look like to give yourself permission to slow down \u2014 not eventually, but today?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-2",
                "bookId": "healing-journal-en",
                "day": 2,
                "title": "Meeting Your Emotions",
                "phase": "Week 1: Safety & Awareness",
                "description": "Meeting Your Emotions",
                "content": [
                    {
                        "type": "intro",
                        "title": "Meeting Your Emotions",
                        "quote": "\u201cAn unfelt emotion doesn\u2019t disappear. It goes underground and waits.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Meeting Your Emotions",
                            "Most of us were never taught what to do with difficult emotions. We were taught to manage them, minimize them, or push through them. \u201cStop crying.\u201d \u201cToughen up.\u201d \u201cYou\u2019re overreacting.\u201d The message, repeated in a hundred small ways: feelings are problems to be solved, not signals to be heard."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "The irony is that emotions exist for a reason. Fear points toward danger. Anger often signals a violated boundary. Grief is the shape of love after loss. Loneliness is the body\u2019s way of saying that connection is needed. These are not bugs in the system. They are features.",
                            "The field of affective neuroscience \u2014 the study of how emotions work in the brain \u2014 has shown that when we suppress emotions, they don\u2019t diminish. They increase. Suppression requires ongoing cognitive effort, and it tends to amplify the physical experience of the feeling. The body holds what the mind refuses to acknowledge."
                        ],
                        "questions": [
                            "1.  What emotion do you most often try to avoid? What do you do to avoid it?",
                            "2.  When you were growing up, which emotions were acceptable in your home, and which weren\u2019t?",
                            "3.  What does your body do when you\u2019re anxious? What does it do when you\u2019re sad?",
                            "4.  If your current emotional state were trying to tell you something, what might it be saying?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-3",
                "bookId": "healing-journal-en",
                "day": 3,
                "title": "The Stories We Tell Ourselves",
                "phase": "Week 1: Safety & Awareness",
                "description": "The Stories We Tell Ourselves",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Stories We Tell Ourselves",
                        "quote": "\u201cThe narrative you repeat most often becomes the life you live most fully.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "The Stories We Tell Ourselves",
                            "Inside your head, there is a narrator. It\u2019s the voice that provides running commentary on everything that happens: what it means, why it happened, what it says about you, what\u2019s going to happen next. Most of the time, you don\u2019t notice this voice because you are the voice \u2014 or so it seems."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "But the narrator is not truth. It\u2019s interpretation. And interpretations can be wrong.",
                            "Cognitive Behavioral Therapy, one of the most well-researched approaches in psychology, is built on a simple but profound insight: our thoughts about events shape our emotional responses to them more than the events themselves do. Two people can experience the same rejection and draw completely different conclusions \u2014 one thinking, \u201cThey don\u2019t know what they\u2019re missing,\u201d and the other, \u201cI knew I wasn\u2019t good enough.\u201d The event is identical. The story is different. And the story is everything."
                        ],
                        "questions": [
                            "Think of a situation that\u2019s been bothering you recently. Write down your automatic thought about it \u2014 the first thing your mind says. Then ask: Is this thought a fact, or an interpretation? What evidence supports it? What evidence contradicts it? Is there another explanation that\u2019s equally plausible?",
                            "1.  What is a story about yourself that you\u2019ve been telling for so long you\u2019ve stopped questioning it?",
                            "2.  Where did that story originally come from? Who first told it to you?",
                            "3.  If you could rewrite that story with the same facts but a more compassionate narrator, how would it read?",
                            "4.  What would change in your life if you stopped believing that story?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-4",
                "bookId": "healing-journal-en",
                "day": 4,
                "title": "Rest as Resistance",
                "phase": "Week 1: Safety & Awareness",
                "description": "Rest as Resistance",
                "content": [
                    {
                        "type": "intro",
                        "title": "Rest as Resistance",
                        "quote": "\u201cIn a world that profits from your exhaustion, choosing to rest is a quiet act of rebellion.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Rest as Resistance",
                            "We have confused rest with laziness for so long that many people feel guilty when they stop. There is a specific kind of shame that arrives when you sit without accomplishing something \u2014 a creeping sense that you are wasting time, falling behind, taking more than you deserve."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "That shame is not yours. It was taught to you.",
                            "Research from sleep science, stress physiology, and restorative neurology is unambiguous: the human body and mind require rest not as a luxury but as a biological necessity. The brain consolidates memory during sleep. The nervous system down-regulates during genuine relaxation. Emotional processing \u2014 the kind that allows us to integrate difficult experiences rather than just survive them \u2014 requires time and stillness."
                        ],
                        "questions": [
                            "1.  How do you feel when you rest? Is there guilt? Relief? Anxiety? Numbness?",
                            "2.  When did you last feel fully rested? What made that possible?",
                            "3.  What beliefs do you carry about what you need to \u201cdeserve\u201d rest?",
                            "4.  What is one form of rest that genuinely restores you (not just numbs you)?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-5",
                "bookId": "healing-journal-en",
                "day": 5,
                "title": "Understanding Anxiety",
                "phase": "Week 1: Safety & Awareness",
                "description": "Understanding Anxiety",
                "content": [
                    {
                        "type": "intro",
                        "title": "Understanding Anxiety",
                        "quote": "\u201cAnxiety is not a sign that something is wrong with you. It is a sign that your mind is working very hard to keep you safe.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Understanding Anxiety",
                            "Anxiety is one of the most misunderstood experiences in human psychology. We treat it as an enemy \u2014 something to be eliminated, defeated, or medicated away. But anxiety is not a malfunction. It is the brain\u2019s threat-detection system doing its job."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "The problem is that this system was calibrated for a world that no longer exists. The amygdala \u2014 the almond-sized region deep in the brain responsible for fear responses \u2014 cannot easily distinguish between a physical predator and an unanswered email. It responds to perceived threat with the same urgency in either case: heart rate rises, muscles tense, breath shallows. We call this the fight-or-flight response, and for most of human history, it was extraordinarily useful.",
                            "In the modern world, the threats are rarely physical. They\u2019re social, professional, relational, existential. But the body responds the same way. And when anxiety becomes chronic \u2014 when the alarm never stops ringing \u2014 it becomes exhausting."
                        ],
                        "questions": [
                            "1.  What does anxiety feel like in your body? Where does it live?",
                            "2.  What are the most common triggers for your anxiety?",
                            "3.  What do you typically do when anxiety arrives? Does it help?",
                            "4.  If anxiety is trying to protect you, what is it most afraid you\u2019ll lose?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-6",
                "bookId": "healing-journal-en",
                "day": 6,
                "title": "Honoring Grief",
                "phase": "Week 1: Safety & Awareness",
                "description": "Honoring Grief",
                "content": [
                    {
                        "type": "intro",
                        "title": "Honoring Grief",
                        "quote": "\u201cGrief is not something you get over. It is something you learn to carry, and slowly it becomes less heavy.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Honoring Grief",
                            "Grief is not only about death. It arrives whenever we lose something that mattered: a relationship, a version of ourselves, a future we imagined, a period of our life that is over. It shows up as sadness, yes, but also as anger, numbness, confusion, and a strange kind of longing for something that can no longer be exactly what it was."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "David Kessler, who spent decades working alongside Elisabeth K\u00fcbler-Ross, recently proposed a sixth stage of grief beyond the classic five: finding meaning. Not \u201cEverything happens for a reason\u201d \u2014 a phrase that tends to insult grief more than comfort it. But the possibility that even in loss, we can discover something about what matters to us, who we love, and what we are made of.",
                            "Grief, when allowed to exist, tends to move. When pushed down, it tends to calcify. Many people who struggle with chronic low-grade numbness, unexplained irritability, or a sense that life has lost color are actually carrying grief that was never given space."
                        ],
                        "questions": [
                            "Write about something you have lost \u2014 not necessarily through death, but something that genuinely mattered to you. Don\u2019t try to silver-line it or find the lesson. Just describe the loss honestly. What did it feel like? What do you miss?",
                            "1.  What loss in your life has never fully been grieved?",
                            "2.  What are you afraid would happen if you let yourself feel that grief fully?",
                            "3.  Is there a version of yourself you\u2019ve lost \u2014 younger, more hopeful, more free \u2014 that you quietly mourn?",
                            "4.  What did the thing you lost teach you about what matters most to you?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-7",
                "bookId": "healing-journal-en",
                "day": 7,
                "title": "Asking for Help",
                "phase": "Week 1: Safety & Awareness",
                "description": "Asking for Help",
                "content": [
                    {
                        "type": "intro",
                        "title": "Asking for Help",
                        "quote": "\u201cThe bravest sentence in the English language might be: I can\u2019t do this alone.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Asking for Help",
                            "Somewhere along the way, many of us learned that needing help was something to be ashamed of. Independence was virtuous. Self-sufficiency was strength. Asking for support meant you were a burden, or weak, or hadn\u2019t tried hard enough."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "This idea is not only untrue. It is actively harmful.",
                            "Human beings are, at a biological level, designed for interdependence. We evolved in social groups where cooperation was survival. The isolation of modern life is genuinely unprecedented in human history, and research consistently shows that chronic loneliness \u2014 the kind that comes from disconnection, not solitude \u2014 is associated with worse physical and mental health outcomes than smoking."
                        ],
                        "questions": [
                            "1.  What is the story you tell yourself about why you shouldn\u2019t need help?",
                            "2.  When did you learn that needing others was something to hide?",
                            "3.  Who in your life makes you feel safe enough to be honest about how you\u2019re doing?",
                            "4.  What would you say to a friend who said they were afraid to ask for help?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-8",
                "bookId": "healing-journal-en",
                "day": 8,
                "title": "The Inner Critic",
                "phase": "Week 2: Foundations & Boundaries",
                "description": "The Inner Critic",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Inner Critic",
                        "quote": "\u201cThe harshest voice in the room is often the one that lives inside your own head.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "The Inner Critic",
                            "Most people have an inner critic. That voice that notices every mistake, replays every embarrassing moment, and offers a running commentary on everything that could go wrong. Some people call it their conscience. Many mistake it for honesty."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "It is neither.",
                            "The inner critic is a learned voice, usually assembled in childhood from the messages of parents, teachers, peers, and culture. It sounds like you, but it\u2019s not. It\u2019s a collection of other people\u2019s fears and judgments that took up residence in your mind and learned to speak in the first person."
                        ],
                        "questions": [
                            "1.  What does your inner critic sound like? Does it remind you of anyone from your past?",
                            "2.  What is it most afraid will happen if you stop criticizing yourself?",
                            "3.  How would your life be different if you spoke to yourself the way you speak to the people you love most?",
                            "4.  What is one thing your inner critic says most often that deserves to be challenged?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-9",
                "bookId": "healing-journal-en",
                "day": 9,
                "title": "Boundaries",
                "phase": "Week 2: Foundations & Boundaries",
                "description": "Boundaries",
                "content": [
                    {
                        "type": "intro",
                        "title": "Boundaries",
                        "quote": "\u201cA boundary is not a wall. It is a door with a lock \u2014 and you hold the key.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Boundaries",
                            "The word \u201cboundary\u201d has been used so often in popular psychology that it has started to lose its meaning. But boundaries are not trendy. They are a fundamental feature of psychological health."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "A boundary is simply a limit you set around your own time, energy, emotions, or body \u2014 a declaration of what you will and won\u2019t make available, and under what conditions. Boundaries are not punishments. They are not rejection. They are information about who you are and what you need.",
                            "People who struggle with boundaries tend to have learned, at some point, that saying no was dangerous. That their needs were too much. That love was conditional on compliance. As a result, they became skilled at reading what others needed and shaping themselves accordingly \u2014 a strategy that works in the short term and costs enormously in the long."
                        ],
                        "questions": [
                            "Identify one area of your life where you\u2019ve been giving more than feels sustainable. Write about it honestly: what are you tolerating that doesn\u2019t actually work for you? What would a reasonable limit look like?",
                            "1.  In which relationships do you find it hardest to set limits? Why?",
                            "2.  What do you fear will happen if you start asking for what you actually need?",
                            "3.  What is one limit you wish you had set long ago?",
                            "4.  What does \u201cnot my responsibility\u201d feel like in your body? Can you locate it?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-10",
                "bookId": "healing-journal-en",
                "day": 10,
                "title": "People Pleasing",
                "phase": "Week 2: Foundations & Boundaries",
                "description": "People Pleasing",
                "content": [
                    {
                        "type": "intro",
                        "title": "People Pleasing",
                        "quote": "\u201cThe loneliest place on earth is inside a version of yourself that you built for other people.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "People Pleasing",
                            "People pleasing is not kindness. It can look like kindness from the outside, but inside it often feels like fear."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "This pattern usually starts early. Children who learn that love is conditional \u2014 that approval is earned rather than given \u2014 become experts at reading the room. They develop extraordinary sensitivity to other people\u2019s moods and needs. They learn to minimize themselves.",
                            "In adulthood, this looks like an inability to disappoint anyone, a deep anxiety about conflict, and a growing disconnection from their own wants. Over time, people pleasers often find that they have no idea who they actually are \u2014 because they\u2019ve spent so long being whoever others needed them to be."
                        ],
                        "questions": [
                            "The people-pleaser says yes when they mean no. They agree with things they don\u2019t actually agree with. They shape their opinions, their humor, their appearance, and sometimes their entire life around what they imagine others want. And behind all of it is a single, exhausting question: Am I likable enough to be kept?",
                            "Write about a recent situation where you said or did something you didn\u2019t actually want to in order to maintain harmony or approval. What did you feel? What did you want to say instead?",
                            "1.  Whose approval do you work hardest to maintain? What would happen if you stopped?",
                            "2.  What opinions or preferences have you hidden from others because you were afraid of their reaction?",
                            "3.  What\u2019s the difference between genuine generosity and the kind that comes from fear?",
                            "4.  If you didn\u2019t care what anyone thought, what would change about how you live?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-11",
                "bookId": "healing-journal-en",
                "day": 11,
                "title": "Forgiveness",
                "phase": "Week 2: Foundations & Boundaries",
                "description": "Forgiveness",
                "content": [
                    {
                        "type": "intro",
                        "title": "Forgiveness",
                        "quote": "\u201cForgiveness is not about excusing what happened. It is about refusing to let what happened continue to run your life.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Forgiveness",
                            "Forgiveness might be the most misunderstood concept in the psychology of healing. It is not condoning what someone did. It is not forgetting. It is not reconciliation, or pretending the hurt didn\u2019t happen, or maintaining a relationship with someone who caused you harm."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Forgiveness is a decision you make for yourself, not for them.",
                            "Research by psychologist Fred Luskin at Stanford found that carrying unforgiveness \u2014 chronic resentment, anger, or rumination about past wrongs \u2014 is associated with elevated stress hormones, worse cardiovascular health, and lower life satisfaction. The person we resent is often living their life unbothered. We are the ones paying the cost."
                        ],
                        "questions": [
                            "Forgiving someone is hard. And some things are genuinely very hard to forgive. There is no timeline and no obligation to rush. But as you do this work, it\u2019s worth asking: who has your resentment cost more \u2014 them, or you?",
                            "Write about someone (including yourself) you haven\u2019t forgiven. Not to justify what they did, but to understand what holding onto it has cost you. What emotions are you carrying that started with this wound?",
                            "1.  What or who are you still carrying anger or hurt about that you haven\u2019t addressed?",
                            "2.  What would it mean for your daily life if you genuinely let that go?",
                            "3.  Is there something you\u2019ve done that you haven\u2019t forgiven yourself for?",
                            "4.  What story about the past keeps you from fully inhabiting the present?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-12",
                "bookId": "healing-journal-en",
                "day": 12,
                "title": "The Body Keeps Score",
                "phase": "Week 2: Foundations & Boundaries",
                "description": "The Body Keeps Score",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Body Keeps Score",
                        "quote": "\u201cYour nervous system doesn\u2019t lie. What the mind forgets, the body still remembers.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "The Body Keeps Score",
                            "Trauma and chronic stress don\u2019t only live in our thoughts. They live in our bodies."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Bessel van der Kolk\u2019s landmark work in trauma research revealed that traumatic experiences are stored not primarily as narratives but as physical sensations \u2014 as muscle tension, as changes in breathing, as chronic arousal or numbness. The body, in other words, keeps score.",
                            "This means that healing cannot happen only through insight and reflection. At some point, it has to come through the body too. This is why practices like yoga, breathwork, movement, and somatic therapy have become increasingly important in trauma treatment \u2014 not because talking doesn\u2019t help, but because the nervous system needs its own kind of processing."
                        ],
                        "questions": [
                            "1.  Where in your body do you most often feel stress? What does it feel like?",
                            "2.  Is there a physical sensation you frequently ignore or override? What is it?",
                            "3.  What does your body feel like when you\u2019re truly at ease? When did you last feel that?",
                            "4.  What would it mean to trust your body\u2019s signals more than you currently do?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-13",
                "bookId": "healing-journal-en",
                "day": 13,
                "title": "Self-Worth",
                "phase": "Week 2: Foundations & Boundaries",
                "description": "Self-Worth",
                "content": [
                    {
                        "type": "intro",
                        "title": "Self-Worth",
                        "quote": "\u201cYour value does not decrease based on someone\u2019s inability to see it.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Self-Worth",
                            "Self-worth is not self-esteem. Self-esteem is conditional \u2014 it rises when things go well and falls when they don\u2019t. It\u2019s dependent on performance, appearance, approval, and outcomes."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Self-worth, by contrast, is the belief that you have inherent value simply because you exist. Not because of what you produce, how you look, what you\u2019ve achieved, or what anyone thinks of you. Just because you are here.",
                            "Most of us were given conditional messages about our worth: you are valuable when you succeed, when you please, when you comply. These messages often came from people who meant well. But the internalized belief \u2014 I must earn my place \u2014 is one of the most painful things a person can carry."
                        ],
                        "questions": [
                            "Write down three qualities you have that exist independent of your achievements or what anyone thinks of you. Not skills or accomplishments \u2014 qualities. Who are you when no one is watching?",
                            "1.  What do you believe you have to do or be in order to deserve love and belonging?",
                            "2.  Where did that belief come from?",
                            "3.  How would you treat yourself differently if you genuinely believed your worth was unconditional?",
                            "4.  When do you feel most like your truest self \u2014 free of performance and self-consciousness?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-14",
                "bookId": "healing-journal-en",
                "day": 14,
                "title": "Loneliness",
                "phase": "Week 2: Foundations & Boundaries",
                "description": "Loneliness",
                "content": [
                    {
                        "type": "intro",
                        "title": "Loneliness",
                        "quote": "\u201cYou can be in a room full of people and feel completely alone. That\u2019s not a statement about the room. It\u2019s a statement about the connection.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Loneliness",
                            "Loneliness is not the same as being alone. Solitude \u2014 chosen aloneness \u2014 can be nourishing, even essential. Loneliness is the painful experience of feeling disconnected from others, unseen or unknown, even in their presence."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Johann Hari, in his research on depression, found that one of the most consistent contributors to emotional suffering is not chemical imbalance alone, but disconnection \u2014 from other people, from meaningful work, from nature, from something larger than ourselves. We are, at our core, a social species. And when those bonds are absent or hollow, we feel it in ways that go beyond sadness.",
                            "Social researcher Vivek Murthy, who served as US Surgeon General, has described loneliness as an epidemic with serious physical health consequences \u2014 comparable to smoking 15 cigarettes a day. The body does not distinguish between emotional pain and physical pain. They activate the same neural circuits."
                        ],
                        "questions": [
                            "Write about what genuine connection would look like for you. Not surface-level socializing, but the kind where you feel truly known. Who offers that? What prevents you from seeking it out?",
                            "1.  What is the difference between loneliness and solitude in your experience?",
                            "2.  Is there a way you might be inadvertently preventing connection in your life?",
                            "3.  Who in your life sees the real you \u2014 not the version you perform for others?",
                            "4.  What would it take for you to feel genuinely less alone?",
                            "What has genuinely shifted in the last 15 days, even subtly?",
                            "What still hurts, and deserves more attention?",
                            "What surprised you about yourself in these first two weeks?",
                            "Write to yourself from a place of honesty and gentleness. What do you want the second half of this journey to be about?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-15",
                "bookId": "healing-journal-en",
                "day": 15,
                "title": "Identity",
                "phase": "Week 3: Reframing & Identity",
                "description": "Identity",
                "content": [
                    {
                        "type": "intro",
                        "title": "Identity",
                        "quote": "\u201cKnowing who you are not is one of the first steps toward knowing who you are.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Identity",
                            "Many people go through long stretches of life living an identity that was built by committee: assembled from the expectations of parents, the validation of peers, the demands of jobs, and the roles that made people easier to love. They wake up one day \u2014 sometimes at thirty, sometimes at fifty \u2014 and realize they have no idea who they actually are."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "This is not a crisis. It is an invitation.",
                            "Identity is not fixed. Erik Erikson, the developmental psychologist who mapped the stages of human identity, showed that the question \u201cWho am I?\u201d doesn\u2019t stop being relevant after adolescence. People return to it at every major life transition. Loss, endings, and ruptures all strip away the identities we had built \u2014 and create space for something more genuine."
                        ],
                        "questions": [
                            "List 10 values (e.g., honesty, creativity, freedom, connection, adventure, loyalty, peace). Circle the three that feel most essential to who you actually are. Then write: when did you last live in full alignment with each one?",
                            "1.  Which parts of your identity feel genuinely yours, and which feel like costumes you wear for others?",
                            "2.  If you stripped away your job, your relationships, and your roles, who are you?",
                            "3.  What version of yourself do you keep hiding, and why?",
                            "4.  What would it feel like to live more consistently from your actual values?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-16",
                "bookId": "healing-journal-en",
                "day": 16,
                "title": "Acceptance",
                "phase": "Week 3: Reframing & Identity",
                "description": "Acceptance",
                "content": [
                    {
                        "type": "intro",
                        "title": "Acceptance",
                        "quote": "\u201cAcceptance is not giving up. It is choosing not to waste energy fighting what cannot be changed.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Acceptance",
                            "Acceptance is one of the most misunderstood concepts in psychology. People often mistake it for resignation \u2014 giving up, surrendering, losing hope. It is none of those things."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Acceptance, as defined in Acceptance and Commitment Therapy, is the willingness to have experiences \u2014 thoughts, feelings, memories, sensations \u2014 without unnecessary struggle. It is saying: this is real, and I am going to stop spending my energy trying to make it not be real.",
                            "The paradox of acceptance is well-documented: the more we fight difficult experiences, the stronger they become. The more we allow them without resistance, the more they tend to lose their grip. This is not wishful thinking. It is the consistent finding of decades of psychological research."
                        ],
                        "questions": [
                            "Think of something in your life you\u2019ve been resisting \u2014 a circumstance, an emotion, a fact about your past or present. Write about what it would mean to accept it \u2014 not to like it, but to stop fighting its existence. How might your energy be freed if you did?",
                            "1.  What reality in your life are you spending energy trying to not accept?",
                            "2.  What has that resistance cost you?",
                            "3.  Is there a difference between accepting something and condoning it?",
                            "4.  What could you do with the energy currently spent on resistance?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-17",
                "bookId": "healing-journal-en",
                "day": 17,
                "title": "Perfectionism",
                "phase": "Week 3: Reframing & Identity",
                "description": "Perfectionism",
                "content": [
                    {
                        "type": "intro",
                        "title": "Perfectionism",
                        "quote": "\u201cPerfectionism is the belief that if you judge yourself first and hardest, you won\u2019t give others the chance.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Perfectionism",
                            "Perfectionism is not the same as high standards. High standards are healthy \u2014 they push us to do work we\u2019re proud of and to live by our values. Perfectionism is something different: it is the belief that mistakes are catastrophic, that imperfection is evidence of unworthiness, and that the only way to be safe is to be flawless."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Bren\u00e9 Brown, whose research on shame and vulnerability has reached millions of people, describes perfectionism as \u201ca 20-ton shield\u201d we carry around thinking it will protect us, when actually it prevents us from being seen.",
                            "Perfectionism is driven by shame, not excellence. The perfectionist isn\u2019t striving for quality \u2014 they\u2019re fleeing judgment. And because judgment is never fully avoidable, perfectionism becomes a prison with no exit."
                        ],
                        "questions": [
                            "Write about one area of your life where perfectionism has kept you stuck or prevented you from starting something you want to do. What are you afraid will happen if you do it imperfectly?",
                            "1.  In what areas of life do your standards tip from helpful into punishing?",
                            "2.  What are you most afraid people will see if your imperfections are visible?",
                            "3.  Have you ever been genuinely moved by someone\u2019s polished, perfect presentation? Or by their honest, imperfect one?",
                            "4.  What might you attempt if you gave yourself permission to do it imperfectly?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-18",
                "bookId": "healing-journal-en",
                "day": 18,
                "title": "Rumination",
                "phase": "Week 3: Reframing & Identity",
                "description": "Rumination",
                "content": [
                    {
                        "type": "intro",
                        "title": "Rumination",
                        "quote": "\u201cYour mind doesn\u2019t replay the past to torture you. It does so because it believes something important is still unresolved.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Rumination",
                            "Rumination is the mental habit of replaying the same thoughts, events, or worries on a loop \u2014 turning them over and over without arriving at anything new. Almost everyone does it. For some, it becomes near-constant."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Most people believe that if they think about a problem long enough, they will eventually solve it. But rumination isn\u2019t the same as problem-solving. Problem-solving moves forward \u2014 it generates options, considers actions, arrives at conclusions. Rumination circles \u2014 it reviews the same territory, reaching the same conclusions, producing the same feelings.",
                            "Research by psychologist Susan Nolen-Hoeksema found that rumination is one of the strongest predictors of depression and anxiety. It is also self-sustaining: the longer you ruminate, the more your brain learns that ruminating is what you do in response to difficulty, and the easier it becomes to slip into."
                        ],
                        "questions": [
                            "1.  What thought or memory do you return to most often? What do you think it\u2019s unresolved about?",
                            "2.  What do you gain from revisiting this? What do you lose?",
                            "3.  If a close friend were stuck in the same loop, what would you tell them?",
                            "4.  What would it take for your mind to feel like that chapter is closed?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-19",
                "bookId": "healing-journal-en",
                "day": 19,
                "title": "The Inner Child",
                "phase": "Week 3: Reframing & Identity",
                "description": "The Inner Child",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Inner Child",
                        "quote": "\u201cThe child you once were is still in there. They never stopped needing to be seen.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "The Inner Child",
                            "Inner child work sounds like the kind of thing that only exists in certain therapy circles. But the concept rests on something straightforward and well-supported by attachment research."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Most of the emotional patterns we carry in adulthood \u2014 the fear of abandonment, the need for approval, the difficulty with anger, the belief that we are too much or not enough \u2014 were formed in childhood. They were the emotional conclusions we drew about the world based on early experiences. And because those conclusions were made by a small person who had limited capacity for reasoning about context and complexity, they are often inaccurate.",
                            "John Bowlby\u2019s attachment theory demonstrated that the way we experienced connection with our earliest caregivers creates templates \u2014 internal working models \u2014 that we carry into every relationship we have thereafter. We expect new people to treat us the way the first people did. We respond to new situations with the emotional tools available to us at five, or eight, or twelve."
                        ],
                        "questions": [
                            "1.  What did the child you once were most need from the adults around them?",
                            "2.  Which of your current emotional patterns can you trace back to early experiences?",
                            "3.  What would it mean to treat your inner child with compassion rather than impatience?",
                            "4.  What parts of your childhood self are you most proud of? Most sad for?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-20",
                "bookId": "healing-journal-en",
                "day": 20,
                "title": "Trust",
                "phase": "Week 3: Reframing & Identity",
                "description": "Trust",
                "content": [
                    {
                        "type": "intro",
                        "title": "Trust",
                        "quote": "\u201cTrust is rebuilt not in a single decision but in a thousand small ones.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Trust",
                            "Trust is one of the things most commonly broken by painful experiences \u2014 and one of the hardest to rebuild."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "When we\u2019ve been betrayed, abandoned, or disappointed by people we depended on, the nervous system learns a lesson: people are not safe. Love is dangerous. Connection leads to loss. These are protective conclusions. They make sense given the evidence available.",
                            "But they can also calcify into walls."
                        ],
                        "questions": [
                            "Write about the specific experience that made trust most difficult for you. Not to relive it, but to acknowledge: this is where the belief that people can\u2019t be trusted came from. Then ask: is that belief serving you now, or limiting you?",
                            "1.  What experiences most shaped your current ability to trust?",
                            "2.  In what situations do you find trust easiest? In what situations is it nearly impossible?",
                            "3.  How much do you trust yourself \u2014 your instincts, your judgment, your capacity to handle hard things?",
                            "4.  What would need to happen for you to feel safe enough to trust again?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-21",
                "bookId": "healing-journal-en",
                "day": 21,
                "title": "Purpose",
                "phase": "Week 3: Reframing & Identity",
                "description": "Purpose",
                "content": [
                    {
                        "type": "intro",
                        "title": "Purpose",
                        "quote": "\u201cPurpose is not something you find like a key under a mat. It\u2019s something you build by paying attention to what makes you feel most alive.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Purpose",
                            "The question of purpose \u2014 why am I here, what does my life mean, what am I supposed to be doing \u2014 can feel either deeply motivating or deeply terrifying, depending on where you are in your life."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Victor Frankl, who survived the Nazi concentration camps and went on to develop logotherapy, argued that the search for meaning is the primary human drive. His work showed that people could endure almost anything if they had a reason to. And that in the absence of meaning, suffering becomes unbearable in a way that suffering-with-meaning is not.",
                            "Purpose doesn\u2019t need to be grand. Research by psychologist Michael Steger suggests that meaning in life is less about finding a single massive purpose and more about the accumulation of smaller experiences that feel significant: the relationship that matters, the work that contributes, the creative act that expresses something true."
                        ],
                        "questions": [
                            "Write about three moments in your life when you felt genuinely alive and engaged. Not happy, necessarily, but present and purposeful. What were the common elements?",
                            "1.  What would you do if you knew no one was watching and you couldn\u2019t fail?",
                            "2.  When do you feel most like yourself? Most engaged? Most useful?",
                            "3.  What has always mattered to you, even before you had language for it?",
                            "4.  If you could contribute one thing to the world before you die, what would it be?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-22",
                "bookId": "healing-journal-en",
                "day": 22,
                "title": "Courage",
                "phase": "Week 4: Integration & Thriving",
                "description": "Courage",
                "content": [
                    {
                        "type": "intro",
                        "title": "Courage",
                        "quote": "\u201cCourage is not the absence of fear. It is deciding that something matters more than the fear does.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Courage",
                            "Courage has been romanticized in a way that makes it feel like something available only to extraordinary people in extraordinary circumstances. But the courage that changes ordinary lives is quieter than that."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "It is the courage to have the difficult conversation. To leave the relationship that is slowly diminishing you. To try something you might fail at. To disagree with someone whose approval you need. To show your real self to people who only know the edited version.",
                            "Acts of Valor research by psychologists Cynthia Pury and Shane Lopez found that personal courage \u2014 the kind most of us face in daily life \u2014 is defined not by the absence of fear but by action taken in spite of it. Courage, in other words, always involves fear. It just also involves something else: the decision that the thing you\u2019re afraid of is worth facing."
                        ],
                        "questions": [
                            "Write about one area of your life where you have been choosing avoidance over courage. What would the courageous action look like? What are you most afraid would happen if you took it?",
                            "1.  When was the last time you did something that required real courage? How did it feel afterward?",
                            "2.  What\u2019s something you\u2019ve been wanting to do for months but keep finding reasons not to?",
                            "3.  What is fear costing you in your life right now?",
                            "4.  Who do you know who exhibits the kind of courage you most admire? What can you learn from them?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-23",
                "bookId": "healing-journal-en",
                "day": 23,
                "title": "Gratitude",
                "phase": "Week 4: Integration & Thriving",
                "description": "Gratitude",
                "content": [
                    {
                        "type": "intro",
                        "title": "Gratitude",
                        "quote": "\u201cGratitude is not about pretending everything is fine. It is about finding what is real and good, even when it is surrounded by what is hard.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Gratitude",
                            "Gratitude has become a wellness clich\u00e9, and that\u2019s unfortunate, because the science behind it is genuinely compelling."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Robert Emmons, the psychologist who has perhaps studied gratitude more thoroughly than anyone, found that people who practiced regular gratitude \u2014 specifically, the deliberate act of noticing and acknowledging what they\u2019ve received \u2014 experienced higher levels of positive emotion, better sleep, more compassion, and greater resilience than those who didn\u2019t.",
                            "But the gratitude he studied is not the toxic-positive, \u201cjust be thankful\u201d version that erases difficulty. It is a more nuanced practice: recognizing that goodness exists alongside hardship, and that noticing it is not a betrayal of the pain."
                        ],
                        "questions": [
                            "1.  What is easy to take for granted in your life that actually requires enormous good fortune?",
                            "2.  Who has contributed to who you are in ways you haven\u2019t fully acknowledged?",
                            "3.  Is there something currently painful in your life that also contains something to be grateful for?",
                            "4.  How would your daily experience shift if you genuinely looked for what was good?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-24",
                "bookId": "healing-journal-en",
                "day": 24,
                "title": "Joy",
                "phase": "Week 4: Integration & Thriving",
                "description": "Joy",
                "content": [
                    {
                        "type": "intro",
                        "title": "Joy",
                        "quote": "\u201cJoy is not the absence of pain. It is the ability to hold both \u2014 the ache and the aliveness \u2014 at the same time.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Joy",
                            "Joy is different from happiness. Happiness is a response to favorable circumstances. Joy is something that can exist even when circumstances are difficult \u2014 a sense of aliveness, engagement, and genuine pleasure in being here."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Many people who have been through painful periods lose access to joy. Not because they are broken, but because the nervous system in survival mode redirects all available resources toward threat management. There is no bandwidth for delight when you\u2019re trying to just get through.",
                            "Bren\u00e9 Brown\u2019s research found something unexpected: joy is actually one of the most vulnerable emotions. People are often afraid to feel it fully, because they\u2019ve learned that good things end. They practice what she calls \u201cforeboding joy\u201d \u2014 the habit of preemptively imagining how a good thing could go wrong, as a form of self-protection."
                        ],
                        "questions": [
                            "1.  When did you last feel genuine, uncomplicated joy? What were the conditions?",
                            "2.  Is there something that used to bring you joy that you\u2019ve stopped doing? What happened?",
                            "3.  Do you find it hard to let good moments land? Do you brace for them to end?",
                            "4.  What would it mean to allow yourself to feel good without guilt?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-25",
                "bookId": "healing-journal-en",
                "day": 25,
                "title": "Letting Go",
                "phase": "Week 4: Integration & Thriving",
                "description": "Letting Go",
                "content": [
                    {
                        "type": "intro",
                        "title": "Letting Go",
                        "quote": "\u201cSome things can only be carried for so long before the weight of them becomes the whole journey.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Letting Go",
                            "There are things we hold onto long past the point where they help us. Old hurts. Grudges. Versions of ourselves that are no longer accurate. Plans for a future that\u2019s no longer possible. The relationship that ended but lives on in our thoughts. The conversation that replays even when we\u2019d do anything to make it stop."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Holding on is human. When something mattered to us, it makes sense that we don\u2019t simply set it down. The mind is trying to extract meaning, find resolution, do something with what happened.",
                            "But there comes a point where continuing to hold is not processing \u2014 it is simply weight."
                        ],
                        "questions": [
                            "Write about something you\u2019ve been carrying that you know, on some level, it\u2019s time to set down. Not to minimize it, but to ask honestly: what would your life look like if you weren\u2019t organizing it around this anymore?",
                            "1.  What are you holding onto that no longer serves you?",
                            "2.  What do you fear would happen if you actually let it go?",
                            "3.  Is there someone you need to release from the story you\u2019ve been telling about them?",
                            "4.  Who would you be on the other side of letting this go?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-26",
                "bookId": "healing-journal-en",
                "day": 26,
                "title": "Hope",
                "phase": "Week 4: Integration & Thriving",
                "description": "Hope",
                "content": [
                    {
                        "type": "intro",
                        "title": "Hope",
                        "quote": "\u201cHope is not optimism. It is the stubborn insistence on moving toward something better, even when the evidence is thin.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Hope",
                            "Hope has often been conflated with wishful thinking \u2014 a passive faith that things will work out. But the psychologist C.R. Snyder spent decades researching hope and found something more active and interesting."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "In Snyder\u2019s model, hope has three components: a goal (something worth moving toward), pathways thinking (the ability to generate routes toward that goal), and agency thinking (the belief that you can actually take those routes). Hope is not passive. It is strategic. It requires both belief in the destination and confidence in one\u2019s ability to navigate.",
                            "This is why hope can feel in short supply during depression or burnout: the pathways are obscured, and the sense of agency has eroded. When people struggle to imagine a different future or don\u2019t believe they can reach it, hope collapses."
                        ],
                        "questions": [
                            "1.  What does hope feel like in your body, compared to despair?",
                            "2.  In what areas of your life has hope been hardest to access recently?",
                            "3.  Is there a smaller version of a goal you\u2019ve given up on that might still be possible?",
                            "4.  Who or what has been a source of genuine hope for you in the past?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-27",
                "bookId": "healing-journal-en",
                "day": 27,
                "title": "Relationships",
                "phase": "Week 4: Integration & Thriving",
                "description": "Relationships",
                "content": [
                    {
                        "type": "intro",
                        "title": "Relationships",
                        "quote": "\u201cWe don\u2019t heal in isolation. We heal in the presence of people who actually see us.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Relationships",
                            "Virtually every researcher who has studied human wellbeing for long enough arrives at the same conclusion: the quality of our relationships matters more than almost anything else. More than wealth, status, diet, or exercise. The Harvard Study of Adult Development, one of the longest-running studies on human happiness, tracked men for over eighty years and found that close relationships \u2014 not achievement, not wealth \u2014 were the single strongest predictor of late-life wellbeing."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "This doesn\u2019t mean you need a large social network. Research on attachment and wellbeing suggests that a handful of genuinely close relationships \u2014 ones characterized by mutuality, trust, and the ability to be vulnerable \u2014 matter far more than breadth of acquaintance.",
                            "But close relationships require things that don\u2019t always come easily after pain: vulnerability, the willingness to be known, the capacity to show need. And they require maintenance \u2014 not grand gestures, but the accumulated small moments of showing up, responding, paying attention."
                        ],
                        "questions": [
                            "Look at the relationships in your life. Which ones genuinely nourish you? Which ones cost you more than they give? What is one relationship worth investing in more deeply?",
                            "1.  What does a genuinely nourishing relationship feel like for you? Who in your life offers that?",
                            "2.  Is there a relationship you\u2019ve been maintaining out of habit or obligation that no longer serves either of you?",
                            "3.  What patterns from your past do you notice repeating in your current relationships?",
                            "4.  What would it take for you to show up more fully in the relationships that matter most to you?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-28",
                "bookId": "healing-journal-en",
                "day": 28,
                "title": "Moving Forward",
                "phase": "Week 4: Integration & Thriving",
                "description": "Moving Forward",
                "content": [
                    {
                        "type": "intro",
                        "title": "Moving Forward",
                        "quote": "\u201cMoving forward doesn\u2019t mean the past stops mattering. It means you\u2019ve decided to let your future matter just as much.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Moving Forward",
                            "Moving forward is not the same as moving on. Moving on implies leaving something behind, forgetting it, reaching a clean slate. Moving forward is different: it means carrying what you\u2019ve learned, integrating what you\u2019ve survived, and choosing to build from here rather than wait for the pain to fully resolve before you begin."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Post-traumatic growth \u2014 a term coined by psychologists Richard Tedeschi and Lawrence Calhoun \u2014 describes the genuine positive change that many people experience as a result of struggling with adversity. It is not that the trauma was good. It is that in the process of grappling with it, people discover strengths they didn\u2019t know they had, relationships they hadn\u2019t valued, and perspectives that weren\u2019t available to them before.",
                            "This doesn\u2019t happen automatically or universally. It requires deliberate reflection, support, and the willingness to actively make meaning rather than wait for it to arrive."
                        ],
                        "questions": [
                            "Write about who you were when you started this workbook and who you are now, even if the change feels small. What have you learned? What have you let go of? What have you picked up?",
                            "1.  What from the past 28 days are you genuinely proud of?",
                            "2.  What is one way you have treated yourself better during these weeks than you did before?",
                            "3.  What does \u201cmoving forward\u201d mean specifically for your life right now?",
                            "4.  What do you want to leave behind as you move into the next chapter?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-29",
                "bookId": "healing-journal-en",
                "day": 29,
                "title": "Who You Are Becoming",
                "phase": "Week 4: Integration & Thriving",
                "description": "Who You Are Becoming",
                "content": [
                    {
                        "type": "intro",
                        "title": "Who You Are Becoming",
                        "quote": "\u201cThe person you are becoming is assembled quietly, in the ordinary moments you choose to show up for.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Who You Are Becoming",
                            "There is a version of you that does not yet exist. Not in the sense of someone unrecognizable, but in the sense of someone who has integrated what you\u2019ve been through and grown into it rather than diminished by it."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "Identity is not fixed. Psychological research on personality and self-concept consistently shows that humans change significantly throughout adult life \u2014 especially during periods of intentional reflection and growth. The self is not a finished thing. It is a project.",
                            "And the most effective way to shape who you become is not through dramatic transformations or sudden epiphanies. It is through the accumulation of small, consistent choices \u2014 the ones you make in private, when nothing about them feels significant."
                        ],
                        "questions": [
                            "2.  What new belief about yourself has quietly taken root during this process?",
                            "3.  What habit from these 30 days do you most want to carry forward?",
                            "4.  What would the best version of yourself \u2014 not perfect, just most fully themselves \u2014 look like?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-en-30",
                "bookId": "healing-journal-en",
                "day": 30,
                "title": "You Made It",
                "phase": "Week 4: Integration & Thriving",
                "description": "You Made It",
                "content": [
                    {
                        "type": "intro",
                        "title": "You Made It",
                        "quote": "\u201cThis is not the end. This is the first day of the rest of your life with yourself as your own witness.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "You Made It",
                            "Thirty days ago, you began something. You opened a workbook, which is easy. And then you came back to it, which is hard. And you came back again. And again."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-emerald-100 dark:bg-emerald-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Practice",
                        "text": [
                            "You sat with questions that were uncomfortable. You wrote things that were difficult to say, even to a journal. You tried practices that felt awkward. You showed up on the days you didn\u2019t feel like it, because some part of you believed it was worth it.",
                            "That belief was not wrong."
                        ],
                        "questions": [
                            "1.  Looking back, what was the most important day or lesson in this workbook for you?",
                            "2.  What do you know now about yourself that you didn\u2019t know thirty days ago?",
                            "3.  What will you do differently going forward, not out of discipline, but because you want to?",
                            "4.  What are you grateful for \u2014 genuinely grateful for \u2014 as this chapter closes?"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "healing-journal-nl",
        "title": "Het Helingsjournal",
        "subtitle": "Een Reis van 30 Dagen Terug naar Jezelf",
        "author": "Joseph I.",
        "language": "NL",
        "coverColor": "bg-teal-600",
        "accentColor": "teal",
        "description": "Een begeleide ruimte voor reflectie, zelfinzicht en neuroplastische emotionele heling.",
        "totalDays": 30,
        "lessons": [
            {
                "id": "healing-journal-nl-1",
                "bookId": "healing-journal-nl",
                "day": 1,
                "title": "Leren Vertragen",
                "phase": "Week 1: Bewustzijn & Veiligheid",
                "description": "Leren Vertragen",
                "content": [
                    {
                        "type": "intro",
                        "title": "Leren Vertragen",
                        "quote": "\u201cRust is niet de vijand van vooruitgang. Het is vaak de plek waar vooruitgang stil begint.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Leren Vertragen",
                            "We leven in een cultuur die snelheid als deugd behandelt. Hoe drukker je bent, hoe belangrijker je moet zijn. Hoe sneller je beweegt, hoe meer je moet bereiken. Vertraag, en iemand kan denken dat je achteropraakt."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Maar er gebeurt iets vreemds als we nooit vertragen: we kunnen onszelf niet meer horen denken. Ons innerlijk leven wordt ruis. We verliezen het spoor van wat we echt voelen, wat we echt willen, wat er echt in ons gaande is. We worden, in een zeer re\u00eble zin, vreemden voor onszelf.",
                            "Vertragen is geen luiheid. Neurologisch gezien is het een van de meest productieve dingen die een mens kan doen. Als we rusten \u2014 werkelijk rusten, niet alleen scrollen terwijl we liggen \u2014 activeert het brein iets dat het default mode netwerk heet. Dit is het systeem verantwoordelijk voor zelfreflectie, creatief inzicht, emotionele verwerking en betekenisgeving. Het brein staat niet stil als jij stil bent. Het doet een deel van zijn belangrijkste werk."
                        ],
                        "questions": [
                            "1.  Wanneer voelde je je voor het laatst werkelijk zonder haast? Hoe was dat?",
                            "2.  Waarvoor beschermt \u201cdruk\u201d je tegen nadenken?",
                            "3.  Wat is \u00e9\u00e9n gebied van je leven waar je doorheen hebt gejaagd dat meer aandacht verdient?",
                            "4.  Hoe zou het eruit zien om jezelf toestemming te geven om te vertragen \u2014 niet uiteindelijk, maar vandaag?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-2",
                "bookId": "healing-journal-nl",
                "day": 2,
                "title": "Je Emoties Ontmoeten",
                "phase": "Week 1: Bewustzijn & Veiligheid",
                "description": "Je Emoties Ontmoeten",
                "content": [
                    {
                        "type": "intro",
                        "title": "Je Emoties Ontmoeten",
                        "quote": "\u201cEen onbeleefde emotie verdwijnt niet. Ze gaat ondergronds en wacht.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Je Emoties Ontmoeten",
                            "De meesten van ons kregen nooit geleerd wat te doen met moeilijke emoties. We kregen te horen ze te beheersen, te minimaliseren of doorheen te duwen. \u201cStop met huilen.\u201d \u201cWord harder.\u201d \u201cJe overdrijft.\u201d De boodschap, op honderd kleine manieren herhaald: gevoelens zijn problemen die opgelost moeten worden, geen signalen die gehoord moeten worden."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "De ironie is dat emoties om een reden bestaan. Angst wijst naar gevaar. Woede signaleert vaak een geschonden grens. Verdriet is de vorm van liefde na verlies. Eenzaamheid is de manier van het lichaam om te zeggen dat verbinding nodig is. Dit zijn geen fouten in het systeem. Het zijn kenmerken.",
                            "Het veld van affectieve neurowetenschap \u2014 de studie van hoe emoties werken in het brein \u2014 heeft aangetoond dat als we emoties onderdrukken, ze niet verminderen. Ze nemen toe. Onderdrukking vereist voortdurende cognitieve inspanning, en het neigt de fysieke ervaring van het gevoel te versterken. Het lichaam houdt vast wat de geest weigert te erkennen."
                        ],
                        "questions": [
                            "1.  Welke emotie probeer je het vaakst te vermijden? Wat doe je om hem te vermijden?",
                            "2.  Toen je opgroeide, welke emoties waren acceptabel in jouw thuis, en welke niet?",
                            "3.  Wat doet jouw lichaam als je angstig bent? Wat doet het als je verdrietig bent?",
                            "4.  Als jouw huidige emotionele toestand je iets probeerde te vertellen, wat zou het dan kunnen zeggen?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-3",
                "bookId": "healing-journal-nl",
                "day": 3,
                "title": "De Verhalen Die We Onszelf Vertellen",
                "phase": "Week 1: Bewustzijn & Veiligheid",
                "description": "De Verhalen Die We Onszelf Vertellen",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Verhalen Die We Onszelf Vertellen",
                        "quote": "\u201cHet verhaal dat je het vaakst herhaalt, wordt het leven dat je het meest volledig leeft.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "De Verhalen Die We Onszelf Vertellen",
                            "In jouw hoofd is er een verteller. Het is de stem die lopend commentaar geeft op alles wat er gebeurt: wat het betekent, waarom het is gebeurd, wat het over jou zegt, wat er daarna gaat gebeuren. Meestal merk je deze stem niet op omdat je de stem bent \u2014 of zo lijkt het."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Maar de verteller is geen waarheid. Het is interpretatie. En interpretaties kunnen verkeerd zijn.",
                            "Cognitieve Gedragstherapie, een van de meest onderzochte benaderingen in de psychologie, is gebouwd op een eenvoudig maar diepgaand inzicht: onze gedachten over gebeurtenissen vormen onze emotionele reacties erop meer dan de gebeurtenissen zelf. Twee mensen kunnen dezelfde afwijzing ervaren en volledig verschillende conclusies trekken \u2014 de een denkt: \u201cZe weten niet wat ze missen,\u201d en de ander: \u201cIk wist dat ik niet goed genoeg was.\u201d De gebeurtenis is identiek. Het verhaal is anders. En het verhaal is alles."
                        ],
                        "questions": [
                            "Denk aan een situatie die je onlangs heeft dwarsgezeten. Schrijf je automatische gedachte erover op \u2014 het eerste wat je geest zegt. Vraag dan: Is deze gedachte een feit of een interpretatie? Welk bewijs ondersteunt het? Welk bewijs weerspreekt het? Is er een andere verklaring die even plausibel is?",
                            "1.  Wat is een verhaal over jezelf dat je al zo lang vertelt dat je gestopt bent het te bevragen?",
                            "2.  Waar kwam dat verhaal oorspronkelijk vandaan? Wie vertelde het je voor het eerst?",
                            "3.  Als je dat verhaal kon herschrijven met dezelfde feiten maar een meer meelevende verteller, hoe zou het dan klinken?",
                            "4.  Wat zou er veranderen in je leven als je stopte dat verhaal te geloven?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-4",
                "bookId": "healing-journal-nl",
                "day": 4,
                "title": "Rust als Verzet",
                "phase": "Week 1: Bewustzijn & Veiligheid",
                "description": "Rust als Verzet",
                "content": [
                    {
                        "type": "intro",
                        "title": "Rust als Verzet",
                        "quote": "\u201cIn een wereld die profiteert van jouw uitputting, is kiezen voor rust een stille daad van opstand.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Rust als Verzet",
                            "We hebben rust zo lang verward met luiheid dat veel mensen zich schuldig voelen als ze stoppen. Er is een specifiek soort schaamte die opkomt als je zit zonder iets te bereiken \u2014 een sluipend gevoel dat je tijd verspilt, achteropraakt, meer neemt dan je verdient."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Die schaamte is niet van jou. Het is je geleerd.",
                            "Onderzoek uit slaapwetenschap, stressfysiologie en herstellende neurologie is ondubbelzinnig: het menselijk lichaam en de geest hebben rust nodig, niet als luxe maar als biologische noodzaak. Het brein consolideert herinneringen tijdens de slaap. Het zenuwstelsel reguleert naar beneden tijdens echte ontspanning. Emotionele verwerking \u2014 de soort die ons in staat stelt moeilijke ervaringen te integreren in plaats van ze alleen te overleven \u2014 vereist tijd en stilte."
                        ],
                        "questions": [
                            "1.  Hoe voel je je als je rust? Is er schuldgevoel? Opluchting? Angst? Gevoelloosheid?",
                            "2.  Wanneer voelde je je voor het laatst volledig uitgerust? Wat maakte dat mogelijk?",
                            "3.  Welke overtuigingen draag je over wat je nodig hebt om rust te \u201cverdienen\u201d?",
                            "4.  Wat is \u00e9\u00e9n vorm van rust die je werkelijk herstelt (niet alleen verdooft)?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-5",
                "bookId": "healing-journal-nl",
                "day": 5,
                "title": "Angst Begrijpen",
                "phase": "Week 1: Bewustzijn & Veiligheid",
                "description": "Angst Begrijpen",
                "content": [
                    {
                        "type": "intro",
                        "title": "Angst Begrijpen",
                        "quote": "\u201cAngst is niet een teken dat er iets mis is met jou. Het is een teken dat jouw geest heel hard werkt om je veilig te houden.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Angst Begrijpen",
                            "Angst is een van de meest misverstane ervaringen in de menselijke psychologie. We behandelen het als een vijand \u2014 iets dat ge\u00eblimineerd, verslagen of weggemediceerd moet worden. Maar angst is geen storing. Het is het dreigingsdetectiesysteem van het brein dat zijn werk doet."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Het probleem is dat dit systeem werd gekalibreerd voor een wereld die niet meer bestaat. De amygdala \u2014 het amandelvormige gebied diep in het brein dat verantwoordelijk is voor angstreacties \u2014 kan niet gemakkelijk onderscheiden tussen een fysiek roofdier en een onbeantwoorde e-mail. Het reageert op waargenomen dreiging met dezelfde urgentie in beide gevallen: hartslag stijgt, spieren spannen aan, adem wordt oppervlakkig. We noemen dit de vecht-of-vluchtreactie, en voor het grootste deel van de menselijke geschiedenis was het buitengewoon nuttig.",
                            "In de moderne wereld zijn de bedreigingen zelden fysiek. Ze zijn sociaal, professioneel, relationeel, existentieel. Maar het lichaam reageert op dezelfde manier. En als angst chronisch wordt \u2014 als het alarm nooit stopt met rinkelen \u2014 wordt het uitputtend."
                        ],
                        "questions": [
                            "1.  Hoe voelt angst in jouw lichaam? Waar leeft het?",
                            "2.  Wat zijn de meest voorkomende triggers voor jouw angst?",
                            "3.  Wat doe je gewoonlijk als angst verschijnt? Helpt het?",
                            "4.  Als angst je probeert te beschermen, wat is het dan het meest bang dat je verliest?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-6",
                "bookId": "healing-journal-nl",
                "day": 6,
                "title": "Verdriet Eren",
                "phase": "Week 1: Bewustzijn & Veiligheid",
                "description": "Verdriet Eren",
                "content": [
                    {
                        "type": "intro",
                        "title": "Verdriet Eren",
                        "quote": "\u201cVerdriet is niet iets wat je overwint. Het is iets wat je leert te dragen, en langzaam wordt het minder zwaar.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Verdriet Eren",
                            "Verdriet gaat niet alleen over de dood. Het verschijnt wanneer we iets verliezen dat belangrijk was: een relatie, een versie van onszelf, een toekomst die we ons hadden voorgesteld, een periode van ons leven die voorbij is. Het toont zich als verdriet, ja, maar ook als woede, gevoelloosheid, verwarring en een vreemd soort verlangen naar iets dat niet meer precies kan zijn wat het was."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "David Kessler, die decennia lang naast Elisabeth K\u00fcbler-Ross werkte, stelde onlangs een zesde fase van verdriet voor naast de klassieke vijf: betekenis vinden. Niet \u201cAlles gebeurt om een reden\u201d \u2014 een zin die verdriet eerder beleidigt dan troost. Maar de mogelijkheid dat we zelfs in verlies iets kunnen ontdekken over wat voor ons van belang is, van wie we houden en wat we zijn gemaakt.",
                            "Verdriet, als het mag bestaan, neigt te bewegen. Als het wordt neergedrukt, neigt het te verstenen. Veel mensen die worstelen met chronische lichte gevoelloosheid, onverklaarbare prikkelbaarheid of een gevoel dat het leven kleur heeft verloren, dragen eigenlijk verdriet dat nooit ruimte heeft gekregen."
                        ],
                        "questions": [
                            "Schrijf over iets wat je hebt verloren \u2014 niet noodzakelijk door de dood, maar iets wat je werkelijk raakte. Probeer er geen positieve draai aan te geven of de les te vinden. Beschrijf het verlies gewoon eerlijk. Hoe voelde het? Wat mis je?",
                            "1.  Welk verlies in je leven is nooit volledig gerouwd?",
                            "2.  Wat ben je bang dat er zou gebeuren als je dat verdriet volledig zou laten voelen?",
                            "3.  Is er een versie van jezelf die je hebt verloren \u2014 jonger, hoopvoller, vrijer \u2014 die je stil betreurt?",
                            "4.  Wat leerde het ding dat je verloor je over wat het meest voor jou van belang is?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-7",
                "bookId": "healing-journal-nl",
                "day": 7,
                "title": "Om Hulp Vragen",
                "phase": "Week 1: Bewustzijn & Veiligheid",
                "description": "Om Hulp Vragen",
                "content": [
                    {
                        "type": "intro",
                        "title": "Om Hulp Vragen",
                        "quote": "\u201cDe moedigste zin die je kunt uitspreken is misschien: Ik kan dit niet alleen.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Om Hulp Vragen",
                            "Ergens onderweg leerden velen van ons dat hulp nodig hebben iets was om je voor te schamen. Onafhankelijkheid was deugdzaam. Zelfredzaamheid was kracht. Om ondersteuning vragen betekende dat je een last was, of zwak, of niet hard genoeg had geprobeerd."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Dit idee is niet alleen onjuist. Het is actief schadelijk.",
                            "Mensen zijn op biologisch niveau ontworpen voor wederzijdse afhankelijkheid. We evolueerden in sociale groepen waar samenwerking overleving was. De isolatie van het moderne leven is werkelijk ongekend in de menselijke geschiedenis, en onderzoek toont consistent aan dat chronische eenzaamheid \u2014 het soort dat voortkomt uit verbreking, niet eenzaamheid \u2014 geassocieerd is met slechtere fysieke en geestelijke gezondheidsuitkomsten dan roken."
                        ],
                        "questions": [
                            "1.  Wat is het verhaal dat je jezelf vertelt over waarom je geen hulp nodig zou moeten hebben?",
                            "2.  Wanneer leerde je dat anderen nodig hebben iets was om te verbergen?",
                            "3.  Wie in je leven geeft je het gevoel veilig genoeg te zijn om eerlijk te zijn over hoe het met je gaat?",
                            "4.  Wat zou je zeggen tegen een vriend die zei bang te zijn om om hulp te vragen?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-8",
                "bookId": "healing-journal-nl",
                "day": 8,
                "title": "De Innerlijke Criticus",
                "phase": "Week 2: Fundament & Grenzen",
                "description": "De Innerlijke Criticus",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Innerlijke Criticus",
                        "quote": "\u201cDe hardste stem in de kamer is vaak degene die in jouw eigen hoofd leeft.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "De Innerlijke Criticus",
                            "De meeste mensen hebben een innerlijke criticus. Die stem die elke fout opmerkt, elk genant moment opnieuw afspeelt en een lopend commentaar biedt op alles dat mis kan gaan. Sommige mensen noemen het hun geweten. Velen vergissen het voor eerlijkheid."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Het is geen van beide.",
                            "De innerlijke criticus is een aangeleerde stem, gewoonlijk samengesteld in de kindertijd uit de boodschappen van ouders, leraren, leeftijdsgenoten en cultuur. Hij klinkt als jij, maar is het niet. Het is een verzameling angsten en oordelen van anderen die hun intrek namen in jouw geest en leerden te spreken in de eerste persoon."
                        ],
                        "questions": [
                            "1.  Hoe klinkt jouw innerlijke criticus? Doet hij je denken aan iemand uit je verleden?",
                            "2.  Wat is het het meest bang voor als je stopt met jezelf te bekritiseren?",
                            "3.  Hoe zou jouw leven anders zijn als je tegen jezelf sprak zoals je spreekt tegen de mensen van wie je het meest houdt?",
                            "4.  Wat is \u00e9\u00e9n ding dat je innerlijke criticus het vaakst zegt dat betwist verdient te worden?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-9",
                "bookId": "healing-journal-nl",
                "day": 9,
                "title": "Grenzen",
                "phase": "Week 2: Fundament & Grenzen",
                "description": "Grenzen",
                "content": [
                    {
                        "type": "intro",
                        "title": "Grenzen",
                        "quote": "\u201cEen grens is geen muur. Het is een deur met een slot \u2014 en jij houdt de sleutel.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Grenzen",
                            "Het woord \u201cgrens\u201d is zo vaak gebruikt in de populaire psychologie dat het zijn betekenis is begonnen te verliezen. Maar grenzen zijn niet trendy. Ze zijn een fundamenteel kenmerk van psychologische gezondheid."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Een grens is simpelweg een limiet die je stelt rondom je eigen tijd, energie, emoties of lichaam \u2014 een verklaring van wat je wel en niet beschikbaar stelt, en onder welke omstandigheden. Grenzen zijn geen straffen. Ze zijn geen afwijzing. Ze zijn informatie over wie je bent en wat je nodig hebt.",
                            "Mensen die worstelen met grenzen hebben gewoonlijk ergens geleerd dat nee zeggen gevaarlijk was. Dat hun behoeften te veel waren. Dat liefde afhankelijk was van naleving. Als gevolg werden ze bedreven in het lezen van wat anderen nodig hadden en zichzelf dienovereenkomstig te vormen \u2014 een strategie die op korte termijn werkt en op lange termijn enorm kost."
                        ],
                        "questions": [
                            "Identificeer \u00e9\u00e9n gebied van je leven waar je meer hebt gegeven dan houdbaar aanvoelt. Schrijf er eerlijk over: wat tolereer je dat eigenlijk niet voor jou werkt? Hoe zou een redelijke grens eruit zien?",
                            "1.  In welke relaties vind je het het moeilijkst om grenzen te stellen? Waarom?",
                            "2.  Wat vrees je dat er zal gebeuren als je begint te vragen wat je werkelijk nodig hebt?",
                            "3.  Wat is \u00e9\u00e9n grens die je al lang geleden had willen stellen?",
                            "4.  Hoe voelt \u201cniet mijn verantwoordelijkheid\u201d in jouw lichaam? Kun je het lokaliseren?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-10",
                "bookId": "healing-journal-nl",
                "day": 10,
                "title": "Anderen Pleasen",
                "phase": "Week 2: Fundament & Grenzen",
                "description": "Anderen Pleasen",
                "content": [
                    {
                        "type": "intro",
                        "title": "Anderen Pleasen",
                        "quote": "\u201cDe eenzaamste plek op aarde is binnenin een versie van jezelf die je voor andere mensen hebt gebouwd.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Anderen Pleasen",
                            "Anderen pleasen is geen vriendelijkheid. Het kan er van buiten als vriendelijkheid uitzien, maar van binnen voelt het vaak als angst."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Dit patroon begint gewoonlijk vroeg. Kinderen die leren dat liefde voorwaardelijk is \u2014 dat goedkeuring verdiend wordt in plaats van gegeven \u2014 worden experts in het lezen van de kamer. Ze ontwikkelen buitengewone gevoeligheid voor andermans stemmingen en behoeften. Ze leren zichzelf te minimaliseren.",
                            "In de volwassenheid ziet dit eruit als een onvermogen om wie dan ook teleur te stellen, een diepe angst voor conflict en een groeiende verbreking van hun eigen wensen. Na verloop van tijd ontdekken mensen-pleasers vaak dat ze geen idee hebben wie ze werkelijk zijn \u2014 omdat ze zo lang zijn geweest wie anderen nodig hadden dat ze zouden zijn."
                        ],
                        "questions": [
                            "De mensen-pleaser zegt ja als ze nee bedoelen. Ze stemmen in met dingen waar ze het eigenlijk niet mee eens zijn. Ze vormen hun meningen, hun humor, hun uiterlijk en soms hun hele leven naar wat ze denken dat anderen willen. En achter dat alles zit \u00e9\u00e9n uitputtende vraag: Ben ik aardig genoeg om te worden gehouden?",
                            "Schrijf over een recente situatie waar je iets zei of deed wat je eigenlijk niet wilde om harmonie of goedkeuring te behouden. Wat voelde je? Wat wilde je in plaats daarvan zeggen?",
                            "1.  Wiens goedkeuring werk je het hardst om te behouden? Wat zou er gebeuren als je stopte?",
                            "2.  Welke meningen of voorkeuren heb je voor anderen verborgen gehouden omdat je bang was voor hun reactie?",
                            "3.  Wat is het verschil tussen echte vrijgevigheid en het soort dat voortkomt uit angst?",
                            "4.  Als je niet kon schelen wat iemand dacht, wat zou er dan veranderen aan hoe je leeft?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-11",
                "bookId": "healing-journal-nl",
                "day": 11,
                "title": "Vergiffenis",
                "phase": "Week 2: Fundament & Grenzen",
                "description": "Vergiffenis",
                "content": [
                    {
                        "type": "intro",
                        "title": "Vergiffenis",
                        "quote": "\u201cVergiffenis gaat niet over het excuseren van wat er is gebeurd. Het gaat over weigeren wat er is gebeurd jouw leven te laten blijven beheersen.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Vergiffenis",
                            "Vergiffenis is misschien het meest misverstane concept in de psychologie van heling. Het is niet het goedkeuren van wat iemand deed. Het is niet vergeten. Het is geen verzoening, geen doen alsof de pijn niet is gebeurd, geen relatie onderhouden met iemand die je schade heeft berokkend."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Vergiffenis is een beslissing die je voor jezelf neemt, niet voor hen.",
                            "Onderzoek door psycholoog Fred Luskin aan Stanford vond dat het dragen van onvergiffenis \u2014 chronische wrok, woede of piekeren over vroegere onrecht \u2014 geassocieerd is met verhoogde stresshormonen, slechter cardiovasculair gezondheid en lagere levenstevredenheid. De persoon die we haten leeft zijn leven vaak ongestoord. Wij betalen de prijs."
                        ],
                        "questions": [
                            "Iemand vergeven is moeilijk. En sommige dingen zijn werkelijk zeer moeilijk te vergeven. Er is geen tijdlijn en geen verplichting om te haasten. Maar naarmate je dit werk doet, is het de moeite waard om te vragen: wie heeft jouw wrok meer gekost \u2014 hen of jou?",
                            "Schrijf over iemand (inclusief jezelf) die je niet hebt vergeven. Niet om te rechtvaardigen wat ze deden, maar om te begrijpen wat vasthouden eraan jou heeft gekost. Welke emoties draag je die begonnen bij deze wond?",
                            "1.  Over wat of wie draag je nog steeds woede of pijn die je niet hebt aangepakt?",
                            "2.  Wat zou het voor jouw dagelijks leven betekenen als je dat werkelijk losliet?",
                            "3.  Is er iets wat je hebt gedaan waarvoor je jezelf niet hebt vergeven?",
                            "4.  Welk verhaal over het verleden houdt je ervan het heden volledig te bewonen?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-12",
                "bookId": "healing-journal-nl",
                "day": 12,
                "title": "Het Lichaam Houdt Bij",
                "phase": "Week 2: Fundament & Grenzen",
                "description": "Het Lichaam Houdt Bij",
                "content": [
                    {
                        "type": "intro",
                        "title": "Het Lichaam Houdt Bij",
                        "quote": "\u201cJouw zenuwstelsel liegt niet. Wat de geest vergeet, onthoudt het lichaam nog steeds.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Het Lichaam Houdt Bij",
                            "Trauma en chronische stress leven niet alleen in onze gedachten. Ze leven in onze lichamen."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Het baanbrekende werk van Bessel van der Kolk in traumaonderzoek onthulde dat traumatische ervaringen niet primair worden opgeslagen als verhalen maar als lichamelijke gewaarwordingen \u2014 als spierspanning, als veranderingen in ademhaling, als chronische opwinding of gevoelloosheid. Het lichaam, met andere woorden, houdt bij.",
                            "Dit betekent dat heling niet alleen kan plaatsvinden door inzicht en reflectie. Op een gegeven moment moet het ook via het lichaam komen. Dit is waarom praktijken als yoga, ademwerk, beweging en somatische therapie steeds belangrijker zijn geworden in traumabehandeling \u2014 niet omdat praten niet helpt, maar omdat het zenuwstelsel zijn eigen soort verwerking nodig heeft."
                        ],
                        "questions": [
                            "1.  Waar in jouw lichaam voel je stress het vaakst? Hoe voelt het?",
                            "2.  Is er een fysieke gewaarwording die je vaak negeert? Wat is het?",
                            "3.  Hoe voelt jouw lichaam als je werkelijk op je gemak bent? Wanneer voelde je dat voor het laatst?",
                            "4.  Wat zou het betekenen om de signalen van jouw lichaam meer te vertrouwen dan je momenteel doet?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-13",
                "bookId": "healing-journal-nl",
                "day": 13,
                "title": "Eigenwaarde",
                "phase": "Week 2: Fundament & Grenzen",
                "description": "Eigenwaarde",
                "content": [
                    {
                        "type": "intro",
                        "title": "Eigenwaarde",
                        "quote": "\u201cJouw waarde neemt niet af op basis van iemands onvermogen het te zien.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Eigenwaarde",
                            "Eigenwaarde is niet hetzelfde als zelfvertrouwen. Zelfvertrouwen is voorwaardelijk \u2014 het stijgt als de dingen goed gaan en daalt als dat niet het geval is. Het is afhankelijk van prestaties, uiterlijk, goedkeuring en uitkomsten."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Eigenwaarde, daarentegen, is de overtuiging dat je inherente waarde hebt simpelweg omdat je bestaat. Niet vanwege wat je produceert, hoe je eruitziet, wat je hebt bereikt of wat iemand over je denkt. Gewoon omdat je hier bent.",
                            "De meesten van ons kregen voorwaardelijke boodschappen over onze waarde: je bent waardevol als je slaagt, als je behaagt, als je voldoet. Deze boodschappen kwamen vaak van mensen die het goed bedoelden. Maar de ge\u00efnternaliseerde overtuiging \u2014 ik moet mijn plek verdienen \u2014 is een van de pijnlijkste dingen die een persoon kan dragen."
                        ],
                        "questions": [
                            "Schrijf drie kwaliteiten op die je hebt die bestaan onafhankelijk van je prestaties of wat iemand over je denkt. Geen vaardigheden of prestaties \u2014 kwaliteiten. Wie ben je als niemand kijkt?",
                            "1.  Wat geloof je dat je moet doen of zijn om liefde en verbondenheid te verdienen?",
                            "2.  Waar kwam die overtuiging vandaan?",
                            "3.  Hoe zou je jezelf anders behandelen als je werkelijk geloofde dat jouw waarde onvoorwaardelijk was?",
                            "4.  Wanneer voel je je het meest als jouw meest oprechte zelf \u2014 vrij van optreden en zelfbewustzijn?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-14",
                "bookId": "healing-journal-nl",
                "day": 14,
                "title": "Eenzaamheid",
                "phase": "Week 2: Fundament & Grenzen",
                "description": "Eenzaamheid",
                "content": [
                    {
                        "type": "intro",
                        "title": "Eenzaamheid",
                        "quote": "\u201cJe kunt in een kamer vol mensen zijn en je volledig alleen voelen. Dat is geen verklaring over de kamer. Het is een verklaring over de verbinding.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Eenzaamheid",
                            "Eenzaamheid is niet hetzelfde als alleen zijn. Eenzaamheid in de zin van gekozen alleen zijn kan voedzaam zijn, zelfs essentieel. Eenzaamheid is de pijnlijke ervaring van je losgekoppeld voelen van anderen, ongezien of onbekend, zelfs in hun aanwezigheid."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Johann Hari, in zijn onderzoek naar depressie, ontdekte dat een van de meest consistente bijdragen aan emotioneel lijden niet alleen een chemisch onbalans is, maar verbreking \u2014 van andere mensen, van betekenisvol werk, van de natuur, van iets groters dan onszelf. We zijn, in de kern, een sociale soort. En als die banden afwezig of hol zijn, voelen we het op manieren die verder gaan dan verdriet.",
                            "Sociaal onderzoeker Vivek Murthy, die diende als Amerikaans Surgeon General, heeft eenzaamheid beschreven als een epidemie met ernstige fysieke gezondheidsgevolgen \u2014 vergelijkbaar met 15 sigaretten per dag roken. Het lichaam maakt geen onderscheid tussen emotionele pijn en fysieke pijn. Ze activeren dezelfde neurale circuits."
                        ],
                        "questions": [
                            "Schrijf over hoe echte verbinding eruit zou zien voor jou. Niet oppervlakkig socializen, maar het soort waarbij je je werkelijk gekend voelt. Wie biedt dat? Wat weerhoudt je ervan het te zoeken?",
                            "1.  Wat is het verschil tussen eenzaamheid en alleen zijn in jouw ervaring?",
                            "2.  Is er een manier waarop je onbedoeld verbinding in je leven kunt verhinderen?",
                            "3.  Wie in jouw leven ziet jou werkelijk \u2014 niet de versie die je voor anderen opvoert?",
                            "4.  Wat zou er nodig zijn om je werkelijk minder alleen te voelen?",
                            "Wat is er de afgelopen 15 dagen werkelijk verschoven, ook subtiel?",
                            "Wat doet nog steeds pijn, en verdient meer aandacht?",
                            "Wat heeft je verrast over jezelf in deze eerste twee weken?",
                            "Schrijf aan jezelf vanuit een plek van eerlijkheid en zachtheid. Waar wil je dat de tweede helft van deze reis over gaat?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-15",
                "bookId": "healing-journal-nl",
                "day": 15,
                "title": "Identiteit",
                "phase": "Week 3: Herkadering & Identiteit",
                "description": "Identiteit",
                "content": [
                    {
                        "type": "intro",
                        "title": "Identiteit",
                        "quote": "\u201cWeten wie je niet bent is een van de eerste stappen naar weten wie je bent.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Identiteit",
                            "Veel mensen gaan lange perioden van hun leven door een identiteit te leven die door een comit\u00e9 is opgebouwd: samengesteld uit de verwachtingen van ouders, de validatie van leeftijdsgenoten, de eisen van banen en de rollen die mensen gemakkelijker te houden maakten. Ze worden op een dag wakker \u2014 soms op dertig, soms op vijftig \u2014 en beseffen dat ze geen idee hebben wie ze werkelijk zijn."
                        ],
                        "image": "\ud83c\udf31",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Dit is geen crisis. Het is een uitnodiging.",
                            "Identiteit is niet vaststaand. Erik Erikson, de ontwikkelingspsycholoog die de stadia van menselijke identiteit in kaart bracht, toonde aan dat de vraag \u201cWie ben ik?\u201d niet relevant stopt na de adolescentie. Mensen keren er bij elke grote levensovergang naar terug. Verlies, eindes en breuken stropen de identiteiten die we hebben opgebouwd weg \u2014 en cre\u00ebren ruimte voor iets echters."
                        ],
                        "questions": [
                            "Maak een lijst van 10 waarden (bijv. eerlijkheid, creativiteit, vrijheid, verbinding, avontuur, loyaliteit, vrede). Omcirkel de drie die het meest essentieel aanvoelen voor wie je werkelijk bent. Schrijf dan: wanneer leefde je voor het laatst in volledige overeenstemming met elk ervan?",
                            "1.  Welke delen van jouw identiteit voelen werkelijk de jouwe, en welke voelen als kostuums die je voor anderen draagt?",
                            "2.  Als je je baan, je relaties en je rollen zou weghalen, wie ben je dan?",
                            "3.  Welke versie van jezelf blijf je verbergen, en waarom?",
                            "4.  Hoe zou het voelen om meer consistent te leven vanuit je werkelijke waarden?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-16",
                "bookId": "healing-journal-nl",
                "day": 16,
                "title": "Acceptatie",
                "phase": "Week 3: Herkadering & Identiteit",
                "description": "Acceptatie",
                "content": [
                    {
                        "type": "intro",
                        "title": "Acceptatie",
                        "quote": "\u201cAcceptatie is niet opgeven. Het is kiezen om geen energie te verspillen aan vechten tegen wat niet veranderd kan worden.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Acceptatie",
                            "Acceptatie is een van de meest misverstane concepten in de psychologie. Mensen verwarren het vaak met resignatie \u2014 opgeven, overgeven, hoop verliezen. Het is geen van alle."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Acceptatie, zoals gedefinieerd in Acceptance and Commitment Therapie, is de bereidheid om ervaringen te hebben \u2014 gedachten, gevoelens, herinneringen, gewaarwordingen \u2014 zonder onnodige strijd. Het is zeggen: dit is echt, en ik ga stoppen energie te besteden aan proberen het niet echt te laten zijn.",
                            "De paradox van acceptatie is goed gedocumenteerd: hoe meer we moeilijke ervaringen bevechten, hoe sterker ze worden. Hoe meer we ze zonder weerstand toelaten, hoe meer ze de neiging hebben hun greep te verliezen. Dit is geen wensdenken. Het is de consistente bevinding van decennia psychologisch onderzoek."
                        ],
                        "questions": [
                            "Denk aan iets in je leven wat je hebt weerstaan \u2014 een omstandigheid, een emotie, een feit over je verleden of heden. Schrijf over wat het zou betekenen het te accepteren \u2014 niet om het leuk te vinden, maar om te stoppen met vechten tegen het bestaan ervan. Hoe zou jouw energie bevrijd kunnen worden als je dat deed?",
                            "1.  Welke werkelijkheid in je leven besteed je energie aan het proberen niet te accepteren?",
                            "2.  Wat heeft die weerstand jou gekost?",
                            "3.  Is er een verschil tussen iets accepteren en het goedkeuren?",
                            "4.  Wat zou je kunnen doen met de energie die momenteel wordt besteed aan weerstand?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-17",
                "bookId": "healing-journal-nl",
                "day": 17,
                "title": "Perfectionisme",
                "phase": "Week 3: Herkadering & Identiteit",
                "description": "Perfectionisme",
                "content": [
                    {
                        "type": "intro",
                        "title": "Perfectionisme",
                        "quote": "\u201cPerfectionisme is de overtuiging dat als je jezelf als eerste en hardst beoordeelt, je anderen de kans niet geeft.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Perfectionisme",
                            "Perfectionisme is niet hetzelfde als hoge normen. Hoge normen zijn gezond \u2014 ze dringen ons aan tot werk waar we trots op zijn en om te leven naar onze waarden. Perfectionisme is iets anders: het is de overtuiging dat fouten catastrofaal zijn, dat onvolmaaktheid bewijs is van onwaardigheid, en dat de enige manier om veilig te zijn is om foutloos te zijn."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Bren\u00e9 Brown, wier onderzoek naar schaamte en kwetsbaarheid miljoenen mensen heeft bereikt, beschrijft perfectionisme als \u201ceen schild van twintig ton\u201d dat we dragen en denken dat het ons beschermt, terwijl het ons feitelijk verhindert gezien te worden.",
                            "Perfectionisme wordt gedreven door schaamte, niet door uitmuntendheid. De perfectionist streeft niet naar kwaliteit \u2014 ze vluchten voor beoordeling. En omdat beoordeling nooit volledig vermijdbaar is, wordt perfectionisme een gevangenis zonder uitgang."
                        ],
                        "questions": [
                            "Schrijf over \u00e9\u00e9n gebied van je leven waar perfectionisme je vast heeft gehouden of je ervan heeft weerhouden iets te beginnen wat je wilt doen. Wat ben je bang dat er zal gebeuren als je het onvolmaakt doet?",
                            "1.  Op welke levensterreinen gaan jouw normen van nuttig naar straffend?",
                            "2.  Wat ben je het meest bang dat mensen zullen zien als jouw onvolmaaktheden zichtbaar zijn?",
                            "3.  Ben je ooit werkelijk bewogen door iemands gepolijste, perfecte presentatie? Of door hun eerlijke, onvolmaakte?",
                            "4.  Wat zou je kunnen proberen als je jezelf toestemming gaf het onvolmaakt te doen?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-18",
                "bookId": "healing-journal-nl",
                "day": 18,
                "title": "Piekeren",
                "phase": "Week 3: Herkadering & Identiteit",
                "description": "Piekeren",
                "content": [
                    {
                        "type": "intro",
                        "title": "Piekeren",
                        "quote": "\u201cJouw geest speelt het verleden niet opnieuw af om je te kwellen. Het doet dit omdat het gelooft dat er nog iets belangrijks onopgelost is.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Piekeren",
                            "Piekeren is de mentale gewoonte van het herhaaldelijk afspelen van dezelfde gedachten, gebeurtenissen of zorgen \u2014 ze steeds opnieuw omdraaien zonder iets nieuws te bereiken. Bijna iedereen doet het. Voor sommigen wordt het bijna constant."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "De meeste mensen geloven dat als ze lang genoeg over een probleem nadenken, ze het uiteindelijk zullen oplossen. Maar piekeren is niet hetzelfde als probleemoplossing. Probleemoplossing beweegt vooruit \u2014 het genereert opties, overweegt acties, bereikt conclusies. Piekeren cirkelt \u2014 het herziet hetzelfde terrein, bereikt dezelfde conclusies, produceert dezelfde gevoelens.",
                            "Onderzoek door psycholoog Susan Nolen-Hoeksema ontdekte dat piekeren een van de sterkste voorspellers is van depressie en angst. Het is ook zichzelf in stand houdend: hoe langer je piekert, hoe meer jouw brein leert dat piekeren is wat je doet als reactie op moeilijkheid, en hoe gemakkelijker het wordt erin te glijden."
                        ],
                        "questions": [
                            "1.  Naar welke gedachte of herinnering keer je het vaakst terug? Wat denk je dat er onopgelost over is?",
                            "2.  Wat win je door dit te herbezoeken? Wat verlies je?",
                            "3.  Als een goede vriend in dezelfde lus vast zou zitten, wat zou je hen dan vertellen?",
                            "4.  Wat zou er nodig zijn voor jouw geest om het gevoel te hebben dat dat hoofdstuk gesloten is?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-19",
                "bookId": "healing-journal-nl",
                "day": 19,
                "title": "Het Innerlijke Kind",
                "phase": "Week 3: Herkadering & Identiteit",
                "description": "Het Innerlijke Kind",
                "content": [
                    {
                        "type": "intro",
                        "title": "Het Innerlijke Kind",
                        "quote": "\u201cHet kind dat je ooit was, is er nog steeds in. Ze zijn nooit gestopt met de behoefte om gezien te worden.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Het Innerlijke Kind",
                            "Innerlijk-kind-werk klinkt als het soort ding dat alleen bestaat in bepaalde therapiekringen. Maar het concept berust op iets eenvoudigs en goed ondersteund door hechting-onderzoek."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "De meeste emotionele patronen die we in de volwassenheid dragen \u2014 de angst voor verlating, de behoefte aan goedkeuring, de moeilijkheid met woede, de overtuiging dat we te veel of niet genoeg zijn \u2014 werden gevormd in de kindertijd. Het waren de emotionele conclusies die we trokken over de wereld op basis van vroege ervaringen. En omdat die conclusies werden gemaakt door een klein persoon die beperkt vermogen had tot redeneren over context en complexiteit, zijn ze vaak onjuist.",
                            "De hechtingstheorie van John Bowlby demonstreerde dat de manier waarop we verbinding ervaarden met onze vroegste verzorgers templates cre\u00ebrt \u2014 interne werkende modellen \u2014 die we meenemen naar elke relatie die we daarna hebben. We verwachten dat nieuwe mensen ons behandelen zoals de eerste mensen dat deden. We reageren op nieuwe situaties met de emotionele hulpmiddelen beschikbaar op vijf, of acht, of twaalf jaar."
                        ],
                        "questions": [
                            "1.  Wat had het kind dat je ooit was het meest nodig van de volwassenen om hen heen?",
                            "2.  Welke van jouw huidige emotionele patronen kun je traceren naar vroege ervaringen?",
                            "3.  Wat zou het betekenen om je innerlijke kind met mededogen te behandelen in plaats van ongeduld?",
                            "4.  Op welke delen van je kinderzelf ben je het meest trots? Het meest bedroefd voor?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-20",
                "bookId": "healing-journal-nl",
                "day": 20,
                "title": "Vertrouwen",
                "phase": "Week 3: Herkadering & Identiteit",
                "description": "Vertrouwen",
                "content": [
                    {
                        "type": "intro",
                        "title": "Vertrouwen",
                        "quote": "\u201cVertrouwen wordt niet hersteld in \u00e9\u00e9n enkele beslissing, maar in duizend kleine.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Vertrouwen",
                            "Vertrouwen is een van de dingen die het meest worden gebroken door pijnlijke ervaringen \u2014 en een van de moeilijksten om te herbouwen."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Wanneer we zijn verraden, verlaten of teleurgesteld door mensen op wie we vertrouwden, leert het zenuwstelsel een les: mensen zijn niet veilig. Liefde is gevaarlijk. Verbinding leidt tot verlies. Dit zijn beschermende conclusies. Ze maken zin gezien het beschikbare bewijs.",
                            "Maar ze kunnen ook verstenen tot muren."
                        ],
                        "questions": [
                            "Schrijf over de specifieke ervaring die vertrouwen voor jou het moeilijkst heeft gemaakt. Niet om het opnieuw te beleven, maar om te erkennen: hier komt de overtuiging vandaan dat mensen niet vertrouwd kunnen worden. Vraag dan: dient die overtuiging je nu, of beperkt het je?",
                            "1.  Welke ervaringen hebben jouw huidige vermogen om te vertrouwen het meest gevormd?",
                            "2.  In welke situaties vind je vertrouwen het gemakkelijkst? In welke situaties is het bijna onmogelijk?",
                            "3.  Hoeveel vertrouw je jezelf \u2014 je instincten, je oordeel, je vermogen om moeilijke dingen aan te kunnen?",
                            "4.  Wat zou er moeten gebeuren om je veilig genoeg te voelen om weer te vertrouwen?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-21",
                "bookId": "healing-journal-nl",
                "day": 21,
                "title": "Levensdoel",
                "phase": "Week 3: Herkadering & Identiteit",
                "description": "Levensdoel",
                "content": [
                    {
                        "type": "intro",
                        "title": "Levensdoel",
                        "quote": "\u201cLevensdoel is niet iets wat je vindt als een sleutel onder een deurmat. Het is iets wat je bouwt door aandacht te besteden aan wat je het meest levend doet voelen.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Levensdoel",
                            "De vraag naar levensdoel \u2014 waarom ben ik hier, wat betekent mijn leven, wat moet ik doen \u2014 kan zowel diep motiverend als diep angstaanjagend aanvoelen, afhankelijk van waar je je in je leven bevindt."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Viktor Frankl, die de nazi-concentratiekampen overleefde en vervolgens de logotherapie ontwikkelde, stelde dat de zoektocht naar betekenis de primaire menselijke drijfveer is. Zijn werk toonde aan dat mensen bijna alles konden verdragen als ze een reden hadden. En dat in de afwezigheid van betekenis, lijden ondraaglijk wordt op een manier dat lijden-met-betekenis dat niet is.",
                            "Levensdoel hoeft niet groots te zijn. Onderzoek door psycholoog Michael Steger suggereert dat betekenis in het leven minder gaat over het vinden van \u00e9\u00e9n massief levensdoel en meer over de opeenstapeling van kleinere ervaringen die significant aanvoelen: de relatie die telt, het werk dat bijdraagt, de creatieve daad die iets waars uitdrukt."
                        ],
                        "questions": [
                            "Schrijf over drie momenten in je leven dat je je werkelijk levend en betrokken voelde. Niet noodzakelijk gelukkig, maar aanwezig en doelgericht. Wat waren de gemeenschappelijke elementen?",
                            "1.  Wat zou je doen als je wist dat niemand keek en je niet kon falen?",
                            "2.  Wanneer voel je je het meest jezelf? Het meest betrokken? Het meest nuttig?",
                            "3.  Wat heeft altijd voor jou van belang geweest, zelfs voordat je er woorden voor had?",
                            "4.  Als je \u00e9\u00e9n ding aan de wereld kon bijdragen voor je sterft, wat zou dat zijn?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-22",
                "bookId": "healing-journal-nl",
                "day": 22,
                "title": "Moed",
                "phase": "Week 4: Integratie & Bloei",
                "description": "Moed",
                "content": [
                    {
                        "type": "intro",
                        "title": "Moed",
                        "quote": "\u201cMoed is niet de afwezigheid van angst. Het is beslissen dat iets meer telt dan de angst.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Moed",
                            "Moed is geromantiseerd op een manier die het aanvoelt als iets dat alleen beschikbaar is voor buitengewone mensen in buitengewone omstandigheden. Maar de moed die gewone levens verandert is stiller dan dat."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Het is de moed om het moeilijke gesprek te voeren. Om de relatie te verlaten die je langzaam vermindert. Om iets te proberen waar je bij kunt mislukken. Om het oneens te zijn met iemand wiens goedkeuring je nodig hebt. Om je echte zelf te tonen aan mensen die alleen de bewerkte versie kennen.",
                            "Acts of Valor-onderzoek door psychologen Cynthia Pury en Shane Lopez ontdekte dat persoonlijke moed \u2014 het soort dat de meesten van ons dagelijks tegenkomen \u2014 wordt gedefinieerd niet door de afwezigheid van angst maar door actie ondernomen ondanks het. Moed, met andere woorden, omvat altijd angst. Het omvat ook altijd iets anders: de beslissing dat het ding waarvoor je bang bent de moeite waard is om te trotseren."
                        ],
                        "questions": [
                            "Schrijf over \u00e9\u00e9n gebied van je leven waar je vermijding boven moed hebt gekozen. Hoe zou de moedige actie eruit zien? Wat ben je het meest bang dat er zou gebeuren als je het deed?",
                            "1.  Wanneer was de laatste keer dat je iets deed wat echte moed vereiste? Hoe voelde het daarna?",
                            "2.  Wat is iets wat je al maanden wilt doen maar waarvoor je steeds redenen vindt om het niet te doen?",
                            "3.  Wat kost angst jou in je leven op dit moment?",
                            "4.  Wie ken je die de soort moed toont die je het meest bewondert? Wat kun je van hen leren?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-23",
                "bookId": "healing-journal-nl",
                "day": 23,
                "title": "Dankbaarheid",
                "phase": "Week 4: Integratie & Bloei",
                "description": "Dankbaarheid",
                "content": [
                    {
                        "type": "intro",
                        "title": "Dankbaarheid",
                        "quote": "\u201cDankbaarheid gaat niet over doen alsof alles goed is. Het gaat over vinden wat echt en goed is, zelfs als het omringd is door wat moeilijk is.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Dankbaarheid",
                            "Dankbaarheid is een wellness-cli\u00ech\u00e9 geworden, en dat is jammer, want de wetenschap erachter is werkelijk overtuigend."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Robert Emmons, de psycholoog die dankbaarheid misschien grondiger heeft bestudeerd dan wie dan ook, ontdekte dat mensen die regelmatige dankbaarheid oefenden \u2014 specifiek de bewuste daad van het opmerken en erkennen van wat ze hebben ontvangen \u2014 hogere niveaus van positieve emotie, betere slaap, meer mededogen en grotere veerkracht ervaarden dan degenen die dat niet deden.",
                            "Maar de dankbaarheid die hij bestudeerde is niet de toxisch-positieve, \u201cwees gewoon dankbaar\u201d-versie die moeilijkheid uitwist. Het is een meer genuanceerde oefening: erkennen dat goedheid naast tegenspoed bestaat, en dat het opmerken ervan geen verraad is van de pijn."
                        ],
                        "questions": [
                            "1.  Wat is gemakkelijk als vanzelfsprekend te beschouwen in je leven dat eigenlijk enorm geluk vereist?",
                            "2.  Wie heeft bijgedragen aan wie je bent op manieren die je nog niet volledig hebt erkend?",
                            "3.  Is er iets momenteel pijnlijks in je leven dat ook iets bevat om dankbaar voor te zijn?",
                            "4.  Hoe zou jouw dagelijkse ervaring verschuiven als je werkelijk zocht naar wat goed was?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-24",
                "bookId": "healing-journal-nl",
                "day": 24,
                "title": "Vreugde",
                "phase": "Week 4: Integratie & Bloei",
                "description": "Vreugde",
                "content": [
                    {
                        "type": "intro",
                        "title": "Vreugde",
                        "quote": "\u201cVreugde is niet de afwezigheid van pijn. Het is het vermogen om beide vast te houden \u2014 het pijn en het leven \u2014 tegelijkertijd.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Vreugde",
                            "Vreugde verschilt van geluk. Geluk is een reactie op gunstige omstandigheden. Vreugde is iets dat kan bestaan zelfs als omstandigheden moeilijk zijn \u2014 een gevoel van levendigheid, betrokkenheid en echte vreugde in het hier zijn."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Veel mensen die door pijnlijke perioden zijn gegaan verliezen toegang tot vreugde. Niet omdat ze gebroken zijn, maar omdat het zenuwstelsel in overlevingsmodus alle beschikbare middelen omleidt naar dreigingsbeheer. Er is geen bandbreedte voor verrukking als je alleen maar probeert erdoorheen te komen.",
                            "Het onderzoek van Bren\u00e9 Brown vond iets onverwachts: vreugde is eigenlijk een van de meest kwetsbare emoties. Mensen zijn er vaak bang voor het volledig te voelen, omdat ze hebben geleerd dat goede dingen eindigen. Ze beoefenen wat ze \u201changende vreugde\u201d noemt \u2014 de gewoonte van bij voorbaat voorstellen hoe een goed ding mis kan gaan, als een vorm van zelfbescherming."
                        ],
                        "questions": [
                            "1.  Wanneer voelde je voor het laatst echte, ongecompliceerde vreugde? Wat waren de omstandigheden?",
                            "2.  Is er iets wat je vroeger vreugde bracht dat je bent gestopt te doen? Wat is er gebeurd?",
                            "3.  Vind je het moeilijk om goede momenten te laten landen? Berei je je voor op het einde ervan?",
                            "4.  Wat zou het betekenen om jezelf toe te staan je goed te voelen zonder schuldgevoel?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-25",
                "bookId": "healing-journal-nl",
                "day": 25,
                "title": "Loslaten",
                "phase": "Week 4: Integratie & Bloei",
                "description": "Loslaten",
                "content": [
                    {
                        "type": "intro",
                        "title": "Loslaten",
                        "quote": "\u201cSommige dingen kunnen maar zo lang gedragen worden voordat het gewicht ervan de hele reis wordt.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Loslaten",
                            "Er zijn dingen waar we aan vasthouden lang na het punt waarop ze ons helpen. Oude pijnen. Wrokgevoelens. Versies van onszelf die niet langer accuraat zijn. Plannen voor een toekomst die niet meer mogelijk is. De relatie die eindigde maar in onze gedachten blijft leven. Het gesprek dat wordt herhaald zelfs als we alles zouden geven om het te laten stoppen."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Vasthouden is menselijk. Wanneer iets voor ons van belang was, is het logisch dat we het niet simpelweg neerleggen. De geest probeert betekenis te extraheren, resolutie te vinden, iets te doen met wat er is gebeurd.",
                            "Maar er komt een punt waarop blijven vasthouden geen verwerking is \u2014 het is simpelweg gewicht."
                        ],
                        "questions": [
                            "Schrijf over iets wat je hebt gedragen waarvan je op een bepaald niveau weet dat het tijd is het neer te zetten. Niet om het te minimaliseren, maar om eerlijk te vragen: hoe zou jouw leven eruit zien als je het niet langer hieromheen organiseerde?",
                            "1.  Waaraan houd je vast dat je niet langer dient?",
                            "2.  Wat vrees je dat er zou gebeuren als je het werkelijk losliet?",
                            "3.  Is er iemand die je moet loslaten uit het verhaal dat je over hen hebt verteld?",
                            "4.  Wie zou je zijn aan de andere kant van dit loslaten?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-26",
                "bookId": "healing-journal-nl",
                "day": 26,
                "title": "Hoop",
                "phase": "Week 4: Integratie & Bloei",
                "description": "Hoop",
                "content": [
                    {
                        "type": "intro",
                        "title": "Hoop",
                        "quote": "\u201cHoop is geen optimisme. Het is de hardnekkige aandrang om naar iets beters te bewegen, zelfs als het bewijs dun is.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Hoop",
                            "Hoop is vaak verward met wensdenken \u2014 een passief geloof dat de dingen zullen uitwerken. Maar psycholoog C.R. Snyder besteedde decennia aan het onderzoeken van hoop en vond iets actiever en interessanter."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "In Snyders model heeft hoop drie componenten: een doel (iets waard om naartoe te bewegen), paden-denken (het vermogen om routes naar dat doel te genereren) en agentschaps-denken (het geloof dat je die routes werkelijk kunt nemen). Hoop is niet passief. Het is strategisch. Het vereist zowel geloof in de bestemming als vertrouwen in iemands vermogen om te navigeren.",
                            "Dit is waarom hoop schaars kan aanvoelen tijdens depressie of burn-out: de paden zijn verduisterd en het gevoel van agentschap is ge\u00ebrodeerd. Wanneer mensen moeite hebben een andere toekomst voor te stellen of niet geloven dat ze die kunnen bereiken, stort hoop in."
                        ],
                        "questions": [
                            "1.  Hoe voelt hoop in jouw lichaam, vergeleken met wanhoop?",
                            "2.  Op welke gebieden van je leven is hoop de laatste tijd het moeilijkst bereikbaar geweest?",
                            "3.  Is er een kleinere versie van een doel waarvan je hebt afgezien dat misschien nog steeds mogelijk is?",
                            "4.  Wie of wat is in het verleden een bron van echte hoop voor je geweest?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-27",
                "bookId": "healing-journal-nl",
                "day": 27,
                "title": "Relaties",
                "phase": "Week 4: Integratie & Bloei",
                "description": "Relaties",
                "content": [
                    {
                        "type": "intro",
                        "title": "Relaties",
                        "quote": "\u201cWe helen niet in isolatie. We helen in de aanwezigheid van mensen die ons werkelijk zien.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Relaties",
                            "Vrijwel elke onderzoeker die lang genoeg het menselijk welzijn heeft bestudeerd, komt tot dezelfde conclusie: de kwaliteit van onze relaties is belangrijker dan bijna alles anders. Meer dan rijkdom, status, dieet of lichaamsbeweging. De Harvard-studie naar volwassenwording, een van de langstlopende studies naar menselijk geluk, volgde mannen meer dan tachtig jaar en ontdekte dat hechte relaties \u2014 niet prestatie, niet rijkdom \u2014 de sterkste voorspeller waren van welzijn op latere leeftijd."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Dit betekent niet dat je een groot sociaal netwerk nodig hebt. Onderzoek naar hechting en welzijn suggereert dat een handvol werkelijk hechte relaties \u2014 gekenmerkt door wederkerigheid, vertrouwen en het vermogen om kwetsbaar te zijn \u2014 veel meer telt dan breedte van kennissenkring.",
                            "Maar hechte relaties vereisen dingen die niet altijd gemakkelijk komen na pijn: kwetsbaarheid, de bereidheid om gekend te worden, het vermogen om behoefte te tonen. En ze vereisen onderhoud \u2014 niet grote gebaren, maar de opgehoopte kleine momenten van opdagen, reageren, aandacht besteden."
                        ],
                        "questions": [
                            "Kijk naar de relaties in jouw leven. Welke voeden je werkelijk? Welke kosten je meer dan ze geven? Wat is \u00e9\u00e9n relatie die het waard is om dieper in te investeren?",
                            "1.  Hoe voelt een werkelijk voedzame relatie voor jou? Wie in je leven biedt dat?",
                            "2.  Is er een relatie die je hebt onderhouden uit gewoonte of verplichting die geen van jullie meer dient?",
                            "3.  Welke patronen uit je verleden merk je dat ze zich herhalen in je huidige relaties?",
                            "4.  Wat zou er nodig zijn voor jou om meer volledig aanwezig te zijn in de relaties die het meest voor je van belang zijn?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-28",
                "bookId": "healing-journal-nl",
                "day": 28,
                "title": "Vooruitgaan",
                "phase": "Week 4: Integratie & Bloei",
                "description": "Vooruitgaan",
                "content": [
                    {
                        "type": "intro",
                        "title": "Vooruitgaan",
                        "quote": "\u201cVooruit gaan betekent niet dat het verleden er niet meer toe doet. Het betekent dat je hebt besloten je toekomst net zo belangrijk te laten zijn.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Vooruitgaan",
                            "Vooruitgaan is niet hetzelfde als verdergaan. Verdergaan impliceert iets achter je laten, het vergeten, een schone lei bereiken. Vooruitgaan is anders: het betekent dragen wat je hebt geleerd, integreren wat je hebt overleefd, en kiezen om van hieruit te bouwen in plaats van te wachten totdat de pijn volledig is opgelost voordat je begint."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Posttraumatische groei \u2014 een term bedacht door psychologen Richard Tedeschi en Lawrence Calhoun \u2014 beschrijft de echte positieve verandering die veel mensen ervaren als gevolg van het worstelen met tegenspoed. Het is niet dat het trauma goed was. Het is dat in het proces van ermee worstelen, mensen krachten ontdekken die ze niet wisten dat ze hadden, relaties die ze niet hadden gewaardeerd en perspectieven die voor hen niet beschikbaar waren.",
                            "Dit gebeurt niet automatisch of universeel. Het vereist bewuste reflectie, ondersteuning en de bereidheid om actief betekenis te maken in plaats van erop te wachten dat het aankomt."
                        ],
                        "questions": [
                            "Schrijf over wie je was toen je met dit werkboek begon en wie je nu bent, ook als de verandering klein aanvoelt. Wat heb je geleerd? Wat heb je losgelaten? Wat heb je opgepakt?",
                            "1.  Waar ben je in de afgelopen 28 dagen oprecht trots op?",
                            "2.  Wat is \u00e9\u00e9n manier waarop je jezelf beter hebt behandeld tijdens deze weken dan daarvoor?",
                            "3.  Wat betekent \u201cvooruitgaan\u201d specifiek voor jouw leven op dit moment?",
                            "4.  Wat wil je achterlaten als je het volgende hoofdstuk ingaat?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-29",
                "bookId": "healing-journal-nl",
                "day": 29,
                "title": "Wie Je Wordt",
                "phase": "Week 4: Integratie & Bloei",
                "description": "Wie Je Wordt",
                "content": [
                    {
                        "type": "intro",
                        "title": "Wie Je Wordt",
                        "quote": "\u201cDe persoon die je wordt, wordt stil samengesteld, in de gewone momenten waarvoor je kiest aanwezig te zijn.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Wie Je Wordt",
                            "Er is een versie van jou die nog niet bestaat. Niet in de zin van iemand onherkenbaar, maar in de zin van iemand die heeft ge\u00efntegreerd wat ze hebben doorgemaakt en erin is gegroeid in plaats van erdoor verminderd."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Identiteit is niet vaststaand. Psychologisch onderzoek naar persoonlijkheid en zelfconcept toont consistent aan dat mensen aanzienlijk veranderen gedurende het volwassen leven \u2014 vooral tijdens perioden van opzettelijke reflectie en groei. Het zelf is geen afgerond ding. Het is een project.",
                            "En de meest effectieve manier om vorm te geven aan wie je wordt is niet door dramatische transformaties of plotselinge inzichten. Het is door de opeenstapeling van kleine, consistente keuzes \u2014 de keuzes die je in het geheim maakt, wanneer niets eraan significant aanvoelt."
                        ],
                        "questions": [
                            "2.  Welke nieuwe overtuiging over jezelf heeft zich stil geworteld tijdens dit proces?",
                            "3.  Welke gewoonte uit deze 30 dagen wil je het meest meenemen?",
                            "4.  Hoe zou de beste versie van jezelf \u2014 niet perfect, gewoon het meest volledig zichzelf \u2014 eruit zien?"
                        ]
                    }
                ]
            },
            {
                "id": "healing-journal-nl-30",
                "bookId": "healing-journal-nl",
                "day": 30,
                "title": "Je Hebt Het Gehaald",
                "phase": "Week 4: Integratie & Bloei",
                "description": "Je Hebt Het Gehaald",
                "content": [
                    {
                        "type": "intro",
                        "title": "Je Hebt Het Gehaald",
                        "quote": "\u201cDit is niet het einde. Dit is de eerste dag van de rest van je leven met jezelf als jouw eigen getuige.\u201d",
                        "author": "Joseph I.",
                        "text": [
                            "Je Hebt Het Gehaald",
                            "Dertig dagen geleden begon je met iets. Je opende een werkboek, wat gemakkelijk is. En daarna keerde je er naar terug, wat moeilijk is. En je keerde terug. En weer."
                        ],
                        "image": "\u2728",
                        "imageColor": "bg-teal-100 dark:bg-teal-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Oefening van Vandaag",
                        "text": [
                            "Je zat bij vragen die oncomfortabel waren. Je schreef dingen die moeilijk te zeggen waren, zelfs voor een dagboek. Je probeerde oefeningen die onwennig aanvoelden. Je was er op de dagen dat je er geen zin in had, omdat een deel van jou geloofde dat het de moeite waard was.",
                            "Die overtuiging was niet verkeerd."
                        ],
                        "questions": [
                            "1.  Terugkijkend, wat was de belangrijkste dag of les in dit werkboek voor jou?",
                            "2.  Wat weet je nu over jezelf dat je dertig dagen geleden niet wist?",
                            "3.  Wat zul je in de toekomst anders doen, niet vanuit discipline, maar omdat je het wilt?",
                            "4.  Waarvoor ben je dankbaar \u2014 werkelijk dankbaar \u2014 als dit hoofdstuk sluit?"
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "confidence-30-en",
        "title": "Confidence in 30 Days",
        "subtitle": "Overcoming Social Anxiety & Building Lasting Self-Confidence",
        "author": "Joseph I.",
        "language": "EN",
        "coverColor": "bg-indigo-600",
        "accentColor": "indigo",
        "description": "Cognitive Behavioral Therapy (CBT) workbooks for breaking the anxiety cycle through behavioral exposure.",
        "totalDays": 30,
        "lessons": [
            {
                "id": "confidence-30-en-1",
                "bookId": "confidence-30-en",
                "day": 1,
                "title": "Name Your Fear",
                "phase": "Week 1: Confronting Anxiety",
                "description": "Write down three specific social situations that trigger anxiety for you. For each one, note exactly what you fear might happen. Be honest and specific \u2014 this is your private space. WHY IT WORKS Naming our fears takes away some of their power. Research shows that labeling emotions (a technique",
                "content": [
                    {
                        "type": "intro",
                        "title": "Name Your Fear",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Naming our fears takes away some of their power. Research shows that labeling emotions (a technique called 'affect labeling') activates the prefrontal cortex and reduces the amygdala's fear response. You're literally calming your brain by writing. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Write down three specific social situations that trigger anxiety for you. For each one, note exactly what you fear might happen. Be honest and specific \u2014 this is your private space. WHY IT WORKS Naming our fears takes away some of their power. Research shows that labeling emotions (a technique"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-2",
                "bookId": "confidence-30-en",
                "day": 2,
                "title": "The Anxious Body Scan",
                "phase": "Week 1: Confronting Anxiety",
                "description": "Spend five minutes doing a body scan. Starting at your feet, notice every physical sensation without judgment. When you find tension, breathe into it and release. Then journal what you discovered. WHY IT WORKS Social anxiety lives in the body just as much as the mind. CBT research shows that somatic awareness \u2014",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Anxious Body Scan",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Social anxiety lives in the body just as much as the mind. CBT research shows that somatic awareness \u2014 noticing physical sensations \u2014 breaks the anxiety feedback loop. When you observe a sensation, you step out of the fear narrative and into the present. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Spend five minutes doing a body scan. Starting at your feet, notice every physical sensation without judgment. When you find tension, breathe into it and release. Then journal what you discovered. WHY IT WORKS Social anxiety lives in the body just as much as the mind. CBT research shows that somatic awareness \u2014"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-3",
                "bookId": "confidence-30-en",
                "day": 3,
                "title": "Rewrite the Story",
                "phase": "Week 1: Confronting Anxiety",
                "description": "Think of one recent social situation that went badly (in your mind). Write the story as you experienced it. Then rewrite it from a neutral observer's perspective \u2014 a journalist reporting the facts without interpreting what others thought of you. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Rewrite the Story",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Our anxious minds specialize in mind-reading and catastrophizing. CBT calls this 'cognitive distortion.' The neutral observer rewrite trains your brain to separate facts from interpretations, weakening the power of negative self-stories. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Think of one recent social situation that went badly (in your mind). Write the story as you experienced it. Then rewrite it from a neutral observer's perspective \u2014 a journalist reporting the facts without interpreting what others thought of you. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-4",
                "bookId": "confidence-30-en",
                "day": 4,
                "title": "One Small Hello",
                "phase": "Week 1: Confronting Anxiety",
                "description": "Today's challenge: make small talk with one person you wouldn't normally speak to \u2014 a cashier, a neighbor, a colleague. It doesn't need to go beyond 30 seconds. Just say hello and one thing (nice weather, busy today, etc.). WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "One Small Hello",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Behavioral activation is a cornerstone of CBT for anxiety. Every time you approach instead of avoid, you send your nervous system evidence that the situation is survivable. Small exposures build a foundation for larger ones. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Today's challenge: make small talk with one person you wouldn't normally speak to \u2014 a cashier, a neighbor, a colleague. It doesn't need to go beyond 30 seconds. Just say hello and one thing (nice weather, busy today, etc.). WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-5",
                "bookId": "confidence-30-en",
                "day": 5,
                "title": "The 5-4-3-2-1 Reset",
                "phase": "Week 1: Confronting Anxiety",
                "description": "Practice the 5-4-3-2-1 grounding technique: identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. Do this slowly. Use it tonight if you feel anxious, or set a timer and do it right now. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The 5-4-3-2-1 Reset",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Grounding techniques work by re-engaging the sensory cortex, which competes with the fear centers of the brain for neural resources. When your attention is anchored in present-moment sensory experience, catastrophic thinking weakens. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Practice the 5-4-3-2-1 grounding technique: identify 5 things you can see, 4 you can touch, 3 you can hear, 2 you can smell, 1 you can taste. Do this slowly. Use it tonight if you feel anxious, or set a timer and do it right now. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-6",
                "bookId": "confidence-30-en",
                "day": 6,
                "title": "Your Inner Critic Audit",
                "phase": "Week 1: Confronting Anxiety",
                "description": "For one hour today, notice every negative thought you have about yourself in social situations. Write each one down exactly as it sounds. Don't fight it \u2014 just capture it. At the end of the hour, read them back. Would you say any of these to a friend? WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Your Inner Critic Audit",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "The inner critic is often so habitual we don't even notice it running. Making it visible is the first step to defusing it. CBT's cognitive restructuring begins with this kind of thought-catching, which builds meta-awareness \u2014 the ability to observe your thoughts rather than be swept away by them. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "For one hour today, notice every negative thought you have about yourself in social situations. Write each one down exactly as it sounds. Don't fight it \u2014 just capture it. At the end of the hour, read them back. Would you say any of these to a friend? WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-7",
                "bookId": "confidence-30-en",
                "day": 7,
                "title": "What Anxiety Costs You",
                "phase": "Week 1: Confronting Anxiety",
                "description": "Make a list of things you've missed out on because of social anxiety \u2014 opportunities, relationships, experiences, career moments. Be honest. This isn't about shame; it's about clarity on what you're working toward. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "What Anxiety Costs You",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Motivational clarity is a powerful driver in CBT treatment. When we clearly see what avoidance has cost us, we create a compelling reason to push through discomfort. This exercise activates values-based motivation rather than fear-based avoidance. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Make a list of things you've missed out on because of social anxiety \u2014 opportunities, relationships, experiences, career moments. Be honest. This isn't about shame; it's about clarity on what you're working toward. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-8",
                "bookId": "confidence-30-en",
                "day": 8,
                "title": "The Spotlight Illusion",
                "phase": "Week 2: Social Exposure & Reframing",
                "description": "Today, in one social setting, deliberately notice how much attention other people are paying to each other versus to you. Actually observe them. Are they watching you as closely as you imagine, or are they absorbed in their own worlds? WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Spotlight Illusion",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "The 'spotlight effect' is a well-documented cognitive bias: we believe others notice and evaluate us far more than they actually do. Research by Gilovich & Savitsky shows people consistently overestimate how much others observe them. This experiment gives you direct evidence against the illusion. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Today, in one social setting, deliberately notice how much attention other people are paying to each other versus to you. Actually observe them. Are they watching you as closely as you imagine, or are they absorbed in their own worlds? WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-9",
                "bookId": "confidence-30-en",
                "day": 9,
                "title": "Design a Brave Ladder",
                "phase": "Week 2: Social Exposure & Reframing",
                "description": "Create a 'fear ladder' \u2014 a list of 10 social situations ranked from least scary (1) to most terrifying (10). Don't try to climb it today. Just design it carefully. What would it mean to conquer each rung? WHY IT WORKS Systematic desensitization \u2014 the structured, graduated exposure to feared situations \u2014 is one of the",
                "content": [
                    {
                        "type": "intro",
                        "title": "Design a Brave Ladder",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Systematic desensitization \u2014 the structured, graduated exposure to feared situations \u2014 is one of the most effective CBT tools for social anxiety. The ladder format makes the process feel achievable instead of overwhelming. You're engineering your own exposure therapy. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Create a 'fear ladder' \u2014 a list of 10 social situations ranked from least scary (1) to most terrifying (10). Don't try to climb it today. Just design it carefully. What would it mean to conquer each rung? WHY IT WORKS Systematic desensitization \u2014 the structured, graduated exposure to feared situations \u2014 is one of the"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-10",
                "bookId": "confidence-30-en",
                "day": 10,
                "title": "Compassion for Your Anxious Self",
                "phase": "Week 2: Social Exposure & Reframing",
                "description": "Write a letter to yourself from the perspective of someone who loves you and fully understands your anxiety \u2014 a wise older sibling, a kind therapist, or your ideal mentor. Let them acknowledge your struggle and encourage your progress. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Compassion for Your Anxious Self",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Self-compassion has been shown in multiple studies (Neff, 2011) to reduce anxiety and increase resilience. The act of writing shifts your relationship to your own pain from one of shame and self-attack to one of understanding and support, which is neurologically calming. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Write a letter to yourself from the perspective of someone who loves you and fully understands your anxiety \u2014 a wise older sibling, a kind therapist, or your ideal mentor. Let them acknowledge your struggle and encourage your progress. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-11",
                "bookId": "confidence-30-en",
                "day": 11,
                "title": "The Safety Behavior Trap",
                "phase": "Week 2: Social Exposure & Reframing",
                "description": "Identify three 'safety behaviors' you use in social situations \u2014 things like staying near the door, holding a drink, staying quiet, checking your phone, or over-preparing scripts. Today, in one situation, drop one safety behavior entirely. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Safety Behavior Trap",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Safety behaviors are actions we use to reduce anxiety in the moment, but they paradoxically maintain anxiety long-term by preventing us from learning that the feared outcome won't happen. CBT for social anxiety specifically targets safety behaviors as a key maintaining factor. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Identify three 'safety behaviors' you use in social situations \u2014 things like staying near the door, holding a drink, staying quiet, checking your phone, or over-preparing scripts. Today, in one situation, drop one safety behavior entirely. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-12",
                "bookId": "confidence-30-en",
                "day": 12,
                "title": "Reframe the Blush",
                "phase": "Week 2: Social Exposure & Reframing",
                "description": "Think about a time you showed visible anxiety (blushing, stumbling on words, going blank). Write about it from two angles: (1) how you saw it at the time, and (2) how someone with warmth toward you might have seen it. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Reframe the Blush",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Visible anxiety symptoms often feel catastrophic to us but are interpreted very differently by others. Research shows observers often view visible signs of nervousness as endearing or relatable rather than as incompetence. Reframing shifts the meaning we assign to our symptoms. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Think about a time you showed visible anxiety (blushing, stumbling on words, going blank). Write about it from two angles: (1) how you saw it at the time, and (2) how someone with warmth toward you might have seen it. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-13",
                "bookId": "confidence-30-en",
                "day": 13,
                "title": "The Values Compass",
                "phase": "Week 2: Social Exposure & Reframing",
                "description": "Write down your top five life values (connection, authenticity, achievement, fun, love, growth, etc.). Now identify one specific way your social anxiety is preventing you from living each value. Let this motivate you for the second half of this journey. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Values Compass",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "ACT (Acceptance and Commitment Therapy), closely related to CBT, teaches that values-clarity provides the 'why' behind difficult behavioral changes. When we connect anxiety-reduction to what truly matters to us, we access deeper motivation than willpower alone can provide. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Write down your top five life values (connection, authenticity, achievement, fun, love, growth, etc.). Now identify one specific way your social anxiety is preventing you from living each value. Let this motivate you for the second half of this journey. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-14",
                "bookId": "confidence-30-en",
                "day": 14,
                "title": "Ask a Real Question",
                "phase": "Week 2: Social Exposure & Reframing",
                "description": "In your next social interaction, ask the other person a genuine question \u2014 not a script, but something you're actually curious about. Listen with real interest. Notice what happens to your anxiety when your attention shifts outward. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Ask a Real Question",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Attention bias is a major factor in social anxiety: we focus inward on our performance rather than outward on the conversation. Research shows that an external (other-focused) attention style dramatically reduces anxiety in social situations. Genuine curiosity is the fastest route to external focus. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "In your next social interaction, ask the other person a genuine question \u2014 not a script, but something you're actually curious about. Listen with real interest. Notice what happens to your anxiety when your attention shifts outward. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-15",
                "bookId": "confidence-30-en",
                "day": 15,
                "title": "Halfway There",
                "phase": "Week 3: Building Social Courage",
                "description": "You're 15 days in. Write a letter to yourself from 15 days ago. What have you learned? What surprised you? What are you most proud of? Then write a note from your Day 30 self back to you today with encouragement. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Halfway There",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Self-reflection is a core metacognitive skill that reinforces learning and builds self-awareness. Marking the halfway point explicitly creates a psychological 'chapter break' that consolidates progress and refreshes motivation for the second half of the journey. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "You're 15 days in. Write a letter to yourself from 15 days ago. What have you learned? What surprised you? What are you most proud of? Then write a note from your Day 30 self back to you today with encouragement. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-16",
                "bookId": "confidence-30-en",
                "day": 16,
                "title": "Decatastrophize",
                "phase": "Week 3: Building Social Courage",
                "description": "Choose your biggest social fear right now. Walk it through this CBT exercise: (1) What's the worst that could happen? (2) How likely is it really (0\u2013100%)? (3) If it DID happen, could I survive it? (4) What's the most likely outcome? (5) What's the best that could happen? WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Decatastrophize",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Decatastrophizing is a foundational cognitive restructuring technique. By examining feared outcomes through probability and coping capacity, we shift from 'what if' catastrophe to realistic assessment. The key insight: we can almost always survive outcomes we fear most. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Choose your biggest social fear right now. Walk it through this CBT exercise: (1) What's the worst that could happen? (2) How likely is it really (0\u2013100%)? (3) If it DID happen, could I survive it? (4) What's the most likely outcome? (5) What's the best that could happen? WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-17",
                "bookId": "confidence-30-en",
                "day": 17,
                "title": "Eye Contact Experiment",
                "phase": "Week 3: Building Social Courage",
                "description": "Today, practice comfortable eye contact. In conversations, try to hold eye contact for 3\u20134 seconds at a time before looking away naturally. Notice how people respond. Practice with strangers (cashiers, baristas) before trying it in more intense social settings. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Eye Contact Experiment",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Avoiding eye contact is a classic safety behavior in social anxiety that signals discomfort to others and maintains the anxiety loop. Comfortable eye contact communicates confidence and builds social connection. Like any skill, it improves with deliberate practice. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Today, practice comfortable eye contact. In conversations, try to hold eye contact for 3\u20134 seconds at a time before looking away naturally. Notice how people respond. Practice with strangers (cashiers, baristas) before trying it in more intense social settings. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-18",
                "bookId": "confidence-30-en",
                "day": 18,
                "title": "The Compliment Challenge",
                "phase": "Week 3: Building Social Courage",
                "description": "Give three genuine, specific compliments today to three different people. Not generic ('nice shirt') but specific ('I really appreciated how clearly you explained that in the meeting'). Observe how people respond, and notice how giving kindness affects you. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Compliment Challenge",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Giving compliments is a form of prosocial behavior that shifts focus outward, reduces self-monitoring, and builds rapport. Research shows that people who give more compliments feel more socially connected and less anxious. It also challenges the assumption that initiating positive contact is risky. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Give three genuine, specific compliments today to three different people. Not generic ('nice shirt') but specific ('I really appreciated how clearly you explained that in the meeting'). Observe how people respond, and notice how giving kindness affects you. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-19",
                "bookId": "confidence-30-en",
                "day": 19,
                "title": "The Imperfect Conversation",
                "phase": "Week 3: Building Social Courage",
                "description": "Have a conversation today where you allow yourself to be imperfect: stumble on a word, admit you don't know something, use humor that falls flat. Don't rescue the situation. Just keep going. Notice: did the conversation end? Did anyone leave? WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Imperfect Conversation",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Perfectionism is a core driver of social anxiety. We believe we must perform flawlessly to be accepted. This exposure deliberately introduces imperfection to test that belief. The expected catastrophe almost never occurs, and the experience provides powerful corrective data. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Have a conversation today where you allow yourself to be imperfect: stumble on a word, admit you don't know something, use humor that falls flat. Don't rescue the situation. Just keep going. Notice: did the conversation end? Did anyone leave? WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-20",
                "bookId": "confidence-30-en",
                "day": 20,
                "title": "Write Your Own Narrative",
                "phase": "Week 3: Building Social Courage",
                "description": "Write a first-person story of yourself as a confident, socially capable person. Write it as if it's already true and you're looking back. Include specific scenes, how you speak, how you handle discomfort, how people respond to you. Write at least one full page. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Write Your Own Narrative",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Narrative therapy and mental rehearsal both show that creating a vivid future self helps the brain lay down neural pathways associated with confidence. Athletes use visualization for the same reason. Your brain doesn't fully distinguish between a vivid imagined experience and a real one. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Write a first-person story of yourself as a confident, socially capable person. Write it as if it's already true and you're looking back. Include specific scenes, how you speak, how you handle discomfort, how people respond to you. Write at least one full page. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-21",
                "bookId": "confidence-30-en",
                "day": 21,
                "title": "Saying No Without Guilt",
                "phase": "Week 3: Building Social Courage",
                "description": "Practice saying no (or a softer version: 'I can't make that work') to one request today that you would normally say yes to out of social anxiety. Notice the discomfort. Notice also that the world doesn't end. WHY IT WORKS People-pleasing and difficulty with boundaries are common in social anxiety. Learning to say no tests the",
                "content": [
                    {
                        "type": "intro",
                        "title": "Saying No Without Guilt",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "People-pleasing and difficulty with boundaries are common in social anxiety. Learning to say no tests the belief that others will reject or punish us for having limits. Boundary-setting builds self-respect and signals to others that you value your own time and energy. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Practice saying no (or a softer version: 'I can't make that work') to one request today that you would normally say yes to out of social anxiety. Notice the discomfort. Notice also that the world doesn't end. WHY IT WORKS People-pleasing and difficulty with boundaries are common in social anxiety. Learning to say no tests the"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-22",
                "bookId": "confidence-30-en",
                "day": 22,
                "title": "The Curious Naturalist",
                "phase": "Week 4: Lasting Confidence",
                "description": "In your next social situation, pretend you are a curious scientist observing social behavior \u2014 including your own. What do you notice about how people interact, what they care about, how anxiety shows up in others? Approach it with fascination, not fear. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Curious Naturalist",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Defusion \u2014 stepping back and observing your experience rather than being immersed in it \u2014 is a powerful ACT technique. The 'scientist' frame creates psychological distance that reduces threat response and replaces self-consciousness with curiosity. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "In your next social situation, pretend you are a curious scientist observing social behavior \u2014 including your own. What do you notice about how people interact, what they care about, how anxiety shows up in others? Approach it with fascination, not fear. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-23",
                "bookId": "confidence-30-en",
                "day": 23,
                "title": "The Long Game",
                "phase": "Week 4: Lasting Confidence",
                "description": "Imagine your life in five years \u2014 two versions. In the first, you changed nothing and anxiety continues to limit you. In the second, you've done the work and confidence is part of who you are. Write both visions in vivid detail. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Long Game",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Future self-continuity research shows that people who can vividly imagine their future self make better decisions in the present. Writing both negative and positive futures activates motivation via contrast. The discomfort of the negative future and the excitement of the positive one combine to drive action. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Imagine your life in five years \u2014 two versions. In the first, you changed nothing and anxiety continues to limit you. In the second, you've done the work and confidence is part of who you are. Write both visions in vivid detail. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-24",
                "bookId": "confidence-30-en",
                "day": 24,
                "title": "Repair a Relationship",
                "phase": "Week 4: Lasting Confidence",
                "description": "Think of a relationship that anxiety has held at arm's length. Reach out to that person today \u2014 a text, a call, a note. It doesn't have to be a grand gesture. Just re-open the door. If no relationship comes to mind, make plans with someone you've been avoiding. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Repair a Relationship",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Social anxiety frequently leads to relationship withdrawal and isolation, which in turn deepens anxiety. Reconnection challenges the belief that we are unwanted or burdensome. Each act of re-engagement rewires the brain's prediction of social rejection toward social acceptance. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Think of a relationship that anxiety has held at arm's length. Reach out to that person today \u2014 a text, a call, a note. It doesn't have to be a grand gesture. Just re-open the door. If no relationship comes to mind, make plans with someone you've been avoiding. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-25",
                "bookId": "confidence-30-en",
                "day": 25,
                "title": "Your Confidence Anchors",
                "phase": "Week 4: Lasting Confidence",
                "description": "Write a list of 10 things you are genuinely good at or proud of \u2014 they don't need to be social skills. They can be anything: your loyalty, your cooking, your work ethic, your taste in music. Then write how each one reflects a quality that actually helps you socially. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Your Confidence Anchors",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Building a robust sense of self beyond social performance is protective against social anxiety. When your identity isn't dependent entirely on how others perceive you socially, the stakes of each interaction drop dramatically. Confidence is built from multiple pillars, not just social approval. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Write a list of 10 things you are genuinely good at or proud of \u2014 they don't need to be social skills. They can be anything: your loyalty, your cooking, your work ethic, your taste in music. Then write how each one reflects a quality that actually helps you socially. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-26",
                "bookId": "confidence-30-en",
                "day": 26,
                "title": "The Role Model Exercise",
                "phase": "Week 4: Lasting Confidence",
                "description": "Choose someone you admire for their social ease and confidence. Write about what specifically you admire \u2014 how they handle criticism, silence, disagreement, being the center of attention. Then ask: which of those qualities do you actually already have, even a little? WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Role Model Exercise",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Observational learning and social modeling are foundational to CBT and Bandura's self-efficacy theory. When we dissect admired behavior into its component parts, we often discover these qualities aren't foreign to us \u2014 we simply haven't deliberately cultivated them yet. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Choose someone you admire for their social ease and confidence. Write about what specifically you admire \u2014 how they handle criticism, silence, disagreement, being the center of attention. Then ask: which of those qualities do you actually already have, even a little? WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-27",
                "bookId": "confidence-30-en",
                "day": 27,
                "title": "Handle the Discomfort",
                "phase": "Week 4: Lasting Confidence",
                "description": "Do something socially uncomfortable on purpose today \u2014 speak up in a group, disagree with someone respectfully, admit a mistake out loud, share an opinion you'd normally keep to yourself. Feel the discomfort and do it anyway. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Handle the Discomfort",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Willingness to tolerate distress is a skill, not a trait. Distress tolerance practice \u2014 deliberately entering discomfort and staying with it \u2014 builds what psychologists call 'anxiety tolerance,' which means the anxiety is less likely to control behavior over time. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Do something socially uncomfortable on purpose today \u2014 speak up in a group, disagree with someone respectfully, admit a mistake out loud, share an opinion you'd normally keep to yourself. Feel the discomfort and do it anyway. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-28",
                "bookId": "confidence-30-en",
                "day": 28,
                "title": "Own Your Story",
                "phase": "Week 4: Lasting Confidence",
                "description": "Write your social anxiety origin story \u2014 when you first remember feeling this way, what happened, how you made sense of it as a child or teenager. Then rewrite the ending: who are you becoming now, and what does that mean for your old story? WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Own Your Story",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Narrative exposure and reprocessing allows us to see early experiences as understandable responses to real circumstances, not evidence of permanent defects. When we reauthor our story \u2014 adding the chapter of growth and change \u2014 we shift our identity from 'anxious person' to 'person overcoming anxiety.' Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Write your social anxiety origin story \u2014 when you first remember feeling this way, what happened, how you made sense of it as a child or teenager. Then rewrite the ending: who are you becoming now, and what does that mean for your old story? WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-29",
                "bookId": "confidence-30-en",
                "day": 29,
                "title": "Write Your Manifesto",
                "phase": "Week 4: Lasting Confidence",
                "description": "Write a personal confidence manifesto \u2014 a declaration of who you are and who you're becoming. It should include your values, your commitments, and your new beliefs about yourself and social situations. Write it in the first person, present tense, as if it's already true. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "Write Your Manifesto",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Affirmation and identity-level commitment have been shown to boost confidence and reduce threat response when paired with action (the action is what makes them credible). A personal manifesto creates an identity anchor you can return to when old patterns resurface. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Write a personal confidence manifesto \u2014 a declaration of who you are and who you're becoming. It should include your values, your commitments, and your new beliefs about yourself and social situations. Write it in the first person, present tense, as if it's already true. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-en-30",
                "bookId": "confidence-30-en",
                "day": 30,
                "title": "The Final Challenge",
                "phase": "Week 4: Lasting Confidence",
                "description": "Today, do the thing on your fear ladder that you've been building toward \u2014 or the bravest social challenge you can manage today. Prepare, go in, feel the fear, and do it anyway. Whatever happens, write it all down. WHY IT WORKS",
                "content": [
                    {
                        "type": "intro",
                        "title": "The Final Challenge",
                        "quote": "\"Courage is acting in spite of fear.\"",
                        "author": "Joseph I.",
                        "text": [
                            "The final challenge is the capstone behavioral experiment: it integrates every cognitive and emotional skill you've developed over 30 days into a single real-world action. Whatever the outcome, the act of doing it is itself the victory. You are not the person who started this workbook. Confidence Rating BEFORE (circle your number):"
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-amber-100 dark:bg-amber-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Today's Challenge",
                        "text": [
                            "Today, do the thing on your fear ladder that you've been building toward \u2014 or the bravest social challenge you can manage today. Prepare, go in, feel the fear, and do it anyway. Whatever happens, write it all down. WHY IT WORKS"
                        ],
                        "questions": [
                            "What thoughts arose before starting the challenge?",
                            "How did your body feel during and after?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Anxiety & Confidence Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Rate your confidence level BEFORE and AFTER completing today's challenge."
                        ]
                    }
                ]
            }
        ]
    },
    {
        "id": "confidence-30-nl",
        "title": "Vertrouwen in 30 Dagen",
        "subtitle": "Sociale Angst Overwinnen & Blijvend Zelfvertrouwen Opbouwen",
        "author": "Joseph I.",
        "language": "NL",
        "coverColor": "bg-amber-600",
        "accentColor": "amber",
        "description": "Cognitieve gedragstherapie werkboek om de angstspiraal te doorbreken via stapsgewijze blootstelling.",
        "totalDays": 30,
        "lessons": [
            {
                "id": "confidence-30-nl-1",
                "bookId": "confidence-30-nl",
                "day": 1,
                "title": "Benoem Je Angst",
                "phase": "Week 1: Angst Confronteren",
                "description": "Benoem Je Angst",
                "content": [
                    {
                        "type": "intro",
                        "title": "Benoem Je Angst",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Benoem Je Angst"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-2",
                "bookId": "confidence-30-nl",
                "day": 2,
                "title": "De Angstvolle Bodyscan",
                "phase": "Week 1: Angst Confronteren",
                "description": "De Angstvolle Bodyscan",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Angstvolle Bodyscan",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "De Angstvolle Bodyscan"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-3",
                "bookId": "confidence-30-nl",
                "day": 3,
                "title": "Herschrijf Het Verhaal",
                "phase": "Week 1: Angst Confronteren",
                "description": "Herschrijf Het Verhaal",
                "content": [
                    {
                        "type": "intro",
                        "title": "Herschrijf Het Verhaal",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Herschrijf Het Verhaal"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-4",
                "bookId": "confidence-30-nl",
                "day": 4,
                "title": "E\u00e9n Kleine Begroeting",
                "phase": "Week 1: Angst Confronteren",
                "description": "E\u00e9n Kleine Begroeting",
                "content": [
                    {
                        "type": "intro",
                        "title": "E\u00e9n Kleine Begroeting",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "E\u00e9n Kleine Begroeting"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-5",
                "bookId": "confidence-30-nl",
                "day": 5,
                "title": "De 5-4-3-2-1 Reset",
                "phase": "Week 1: Angst Confronteren",
                "description": "De 5-4-3-2-1 Reset",
                "content": [
                    {
                        "type": "intro",
                        "title": "De 5-4-3-2-1 Reset",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "De 5-4-3-2-1 Reset"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-6",
                "bookId": "confidence-30-nl",
                "day": 6,
                "title": "De Innerlijke Criticus Audit",
                "phase": "Week 1: Angst Confronteren",
                "description": "De Innerlijke Criticus Audit",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Innerlijke Criticus Audit",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "De Innerlijke Criticus Audit"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-7",
                "bookId": "confidence-30-nl",
                "day": 7,
                "title": "Wat Angst Je Kost",
                "phase": "Week 1: Angst Confronteren",
                "description": "Wat Angst Je Kost",
                "content": [
                    {
                        "type": "intro",
                        "title": "Wat Angst Je Kost",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Wat Angst Je Kost"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-8",
                "bookId": "confidence-30-nl",
                "day": 8,
                "title": "De Schijnwerper Illusie",
                "phase": "Week 2: Sociale Blootstelling & Herkadering",
                "description": "De Schijnwerper Illusie",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Schijnwerper Illusie",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "De Schijnwerper Illusie"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-9",
                "bookId": "confidence-30-nl",
                "day": 9,
                "title": "Ontwerp Een Dappere Ladder",
                "phase": "Week 2: Sociale Blootstelling & Herkadering",
                "description": "Ontwerp Een Dappere Ladder",
                "content": [
                    {
                        "type": "intro",
                        "title": "Ontwerp Een Dappere Ladder",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Ontwerp Een Dappere Ladder"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-10",
                "bookId": "confidence-30-nl",
                "day": 10,
                "title": "Mededogen Voor Je Angstige Zelf",
                "phase": "Week 2: Sociale Blootstelling & Herkadering",
                "description": "Mededogen Voor Je Angstige Zelf",
                "content": [
                    {
                        "type": "intro",
                        "title": "Mededogen Voor Je Angstige Zelf",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Mededogen Voor Je Angstige Zelf"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-11",
                "bookId": "confidence-30-nl",
                "day": 11,
                "title": "De Veiligheidsgedrag Val",
                "phase": "Week 2: Sociale Blootstelling & Herkadering",
                "description": "De Veiligheidsgedrag Val",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Veiligheidsgedrag Val",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "De Veiligheidsgedrag Val"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-12",
                "bookId": "confidence-30-nl",
                "day": 12,
                "title": "Herformuleer Het Blozen",
                "phase": "Week 2: Sociale Blootstelling & Herkadering",
                "description": "Herformuleer Het Blozen",
                "content": [
                    {
                        "type": "intro",
                        "title": "Herformuleer Het Blozen",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Herformuleer Het Blozen"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-13",
                "bookId": "confidence-30-nl",
                "day": 13,
                "title": "Het Waardencompas",
                "phase": "Week 2: Sociale Blootstelling & Herkadering",
                "description": "Het Waardencompas",
                "content": [
                    {
                        "type": "intro",
                        "title": "Het Waardencompas",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Het Waardencompas"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-14",
                "bookId": "confidence-30-nl",
                "day": 14,
                "title": "Stel Een Echte Vraag",
                "phase": "Week 2: Sociale Blootstelling & Herkadering",
                "description": "Stel Een Echte Vraag",
                "content": [
                    {
                        "type": "intro",
                        "title": "Stel Een Echte Vraag",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Stel Een Echte Vraag"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-15",
                "bookId": "confidence-30-nl",
                "day": 15,
                "title": "Halverwege",
                "phase": "Week 3: Sociale Moed Opbouwen",
                "description": "Halverwege",
                "content": [
                    {
                        "type": "intro",
                        "title": "Halverwege",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Halverwege"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-16",
                "bookId": "confidence-30-nl",
                "day": 16,
                "title": "Decatastroferen",
                "phase": "Week 3: Sociale Moed Opbouwen",
                "description": "Decatastroferen",
                "content": [
                    {
                        "type": "intro",
                        "title": "Decatastroferen",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Decatastroferen"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-17",
                "bookId": "confidence-30-nl",
                "day": 17,
                "title": "Het Oogcontact Experiment",
                "phase": "Week 3: Sociale Moed Opbouwen",
                "description": "Het Oogcontact Experiment",
                "content": [
                    {
                        "type": "intro",
                        "title": "Het Oogcontact Experiment",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Het Oogcontact Experiment"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-18",
                "bookId": "confidence-30-nl",
                "day": 18,
                "title": "De Complimenten Uitdaging",
                "phase": "Week 3: Sociale Moed Opbouwen",
                "description": "De Complimenten Uitdaging",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Complimenten Uitdaging",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "De Complimenten Uitdaging"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-19",
                "bookId": "confidence-30-nl",
                "day": 19,
                "title": "Het Onvolmaakte Gesprek",
                "phase": "Week 3: Sociale Moed Opbouwen",
                "description": "Het Onvolmaakte Gesprek",
                "content": [
                    {
                        "type": "intro",
                        "title": "Het Onvolmaakte Gesprek",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Het Onvolmaakte Gesprek"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-20",
                "bookId": "confidence-30-nl",
                "day": 20,
                "title": "Schrijf Je Eigen Verhaal",
                "phase": "Week 3: Sociale Moed Opbouwen",
                "description": "Schrijf Je Eigen Verhaal",
                "content": [
                    {
                        "type": "intro",
                        "title": "Schrijf Je Eigen Verhaal",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Schrijf Je Eigen Verhaal"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-21",
                "bookId": "confidence-30-nl",
                "day": 21,
                "title": "Nee Zeggen Zonder Schuldgevoel",
                "phase": "Week 3: Sociale Moed Opbouwen",
                "description": "Nee Zeggen Zonder Schuldgevoel",
                "content": [
                    {
                        "type": "intro",
                        "title": "Nee Zeggen Zonder Schuldgevoel",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Nee Zeggen Zonder Schuldgevoel"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-22",
                "bookId": "confidence-30-nl",
                "day": 22,
                "title": "De Nieuwsgierige Wetenschapper",
                "phase": "Week 4: Blijvend Zelfvertrouwen",
                "description": "De Nieuwsgierige Wetenschapper",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Nieuwsgierige Wetenschapper",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "De Nieuwsgierige Wetenschapper"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-23",
                "bookId": "confidence-30-nl",
                "day": 23,
                "title": "Het Lange Spel",
                "phase": "Week 4: Blijvend Zelfvertrouwen",
                "description": "Het Lange Spel",
                "content": [
                    {
                        "type": "intro",
                        "title": "Het Lange Spel",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Het Lange Spel"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-24",
                "bookId": "confidence-30-nl",
                "day": 24,
                "title": "Herstel Een Relatie",
                "phase": "Week 4: Blijvend Zelfvertrouwen",
                "description": "Herstel Een Relatie",
                "content": [
                    {
                        "type": "intro",
                        "title": "Herstel Een Relatie",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Herstel Een Relatie"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-25",
                "bookId": "confidence-30-nl",
                "day": 25,
                "title": "Jouw Zelfvertrouwen Ankers",
                "phase": "Week 4: Blijvend Zelfvertrouwen",
                "description": "Jouw Zelfvertrouwen Ankers",
                "content": [
                    {
                        "type": "intro",
                        "title": "Jouw Zelfvertrouwen Ankers",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Jouw Zelfvertrouwen Ankers"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-26",
                "bookId": "confidence-30-nl",
                "day": 26,
                "title": "De Rolmodel Oefening",
                "phase": "Week 4: Blijvend Zelfvertrouwen",
                "description": "De Rolmodel Oefening",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Rolmodel Oefening",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "De Rolmodel Oefening"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-27",
                "bookId": "confidence-30-nl",
                "day": 27,
                "title": "Ga Het Ongemak Aan",
                "phase": "Week 4: Blijvend Zelfvertrouwen",
                "description": "Ga Het Ongemak Aan",
                "content": [
                    {
                        "type": "intro",
                        "title": "Ga Het Ongemak Aan",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Ga Het Ongemak Aan"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-28",
                "bookId": "confidence-30-nl",
                "day": 28,
                "title": "Eis Je Verhaal Op",
                "phase": "Week 4: Blijvend Zelfvertrouwen",
                "description": "Eis Je Verhaal Op",
                "content": [
                    {
                        "type": "intro",
                        "title": "Eis Je Verhaal Op",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Eis Je Verhaal Op"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-29",
                "bookId": "confidence-30-nl",
                "day": 29,
                "title": "Schrijf Je Manifest",
                "phase": "Week 4: Blijvend Zelfvertrouwen",
                "description": "Schrijf Je Manifest",
                "content": [
                    {
                        "type": "intro",
                        "title": "Schrijf Je Manifest",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "Schrijf Je Manifest"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            },
            {
                "id": "confidence-30-nl-30",
                "bookId": "confidence-30-nl",
                "day": 30,
                "title": "De Laatste Uitdaging",
                "phase": "Week 4: Blijvend Zelfvertrouwen",
                "description": "De Laatste Uitdaging",
                "content": [
                    {
                        "type": "intro",
                        "title": "De Laatste Uitdaging",
                        "quote": "\"Moed is handelen ondanks angst.\"",
                        "author": "Joseph I.",
                        "text": [
                            "Gedragsactivatie bouwt neuroplastische veerkracht op."
                        ],
                        "image": "\ud83e\udd81",
                        "imageColor": "bg-orange-100 dark:bg-orange-900/40"
                    },
                    {
                        "type": "practice",
                        "title": "Uitdaging van Vandaag",
                        "text": [
                            "De Laatste Uitdaging"
                        ],
                        "questions": [
                            "Welke gedachten kwamen op voor de uitdaging?",
                            "Hoe voelde je lichaam tijdens en daarna?"
                        ]
                    },
                    {
                        "type": "rating",
                        "title": "Angst & Zelfvertrouwen Score (1-10)",
                        "ratingType": "confidence",
                        "text": [
                            "Beoordeel je zelfvertrouwen VOOR en NA de uitdaging van vandaag."
                        ]
                    }
                ]
            }
        ]
    }
];
