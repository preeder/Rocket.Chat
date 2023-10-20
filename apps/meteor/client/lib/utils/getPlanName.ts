export enum PlanName {
	COMMUNITY = 'Community',
	STARTER = 'Starter',
	PRO = 'Pro',
	PRO_TRIAL = 'Pro_trial',
	ENTERPRISE = 'Enterprise',
	ENTERPRISE_TRIAL = 'Enterprise_trial',
}

export const getPlanName = (isEnterprise: boolean, activeModules: string[], isTrial: boolean): PlanName | undefined => {
	if (!isEnterprise) {
		return PlanName.COMMUNITY;
	}

	if (!activeModules || activeModules.length === 0) {
		return;
	}

	const hasHideWatermarkModule = activeModules.includes('hide-watermark');
	const hasScalabilityModule = activeModules.includes('scalability');

	switch (true) {
		case hasScalabilityModule && isTrial:
			return PlanName.ENTERPRISE_TRIAL;
		case hasScalabilityModule:
			return PlanName.ENTERPRISE;
		case hasHideWatermarkModule:
			return PlanName.PRO;
		case isTrial:
			return PlanName.PRO_TRIAL;
		default:
			return PlanName.STARTER;
	}
};