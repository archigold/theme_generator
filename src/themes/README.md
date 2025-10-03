# 🎨 Theme System

This directory contains the complete theme system for the Tech-Trek-Shop. All styling and visual elements are separated from functionality, making it easy to create and switch themes.

## 📁 Directory Structure

```
src/themes/
├── default/                    # Default futuristic theme
│   ├── styles/
│   │   ├── variables.css       # CSS variables (colors, gradients, shadows)
│   │   └── utilities.css       # Custom utility classes
│   ├── components/
│   │   ├── button.styles.ts    # Button component styles
│   │   ├── card.styles.ts      # Card component styles
│   │   └── layout.styles.ts    # Layout component styles
│   ├── assets/                 # Theme-specific assets
│   └── config/
│       ├── tailwind.config.ts  # Tailwind configuration
│       └── theme.json          # Theme metadata
├── theme-loader.ts             # Theme loading system
└── index.ts                    # Theme exports
```

## 🚀 Quick Start

### Switching Themes
```typescript
import { loadTheme } from '@/themes';

// Load a different theme
await loadTheme('minimal');
```

### Creating a New Theme
1. Copy the `default` folder and rename it to your theme name
2. Modify the files in the new theme folder
3. Update the theme metadata in `config/theme.json`
4. The theme will be automatically available

## 🎨 Customization Points

### 1. Colors (`styles/variables.css`)
```css
:root {
  --primary: 193 100% 50%;        /* Cyan blue */
  --accent: 271 100% 65%;         /* Purple */
  --background: 240 5% 6%;        /* Dark blue-gray */
  /* ... more colors */
}
```

### 2. Gradients
```css
--gradient-primary: linear-gradient(135deg, hsl(193 100% 50%), hsl(271 100% 65%));
--gradient-hero: linear-gradient(135deg, hsl(240 5% 6%), hsl(193 100% 50%), hsl(271 100% 65%));
```

### 3. Shadows
```css
--shadow-neon: 0 0 20px hsl(193 100% 50% / 0.5);
--shadow-glow: 0 0 40px hsl(271 100% 65% / 0.4);
```

### 4. Component Styles
Modify the `.ts` files in the `components/` folder to change how components look.

## 🔧 Theme Configuration

### Theme Metadata (`config/theme.json`)
```json
{
  "name": "Default Futuristic",
  "description": "A futuristic tech store theme",
  "version": "1.0.0",
  "author": "TechTrek Team",
  "colors": {
    "primary": { "hue": 193, "saturation": 100, "lightness": 50 }
  }
}
```

### Tailwind Config (`config/tailwind.config.ts`)
Extends the base Tailwind configuration with theme-specific settings.

## 🎯 Creating Themes with LangChain

The theme system is designed to be easily automated with LangChain:

1. **Color Generation**: Use AI to generate harmonious color palettes
2. **Style Variations**: Create different visual styles (minimal, dark, colorful, etc.)
3. **Component Theming**: Automatically adjust component styles
4. **Asset Replacement**: Swap images and icons
5. **Brand Adaptation**: Modify logos and typography

### Example LangChain Integration
```typescript
// Generate a new theme based on a description
const themeDescription = "A minimalist theme with soft pastels";
const newTheme = await generateTheme(themeDescription);

// Apply the generated theme
await loadTheme(newTheme.name);
```

## 📱 Responsive Design

All themes support responsive design through Tailwind's breakpoint system:
- `sm:` - 640px+
- `md:` - 768px+
- `lg:` - 1024px+
- `xl:` - 1280px+
- `2xl:` - 1400px+

## 🌙 Dark Mode

Themes automatically support both light and dark modes through CSS variables:
```css
:root { /* Light mode variables */ }
.dark { /* Dark mode variables */ }
```

## 🎨 Available Themes

- **default** - Futuristic tech store theme with neon accents
- *More themes can be added by copying the default folder*

## 🔄 Theme Switching

Use the `ThemeSwitcher` component to switch themes at runtime:

```tsx
import ThemeSwitcher from '@/components/ThemeSwitcher';

// Add to your header or settings
<ThemeSwitcher />
```

## 📦 Export/Import

Themes can be exported and imported as JSON files for sharing and backup:

```typescript
// Export current theme
const themeData = exportTheme('current');

// Import theme
await importTheme(themeData);
```

## 🛠️ Development

### Adding New Theme Properties
1. Update the `Theme` interface in `theme-loader.ts`
2. Add the property to all theme configurations
3. Update the theme loader to handle the new property

### Testing Themes
1. Use the ThemeSwitcher component to test theme switching
2. Check both light and dark modes
3. Verify responsive design works correctly
4. Test all component variants

## 📝 Best Practices

1. **Keep functionality separate** - Only modify styling, not business logic
2. **Use CSS variables** - Makes it easy to change colors globally
3. **Test thoroughly** - Ensure themes work across all components
4. **Document changes** - Update theme metadata when making changes
5. **Version control** - Keep track of theme versions for rollbacks

## 🚨 Important Notes

- **Never modify business logic** in theme files
- **Always test** theme changes in both light and dark modes
- **Backup themes** before making major changes
- **Use semantic naming** for CSS variables and classes
- **Follow the existing structure** when creating new themes
