// @ts-expect-error
import VideoLayout from '../../../modules/UI/videolayout/VideoLayout';
import { IStore } from '../app/types';

import { OPEN_CHAT, CLOSE_SIDE_TOOL_BAR, OPEN_SIDE_TOOL_BAR   } from './actionTypes';
import { closeChat } from './actions.any';

export * from './actions.any';

/**
 * Displays the chat panel.
 *
 * @param {Object} participant - The recipient for the private chat.
 * @param {Object} _disablePolls - Used on native.
 * @returns {{
 *     participant: Participant,
 *     type: OPEN_CHAT
 * }}
 */
export function openChat(participant?: Object, _disablePolls?: boolean) {
    return function(dispatch: IStore['dispatch']) {
        dispatch({
            participant,
            type: OPEN_CHAT
        });
    };
}

/**
 * Toggles display of the chat panel.
 *
 * @returns {Function}
 */
export function toggleChat() {
    return (dispatch: IStore['dispatch'], getState: IStore['getState']) => {
        const isOpen = getState()['features/chat'].isOpen;

        if (isOpen) {
            dispatch(closeChat());
        } else {
            dispatch(openChat());
        }

        // Recompute the large video size whenever we toggle the chat, as it takes chat state into account.
        VideoLayout.onResize();
    };
}

export function openSideToolBar() {
    return function(dispatch: (Object: any) => Object) {
        dispatch({
            type: OPEN_SIDE_TOOL_BAR
        });
    };
}

export function closeSideToolBar() {
    return function(dispatch: (Object: any) => Object) {
        dispatch({
            type: CLOSE_SIDE_TOOL_BAR
        });
    };
}

export function toogleSideToolBar() {
    return (dispatch: any, getState: Function) => {
        const sideToolBarIsOpen = getState()['features/chat'].sideToolBarIsOpen;

        if (sideToolBarIsOpen) {
            dispatch(closeSideToolBar());
        } else {
            dispatch(openSideToolBar());
        }

        // Recompute the large video size whenever we toggle the chat, as it takes chat state into account.
        VideoLayout.onResize();
    };
}
