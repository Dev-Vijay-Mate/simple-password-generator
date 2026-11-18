# simple-password-generator

Generate secure random passwords with zero dependencies.

## Install

```bash
npm install simple-password-generator
```

## Usage

```js
import { generatePassword } from "simple-password-generator";

generatePassword();
// Example: rP7!kQ2@vL9#sX4m
```

Customize the length and character types:

```js
generatePassword({
  length: 20,
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: false
});
```

## API

`generatePassword(options)` accepts:

| Option | Default | Description |
| --- | ---: | --- |
| `length` | `16` | Password length |
| `lowercase` | `true` | Include lowercase letters |
| `uppercase` | `true` | Include uppercase letters |
| `numbers` | `true` | Include numbers |
| `symbols` | `true` | Include symbols |
| `excludeAmbiguous` | `false` | Exclude characters that can look similar, such as `0`, `O`, `1`, and `l` |

The generator uses Node.js's built-in cryptographic random number generator and has no runtime dependencies.

Run the tests with:

```bash
npm test
```
