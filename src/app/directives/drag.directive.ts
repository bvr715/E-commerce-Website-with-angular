import {
  Directive,
  EventEmitter,
  HostBinding,
  HostListener,
  Output,
} from '@angular/core';
import { FileHandle } from '../_modals/Image';
import { DomSanitizer } from '@angular/platform-browser';

@Directive({
  selector: '[appDrag]',
})
export class DragDirective {
  @Output() files: EventEmitter<FileHandle> = new EventEmitter();

  @HostBinding('style.background')
  private background = '#eee';

  constructor(private sanitizer: DomSanitizer) {}

  @HostListener('dragover', ['$event'])
  public onDragOver(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#999';
  }

  @HostListener('dragleave', ['$event'])
  public onDragLeave(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
  }

  @HostListener('drop', ['$event'])
  public onDrop(evt: DragEvent) {
    evt.preventDefault();
    evt.stopPropagation();
    this.background = '#eee';
    let fileHandle: FileHandle;
    const dataTransfer = evt.dataTransfer;
    if (dataTransfer && dataTransfer.files.length > 0) {
      let file = dataTransfer.files[0];
      let url = this.sanitizer.bypassSecurityTrustUrl(
        window.URL.createObjectURL(file)
      );
      fileHandle = { file, url };
      this.files.emit(fileHandle);
    }
  }
}
