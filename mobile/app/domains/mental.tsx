import { useTranslation } from 'react-i18next';
import { DomainScreen } from '@/components/DomainScreen';

export default function MentalScreen() {
  const { t } = useTranslation();

  return (
    <DomainScreen 
      domain="MENTAL"
      title={t('mental.title')}
      subtitle={t('mental.subtitle')}
    />
  );
}
