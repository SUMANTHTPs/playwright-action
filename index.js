const core = require('@actions/core');
const exec = require('@actions/exec');

async function run() {
  try {
    const nodeVersion = core.getInput('node-version') || '18';
    const testFolder = core.getInput('test-folder') || './tests';
    const project = core.getInput('project') || '';
    const workers = core.getInput('workers') || 1;
    const retries = core.getInput('retries') || 0;

    console.log(`Using Node.js version: ${nodeVersion}`);
    console.log(`Running tests in folder: ${testFolder}`);

    // Install dependencies
    await exec.exec('npm', ['ci']);

    // Install Playwright browsers
    await exec.exec('npx', ['playwright', 'install', '--with-deps']);

    // Run Playwright tests
    const testCommand = ['npx', 'playwright', 'test'];
    if (project) {
      testCommand.push('--project', project);
    }
    if (workers) {
      testCommand.push('--workers', project);
    }
    if (retries !== 0) {
        testCommand.push('--retries', retries);
    }
    testCommand.push(testFolder);

    // Run Playwright tests
    await exec.exec(testCommand.join(' '));
  } catch (error) {
    core.setFailed(error.message);
  }
}

run();
