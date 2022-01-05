# Tailwind CSS Padding Safe Plugin

This plugin is based on the [tailwindcss](https://github.com/tailwindcss/tailwindcss/tree/v1.0.0-beta.4) framework. Usage is similar to the core padding plugin, but outputs `px-[value]-safe` padding, instead of `px-[value]`.
This is my first package so don't hesitate to point me on any improvement or issue.

## Installation

```bash
npm install -D tailwindcss-padding-safe
```

## Usage

```js
// In your Tailwind JS config
{
	plugins: [require("tailwindcss-padding-safe")]
}
```

This plugin generates the following utilities:
+ the same with `m` prefix for margin

```css
/* Default rules for browser without max() support same as core padding generated rules */

.p-[value]-safe {
	padding: [value]rem;
}
.py-[value]-safe {
	padding-top: [value]rem;
	padding-bottom: [value]rem;
}
.px-[value]-safe {
	padding-left: [value]rem;
	padding-right: [value]rem;
}
.pt-[value]-safe {
	padding-top: [value]rem;
}
.pb-[value]-safe {
	padding-bottom: [value]rem;
}
.pl-[value]-safe {
	padding-left: [value]rem;
}
.pr-[value]-safe {
	padding-right: [value]rem;
}

/* Safe area rules for browser with max() support */

@supports (padding: max(0px)) {
	.p-[value]-safe {
		padding-top: max([value]rem, env(safe-area-inset-top));
		padding-bottom: max([value]rem, env(safe-area-inset-bottom));
		padding-left: max([value]rem, env(safe-area-inset-left));
		padding-right: max([value]rem, env(safe-area-inset-right));
	}
	.py-[value]-safe {
		padding-top: max([value]rem, env(safe-area-inset-top));
		padding-bottom: max([value]rem, env(safe-area-inset-bottom));
	}
	.px-[value]-safe {
		padding-left: max([value]rem, env(safe-area-inset-left));
		padding-right: max([value]rem, env(safe-area-inset-right));
	}
	.pt-[value]-safe {
		padding-top: max([value]rem, env(safe-area-inset-top));
	}
	.pb-[value]-safe {
		padding-bottom: max([value]rem, env(safe-area-inset-bottom));
	}
	.pl-[value]-safe {
		padding-left: max([value]rem, env(safe-area-inset-left));
	}
	.pr-[value]-safe {
		padding-right: max([value]rem, env(safe-area-inset-right));
	}
}
```

## Options

It's working out of the box with your current padding options ! ( Pro tip : use purgecss )
But if you need, you can set options in your tailwindcss.js like this :

```js
// In your Tailwind CSS config
theme: {
    paddingSafe:{
      padding: {
        '1': '1rem',
      },
      suffix: {
        'notch'
      },
      onlySupportsRules : true
    },
},
variants: {
  paddingSafe: [ 'responsive' ],
},
```

`theme.paddingSafe.padding` is optional and it defaults to theme.padding
`theme.paddingSafe.suffix` is optional and it defaults to "safe"
`theme.paddingSafe.onlySupportsRules` is optional and it defaults to false
`variants.paddingSafe` is optional and it defaults to variants.padding

Use it in your html like this :

```html
<div class="pt-1-safe">Example of block</div>
```

If you don't want to generate default rules for browser without support for `max()`, you can set the `onlySupportsRules` option to `true`. But then, you will not get any padding for browser without support, so you should add default core padding too :

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
