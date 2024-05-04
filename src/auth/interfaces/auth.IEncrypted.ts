export interface IEncrypted {
    checkPassword(hashPassword: string, password: string): Promise<Boolean>;
    
    getEncryptedPassword(password: string): Promise<string>
}