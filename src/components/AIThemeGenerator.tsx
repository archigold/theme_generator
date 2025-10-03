import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Sparkles, Palette, Download, Wand2 } from 'lucide-react';
import { ThemeGenerator, type GeneratedTheme } from '@/lib/theme-generator';
import { ThemeBuilder } from '@/lib/theme-builder';
import { loadTheme } from '@/themes';

const AIThemeGenerator = () => {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedThemes, setGeneratedThemes] = useState<GeneratedTheme[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<GeneratedTheme | null>(null);

  const examplePrompts = [
    "A minimalist theme with soft pastels and clean lines",
    "A dark cyberpunk theme with neon green and purple accents",
    "A warm, cozy theme with earth tones and soft shadows",
    "A professional business theme with blue and gray colors",
    "A vibrant, energetic theme with bright colors and bold gradients",
    "A vintage retro theme with warm browns and gold accents"
  ];

  const handleGenerate = async () => {
    if (!description.trim()) {
      setError('Please enter a theme description');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const theme = await ThemeGenerator.generateTheme(description);
      setGeneratedThemes([theme]);
      setSelectedTheme(theme);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate theme');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleGenerateVariations = async () => {
    if (!selectedTheme) return;

    setIsGenerating(true);
    setError(null);

    try {
      const variations = ThemeGenerator.generateThemeVariations(selectedTheme);
      setGeneratedThemes(prev => [...prev, ...variations]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to generate variations');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleApplyTheme = async (theme: GeneratedTheme) => {
    try {
      const themeName = theme.name.toLowerCase().replace(/\s+/g, '-');
      await ThemeBuilder.buildTheme(theme, themeName);
      await loadTheme(themeName);
      setSelectedTheme(theme);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to apply theme');
    }
  };

  const handleExportTheme = (theme: GeneratedTheme) => {
    const themeData = {
      ...theme,
      exportedAt: new Date().toISOString(),
    };
    
    const blob = new Blob([JSON.stringify(themeData, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${theme.name.toLowerCase().replace(/\s+/g, '-')}-theme.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            AI Theme Generator
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Describe your ideal theme
            </label>
            <Textarea
              id="description"
              placeholder="e.g., A minimalist theme with soft pastels and clean lines..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="min-h-[100px]"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Example prompts:</label>
            <div className="flex flex-wrap gap-2">
              {examplePrompts.map((prompt, index) => (
                <Button
                  key={index}
                  variant="outline"
                  size="sm"
                  onClick={() => setDescription(prompt)}
                  className="text-xs"
                >
                  {prompt}
                </Button>
              ))}
            </div>
          </div>

          <Button
            onClick={handleGenerate}
            disabled={isGenerating || !description.trim()}
            className="w-full"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                Generating Theme...
              </>
            ) : (
              <>
                <Wand2 className="h-4 w-4 mr-2" />
                Generate Theme
              </>
            )}
          </Button>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {generatedThemes.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="h-5 w-5" />
              Generated Themes
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              {generatedThemes.map((theme, index) => (
                <Card
                  key={index}
                  className={`p-4 cursor-pointer transition-all ${
                    selectedTheme?.name === theme.name
                      ? 'ring-2 ring-primary bg-primary/5'
                      : 'hover:bg-muted/50'
                  }`}
                  onClick={() => setSelectedTheme(theme)}
                >
                  <div className="flex items-start justify-between">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold">{theme.name}</h3>
                        <Badge variant="secondary">{theme.style}</Badge>
                        <Badge variant="outline">{theme.mood}</Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{theme.description}</p>
                      
                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{
                              backgroundColor: `hsl(${theme.colors.primary.hue} ${theme.colors.primary.saturation}% ${theme.colors.primary.lightness}%)`
                            }}
                          />
                          Primary
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{
                              backgroundColor: `hsl(${theme.colors.accent.hue} ${theme.colors.accent.saturation}% ${theme.colors.accent.lightness}%)`
                            }}
                          />
                          Accent
                        </div>
                        <div className="flex items-center gap-1">
                          <div
                            className="w-4 h-4 rounded-full border"
                            style={{
                              backgroundColor: `hsl(${theme.colors.background.hue} ${theme.colors.background.saturation}% ${theme.colors.background.lightness}%)`
                            }}
                          />
                          Background
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleApplyTheme(theme);
                        }}
                        disabled={isGenerating}
                      >
                        Apply
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleExportTheme(theme);
                        }}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </Card>
              ))}
            </div>

            {selectedTheme && (
              <div className="pt-4 border-t">
                <Button
                  onClick={handleGenerateVariations}
                  disabled={isGenerating}
                  variant="outline"
                  className="w-full"
                >
                  {isGenerating ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Generating Variations...
                    </>
                  ) : (
                    <>
                      <Sparkles className="h-4 w-4 mr-2" />
                      Generate Variations
                    </>
                  )}
                </Button>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AIThemeGenerator;
