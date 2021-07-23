const { flatMap } = require('lodash');

module.exports = function () {
  return function({ addUtilities, e, config }) {

    // Paddings
    const paddings = config('theme.paddingSafe.padding', config('theme.padding', {}));
    const paddingVariants = config('variants.paddingSafe', config('variants.padding', {}));
    const paddingSuffix = config('theme.paddingSafe.suffix', 'safe');
    const paddingOnlySupportsRules = config('theme.paddingSafe.onlySupportsRules', false);

    const paddingGenerators = [
      (size, modifier) => (paddingOnlySupportsRules ? null : {
        [`.${e(`p-${modifier}-${paddingSuffix}`)}`]: { 'padding': `${size}` },
      }),
      (size, modifier) => (paddingOnlySupportsRules ? null : {
        [`.${e(`py-${modifier}-${paddingSuffix}`)}`]: { 'padding-top': `${size}`, 'padding-bottom': `${size}` },
        [`.${e(`px-${modifier}-${paddingSuffix}`)}`]: { 'padding-left': `${size}`, 'padding-right': `${size}` },
      }),
      (size, modifier) => (paddingOnlySupportsRules ? null : {
        [`.${e(`pt-${modifier}-${paddingSuffix}`)}`]: { 'padding-top': `${size}` },
        [`.${e(`pr-${modifier}-${paddingSuffix}`)}`]: { 'padding-right': `${size}` },
        [`.${e(`pb-${modifier}-${paddingSuffix}`)}`]: { 'padding-bottom': `${size}` },
        [`.${e(`pl-${modifier}-${paddingSuffix}`)}`]: { 'padding-left': `${size}` },
      }),
      (size, modifier) => ({
        '@supports(padding: max(0px))': {
          [`.${e(`p-${modifier}-${paddingSuffix}`)}`]: { 'padding-top': `max(${size}, env(safe-area-inset-top))`, 'padding-bottom': `max(${size}, env(safe-area-inset-bottom))` , 'padding-left': `max(${size}, env(safe-area-inset-left))` , 'padding-right': `max(${size}, env(safe-area-inset-right))` },

          [`.${e(`py-${modifier}-${paddingSuffix}`)}`]: { 'padding-top': `max(${size}, env(safe-area-inset-top))`, 'padding-bottom': `max(${size}, env(safe-area-inset-bottom))` },
          [`.${e(`px-${modifier}-${paddingSuffix}`)}`]: { 'padding-left': `max(${size}, env(safe-area-inset-left))`, 'padding-right': `max(${size}, env(safe-area-inset-right))` },

          [`.${e(`pt-${modifier}-${paddingSuffix}`)}`]: { 'padding-top': `max(${size}, env(safe-area-inset-top))` },
          [`.${e(`pr-${modifier}-${paddingSuffix}`)}`]: { 'padding-right': `max(${size}, env(safe-area-inset-right))` },
          [`.${e(`pb-${modifier}-${paddingSuffix}`)}`]: { 'padding-bottom': `max(${size}, env(safe-area-inset-bottom))` },
          [`.${e(`pl-${modifier}-${paddingSuffix}`)}`]: { 'padding-left': `max(${size}, env(safe-area-inset-left))` },
        }
      })
    ];
    
    const paddingUtilities = flatMap(paddingGenerators, generator => {
      return flatMap(paddings, generator)
    });
    
    addUtilities(paddingUtilities, paddingVariants);
    
    // Margins
    const margins = config('theme.marginSafe.margin', config('theme.margin', {}));
    const marginVariants = config('variants.marginSafe', config('variants.margin', {}));
    const marginSuffix = config('theme.marginSafe.suffix', 'safe');
    const marginOnlySupportsRules = config('theme.marginSafe.onlySupportsRules', false);
    
    const marginGenerators = [
      (size, modifier) => (marginOnlySupportsRules ? null : {
        [`.${e(`m-${modifier}-${marginSuffix}`)}`]: { 'margin': `${size}` },
      }),
      (size, modifier) => (marginOnlySupportsRules ? null : {
        [`.${e(`my-${modifier}-${marginSuffix}`)}`]: { 'margin-top': `${size}`, 'margin-bottom': `${size}` },
        [`.${e(`mx-${modifier}-${marginSuffix}`)}`]: { 'margin-left': `${size}`, 'margin-right': `${size}` },
      }),
      (size, modifier) => (marginOnlySupportsRules ? null : {
        [`.${e(`mt-${modifier}-${marginSuffix}`)}`]: { 'margin-top': `${size}` },
        [`.${e(`mr-${modifier}-${marginSuffix}`)}`]: { 'margin-right': `${size}` },
        [`.${e(`mb-${modifier}-${marginSuffix}`)}`]: { 'margin-bottom': `${size}` },
        [`.${e(`ml-${modifier}-${marginSuffix}`)}`]: { 'margin-left': `${size}` },
      }),
      (size, modifier) => ({
        '@supports(margin: max(0px))': {
          [`.${e(`m-${modifier}-${marginSuffix}`)}`]: { 'margin-top': `max(${size}, env(safe-area-inset-top))`, 'margin-bottom': `max(${size}, env(safe-area-inset-bottom))` , 'margin-left': `max(${size}, env(safe-area-inset-left))` , 'margin-right': `max(${size}, env(safe-area-inset-right))` },

          [`.${e(`my-${modifier}-${marginSuffix}`)}`]: { 'margin-top': `max(${size}, env(safe-area-inset-top))`, 'margin-bottom': `max(${size}, env(safe-area-inset-bottom))` },
          [`.${e(`mx-${modifier}-${marginSuffix}`)}`]: { 'margin-left': `max(${size}, env(safe-area-inset-left))`, 'margin-right': `max(${size}, env(safe-area-inset-right))` },

          [`.${e(`mt-${modifier}-${marginSuffix}`)}`]: { 'margin-top': `max(${size}, env(safe-area-inset-top))` },
          [`.${e(`mr-${modifier}-${marginSuffix}`)}`]: { 'margin-right': `max(${size}, env(safe-area-inset-right))` },
          [`.${e(`mb-${modifier}-${marginSuffix}`)}`]: { 'margin-bottom': `max(${size}, env(safe-area-inset-bottom))` },
          [`.${e(`ml-${modifier}-${marginSuffix}`)}`]: { 'margin-left': `max(${size}, env(safe-area-inset-left))` },
        }
      })
    ]
    
    const marginUtilities = flatMap(marginGenerators, generator => {
      return flatMap(margins, generator)
    });
    
    addUtilities(marginUtilities, marginVariants);

    // Safe area only classes
    const utilities = [{
      '.p-safe': { 'padding-top': 'env(safe-area-inset-top)', 'padding-bottom': 'env(safe-area-inset-bottom)', 'padding-left': 'env(safe-area-inset-left)', 'padding-right': 'env(safe-area-inset-right)' },
      '.py-safe': { 'padding-top': 'env(safe-area-inset-top)', 'padding-bottom': 'env(safe-area-inset-bottom)' },
      '.px-safe': { 'padding-left': 'env(safe-area-inset-left)', 'padding-right': 'env(safe-area-inset-right)' },
      '.pt-safe': { 'padding-top': 'env(safe-area-inset-top)' },
      '.pr-safe': { 'padding-right': 'env(safe-area-inset-right)' },
      '.pb-safe': { 'padding-bottom': 'env(safe-area-inset-bottom)'},
      '.pl-safe': { 'padding-left': 'env(safe-area-inset-left)' },
    }, {
      '.m-safe': { 'margin-top': 'env(safe-area-inset-top)', 'margin-bottom': 'env(safe-area-inset-bottom)', 'margin-left': 'env(safe-area-inset-left)', 'margin-right': 'env(safe-area-inset-right)' },
      '.my-safe': { 'margin-top': 'env(safe-area-inset-top)', 'margin-bottom': 'env(safe-area-inset-bottom)' },
      '.mx-safe': { 'margin-left': 'env(safe-area-inset-left)', 'margin-right': 'env(safe-area-inset-right)' },
      '.mt-safe': { 'margin-top': 'env(safe-area-inset-top)' },
      '.mr-safe': { 'margin-right': 'env(safe-area-inset-right)' },
      '.mb-safe': { 'margin-bottom': 'env(safe-area-inset-bottom)'},
      '.ml-safe': { 'margin-left': 'env(safe-area-inset-left)' },
    }];

    addUtilities(utilities);
  }
}