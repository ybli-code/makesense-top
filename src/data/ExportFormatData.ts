import {ILabelFormatData} from '../interfaces/ILabelFormatData';
import {LabelType} from './enums/LabelType';
import {AnnotationFormatType} from './enums/AnnotationFormatType';

export type ExportFormatDataMap = Record<LabelType, ILabelFormatData[]>;

export const ExportFormatData: ExportFormatDataMap = {
    [LabelType.RECT]: [
        {
            type: AnnotationFormatType.YOLO,
            label: 'A .zip package containing files in YOLO format.',
            labelKey: 'exportFormats.yoloZip'
        },
        {
            type: AnnotationFormatType.VOC,
            label: 'A .zip package containing files in VOC XML format.',
            labelKey: 'exportFormats.vocZip'
        },
        {
            type: AnnotationFormatType.CSV,
            label: 'Single CSV file.',
            labelKey: 'exportFormats.csvSingle'
        }
    ],
    [LabelType.POINT]: [
        {
            type: AnnotationFormatType.CSV,
            label: 'Single CSV file.',
            labelKey: 'exportFormats.csvSingle'
        }
    ],
    [LabelType.LINE]: [
        {
            type: AnnotationFormatType.CSV,
            label: 'Single CSV file.',
            labelKey: 'exportFormats.csvSingle'
        }
    ],
    [LabelType.POLYGON]: [
        {
            type: AnnotationFormatType.VGG,
            label: 'Single file in VGG JSON format.',
            labelKey: 'exportFormats.vggJson'
        },
        {
            type: AnnotationFormatType.COCO,
            label: 'Single file in COCO JSON format.',
            labelKey: 'exportFormats.cocoJson'
        }
    ],
    [LabelType.IMAGE_RECOGNITION]: [
        {
            type: AnnotationFormatType.CSV,
            label: 'Single CSV file.',
            labelKey: 'exportFormats.csvSingle'
        },
        {
            type: AnnotationFormatType.JSON,
            label: 'Single JSON file.',
            labelKey: 'exportFormats.jsonSingle'
        }
    ]
}
