import { compare, hash } from "bcrypt";
import { createHash } from "crypto";


export const makeReference = (length: number) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

export const convertNodeToCursor = (node: any) => {
  return new Buffer(node.id, 'binary').toString('base64');
};

export const convertCursorToNodeId = (cursor: string) => {
  return new Buffer(cursor, 'base64').toString('binary');
};

// Utils


export const BCRYPT_SALT_ROUNDS = 12;
// NOTE bcrypt truncates the input string after 72 bytes, meaning
// you can still log in with just the first 72 bytes of your password.
// To prevent this, we prehash plaintext passwords before running them
// through bcrypt. https://security.stackexchange.com/q/6623
export const comparePassword = (plaintextPassword: string, hash: string) =>
  compare(sha256(plaintextPassword), hash);

export const hashPassword = (plaintextPassword: string) =>
  hash(sha256(plaintextPassword), BCRYPT_SALT_ROUNDS);

// NOTE SHA256 always produces a string that's 256 bits (or 32 bytes) long.
// In base64, that's ceil(32 / 3) * 4 = 44 bytes which meets the 72 byte limit.
const sha256 = (plaintext: string) =>
  createHash("sha256").update(plaintext).digest("base64");