import { ImageSourcePropType } from 'react-native';

export interface SleepTrack {
    id: string;
    title: string;
    duration: string;
    image: ImageSourcePropType;
    audioSource: any; // Result of require() or { uri: string }
    category?: string;
    totalDurationSeconds: number; // For UI loop representation (8h or 10h)
}

export const sleepTracks: SleepTrack[] = [
    {
        id: 'night',
        title: 'Deep Night',
        duration: '10 hrs',
        image: require('../../assets/sleep_lullaby.jpeg'),
        audioSource: require('../../assets/sounds/night.mp3'),
        category: 'Nature',
        totalDurationSeconds: 36000
    },
    {
        id: 'thunder',
        title: 'Distant Thunder',
        duration: '10 hr',
        image: require('../../assets/sleep_thunder.png'),
        audioSource: require('../../assets/sounds/thunder.mp3'),
        category: 'Nature',
        totalDurationSeconds: 36000
    },
    {
        id: 'forest',
        title: 'Safe Forest',
        duration: '8 hr',
        image: require('../../assets/sleep_forest.png'),
        audioSource: require('../../assets/sounds/birds.mp3'),
        category: 'Nature',
        totalDurationSeconds: 28800
    },
    {
        id: 'ocean',
        title: 'Rolling Waves',
        duration: '10 hrs',
        image: require('../../assets/sleep_ocean.png'),
        audioSource: require('../../assets/sounds/ocean.mp3'),
        category: 'Nature',
        totalDurationSeconds: 36000
    },
    {
        id: 'river',
        title: 'River Stream',
        duration: '10 hr',
        image: require('../../assets/sleep_rain.png'), // Reuse rain image
        audioSource: require('../../assets/sounds/river.mp3'),
        category: 'Nature',
        totalDurationSeconds: 36000
    },
    {
        id: 'wind',
        title: 'Windy Day',
        duration: '10 hr',
        image: require('../../assets/sleep_forest.png'), // Reuse forest image
        audioSource: require('../../assets/sounds/wind.mp3'),
        category: 'Nature',
        totalDurationSeconds: 36000
    },
    // Wind Down Routines
    {
        id: 'body-scan',
        title: 'Body Scan',
        duration: '15 min',
        image: require('../../assets/sleep_lullaby.jpeg'),
        audioSource: require('../../assets/sounds/night.mp3'), // Placeholder audio
        category: 'Wind Down',
        totalDurationSeconds: 900
    },
    {
        id: 'soft-rain-breath',
        title: 'Soft Rain Breathing',
        duration: '20 min',
        image: require('../../assets/sleep_rain.png'),
        audioSource: require('../../assets/sounds/rain.mp3'),
        category: 'Wind Down',
        totalDurationSeconds: 1200
    }
];
