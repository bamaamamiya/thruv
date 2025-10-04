import { useEffect } from "react";

const MengantarForm = ({ url = "" }) => {
  useEffect(() => {
    // Load script external sekali
    const script = document.createElement("script");
    script.src = "https://thruvshop.form.id/app.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return (
    <>
      {/* Load CSS external */}
      <link
        href="https://thruvshop.form.id/css/app.css"
        rel="stylesheet"
      />

      {/* Widget */}
      <mengantar-form-widget
        id="mengantar-form-widget"
        url={url}
        domain="thruvshop.form.id"
        embed="true"
        settings={JSON.stringify({
          type: "page",
          popupButtonText: "Klik untuk pemesanan",
          popupText: "Form Pemesanan",
          popupButtonColor: "#2e47ba",
          redirectTo: "https://thruvshop.form.id",
          isFbPixel: "true",
          isHideBackground: "true",
          isNoMargin: "false",
          isGtm: "true",
        })}
      ></mengantar-form-widget>

      {/* Custom CSS */}
      <style>
        {`
          #app { background-color:transparent !important; text-align:left; }
          .embed-sealHide, .embed-leftHide, .bottom-bar-text { display:none !important; }
          .embed-rightHide { flex: 0 0 100% !important; width: 100% !important; max-width:100% !important; margin:auto; }
          .embed-bgHide { box-shadow:none !important; background:transparent; border:none !important; padding:1px 20px !important; margin:0; }
          .embed-topSpace { margin:auto !important; }
          .embed-wrapper { height:auto !important; overflow:initial !important; }
          .embed-notopMargin { margin:0 !important; }
          .embed-gap { gap:10px !important; }
        `}
      </style>
    </>
  );
};

export default MengantarForm;
