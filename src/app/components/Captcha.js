import ReCAPTCHA from "react-google-recaptcha";

export const Captcha = ({ setCaptcha }) => {
  return (
    <ReCAPTCHA
      sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY}
      onChange={(e) => setCaptcha(e)}
    />
  );
};
