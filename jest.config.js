module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    testPathIgnorePatterns: ['/node_modules/', '.git', '/dist/'],
    setupFilesAfterEnv: ['./tests/setup.ts']
};
