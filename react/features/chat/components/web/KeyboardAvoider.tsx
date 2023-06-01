import React, { useEffect, useState } from 'react';

import { isIosMobileBrowser } from '../../../base/environment/utils';

/**
 * Component that renders an element to lift the chat input above the Safari keyboard,
 * computing the appropriate height comparisons based on the {@code visualViewport}.
 *
 * @returns {ReactElement}
 */
function KeyboardAvoider() {
    if (!isIosMobileBrowser()) {
        return null;
    }

    const [ elementHeight, setElementHeight ] = useState(0);
    const [ storedHeight, setStoredHeight ] = useState(window.innerHeight);

    /**
     * Handles the resizing of the visual viewport in order to compute
     * the {@code KeyboardAvoider}'s height.
     *
     * @returns {void}
     */
    function handleViewportResize() {
        // @ts-ignore
        const { innerWidth, visualViewport: { width, height } } = window;

        // Compare the widths to make sure the {@code visualViewport} didn't resize due to zooming.
        if (width === innerWidth) {
            if (height < storedHeight) {
                setElementHeight(storedHeight - height);
            } else {
                setElementHeight(0);
            }
            setStoredHeight(height);
        }
    }

    useEffect(() => {
        // Call the handler in case the keyboard is open when the {@code KeyboardAvoider} is mounted.
        handleViewportResize();
                // @ts-ignore

        window.visualViewport.addEventListener('resize', handleViewportResize);

        return () => {
                // @ts-ignore
            window.visualViewport.removeEventListener('resize', handleViewportResize);
        };
    }, []);

    return <div style = {{ height: `${elementHeight}px` }} />;
}

export default KeyboardAvoider;
