import { randomInt } from "node:crypto";

const CHARACTERS = {
  lowercase: "abcdefghijklmnopqrstuvwxyz",
  uppercase: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
  numbers: "0123456789",
  symbols: "!@#$%^&*()-_=+[]{};:,.?/"
};

const AMBIGUOUS_CHARACTERS = "0Oo1lI";

function pick(characters) {
  return characters[randomInt(characters.length)];
}

function validateOptions(options) {
  if (!Number.isInteger(options.length) || options.length < 1) {
    throw new TypeError("length must be a positive integer");
  }

  const enabledTypes = ["lowercase", "uppercase", "numbers", "symbols"]
    .filter((type) => options[type]);

  if (enabledTypes.length === 0) {
    throw new TypeError("at least one character type must be enabled");
  }

  if (options.length < enabledTypes.length) {
    throw new RangeError("length must be at least the number of enabled character types");
  }

  return enabledTypes;
}

/**
 * Generate a cryptographically secure random password.
 *
 * @param {object} [options]
 * @param {number} [options.length=16] Password length.
 * @param {boolean} [options.lowercase=true] Include lowercase letters.
 * @param {boolean} [options.uppercase=true] Include uppercase letters.
 * @param {boolean} [options.numbers=true] Include numbers.
 * @param {boolean} [options.symbols=true] Include symbols.
 * @returns {string}
 */
export function generatePassword(options = {}) {
  const settings = {
    length: 16,
    lowercase: true,
    uppercase: true,
    numbers: true,
    symbols: true,
    excludeAmbiguous: false,
    ...options
  };
  const enabledTypes = validateOptions(settings);
  const getCharacters = (type) => {
    const characters = CHARACTERS[type];
    return settings.excludeAmbiguous
      ? [...characters].filter((character) => !AMBIGUOUS_CHARACTERS.includes(character)).join("")
      : characters;
  };
  const passwordCharacters = enabledTypes.map((type) => pick(getCharacters(type)));
  const allCharacters = enabledTypes.map(getCharacters).join("");

  while (passwordCharacters.length < settings.length) {
    passwordCharacters.push(pick(allCharacters));
  }

  for (let index = passwordCharacters.length - 1; index > 0; index -= 1) {
    const swapIndex = randomInt(index + 1);
    [passwordCharacters[index], passwordCharacters[swapIndex]] =
      [passwordCharacters[swapIndex], passwordCharacters[index]];
  }

  return passwordCharacters.join("");
}

export { AMBIGUOUS_CHARACTERS, CHARACTERS };
