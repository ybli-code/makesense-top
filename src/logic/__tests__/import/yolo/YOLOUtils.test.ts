import { YOLOUtils } from '../../../import/yolo/YOLOUtils';
import { isEqual } from 'lodash';
import { LabelName, LabelRect } from '../../../../store/labels/types';
import { AnnotationsParsingError, LabelNamesNotUniqueError } from '../../../import/yolo/YOLOErrors';
import { v4 as uuidv4 } from 'uuid';
import { ISize } from '../../../../interfaces/ISize';
import { IRect } from '../../../../interfaces/IRect';

describe('YOLOUtils extractMaxLabelIndexFromAnnotations method', () => {
    it('should return the highest label index across all annotation strings', () => {
        const rawAnnotations = [
            '0 0.5 0.5 0.2 0.2\n2 0.3 0.3 0.1 0.1',
            '1 0.4 0.4 0.15 0.15\n5 0.6 0.6 0.2 0.2'
        ];
        expect(YOLOUtils.extractMaxLabelIndexFromAnnotations(rawAnnotations)).toBe(5);
    });

    it('should return -1 when no annotations are provided', () => {
        expect(YOLOUtils.extractMaxLabelIndexFromAnnotations([])).toBe(-1);
    });

    it('should return -1 when all annotation strings are empty', () => {
        expect(YOLOUtils.extractMaxLabelIndexFromAnnotations(['', ''])).toBe(-1);
    });

    it('should ignore malformed lines', () => {
        const rawAnnotations = ['abc 0.5 0.5 0.2 0.2\n3 0.3 0.3 0.1 0.1'];
        expect(YOLOUtils.extractMaxLabelIndexFromAnnotations(rawAnnotations)).toBe(3);
    });
});

describe('YOLOUtils generateNumericLabelNames method', () => {
    it('should generate label names with numeric string names', () => {
        const result = YOLOUtils.generateNumericLabelNames(3);
        expect(result.length).toBe(3);
        expect(result.map((l: LabelName) => l.name)).toEqual(['0', '1', '2']);
    });

    it('should return an empty array when count is 0', () => {
        expect(YOLOUtils.generateNumericLabelNames(0)).toEqual([]);
    });

    it('should assign unique ids to each label', () => {
        const result = YOLOUtils.generateNumericLabelNames(3);
        const ids = result.map((l: LabelName) => l.id);
        expect(new Set(ids).size).toBe(3);
    });
});

describe('YOLOUtils parseLabelsFile method', () => {
    it('should return list of label names', () => {
        // given
        const content = 'orange\napple\nbanana\ncarrot';

        // when
        const result = YOLOUtils.parseLabelsNamesFromString(content);

        // then
        const expectedNames = ['orange', 'apple', 'banana', 'carrot'];
        const resultNames = result.map((item: LabelName) => item.name);
        expect(result.length).toEqual(4);
        expect(isEqual(resultNames, expectedNames)).toBe(true);
    });

    it('should return list of label names without white characters', () => {
        // given
        const content = 'orange \napple \nbanana    \ncarrot';

        // when
        const result = YOLOUtils.parseLabelsNamesFromString(content);

        // then
        const expectedNames = ['orange', 'apple', 'banana', 'carrot'];
        const resultNames = result.map((item: LabelName) => item.name);
        expect(result.length).toEqual(4);
        expect(isEqual(resultNames, expectedNames)).toBe(true);
    });

    it('should return list of label names without empty strings', () => {
        // given
        const content = 'orange\n\napple\nbanana\n\ncarrot';

        // when
        const result = YOLOUtils.parseLabelsNamesFromString(content);

        // then
        const expectedNames = ['orange', 'apple', 'banana', 'carrot'];
        const resultNames = result.map((item: LabelName) => item.name);
        expect(result.length).toEqual(4);
        expect(isEqual(resultNames, expectedNames)).toBe(true);
    });

    it('should throw exception about labels not being unique', () => {
        // given
        const content = 'orange\napple\nbanana\napple';

        // then
        expect(() => { YOLOUtils.parseLabelsNamesFromString(content); }).toThrowError(new LabelNamesNotUniqueError());
    });
});

