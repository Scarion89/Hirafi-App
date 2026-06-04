import { Stack } from 'expo-router';
import { colors } from '../../constants/theme';

export default function WorkerAppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.dark },
        headerShadowVisible: false,
        headerTintColor: colors.textLight,
        contentStyle: { backgroundColor: colors.dark },
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="kyc" options={{ headerShown: false }} />
      <Stack.Screen name="skills" options={{ headerShown: false }} />
      <Stack.Screen name="verify" options={{ headerShown: false }} />
      <Stack.Screen name="pending" options={{ headerShown: false }} />
      <Stack.Screen name="incoming" options={{ headerShown: false, animation: 'fade' }} />
      <Stack.Screen name="job-detail" options={{ headerShown: false }} />
      <Stack.Screen name="arrived" options={{ headerShown: false }} />
      <Stack.Screen name="working" options={{ headerShown: false }} />
      <Stack.Screen name="request-payment" options={{ headerShown: false }} />
      <Stack.Screen name="job-complete" options={{ headerShown: false }} />
      <Stack.Screen name="job-request" options={{ headerShown: false }} />
      <Stack.Screen name="wallet" options={{ headerShown: false }} />
      <Stack.Screen name="jobs" options={{ headerShown: false }} />
    </Stack>
  );
}
