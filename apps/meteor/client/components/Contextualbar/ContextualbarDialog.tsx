import { Contextualbar } from '@rocket.chat/fuselage';
import { useLayoutContextualbar } from '@rocket.chat/ui-contexts';
import type { ComponentProps, KeyboardEvent } from 'react';
import React, { useCallback, useRef } from 'react';
import type { AriaDialogProps } from 'react-aria';
import { FocusScope, useDialog } from 'react-aria';

import { useRoomToolbox } from '../../views/room/contexts/RoomToolboxContext';
import ContextualbarResizable from './ContextualbarResizable';

type ContextualbarDialogProps = AriaDialogProps & ComponentProps<typeof Contextualbar>;

const ContextualbarDialog = (props: ContextualbarDialogProps) => {
	const ref = useRef(null);
	const { dialogProps } = useDialog({ 'aria-labelledby': 'contextualbarTitle', ...props }, ref);
	const { size, position } = useLayoutContextualbar();
	const { closeTab } = useRoomToolbox();

	const callbackRef = useCallback(
		(node) => {
			if (!node) {
				return;
			}

			ref.current = node;
			node.addEventListener('keydown', (e: KeyboardEvent) => {
				if (e.key === 'Escape') {
					closeTab();
				}
			});
		},
		[closeTab],
	);

	return (
		<FocusScope autoFocus restoreFocus>
			<ContextualbarResizable defaultWidth={size}>
				<Contextualbar ref={callbackRef} width='100%' position={position} {...dialogProps} {...props} />
			</ContextualbarResizable>
		</FocusScope>
	);
};

export default ContextualbarDialog;
