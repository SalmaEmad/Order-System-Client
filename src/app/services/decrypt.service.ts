import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class DecryptService {
  hashingKey:any ="E546C8DF278CD5931069B522E695D4F2"
  constructor() { }

  set(hashingKey: any, value: any){
    
    var key = CryptoJS.enc.Utf8.parse(hashingKey);
    var iv = CryptoJS.enc.Utf8.parse(hashingKey);
    var encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(value.toString() == null ? "" : value.toString()), key,
    {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return encrypted.toString();
  }

  //The get method is use for decrypt the value.
  get(hashingKey: any, value: any){
    
    var key = CryptoJS.enc.Utf8.parse(hashingKey);
    var iv = CryptoJS.enc.Utf8.parse(hashingKey);
    var decrypted = CryptoJS.AES.decrypt(value == null ? "" : value, key, {
        keySize: 128 / 8,
        iv: iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7
    });

    return decrypted.toString(CryptoJS.enc.Utf8);
  }

  setItem(key:string,value:any){
    
    var encryptedKey = this.set(this.hashingKey, key);
    var encryptedValue = this.set(this.hashingKey, value);
    localStorage.setItem(encryptedKey,encryptedValue);
  }
  getItem(key:string){
    
    var returnEncryptedKey = this.set(this.hashingKey, key);
    var returnEncryptedValue = localStorage.getItem(returnEncryptedKey);
    var decryptedValue = this.get(this.hashingKey, returnEncryptedValue);
    return decryptedValue
  }
  removeItem(key:string){
    var returnEncryptedKey = this.set(this.hashingKey, key);
    localStorage.removeItem(returnEncryptedKey);
  }
  clearStorage() {
    localStorage.clear();
  }
}

