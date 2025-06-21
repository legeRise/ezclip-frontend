import { useEffect, useRef, useState } from "react";

const BannerAd = () => {
  const adRef = useRef(null);
  const [visible, setVisible] = useState(true); // in-memory only

  useEffect(() => {
    if (visible && adRef.current) {
      const script1 = document.createElement("script");
      script1.type = "text/javascript";
      script1.innerHTML = `
        atOptions = {
          'key' : 'e5be4c3180022e928814241d4c7667c8',
          'format' : 'iframe',
          'height' : 50,
          'width' : 320,
          'params' : {}
        };
      `;
      adRef.current.appendChild(script1);

      const script2 = document.createElement("script");
      script2.type = "text/javascript";
      script2.src = "//www.highperformanceformat.com/e5be4c3180022e928814241d4c7667c8/invoke.js";
      adRef.current.appendChild(script2);
    }
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="relative w-full max-w-[320px] h-[50px] mx-auto flex items-center justify-center border border-gray-300 rounded-md overflow-hidden shadow-sm">
      <div ref={adRef} className="w-full h-full" />
      <button
        onClick={() => setVisible(false)}
        className="absolute top-1 right-1 bg-white border border-gray-300 rounded-full w-6 h-6 flex items-center justify-center shadow hover:bg-red-100 hover:text-red-500 transition group"
        aria-label="Close ad"
        style={{ lineHeight: 0, padding: 0 }}
      >
        <svg
          className="w-4 h-4 group-hover:scale-125 transition-transform"
          viewBox="0 0 20 20"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <line x1="5" y1="5" x2="15" y2="15" stroke="currentColor" strokeLinecap="round" />
          <line x1="15" y1="5" x2="5" y2="15" stroke="currentColor" strokeLinecap="round" />
        </svg>
      </button>
    </div>
  );
};

export default BannerAd;
