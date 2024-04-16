import { Component, Input } from '@angular/core';
import { FrameData } from './dtos/frame-data';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard-frame',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard-frame.component.html',
  styleUrl: './dashboard-frame.component.scss',
})
export class DashboardFrameComponent {
  @Input({ required: true })
  public frameData!: FrameData;
  protected parameterLabel: string = '';

  protected changeParameterLabel(newLabel: string) {
    this.parameterLabel = newLabel;
  }
}
