import {LabelType} from '../enums/LabelType';
import {ProjectType} from '../enums/ProjectType';

export interface ILabelToolkit {
    labelType: LabelType;
    headerTextKey: string;
    imageSrc: string;
    imageAlt: string;
    projectType: ProjectType;
}

export const LabelToolkitData: ILabelToolkit[] = [
    {
        labelType: LabelType.IMAGE_RECOGNITION,
        headerTextKey: 'toolkit.imageRecognition',
        imageSrc: 'ico/object.png',
        imageAlt: 'object',
        projectType: ProjectType.IMAGE_RECOGNITION,
    },
    {
        labelType: LabelType.RECT,
        headerTextKey: 'toolkit.rect',
        imageSrc: 'ico/rectangle.png',
        imageAlt: 'rectangle',
        projectType: ProjectType.OBJECT_DETECTION,
    },
    {
        labelType: LabelType.POINT,
        headerTextKey: 'toolkit.point',
        imageSrc: 'ico/point.png',
        imageAlt: 'point',
        projectType: ProjectType.OBJECT_DETECTION,
    },
    {
        labelType: LabelType.LINE,
        headerTextKey: 'toolkit.line',
        imageSrc: 'ico/line.png',
        imageAlt: 'line',
        projectType: ProjectType.OBJECT_DETECTION,
    },
    {
        labelType: LabelType.POLYGON,
        headerTextKey: 'toolkit.polygon',
        imageSrc: 'ico/polygon.png',
        imageAlt: 'polygon',
        projectType: ProjectType.OBJECT_DETECTION,
    },
];