// Theme loader system for easy theme switching
// This allows you to swap themes without touching functionality

export interface Theme {
  name: string;
  description: string;
  version: string;
  author: string;
  styles: {
    variables: string;
    utilities: string;
  };
  config: {
    tailwind: any;
    theme: any;
  };
  components: {
    button: any;
    card: any;
    layout: any;
  };
}

export class ThemeLoader {
  private currentTheme: string = 'default';
  private themes: Map<string, Theme> = new Map();

  constructor() {
    this.loadTheme('default');
  }

  async loadTheme(themeName: string): Promise<void> {
    try {
      // Load theme configuration
      const themeConfig = await import(`./${themeName}/config/theme.json`);
      
      // Load theme styles
      const variablesCSS = await import(`./${themeName}/styles/variables.css?inline`);
      const utilitiesCSS = await import(`./${themeName}/styles/utilities.css?inline`);
      
      // Load component styles
      const buttonStyles = await import(`./${themeName}/components/button.styles.ts`);
      const cardStyles = await import(`./${themeName}/components/card.styles.ts`);
      const layoutStyles = await import(`./${themeName}/components/layout.styles.ts`);
      
      // Load Tailwind config
      const tailwindConfig = await import(`./${themeName}/config/tailwind.config.ts`);

      const theme: Theme = {
        name: themeConfig.default.name,
        description: themeConfig.default.description,
        version: themeConfig.default.version,
        author: themeConfig.default.author,
        styles: {
          variables: variablesCSS.default,
          utilities: utilitiesCSS.default,
        },
        config: {
          tailwind: tailwindConfig.defaultThemeConfig,
          theme: themeConfig.default,
        },
        components: {
          button: buttonStyles.buttonStyles,
          card: cardStyles.cardStyles,
          layout: layoutStyles.layoutStyles,
        },
      };

      this.themes.set(themeName, theme);
      this.currentTheme = themeName;
      
      // Apply theme to document
      this.applyTheme(theme);
      
      console.log(`Theme '${themeName}' loaded successfully`);
    } catch (error) {
      console.error(`Failed to load theme '${themeName}':`, error);
      throw error;
    }
  }

  private applyTheme(theme: Theme): void {
    // Remove existing theme styles
    this.removeExistingThemeStyles();
    
    // Add new theme styles
    this.addThemeStyles(theme);
    
    // Update Tailwind config (if needed)
    this.updateTailwindConfig(theme);
  }

  private removeExistingThemeStyles(): void {
    const existingStyles = document.querySelectorAll('[data-theme-style]');
    existingStyles.forEach(style => style.remove());
  }

  private addThemeStyles(theme: Theme): void {
    // Add variables CSS
    const variablesStyle = document.createElement('style');
    variablesStyle.setAttribute('data-theme-style', 'variables');
    variablesStyle.textContent = theme.styles.variables;
    document.head.appendChild(variablesStyle);

    // Add utilities CSS
    const utilitiesStyle = document.createElement('style');
    utilitiesStyle.setAttribute('data-theme-style', 'utilities');
    utilitiesStyle.textContent = theme.styles.utilities;
    document.head.appendChild(utilitiesStyle);
  }

  private updateTailwindConfig(theme: Theme): void {
    // This would typically involve updating the Tailwind config at build time
    // For now, we'll just log that the config should be updated
    console.log('Tailwind config should be updated with:', theme.config.tailwind);
  }

  getCurrentTheme(): string {
    return this.currentTheme;
  }

  getAvailableThemes(): string[] {
    return Array.from(this.themes.keys());
  }

  getTheme(themeName: string): Theme | undefined {
    return this.themes.get(themeName);
  }

  // Method to create a new theme from the current one
  async createThemeFromCurrent(newThemeName: string, modifications: Partial<Theme>): Promise<void> {
    const currentTheme = this.getTheme(this.currentTheme);
    if (!currentTheme) {
      throw new Error('No current theme to copy from');
    }

    // Create new theme based on current with modifications
    const newTheme: Theme = {
      ...currentTheme,
      ...modifications,
      name: newThemeName,
    };

    this.themes.set(newThemeName, newTheme);
    console.log(`New theme '${newThemeName}' created from current theme`);
  }
}

// Export singleton instance
export const themeLoader = new ThemeLoader();

// Export utility functions
export const loadTheme = (themeName: string) => themeLoader.loadTheme(themeName);
export const getCurrentTheme = () => themeLoader.getCurrentTheme();
export const getAvailableThemes = () => themeLoader.getAvailableThemes();
export const createTheme = (name: string, modifications: Partial<Theme>) => 
  themeLoader.createThemeFromCurrent(name, modifications);
