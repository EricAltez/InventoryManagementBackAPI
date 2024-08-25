import * as bcrypt from 'bcrypt';

export async function hashPassword(password: string) {
  const SALT = await bcrypt.genSalt();
  return bcrypt.hash(password, SALT);
}
