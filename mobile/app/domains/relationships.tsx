import { useTranslation } from 'react-i18next';
import { DomainScreen } from '@/components/DomainScreen';

export default function RelationshipsScreen() {
  const { t } = useTranslation();

  return (
    <DomainScreen 
      domain="RELATIONSHIPS"
      title={t('relationships.title')}
      subtitle={t('relationships.subtitle')}
    />
  );
}
