module.exports = options => {
  return async function basicMiddleware(ctx, next) {
    console.log(ctx.session.maxAge)
    await next()
  }
}
