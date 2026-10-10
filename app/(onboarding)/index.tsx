import { View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import Button from '../../components/Button';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';

export default function OnboardingWelcomeScreen() {
    const { t } = useTranslation();

    return (
        <SafeAreaView className="flex-1 bg-white dark:bg-slate-900 px-8">
            <LinearGradient
                colors={['#6fc6c945', '#f0f636a9', '#6fc6c945']}
                locations={[0.2, 0.4, 0.6]}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}
                className="absolute top-0 left-0 right-0 bottom-0 h-[150%] w-[150%] opacity-20"
                dither
            >
            </LinearGradient>
            <ScrollView
                showsVerticalScrollIndicator={false}
                contentContainerStyle={{ flexGrow: 1, justifyContent: 'space-between' }}
            >
                <View className="w-full flex-col justify-center items-center pt-10">
                    <Image
                        source={require('../../assets/cal-cloud.png')}
                        className="h-[180px] w-[180px] mb-6"
                        resizeMode="contain"
                    />
                    <Text className="text-lg font-sans font-semibold text-primaryLight dark:text-primary text-center mb-4 tracking-tight">
                        {t('onboarding.welcome.title')}
                    </Text>
                    <Text className="text-center font-sans text-primaryLight dark:text-gray-300 text-lg leading-7 mb-8 font-semibold opacity-90">
                        {t('onboarding.welcome.subtitle')}
                    </Text>
                </View>

                <View className="w-full flex-col items-center pb-6">
                    <View className='w-full'>
                        <Button
                            onPress={() => {
                                router.push('/(onboarding)/steps');
                            }}
                            text={t('onboarding.welcome.startJourney')}
                            style="mb-4"
                            textStyle="text-white"
                        />
                    </View>
                    <Text className="text-black/70 dark:text-white/70 text-center text-[12px] font-medium">
                        {t('onboarding.welcome.termsAgreement')}
                    </Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}
