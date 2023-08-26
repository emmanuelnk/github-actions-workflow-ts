import * as ExtendedWorkflowTypes from "../../types/githubActionsWorkflowExtended";

export class Step {
  public step: ExtendedWorkflowTypes.Step;

  constructor(stepProps: Partial<ExtendedWorkflowTypes.Step>) {
    (this.step as unknown) = {
      ...stepProps,
    };
  }
}
