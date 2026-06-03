import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BookingsProvider } from '../store/bookings';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <BookingsProvider>
        <StatusBar style="light" />
        <Stack
          screenOptions={{
            headerStyle: { backgroundColor: colors.bg },
            headerShadowVisible: false,
            headerTintColor: colors.text,
            headerTitleStyle: { fontWeight: '700', color: colors.text },
            contentStyle: { backgroundColor: colors.bg },
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="splash" options={{ headerShown: false }} />
          <Stack.Screen name="category/[id]" options={{ title: '' }} />
          <Stack.Screen name="worker/[id]" options={{ title: 'Worker Profile' }} />
          <Stack.Screen name="booking/[id]" options={{ title: 'Confirm booking' }} />
          <Stack.Screen name="tracking" options={{ title: 'Active Job' }} />
          <Stack.Screen name="rating" options={{ title: 'Rate your pro', presentation: 'modal' }} />
          <Stack.Screen name="worker-app" options={{ headerShown: false }} />
          <Stack.Screen name="admin" options={{ headerShown: false }} />
        </Stack>
      </BookingsProvider>
    </SafeAreaProvider>
  );
}
