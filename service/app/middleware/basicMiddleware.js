module.exports = options => {
  return async function basicMiddleware(ctx, next) {
    console.log(ctx.session.maxAge)
    console.log(ctx.session.openId)
    await next()
  }
}
