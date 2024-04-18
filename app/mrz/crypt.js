import * as CryptoJS from 'crypto-js'

const encrypt = (data, uuid, iv) => {
  return CryptoJS.AES.encrypt(JSON.stringify(data), uuid, { iv: iv }).toString()
}

const decrypt = (encryted, uuid, iv) => {
  return CryptoJS.AES.decrypt(encryted.toString(), uuid, { iv: iv }).toString(
    CryptoJS.enc.Utf8
  )
}

export { encrypt, decrypt }
