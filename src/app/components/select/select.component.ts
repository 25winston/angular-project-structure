import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.scss'],
})
export class SelectComponent implements OnInit {
  // @Input() options: Array<{ label: string; value: string }> = [];
  // @Input() options: Array<any> = [];
  @Input() options: any[] = [];
  @Input() selectedValue: string = '';
  @Input() loading: boolean = false;
  @Input() handleChange: Function;

  constructor() {}

  ngOnInit(): void {}

  onChange(data) {
    if (this.handleChange) {
      const getData =
        this.options &&
        this.options.find((item) => String(item.value) === String(data));
      this.handleChange(getData);
    }
  }
}
