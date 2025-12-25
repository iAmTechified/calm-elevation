export interface LessonContent {
    type: 'intro' | 'continuation' | 'conclusion' | 'practice';
    title?: string;
    text: string[];
    image?: string;
    imageColor?: string; // Tailwind class
    questions?: string[];
}

export interface Lesson {
    id: string;
    day: number;
    title: string;
    phase: string;
    description: string;
    content: LessonContent[];
}

const PHASES = [
    { title: "Gentle Awareness", range: [1, 15], description: "Building safety and understanding" },
    { title: "Strengthening Foundations", range: [16, 30], description: "Developing tools and boundaries" },
    { title: "Transforming Patterns", range: [31, 45], description: "Rewriting the narrative" },
    { title: "Thriving & Freedom", range: [46, 60], description: "Living beyond survival" },
];

const PHASE_CONTENT = {
    1: {
        quote: "Every small beginning creates a path forward.",
        practice: "Take a slow breath, notice your body, and write one kind word to yourself.",
        reflections: [
            "What feels safe to me today?",
            "What one small thing can I give myself right now?"
        ],
        emoji: "🌱",
        color: "bg-green-100"
    },
    2: {
        quote: "Strength grows when you honor your own limits and worth.",
        practice: "Set one boundary today, even if it's small. Notice how it feels.",
        reflections: [
            "Where do I need to protect my energy?",
            "How do I show myself respect?"
        ],
        emoji: "🪨",
        color: "bg-stone-100"
    },
    3: {
        quote: "Transformation begins when you face what once felt unbearable.",
        practice: "Write down one story you carry that no longer serves you. Imagine rewriting it with hope.",
        reflections: [
            "What part of my story is ready to change?",
            "Who do I become when I release it?"
        ],
        emoji: "🦋",
        color: "bg-blue-100"
    },
    4: {
        quote: "Freedom is living beyond survival into joy.",
        practice: "Do one thing today that feels joyful and aligned with your future self.",
        reflections: [
            "What does thriving mean to me?",
            "What vision of the future excites me most?"
        ],
        emoji: "☀️",
        color: "bg-orange-100"
    }
};

const generateLessons = (): Lesson[] => {
    const lessons: Lesson[] = [];

    for (let i = 1; i <= 60; i++) {
        let phaseIndex = 0;
        let phase = PHASES[0];

        if (i <= 15) { phaseIndex = 1; phase = PHASES[0]; }
        else if (i <= 30) { phaseIndex = 2; phase = PHASES[1]; }
        else if (i <= 45) { phaseIndex = 3; phase = PHASES[2]; }
        else { phaseIndex = 4; phase = PHASES[3]; }

        const contentData = PHASE_CONTENT[phaseIndex as keyof typeof PHASE_CONTENT];

        // Dynamic title based on phase
        const title = `${phase.title.split(' ')[0]} Step ${i}`;

        lessons.push({
            id: i.toString(),
            day: i,
            title: title,
            phase: phase.title,
            description: phase.description,
            content: [
                {
                    type: 'intro',
                    title: title,
                    text: [
                        contentData.quote
                    ],
                    image: contentData.emoji,
                    imageColor: contentData.color
                },
                {
                    type: 'practice',
                    text: [
                        contentData.practice
                    ],
                    questions: contentData.reflections
                }
            ]
        });
    }

    return lessons;
};

export const healingLessons = generateLessons();
