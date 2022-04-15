import { Component, OnInit, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
})
export class ButtonComponent implements OnInit {
  @Input() type!: string;
  @Input() icon!: string;
  @Input() color!: string;
  @Input() style!: string;

  // @ViewChild('buttonNew') buttonNew: any;

  constructor() {}

  ngOnInit(): void {
    // console.log('this.message: ', this.icon, this.color);
  }

  // ngAfterViewInit() {
  //   const a = this.buttonNew.elementRef.nativeElement.innerText;
  //   console.log('a: ', a);
  // }
}
