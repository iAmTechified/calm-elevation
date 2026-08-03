import React from 'react';
import { View, Text, TouchableOpacity, Linking } from 'react-native';
import { BookOpen, ExternalLink, ShoppingBag } from 'lucide-react-native';

export default function PhysicalBookBanner() {
    const handleOpenShop = async () => {
        try {
            await Linking.openURL('https://calmelevation.com/shop');
        } catch (error) {
            console.error('Failed to open shop URL:', error);
        }
    };

    return (
        <View className="mt-6 mb-8 mx-5 bg-gradient-to-r from-slate-900 to-indigo-950 dark:from-slate-900 dark:to-slate-900 rounded-3xl p-5 border border-indigo-500/20 shadow-xl overflow-hidden relative">
            {/* Background Ambient Glow */}
            <View className="absolute -right-10 -bottom-10 w-40 h-40 bg-indigo-500/20 rounded-full blur-2xl" />
            
            <View className="flex-row items-start justify-between">
                <View className="flex-1 mr-4">
                    <View className="flex-row items-center mb-2">
                        <View className="p-2 bg-indigo-500/20 rounded-xl mr-2.5">
                            <BookOpen size={20} color="#818CF8" />
                        </View>
                        <Text className="text-xs font-bold uppercase tracking-wider text-indigo-300">
                            Printed Workbooks
                        </Text>
                    </View>

                    <Text className="text-lg font-bold text-white mb-1">
                        Prefer a Physical Copy?
                    </Text>

                    <Text className="text-sm text-slate-300 leading-5 mb-4">
                        Request hardcover or paperback editions of Joseph I.'s workbooks for quiet offline journaling.
                    </Text>

                    <TouchableOpacity
                        onPress={handleOpenShop}
                        activeOpacity={0.8}
                        className="flex-row items-center justify-center bg-indigo-600 hover:bg-indigo-500 px-4 py-3 rounded-2xl shadow-md shadow-indigo-600/30"
                    >
                        <ShoppingBag size={18} color="#FFFFFF" className="mr-2" />
                        <Text className="text-white font-bold text-sm mr-2">
                            Visit Shop (calmelevation.com/shop)
                        </Text>
                        <ExternalLink size={16} color="#FFFFFF" />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}
