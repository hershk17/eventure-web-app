import { Component, OnInit, Input, OnChanges } from '@angular/core';

@Component({
  selector: 'app-img-preview',
  templateUrl: './img-preview.component.html',
  styleUrls: ['./img-preview.component.scss'],
})
export class ImgPreviewComponent implements OnInit, OnChanges  {
  @Input() imgFile: any = null;
  public img: any = null;
  constructor() {}

  ngOnChanges() {
    if(this.imgFile != null) {
        const reader: FileReader = new FileReader();
        reader.readAsDataURL(this.imgFile);
        reader.onload = () => {
          this.img = reader.result;
        };
    }
  }
  ngOnInit() {}

}
