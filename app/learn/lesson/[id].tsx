import { View, Text, TouchableOpacity, ScrollView, Dimensions, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { ChevronLeft, X, Star, Volume2 } from 'lucide-react-native';
import { useState } from 'react';
import ProgressHeader from '../../../components/ProgressHeader';
import LessonNavigationControls from '../../../components/LessonNavigationControls';

const { width } = Dimensions.get('window');

const LESSON_CONTENT = [
    {
        id: '1',
        title: 'What is anxiety?',
        content: [
            {
                type: 'intro',
                title: 'What is anxiety?',
                text: [
                    'Anxiety is a multifaceted and profound emotional state that goes far beyond simple stress or fleeting worry. It is a fundamental, biological response experienced when an individual anticipates a future threat, whether that threat is real, imminent, and physical, or entirely imagined and abstract. At its core, anxiety is a mechanism of apprehension, a state where the mind projects itself into a potential future scenario fraught with danger or failure. It is a complex physiological and psychological adaptation designed by millions of years of evolution to prepare the living organism to confront or escape from peril. While it is a universal human experience—felt by everyone before a significant examination, during a turbulent flight, or amidst a difficult personal conflict—it becomes a clinical concern when this anticipatory fear becomes chronic, disproportionate to the actual danger, and debilitating to one’s daily functionality.',
                    'Although it can feel like an enemy, especially when it manifests as a paralyzing panic attack or a pervasive sense of dread that ruins your day, anxiety is actually a sophisticated protection system. It is not a sign that you are "broken" or "weak," but rather evidence that your survival instincts are functioning with high efficacy. This system has been honed over eons to prioritize your safety above your comfort. To truly comprehend why anxiety feels the way it does, we must journey back in time to the stark, unforgiving environments of our prehistoric ancestors.',
                    'Imagine the world of early humans: a landscape teeming with immediate, lethal dangers. For our ancestors, "stress" wasn\'t about hitting a deadline or navigating social media; it was a visceral matter of life and death. A rustle in the tall grass could mean a stalking predator. A silhouette on the horizon could be a rival tribe. In these moments, survival didn\'t favor the contemplative philosopher; it favored the paranoid and the reactive. The individuals who survived to pass on their genes—your direct ancestors—were the ones who could instantly switch from a relaxed state to one of supreme physical readiness. They were the ones who treated every shadow as a threat until proven otherwise.'
                ],
                image: '🏃',
                imageColor: 'bg-orange-100'
            },
            {
                type: 'continuation',
                text: [
                    'This necessity for speed drove the evolution of the "fight or flight" response, a complex cascade of biological events orchestrated by the amygdala, the brain’s concern center. When a threat is perceived, the amygdala sounds the alarm, triggering the release of a potent cocktail of hormones, including adrenaline and cortisol. This chemical surge transforms the body in seconds: the heart hammers against the ribs to pump oxygen-rich blood to the major muscle groups; breathing becomes rapid and shallow to intake more oxygen; pupils dilate to sharpen vision; and non-essential systems like digestion and immunity are ruthlessly suppressed to conserve energy for the immediate physical struggle.',
                    'They needed something to get them moving quick - to fight or flight - and a rush of anxiety did just that. It was the biological turbo-boost that allowed a human to outrun a lion or fight off an attacker with superhuman strength. Once the threat was neutralized, the body would metabolize these stress hormones through physical exertion, eventually returning to a state of homeostasis. This loop of threat-activation-action-recovery was perfectly calibrated for a world of physical dangers.',
                    'However, we now live in a radically different environment. We have effectively transplanted our stone-age brains into a space-age world. The "tigers" of the modern era are abstract and psychological: a passive-aggressive email from a boss, a dwindling bank account balance, a crowded subway car, or the vague existential dread of the news cycle. The crucial problem is that our biological alarm system cannot distinguish between a predator and a public speaking engagement. It treats a difficult social situation with the same neurochemical severity as a physical attack. When you feel that rush of ice in your veins because of a rude driver, that is your ancient survival code executing a program designed for the savanna, not the highway.',
                    'This type of anxiety, while uncomfortable, can be functional in appropriate doses. It is the fire that motivates you to prepare thoroughly for a presentation, the vigilance that makes you check your blind spot, or the urgency that helps you meet a deadline. This is "adaptive" anxiety. The challenge arises when this response becomes "maladaptive"—when the alarm bell starts ringing constantly, at maximum volume, even when the environment is safe. When the body remains in a chronic state of fight-or-flight without the physical release of fighting or running, the stress hormones build up, leading to the exhaustion and toxicity that usually defines an anxiety disorder.'
                ],
                image: null
            },
            {
                type: 'conclusion',
                text: [
                    'The first and most critical step to healing is to cultivate a deep, compassionate understanding of this mechanism, exactly as you are doing right now. By intellectually reframing anxiety not as a character flaw but as a biological mismatch—a "false alarm" triggered by an overly sensitive security system—you can begin to detach from the fear. You stop being "a nervous person" and start being a person experiencing a temporary, albeit intense, physiological reaction.',
                    'Furthermore, the human brain possesses an incredible property known as neuroplasticity. This means that your neural pathways are not set in stone. Just as you learned to fear certain triggers, you can unlearn them. Through consistent practice, exposure, and cognitive reframing, you can effectively "turn down the volume" on your amygdala. You can teach your brain to differentiate between a true emergency and a mere inconvenience, gradually restoring a sense of calm and control to your life.',
                    'To clear the path forward, it is essential to examine the specific machinery of these sensations. Proceed to the next lesson to explore the Physical & Mental Effects of panic attacks, where we will deconstruct the terrifying symptoms of anxiety to reveal them as harmless biological processes.'
                ],
                image: null
            }
        ]
    },
    {
        id: '2',
        title: 'Physical & Mental Effects',
        content: [
            {
                type: 'intro',
                title: 'Physical & Mental Effects',
                text: [
                    'Panic attacks are notorious for their intense physicality. In fact, they are so viscerally overwhelming that it is extremely common for individuals experiencing their first panic attack to rush to the emergency room, convinced they are suffering from a heart attack, a stroke, or imminent death. This is not "all in your head"; it is a massive, system-wide biological event. The heart palpitations you feel are the result of a massive dump of adrenaline, signaling the heart to beat faster and harder to circulate blood to your thighs and biceps, preparing you to sprint for your life. While this pounding sensation is terrifying when you are sitting quietly at a desk, it is merely your heart doing its job a little too enthusiastically.',
                    'Respiratory symptoms are equally distressing and common. You might feel a sudden sensation of suffocation, air hunger, or a tightness in the chest. In a panic state, your breathing naturally shifts from slow, deep belly breaths to rapid, shallow chest breaths. This hyperventilation expels carbon dioxide too quickly, disrupting the delicate pH balance of your blood. Paradoxically, this drop in CO2 causes the blood vessels in your brain to constrict slightly, leading to dizziness, lightheadedness, and confusion, which only reinforces the terrifying thought that you are not getting enough air, causing you to breathe even faster.',
                    'The cascade of physical effects extends to the extremities and the gut. You might notice your hands and feet becoming cold, clammy, or tingling with "pins and needles." This occurs because your body is intelligently shunting blood away from the skin and non-essential periphery toward the vital organs and major muscles. Meanwhile, you may experience nausea, "butterflies," or sudden digestive distress. This is the result of the body suppressing digestion to conserve energy for the fight-or-flight response. While these sensations are profoundly uncomfortable, they are transient and, importantly, not physically dangerous.'
                ],
                image: '🧠',
                imageColor: 'bg-orange-100'
            },
            {
                type: 'continuation',
                text: [
                    'The mental landscape of anxiety can be just as harrowing as the physical one. During a high-anxiety state, the brain undergoes a temporary functional shift. The prefrontal cortex—the center of logic, reasoning, and long-term planning—is effectively dampened or bypassed. Control is usurped by the amygdala and the limbic system, the primitive, emotional cores of the brain. This results in "racing thoughts," where the mind desperately scans for danger, jumping from one worst-case scenario to another in milliseconds. Concentration becomes impossible, memory creates gaps, and decision-making is reduced to binary, impulsive choices.',
                    'Perhaps the most unsettling mental symptoms are derealization and depersonalization. Derealization is the sensation that the world around you has become unreal, dreamlike, foggy, or distorted visually. Depersonalization is the feeling of being detached from your own body, as if you are a robot or an observer watching yourself from the outside. These are primeval defense mechanisms: in a moment of extreme trauma (like being attacked by a predator), it is essentially adaptive for the brain to "disconnect" from reality to reduce the psychological impact of pain or death. When this happens in a grocery store, it is terrifying, but it is simply your brain trying to shield you from perceived overwhelming stress.',
                    'Crucially, the physical and mental effects do not exist in isolation; they feed each other in a vicious positive feedback loop. It often starts with a rogue physical sensation—a skipped heartbeat or a moment of dizziness. The anxious brain interprets this sensation as a catastrophe ("I\'m dying," "I\'m losing control"), which triggers a fresh wave of adrenaline. This new surge intensifies the heart rate and dizziness, which convinces the brain that the danger is indeed real, leading to more adrenaline, and so on. Breaking this cycle requires the cognitive intervention of recognizing the symptom for what it is: a harmless misfiring of a healthy safety system.'
                ],
                image: null
            }
        ]
    },
    {
        id: '3',
        title: 'Causes & Theories',
        content: [
            {
                type: 'intro',
                title: 'Causes & Theories',
                text: [
                    'The question "Why me?" is central to the experience of anxiety. The answer is rarely singular. Modern psychology and psychiatry view anxiety through a "biopsychosocial" lens, recognizing that it emerges from a complex, intertwined web of biological, psychological, and environmental factors. It is almost never just "one thing," but rather a "perfect storm" of vulnerabilities that align to lower your threshold for alarm. Understanding these diverse roots can be empowering, as it moves the blame away from personal weakness and toward tangible, manageable factors.',
                    'Genetics provide the blueprint groundwork. Studies of families and twins have consistently shown that anxiety disorders have a heritable component. If your parents, siblings, or close relatives struggled with "nerves" or anxiety, you may have inherited a genetic predisposition toward a more reactive nervous system. This doesn\'t mean you are destined to be anxious; genes are not destiny. They essentially "load the gun," making you more susceptible, but environment and experience usually "pull the trigger." You might have a biological sensitivity, but it takes life events to activate it.',
                    'At the microscopic level, brain chemistry plays a pivotal role. The brain relies on a delicate balance of neurotransmitters—chemical messengers that transmit signals between neurons. In anxiety disorders, we often see dysregulation in systems involving serotonin, which helps regulate mood and sleep; norepinephrine, which is associated with the stress response; and GABA (gamma-aminobutyric acid), the brain\'s primary inhibitory neurotransmitter that promotes calmness and relaxation. When GABA levels are low or receptors are insensitive, the brain struggles to "put the brakes" on running thoughts and physical arousal.'
                ],
                image: '🤓',
                imageColor: 'bg-blue-100'
            },
            {
                type: 'continuation',
                text: [
                    'Environmental factors and personal history are the crucibles in which anxiety is often forged. Early life experiences are particularly potent; childhoods marked by instability, unpredictability, trauma, or neglect can permanently calibrate the developing brain to be hyper-vigilant. However, it isn\'t only major trauma that matters. Chronic, low-level stress—such as prolonged financial difficulty, a toxic work environment, or caring for a sick relative—can keep the body in a constant state of arousal, slowly eroding resilience until the "panic button" gets stuck in the on position.',
                    'Psychological factors, specifically "cognitive distortions," serve as the fuel that keeps the fire of anxiety burning. These are habitual, ingrained patterns of inaccurate thinking. Examples include "Catastrophizing" (automatically assuming the worst possible outcome will happen), "All-or-Nothing Thinking" (viewing anything less than perfection as total failure), and "Emotional Reasoning" (believing that because you *feel* scared, you must *be* in danger). These thought patterns can generate anxiety even in the absence of any external threat, effectively turning the mind into its own stressor.',
                    'Ultimately, the Evolutionary Theory ties these strands together. It proposes that anxiety is essentially a "mismatch disease." We are operating with hardware designed for the Pleistocene era in a software environment of the 21st century. Our sophisticated brains, capable of imagining worst-case scenarios years in the future, are coupled with a primitive nervous system that treats those imaginations as immediate physical threats. Integrating this knowledge allows us to approach healing holistically: calming the biology, reframing the psychology, and changing the environment.'
                ],
                image: null
            }
        ]
    }
];

export default function LessonScreen() {
    const router = useRouter();
    const { id } = useLocalSearchParams();
    const [currentPage, setCurrentPage] = useState(0);
    const lesson = LESSON_CONTENT.find(l => l.id === id) || LESSON_CONTENT[0];

    const pages = lesson.content;
    const progress = ((currentPage + 1) / pages.length) * 100;

    const nextPage = () => {
        if (currentPage < pages.length - 1) {
            setCurrentPage(currentPage + 1);
        } else {
            router.back(); // Done
        }
    };

    const prevPage = () => {
        if (currentPage > 0) {
            setCurrentPage(currentPage - 1);
        }
    };

    return (
        <SafeAreaView className="flex-1 bg-slate-50" edges={['top', 'bottom']}>
            <StatusBar style="dark" />

            {/* Header */}
            <ProgressHeader
                progress={progress}
                containerStyle="flex-row items-center justify-between px-6 py-4"
                trackStyle="h-2 bg-slate-200 rounded-full mx-6"
                progressStyle="bg-emerald-400"
                leftElement={
                    <TouchableOpacity onPress={() => router.back()} className="p-2 -ml-2">
                        <ChevronLeft size={28} color="#1E293B" strokeWidth={2.5} />
                    </TouchableOpacity>
                }
                rightElement={
                    <TouchableOpacity className="p-2 -mr-2">
                        <Star size={24} color="#FBBF24" fill="#FBBF24" />
                    </TouchableOpacity>
                }
            />

            {/* Content Card */}
            <View className="flex-1 px-6 pb-4">
                <View className="flex-1 bg-white rounded-3xl p-6 shadow-sm border border-slate-100 justify-center">
                    <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ flexGrow: 1, justifyContent: 'center' }}>
                        {currentContent(pages[currentPage])}
                    </ScrollView>
                </View>
            </View>

            {/* Footer Controls */}
            <View className="px-6 py-4 flex-row items-center justify-between gap-4">
                <LessonNavigationControls
                    currentPage={currentPage}
                    totalPages={pages.length}
                    onPrev={prevPage}
                    onNext={nextPage}
                />
            </View>
        </SafeAreaView>
    );
}

