import {Settings} from '../../settings/Settings';

export interface ISocialMedia {
    displayName:string;
    imageSrc:string;
    imageAlt:string;
    href:string;
    tooltipMessage:string;
}

export const SocialMediaData: ISocialMedia[] = [
    {
        displayName: 'Github',
        imageSrc: '/ico/github-logo.png',
        imageAlt: 'GitHub',
        href: Settings.GITHUB_URL,
        tooltipMessage: 'GitHub 仓库',
    },
    {
        displayName: 'Dataset',
        imageSrc: '/ico/online.png',
        imageAlt: 'Dataset Market',
        href: Settings.DATASET_URL,
        tooltipMessage: '成品数据集市场',
    },
    {
        displayName: 'Bilibili',
        imageSrc: '/ico/bilibili.svg',
        imageAlt: 'Bilibili',
        href: Settings.BILIBILI_URL,
        tooltipMessage: '哔哩哔哩视频教程',
    },
    {
        displayName: 'Xiaohongshu',
        imageSrc: '/ico/xiaohongshu.svg',
        imageAlt: 'Xiaohongshu',
        href: Settings.XIAOHONGSHU_URL,
        tooltipMessage: '小红书',
    },
];
