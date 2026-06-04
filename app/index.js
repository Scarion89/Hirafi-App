import { Redirect } from 'expo-router';
import { useAuth } from '../store/auth';

export default function Index() {
  const { user } = useAuth();
  if (!user) return <Redirect href="/splash" />;
  if (user.role === 'pro') return <Redirect href="/worker-app" />;
  return <Redirect href="/(tabs)" />;
}
