module.exports = {
	preset: 'ts-jest',
	testEnvironment: 'node',
	collectCoverage: true,
	coverageReporters: ['text', 'json-summary'],
	collectCoverageFrom: ['src/**/*.{ts,tsx}'],
	testPathIgnorePatterns: ['/node_modules/', '/build/'],
	modulePathIgnorePatterns: ['.*__mocks__.*'],
}
