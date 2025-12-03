# MMK WebdriverIO Test Suite

This repository contains WebdriverIO end-to-end tests (Mocha) for two sample site flows:

- MakeMyTrip flow under `test/pageobjects/mmk`
- Myntra flow under `test/pageobjects/myntra`

Purpose: local E2E automation examples using the Page Object pattern to demonstrate selectors, actions and flows.

## Quick start

Requirements:

- Node.js and npm installed
- Chrome browser available locally

Install dev dependencies and run the full test suite:

```powershell
npm install
npm run wdio
```

Notes:

- `npm run wdio` runs `wdio run ./wdio.conf.js` (see `package.json`).
- `wdio.conf.js` defines the `specs` array — edit or uncomment entries to run specific specs.

## Project structure and important files

- `package.json` — project manifest, contains `scripts.wdio`.
- `wdio.conf.js` — WebdriverIO configuration (runner, capabilities, timeouts, `baseUrl`, `specs`).
- `images/` — folder where tests save screenshots (subfolders `mmk`, `myntra`).

- `test/specs/` — Mocha specs (test entrypoints):
  - `test_scenario.spec.js` — MakeMyTrip scenarios (uses `test/pageobjects/mmk/*`).
  - `myntra_shop.spec.js` — Myntra shopping flow (uses `test/pageobjects/myntra/*`).

- `test/pageobjects/mmk/` — Page objects for MakeMyTrip flows:
  - `place.choose.js` — search form helpers (city inputs, popup handling, `startingUp()` helper).
  - `date.select.js` — (date selection helpers).
  - `select.passengers.js` — passenger selection helper.
  - `check.box.js` — checkbox helpers.
  - `submit.button.js` — form submission helper.

- `test/pageobjects/myntra/` — Page objects for Myntra flows:
  - `select.catagory.js` — category navigation, parameterized getters (e.g. `get tshirt(){ return (productID) => $(`//li[@id='${productID}']`) }`).
  - `checkout.product.js` — cart/checkout actions (size selection, add to bag, coupon apply).

- `.github/copilot-instructions.md` — guidance for AI coding agents (patterns, conventions).

## Coding conventions & patterns

- Page Object pattern: page objects are CommonJS modules exported with `module.exports = new X()`.
- Getters should return live selectors using `$` or `$$` (do not cache DOM elements at module load time).
- Many getters are parameterized (return a function). When generating new pageobjects, follow the same pattern:

  Example:

  ```javascript
  get tshirt(){
    return (productID) => $(`//li[@id='${productID}']`)
  }
  ```

- Async style: tests and pageobject methods use `async/await` — keep this consistent.
- Prefer `waitForDisplayed({timeout: <ms>})` over arbitrary `browser.pause()` where possible.

## Running a single spec

1. Open `wdio.conf.js` and update or uncomment the `specs` entry for the spec you want to run (e.g. `./test/specs/myntra_shop.spec.js`).
2. Run:

```powershell
npm run wdio
```

## Screenshots

- Tests save screenshots using `await browser.saveScreenshot('images/<site>/<name>.jpg')`. Keep using the `images/` structure and add descriptive filenames.

## Debugging tips

- If a test fails with element not found, verify selectors in the corresponding page object and prefer `waitForDisplayed()`.
- Some tests rely on switching to a second window handle: look for `browser.switchToWindow((await browser.getWindowHandles())[1])` in pageobjects.
- If Chrome is not launching, confirm your local Chrome version is compatible with the webdriver bindings.

## Common edit tasks an AI agent may be asked to perform

- Add a new spec under `test/specs/` composing existing pageobjects.
- Add parameterized getters to pageobjects (follow existing style).
- Update `wdio.conf.js` `specs` list to include new tests.

## Contributing

- Follow the existing pageobject getter/action split. Use `async/await` and live selectors.
- Add screenshots to `images/` when adding new flows.
