import React, {useEffect, useState} from 'react'
import './GenericYesNoPopup.scss'
import {TextButton} from '../../Common/TextButton/TextButton';
import {ContextManager} from '../../../logic/context/ContextManager';
import {ContextType} from '../../../data/enums/ContextType';
import { useTranslation } from 'react-i18next';

interface IProps {
    title: string;
    renderContent: () => any;
    acceptLabel?: string;
    onAccept?: () => any;
    skipAcceptButton?: boolean;
    disableAcceptButton?: boolean;
    rejectLabel?: string;
    onReject?: () => any;
    skipRejectButton?: boolean;
    disableRejectButton?: boolean;
}

export const GenericYesNoPopup: React.FC<IProps> = (
    {
        title,
        renderContent,
        acceptLabel,
        onAccept,
        skipAcceptButton,
        disableAcceptButton,
        rejectLabel,
        onReject,
        skipRejectButton,
        disableRejectButton
    }) => {

    const { t } = useTranslation();

    const [status, setMountStatus] = useState(false);
    useEffect(() => {
        if (!status) {
            ContextManager.switchCtx(ContextType.POPUP);
            setMountStatus(true);
        }
    }, [status]);

    return (
        <div className='GenericYesNoPopup'>
            <div className='Header'>
                {title}
            </div>
            <div className='Content'>
                {renderContent()}
            </div>
            <div className='Footer'>
                {!skipRejectButton && <TextButton
                    label={rejectLabel ? rejectLabel : t('common.no')}
                    onClick={onReject}
                    externalClassName={'reject'}
                    isDisabled={disableRejectButton}
                />}
                {!skipAcceptButton && <TextButton
                    label={acceptLabel ? acceptLabel : t('common.yes')}
                    onClick={onAccept}
                    externalClassName={'accept'}
                    isDisabled={disableAcceptButton}
                />}
            </div>
        </div>
    )
};
