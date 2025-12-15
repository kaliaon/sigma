import { Stack } from 'expo-router';
import { useTranslation } from 'react-i18next';

export default function DomainsLayout() {
  const { t } = useTranslation();

  return (
    <Stack>
      <Stack.Screen name="health" options={{ title: t('health.title') || 'Health' }} />
      <Stack.Screen name="finance" options={{ title: t('finance.title') || 'Finance' }} />
      <Stack.Screen name="learning" options={{ title: t('learning.title') || 'Learning' }} />
      <Stack.Screen name="relationships" options={{ title: t('relationships.title') || 'Relationships' }} />
      <Stack.Screen name="mental" options={{ title: t('mental.title') || 'Mental' }} />
    </Stack>
  );
}