describe('YOLOUtils validateYOLOAnnotationComponents method', () => {
    it('should return false when incorrect number of components given', () => {
        // given
        const components: string[] = ['2', '0.342238', '0.054099', '0.069556'];

        // when
        const result = YOLOUtils.validateYOLOAnnotationComponents(components, 3);

        // then
        expect(result).toBe(false);
    });

    it('should return false when label name index higher than number of label names', () => {
        // given
        const components: string[] = ['2', '0.342238', '0.054099', '0.069556', '0.108199'];

        // when
        const result = YOLOUtils.validateYOLOAnnotationComponents(components, 1);

        // then
        expect(result).toBe(false);
    });

    it('should return false when one of coordinates values have value higher than one', () => {
        // given
        const components: string[] = ['2', '0.342238', '1.054099', '0.069556', '0.108199'];

        // when
        const result = YOLOUtils.validateYOLOAnnotationComponents(components, 3);

        // then
        expect(result).toBe(false);
    });

    it('should return false when one of coordinates values have value smaller than zero', () => {
        // given
        const components: string[] = ['2', '0.342238', '-0.054099', '0.069556', '0.108199'];

        // when
        const result = YOLOUtils.validateYOLOAnnotationComponents(components, 3);

        // then
        expect(result).toBe(false);
    });

    it('should return true', () => {
        // given
        const components: string[] = ['2', '0.342238', '0.054099', '0.069556', '0.108199'];

        // when
        const result = YOLOUtils.validateYOLOAnnotationComponents(components, 3);

        // then
        expect(result).toBe(true);
    });

    it('should return true', () => {
        // given
        const components: string[] = ['6', '0.557911', '0.924187', '0.000673', '0.000000'];

        // when
        const result = YOLOUtils.validateYOLOAnnotationComponents(components, 10);

        // then
        expect(result).toBe(true);
    });

    it('should return true for valid segmentation format with 3 polygon points', () => {
        // given
        const components: string[] = ['0', '0.1', '0.2', '0.5', '0.8', '0.9', '0.3'];

        // when
        const result = YOLOUtils.validateYOLOAnnotationComponents(components, 1);

        // then
        expect(result).toBe(true);
    });

    it('should return false for segmentation format with odd coordinate count', () => {
        // given
        const components: string[] = ['0', '0.1', '0.2', '0.5', '0.8', '0.9'];

        // when
        const result = YOLOUtils.validateYOLOAnnotationComponents(components, 1);

        // then
        expect(result).toBe(false);
    });

    it('should return false for segmentation format with invalid coordinate value', () => {
        // given
        const components: string[] = ['0', '0.1', '0.2', '1.5', '0.8', '0.9', '0.3'];

        // when
        const result = YOLOUtils.validateYOLOAnnotationComponents(components, 1);

        // then
        expect(result).toBe(false);
    });
});

