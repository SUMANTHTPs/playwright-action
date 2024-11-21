# Run Playwright Tests Action

This GitHub Action runs Playwright tests.

## Inputs

### `node-version`
- **Optional**: Node.js version to use.
- **Default**: `18`

### `test-folder`
- **Optional**: Path to the folder containing Playwright tests.
- **Default**: `./tests`

## Example Usage

```yaml
name: Playwright Tests

on:
  push:
    branches:
      - main

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
    - name: Checkout Code
      uses: actions/checkout@v3

    - name: Run Playwright Tests
      uses: <your-username>/playwright-action@v1
      with:
        node-version: '18'
        test-folder: './tests'
