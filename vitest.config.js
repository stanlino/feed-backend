import { defineConfig } from 'vitest/config'

export default defineConfig({
	test: {
		// options: https://vitest.dev/config/
		includeSource: ['src/**/*.{js,ts}'],
		setupFiles: ['dotenv/config', 'reflect-metadata'], // load variables form .env file
	},
})