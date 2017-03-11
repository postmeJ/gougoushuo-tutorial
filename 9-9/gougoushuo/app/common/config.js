'use strict'

module.exports = {
  header: {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    }
  },
  qiniu: {
    upload: 'http://upload.qiniu.com'
  },
  cloudinary: {
    cloud_name: 'liubinhui',
    api_key: '755675477547144',
    api_secret: 'YbD545WonnI2GhMITVhRDxy0aeg',
    base: 'http://res.cloudinary.com/liubinhui',
    image: 'https://api.cloudinary.com/v1_1/liubinhui/image/upload',
    video: 'https://api.cloudinary.com/v1_1/liubinhui/video/upload',
    audio: 'https://api.cloudinary.com/v1_1/liubinhui/raw/upload',
  },
  api: {
    base: 'http://localhost:1234/',
    base2: 'http://rap.taobao.org/mockjs/11377/',
    creations: 'api/creations',
    comment: 'api/comments',
    up: 'api/up',
    signup: 'api/u/signup',
    verify: 'api/u/verify',
    update: 'api/u/update',
    signature: 'api/signature',

  }
}
