import {Notification} from '../enums/Notification';

export type NotificationContent = {
    headerKey: string;
    descriptionKey: string;
}

export type ExportFormatDataMap = Record<Notification, NotificationContent>;

export const NotificationsDataMap: ExportFormatDataMap = {
    [Notification.EMPTY_LABEL_NAME_ERROR]: {
        headerKey: 'notifications.emptyLabelNameHeader',
        descriptionKey: 'notifications.emptyLabelNameDesc'
    },
    [Notification.NON_UNIQUE_LABEL_NAMES_ERROR]: {
        headerKey: 'notifications.nonUniqueLabelNamesHeader',
        descriptionKey: 'notifications.nonUniqueLabelNamesDesc'
    },
    [Notification.MODEL_DOWNLOAD_ERROR]: {
        headerKey: 'notifications.modelDownloadErrorHeader',
        descriptionKey: 'notifications.modelDownloadErrorDesc'
    },
    [Notification.MODEL_INFERENCE_ERROR]: {
        headerKey: 'notifications.modelInferenceErrorHeader',
        descriptionKey: 'notifications.modelInferenceErrorDesc'
    },
    [Notification.MODEL_LOAD_ERROR]: {
        headerKey: 'notifications.modelLoadErrorHeader',
        descriptionKey: 'notifications.modelLoadErrorDesc'
    },
    [Notification.LABELS_FILE_UPLOAD_ERROR]: {
        headerKey: 'notifications.labelsFileUploadErrorHeader',
        descriptionKey: 'notifications.labelsFileUploadErrorDesc'
    },
    [Notification.ANNOTATION_FILE_PARSE_ERROR]: {
        headerKey: 'notifications.annotationFileParseErrorHeader',
        descriptionKey: 'notifications.annotationFileParseErrorDesc'
    },
    [Notification.ANNOTATION_IMPORT_ASSERTION_ERROR]: {
        headerKey: 'notifications.annotationImportAssertionErrorHeader',
        descriptionKey: 'notifications.annotationImportAssertionErrorDesc'
    },
    [Notification.UNSUPPORTED_INFERENCE_SERVER_MESSAGE]: {
        headerKey: 'notifications.unsupportedInferenceServerHeader',
        descriptionKey: 'notifications.unsupportedInferenceServerDesc'
    },
    [Notification.ROBOFLOW_INFERENCE_SERVER_ERROR]: {
        headerKey: 'notifications.roboflowConnectionFailedHeader',
        descriptionKey: 'notifications.roboflowConnectionFailedDesc'
    }
}
