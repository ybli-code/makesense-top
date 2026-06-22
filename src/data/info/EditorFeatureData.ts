export interface IEditorFeature {
    labelKey: string;
    imageSrc:string;
    imageAlt:string;
}

export const EditorFeatureData: IEditorFeature[] = [
    {
        labelKey: 'editorFeatures.openSource',
        imageSrc: 'ico/open-source.png',
        imageAlt: 'open-source',
    },
    {
        labelKey: 'editorFeatures.noInstall',
        imageSrc: 'ico/online.png',
        imageAlt: 'online',
    },
    {
        labelKey: 'editorFeatures.noStorage',
        imageSrc: 'ico/private.png',
        imageAlt: 'private',
    },
    {
        labelKey: 'editorFeatures.multipleLabelTypes',
        imageSrc: 'ico/labels.png',
        imageAlt: 'labels',
    },
    {
        labelKey: 'editorFeatures.multipleFormats',
        imageSrc: 'ico/file.png',
        imageAlt: 'file',
    },
    {
        labelKey: 'editorFeatures.useAI',
        imageSrc: 'ico/robot.png',
        imageAlt: 'robot',
    },
];