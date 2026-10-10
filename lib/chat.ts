import { getCurrentLanguage } from '../i18n';

export type ChatMessage = {
    id: string;
    role: 'user' | 'assistant' | 'system';
    content: string;
    action?: {
        type: 'navigate';
        target: string;
    };
};

const SYSTEM_PROMPT = `You are Cal, the friendly AI guide for the Calm Elevation app. 
Your goal is to help users navigate the app and find the right tools for their mental well-being.
Always reply in the user's language (primarily Dutch if the user writes in Dutch or their app is in Dutch, or English if in English).
The app has these main sections:
- Learn: Educational content about mental health.
- Breathe: Breathing exercises.
- Play: Relaxing games like 'Inner Balance' and 'Bubble Pop'.
- Journal: For writing down thoughts and gratitude.
- Sleep: Sleep sounds and stories.
- Self-Healing: A healing workbook program.
- Visualize: Guided visualizations.

If a user asks for help with something specific (e.g., "I can't sleep" or "Ik kan niet slapen"), recommend the relevant section and offer to take them there.
Always be empathetic, calm, and supportive.
`;

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

// Bilingual Fallback logic for completely offline use
const FALLBACK_RESPONSES = [
    {
        keywords: ['sleep', 'insomnia', 'awake', 'tired', 'slaap', 'slapen', 'moe', 'wakker'],
        responseEn: "I hear you. Creating a restful environment is key. Our Sleep section has sounds and stories to help you drift off. Shall we go there?",
        responseNl: "Ik begrijp het. Een rustgevende omgeving is essentieel. Onze Slaap-sectie bevat geluiden om je te helpen ontspannen. Zullen we daarheen gaan?",
        action: { type: 'navigate', target: '/sleep' }
    },
    {
        keywords: ['anxiety', 'panic', 'stress', 'worried', 'nervous', 'angst', 'paniek', 'spanning', 'bezorgd', 'onrustig'],
        responseEn: "I understand. It sounds like you could use a moment of calm. The Breathe section or our 'Inner Balance' game in Play might help.",
        responseNl: "Ik begrijp het. Het klinkt alsof je een moment van rust kunt gebruiken. De Adem-sectie of ons spel 'Innerlijke Balans' in Spelen kan helpen.",
        action: { type: 'navigate', target: '/breathe' }
    },
    {
        keywords: ['sad', 'depressed', 'down', 'unhappy', 'verdrietig', 'somber', 'neerslachtig', 'ongelukkig'],
        responseEn: "I'm sorry you're feeling this way. Sometimes writing it down helps. Would you like to open your Journal?",
        responseNl: "Wat vervelend dat je je zo voelt. Soms helpt het om het van je af te schrijven. Wil je je Dagboek openen?",
        action: { type: 'navigate', target: '/journal' }
    },
    {
        keywords: ['learn', 'understand', 'psychology', 'education', 'leren', 'begrijpen', 'psychologie', 'kennis'],
        responseEn: "Knowledge is power. The Learn section has great courses on understanding your mind.",
        responseNl: "Kennis is kracht. De Leren-sectie biedt waardevolle lessen om je geest beter te begrijpen.",
        action: { type: 'navigate', target: '/learn' }
    },
    {
        keywords: ['game', 'play', 'bored', 'fun', 'spel', 'spelen', 'verveeld', 'leuk'],
        responseEn: "Relaxing games can be a great distraction. Check out the Play section.",
        responseNl: "Ontspannende spellen kunnen een fijne afleiding zijn. Bekijk de Speel-sectie.",
        action: { type: 'navigate', target: '/play' }
    },
    {
        keywords: ['heal', 'program', 'course', '60 days', 'heling', 'programma', 'werkboek', 'cursus'],
        responseEn: "Our Self-Healing program is designed to support you. Would you like to check today's session?",
        responseNl: "Ons Zelfhelingsprogramma is ontworpen om je te ondersteunen. Wil je de sessie van vandaag bekijken?",
        action: { type: 'navigate', target: '/self-healing' }
    }
];

export async function sendMessageToAI(message: string, history: ChatMessage[] = []): Promise<ChatMessage> {
    if (GROQ_API_KEY) {
        try {
            const formattedMessages = [
                { role: 'system', content: SYSTEM_PROMPT },
                ...history
                    .filter(m => m.role === 'user' || m.role === 'assistant')
                    .map(m => ({
                        role: m.role,
                        content: m.content
                    })),
                { role: 'user', content: message }
            ];

            const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${GROQ_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    model: 'llama-3.3-70b-versatile',
                    messages: formattedMessages,
                    max_tokens: 250,
                    temperature: 0.7,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                const text = data.choices?.[0]?.message?.content || '';

                let action: any = undefined;
                const lowerText = text.toLowerCase();
                if (lowerText.includes("sleep section")) action = { type: 'navigate', target: '/sleep' };
                else if (lowerText.includes("breathe section")) action = { type: 'navigate', target: '/breathe' };
                else if (lowerText.includes("play section")) action = { type: 'navigate', target: '/play' };
                else if (lowerText.includes("journal")) action = { type: 'navigate', target: '/journal' };
                else if (lowerText.includes("learn section")) action = { type: 'navigate', target: '/learn' };
                else if (lowerText.includes("self-healing")) action = { type: 'navigate', target: '/self-healing' };

                return {
                    id: Date.now().toString(),
                    role: 'assistant',
                    content: text,
                    action
                };
            } else {
                const errText = await response.text();
                console.error("Groq API Http Error:", response.status, errText);
            }
        } catch (error) {
            console.error("Groq API Error:", error);
        }
    }

    // Fallback Logic (Mock AI - 100% Offline)
    const lowerMsg = message.toLowerCase();
    const currentLang = getCurrentLanguage();
    const isNl = currentLang === 'nl';

    for (const item of FALLBACK_RESPONSES) {
        if (item.keywords.some(k => lowerMsg.includes(k))) {
            return {
                id: Date.now().toString(),
                role: 'assistant',
                content: isNl ? item.responseNl : item.responseEn,
                action: item.action as any
            };
        }
    }

    return {
        id: Date.now().toString(),
        role: 'assistant',
        content: isNl
            ? "Ik ben hier om je reis met Calm Elevation te ondersteunen. Vertel me gerust hoe je je voelt, of ik kan je begeleiden naar de onderdelen Slaap, Adem, Spelen of Leren."
            : "I'm here to support your journey with Calm Elevation. You can tell me how you're feeling, or I can guide you to our Sleep, Breathe, Play, or Learn sections.",
    };
}
