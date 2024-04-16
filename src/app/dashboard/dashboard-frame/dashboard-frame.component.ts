import { Component, Input } from '@angular/core';
import { FrameData } from './dtos/frame-data';

@Component({
  selector: 'app-dashboard-frame',
  standalone: true,
  imports: [],
  templateUrl: './dashboard-frame.component.html',
  styleUrl: './dashboard-frame.component.scss',
})
export class DashboardFrameComponent {
  @Input({ required: true })
  public frameData!: FrameData;
}
