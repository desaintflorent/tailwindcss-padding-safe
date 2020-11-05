# Tailwind CSS Margin Safe Plugin

This plugin is based on the [tailwindcss](https://github.com/tailwindcss/tailwindcss/tree/v1.0.0-beta.4) framework. Usage is similar to the core margin plugin, but outputs `mx-[value]-safe` margin, instead of `mx-[value]`.

This packaged is an edited fork from the excellent work at https://github.com/desaintflorent/tailwindcss-padding-safe

## Installation

```bash
npm install tailwindcss-margin-safe
```

## Usage

```js
// In your Tailwind JS config
{
	plugins: [require("tailwindcss-margin-safe")()]
}
```

This plugin generates the following utilities:

```css
/* Default rules for browser without max() support same as core margin generated rules */

.m-[value]-safe {
	margin: [value]rem;
}
.my-[value]-safe {
	margin-top: [value]rem;
	margin-bottom: [value]rem;
}
.mx-[value]-safe {
	margin-left: [value]rem;
	margin-right: [value]rem;
}
.mt-[value]-safe {
	margin-top: [value]rem;
}
.mb-[value]-safe {
	margin-bottom: [value]rem;
}
.ml-[value]-safe {
	margin-left: [value]rem;
}
.mr-[value]-safe {
	margin-right: [value]rem;
}

/* Safe area rules for browser with max() support */

@supports (margin: max(0px)) {
	.p-[value]-safe {
		margin-top: max([value]rem, env(safe-area-inset-top));
		margin-bottom: max([value]rem, env(safe-area-inset-bottom));
		margin-left: max([value]rem, env(safe-area-inset-left));
		margin-right: max([value]rem, env(safe-area-inset-right));
	}
	.py-[value]-safe {
		margin-top: max([value]rem, env(safe-area-inset-top));
		margin-bottom: max([value]rem, env(safe-area-inset-bottom));
	}
	.px-[value]-safe {
		margin-left: max([value]rem, env(safe-area-inset-left));
		margin-right: max([value]rem, env(safe-area-inset-right));
	}
	.pt-[value]-safe {
		margin-top: max([value]rem, env(safe-area-inset-top));
	}
	.pb-[value]-safe {
		margin-bottom: max([value]rem, env(safe-area-inset-bottom));
	}
	.pl-[value]-safe {
		margin-left: max([value]rem, env(safe-area-inset-left));
	}
	.pr-[value]-safe {
		margin-right: max([value]rem, env(safe-area-inset-right));
	}
}
```

## Options

It's working out of the box with your current margin options ! ( Pro tip : use purgecss )
But if you need, you can set options in your tailwindcss.js like this :

```js
// In your Tailwind CSS config
theme: {
    marginSafe:{
      margin: {
        '1': '1rem',
      },
      suffix: {
        'notch'
      },
      onlySupportsRules : true
    },
},
variants: {
  marginSafe: [ 'responsive' ],
},
```

`theme.marginSafe.margin` is optional and it defaults to theme.margin
`theme.marginSafe.suffix` is optional and it defaults to "safe"
`theme.marginSafe.onlySupportsRules` is optional and it defaults to false
`variants.marginSafe` is optional and it defaults to variants.margin

Use it in your html like this :

```html
<div class="pt-1-safe">Example of block</div>
```

If you don't want to generate default rules for browser without support for `max()`, you can set the `onlySupportsRules` option to `true`. But then, you will not get any margin for browser without support, so you should add default core margin too :

```html
<div class="pt-1 pt-1-safe">Example of block</div>
```

## Warning

Unitless values inside max() are considered invalid. So if you define custom value in your theme option, keep in mind that you need to use a unit with your value like this :

```
   '1': '1rem', //not '1': '1'
```

Or

```
   '0': '0px', //not '0': '0'
```
