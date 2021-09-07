const CommonController = require('./common')
const fs = require('fs')
class CheckFileController extends CommonController {
  async uploadFile() {
    const ctx = this.ctx
    const file = ctx.request.files[0]
    console.log(file)
    const fileStream = fs.createReadStream(file.filepath);
    const url = 'http://127.0.0.1:3334/stream';
    const result = await ctx.curl(url, {
      // 必须指定 method，支持 POST，PUT
      method: 'POST',
      // 以 stream 模式提交
      stream: fileStream,
    });
    console.log(result)
    // ctx.body = await ctx.service.auth.detail(ctx.params.id)
  }


}

module.exports = CheckFileController
