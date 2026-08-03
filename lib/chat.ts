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
The app has these main sections:
- Learn: Educational content about mental health.
- Breathe: Breathing exercises.
- Play: Relaxing games like 'Inner Balance' and 'Bubble Pop'.
- Journal: For writing down thoughts and gratitude.
- Sleep: Sleep sounds and stories.
- Self-Healing: A 60-day healing program.
- Visualize: Guided visualizations.

If a user asks for help with something specific (e.g., "I can't sleep"), recommend the relevant section (e.g., Sleep) and offer to take them there.
If a user talks about something completely unrelated to mental health or the app (e.g., "Write code for me" or "What is the capital of France"), politely explain that you are specialized in mental wellness and guiding them through the Calm Elevation app.
Always be empathetic, calm, and supportive.
`;

const GROQ_API_KEY = process.env.EXPO_PUBLIC_GROQ_API_KEY;

// Fallback logic for when no API key is present, offline use, or API failure
const FALLBACK_RESPONSES = [
    {
        keywords: ['sleep', 'insomnia', 'awake', 'tired'],
        response: "I hear you. Creating a restful environment is key. Our Sleep section has sounds and stories to help you drift off. Shall we go there?",
        action: { type: 'navigate', target: '/sleep' }
    },
    {
        keywords: ['anxiety', 'panic', 'stress', 'worried', 'nervous'],
        response: "I understand. It sounds like you could use a moment of calm. The Breathe section or our 'Inner Balance' game in Play might help.",
        action: { type: 'navigate', target: '/breathe' }
    },
    {
        keywords: ['sad', 'depressed', 'down', 'unhappy'],
        response: "I'm sorry you're feeling this way. Sometimes writing it down helps. Would you like to open your Journal?",
        action: { type: 'navigate', target: '/journal' }
    },
    {
        keywords: ['learn', 'understand', 'psychology', 'education'],
        response: "Knowledge is power. The Learn section has great courses on understanding your mind.",
        action: { type: 'navigate', target: '/learn' }
    },
    {
        keywords: ['game', 'play', 'bored', 'fun'],
        response: "Relaxing games can be a great distraction. Check out the Play section.",
        action: { type: 'navigate', target: '/play' }
    },
    {
        keywords: ['heal', 'program', 'course', '60 days'],
        response: "Our Self-Healing program is designed to support you over 60 days. Would you like to check today's session?",
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

    // Fallback Logic (Mock AI)
    const lowerMsg = message.toLowerCase();

    for (const item of FALLBACK_RESPONSES) {
        if (item.keywords.some(k => lowerMsg.includes(k))) {
            return {
                id: Date.now().toString(),
                role: 'assistant',
                content: item.response,
                action: item.action as any
            };
        }
    }

    return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm here to support your journey with Calm Elevation. You can tell me how you're feeling, or I can guide you to our Sleep, Breathe, Play, or Learn sections.",
    };
}
