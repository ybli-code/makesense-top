import {INotification} from '../store/notifications/types';
import {v4 as uuidv4} from 'uuid';
import {NotificationType} from '../data/enums/NotificationType';
import {NotificationContent} from "../data/info/NotificationsData";
import i18n from '../i18n/config';

export class NotificationUtil {
    public static createErrorNotification(content: NotificationContent): INotification {
        return {
            id: uuidv4(),
            type: NotificationType.ERROR,
            header: i18n.t(content.headerKey),
            description: i18n.t(content.descriptionKey)
        }
    }

    public static createMessageNotification(content: NotificationContent): INotification {
        return {
            id: uuidv4(),
            type: NotificationType.MESSAGE,
            header: i18n.t(content.headerKey),
            description: i18n.t(content.descriptionKey)
        }
    }

    public static createWarningNotification(content: NotificationContent): INotification {
        return {
            id: uuidv4(),
            type: NotificationType.WARNING,
            header: i18n.t(content.headerKey),
            description: i18n.t(content.descriptionKey)
        }
    }
}
