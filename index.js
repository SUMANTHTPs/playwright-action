const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const nodeVersion = core.getInput('node-version') || '18';
    const project = core.getInput('project') || '';
    const workers = core.getInput('workers') || '1'; // Default to '1' as a string
    const retries = core.getInput('retries') || '0'; // Default to '0' as a string

    console.log(`Using Node.js version: ${nodeVersion}`);
    console.log(`Running tests in folder: ${testFolder}`);
    console.log(`Using ${workers} workers`);
    console.log(`Retries set to: ${retries}`);

    // Install dependencies
    await exec.exec('npm', ['ci']);

    // Install Playwright browsers
    await exec.exec('npx', ['playwright', 'install', '--with-deps']);

    // Run Playwright tests
    const testCommand = ['npx', 'playwright', 'test'];
    
    // Add components
    if (project) {
      testCommand.push(`--project=${project}`);
    }

    if (workers && !isNaN(workers)) {
      testCommand.push(`--workers=${workers}`);
    } else {
      console.warn('Invalid workers value, using default of 1');
      testCommand.push('--workers=1'); // Ensure fallback value
    }

    // Add retries if specified (ensure it’s a valid number)
    if (retries && !isNaN(retries)) {
      testCommand.push(`--retries=${retries}`);
    } else {
      console.warn('Invalid retries value, using default of 0');
      testCommand.push('--retries=0'); // Ensure fallback value
    }

    // Run Playwright tests
    await exec.exec(testCommand.join(' '));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
