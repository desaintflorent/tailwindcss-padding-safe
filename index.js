const _ = require('lodash')

module.exports = function () {
  return function({ addUtilities, e, config }) {

      const margins = config('theme.marginSafe.margin',config('theme.margin',{}))
      const variants = config('variants.marginSafe',config('variants.margin',{}))
      const suffix = config('theme.marginSafe.suffix','safe')
      const onlySupportsRules = config('theme.marginSafe.onlySupportsRules',false)

      const generators = [
        (size, modifier) => (onlySupportsRules ? null : {
          [`.${e(`p-${modifier}-${suffix}`)}`]: { 'margin': `${size}` },
        }),
        (size, modifier) => (onlySupportsRules ? null : {
          [`.${e(`py-${modifier}-${suffix}`)}`]: { 'margin-top': `${size}`, 'margin-bottom': `${size}` },
          [`.${e(`px-${modifier}-${suffix}`)}`]: { 'margin-left': `${size}`, 'margin-right': `${size}` },
        }),
        (size, modifier) => (onlySupportsRules ? null : {
          [`.${e(`pt-${modifier}-${suffix}`)}`]: { 'margin-top': `${size}` },
          [`.${e(`pr-${modifier}-${suffix}`)}`]: { 'margin-right': `${size}` },
          [`.${e(`pb-${modifier}-${suffix}`)}`]: { 'margin-bottom': `${size}` },
          [`.${e(`pl-${modifier}-${suffix}`)}`]: { 'margin-left': `${size}` },
        }),

        (size, modifier) => ({
          '@supports(margin: max(0px))': {
            [`.${e(`p-${modifier}-${suffix}`)}`]: { 'margin-top': `max(${size}, env(safe-area-inset-top))`, 'margin-bottom': `max(${size}, env(safe-area-inset-bottom))` , 'padding-left': `max(${size}, env(safe-area-inset-left))` , 'padding-right': `max(${size}, env(safe-area-inset-right))` },

            [`.${e(`py-${modifier}-${suffix}`)}`]: { 'margin-top': `max(${size}, env(safe-area-inset-top))`, 'margin-bottom': `max(${size}, env(safe-area-inset-bottom))` },
            [`.${e(`px-${modifier}-${suffix}`)}`]: { 'margin-left': `max(${size}, env(safe-area-inset-left))`, 'margin-right': `max(${size}, env(safe-area-inset-right))` },

            [`.${e(`pt-${modifier}-${suffix}`)}`]: { 'margin-top': `max(${size}, env(safe-area-inset-top))` },
            [`.${e(`pr-${modifier}-${suffix}`)}`]: { 'margin-right': `max(${size}, env(safe-area-inset-right))` },
            [`.${e(`pb-${modifier}-${suffix}`)}`]: { 'margin-bottom': `max(${size}, env(safe-area-inset-bottom))` },
            [`.${e(`pl-${modifier}-${suffix}`)}`]: { 'margin-left': `max(${size}, env(safe-area-inset-left))` },
          }
        }),
      ]

      const utilities = _.flatMap(generators, generator => {
        return _.flatMap(margins, generator)
      })

      addUtilities(utilities, variants)
  }
}
