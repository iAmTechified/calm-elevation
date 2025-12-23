
import { GoogleGenerativeAI } from '@google/generative-ai';

// Initialize the Gemini API client if the key is available
const API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;
let genAI: GoogleGenerativeAI | null = null;
let model: any = null;

if (API_KEY) {
    genAI = new GoogleGenerativeAI(API_KEY);
    model = genAI.getGenerativeModel({ model: "gemini-pro" });
}

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

// Fallback logic for when no API key is present or for offline use
const FALLBACK_RESPONSES = [
    {
        keywords: ['sleep', 'insomnia', 'awake', 'tired'],
        response: "I hear you. Creating a restful environment is key. Our Sleep section has sounds and stories to help you drift off. shall we go there?",
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
    // If we have the API key, try to use Gemini
    if (model) {
        try {
            const chat = model.startChat({
                history: history.filter(m => m.role !== 'system').map(m => ({
                    role: m.role === 'assistant' ? 'model' : 'user',
                    parts: [{ text: m.content }],
                })),
                generationConfig: {
                    maxOutputTokens: 150,
                },
            });

            // Prepend system prompt context if it's the start (Gemini doesn't have system role in the same way as OpenAI, usually sent as first message or context)
            // For simplicity in this "guide", we'll just send the user message. 
            // A better way with Gemini is to include the system prompt in the first message or history, 
            // but 'startChat' history is the robust way.
            // We will inject the system context if the history is empty.

            let msgToSend = message;
            if (history.length === 0) {
                msgToSend = `${SYSTEM_PROMPT}\n\nUser: ${message}`;
            }

            const result = await chat.sendMessage(msgToSend);
            const response = result.response;
            const text = response.text();

            // Simple heuristic to detect navigation intent from AI response if it suggests a section.
            // In a real agent, we'd use function calling.
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
        } catch (error) {
            console.error("Gemini API Error:", error);
            // Fallthrough to fallback
        }
    }

    // Fallback Logic (Mock AI)
    const lowerMsg = message.toLowerCase();

    // Check for specialized keywords
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

    // Generic fallback if no keywords match
    return {
        id: Date.now().toString(),
        role: 'assistant',
        content: "I'm here to support your journey with Calm Elevation. You can tell me how you're feeling, or I can guide you to our Sleep, Breathe, Play, or Learn sections.",
    };
}
