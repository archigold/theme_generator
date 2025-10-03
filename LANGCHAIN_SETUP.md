# 🤖 LangChain Theme Generator Setup Guide

This guide will help you set up the AI-powered theme generation system for your Tech-Trek-Shop.

## 📋 Prerequisites

1. **Node.js** (v18 or higher)
2. **OpenAI API Key** - Get one from [OpenAI Platform](https://platform.openai.com/api-keys)
3. **npm** or **yarn** package manager

## 🚀 Installation Steps

### 1. Install Dependencies
```bash
npm install langchain @langchain/openai @langchain/core
```

### 2. Set Up Environment Variables

Create a `.env` file in your project root:

```env
# OpenAI API Key for LangChain Theme Generation
VITE_OPENAI_API_KEY=your_openai_api_key_here

# Other environment variables (if needed)
VITE_VENDURE_API_URL=http://localhost:3000/shop-api
VITE_VENDURE_API_TOKEN=your_vendure_token_here
```

**Important:** Replace `your_openai_api_key_here` with your actual OpenAI API key.

### 3. Get Your OpenAI API Key

1. Go to [OpenAI Platform](https://platform.openai.com/api-keys)
2. Sign in or create an account
3. Click "Create new secret key"
4. Copy the key and paste it in your `.env` file

### 4. Start the Development Server

```bash
npm run dev
```

## 🎨 Using the Theme Generator

### Access the Theme Studio
1. Navigate to `http://localhost:8082/theme-studio`
2. Or click "Theme Studio" in the navigation menu

### Generate Themes with AI
1. **Describe your ideal theme** in the text area
   - Example: "A minimalist theme with soft pastels and clean lines"
   - Example: "A dark cyberpunk theme with neon green and purple accents"
   - Example: "A warm, cozy theme with earth tones and soft shadows"

2. **Click "Generate Theme"** and wait for AI to create your theme

3. **Preview and apply** the generated theme

4. **Generate variations** for different styles (light/dark modes)

## 🎯 Example Prompts

Here are some example prompts to get you started:

### Minimalist Themes
- "A clean, minimalist theme with soft grays and whites"
- "A Scandinavian-inspired theme with light colors and clean typography"
- "A modern minimal theme with subtle shadows and rounded corners"

### Dark Themes
- "A dark cyberpunk theme with neon blue and purple accents"
- "A sleek dark theme with electric green highlights"
- "A professional dark theme with blue and gray tones"

### Colorful Themes
- "A vibrant, energetic theme with bright orange and yellow"
- "A tropical theme with teal and coral colors"
- "A playful theme with rainbow gradients and fun colors"

### Professional Themes
- "A corporate theme with navy blue and silver accents"
- "A business theme with professional grays and blues"
- "A clean professional theme with subtle gradients"

## 🔧 How It Works

### 1. AI Theme Generation
- Uses **GPT-4** to understand your description
- Generates harmonious color palettes
- Creates matching gradients and shadows
- Ensures accessibility and contrast ratios

### 2. Theme Building
- Converts AI output to CSS variables
- Generates Tailwind configuration
- Creates component style definitions
- Builds complete theme files

### 3. Real-time Application
- Switches themes instantly
- No page reload required
- Maintains all functionality
- Preserves user experience

## 🎨 Theme Structure

Each generated theme includes:

```typescript
{
  name: "Theme Name",
  description: "Theme description",
  style: "modern|minimal|futuristic|vintage|colorful|dark|light",
  mood: "professional|playful|elegant|bold|calm|energetic",
  colors: {
    primary: { hue: 193, saturation: 100, lightness: 50 },
    accent: { hue: 271, saturation: 100, lightness: 65 },
    background: { hue: 240, saturation: 5, lightness: 6 },
    // ... more colors
  },
  gradients: {
    primary: "linear-gradient(135deg, ...)",
    hero: "linear-gradient(135deg, ...)",
    // ... more gradients
  },
  shadows: {
    card: "0 8px 32px ...",
    neon: "0 0 20px ...",
    // ... more shadows
  }
}
```

## 🛠️ Customization

### Manual Theme Creation
1. Copy the `default` theme folder
2. Rename it to your theme name
3. Modify the files in the new theme folder
4. The theme will be automatically available

### Theme Files Structure
```
src/themes/your-theme/
├── styles/
│   ├── variables.css    # CSS variables
│   └── utilities.css    # Custom utilities
├── components/
│   ├── button.styles.ts # Button styles
│   ├── card.styles.ts   # Card styles
│   └── layout.styles.ts # Layout styles
├── config/
│   ├── tailwind.config.ts # Tailwind config
│   └── theme.json       # Theme metadata
└── assets/              # Theme assets
```

## 🚨 Troubleshooting

### Common Issues

1. **"OpenAI API key not configured"**
   - Check your `.env` file
   - Make sure `VITE_OPENAI_API_KEY` is set correctly
   - Restart the development server

2. **"Failed to generate theme"**
   - Check your internet connection
   - Verify your OpenAI API key is valid
   - Check the browser console for errors

3. **Theme not applying**
   - Check the browser console for errors
   - Verify the theme was generated correctly
   - Try refreshing the page

### Debug Mode
Enable debug logging by adding to your `.env`:
```env
VITE_DEBUG_THEMES=true
```

## 📚 API Usage

### Generate Theme Programmatically
```typescript
import { ThemeGenerator } from '@/lib/theme-generator';

const theme = await ThemeGenerator.generateTheme(
  "A minimalist theme with soft pastels"
);
```

### Apply Theme Programmatically
```typescript
import { loadTheme } from '@/themes';

await loadTheme('my-custom-theme');
```

## 🎉 Features

- ✅ **AI-powered theme generation**
- ✅ **Real-time theme switching**
- ✅ **Complete style separation**
- ✅ **Export/import themes**
- ✅ **Theme variations**
- ✅ **Responsive design**
- ✅ **Dark mode support**
- ✅ **Accessibility compliant**

## 📞 Support

If you encounter any issues:

1. Check the browser console for errors
2. Verify your OpenAI API key is correct
3. Ensure all dependencies are installed
4. Check the troubleshooting section above

## 🔄 Updates

The theme system is designed to be easily extensible. Future updates may include:

- More AI models (Claude, Gemini, etc.)
- Advanced theme customization tools
- Theme marketplace
- Collaborative theme editing
- Theme analytics and insights

---

**Happy theming! 🎨✨**
