import test from "node:test";
import assert from "node:assert/strict";
import { generatePassword } from "../src/index.js";

test("generates a password with the requested length", () => {
  const password = generatePassword({ length: 24 });

  assert.equal(password.length, 24);
});

test("includes every enabled character type", () => {
  const password = generatePassword({ length: 20 });

  assert.match(password, /[a-z]/);
  assert.match(password, /[A-Z]/);
  assert.match(password, /[0-9]/);
  assert.match(password, /[!@#$%^&*()\-_=+\[\]{};:,.?/]/);
});

test("supports selecting specific character types", () => {
  const password = generatePassword({
    length: 12,
    lowercase: false,
    uppercase: true,
    numbers: true,
    symbols: false
  });

  assert.match(password, /^[A-Z0-9]+$/);
});

test("rejects invalid options", () => {
  assert.throws(() => generatePassword({ length: 0 }), /positive integer/);
  assert.throws(
    () => generatePassword({ lowercase: false, uppercase: false, numbers: false, symbols: false }),
    /at least one character type/
  );
  assert.throws(
    () => generatePassword({ length: 1, lowercase: true, uppercase: true }),
    /at least the number of enabled/
  );
});
