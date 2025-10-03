import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Palette, Sparkles, Settings, Download, Upload } from 'lucide-react';
// import AIThemeGenerator from '@/components/AIThemeGenerator';
// import ThemeSwitcher from '@/components/ThemeSwitcher';
// import { getCurrentTheme, getAvailableThemes } from '@/themes';

const ThemeStudio = () => {
  const [currentTheme, setCurrentTheme] = useState('default');
  const [availableThemes, setAvailableThemes] = useState(['default']);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-neon bg-clip-text text-transparent">
                Theme Studio
              </h1>
              <p className="text-muted-foreground mt-2">
                Create, customize, and manage your store's visual identity with AI
              </p>
            </div>
            <div className="flex items-center gap-4">
              {/* <ThemeSwitcher /> */}
              <Badge variant="secondary" className="px-3 py-1">
                Current: {currentTheme}
              </Badge>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="generator" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="generator" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Generator
            </TabsTrigger>
            <TabsTrigger value="customize" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              Customize
            </TabsTrigger>
            <TabsTrigger value="themes" className="flex items-center gap-2">
              <Settings className="h-4 w-4" />
              Manage Themes
            </TabsTrigger>
            <TabsTrigger value="import" className="flex items-center gap-2">
              <Download className="h-4 w-4" />
              Import/Export
            </TabsTrigger>
          </TabsList>

          <TabsContent value="generator" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>AI Theme Generator</CardTitle>
              </CardHeader>
              <CardContent>
                <p>AI Theme Generator is temporarily disabled for debugging.</p>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="customize" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Palette className="h-5 w-5" />
                  Manual Theme Customization
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center py-12">
                  <Palette className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Coming Soon</h3>
                  <p className="text-muted-foreground">
                    Manual theme customization tools will be available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="themes" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Settings className="h-5 w-5" />
                  Theme Management
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2">Available Themes</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {availableThemes.map((theme) => (
                        <Card
                          key={theme}
                          className={`p-4 cursor-pointer transition-all ${
                            theme === currentTheme
                              ? 'ring-2 ring-primary bg-primary/5'
                              : 'hover:bg-muted/50'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <div>
                              <h5 className="font-medium">{theme}</h5>
                              <p className="text-sm text-muted-foreground">
                                {theme === 'default' ? 'Futuristic tech store theme' : 'Custom theme'}
                              </p>
                            </div>
                            {theme === currentTheme && (
                              <Badge variant="default">Active</Badge>
                            )}
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="import" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Download className="h-5 w-5" />
                  Import & Export Themes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Export Theme</h4>
                      <p className="text-sm text-muted-foreground">
                        Export your current theme as a JSON file to share or backup.
                      </p>
                      <Button className="w-full">
                        <Download className="h-4 w-4 mr-2" />
                        Export Current Theme
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      <h4 className="font-medium">Import Theme</h4>
                      <p className="text-sm text-muted-foreground">
                        Import a theme from a JSON file to use in your store.
                      </p>
                      <Button variant="outline" className="w-full">
                        <Upload className="h-4 w-4 mr-2" />
                        Import Theme File
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Footer Info */}
        <Card className="mt-8">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <h4 className="font-medium">Theme System Features</h4>
              <div className="flex flex-wrap justify-center gap-4 text-sm text-muted-foreground">
                <span>• AI-powered theme generation</span>
                <span>• Real-time theme switching</span>
                <span>• Complete style separation</span>
                <span>• Export/import themes</span>
                <span>• LangChain integration</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ThemeStudio;
