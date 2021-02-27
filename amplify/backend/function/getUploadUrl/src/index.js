const uuidv4 = require('uuid/v4')
const AWS = require('aws-sdk')
AWS.config.update({ region: process.env.REGION || 'us-west-2' })
const s3 = new AWS.S3();

const getUploadURL = async (bucket,filename) => {
  const actionId = uuidv4()
  const s3Params = {
    Bucket: '<< ENTER YOUR BUCKET NAME HERE >>',
    Key:  `${actionId}.jpg`,
    ContentType: 'image/jpeg',
    ACL: 'public-read',
  }
  return new Promise((resolve, reject) => {
    let uploadURL = s3.getSignedUrl('putObject', s3Params)
    resolve({
      "statusCode": 200,
      "isBase64Encoded": false,
      "headers": { "Access-Control-Allow-Origin": "*" },
      "body": JSON.stringify({
        "uploadURL": uploadURL,
        "photoFilename": `${actionId}.jpg`
      })
    })
  })
})






exports.handler = async (event) => {
    return await getUploadURL();
};
