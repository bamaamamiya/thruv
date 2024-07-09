import React, { useEffect } from 'react';

const OrderForm = () => {
  useEffect(() => {
    const loadScript = (src, id) => {
      return new Promise((resolve, reject) => {
        if (document.getElementById(id)) {
          resolve();
          return;
        }
        const script = document.createElement('script');
        script.src = src;
        script.async = true;
        script.id = id;
        script.onload = resolve;
        script.onerror = reject;
        document.body.appendChild(script);
      });
    };

    const loadOrderOnlineScripts = async () => {
      try {
        await loadScript('https://cdn.orderonline.id/js/vendor/jquery.min.js', 'oo-embed-jquery');
        await loadScript('https://cdn.orderonline.id/js/embed-v2-slim.min.js?v=8.0.2', 'oo-embed-js');

        if (typeof window.ooe !== 'function') {
          window.ooe = function () {
            window.ooe.callMethod ? window.ooe.callMethod.apply(window.ooe, arguments) : window.ooe.queue.push(arguments);
          };
          window.ooe.queue = [];
          window.ooe.loaded = true;
        }

        window.ooe('setup', 'redirect', 'https://thruvshop.orderonline.id');
        window.ooe('init', '666cb298b1eb0751550d4892', '668aac9df524ea15150edb70', null, 'oo-embed-form-gun-massager-alat-pijat-terapi-relaksasi-otot-4-in-1-4421', {
          mode: 'page',
          action: 'Klik untuk pemesanan',
          title: 'Form Pemesanan',
          triggerPixel: false,
          triggerGtm: false,
        });
      } catch (error) {
        console.error('Failed to load scripts', error);
      }
    };

    loadOrderOnlineScripts();
  }, []);

  return (
    <div className="ooef">
      <form className="orderonline-embed-form"
            data-username="thruvshop"
            data-product-slug="gun-massager-alat-pijat-terapi-relaksasi-otot-4-in-1"
            data-product-id="668aac9df524ea15150edb70"
            id="oo-embed-form-gun-massager-alat-pijat-terapi-relaksasi-otot-4-in-1-4421"
            data-origin="orderonline">
        <div className="ooef-loader">
          <style>{`
            .ooef-loader { visibility: hidden; opacity: 0; position: absolute; left: 0; right: 0; top: 0; bottom: 0; display: flex; justify-content: center; align-items: center; flex-direction: column; animation: ooLoadingIn 10s ease; -webkit-animation: ooLoadingIn 10s ease; animation-fill-mode: forwards; overflow: hidden }
            @keyframes ooLoadingIn { 0% { visibility: hidden; opacity: 0 } 20% { visibility: visible; opacity: 0 } 100% { visibility: visible; opacity: 1 } }
            @-webkit-keyframes ooLoadingIn { 0% { visibility: hidden; opacity: 0 } 20% { visibility: visible; opacity: 0 } 100% { visibility: visible; opacity: 1 } }
            .ooef-loader > div, .ooef-loader > div:after { border-radius: 50%; width: 2.5rem; height: 2.5rem }
            .ooef-loader > div { font-size: 10px; position: relative; text-indent: -9999em; border: .25rem solid #f5f5f5; border-left: .25rem solid #55c4cf; -webkit-transform: translateZ(0); -ms-transform: translateZ(0); transform: translateZ(0); -webkit-animation: ooLoading 1.1s infinite linear; animation: ooLoading 1.1s infinite linear }
            .ooef-loader.error > div { border-left: .25rem solid #ff4500; animation-duration: 5s }
            @-webkit-keyframes ooLoading { 0% { -webkit-transform: rotate(0); transform: rotate(0) } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg) } }
            @keyframes ooLoading { 0% { -webkit-transform: rotate(0); transform: rotate(0) } 100% { -webkit-transform: rotate(360deg); transform: rotate(360deg) } }
          `}</style>
          <div aria-live="polite" role="status"><div>Loading...</div></div>
        </div>
      </form>
    </div>
  );
};

export default OrderForm;
