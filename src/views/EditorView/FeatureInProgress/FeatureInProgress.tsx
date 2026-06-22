import React from 'react';
import './FeatureInProgress.scss';
import { useTranslation } from 'react-i18next';

export const FeatureInProgress: React.FC = () => {
    const { t } = useTranslation();

    return(
        <div
            className="FeatureInProgress"
        >
            <img
                draggable={false}
                alt={"take_off"}
                src={"ico/take-off.png"}
            />
            <p className="extraBold">{t('featureInProgress.messageLine1')} <br/> {t('featureInProgress.messageLine2')}</p>
        </div>
    )
};