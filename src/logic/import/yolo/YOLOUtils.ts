import {LabelName, LabelRect} from '../../../store/labels/types';
import {LabelUtil} from '../../../utils/LabelUtil';
import {AnnotationsParsingError, LabelNamesNotUniqueError} from './YOLOErrors';
import {ISize} from '../../../interfaces/ISize';
import {uniq} from 'lodash';

export class YOLOUtils {
    public static parseLabelsNamesFromString(content: string): LabelName[] {
        const labelNames: string[] = content
            .split(/[\r\n]/)
            .filter(Boolean)
            .map((name: string) => name.replace(/\s/g, ''))

        if (uniq(labelNames).length !== labelNames.length) {
            throw new LabelNamesNotUniqueError()
        }

        return labelNames
            .map((name: string) => LabelUtil.createLabelName(name))
    }

    public static loadLabelsList(
        fileData: File,
        onSuccess: (labels: LabelName[]) => void,
        onFailure: (error: Error) => void
    ) {
        const reader = new FileReader();
        reader.onloadend = (evt: ProgressEvent<FileReader>) => {
            try {
                const content: string = evt.target.result as string;
                const labelNames = YOLOUtils.parseLabelsNamesFromString(content);
                onSuccess(labelNames);
            } catch (error) {
                onFailure(error as Error)
            }
        };
        reader.readAsText(fileData);
    }

    public static parseYOLOAnnotationsFromString(
        rawAnnotations: string,
        labelNames: LabelName[],
        imageSize: ISize,
        imageName: string
    ): LabelRect[] {
        return rawAnnotations
            .split(/[\r\n]/)
            .filter(Boolean)
            .map((rawAnnotation: string) => YOLOUtils.parseYOLOAnnotationFromString(
                rawAnnotation, labelNames, imageSize, imageName
            ));
    }

    public static parseYOLOAnnotationFromString(
        rawAnnotation: string,
        labelNames: LabelName[],
        imageSize: ISize,
        imageName: string
    ): LabelRect {
        const components = rawAnnotation.split(' ');
        if (!YOLOUtils.validateYOLOAnnotationComponents(components, labelNames.length)) {
            throw new AnnotationsParsingError(imageName);
        }
        const labelIndex: number = parseInt(components[0]);
        const labelId: string = labelNames[labelIndex].id;
        let rect;
        if (components.length === 5) {
            // Standard detection format: class cx cy w h
            const rectX: number = parseFloat(components[1]);
            const rectY: number = parseFloat(components[2]);
            const rectWidth: number = parseFloat(components[3]);
            const rectHeight: number = parseFloat(components[4]);
            rect = {
                x: (rectX - rectWidth / 2) * imageSize.width,
                y: (rectY - rectHeight / 2) * imageSize.height,
                width: rectWidth * imageSize.width,
                height: rectHeight * imageSize.height
            };
        } else {
            // Segmentation format: class x1 y1 x2 y2 ... xn yn — convert to circumscribed bbox
            const coords = components.slice(1).map(parseFloat);
            const xs = coords.filter((_, i) => i % 2 === 0);
            const ys = coords.filter((_, i) => i % 2 === 1);
            const minX = Math.min(...xs);
            const maxX = Math.max(...xs);
            const minY = Math.min(...ys);
            const maxY = Math.max(...ys);
            rect = {
                x: minX * imageSize.width,
                y: minY * imageSize.height,
                width: (maxX - minX) * imageSize.width,
                height: (maxY - minY) * imageSize.height
            };
        }
        return LabelUtil.createLabelRect(labelId, rect);
    }

    public static extractMaxLabelIndexFromAnnotations(rawAnnotations: string[]): number {
        let maxIndex = -1;
        for (const rawAnnotation of rawAnnotations) {
            rawAnnotation.split(/[\r\n]/).filter(Boolean).forEach((line: string) => {
                const parts = line.split(' ');
                if (parts.length >= 1) {
                    const idx = parseInt(parts[0]);
                    if (!isNaN(idx) && idx >= 0 && idx > maxIndex) {
                        maxIndex = idx;
                    }
                }
            });
        }
        return maxIndex;
    }

    public static generateNumericLabelNames(count: number): LabelName[] {
        return Array.from({length: count}, (_, i) => LabelUtil.createLabelName(String(i)));
    }

    public static validateYOLOAnnotationComponents(components: string[], labelNamesCount: number): boolean {
        const validateCoordinateValue = (rawValue: string): boolean => {
            const floatValue: number = Number(rawValue);
            return !isNaN(floatValue) && 0.0 <= floatValue && floatValue <= 1.0;
        }
        const validateLabelIdx = (rawValue: string): boolean => {
            const intValue: number = parseInt(rawValue);
            return !isNaN(intValue) && 0 <= intValue && intValue < labelNamesCount;
        }

        if (!validateLabelIdx(components[0])) {
            return false;
        }

        if (components.length === 5) {
            // Standard detection format: class cx cy w h
            return [
                validateCoordinateValue(components[1]),
                validateCoordinateValue(components[2]),
                validateCoordinateValue(components[3]),
                validateCoordinateValue(components[4])
            ].every(Boolean);
        }

        // Segmentation format: class x1 y1 x2 y2 ... xn yn
        // Must have at least 3 polygon points (7 components total), and an even number of coordinates
        const coordCount = components.length - 1;
        if (coordCount < 6 || coordCount % 2 !== 0) {
            return false;
        }
        return components.slice(1).every(validateCoordinateValue);
    }
}
