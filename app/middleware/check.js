'use strict'

module.exports = options => {
  return async function(ctx, next) {
    console.log(1, options)
    const placeId = ctx.header['place-id']
    if (!placeId) {
      ctx.body = {
        code: '1',
        data: null,
        msg: '当前用户没有绑定游乐场，不能进行操作！'
      }
      return
    }
    await next()
    console.log(2, ctx.body)
  }
}
