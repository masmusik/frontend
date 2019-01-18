import {Component, Inject, Optional, ViewEncapsulation} from '@angular/core';
import {Artist} from "../../../models/Artist";
import {Album} from "../../../models/Album";
import {Track} from "../../../models/Track";
import {WebPlayerUrls} from "../../web-player-urls.service";
import {Toast} from "common/core/ui/toast.service";
import {Settings} from "common/core/config/settings.service";
import {Playlist} from "../../../models/Playlist";
import {AppHttpClient} from "common/core/http/app-http-client.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

type mediaItemModel = Track|Album|Artist|Playlist;
type mediaItemType = 'artist'|'album'|'track'|'playist-track'|'playlist';

export interface ReportMediaItemModalData {
    mediaItem: mediaItemModel,
    type: mediaItemType
}

@Component({
    selector: 'report-media-item-modal',
    templateUrl: './report-media-item-modal.component.html',
    styleUrls: ['./report-media-item-modal.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class ReportMediaItemModalComponent {

    /**
     * Media item model.
     */
    public mediaItem: mediaItemModel;

    /**
     * Type of media item.
     */
    public type: mediaItemType;

    /**
     * Absolute media item url.
     */
    public link: string;

    public loading: boolean = false;

    /**
     * Data for sharing media item via email.
     */
    public email = {
        subject: '',
        message: ''
    };

    /**
     * ShareMediaItemModal Component.
     */
    constructor(
        private urls: WebPlayerUrls,
        private toast: Toast,
        private settings: Settings,
        private http: AppHttpClient,
        private dialogRef: MatDialogRef<ReportMediaItemModalComponent>,
        @Optional() @Inject(MAT_DIALOG_DATA) public data: ReportMediaItemModalData,
    ) {
        this.mediaItem = data.mediaItem;
        this.type = this.setType(data.type);
        this.link = this.getLink();
    }

    /**
     * Close the modal and share media item via email.
     */
    public confirm() {
        this.loading = true;
        this.http.post('media-items/reports/send', {
            name: this.mediaItem.name,
            subject: this.email.subject,
            message: this.email.message,
            link: this.getLink(),
        }).subscribe(() => {
            this.toast.open('Reported ' + this.mediaItem.name);
            this.close();
        }, () => {
            this.toast.open('There was an issue reporting ' + this.mediaItem.name);
            this.loading = false;
        });
    }

    public close() {
        this.loading = false;
        this.dialogRef.close();
    }

    /**
     * Get absolute url to media item.
     */
    private getLink(encode = false): string {
        if ( ! this.type) return;
        let url = this.urls.routerLinkToUrl(this.urls[this.type as any](this.mediaItem));
        url = url.replace(/ /g, '+');
        return encode ? encodeURIComponent(url): url;
    }

    /**
     * Set type for current media item.
     */
    private setType(name: string): mediaItemType {
        let type = name;

        if (name === 'playlist-track') {
            type = 'track';
        }

        return type as mediaItemType;
    }
}
