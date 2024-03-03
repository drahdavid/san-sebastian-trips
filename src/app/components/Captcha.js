import ReCAPTCHA from "react-google-recaptcha";

export const Captcha = ({ setCaptcha }) => {
  const siteKey =
    process.env.NODE_ENV === "development"
      ? process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY_DEVELOP
      : process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY;

  return <ReCAPTCHA sitekey={siteKey} onChange={(e) => setCaptcha(e)} />;
};
