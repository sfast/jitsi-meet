import React from 'react';
import { connect } from 'react-redux';

import { IReduxState } from '../../../app/types';
import { translate, translateToHTML } from '../../../base/i18n/functions';

import AbstractUserMediaPermissionsOverlay, { abstractMapStateToProps }
    from './AbstractUserMediaPermissionsOverlay';
import OverlayFrame from './OverlayFrame';

const dooqodWorkspaceLogo = 'https://dooqod-assets.s3.eu-central-1.amazonaws.com/workspace_logo.png';

/**
 * Implements a React Component for overlay with guidance how to proceed with
 * gUM prompt.
 */
class UserMediaPermissionsOverlay extends AbstractUserMediaPermissionsOverlay {
    /**
     * Implements React's {@link Component#render()}.
     *
     * @inheritdoc
     * @returns {ReactElement}
     */
    render() {
        const { _premeetingBackground, browser, t } = this.props;
        const style = _premeetingBackground ? {
            background: _premeetingBackground,
            backgroundPosition: 'center',
            backgroundSize: 'cover'
        } : {
            backgroundColor: 'white'
        };

        return (
            <OverlayFrame style = { style }>
                <div className="inlay__content" style={{ textAlign: 'center', marginTop: '14%', display: 'flex', alignItems: 'center', flexDirection: 'column' }}>
                    <img src = {dooqodWorkspaceLogo} width="120" style={{ marginBottom: 10 }} />
                    <span className = 'inlay__icon icon-microphone' />
                    <span className = 'inlay__icon icon-camera' />
                    <img src = './images/dooqodAllowPermission.png' width ="300"/>
                    <h3
                        aria-label = { t('startupoverlay.genericTitle') }
                        className = 'inlay__title'
                        role = 'alert' >
                        {
                            t('startupoverlay.genericTitle')
                        }
                    </h3>
                    <span
                        className = 'inlay__text'
                        role = 'alert' >
                        {
                            translateToHTML(t,
                                `userMedia.${browser}GrantPermissions`)
                        }
                    </span>
                </div>
                <div className = 'policy overlay__policy'>
                    <p
                        className = 'policy__text'
                        role = 'alert'>
                        { translateToHTML(t, 'startupoverlay.policyText') }
                    </p>
                    {
                        this._renderPolicyLogo()
                    }
                </div>
            </OverlayFrame>
        );
    }

    /**
     * Renders the policy logo.
     *
     * @private
     * @returns {ReactElement|null}
     */
    _renderPolicyLogo() {
        const policyLogoSrc = interfaceConfig.POLICY_LOGO;

        if (policyLogoSrc) {
            return (
                <div className = 'policy__logo'>
                    <img
                        alt = { this.props.t('welcomepage.logo.policyLogo') }
                        src = { policyLogoSrc } />
                </div>
            );
        }

        return null;
    }
}

/**
 * Maps (parts of) the redux state to the React {@code Component} props.
 *
 * @param {Object} state - The redux state.
 * @param {Object} ownProps - The props passed to the component.
 * @returns {Object}
 */
function mapStateToProps(state: IReduxState) {
    const { premeetingBackground } = state['features/dynamic-branding'];

    return {
        ...abstractMapStateToProps(state),
        _premeetingBackground: premeetingBackground
    };
}

export default translate(connect(mapStateToProps)(UserMediaPermissionsOverlay));
