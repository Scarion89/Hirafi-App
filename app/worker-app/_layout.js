import { Stack } from 'expo-router';
import { colors } from '../../constants/theme';

export default function WorkerAppLayout() {
  return (
    <Stack
      screenOptions={{
        headerStyle: { backgroundColor: colors.bg },
        headerShadowVisible: false,
        headerTintColor: colors.text,
        contentStyle: { backgroundColor: colors.bg },
        headerShown: false,
      }}
    />
  );
}
