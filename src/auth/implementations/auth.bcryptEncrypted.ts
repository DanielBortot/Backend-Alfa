import { IEncrypted } from "../interfaces/auth.IEncrypted";
import * as bcrypt from 'bcrypt';

export class BcryptEncrypted implements IEncrypted {

    async checkPassword(hashPassword: string, password: string): Promise<Boolean> {
    
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  }

  async getEncryptedPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 10);
  }

}