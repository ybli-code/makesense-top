import React from 'react';
import './SizeItUpView.scss';
import {Settings} from "../../settings/Settings";
import { useTranslation } from 'react-i18next';

export const SizeItUpView: React.FC = () => {
    const { t } = useTranslation();

    return(<div className="SizeItUpView">
        <p className="extraBold">{t('sizeItUp.windowTooSmall')}</p>
        <img
            draggable={false}
            alt={"small_window"}
            src={"ico/small_window.png"}
        />
        <p className="extraBold">{t('sizeItUp.minSizeRequirement', {
            width: Settings.EDITOR_MIN_WIDTH,
            height: Settings.EDITOR_MIN_HEIGHT
        })}</p>
    </div>)
};