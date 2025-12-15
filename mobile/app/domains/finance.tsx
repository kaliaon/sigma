import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { StyleSheet, View } from 'react-native';
import { ThemedText } from '@/components/themed-text';
import { DomainScreen } from '@/components/DomainScreen';
import { Colors } from '@/constants/theme';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { economy } from '@/services/api';

export default function FinanceScreen() {
  const { t } = useTranslation();
  const colorScheme = useColorScheme();
  const [wallet, setWallet] = useState<any>(null);

  useEffect(() => {
    economy.getWallet().then(res => setWallet(res.data)).catch(console.error);
  }, []);

  return (
    <DomainScreen 
      domain="FINANCE"
      title={t('finance.title')}
      subtitle={t('finance.subtitle')}
    >
      <View style={[styles.balanceCard, { backgroundColor: Colors[colorScheme ?? 'light'].tint }]}>
        <ThemedText style={styles.balanceLabel}>{t('finance.currency')}</ThemedText>
        <ThemedText style={styles.balanceAmount}>{wallet?.balance || 0} {t('finance.coins')}</ThemedText>
        <ThemedText style={styles.balanceSubtext}>{t('finance.earnCoins')}</ThemedText>
      </View>
    </DomainScreen>
  );
}

const styles = StyleSheet.create({
  balanceCard: {
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  balanceLabel: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  balanceAmount: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 8,
    height: 48,
    lineHeight: 48,
  },
  balanceSubtext: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    marginTop: 4,
  },
});
