import {LabelType} from './enums/LabelType';
import {ILabelFormatData} from '../interfaces/ILabelFormatData';
import {AnnotationFormatType} from './enums/AnnotationFormatType';

export type ImportFormatDataMap = Record<LabelType, ILabelFormatData[]>

export const ImportFormatData: ImportFormatDataMap = {
    [LabelType.RECT]: [
        {
            type: AnnotationFormatType.COCO,
            label: 'Single file in COCO JSON format.',
            labelKey: 'importFormats.cocoJson'
        },
        {
            type: AnnotationFormatType.YOLO,
            label: 'Multiple files in YOLO format along with labels names definition - labels.txt file.',
            labelKey: 'importFormats.yoloFormat'
        },
        {
            type: AnnotationFormatType.VOC,
            label: 'Multiple files in VOC XML format.',
            labelKey: 'importFormats.vocXml'
        }
    ],
    [LabelType.POINT]: [],
    [LabelType.LINE]: [],
    [LabelType.POLYGON]: [
        {
            type: AnnotationFormatType.COCO,
            label: 'Single file in COCO JSON format.',
            labelKey: 'importFormats.polygonCocoJson'
        }
    ],
    [LabelType.IMAGE_RECOGNITION]: []
}
