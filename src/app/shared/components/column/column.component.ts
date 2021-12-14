import { Component, Input, OnInit } from '@angular/core';
import { IColumn } from 'src/app/models/main.interfaces';

@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  styleUrls: ['./column.component.scss'],
})
export class ColumnComponent implements OnInit {

  @Input() public data: IColumn = null;
  constructor() { }

  ngOnInit() {};

}
