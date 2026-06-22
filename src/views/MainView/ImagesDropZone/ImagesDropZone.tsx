import React, {PropsWithChildren} from 'react';
import './ImagesDropZone.scss';
import {useDropzone,DropzoneOptions} from 'react-dropzone';
import {TextButton} from '../../Common/TextButton/TextButton';
import {ImageData} from '../../../store/labels/types';
import {connect} from 'react-redux';
import {addImageData, updateActiveImageIndex} from '../../../store/labels/actionCreators';
import {AppState} from '../../../store';
import {ProjectType} from '../../../data/enums/ProjectType';
import {PopupWindowType} from '../../../data/enums/PopupWindowType';
import {updateActivePopupType, updateProjectData} from '../../../store/general/actionCreators';
import {ProjectData} from '../../../store/general/types';
import {ImageDataUtil} from '../../../utils/ImageDataUtil';
import { sortBy } from 'lodash';
import { useTranslation } from 'react-i18next';

interface IProps {
    updateActiveImageIndexAction: (activeImageIndex: number) => any;
    addImageDataAction: (imageData: ImageData[]) => any;
    updateProjectDataAction: (projectData: ProjectData) => any;
    updateActivePopupTypeAction: (activePopupType: PopupWindowType) => any;
    projectData: ProjectData;
}

const ImagesDropZone: React.FC<IProps> = (props: PropsWithChildren<IProps>) => {
    const { t } = useTranslation();
    const {acceptedFiles, getRootProps, getInputProps} = useDropzone({
        accept: {
            'image/*': ['.jpeg', '.png']
        }
    } as DropzoneOptions);

    const startEditor = (projectType: ProjectType) => {
        if (acceptedFiles.length > 0) {
            const files = sortBy(acceptedFiles, (item: File) => item.name)
            props.updateProjectDataAction({
                ...props.projectData,
                type: projectType
            });
            props.updateActiveImageIndexAction(0);
            props.addImageDataAction(files.map((file:File) => ImageDataUtil
                .createImageDataFromFileData(file)));
            props.updateActivePopupTypeAction(PopupWindowType.INSERT_LABEL_NAMES);
        }
    };

    const getDropZoneContent = () => {
        if (acceptedFiles.length === 0)
            return <>
                <input {...getInputProps()} />
                <img
                    draggable={false}
                    alt={'upload'}
                    src={'ico/box-opened.png'}
                />
                <p className='extraBold'>{t('dropzone.dropImages')}</p>
                <p>{t('dropzone.or')}</p>
                <p className='extraBold'>{t('dropzone.clickToSelect')}</p>
            </>;
        else if (acceptedFiles.length === 1)
            return <>
                <img
                    draggable={false}
                    alt={'uploaded'}
                    src={'ico/box-closed.png'}
                />
                <p className='extraBold'>{t('images.oneImageLoaded')}</p>
            </>;
        else
            return <>
                <input {...getInputProps()} />
                <img
                    draggable={false}
                    key={1}
                    alt={'uploaded'}
                    src={'ico/box-closed.png'}
                />
                <p key={2} className='extraBold'>{t('images.multipleImagesLoaded', { count: acceptedFiles.length })}</p>
            </>;
    };

    const startEditorWithObjectDetection = () => startEditor(ProjectType.OBJECT_DETECTION)
    const startEditorWithImageRecognition = () => startEditor(ProjectType.IMAGE_RECOGNITION)

    return(
        <div className='ImagesDropZone'>
            <div {...getRootProps({className: 'DropZone'})}>
                {getDropZoneContent()}
            </div>
            <div className='DropZoneButtons'>
                <TextButton
                    label={t('projectType.objectDetection')}
                    isDisabled={!acceptedFiles.length}
                    onClick={startEditorWithObjectDetection}
                />
                <TextButton
                    label={t('projectType.imageRecognition')}
                    isDisabled={!acceptedFiles.length}
                    onClick={startEditorWithImageRecognition}
                />
            </div>
        </div>
    )
};

const mapDispatchToProps = {
    updateActiveImageIndexAction: updateActiveImageIndex,
    addImageDataAction: addImageData,
    updateProjectDataAction: updateProjectData,
    updateActivePopupTypeAction: updateActivePopupType
};

const mapStateToProps = (state: AppState) => ({
    projectData: state.general.projectData
});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ImagesDropZone);
