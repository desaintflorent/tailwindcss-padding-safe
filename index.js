const _ = require('lodash')

module.exports = function () {
  return function({ addUtilities, e, config }) {

      const paddings = config('theme.paddingSafe.padding',config('theme.padding',{}))
      const variants = config('variants.paddingSafe',config('variants.padding',{}))
      const suffix = config('theme.paddingSafe.suffix','safe')
      const onlySupportsRules = config('theme.paddingSafe.onlySupportsRules',false)

      const generators = [
        (size, modifier) => (onlySupportsRules ? null : {
          [`.${e(`p-${modifier}-${suffix}`)}`]: { 'padding': `${size}` },
        }),
        (size, modifier) => (onlySupportsRules ? null : {
          [`.${e(`py-${modifier}-${suffix}`)}`]: { 'padding-top': `${size}`, 'padding-bottom': `${size}` },
          [`.${e(`px-${modifier}-${suffix}`)}`]: { 'padding-left': `${size}`, 'padding-right': `${size}` },
        }),
        (size, modifier) => (onlySupportsRules ? null : {
          [`.${e(`pt-${modifier}-${suffix}`)}`]: { 'padding-top': `${size}` },
          [`.${e(`pr-${modifier}-${suffix}`)}`]: { 'padding-right': `${size}` },
          [`.${e(`pb-${modifier}-${suffix}`)}`]: { 'padding-bottom': `${size}` },
          [`.${e(`pl-${modifier}-${suffix}`)}`]: { 'padding-left': `${size}` },
        }),

        (size, modifier) => ({
          '@supports(padding: max(0px))': {
            [`.${e(`p-${modifier}-${suffix}`)}`]: { 'padding-top': `max(${size}, env(safe-area-inset-top))`, 'padding-bottom': `max(${size}, env(safe-area-inset-bottom))` , 'padding-left': `max(${size}, env(safe-area-inset-left))` , 'padding-right': `max(${size}, env(safe-area-inset-right))` },

            [`.${e(`py-${modifier}-${suffix}`)}`]: { 'padding-top': `max(${size}, env(safe-area-inset-top))`, 'padding-bottom': `max(${size}, env(safe-area-inset-bottom))` },
            [`.${e(`px-${modifier}-${suffix}`)}`]: { 'padding-left': `max(${size}, env(safe-area-inset-left))`, 'padding-right': `max(${size}, env(safe-area-inset-right))` },

            [`.${e(`pt-${modifier}-${suffix}`)}`]: { 'padding-top': `max(${size}, env(safe-area-inset-top))` },
            [`.${e(`pr-${modifier}-${suffix}`)}`]: { 'padding-right': `max(${size}, env(safe-area-inset-right))` },
            [`.${e(`pb-${modifier}-${suffix}`)}`]: { 'padding-bottom': `max(${size}, env(safe-area-inset-bottom))` },
            [`.${e(`pl-${modifier}-${suffix}`)}`]: { 'padding-left': `max(${size}, env(safe-area-inset-left))` },
          }
        }),
      ]

      const utilities = _.flatMap(generators, generator => {
        return _.flatMap(paddings, generator)
      })

      addUtilities(utilities, variants)
  }
}
