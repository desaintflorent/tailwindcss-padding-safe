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
        })
      ]

      const utilities = _.flatMap(generators, generator => {
        return _.flatMap(paddings, generator)
      });
      
      utilities.push({
        '.p-safe': { 'padding-top': 'env(safe-area-inset-top)', 'padding-bottom': 'env(safe-area-inset-bottom)', 'padding-left': 'env(safe-area-inset-left)', 'padding-right': 'env(safe-area-inset-right)' },
        '.py-safe': { 'padding-top': 'env(safe-area-inset-top)', 'padding-bottom': 'env(safe-area-inset-bottom)' },
        '.px-safe': { 'padding-left': 'env(safe-area-inset-left)', 'padding-right': 'env(safe-area-inset-right)' },
        '.pt-safe': { 'padding-top': 'env(safe-area-inset-top)' },
        '.pr-safe': { 'padding-right': 'env(safe-area-inset-right)' },
        '.pb-safe': { 'padding-bottom': 'env(safe-area-inset-bottom)'},
        '.pl-safe': { 'padding-left': 'env(safe-area-inset-left)' },
      });
      utilities.push({
        '.m-safe': { 'margin-top': 'env(safe-area-inset-top)', 'margin-bottom': 'env(safe-area-inset-bottom)', 'margin-left': 'env(safe-area-inset-left)', 'margin-right': 'env(safe-area-inset-right)' },
        '.my-safe': { 'margin-top': 'env(safe-area-inset-top)', 'margin-bottom': 'env(safe-area-inset-bottom)' },
        '.mx-safe': { 'margin-left': 'env(safe-area-inset-left)', 'margin-right': 'env(safe-area-inset-right)' },
        '.mt-safe': { 'margin-top': 'env(safe-area-inset-top)' },
        '.mr-safe': { 'margin-right': 'env(safe-area-inset-right)' },
        '.mb-safe': { 'margin-bottom': 'env(safe-area-inset-bottom)'},
        '.ml-safe': { 'margin-left': 'env(safe-area-inset-left)' },
      });

      addUtilities(utilities, variants)
  }
}