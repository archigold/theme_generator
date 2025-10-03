import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Palette, Check, Download, Upload } from 'lucide-react';
import { loadTheme, getCurrentTheme, getAvailableThemes, createTheme, type Theme } from '@/themes';

const ThemeSwitcher = () => {
  const [currentTheme, setCurrentTheme] = useState<string>('default');
  const [availableThemes, setAvailableThemes] = useState<string[]>(['default']);
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setCurrentTheme(getCurrentTheme());
    setAvailableThemes(getAvailableThemes());
  }, []);

  const handleThemeChange = async (themeName: string) => {
    try {
      await loadTheme(themeName);
      setCurrentTheme(themeName);
      setIsOpen(false);
    } catch (error) {
      console.error('Failed to load theme:', error);
    }
  };

  const handleCreateTheme = async () => {
    const themeName = prompt('Enter theme name:');
    if (themeName) {
      try {
        await createTheme(themeName, {
          name: themeName,
          description: `Custom theme based on ${currentTheme}`,
          version: '1.0.0',
          author: 'User',
        });
        setAvailableThemes(getAvailableThemes());
      } catch (error) {
        console.error('Failed to create theme:', error);
      }
    }
  };

  const handleExportTheme = () => {
    const themeData = {
      name: currentTheme,
      timestamp: new Date().toISOString(),
      // Add more theme data here
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${currentTheme}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleImportTheme = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const themeData = JSON.parse(e.target?.result as string);
            console.log('Imported theme:', themeData);
            // Implement theme import logic here
          } catch (error) {
            console.error('Failed to parse theme file:', error);
          }
        };
        reader.readAsText(file);
      }
    };
    input.click();
  };

  return (
    <div className="relative">
      <Button
        variant="outline"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2"
      >
        <Palette className="h-4 w-4" />
        Theme
        <Badge variant="secondary" className="ml-1">
          {currentTheme}
        </Badge>
      </Button>

      {isOpen && (
        <Card className="absolute top-full right-0 mt-2 w-80 z-50 shadow-elegant">
          <CardHeader className="pb-3">
            <CardTitle className="text-lg flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Theme Switcher
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Available Themes */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Available Themes</h4>
              <div className="space-y-1">
                {availableThemes.map((theme) => (
                  <Button
                    key={theme}
                    variant={theme === currentTheme ? "default" : "ghost"}
                    size="sm"
                    onClick={() => handleThemeChange(theme)}
                    className="w-full justify-start"
                  >
                    {theme === currentTheme && <Check className="h-4 w-4 mr-2" />}
                    {theme}
                    {theme === currentTheme && (
                      <Badge variant="secondary" className="ml-auto">
                        Active
                      </Badge>
                    )}
                  </Button>
                ))}
              </div>
            </div>

            {/* Theme Actions */}
            <div className="space-y-2">
              <h4 className="text-sm font-medium text-muted-foreground">Theme Actions</h4>
              <div className="grid grid-cols-2 gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCreateTheme}
                  className="flex items-center gap-2"
                >
                  <Download className="h-4 w-4" />
                  Create
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleExportTheme}
                  className="flex items-center gap-2"
                >
                  <Upload className="h-4 w-4" />
                  Export
                </Button>
              </div>
            </div>

            {/* Theme Info */}
            <div className="pt-2 border-t border-border">
              <p className="text-xs text-muted-foreground">
                Current theme: <span className="font-medium">{currentTheme}</span>
              </p>
              <p className="text-xs text-muted-foreground">
                Themes are stored in <code>src/themes/</code>
              </p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default ThemeSwitcher;
