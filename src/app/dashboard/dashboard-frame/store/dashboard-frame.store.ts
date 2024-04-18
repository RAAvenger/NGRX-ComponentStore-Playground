import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DashboardFrameParameterState } from './dtos/dashboard-frame-parameter.state';
import { parameterState } from '../../store/dtos/parameter.state';
import { DashboardStore } from '../../store/dashboard.store';
import { Observable, takeUntil, tap } from 'rxjs';

@Injectable()
export class DashboardFrameStore extends ComponentStore<DashboardFrameParameterState> {
  public readonly parameters$ = this.select((x) => x.parameters);
  public readonly setParameterValue = this.effect(
    (newParameter$: Observable<parameterState>) => {
      return newParameter$.pipe(
        tap((parameter) => {
          this.dashboardStore.setParameterValue({
            id: parameter.id,
            value: parameter.value,
          });
        }),
      );
    },
  );
  private readonly internalAddParameter = this.updater(
    (state: DashboardFrameParameterState, parameter: parameterState) => {
      return {
        ...state,
        parameters: [...state.parameters, parameter],
      };
    },
  );
  public readonly addParameter = this.effect(
    (newParameter$: Observable<parameterState>) => {
      return newParameter$.pipe(
        tap((newParameter) => {
          this.internalAddParameter(newParameter);
          this.dashboardStore.addParameter(newParameter);
        }),
      );
    },
  );
  private readonly internalSetParameterValue = this.updater(
    (state: DashboardFrameParameterState, parameter: parameterState) => {
      return {
        ...state,
        parameters: [
          ...state.parameters.filter((x) => x.id !== parameter.id),
          {
            id: parameter.id,
            value: parameter.value,
          },
        ],
      };
    },
  );

  constructor(private readonly dashboardStore: DashboardStore) {
    super({ parameters: [] });
    dashboardStore.parameters$
      .pipe(takeUntil(this.destroy$))
      .subscribe((newParameters) =>
        newParameters
          .filter((x) =>
            this.get().parameters.some(
              (param) => x.id === param.id && x.value !== param.value,
            ),
          )
          .forEach((x) => {
            this.internalSetParameterValue(x);
          }),
      );
  }
}
