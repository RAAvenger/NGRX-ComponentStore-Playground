import { Component, OnInit } from '@angular/core';
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
import { DashboardStore } from './store/dashboard.store';

const parameterId1 = '1';

const parameterId2 = '2';
const parameterId3 = '3';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    GridsterComponent,
    GridsterItemComponent,
    NgForOf,
    DashboardFrameComponent,
  ],
  providers: [DashboardStore],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  options: GridsterConfig = {
    gridType: GridType.Fixed,
    fixedColWidth: 200,
    fixedRowHeight: 200,

    displayGrid: DisplayGrid.Always,
  };
  dashboard: Array<GridsterItem> = [
    {
      cols: 2,
      rows: 2,
      y: 0,
      x: 0,
      frameData: { id: 'frame 1', parameterId: parameterId1 },
    },
    {
      cols: 2,
      rows: 2,
      y: 0,
      x: 2,
      frameData: { id: 'frame 2', parameterId: parameterId2 },
    },
    {
      cols: 2,
      rows: 2,
      y: 0,
      x: 2,
      frameData: { id: 'frame 3', parameterId: parameterId3 },
    },
  ];

  constructor(private readonly dashboardStore: DashboardStore) {}

  ngOnInit(): void {
    this.dashboardStore.addParameterRelation({
      firstId: parameterId1,
      secondId: parameterId2,
    });
    this.dashboardStore.addParameterRelation({
      firstId: parameterId2,
      secondId: parameterId3,
    });
  }
}
