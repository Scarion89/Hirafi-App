import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { BookingsProvider } from '../store/bookings';
import { AuthProvider } from '../store/auth';
import { colors } from '../constants/theme';

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <BookingsProvider>
          <StatusBar style="light" />
          <Stack
            screenOptions={{
              headerStyle: { backgroundColor: colors.bg },
              headerShadowVisible: false,
              headerTintColor: colors.text,
              headerTitleStyle: { fontWeight: '700', color: colors.text },
              contentStyle: { backgroundColor: colors.bg },
              animation: 'slide_from_right',
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
            <Stack.Screen name="splash" options={{ headerShown: false }} />
            <Stack.Screen name="auth" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="category/[id]" options={{ title: '' }} />
            <Stack.Screen name="worker/[id]" options={{ title: 'Worker Profile' }} />
            <Stack.Screen name="booking/[id]" options={{ title: 'Confirm booking' }} />
            <Stack.Screen name="tracking" options={{ headerShown: false }} />
            <Stack.Screen name="rating" options={{ title: 'Rate your pro', presentation: 'modal' }} />
            <Stack.Screen name="worker-app" options={{ headerShown: false }} />
            <Stack.Screen name="admin" options={{ headerShown: false }} />
          </Stack>
        </BookingsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
