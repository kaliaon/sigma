import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity, View, Modal, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useAuth } from '@/contexts/auth-context';
import { useRouter } from 'expo-router';
import { IconSymbol } from '@/components/ui/icon-symbol';

export default function ProfileScreen() {
  const { t, i18n } = useTranslation();
  const { user, logout } = useAuth();
  const router = useRouter();
  const colorScheme = useColorScheme();
  const [modalVisible, setModalVisible] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const changeLanguage = (lang: string) => {
    i18n.changeLanguage(lang);
    setModalVisible(false);
  };

  const languages = [
    { code: 'en', label: 'English', icon: '🇺🇸' },
    { code: 'ru', label: 'Русский', icon: '🇷🇺' },
    { code: 'kk', label: 'Қазақша', icon: '🇰🇿' },
  ];

  const currentLanguage = languages.find(l => l.code === i18n.language) || languages[0];

  return (
    <ThemedView style={styles.container}>
      <View style={styles.header}>
        <View style={[styles.avatarPlaceholder, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
          <ThemedText style={styles.avatarText}>
            {user?.username?.charAt(0).toUpperCase() || 'U'}
          </ThemedText>
        </View>
        <ThemedText type="title" style={styles.username}>
          {user?.username || 'User'}
        </ThemedText>
        <ThemedText style={styles.email}>{user?.email || 'user@example.com'}</ThemedText>
      </View>

      <View style={styles.statsRow}>
        <View style={[styles.statItem, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
          <ThemedText style={styles.statValue}>{user?.profile?.level || 1}</ThemedText>
          <ThemedText style={styles.statLabel}>{t('common.level')}</ThemedText>
        </View>
        <View style={[styles.statItem, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
          <ThemedText style={styles.statValue}>{user?.profile?.xp || 0}</ThemedText>
          <ThemedText style={styles.statLabel}>{t('common.totalXp')}</ThemedText>
        </View>
        <View style={[styles.statItem, { borderColor: Colors[colorScheme ?? 'light'].icon }]}>
          <ThemedText style={styles.statValue}>{user?.profile?.current_streak || 0}</ThemedText>
          <ThemedText style={styles.statLabel}>{t('profile.streak')}</ThemedText>
        </View>
      </View>

      <TouchableOpacity 
        style={[styles.statsButton, { backgroundColor: Colors[colorScheme ?? 'light'].tint + '15' }]}
        onPress={() => router.push('/stats')}
      >
        <IconSymbol name="chart.bar.xaxis" size={24} color={Colors[colorScheme ?? 'light'].tint} />
        <View style={styles.statsButtonContent}>
            <ThemedText style={[styles.statsButtonTitle, { color: Colors[colorScheme ?? 'light'].tint }]}>{t('stats.viewStats')}</ThemedText>
            <ThemedText style={styles.statsButtonSubtitle}>{t('stats.checkProgress')}</ThemedText>
        </View>
        <IconSymbol name="chevron.right" size={20} color={Colors[colorScheme ?? 'light'].tint} />
      </TouchableOpacity>

      <View style={styles.section}>
        <ThemedText type="subtitle" style={styles.sectionTitle}>
          {t('profile.settings')}
        </ThemedText>

        <View style={styles.settingItem}>
          <ThemedText style={styles.settingLabel}>{t('profile.language')}</ThemedText>
          <TouchableOpacity
            style={[styles.dropdownButton, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}
            onPress={() => setModalVisible(true)}
          >
            <ThemedText style={styles.dropdownText}>
              {currentLanguage.icon} {currentLanguage.label}
            </ThemedText>
            <IconSymbol name="chevron.down" size={16} color={Colors[colorScheme ?? 'light'].icon} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <IconSymbol name="rectangle.portrait.and.arrow.right" size={20} color="#ff3b30" />
          <ThemedText style={styles.logoutText}>{t('profile.logout')}</ThemedText>
        </TouchableOpacity>
      </View>

      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable style={styles.modalOverlay} onPress={() => setModalVisible(false)}>
          <View style={[styles.modalContent, { backgroundColor: Colors[colorScheme ?? 'light'].background }]}>
            <View style={styles.modalHeader}>
              <ThemedText type="subtitle">{t('profile.language')}</ThemedText>
              <TouchableOpacity onPress={() => setModalVisible(false)}>
                 <IconSymbol name="xmark.circle.fill" size={24} color={Colors[colorScheme ?? 'light'].icon} />
              </TouchableOpacity>
            </View>
            {languages.map((lang) => (
              <TouchableOpacity
                key={lang.code}
                style={[
                  styles.languageOption,
                  i18n.language === lang.code && { backgroundColor: Colors[colorScheme ?? 'light'].tint + '20' }
                ]}
                onPress={() => changeLanguage(lang.code)}
              >
                <ThemedText style={styles.languageOptionText}>
                  {lang.icon}  {lang.label}
                </ThemedText>
                {i18n.language === lang.code && (
                  <IconSymbol name="checkmark" size={20} color={Colors[colorScheme ?? 'light'].tint} />
                )}
              </TouchableOpacity>
            ))}
          </View>
        </Pressable>
      </Modal>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    alignItems: 'center',
    marginBottom: 32,
  },
  avatarPlaceholder: {
    width: 100,
    height: 100,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 40,
    color: '#fff',
    fontWeight: 'bold',
  },
  username: {
    marginBottom: 4,
  },
  email: {
    opacity: 0.7,
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 32,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 12,
    padding: 12,
    marginHorizontal: 4,
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    opacity: 0.7,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
    zIndex: 1,
  },
  settingLabel: {
    fontSize: 16,
  },
  dropdownButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minWidth: 150,
    justifyContent: 'space-between',
  },
  dropdownText: {
    fontSize: 16,
    marginRight: 8,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 12,
    backgroundColor: '#ffe5e5',
    gap: 8,
    marginTop: 20,
  },
  logoutText: {
    color: '#ff3b30',
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContent: {
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 20,
    paddingBottom: 40,
    maxHeight: '50%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  languageOption: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  languageOptionText: {
    fontSize: 16,
    fontWeight: '500',
  },
  statsButton: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 16,
      marginHorizontal: 0,
      marginBottom: 24,
      borderRadius: 16,
      gap: 16,
  },
  statsButtonContent: {
      flex: 1,
  },
  statsButtonTitle: {
      fontSize: 18,
      fontWeight: 'bold',
  },
  statsButtonSubtitle: {
      fontSize: 14,
      opacity: 0.7,
  },
});
