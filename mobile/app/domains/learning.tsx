import { useTranslation } from 'react-i18next';
import { DomainScreen } from '@/components/DomainScreen';

export default function LearningScreen() {
  const { t } = useTranslation();

  return (
    <DomainScreen 
      domain="LEARNING"
      title={t('learning.title')}
      subtitle={t('learning.subtitle')}
    />
  );
}
