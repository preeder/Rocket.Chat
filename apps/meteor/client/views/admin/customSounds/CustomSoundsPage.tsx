import { Button } from '@rocket.chat/fuselage';
import { useRoute, useRouteParameter, useTranslation } from '@rocket.chat/ui-contexts';
import React, { useCallback, useRef } from 'react';

import { ContextualbarTitle, Contextualbar, ContextualbarClose, ContextualbarHeader } from '../../../components/Contextualbar';
import Page from '../../../components/Page';
import AddCustomSound from './AddCustomSound';
import CustomSoundsTable from './CustomSoundsTable';
import EditCustomSound from './EditCustomSound';

const CustomSoundsPage = () => {
	const t = useTranslation();
	const id = useRouteParameter('id');
	const route = useRoute('custom-sounds');
	const context = useRouteParameter('context');

	const reload = useRef(() => null);

	const handleItemClick = useCallback(
		(_id) => (): void => {
			route.push({
				context: 'edit',
				id: _id,
			});
		},
		[route],
	);

	const handleNewButtonClick = useCallback(() => {
		route.push({ context: 'new' });
	}, [route]);

	const handleClose = useCallback(() => {
		route.push({});
	}, [route]);

	const handleReload = useCallback(() => {
		reload.current();
	}, []);

	return (
		<Page flexDirection='row'>
			<Page name='admin-custom-sounds'>
				<Page.Header title={t('Custom_Sounds')}>
					<Button primary onClick={handleNewButtonClick} aria-label={t('New')}>
						{t('New')}
					</Button>
				</Page.Header>
				<Page.Content>
					<CustomSoundsTable reload={reload} onClick={handleItemClick} />
				</Page.Content>
			</Page>
			{context && (
				<Contextualbar flexShrink={0}>
					<ContextualbarHeader>
						<ContextualbarTitle>
							{context === 'edit' && t('Custom_Sound_Edit')}
							{context === 'new' && t('Custom_Sound_Add')}
						</ContextualbarTitle>
						<ContextualbarClose onClick={handleClose} />
					</ContextualbarHeader>
					{context === 'edit' && <EditCustomSound _id={id} close={handleClose} onChange={handleReload} />}
					{context === 'new' && <AddCustomSound goToNew={handleItemClick} close={handleClose} onChange={handleReload} />}
				</Contextualbar>
			)}
		</Page>
	);
};

export default CustomSoundsPage;
