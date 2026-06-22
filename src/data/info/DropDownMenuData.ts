import {updateActivePopupType} from '../../store/general/actionCreators';
import {PopupWindowType} from '../enums/PopupWindowType';
import {store} from '../../index';

export type DropDownMenuNode = {
    nameKey: string
    descriptionKey?: string
    imageSrc: string
    imageAlt: string
    disabled: boolean
    onClick?: () => void
    children?: DropDownMenuNode[]
}

export const getDropDownMenuData = (): DropDownMenuNode[] => [
    {
        nameKey: 'editor.actions',
        imageSrc: 'ico/actions.png',
        imageAlt: 'actions',
        disabled: false,
        children: [
            {
                nameKey: 'editor.editLabels',
                descriptionKey: 'editor.editLabelsDescription',
                imageSrc: 'ico/tags.png',
                imageAlt: 'labels',
                disabled: false,
                onClick: () => store.dispatch(updateActivePopupType(PopupWindowType.UPDATE_LABEL))
            },
            {
                nameKey: 'editor.importImages',
                descriptionKey: 'editor.importImagesDescription',
                imageSrc: 'ico/camera.png',
                imageAlt: 'images',
                disabled: false,
                onClick: () => store.dispatch(updateActivePopupType(PopupWindowType.IMPORT_IMAGES))
            },
            {
                nameKey: 'editor.importAnnotations',
                descriptionKey: 'editor.importAnnotationsDescription',
                imageSrc: 'ico/import-labels.png',
                imageAlt: 'import-labels',
                disabled: false,
                onClick: () => store.dispatch(updateActivePopupType(PopupWindowType.IMPORT_ANNOTATIONS))
            },
            {
                nameKey: 'editor.exportAnnotations',
                descriptionKey: 'editor.exportAnnotationsDescription',
                imageSrc: 'ico/export-labels.png',
                imageAlt: 'export-labels',
                disabled: false,
                onClick: () => store.dispatch(updateActivePopupType(PopupWindowType.EXPORT_ANNOTATIONS))
            },
            {
                nameKey: 'editor.runAiLocally',
                descriptionKey: 'editor.runAiLocallyDescription',
                imageSrc: 'ico/ai.png',
                imageAlt: 'load-ai-model-in-browser',
                disabled: false,
                onClick: () => store.dispatch(updateActivePopupType(PopupWindowType.LOAD_AI_MODEL))
            },
            {
                nameKey: 'editor.connectAiServer',
                descriptionKey: 'editor.connectAiServerDescription',
                imageSrc: 'ico/api.png',
                imageAlt: 'connect-ai-server',
                disabled: false,
                onClick: () => store.dispatch(updateActivePopupType(PopupWindowType.CONNECT_AI_MODEL_VIA_API))
            },
        ]
    },
    {
        nameKey: 'editor.community',
        imageSrc: 'ico/plant.png',
        imageAlt: 'community',
        disabled: false,
        children: [
            {
                nameKey: 'editor.documentation',
                descriptionKey: 'editor.documentationDescription',
                imageSrc: 'ico/documentation.png',
                imageAlt: 'documentation',
                disabled: false,
                onClick: () => window.open('https://skalskip.github.io/make-sense', '_blank')
            },
            {
                nameKey: 'editor.bugsAndFeatures',
                descriptionKey: 'editor.bugsAndFeaturesDescription',
                imageSrc: 'ico/bug.png',
                imageAlt: 'bug',
                disabled: false,
                onClick: () => window.open('https://github.com/SkalskiP/make-sense/issues', '_blank')
            }
        ]
    }
]
