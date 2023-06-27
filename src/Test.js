// import React, { useEffect, useRef } from "react";
// import gsap from "gsap";
// import ScrollTrigger from "gsap/ScrollTrigger";
// import "../Styles/video.css";

// const Test = () => {
//   const videoRef = useRef(null);
//   const containerRef = useRef(null);

//   useEffect(() => {
//     window.scrollTo(0, 0);

//     gsap.registerPlugin(ScrollTrigger);

//     const video = videoRef.current;

//     const once = (el, event, fn, opts) => {
//       var onceFn = function (e) {
//         el.removeEventListener(event, onceFn);
//         fn.apply(this, arguments);
//       };
//       el.addEventListener(event, onceFn, opts);
//       return onceFn;
//     };

//     const playVideo = () => {
//       video.play();
//       video.pause();
//     };

//     const handleLoadedMetadata = () => {
//       const tl = gsap.timeline({
//         defaults: { duration: 1 },
//         scrollTrigger: {
//           trigger: containerRef.current,
//           start: "top top",
//           end: "bottom bottom",
//           scrub: true,
//           onEnter: () => {
//             playVideo();
//           },
//         },
//       });

//       gsap.set(video, {
//         currentTime: 0,
//       });

//       tl.fromTo(
//         video,
//         {
//           currentTime: 0,
//         },
//         {
//           currentTime: video.duration || 1,
//         }
//       );
//     };

//     once(document.documentElement, "touchstart", playVideo);

//     setTimeout(() => {
//       if (window["fetch"]) {
//         fetch(video.src)
//           .then((response) => response.blob())
//           .then((response) => {
//             var blobURL = URL.createObjectURL(response);
//             var t = video.currentTime;
//             once(document.documentElement, "touchstart", playVideo);
//             video.setAttribute("src", blobURL);
//             video.currentTime = t + 0.01;
//           });
//       }
//     }, 1000);

//     video.addEventListener("loadedmetadata", handleLoadedMetadata);

//     return () => {
//       video.removeEventListener("loadedmetadata", handleLoadedMetadata);
//     };
//   }, []);

//   return (
//     <div
//       id="container"
//       ref={containerRef}
//       style={{
//         height: "1000vh",
//       }}
//     >
//       <video
//         ref={videoRef}
//         src={videoSrc}
//         // src="https://assets.codepen.io/39255/output_960.mp4"
//         playsInline
//         preload="auto"
//         muted
//         className="video-background"
//         style={{
//           width: "800px",
//           position: "fixed",
//           inset: "50%",
//         }}
//       ></video>
//     </div>
//   );
// };

// export default Test;

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

const Test = () => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const video = videoRef.current;
    const src = video.currentSrc || video.src;

    const once = (el, event, fn, opts) => {
      var onceFn = function (e) {
        el.removeEventListener(event, onceFn);
        fn.apply(this, arguments);
      };
      el.addEventListener(event, onceFn, opts);
      return onceFn;
    };

    once(document.documentElement, "touchstart", function (e) {
      video.play();
      video.pause();
    });

    let tl = gsap.timeline({
      defaults: { duration: 1 },
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1
      }
    });

    once(video, "loadedmetadata", () => {
      tl.fromTo(
        video,
        {
          currentTime: 0
        },
        {
          currentTime: video.duration || 1
        }
      );
    });

    setTimeout(() => {
      if (window["fetch"]) {
        fetch(src)
          .then((response) => response.blob())
          .then((response) => {
            var blobURL = URL.createObjectURL(response);

            var t = video.currentTime;
            once(document.documentElement, "touchstart", function (e) {
              video.play();
              video.pause();
            });

            video.setAttribute("src", blobURL);
            video.currentTime = parseFloat(t).toPrecision(3);
          });
      }
    }, 1000);

    return () => {
      // Clean up event listeners or animations if needed
    };
  }, []);

  return (
    <div
      id="container"
      ref={containerRef}
      style={{
        height: "1000vh"
      }}
    >
      <video
        ref={videoRef}
        // src={videoSrc}
        src="https://res.cloudinary.com/alistairheusbucket/video/upload/v1687846064/challenges_1_1_ck740h.mp4"
        playsInline
        preload="auto"
        muted
        className="video-background"
        style={{
          width: "100%",
          position: "fixed"
        }}
      ></video>
    </div>
  );
};

export default Test;
