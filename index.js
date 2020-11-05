const _ = require('lodash')

module.exports = function () {
  return function({ addUtilities, e, config }) {

      const margins = config('theme.marginSafe.margin',config('theme.margin',{}))
      const variants = config('variants.marginSafe',config('variants.margin',{}))
      const suffix = config('theme.marginSafe.suffix','safe')
      const onlySupportsRules = config('theme.marginSafe.onlySupportsRules',false)

      const generators = [
        (size, modifier) => (onlySupportsRules ? null : {
          [`.${e(`m-${modifier}-${suffix}`)}`]: { 'margin': `${size}` },
        }),
        (size, modifier) => (onlySupportsRules ? null : {
          [`.${e(`my-${modifier}-${suffix}`)}`]: { 'margin-top': `${size}`, 'margin-bottom': `${size}` },
          [`.${e(`mx-${modifier}-${suffix}`)}`]: { 'margin-left': `${size}`, 'margin-right': `${size}` },
        }),
        (size, modifier) => (onlySupportsRules ? null : {
          [`.${e(`mt-${modifier}-${suffix}`)}`]: { 'margin-top': `${size}` },
          [`.${e(`mr-${modifier}-${suffix}`)}`]: { 'margin-right': `${size}` },
          [`.${e(`mb-${modifier}-${suffix}`)}`]: { 'margin-bottom': `${size}` },
          [`.${e(`ml-${modifier}-${suffix}`)}`]: { 'margin-left': `${size}` },
        }),

        (size, modifier) => ({
          '@supports(margin: max(0px))': {
            [`.${e(`m-${modifier}-${suffix}`)}`]: { 'margin-top': `max(${size}, env(safe-area-inset-top))`, 'margin-bottom': `max(${size}, env(safe-area-inset-bottom))` , 'margin-left': `max(${size}, env(safe-area-inset-left))` , 'margin-right': `max(${size}, env(safe-area-inset-right))` },

            [`.${e(`my-${modifier}-${suffix}`)}`]: { 'margin-top': `max(${size}, env(safe-area-inset-top))`, 'margin-bottom': `max(${size}, env(safe-area-inset-bottom))` },
            [`.${e(`mx-${modifier}-${suffix}`)}`]: { 'margin-left': `max(${size}, env(safe-area-inset-left))`, 'margin-right': `max(${size}, env(safe-area-inset-right))` },

            [`.${e(`mt-${modifier}-${suffix}`)}`]: { 'margin-top': `max(${size}, env(safe-area-inset-top))` },
            [`.${e(`mr-${modifier}-${suffix}`)}`]: { 'margin-right': `max(${size}, env(safe-area-inset-right))` },
            [`.${e(`mb-${modifier}-${suffix}`)}`]: { 'margin-bottom': `max(${size}, env(safe-area-inset-bottom))` },
            [`.${e(`ml-${modifier}-${suffix}`)}`]: { 'margin-left': `max(${size}, env(safe-area-inset-left))` },
          }
        }),
      ]

      const utilities = _.flatMap(generators, generator => {
        return _.flatMap(margins, generator)
      })

      addUtilities(utilities, variants)
  }
}
