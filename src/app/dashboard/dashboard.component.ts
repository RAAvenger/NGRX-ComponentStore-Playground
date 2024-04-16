import { Component } from '@angular/core';
import {
  DisplayGrid,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType,
} from 'angular-gridster2';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [GridsterComponent, GridsterItemComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  options: GridsterConfig = {
    gridType: GridType.Fixed,
    fixedColWidth: 105,
    fixedRowHeight: 105,

    displayGrid: DisplayGrid.Always,
  };
  dashboard: Array<GridsterItem> = [
    { cols: 2, rows: 2, y: 0, x: 0, lable: 'some label' },
  ];
}
