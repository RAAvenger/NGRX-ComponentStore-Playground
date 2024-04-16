import { Component } from '@angular/core';
import {
  DisplayGrid,
  GridsterComponent,
  GridsterConfig,
  GridsterItem,
  GridsterItemComponent,
  GridType,
} from 'angular-gridster2';
import { NgForOf } from '@angular/common';
import { DashboardFrameComponent } from './dashboard-frame/dashboard-frame.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    GridsterComponent,
    GridsterItemComponent,
    NgForOf,
    DashboardFrameComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  options: GridsterConfig = {
    gridType: GridType.Fixed,
    fixedColWidth: 200,
    fixedRowHeight: 200,

    displayGrid: DisplayGrid.Always,
  };
  dashboard: Array<GridsterItem> = [
    { cols: 2, rows: 2, y: 0, x: 0, frameData: { id: 'frame 1' } },
    { cols: 2, rows: 2, y: 0, x: 2, frameData: { id: 'frame 2' } },
  ];
}
