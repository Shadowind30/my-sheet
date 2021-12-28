import { Component, Input, OnInit } from '@angular/core';
import { IRow } from 'src/app/models/main.interfaces';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {

  @Input() public data: IRow = null;
  constructor() { }

  ngOnInit() {};

}
