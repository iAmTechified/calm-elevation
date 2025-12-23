
import { ImageSourcePropType } from 'react-native';

export interface LessonContentPage {
    type: 'intro' | 'continuation' | 'conclusion' | 'exercise';
    title?: string;
    text: string[];
    image?: string;
    imageColor?: string;
}

export interface Lesson {
    id: string;
    courseId: string;
    title: string;
    icon: string | null;
    iconSource: ImageSourcePropType | null;
    color: string;
    duration: string;
    content: LessonContentPage[];
}

export interface Course {
    id: string;
    title: string;
    description: string;
    image: ImageSourcePropType;
    color: string;
    lessonIds: string[];
}

export const COURSES: Record<string, Course> = {
    'understanding-anxiety': {
        id: 'understanding-anxiety',
        title: 'Understanding Anxiety',
        description: 'Find peace of mind by learning what anxiety actually is, how your body experiences a panic attack, and why it happens. Knowledge is power.',
        image: require('../../assets/images/learn/banner_understanding.png'),
        color: 'bg-violet-100',
        lessonIds: ['1', '2', '3', '4', '5', '6']
    },
    'short-term-relief': {
        id: 'short-term-relief',
        title: 'Short Term Relief',
        description: 'Learn quick, effective techniques to manage anxiety in the moment when you feel overwhelmed. Tools for your emergency kit.',
        image: require('../../assets/images/learn/banner_short_term.png'),
        color: 'bg-sky-100',
        lessonIds: ['7', '8', '9', '10', '11', '12', '13']
    },
    'long-term-resilience': {
        id: 'long-term-resilience',
        title: 'Long Term Resilience',
        description: 'Build long-term habits and understanding to transform your mental health journey. Move from surviving to thriving.',
        image: require('../../assets/images/learn/banner_long_term.png'),
        color: 'bg-orange-100',
        lessonIds: ['14', '15', '16', '17', '18', '19', '20', '21']
    }
};

