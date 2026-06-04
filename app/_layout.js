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
          <StatusBar style="dark" />
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
            <Stack.Screen name="search" options={{ headerShown: false }} />
            <Stack.Screen name="category/[id]" options={{ title: '' }} />
            <Stack.Screen name="worker/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="booking/describe" options={{ headerShown: false }} />
            <Stack.Screen name="booking/schedule" options={{ headerShown: false }} />
            <Stack.Screen name="booking/address" options={{ headerShown: false }} />
            <Stack.Screen name="booking/[id]" options={{ headerShown: false }} />
            <Stack.Screen name="booking/matching" options={{ headerShown: false, animation: 'fade' }} />
            <Stack.Screen name="tracking" options={{ headerShown: false }} />
            <Stack.Screen name="complete" options={{ headerShown: false }} />
            <Stack.Screen name="rating" options={{ headerShown: false, presentation: 'modal' }} />
            <Stack.Screen name="receipt" options={{ headerShown: false }} />
            <Stack.Screen name="worker-app" options={{ headerShown: false }} />
            <Stack.Screen name="admin" options={{ headerShown: false }} />
            <Stack.Screen name="notifications" options={{ headerShown: false }} />
            <Stack.Screen name="profile/edit" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="profile/payment" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="profile/addresses" options={{ presentation: 'modal', headerShown: false }} />
            <Stack.Screen name="profile/help" options={{ presentation: 'modal', headerShown: false }} />
          </Stack>
        </BookingsProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
