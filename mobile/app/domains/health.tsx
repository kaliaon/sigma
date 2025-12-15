import { useTranslation } from 'react-i18next';
import { DomainScreen } from '@/components/DomainScreen';

export default function HealthScreen() {
  const { t } = useTranslation();

  return (
    <DomainScreen 
      domain="HEALTH"
      title={t('health.title')}
      subtitle={t('health.subtitle')}
    />
  );
}
