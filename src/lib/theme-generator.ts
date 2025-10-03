import { ChatOpenAI } from "@langchain/openai";
import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { env, validateEnv } from '@/config/env.example';

// Validate environment variables
if (!validateEnv()) {
  console.warn('OpenAI API key not configured. Theme generation will not work.');
}

// Initialize LangChain with OpenAI
const llm = new ChatOpenAI({
  modelName: "gpt-4",
  temperature: 0.7,
  openAIApiKey: env.OPENAI_API_KEY,
});

// Theme generation prompt template
const themePrompt = PromptTemplate.fromTemplate(`
You are a professional UI/UX designer and frontend developer. Generate a complete theme configuration based on the user's description.

User Description: {description}

Please generate a theme with the following structure:

1. **Color Palette** (in HSL format):
   - Primary color (main brand color)
   - Accent color (secondary brand color) 
   - Background colors (light and dark modes)
   - Text colors
   - Card colors
   - Border colors

2. **Gradients** (CSS linear-gradient format):
   - Primary gradient
   - Hero section gradient
   - Card gradient
   - Neon/glow gradient
   - Glass effect gradient

3. **Shadows** (CSS box-shadow format):
   - Card shadow
   - Hover shadow
   - Elegant shadow
   - Neon glow shadow
   - Glass shadow

4. **Theme Metadata**:
   - Theme name
   - Description
   - Style keywords
   - Mood/feeling

Return the response as a JSON object with this exact structure:
{{
  "name": "Theme Name",
  "description": "Brief description of the theme",
  "style": "modern|minimal|futuristic|vintage|colorful|dark|light",
  "mood": "professional|playful|elegant|bold|calm|energetic",
  "colors": {{
    "primary": {{ "hue": 193, "saturation": 100, "lightness": 50 }},
    "accent": {{ "hue": 271, "saturation": 100, "lightness": 65 }},
    "background": {{ "hue": 240, "saturation": 5, "lightness": 6 }},
    "foreground": {{ "hue": 0, "saturation": 0, "lightness": 98 }},
    "card": {{ "hue": 240, "saturation": 4, "lightness": 9 }},
    "muted": {{ "hue": 240, "saturation": 4, "lightness": 15 }},
    "border": {{ "hue": 240, "saturation": 4, "lightness": 15 }}
  }},
  "gradients": {{
    "primary": "linear-gradient(135deg, hsl(193 100% 50%), hsl(271 100% 65%))",
    "hero": "linear-gradient(135deg, hsl(240 5% 6%), hsl(193 100% 50%), hsl(271 100% 65%))",
    "card": "linear-gradient(145deg, hsl(240 4% 9%), hsl(240 4% 12%))",
    "neon": "linear-gradient(90deg, hsl(193 100% 50%), hsl(271 100% 65%), hsl(310 100% 60%))",
    "glass": "linear-gradient(135deg, hsl(0 0% 100% / 0.1), hsl(0 0% 100% / 0.05))"
  }},
  "shadows": {{
    "card": "0 8px 32px hsl(193 100% 50% / 0.15)",
    "cardHover": "0 16px 48px hsl(193 100% 50% / 0.25)",
    "elegant": "0 20px 60px hsl(193 100% 50% / 0.3)",
    "neon": "0 0 20px hsl(193 100% 50% / 0.5)",
    "glow": "0 0 40px hsl(271 100% 65% / 0.4)",
    "glass": "inset 0 1px 0 hsl(0 0% 100% / 0.1)"
  }}
}}

Make sure the colors are harmonious and work well together. Consider accessibility and contrast ratios.
`);

// Create the chain
const themeChain = themePrompt.pipe(llm).pipe(new StringOutputParser());

export interface GeneratedTheme {
  name: string;
  description: string;
  style: string;
  mood: string;
  colors: {
    primary: { hue: number; saturation: number; lightness: number };
    accent: { hue: number; saturation: number; lightness: number };
    background: { hue: number; saturation: number; lightness: number };
    foreground: { hue: number; saturation: number; lightness: number };
    card: { hue: number; saturation: number; lightness: number };
    muted: { hue: number; saturation: number; lightness: number };
    border: { hue: number; saturation: number; lightness: number };
  };
  gradients: {
    primary: string;
    hero: string;
    card: string;
    neon: string;
    glass: string;
  };
  shadows: {
    card: string;
    cardHover: string;
    elegant: string;
    neon: string;
    glow: string;
    glass: string;
  };
}

export class ThemeGenerator {
  static async generateTheme(description: string): Promise<GeneratedTheme> {
    try {
      const response = await themeChain.invoke({ description });
      
      // Parse the JSON response
      const themeData = JSON.parse(response);
      
      // Validate the theme data
      if (!this.validateTheme(themeData)) {
        throw new Error("Invalid theme data generated");
      }
      
      return themeData as GeneratedTheme;
    } catch (error) {
      console.error("Error generating theme:", error);
      throw new Error("Failed to generate theme. Please try again.");
    }
  }

  private static validateTheme(theme: any): boolean {
    return (
      theme &&
      theme.name &&
      theme.colors &&
      theme.gradients &&
      theme.shadows &&
      theme.colors.primary &&
      theme.colors.accent
    );
  }

  static async generateMultipleThemes(descriptions: string[]): Promise<GeneratedTheme[]> {
    const themes = await Promise.all(
      descriptions.map(desc => this.generateTheme(desc))
    );
    return themes;
  }

  static generateThemeVariations(baseTheme: GeneratedTheme): GeneratedTheme[] {
    const variations: GeneratedTheme[] = [];
    
    // Light variation
    const lightVariation = {
      ...baseTheme,
      name: `${baseTheme.name} - Light`,
      colors: {
        ...baseTheme.colors,
        background: { hue: baseTheme.colors.background.hue, saturation: 5, lightness: 95 },
        foreground: { hue: 0, saturation: 0, lightness: 10 },
        card: { hue: baseTheme.colors.background.hue, saturation: 5, lightness: 90 },
      }
    };
    variations.push(lightVariation);

    // Dark variation
    const darkVariation = {
      ...baseTheme,
      name: `${baseTheme.name} - Dark`,
      colors: {
        ...baseTheme.colors,
        background: { hue: baseTheme.colors.background.hue, saturation: 10, lightness: 5 },
        foreground: { hue: 0, saturation: 0, lightness: 95 },
        card: { hue: baseTheme.colors.background.hue, saturation: 10, lightness: 8 },
      }
    };
    variations.push(darkVariation);

    return variations;
  }
}
