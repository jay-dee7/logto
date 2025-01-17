import classNames from 'classnames';

import Tick from '@/assets/icons/tick.svg';
import { type TenantResponse } from '@/cloud/types/router';
import PlanName from '@/components/PlanName';
import { DropdownItem } from '@/ds-components/Dropdown';
import useSubscriptionPlan from '@/hooks/use-subscription-plan';

import TenantEnvTag from '../TenantEnvTag';

import TenantStatusTag from './TenantStatusTag';
import * as styles from './index.module.scss';

type Props = {
  tenantData: TenantResponse;
  isSelected: boolean;
  onClick: () => void;
};

function TenantDropdownItem({ tenantData, isSelected, onClick }: Props) {
  const { id, name, tag } = tenantData;
  const { data: tenantPlan } = useSubscriptionPlan(id);

  return (
    <DropdownItem className={styles.item} onClick={onClick}>
      <div className={styles.info}>
        <div className={styles.meta}>
          <div className={styles.name}>{name}</div>
          <TenantEnvTag tag={tag} />
          <TenantStatusTag tenantId={id} className={styles.statusTag} />
        </div>
        <div className={styles.planName}>{tenantPlan && <PlanName name={tenantPlan.name} />}</div>
      </div>
      <Tick className={classNames(styles.checkIcon, isSelected && styles.visible)} />
    </DropdownItem>
  );
}

export default TenantDropdownItem;
