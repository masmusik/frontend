import { Component, ViewEncapsulation, ChangeDetectionStrategy, HostBinding, } from '@angular/core';
import { BaseFilePreview } from '../base-file-preview';

@Component({
  selector: 'pdf-preview',
  templateUrl: './pdf-preview.component.html',
  styleUrls: ['./pdf-preview.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PdfPreviewComponent extends BaseFilePreview {
    @HostBinding('class') className = 'preview-object';
}
