# Tailwind CSS Padding Safe Plugin

Tailwind CSS v4 plugin that generates padding and margin utilities with `safe-area-inset` support for notched devices (iPhones, etc.).

## Installation

```bash
npm install -D tailwindcss-padding-safe
```

## Usage

Add the plugin to your CSS file:

```css
@import "tailwindcss";
@plugin "tailwindcss-padding-safe";
```

Then use the utilities in your HTML:

```html
<!-- Safe area only (no minimum padding) -->
<div class="p-safe">Full safe area padding</div>
<div class="pt-safe">Safe area top only</div>

<!-- Safe area with minimum padding value -->
<div class="p-safe-4">At least 1rem padding, or safe area if larger</div>
<div class="pt-safe-8">At least 2rem top padding, or safe area if larger</div>

<!-- Arbitrary values -->
<div class="px-safe-[20px]">Custom safe horizontal padding</div>

<!-- With variants -->
<div class="md:p-safe-4 hover:p-safe-8">Responsive and interactive</div>
```

## Generated CSS

The plugin uses `max()` to ensure padding/margin is at least the specified value or the device safe area inset, whichever is larger.

```css
/* p-safe (no minimum, just the safe area) */
.p-safe {
    padding-top: max(0px, env(safe-area-inset-top));
    padding-bottom: max(0px, env(safe-area-inset-bottom));
    padding-left: max(0px, env(safe-area-inset-left));
    padding-right: max(0px, env(safe-area-inset-right));
}

/* p-safe-4 (at least 1rem, or safe area if larger) */
.p-safe-4 {
    padding-top: max(1rem, env(safe-area-inset-top));
    padding-bottom: max(1rem, env(safe-area-inset-bottom));
    padding-left: max(1rem, env(safe-area-inset-left));
    padding-right: max(1rem, env(safe-area-inset-right));
}
```

## Available Utilities

### Padding

| Class | Description |
|---|---|
| `p-safe-{value}` | All sides |
| `px-safe-{value}` | Left and right |
| `py-safe-{value}` | Top and bottom |
| `pt-safe-{value}` | Top |
| `pr-safe-{value}` | Right |
| `pb-safe-{value}` | Bottom |
| `pl-safe-{value}` | Left |

### Margin

| Class | Description |
|---|---|
| `m-safe-{value}` | All sides |
| `mx-safe-{value}` | Left and right |
| `my-safe-{value}` | Top and bottom |
| `mt-safe-{value}` | Top |
| `mr-safe-{value}` | Right |
| `mb-safe-{value}` | Bottom |
| `ml-safe-{value}` | Left |

All utilities accept any value from your spacing theme, plus arbitrary values via bracket notation (e.g., `p-safe-[20px]`). Omit the value (e.g., `p-safe`) to use only the safe area inset with no minimum.

All Tailwind CSS v4 variants (responsive, hover, focus, etc.) work automatically.

## Migrating from v1.x

This is a breaking upgrade for Tailwind CSS v4. Key changes:

- **Class names changed**: `p-4-safe` is now `p-safe-4` (value moves to the end)
- **Plugin registration**: Use `@plugin` in CSS instead of `plugins: [require(...)]` in JS config
- **No more `@supports` fallback**: v4 targets modern browsers that all support `max()`
- **No more custom config options**: `suffix`, `onlySupportsRules`, and `variants` options are removed
- **Arbitrary value support**: Use bracket notation like `p-safe-[20px]`
- **lodash removed**: No external dependencies
