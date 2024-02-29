import { useRef } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export const Captcha = () => {
  return (
    <ReCAPTCHA
    //   ref={recaptchaRef}
      sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
      onChange={(e) => console.log(e)}
    />
  );
};
