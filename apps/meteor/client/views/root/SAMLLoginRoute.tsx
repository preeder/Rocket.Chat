import { useRouter, useToastMessageDispatch } from '@rocket.chat/ui-contexts';
import { Meteor } from 'meteor/meteor';
import { useEffect } from 'react';

const SAMLLoginRoute = () => {
	const router = useRouter();
	const dispatchToastMessage = useToastMessageDispatch();

	useEffect(() => {
		const { token } = router.getRouteParameters();
		Meteor.loginWithSamlToken(token, (error?: unknown) => {
			if (error) {
				console.log('saml token login error, dispatch toast');
				dispatchToastMessage({ type: 'error', message: error });
			}

			console.log('SAML login callback: redirect to home');
			router.navigate(
				{
					pathname: '/home',
				},
				{ replace: true },
			);
		});
	}, [dispatchToastMessage, router]);

	return null;
};

export default SAMLLoginRoute;
