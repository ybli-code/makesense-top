import React from 'react';
import { useTranslation } from 'react-i18next';
import './LanguageSelector.scss';

const LanguageSelector: React.FC = () => {
    const { i18n, t } = useTranslation();

    const currentLanguage = i18n.language.startsWith('zh') ? 'zh' : 'en';

    const handleLanguageChange = () => {
        const newLang = currentLanguage === 'zh' ? 'en' : 'zh';
        i18n.changeLanguage(newLang);
    };

    return (
        <div className='LanguageSelector' onClick={handleLanguageChange} title={t('language.switchLanguage')}>
            <span className='language-text'>
                {currentLanguage === 'zh' ? 'EN' : '中文'}
            </span>
        </div>
    );
};

export default LanguageSelector;
