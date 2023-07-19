import { Component, EventEmitter, HostListener, Input, OnInit, Output } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { Dimensions, ImageCroppedEvent, ImageTransform } from 'ngx-image-cropper';

@Component({
  selector: 'sr-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() displayEditor!: boolean;
  @Input() profileImg!: string;
  @Output() close = new EventEmitter();
  @Output() croppedImg = new EventEmitter<string>();

  imageChangedEvent: any = '';
  canvasRotation: any = '';
  transform: ImageTransform = {};
  showCropper: boolean = false;
  croppedImage: any = '';
  scale = 1;

  hasProfileImg!: boolean;

  @HostListener('window:keydown.+', ['event'])
  handleAddKey(event: KeyboardEvent) {
    this.zoomIn();
  }

  @HostListener('window:keydown.-', ['event'])
  handleSubKey(event: KeyboardEvent) {
    this.zoomOut();
  }

  constructor(private sanitizer: DomSanitizer) {}

  ngOnInit(): void {
    if (this.profileImg) {
      this.hasProfileImg = true;
    }
  }

  closeEditor() {
    this.close.emit();
  }

  fileSelected(event: any) {
    if (event) {
      this.imageChangedEvent = event;
      this.hasProfileImg = false;
    }
  }

  zoomIn() {
    this.scale += .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    }
  }

  zoomOut() {
    this.scale -= .1;
    this.transform = {
      ...this.transform,
      scale: this.scale
    }
  }

  rotateLeft() {
    this.canvasRotation--;
    this.flipAfterRotate();
  }

  rotateRight() {
    this.canvasRotation++;
    this.flipAfterRotate();
  }

  flipVertical() {
    this.transform = {
      ...this.transform,
      flipV: !this.transform.flipV
    }
  }

  flipHorizontal() {
    this.transform = {
      ...this.transform,
      flipH: !this.transform.flipH
    }
  }

  reset() {
    this.canvasRotation = 0;
    this.transform = {};
    this.scale = 1;
  }

  save() {
    this.croppedImg.emit(this.croppedImage);
    this.closeEditor();
  }

  cancel() {
    const input = document.querySelector('input');
    input!.value = '';
    this.reset();
    this.imageChangedEvent = null;
    this.croppedImage = null;
    this.closeEditor();
  }

  private flipAfterRotate() {
    const flipH = this.transform.flipH;
    const flipV = this.transform.flipV;

    this.transform = {
      ...this.transform,
      flipH,
      flipV
    }
  }

  imageCropped(event: ImageCroppedEvent) {
    const reader = new FileReader();
    reader.readAsDataURL(event.blob);
    reader.onloadend = () => {
      this.croppedImage = reader.result;
    };
  }

  imageLoaded() {
    this.displayEditor = true;
    this.showCropper = true;
  }

  cropperReady(sourceImageDimensions: Dimensions) {}

  loadImageFailed() {
    console.error('System error! Try choosing a different file.');
  }

}
