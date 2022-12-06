import type { AppStatus } from '@rocket.chat/apps-engine/definition/AppStatus';

import { t } from '../../../../../app/utils/client';
import { dispatchToastMessage } from '../../../../lib/toast';
import appErroredStatuses from '../utils/appErroredStatuses';

const warnAppInstall = (appName: string, status: AppStatus): void => {
	if (appErroredStatuses.includes(status)) {
		dispatchToastMessage({ type: 'error', message: (t(`App_status_${status}`), appName) });
		return;
	}

	dispatchToastMessage({ type: 'success', message: `${appName} installed` });
};

export default warnAppInstall;
