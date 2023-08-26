import { Workflow } from "./";
import { NormalJob, ReusableWorkflowCallJob } from "../job";

describe("Workflow", () => {
  describe("addJobs", () => {
    it("should add multiple jobs to the workflow", () => {
      const mockJob1 = new NormalJob("job1", {
        "runs-on": "ubuntu-latest",
        steps: [
          {
            name: "Checkout",
            uses: "actions/checkout@v3",
          },
        ],
      });

      const mockJob2 = new ReusableWorkflowCallJob("job2", {
        uses: "your-org/your-repo/.github/workflows/reusable-workflow.yml@main",
      });

      const workflow = new Workflow("testWorkflow", {
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
      });

      workflow.addJobs([mockJob1, mockJob2]);

      expect(workflow.workflow).toEqual({
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
        jobs: {
          job1: {
            "runs-on": "ubuntu-latest",
            steps: [
              {
                name: "Checkout",
                uses: "actions/checkout@v3",
              },
            ],
          },
          job2: {
            uses: "your-org/your-repo/.github/workflows/reusable-workflow.yml@main",
          },
        },
      });
    });

    it("should merge new jobs with existing jobs", () => {
      const mockJob1 = new NormalJob("job1", {
        "runs-on": "ubuntu-latest",
        steps: [
          {
            name: "Install Node",
            uses: "actions/node@v3",
          },
        ],
      });

      const mockJob2 = new ReusableWorkflowCallJob("job2", {
        uses: "your-org/your-repo/.github/workflows/reusable-workflow.yml@main",
      });

      const workflow = new Workflow("testWorkflow", {
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
        jobs: {
          job0: {
            "runs-on": "ubuntu-latest",
            steps: [
              {
                name: "Checkout",
                uses: "actions/checkout@v3",
              },
            ],
          },
        },
      });

      workflow.addJobs([mockJob1, mockJob2]);

      expect(workflow.workflow).toEqual({
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
        jobs: {
          job0: {
            "runs-on": "ubuntu-latest",
            steps: [
              {
                name: "Checkout",
                uses: "actions/checkout@v3",
              },
            ],
          },
          job1: {
            "runs-on": "ubuntu-latest",
            steps: [
              {
                name: "Install Node",
                uses: "actions/node@v3",
              },
            ],
          },
          job2: {
            uses: "your-org/your-repo/.github/workflows/reusable-workflow.yml@main",
          },
        },
      });
    });
  });

  describe("addJob", () => {
    it("should add a single job to the workflow", () => {
      const mockJob1 = new NormalJob("job1", {
        "runs-on": "ubuntu-latest",
        steps: [
          {
            name: "Checkout",
            uses: "actions/checkout@v3",
          },
        ],
      });

      const workflow = new Workflow("testWorkflow", {
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
      });

      workflow.addJob(mockJob1);

      expect(workflow.workflow).toEqual({
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
        jobs: {
          job1: {
            "runs-on": "ubuntu-latest",
            steps: [
              {
                name: "Checkout",
                uses: "actions/checkout@v3",
              },
            ],
          },
        },
      });
    });

    it("should merge the new job with existing jobs", () => {
      const mockJob1 = new NormalJob("job1", {
        "runs-on": "ubuntu-latest",
        steps: [
          {
            name: "Checkout",
            uses: "actions/checkout@v3",
          },
        ],
      });

      const workflow = new Workflow("testWorkflow", {
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
        jobs: {
          job0: {
            "runs-on": "ubuntu-latest",
            steps: [
              {
                name: "Install Node",
                uses: "actions/node@v3",
              },
            ],
          },
        },
      });

      workflow.addJob(mockJob1);

      expect(workflow.workflow).toEqual({
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
        jobs: {
          job0: {
            "runs-on": "ubuntu-latest",
            steps: [
              {
                name: "Install Node",
                uses: "actions/node@v3",
              },
            ],
          },
          job1: {
            "runs-on": "ubuntu-latest",
            steps: [
              {
                name: "Checkout",
                uses: "actions/checkout@v3",
              },
            ],
          },
        },
      });
    });
  });

  describe("constructor", () => {
    it("should construct the workflow with given filename and properties", () => {
      const workflow = new Workflow("testWorkflow", {
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
      });

      expect(workflow.filename).toBe("testWorkflow");
      expect(workflow.workflow).toEqual({
        name: "testWorkflow",
        on: {
          workflow_dispatch: {},
        },
      });
    });
  });
});
