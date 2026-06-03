import React, { useState, useEffect, useRef } from 'react';
import { View, Text, ScrollView, Pressable, StyleSheet, Animated } from 'react-native';
import { useRouter } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { colors, radius, spacing } from '../constants/theme';

const INITIAL_NOTIFICATIONS = [
  { id: 'n1', type: 'booking', title: 'Booking confirmed', body: 'Hassan Mahmoud will arrive Today at 4:00 PM', time: '2m ago', read: false },
  { id: 'n2', type: 'promo',   title: '20% off this weekend', body: 'Book any plumbing service this Friday or Saturday', time: '1h ago', read: false },
  { id: 'n3', type: 'review',  title: 'New review received', body: 'Sara Mostafa gave you 5 stars', time: '3h ago', read: true },
  { id: 'n4', type: 'booking', title: 'Job complete', body: 'Your pipe repair with Hassan Mahmoud is done', time: 'Yesterday', read: true },
  { id: 'n5', type: 'promo',   title: 'New pros in your area', body: '5 new electricians joined hirafi in Madinaty', time: '2 days ago', read: true },
];

const TYPE_CONFIG = {
  booking: { emoji: '📅', bg: colors.primaryMuted, color: colors.primary },
  promo:   { emoji: '🔔', bg: '#1A2E1A', color: colors.success },
  review:  { emoji: '⭐', bg: '#2E2A10', color: '#F0C040' },
};

export default function Notifications() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const [notifications, setNotifications] = useState(INITIAL_NOTIFICATIONS);
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 350,
      useNativeDriver: true,
    }).start();
  }, []);

  function markAllRead() {
    setNotifications((ns) => ns.map((n) => ({ ...n, read: true })));
  }

  function markRead(id) {
    setNotifications((ns) => ns.map((n) => n.id === id ? { ...n, read: true } : n));
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <View style={[styles.root, { paddingTop: insets.top }]}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <Pressable style={styles.backBtn} onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.title}>Notifications</Text>
        <Pressable onPress={markAllRead} style={styles.markAllBtn}>
          <Text style={[styles.markAllText, unreadCount === 0 && styles.markAllTextDim]}>
            Mark all read
          </Text>
        </Pressable>
      </View>

      <Animated.View style={[{ flex: 1 }, { opacity: fadeAnim }]}>
        <ScrollView
          contentContainerStyle={[styles.listContent, { paddingBottom: insets.bottom + 24 }]}
          showsVerticalScrollIndicator={false}
        >
          {notifications.length === 0 ? (
            <View style={styles.emptyState}>
              <Text style={styles.emptyEmoji}>🎉</Text>
              <Text style={styles.emptyText}>All caught up!</Text>
              <Text style={styles.emptySubText}>No new notifications right now.</Text>
            </View>
          ) : (
            notifications.map((n) => {
              const cfg = TYPE_CONFIG[n.type] || TYPE_CONFIG.promo;
              return (
                <Pressable
                  key={n.id}
                  style={({ pressed }) => [
                    styles.notifRow,
                    !n.read && styles.notifRowUnread,
                    pressed && { opacity: 0.7 },
                  ]}
                  onPress={() => markRead(n.id)}
                >
                  {/* Unread indicator */}
                  {!n.read && <View style={styles.unreadBar} />}

                  {/* Icon */}
                  <View style={[styles.iconCircle, { backgroundColor: cfg.bg }]}>
                    <Text style={styles.iconEmoji}>{cfg.emoji}</Text>
                  </View>

                  {/* Content */}
                  <View style={styles.notifContent}>
                    <Text style={[styles.notifTitle, !n.read && styles.notifTitleBold]}>
                      {n.title}
                    </Text>
                    <Text style={styles.notifBody} numberOfLines={2}>
                      {n.body}
                    </Text>
                  </View>

                  {/* Time */}
                  <Text style={styles.notifTime}>{n.time}</Text>
                </Pressable>
              );
            })
          )}
        </ScrollView>
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.bg },
  topBar: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.md, paddingVertical: spacing.sm,
    borderBottomWidth: 1, borderBottomColor: colors.border,
    height: 54,
  },
  backBtn: { width: 40, height: 40, alignItems: 'center', justifyContent: 'center' },
  backArrow: { fontSize: 32, color: colors.text, lineHeight: 36 },
  title: { flex: 1, fontSize: 17, fontWeight: '800', color: colors.text, textAlign: 'center' },
  markAllBtn: { paddingHorizontal: 4 },
  markAllText: { fontSize: 13, fontWeight: '700', color: colors.primary },
  markAllTextDim: { color: colors.textMuted },

  listContent: { paddingTop: spacing.sm },

  notifRow: {
    flexDirection: 'row', alignItems: 'center',
    paddingHorizontal: spacing.lg, paddingVertical: spacing.md,
    gap: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border,
    position: 'relative',
  },
  notifRowUnread: { backgroundColor: colors.bgCard },
  unreadBar: {
    position: 'absolute', left: 0, top: 10, bottom: 10,
    width: 6, borderRadius: 3, backgroundColor: colors.primary,
  },
  iconCircle: {
    width: 44, height: 44, borderRadius: 22,
    alignItems: 'center', justifyContent: 'center', flexShrink: 0,
  },
  iconEmoji: { fontSize: 20 },
  notifContent: { flex: 1 },
  notifTitle: { fontSize: 14, fontWeight: '500', color: colors.text, marginBottom: 3 },
  notifTitleBold: { fontWeight: '800' },
  notifBody: { fontSize: 12, color: colors.textMuted, lineHeight: 17 },
  notifTime: { fontSize: 11, color: colors.textMuted, flexShrink: 0, alignSelf: 'flex-start', marginTop: 2 },

  emptyState: { alignItems: 'center', marginTop: 100 },
  emptyEmoji: { fontSize: 48, marginBottom: spacing.md },
  emptyText: { fontSize: 20, fontWeight: '800', color: colors.text, marginBottom: 6 },
  emptySubText: { fontSize: 14, color: colors.textMuted },
});
