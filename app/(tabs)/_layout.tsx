import { Tabs } from "expo-router";
import { BarChart3, Map as MapIcon } from 'lucide-react-native';
import CustomTabBar from '../../components/CustomTabBar';

export default function TabLayout() {
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
                    title: "My Journey",
                    tabBarIcon: ({ color }) => <MapIcon size={32} color={color} />,
                }}
            />
            <Tabs.Screen
                name="settings"
                options={{
                    title: "My Stats",
                    tabBarIcon: ({ color }) => <BarChart3 size={32} color={color} />,
                }}
            />
        </Tabs>
    );
}
