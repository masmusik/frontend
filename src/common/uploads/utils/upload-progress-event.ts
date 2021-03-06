import { HttpEvent, HttpEventType } from '@angular/common/http';
import { getUploadProgress } from './get-upload-progress';
import { getUploadSpeed } from './get-upload-speed';
import { getUploadETA } from './get-upload-eta';
import { prettyUploadETA } from './pretty-upload-eta';
import { prettyBytes } from '../../core/utils/pretty-bytes';
import { FileEntry } from '../file-entry';
import { BackendResponse } from '../../core/types/backend-response';

export enum UploadEventTypes {
    STARTED = 'uploadStarted',
    PROGRESS = 'uploadProgress',
    COMPLETED = 'uploadCompleted',
    OTHER = 'unrecognizedEvent'
}

export interface UploadCompletedEvent {
    type: HttpEventType.Response;
    name: UploadEventTypes.COMPLETED;
    fileEntry: FileEntry;
}

export interface UploadProgressEvent {
    type: HttpEventType.UploadProgress;
    name: UploadEventTypes.PROGRESS;
    totalBytes: number;
    completedBytes: number;
    progress: number;
    speed: string;
    eta: string;
}

export interface UploadStartedEvent {
    type: HttpEventType.Sent;
    name: UploadEventTypes.STARTED;
    time: number;
}

export type UploadEvent = UploadStartedEvent | UploadCompletedEvent | UploadProgressEvent;

export function transformAngularUploadEvent<T>(e: HttpEvent<{fileEntry: FileEntry}>, uploadStarted: number): UploadEvent {
    switch (e.type) {
        case HttpEventType.Sent:
            return {type: e.type, name: UploadEventTypes.STARTED, time: uploadStarted};
        case HttpEventType.UploadProgress:
            return {
                type: e.type,
                name: UploadEventTypes.PROGRESS,
                totalBytes: e.total,
                completedBytes: e.loaded,
                progress: getUploadProgress(e),
                speed: prettyBytes(getUploadSpeed(e, uploadStarted)),
                eta: prettyUploadETA(getUploadETA(e, uploadStarted)),
            };
        case HttpEventType.Response:
            return {type: e.type, name: UploadEventTypes.COMPLETED, fileEntry: e.body.fileEntry};
        default:
            return null;
    }
}
