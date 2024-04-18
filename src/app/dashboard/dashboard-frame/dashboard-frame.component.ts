import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FrameData } from './dtos/frame-data';
import { FormsModule } from '@angular/forms';
import { parameterState } from '../store/dtos/parameter.state';
import { Subject, takeUntil } from 'rxjs';
import { DashboardFrameStore } from './store/dashboard-frame.store';

@Component({
  selector: 'app-dashboard-frame',
  standalone: true,
  imports: [FormsModule],
  providers: [DashboardFrameStore],
  templateUrl: './dashboard-frame.component.html',
  styleUrl: './dashboard-frame.component.scss',
})
export class DashboardFrameComponent implements OnDestroy, OnInit {
  @Input({ required: true })
  public frameData!: FrameData;
  protected parameterLabel: string | undefined;
  private readonly $destroy = new Subject<void>();

  constructor(private readonly dashboardFrameStore: DashboardFrameStore) {}

  ngOnInit(): void {
    if (this.hasParameter()) {
      this.dashboardFrameStore.addParameter({
        id: this.frameData.parameterId,
        value: '',
      });
      this.dashboardFrameStore.parameters$
        .pipe(takeUntil(this.$destroy))
        .subscribe((changedParameters) => {
          this.parameterLabel = this.getParameterLabel(changedParameters);
          console.log({
            parameters: changedParameters,
            frameId: this.frameData.id,
          });
        });
    }
  }

  ngOnDestroy(): void {
    this.$destroy.next();
    this.$destroy.complete();
  }

  protected changeParameterLabel(newLabel: string) {
    if (this.hasParameter()) {
      this.dashboardFrameStore.setParameterValue({
        id: this.frameData.parameterId,
        value: newLabel,
      });
    }
  }

  private hasParameter() {
    return (
      this.frameData.parameterId != '' && this.frameData.parameterId != null
    );
  }

  private getParameterLabel(parameters: parameterState[]) {
    return parameters.find(
      (parameter) => parameter.id === this.frameData.parameterId,
    )?.value;
  }
}
