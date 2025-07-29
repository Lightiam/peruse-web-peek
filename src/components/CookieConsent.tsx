import React, { useState, useEffect } from 'react';
import { X, Cookie, Settings, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Switch } from '@/components/ui/switch';
import { Link } from 'react-router-dom';

interface CookiePreferences {
  essential: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
}

const CookieConsent = () => {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [preferences, setPreferences] = useState<CookiePreferences>({
    essential: true, // Always true, cannot be disabled
    functional: false,
    analytics: false,
    marketing: false,
  });

  useEffect(() => {
    // Check if user has already made cookie choices
    const cookieConsent = localStorage.getItem('cookieConsent');
    if (!cookieConsent) {
      // Show banner after a short delay for better UX
      const timer = setTimeout(() => setShowBanner(true), 2000);
      return () => clearTimeout(timer);
    } else {
      // Load saved preferences
      try {
        const savedPreferences = JSON.parse(cookieConsent);
        setPreferences(prev => ({ ...prev, ...savedPreferences }));
      } catch (error) {
        console.error('Error loading cookie preferences:', error);
      }
    }
  }, []);

  const savePreferences = (prefs: CookiePreferences) => {
    localStorage.setItem('cookieConsent', JSON.stringify(prefs));
    localStorage.setItem('cookieConsentDate', new Date().toISOString());
    
    // Set cookies based on preferences
    if (prefs.analytics) {
      // Enable analytics tracking (e.g., Google Analytics)
      console.log('Analytics cookies enabled');
    }
    
    if (prefs.marketing) {
      // Enable marketing cookies
      console.log('Marketing cookies enabled');
    }
    
    if (prefs.functional) {
      // Enable functional cookies
      console.log('Functional cookies enabled');
    }
    
    setPreferences(prefs);
  };

  const acceptAll = () => {
    const allAccepted = {
      essential: true,
      functional: true,
      analytics: true,
      marketing: true,
    };
    savePreferences(allAccepted);
    setShowBanner(false);
  };

  const acceptEssential = () => {
    const essentialOnly = {
      essential: true,
      functional: false,
      analytics: false,
      marketing: false,
    };
    savePreferences(essentialOnly);
    setShowBanner(false);
  };

  const saveCustomPreferences = () => {
    savePreferences(preferences);
    setShowSettings(false);
    setShowBanner(false);
  };

  const updatePreference = (key: keyof CookiePreferences, value: boolean) => {
    if (key === 'essential') return; // Essential cookies cannot be disabled
    setPreferences(prev => ({ ...prev, [key]: value }));
  };

  if (!showBanner) return null;

  return (
    <>
      {/* Cookie Consent Banner */}
      <div className="fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-t border-gray-200 shadow-2xl z-50 animate-slide-in-bottom">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
            {/* Cookie Icon and Message */}
            <div className="flex items-start gap-3 flex-1">
              <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-full p-2 shrink-0">
                <Cookie className="w-5 h-5 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-gray-900 mb-2">
                  We use cookies to enhance your experience
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed">
                  We use essential cookies for website functionality and optional cookies to personalize content, 
                  analyze traffic, and improve our services. You can customize your preferences or accept all cookies.
                </p>
                <div className="flex items-center gap-4 mt-3 text-xs text-gray-500">
                  <Link 
                    to="/privacy-policy" 
                    className="hover:text-purple-600 transition-colors underline"
                  >
                    Privacy Policy
                  </Link>
                  <Link 
                    to="/cookie-policy" 
                    className="hover:text-purple-600 transition-colors underline"
                  >
                    Cookie Policy
                  </Link>
                </div>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setShowSettings(true)}
                className="flex items-center gap-2 order-2 sm:order-1"
              >
                <Settings className="w-4 h-4" />
                Customize
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={acceptEssential}
                className="order-3 sm:order-2"
              >
                Essential Only
              </Button>
              <Button
                size="sm"
                onClick={acceptAll}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 order-1 sm:order-3"
              >
                <Check className="w-4 h-4 mr-2" />
                Accept All
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Cookie Settings Dialog */}
      <Dialog open={showSettings} onOpenChange={setShowSettings}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Cookie className="w-5 h-5 text-purple-600" />
              Cookie Preferences
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <p className="text-sm text-gray-600">
              Manage your cookie preferences below. Essential cookies cannot be disabled as they are 
              necessary for the website to function properly.
            </p>

            {/* Essential Cookies */}
            <div className="border rounded-lg p-4 bg-green-50">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-green-800">Essential Cookies</h3>
                <Switch checked={true} disabled className="opacity-50" />
              </div>
              <p className="text-sm text-green-700 mb-2">
                These cookies are necessary for the website to function and cannot be switched off.
              </p>
              <ul className="text-xs text-green-600 space-y-1">
                <li>• Authentication and security</li>
                <li>• Session management</li>
                <li>• Load balancing</li>
              </ul>
            </div>

            {/* Functional Cookies */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Functional Cookies</h3>
                <Switch 
                  checked={preferences.functional}
                  onCheckedChange={(checked) => updatePreference('functional', checked)}
                />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                These cookies enable enhanced functionality and personalization features.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Language preferences</li>
                <li>• Theme settings</li>
                <li>• Recently viewed items</li>
              </ul>
            </div>

            {/* Analytics Cookies */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Analytics Cookies</h3>
                <Switch 
                  checked={preferences.analytics}
                  onCheckedChange={(checked) => updatePreference('analytics', checked)}
                />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                These cookies help us understand how visitors interact with our website.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Google Analytics (anonymized)</li>
                <li>• Page views and user journeys</li>
                <li>• Performance monitoring</li>
              </ul>
            </div>

            {/* Marketing Cookies */}
            <div className="border rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-800">Marketing Cookies</h3>
                <Switch 
                  checked={preferences.marketing}
                  onCheckedChange={(checked) => updatePreference('marketing', checked)}
                />
              </div>
              <p className="text-sm text-gray-600 mb-2">
                These cookies are used to deliver relevant advertisements and track campaign effectiveness.
              </p>
              <ul className="text-xs text-gray-500 space-y-1">
                <li>• Social media integration</li>
                <li>• Advertising campaign tracking</li>
                <li>• Remarketing and retargeting</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex justify-end gap-3 pt-4 border-t">
              <Button variant="outline" onClick={() => setShowSettings(false)}>
                Cancel
              </Button>
              <Button 
                onClick={saveCustomPreferences}
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
              >
                Save Preferences
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CookieConsent;