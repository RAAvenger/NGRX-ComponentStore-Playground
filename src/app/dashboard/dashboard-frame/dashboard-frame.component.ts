import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FrameData } from './dtos/frame-data';
import { FormsModule } from '@angular/forms';
import { DashboardStore } from '../store/dashboard.store';
import { parameterState } from '../store/dtos/parameter.state';
import { Subject, Subscription, takeUntil } from 'rxjs';

@Component({
  selector: 'app-dashboard-frame',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './dashboard-frame.component.html',
  styleUrl: './dashboard-frame.component.scss',
})
export class DashboardFrameComponent implements OnDestroy, OnInit {
  @Input({ required: true })
  public frameData!: FrameData;
  protected parameterLabel: string | undefined;
  private readonly parameterSubscription: Subscription;
  private readonly $destroy = new Subject();

  constructor(private readonly dashboardStore: DashboardStore) {
    this.parameterSubscription = this.dashboardStore.parameters$
      .pipe(takeUntil(this.$destroy))
      .subscribe(
        (changedParameters) =>
          (this.parameterLabel = this.getParameterLabel(changedParameters)),
      );
  }

  ngOnInit(): void {
    if (this.hasParameter())
      this.dashboardStore.addParameter({
        id: this.frameData.parameterId,
        value: '',
      });
  }

  ngOnDestroy(): void {
    this.$destroy.complete();
  }

  protected changeParameterLabel(newLabel: string) {
    if (this.hasParameter()) {
      this.dashboardStore.setParameterValue({
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
