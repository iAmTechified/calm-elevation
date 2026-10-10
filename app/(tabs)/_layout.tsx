import { Tabs } from "expo-router";
import { BarChart3, Map as MapIcon } from 'lucide-react-native';
import { useTranslation } from 'react-i18next';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabLayout() {
    const { t } = useTranslation();

    return (
        <Tabs
            tabBar={(props) => <CustomTabBar {...props} />}
            screenOptions={{
                headerShown: false,
            }}
        >
            <Tabs.Screen
                name="index"
                options={{
                    title: t('tabs.journey'),
                    tabBarIcon: ({ color }) => <MapIcon size={32} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: t('tabs.stats'),
                    tabBarIcon: ({ color }) => <BarChart3 size={32} color={color} />,
                }}
            />
        </Tabs>
    );
}
