import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ExternalLink, Key } from 'lucide-react';

interface TokenInputProps {
  onTokenSubmit: (token: string) => void;
}

const TokenInput = ({ onTokenSubmit }: TokenInputProps) => {
  const [token, setToken] = useState('');

  const handleSubmit = () => {
    if (token.trim()) {
      onTokenSubmit(token.trim());
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md bg-gradient-meme border-electric/30 shadow-meme">
        <CardHeader className="text-center space-y-4">
          <div className="w-16 h-16 mx-auto bg-gradient-electric rounded-full flex items-center justify-center shadow-glow-electric">
            <Key className="w-8 h-8 text-background" />
          </div>
          <CardTitle className="text-2xl bg-gradient-electric bg-clip-text text-transparent">
            Meme Map
          </CardTitle>
          <p className="text-muted-foreground text-sm">
            Enter your Mapbox public token to start roasting locations
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Mapbox Public Token</label>
            <Input
              type="password"
              placeholder="pk.eyJ1IjoieW91cnVzZXJuYW1lIi..."
              value={token}
              onChange={(e) => setToken(e.target.value)}
              className="bg-secondary/50 border-electric/30 focus:border-electric focus:shadow-glow-electric"
              onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            />
          </div>

          <Button 
            onClick={handleSubmit}
            disabled={!token.trim()}
            className="w-full bg-gradient-electric hover:shadow-glow-electric transition-all duration-300"
          >
            Start Exploring
          </Button>

          <div className="text-center space-y-2">
            <p className="text-xs text-muted-foreground">
              Don't have a token?
            </p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.open('https://mapbox.com/', '_blank')}
              className="text-cyber hover:text-cyber-glow"
            >
              <ExternalLink className="w-3 h-3 mr-1" />
              Get one from Mapbox
            </Button>
          </div>

          <div className="text-xs text-muted-foreground text-center space-y-1">
            <p>Your token is stored locally and never shared.</p>
            <p>Need help? Check the Tokens section in your Mapbox dashboard.</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TokenInput;