function currentContent(page: any) {
    if (page.type === 'intro') {
        return (
            <>
                <Text className="text-3xl font-bold text-slate-800 text-center mb-6">
                    {page.title.replace('is', '')} <Text className="italic">is</Text> {page.title.split('is')[1]}
                </Text>

                {page.text.map((paragraph: string, index: number) => (
                    <Text key={index} className="text-md text-slate-600 leading-7 mb-6 text-justify">
                        {paragraph}
                    </Text>
                ))}

                {/* <View className="items-center mt-4">
                    <View className={`w-36 h-36 ${page.imageColor} rounded-full items-center justify-center`}>
                        <Text className="text-6xl">{page.image}</Text>
                    </View>
                </View> */}
            </>
        );
    }

    // Default / Continuation
    return (
        <View className="justify-center flex-1">
            {page.text.map((paragraph: string, index: number) => (
                <Text key={index} className="text-xl text-slate-600 leading-8 mb-8 font-medium">
                    {paragraph.includes('fight or flight') ? (
                        <Text>
                            {paragraph.split('fight or flight')[0]}
                            <Text className="font-bold text-slate-800">fight or flight</Text>
                            {paragraph.split('fight or flight')[1]}
                        </Text>
                    ) : (
                        paragraph
                    )}
                </Text>
            ))}
        </View>
    );
}
