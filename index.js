const plugin = require('tailwindcss/plugin')

module.exports = plugin(function ({ matchUtilities, theme }) {
  // Padding safe utilities
  // Generates: p-safe, p-safe-4, px-safe-2, pt-safe-[20px], etc.
  matchUtilities(
    {
      'p-safe': (value) => ({
        'padding-top': `max(${value}, env(safe-area-inset-top))`,
        'padding-bottom': `max(${value}, env(safe-area-inset-bottom))`,
        'padding-left': `max(${value}, env(safe-area-inset-left))`,
        'padding-right': `max(${value}, env(safe-area-inset-right))`,
      }),
      'px-safe': (value) => ({
        'padding-left': `max(${value}, env(safe-area-inset-left))`,
        'padding-right': `max(${value}, env(safe-area-inset-right))`,
      }),
      'py-safe': (value) => ({
        'padding-top': `max(${value}, env(safe-area-inset-top))`,
        'padding-bottom': `max(${value}, env(safe-area-inset-bottom))`,
      }),
      'pt-safe': (value) => ({
        'padding-top': `max(${value}, env(safe-area-inset-top))`,
      }),
      'pr-safe': (value) => ({
        'padding-right': `max(${value}, env(safe-area-inset-right))`,
      }),
      'pb-safe': (value) => ({
        'padding-bottom': `max(${value}, env(safe-area-inset-bottom))`,
      }),
      'pl-safe': (value) => ({
        'padding-left': `max(${value}, env(safe-area-inset-left))`,
      }),
    },
    { values: { ...theme('padding'), DEFAULT: '0px' } }
  )

  // Margin safe utilities
  // Generates: m-safe, m-safe-4, mx-safe-2, mt-safe-[20px], etc.
  matchUtilities(
    {
      'm-safe': (value) => ({
        'margin-top': `max(${value}, env(safe-area-inset-top))`,
        'margin-bottom': `max(${value}, env(safe-area-inset-bottom))`,
        'margin-left': `max(${value}, env(safe-area-inset-left))`,
        'margin-right': `max(${value}, env(safe-area-inset-right))`,
      }),
      'mx-safe': (value) => ({
        'margin-left': `max(${value}, env(safe-area-inset-left))`,
        'margin-right': `max(${value}, env(safe-area-inset-right))`,
      }),
      'my-safe': (value) => ({
        'margin-top': `max(${value}, env(safe-area-inset-top))`,
        'margin-bottom': `max(${value}, env(safe-area-inset-bottom))`,
      }),
      'mt-safe': (value) => ({
        'margin-top': `max(${value}, env(safe-area-inset-top))`,
      }),
      'mr-safe': (value) => ({
        'margin-right': `max(${value}, env(safe-area-inset-right))`,
      }),
      'mb-safe': (value) => ({
        'margin-bottom': `max(${value}, env(safe-area-inset-bottom))`,
      }),
      'ml-safe': (value) => ({
        'margin-left': `max(${value}, env(safe-area-inset-left))`,
      }),
    },
    { values: { ...theme('margin'), DEFAULT: '0px' }, supportsNegativeValues: true }
  )
})
