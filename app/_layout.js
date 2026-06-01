import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BookingsProvider } from '../store/bookings';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <BookingsProvider>
        <StatusBar style="dark" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.background },
            headerShadowVisible: false,
            headerTintColor: colors.text,
            headerTitleStyle: { fontWeight: '700' },
            contentStyle: { backgroundColor: colors.background },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="category/[id]" options={{ title: '' }} />
          <Stack.Screen name="provider/[id]" options={{ title: '', headerTransparent: true }} />
          <Stack.Screen name="booking/[id]" options={{ title: 'Book a visit', presentation: 'modal' }} />
        </Stack>
      </BookingsProvider>
    </SafeAreaProvider>
  );
}
