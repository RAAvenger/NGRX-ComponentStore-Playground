import { Injectable } from '@angular/core';
import { ComponentStore } from '@ngrx/component-store';
import { DashboardState } from './dtos/dashboard.state';
import { Observable, tap } from 'rxjs';
import { parameterState } from './dtos/parameter.state';
import { ParameterRelationState } from './dtos/parameter-relation.state';
import { SetParameterValueRequest } from './dtos/set-parameter-value-request';

@Injectable()
export class DashboardStore extends ComponentStore<DashboardState> {
  constructor() {
    super({ parameters: [], parameterRelations: [] });
  }

  private readonly parametersObserver$: Observable<parameterState[]> =
    this.select((x) => x.parameters);
  private readonly relationsObserver$: Observable<ParameterRelationState[]> =
    this.select((x) => x.parameterRelations);

  public readonly parameters$: Observable<parameterState[]> = this.select(
    this.parametersObserver$,
    this.relationsObserver$,
    (parameters: parameterState[]) => parameters,
  );

  public readonly addParameter = this.updater(
    (state: DashboardState, parameter: parameterState) => {
      return { ...state, parameters: [...state.parameters, parameter] };
    },
  );

  public readonly setParameterValue = this.effect(
    (parameter$: Observable<SetParameterValueRequest>) => {
      return parameter$.pipe(
        tap((parameter) => {
          if (parameter.parameterChain?.includes(parameter.id)) {
            return;
          }
          this.updateParameterValue(parameter);
          this.get()
            .parameterRelations.filter(
              (x) => x.firstId == parameter.id || x.secondId == parameter.id,
            )
            .forEach((x) => {
              const destination =
                x.firstId == parameter.id ? x.secondId : x.firstId;
              this.setParameterValue({
                id: destination,
                value: parameter.value,
                parameterChain: [
                  ...(parameter.parameterChain ?? []),
                  parameter.id,
                ],
              });
            });
        }),
      );
    },
  );

  private readonly updateParameterValue = this.updater(
    (state: DashboardState, parameter: parameterState) => {
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

  public readonly addParameterRelation = this.updater(
    (state: DashboardState, parameterRelation: ParameterRelationState) => {
      return {
        ...state,
        parameterRelations: [...state.parameterRelations, parameterRelation],
      };
    },
  );
}
