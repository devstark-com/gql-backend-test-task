module.exports = ({ throwErr = false, log = () => {} } = {}) => {
  return async (ctx, next) => {
    ctx.state.error = (errorInstance, status, message, { type, trace, info } = {}) => {
      ctx.status = status

      const body = { status, type, message, info }
      if (process.env.NODE_ENV !== 'production' && trace) body.trace = trace.split('\n    ')
      ctx.body = body

      log({ status, type, message, info })
      if (throwErr) ctx.throw(errorInstance)
    }

    try {
      await next()
    } catch (e) {
      if (e.status) ctx.state.error(e, e.status, e.message, { trace: e.stack })
      else if (e.name === 'ValidationError') {
        const extraInfo = { type: e.name, trace: e.stack }
        if (e.errors && e.message) extraInfo.info = e.errors

        ctx.state.error(e, 400, e.message, extraInfo)
      } else if (e.name === 'AuthenticationError') ctx.state.error(e, 401, e.message, { type: e.name, trace: e.stack })
      else if (e.name === 'AuthorizationError') ctx.state.error(e, 403, e.message, { type: e.name, trace: e.stack })
      else if (e.name === 'NotFoundError') ctx.state.error(e, 404, e.message, { type: e.name, trace: e.stack })
      else {
        ctx.state.error(e, 500, e.message, { type: 'ServerError', trace: e.stack }) // @todo double check secure information throwing
        console.error(e.message, e.stack)
      }
    }
  }
}
