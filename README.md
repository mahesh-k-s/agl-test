# AGL Coding Test

Code to consume the json from provided url and output a list of all the cats in alphabetical order under a heading of the gender of their owner.

## Scripts

```bash

git clone 'https://github.com/mahesh-k-s/agl-test.git'
or
download the zip and extract to a folder/server


# install node modules 
npm install

# runs the project in a new window
npm start

# runs the test suites
npm test

# create build in dist folder
npm run build

```

## Tools used

- JavaScript [`ES2015`]
- [`Webpack 2.x`] as module bundler
- [`Babel JS`] as the compiler.
- [`Karma`] as the test runner.
- [`Jasmine`] as testing framework


## Known Issue

The server does not support Cross Origin Resource Sharing (CORS), therefore the below error may be shown:

```bash
FAILED: Failed to fetch
```

To fix this, start Google Chrome with disabled web-security using the following command:

### In MAC
```bash
open -a "Google Chrome" --args --user-data-dir --disable-web-security
```

### In Windows
```bash
start chrome.exe --user-data-dir="C:/Chrome dev session" --disable-web-security
```