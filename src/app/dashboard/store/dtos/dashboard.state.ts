import { parameterState } from './parameter.state';
import { ParameterRelationState } from './parameter-relation.state';

export type DashboardState = {
  parameters: parameterState[];
  parameterRelations: ParameterRelationState[];
};
