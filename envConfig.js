import {loadEnvConfig} from '@next/env';
const projectDir = process.cwd();
loadEnvConfig(projectDir);
// This will load environment variables from .env.local, .env.development, and .env.production files based on the current environment.
//to allow read env variables
