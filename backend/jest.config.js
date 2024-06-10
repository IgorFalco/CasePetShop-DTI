export default {
    verbose: true,
    testEnvironment: 'node',
    moduleFileExtensions: ['js'],
    transform: {
        '^.+\\.js$': 'babel-jest'
    },
    testRegex: '(/__tests__/.*|(\\.|/)(test))\\.js$',
};