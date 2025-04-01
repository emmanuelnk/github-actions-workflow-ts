import { GeneratedWorkflowTypes } from '../types'

export class Step {
  public step: GeneratedWorkflowTypes.Step
  public id: string | undefined

  addEnvs(envs: GeneratedWorkflowTypes.Step['env']): this {
    if (this.step.env && typeof this.step.env === 'object')
      this.step.env = {
        ...(this.step.env as {
          [k: string]: string | number | boolean
        }),
        ...(envs as { [k: string]: string | number | boolean }),
      }
    else this.step.env = envs

    return this
  }

  constructor(stepProps: GeneratedWorkflowTypes.Step) {
    this.step = {
      ...stepProps,
    }
    this.id = stepProps.id
  }
}
