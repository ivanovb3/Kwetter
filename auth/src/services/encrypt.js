import crypto from 'crypto'

const algorithm = 'aes-256-cbc'
const key = crypto.randomBytes(32);
const iv = crypto.randomBytes(16);

export class Encrypt {
    static encrypt(text) {
        let cipher = crypto.createCipheriv("aes-256-cbc", key, iv)  //AES-256-GCM
        let encrypted = cipher.update(text);
        encrypted = Buffer.concat([encrypted, cipher.final()]);
        return { iv: iv.toString('hex'), encryptedData: encrypted.toString('hex') };
    }
    static decrypt(text) {
        let ivDec = Buffer.from(text.iv, 'hex');
        let encryptedText = Buffer.from(text.encryptedData, 'hex');
        let decipher = crypto.createDecipheriv('aes-256-cbc', Buffer.from(key), ivDec);
        let decrypted = decipher.update(encryptedText);
        decrypted = Buffer.concat([decrypted, decipher.final()]);
        return decrypted.toString();
    }
}