export const LESSONS: Lesson[] = [
    // --- Course 1: Understanding Anxiety ---
    {
        id: '1',
        courseId: 'understanding-anxiety',
        title: 'What is Anxiety?',
        icon: null,
        iconSource: require('../../assets/images/learn/icon_anxiety.png'),
        color: 'bg-teal-100',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'What is Anxiety?',
                text: [
                    'Anxiety is a multifaceted and profound emotional state that goes far beyond simple stress or fleeting worry. It is a fundamental, biological response experienced when an individual anticipates a future threat, whether that threat is real, imminent, and physical, or entirely imagined and abstract.',
                    'At its core, anxiety is a mechanism of apprehension, a state where the mind projects itself into a potential future scenario fraught with danger or failure. It is a sophisticated protection system, not a sign that you are broken.',
                    'To truly comprehend why anxiety feels the way it does, we must journey back in time to the stark, unforgiving environments of our prehistoric ancestors.'
                ],
                image: '🏃',
                imageColor: 'bg-orange-100'
            },
            {
                type: 'continuation',
                text: [
                    'For our ancestors, "stress" wasn\'t about hitting a deadline; it was a matter of life and death. A rustle in the grass could mean a predator. The individuals who survived were the ones who could instantly switch from a relaxed state to one of supreme physical readiness.',
                    'This necessity for speed drove the evolution of the "fight or flight" response. When a threat is perceived, the amygdala sounds the alarm, triggering the release of adrenaline and cortisol.',
                    'However, we now live in a space-age world with stone-age brains. The "tigers" of today are emails and subways. Our alarm system cannot distinguish between a predator and a public speaking engagement.'
                ],
            },
            {
                type: 'conclusion',
                text: [
                    'The first step to healing is to cultivate a compassionate understanding of this mechanism. You are not "a nervous person"; you are a person experiencing a temporary, intense physiological reaction.',
                    'Just as you learned to fear certain triggers, you can unlearn them. Through practice, you can "turn down the volume" on your amygdala.',
                    'Proceed to the next lesson to explore the Physical & Mental Effects, where we will deconstruct the terrifying symptoms of anxiety to reveal them as harmless biological processes.'
                ],
            }
        ]
    },
    {
        id: '2',
        courseId: 'understanding-anxiety',
        title: 'Physical & Mental Effects',
        icon: '🧠',
        iconSource: null,
        color: 'bg-orange-100',
        duration: '6 min',
        content: [
            {
                type: 'intro',
                title: 'Physical & Mental Effects',
                text: [
                    'Panic attacks are notorious for their intense physicality. It is extremely common for individuals to rush to the ER, convinced they are dying. This is not "all in your head"; it is a massive biological event.',
                    'Heart palpitations are just your heart pumping blood to muscles to prepare for running. Respiratory symptoms like air hunger are result of hyperventilation shifting your blood pH.',
                    'Cold hands? That\'s blood guarding your vital organs. Nausea? That\'s your digestion pausing to save energy.'
                ],
                image: '🧠',
                imageColor: 'bg-orange-100'
            },
            {
                type: 'continuation',
                text: [
                    'Mentally, the prefrontal cortex (logic) is dampened, and the amygdala (emotion) takes over. This causes "racing thoughts" and impulsive decision making.',
                    'Sensations like Derealization (world feels fake) and Depersonalization (detached from body) are primeval defense mechanisms to distance you from trauma.',
                    'These effects create a feedback loop: a physical symptom scares you, releasing more adrenaline, worsening the symptom. Breaking this requires recognizing the symptom as a harmless safety system misfiring.'
                ]
            }
        ]
    },
    {
        id: '3',
        courseId: 'understanding-anxiety',
        title: 'Causes & Theories',
        icon: null,
        iconSource: require('../../assets/images/learn/icon_causes.png'),
        color: 'bg-blue-100',
        duration: '7 min',
        content: [
            {
                type: 'intro',
                title: 'Causes & Theories',
                text: [
                    'The question "Why me?" is central to anxiety. It is rarely one thing, but a "biopsychosocial" web of factors. Genetics can load the gun, but environment pulls the trigger.',
                    'Brain chemistry plays a role: imbalances in serotonin, norepinephrine, and GABA can make it harder for the brain to "put the brakes" on arousal.',
                    'Environmental factors like childhood instability or chronic modern stress can calibrate the brain to be hyper-vigilant.'
                ],
                image: 'nerd',
                imageColor: 'bg-blue-100'
            },
            {
                type: 'continuation',
                text: [
                    'Psychological "cognitive distortions" fuel the fire. Catastrophizing, All-or-Nothing thinking, and Emotional Reasoning generate anxiety from within.',
                    'Evolutionary Theory suggests anxiety is a "mismatch disease"—old hardware in a new world.',
                    'Integrating this knowledge allows holistic healing: calming biology, reframing psychology, and changing environment.'
                ]
            }
        ]
    },
    {
        id: '4',
        courseId: 'understanding-anxiety',
        title: 'The Cycle of Anxiety',
        icon: '🔄',
        iconSource: null,
        color: 'bg-pink-100',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'The Cycle of Anxiety',
                text: [
                    'Anxiety often operates in a self-perpetuating cycle. It typically starts with a Trigger—internal (a thought, a sensation) or external (a place, a situation).',
                    'This trigger leads to a Perception of Danger. Your brain tags the situation as unsafe. This instantly activates the Anxiety Response (physical symptoms, fear).',
                    'Crucially, the next step is often Avoidance or Safety Behaviors. You might leave the party, take a pill, or distract yourself. While this brings short-term relief, it confirms to your brain that the situation WAS dangerous.'
                ],
                image: '🔄',
                imageColor: 'bg-pink-100'
            },
            {
                type: 'conclusion',
                text: [
                    'This cycle strengthens the anxiety over time. The only way to break it is to change your response. Instead of avoiding, you must learn to "stay with" the feeling.',
                    'By facing the trigger and surviving without a safety behavior, you reteach your amygdala: "This is uncomfortable, but I am safe."'
                ]
            }
        ]
    },
    {
        id: '5',
        courseId: 'understanding-anxiety',
        title: 'Debunking Myths',
        icon: '🚫',
        iconSource: null,
        color: 'bg-red-100',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: 'Debunking Myths',
                text: [
                    'Myth 1: "Anxiety is a weakness." False. It requires immense energy and strength to function while carrying the weight of anxiety. It is biological, not a character flaw.',
                    'Myth 2: "You can just snap out of it." False. You cannot willpower your way out of a chemical surge any more than you can willpower away diabetes.',
                    'Myth 3: "Anxiety means you\'re going crazy." False. Anxiety is actually a state of hyper-sanity—you are overly aware of reality, not losing touch with it.'
                ],
                image: '🚫',
                imageColor: 'bg-red-100'
            }
        ]
    },
    {
        id: '6',
        courseId: 'understanding-anxiety',
        title: 'Your Personal Pattern',
        icon: '🧩',
        iconSource: null,
        color: 'bg-indigo-100',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Your Personal Pattern',
                text: [
                    'Anxiety manifests differently for everyone. Some feel it in their stomach, others in their chest. Some worry about health, others about social standing.',
                    'Identifying your unique "signature" is crucial. What are your early warning signs? Irritability? Jaw clenching? Trouble sleeping?',
                    'By mapping your pattern, you can intervene early, before the wave of anxiety becomes a tsunami.'
                ],
                image: '🧩',
                imageColor: 'bg-indigo-100'
            }
        ]
    },

    // --- Course 2: Short Term Relief ---
    {
        id: '7',
        courseId: 'short-term-relief',
        title: 'Box Breathing',
        icon: '📦',
        iconSource: null,
        color: 'bg-cyan-100',
        duration: '3 min',
        content: [
            {
                type: 'intro',
                title: 'Box Breathing',
                text: [
                    'Box breathing is a powerful technique used by Navy SEALs to stay calm under extreme pressure. It regulates the autonomic nervous system.',
                    'The method is simple: Inhale for 4 seconds, Hold for 4 seconds, Exhale for 4 seconds, Hold for 4 seconds. Visualizing a box can help.'
                ],
                image: '📦',
                imageColor: 'bg-cyan-100'
            },
            {
                type: 'exercise',
                title: 'Try It Now',
                text: [
                    'Let\'s practice. Close your eyes if safe to do so.',
                    'Inhale... 2... 3... 4.',
                    'Hold... 2... 3... 4.',
                    'Exhale... 2... 3... 4.',
                    'Hold... 2... 3... 4.',
                    'Repeat this cycle for a few minutes to lower your heart rate and clear your mind.'
                ]
            }
        ]
    },
    {
        id: '8',
        courseId: 'short-term-relief',
        title: 'Grounding 5-4-3-2-1',
        icon: '🌳',
        iconSource: null,
        color: 'bg-green-100',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: '5-4-3-2-1 Grounding',
                text: [
                    'When your mind is racing to the future, you need to anchor it in the present. This technique uses your five senses to pull you back to reality.',
                    'Acknowledge 5 things you see. Look for small details—a crack in the wall, the way light hits a surface.',
                    'Acknowledge 4 things you can touch. Feel the fabric of your clothes, the cool glass of water, the table surface.'
                ],
                image: '🌳',
                imageColor: 'bg-green-100'
            },
            {
                type: 'continuation',
                text: [
                    'Acknowledge 3 things you hear. Listen past the obvious noise—distant traffic, a bird, the hum of the fridge.',
                    'Acknowledge 2 things you can smell. Soap, coffee, rain?',
                    'Acknowledge 1 thing you can taste. The toothpaste from morning, a mint, or just a sip of water.',
                    'This exercise forces your brain to process sensory input, diverting resources away from the loop of anxious thoughts.'
                ]
            }
        ]
    },
    {
        id: '9',
        courseId: 'short-term-relief',
        title: 'Progressive Muscle Relaxation',
        icon: '💪',
        iconSource: null,
        color: 'bg-yellow-100',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Muscle Relaxation',
                text: [
                    'Anxiety stores tension in the body, often without us realizing. PMR involves tensing and then deeply relaxing specific muscle groups.',
                    'By deliberately creating tension, you learn to recognize what it feels like, and the release that follows triggers a relaxation response.',
                ],
                image: '💪',
                imageColor: 'bg-yellow-100'
            },
            {
                type: 'exercise',
                text: [
                    'Start with your toes. Curl them tight for 5 seconds... and release. Feel the tension drain away.',
                    'Move to your calves. Tense... and release.',
                    'Thighs. Tense... release.',
                    'Hands and arms. Clench fists... release.',
                    'Shoulders. Shrug them up to your ears... drop them.',
                    'Face. Scrunch your eyes and mouth... smooth it out.',
                    'Scan your body for any remaining tension and let it go.'
                ]
            }
        ]
    },
    {
        id: '10',
        courseId: 'short-term-relief',
        title: 'Riding the Wave',
        icon: '🌊',
        iconSource: null,
        color: 'bg-blue-200',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: 'Riding the Wave',
                text: [
                    'Fighting a panic attack is like fighting a riptide—you will only exhaust yourself. The safest way is to float with it.',
                    'Visualize your anxiety as a wave. It has a peak, but it must eventually crash and recede. No panic attack lasts forever.',
                    'Say to yourself: "I am willing to feel this uncomfortable feeling. It cannot hurt me. I will let it wash over me."'
                ],
                image: '🌊',
                imageColor: 'bg-blue-200'
            }
        ]
    },
    {
        id: '11',
        courseId: 'short-term-relief',
        title: 'The STOP Method',
        icon: '🛑',
        iconSource: null,
        color: 'bg-red-200',
        duration: '3 min',
        content: [
            {
                type: 'intro',
                title: 'The STOP Method',
                text: [
                    'S - Stop. Just pause whatever you are doing.',
                    'T - Take a breath. Reconnect with your breath. The anchor of the present.',
                    'O - Observe. What is happening inside you? What is happening outside? Just notice, don\'t judge.',
                    'P - Proceed. Continue what you were doing, but with this new awareness and intention.'
                ],
                image: '🛑',
                imageColor: 'bg-red-200'
            }
        ]
    },
    {
        id: '12',
        courseId: 'short-term-relief',
        title: 'Cold Water Shock',
        icon: '❄️',
        iconSource: null,
        color: 'bg-cyan-200',
        duration: '2 min',
        content: [
            {
                type: 'intro',
                title: 'Cold Water Shock',
                text: [
                    'Sometimes the brain is too loud for thinking tools. You need a physical reset. This relies on the "Mammalian Dive Reflex".',
                    'Ideally, splash ice-cold water on your face, especially around the eyes and nose. Or hold an ice pack there.',
                    'This sends a powerful signal to the vagus nerve to instantly slow the heart rate and conserve energy. It is a biological "hard reset" for panic.'
                ],
                image: '❄️',
                imageColor: 'bg-cyan-200'
            }
        ]
    },
    {
        id: '13',
        courseId: 'short-term-relief',
        title: 'Shake It Off',
        icon: '🐕',
        iconSource: null,
        color: 'bg-orange-200',
        duration: '2 min',
        content: [
            {
                type: 'intro',
                title: 'Shake It Off',
                text: [
                    'Animals in the wild literally "shake off" adrenaline after a chase. Humans often freeze and store it.',
                    'Stand up and vigorously shake your hands, your arms, your legs. Bounce on your heels. Do a little dance.',
                    'This helps metabolize the excess stress hormones pooling in your muscles and signals to your body that the "fight" is over.'
                ],
                image: '🐕',
                imageColor: 'bg-orange-200'
            }
        ]
    },

    // --- Course 3: Long Term Resilience ---
    {
        id: '14',
        courseId: 'long-term-resilience',
        title: 'Sleep Hygiene',
        icon: '😴',
        iconSource: null,
        color: 'bg-indigo-200',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Sleep Hygiene',
                text: [
                    'Sleep and anxiety have a bidirectional relationship. Anxiety ruins sleep; poor sleep worsens anxiety.',
                    'Prioritize a cooling down routine. No screens 1 hour before bed. Keep the room cool and dark.',
                    'If you can\'t sleep after 20 minutes, get up. Associating the bed with tossing and turning creates conditioned insomnia.'
                ],
                image: '😴',
                imageColor: 'bg-indigo-200'
            }
        ]
    },
    {
        id: '15',
        courseId: 'long-term-resilience',
        title: 'Diet & Gut Health',
        icon: '🥦',
        iconSource: null,
        color: 'bg-green-200',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Diet & Gut Health',
                text: [
                    'The gut is often called the "second brain". 95% of your serotonin is produced in your gut.',
                    'Reduce caffeine and alcohol—both are potent anxiogens (anxiety promoters).',
                    'Focus on whole foods, fiber, and fermented foods to support a healthy microbiome, which directly signals safety to the brain via the vagus nerve.'
                ],
                image: '🥦',
                imageColor: 'bg-green-200'
            }
        ]
    },
    {
        id: '16',
        courseId: 'long-term-resilience',
        title: 'Exercise as Medicine',
        icon: '🚴',
        iconSource: null,
        color: 'bg-red-100',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: 'Exercise as Medicine',
                text: [
                    'Exercise is not just about fitness; it is one of the most effective anti-anxiety strategies available.',
                    'It burns off stress hormones (cortisol/adrenaline). It releases endorphins. And importantly, it gets you comfortable with physical arousal.',
                    'When you run, your heart beats fast—but not because of fear. This helps desensitize you to the sensation of a racing heart.'
                ],
                image: '🚴',
                imageColor: 'bg-red-100'
            }
        ]
    },
    {
        id: '17',
        courseId: 'long-term-resilience',
        title: 'Mindfulness Basics',
        icon: '🧘',
        iconSource: null,
        color: 'bg-purple-100',
        duration: '6 min',
        content: [
            {
                type: 'intro',
                title: 'Mindfulness Basics',
                text: [
                    'Mindfulness is simply the ability to know what is happening in your head at any given moment without getting carried away by it.',
                    'It teaches you to step back and observe thoughts as "mental events" rather than facts.',
                    'Start small. Wash the dishes and just wash the dishes. Feel the warmth, the soap, the weight. That is mindfulness.'
                ],
                image: '🧘',
                imageColor: 'bg-purple-100'
            }
        ]
    },
    {
        id: '18',
        courseId: 'long-term-resilience',
        title: 'Cognitive Restructuring',
        icon: '🛠️',
        iconSource: null,
        color: 'bg-gray-200',
        duration: '7 min',
        content: [
            {
                type: 'intro',
                title: 'Cognitive Restructuring',
                text: [
                    'This is the core of CBT (Cognitive Behavioral Therapy). It involves identifying negative thought patterns and challenging them.',
                    'Catch it: "I\'m going to fail." check it: " What is the evidence for this? What is the evidence against it?" Change it: "I might struggle, but I have prepared and can handle it."',
                    'It is not unwanted positive thinking; it is realistic thinking.'
                ],
                image: '🛠️',
                imageColor: 'bg-gray-200'
            }
        ]
    },
    {
        id: '19',
        courseId: 'long-term-resilience',
        title: 'Exposure Therapy Basics',
        icon: '🪜',
        iconSource: null,
        color: 'bg-yellow-200',
        duration: '6 min',
        content: [
            {
                type: 'intro',
                title: 'Exposure Therapy Basics',
                text: [
                    'We avoided what we fear, but avoidance feeds anxiety. Exposure means gradually, safely facing the fear.',
                    'Build a "fear ladder". If you fear elevators, step 1 might be looking at a photo of one. Step 2, standing near one. Step 3, stepping in and out.',
                    'The goal is Habituation: staying in the situation until the anxiety naturally drops, proving to your brain that you are safe.'
                ],
                image: '🪜',
                imageColor: 'bg-yellow-200'
            }
        ]
    },
    {
        id: '20',
        courseId: 'long-term-resilience',
        title: 'Building a Support System',
        icon: '🤝',
        iconSource: null,
        color: 'bg-teal-200',
        duration: '4 min',
        content: [
            {
                type: 'intro',
                title: 'Building a Support System',
                text: [
                    'Humans are social creatures. Isolation breeds anxiety.',
                    'You don\'t need a huge crowd. Just one or two trusted people who you can be honest with makes a difference.',
                    'Vulnerability is strength. Saying "I\'m feeling anxious right now" can instantly lower the pressure to perform or hide it.'
                ],
                image: '🤝',
                imageColor: 'bg-teal-200'
            }
        ]
    },
    {
        id: '21',
        courseId: 'long-term-resilience',
        title: 'Self-Compassion',
        icon: '❤️',
        iconSource: null,
        color: 'bg-rose-200',
        duration: '5 min',
        content: [
            {
                type: 'intro',
                title: 'Self-Compassion',
                text: [
                    'We are often our own worst critics. We beat ourselves up for having anxiety, which only adds shame to the fear.',
                    'Treat yourself as you would a small child or a dear friend who is scared. You wouldn\'t yell at them.',
                    'You would say: "It\'s okay. I\'m here with you. This is hard, but you are not alone." Offer that same kindness to yourself.'
                ],
                image: '❤️',
                imageColor: 'bg-rose-200'
            }
        ]
    }
];
