import CryptoJS from 'crypto-js'

const encrypt = (data: any, uuid: any, iv: any) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), uuid, { iv: iv }).toString()
}

const decrypt = (encrypted: { toString: () => any }, uuid: string, iv: any) => {
  return CryptoJS.AES.decrypt(encrypted.toString(), uuid, { iv: iv }).toString(
    CryptoJS.enc.Utf8
  )
}

export { decrypt, encrypt }
