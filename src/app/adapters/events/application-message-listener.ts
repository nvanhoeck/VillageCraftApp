import { ApplicationMessage } from './application-message';

export interface ApplicationMessageListener {
    subscribe(message: ApplicationMessage): void;
}
