"use client"
import { useEffect, useState } from 'react';

const Captcha = () => {
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    const loadScript = () => {
      const script = document.createElement('script');
      script.src = "https://b82b1763d1c3.eu-west-3.captcha-sdk.awswaf.com/b82b1763d1c3/jsapi.js";
      script.type = "text/javascript";
      script.defer = true;
      script.onload = () => setScriptLoaded(true);
      document.head.appendChild(script);
    };

    if (typeof window !== 'undefined' && !scriptLoaded) {
      loadScript();
    }
  }, [scriptLoaded]);

  useEffect(() => {
    if (scriptLoaded && typeof window !== 'undefined' && window.AwsWafCaptcha) {
      window.showMyCaptcha = function () {
        var container = document.querySelector("#my-captcha-container");

        window.AwsWafCaptcha.renderCaptcha(container, {
          apiKey: process.env.NEXT_PUBLIC_WAF_API_KEY,
          onSuccess: captchaExampleSuccessFunction,
          onError: captchaExampleErrorFunction,
        });
      };

      window.captchaExampleSuccessFunction = function (wafToken) {
        // Handle success
      };

      window.captchaExampleErrorFunction = function (error) {
        // Handle error
      };
    }
  }, [scriptLoaded]);

  return (
    <div>
      <div id="my-captcha-container">
        {/* The contents of this container will be replaced by the captcha widget */}
      </div>
      <button onClick={() => window.showMyCaptcha && window.showMyCaptcha()}>Show CAPTCHA</button>
    </div>
  );
};

export default Captcha;
