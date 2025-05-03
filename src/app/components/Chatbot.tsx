'use client';

import { useEffect } from 'react';

const ChatBot: React.FC = () => {
  useEffect(() => {
    // Avoid re-injecting script
    if (document.getElementById('botpress-custom-script')) return;

    const script1 = document.createElement('script');
    script1.src = 'https://cdn.botpress.cloud/webchat/v2.4/inject.js';
    script1.async = true;
    script1.defer = true;

    const script2 = document.createElement('script');
    script2.src = 'https://files.bpcontent.cloud/2025/04/24/08/20250424085238-ZYOA422U.js';
    script2.async = true;
    script2.defer = true;
    script2.id = 'botpress-custom-script';

    // Load script1 first, then script2 after script1 is loaded
    script1.onload = () => {
      console.log('Botpress script loaded');
      
      // Initialize bot after Botpress script has loaded
      if (window.botpress) {
        window.botpress.init({
          "botId": "219f8862-0e99-4f1f-95a9-b93241df9422",
          "configuration": {
            "composerPlaceholder": "",
            "botName": "Genie",
            "botDescription": "The AI Assistant",
            "website": {},
            "email": {
              "title": "nandhininandhu5775@gmail.com",
              "link": "nandhininandhu5775@gmail.com"
            },
            "phone": {},
            "termsOfService": {},
            "privacyPolicy": {},
            "color": "#242323",
            "variant": "soft",
            "themeMode": "dark",
            "fontFamily": "inter",
            "radius": 1
          },
          "clientId": "87557cda-8c35-4681-8887-eb349d46825e"
        });
        console.log('Bot initialized');
      } else {
        console.error('Botpress is not available on window');
      }

      // Append the second script after the first script loads
      document.body.appendChild(script2);
    };

    script2.onload = () => {
      console.log('Custom bot script loaded');
    };

    script1.onerror = () => {
      console.error('Error loading Botpress script');
    };

    script2.onerror = () => {
      console.error('Error loading custom bot script');
    };

    document.body.appendChild(script1);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  return null;
};

export default ChatBot;
