import { Step } from './'

describe('Step', () => {
	describe('addEnvs', () => {
		it('should add environment variables to an existing env object', () => {
			const stepInstance = new Step({
				name: 'Checkout',
				uses: 'actions/checkout@v3',
				env: {
					INITIAL_KEY: 'initial_value',
				},
			})

			stepInstance.addEnvs({
				ADDITIONAL_KEY: 'additional_value',
			})

			expect(stepInstance.step.env).toEqual({
				INITIAL_KEY: 'initial_value',
				ADDITIONAL_KEY: 'additional_value',
			})
		})

		it('should initialize env object if it does not exist', () => {
			const stepInstance = new Step({
				name: 'Checkout',
				uses: 'actions/checkout@v3',
			})

			stepInstance.addEnvs({
				NEW_KEY: 'new_value',
			})

			expect(stepInstance.step.env).toEqual({
				NEW_KEY: 'new_value',
			})
		})

		it('should handle different types of values', () => {
			const stepInstance = new Step({
				name: 'Checkout',
				uses: 'actions/checkout@v3',
				env: {
					INITIAL_KEY: 'initial_value',
					INITIAL_NUM: 1,
					INITIAL_BOOL: true,
				},
			})

			stepInstance.addEnvs({
				ADDITIONAL_KEY: 'additional_value',
				ADDITIONAL_NUM: 2,
				ADDITIONAL_BOOL: false,
			})

			expect(stepInstance.step.env).toEqual({
				INITIAL_KEY: 'initial_value',
				INITIAL_NUM: 1,
				INITIAL_BOOL: true,
				ADDITIONAL_KEY: 'additional_value',
				ADDITIONAL_NUM: 2,
				ADDITIONAL_BOOL: false,
			})
		})
	})

	describe('constructor', () => {
		it('should construct the Step instance correctly', () => {
			const stepInstance = new Step({
				name: 'Checkout',
				uses: 'actions/checkout@v3',
				env: {
					INITIAL_KEY: 'initial_value',
				},
			})

			expect(stepInstance.step).toEqual({
				name: 'Checkout',
				uses: 'actions/checkout@v3',
				env: {
					INITIAL_KEY: 'initial_value',
				},
			})
		})
	})
})