describe('YOLOUtils parseYOLOAnnotationFromString method', () => {
    it('should return correct LabelRect', () => {
        // given
        const rawAnnotation: string = '1 0.300000 0.200000 0.300000 0.200000';
        const labelId: string = uuidv4();
        const labelNames: LabelName[] = [
            {
                id: uuidv4(),
                name: 'orange',
                color: '#000000'
            },
            {
                id: labelId,
                name: 'apple',
                color: '#000000'
            },
            {
                id: uuidv4(),
                name: 'banana',
                color: '#000000'
            }
        ];
        const imageSize: ISize = { width: 1000, height: 1000 };
        const imageName: string = '0000.png';

        // when
        const result: LabelRect = YOLOUtils.parseYOLOAnnotationFromString(
            rawAnnotation, labelNames, imageSize, imageName
        );

        // then
        const rect: IRect = { x: 150, y: 100, width: 300, height: 200 };
        expect(result.labelId).toBe(labelId);
        expect(JSON.stringify(result.rect)).toBe(JSON.stringify(rect));
    });

    it('should throw AnnotationsParsingError', () => {
        // given
        const rawAnnotation: string = '4 0.340000 0.540000 0.060000 0.100000';
        const labelId: string = uuidv4();
        const labelNames: LabelName[] = [
            {
                id: uuidv4(),
                name: 'orange',
                color: '#000000'
            },
            {
                id: labelId,
                name: 'apple',
                color: '#000000'
            },
            {
                id: uuidv4(),
                name: 'banana',
                color: '#000000'
            }
        ];
        const imageSize: ISize = { width: 1000, height: 1000 };
        const imageName: string = '0000.png';

        // when
        function wrapper() {
            return YOLOUtils.parseYOLOAnnotationFromString(rawAnnotation, labelNames, imageSize, imageName);
        }
        expect(wrapper).toThrowError(new AnnotationsParsingError(imageName));
    });

    it('should convert segmentation polygon to circumscribed bbox', () => {
        // given: triangle with vertices (0.1,0.2), (0.5,0.8), (0.9,0.3)
        const rawAnnotation: string = '0 0.1 0.2 0.5 0.8 0.9 0.3';
        const labelId: string = uuidv4();
        const labelNames: LabelName[] = [
            {
                id: labelId,
                name: 'orange',
                color: '#000000'
            }
        ];
        const imageSize: ISize = { width: 1000, height: 1000 };
        const imageName: string = '0000.png';

        // when
        const result: LabelRect = YOLOUtils.parseYOLOAnnotationFromString(
            rawAnnotation, labelNames, imageSize, imageName
        );

        // then: bbox = minX=0.1, minY=0.2, maxX=0.9, maxY=0.8
        expect(result.labelId).toBe(labelId);
        expect(result.rect.x).toBeCloseTo(100);
        expect(result.rect.y).toBeCloseTo(200);
        expect(result.rect.width).toBeCloseTo(800);
        expect(result.rect.height).toBeCloseTo(600);
    });
});

describe('YOLOUtils parseYOLOAnnotationsFromString method', () => {
    it('should return correct array of LabelRect', () => {
        // given
        const rawAnnotations: string = '1 0.200000 0.200000 0.200000 0.200000\n0 0.300000 0.200000 0.300000 0.200000\n2 0.200000 0.300000 0.200000 0.300000';
        const labelId: string = uuidv4();
        const labelNames: LabelName[] = [
            {
                id: uuidv4(),
                name: 'orange',
                color: '#000000'
            },
            {
                id: uuidv4(),
                name: 'apple',
                color: '#000000'
            },
            {
                id: labelId,
                name: 'banana',
                color: '#000000'
            }
        ];
        const imageSize: ISize = { width: 1000, height: 1000 };
        const imageName: string = '0000.png';

        // when
        const result: LabelRect[] = YOLOUtils.parseYOLOAnnotationsFromString(
            rawAnnotations, labelNames, imageSize, imageName
        );

        // then
        const rect: IRect = { x: 100, y: 150, width: 200, height: 300 };
        expect(result.length).toBe(3);
        expect(result[2].labelId).toBe(labelId);
        expect(JSON.stringify(result[2].rect)).toBe(JSON.stringify(rect));
    });

    it('should throw AnnotationsParsingError', () => {
        // given
        const rawAnnotations: string = '1 0.200000 0.200000 0.200000 0.200000\n0 0.300000 0.200000 0.300000 0.200000\n4 0.200000 0.300000 0.200000 0.300000';
        const labelId: string = uuidv4();
        const labelNames: LabelName[] = [
            {
                id: uuidv4(),
                name: 'orange',
                color: '#000000'
            },
            {
                id: uuidv4(),
                name: 'apple',
                color: '#000000'
            },
            {
                id: labelId,
                name: 'banana',
                color: '#000000'
            }
        ];
        const imageSize: ISize = { width: 1000, height: 1000 };
        const imageName: string = '0000.png';

        // when
        function wrapper() {
            return YOLOUtils.parseYOLOAnnotationsFromString(rawAnnotations, labelNames, imageSize, imageName);
        }
        expect(wrapper).toThrowError(new AnnotationsParsingError(imageName));
    });
});
