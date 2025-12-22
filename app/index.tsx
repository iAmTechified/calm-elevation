import { View, Text, ImageBackground, TouchableOpacity, Image, Pressable } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Button from '../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function OnboardingScreen() {
    return (
        <>
            <StatusBar style="dark" />
            <SafeAreaView className="flex-1 bg-white px-8 py-50 overflow-hidden">

                <LinearGradient
                    colors={['#6fc6c945', '#f0f636a9', '#6fc6c945']}
                    locations={[0.2, 0.4, 0.6]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 1 }}
                    className="absolute top-0 left-0 right-0 bottom-0 h-[150%] w-[150%] opacity-20"
                    dither
                >
                </LinearGradient>
                <View className="w-full h-full flex flex-col justify-center items-center pt-20">
                    <Image
                        source={require('../assets/cal-cloud.png')}
                        className="h-[200px] w-[200px] mb-8"
                    />
                    <Text className="text-lg font-sans font-semibold text-primaryLight text-center mb-6 tracking-tight">
                        Hi, I'm Cal
                    </Text>
                    <Text className="text-center font-sans text-primaryLight text-lg leading-7 mb-10 font-semibold opacity-90">
                        I’m happy you’re here. Welcome to our award winning app for self healing, panic and stress relief.
                    </Text>

                    <View className="w-full flex-col flex-1 justify-between items-center">
                        <View className='w-full'>
                        <Button
                            onPress={() => {
                                router.push('/(onboarding)');
                            }}
                            text="Enter without account"
                            style="mb-4"
                            textStyle="text-white"
                        />
                        <Button
                            onPress={() => {
                                router.push('/(onboarding)');
                            }}
                            text="Enter with account"
                            style="bg-slate-300"
                            textStyle="text-black"
                        />
                        </View>
                    <Text className="text-black/70 text-center text-[12px] mb-10 font-medium align-self-end">By continuing, you agree with our T&C</Text>
                </View>
                    </View>
            </SafeAreaView>
        </>
    );
}
