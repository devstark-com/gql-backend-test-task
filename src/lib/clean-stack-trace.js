const availableModifications = [
  'color',
  'remove',
  'pushToEnd',
  'textMark'
]

module.exports = function ({ modification = 'pushToEnd' } = {}) {
  if (!availableModifications.includes(modification)) throw new Error('Unknown modification')

  require('stack-chain').format.replace(function (error, frames) {
    const lines = []

    lines.push(error.toString())

    lines.push(...frameHandlers[`${modification}Frames`](frames))

    return lines.join('\n')
  })
}

const frameHandlers = {
  colorFrames: frames => {
    const lines = []

    frames.forEach(frame => {
      if (!frame.toString().includes('node_modules')) lines.push('    at ' + frame.toString())
      else lines.push(`    at ${frame.toString()}`.gray)
    })

    return lines
  },

  removeFrames: frames => {
    const lines = []

    frames.forEach(frame => {
      if (!frame.toString().includes('node_modules')) lines.push('    at ' + frame.toString())
    })

    return lines
  },

  pushToEndFrames (frames) {
    const lines = []
    const endLines = []

    frames.forEach(frame => {
      if (!frame.toString().includes('node_modules')) lines.push('    at ' + frame.toString())
      else endLines.push('    at ' + frame.toString())
    })

    lines.push(...endLines)

    return lines
  },

  textMarkFrames (frames) {
    const lines = []

    frames.forEach(frame => {
      if (!frame.toString().includes('node_modules')) lines.push('    at ' + frame.toString())
      else lines.push('    at ' + frame.toString() + ' - node_modules')
    })

    return lines
  }
}
