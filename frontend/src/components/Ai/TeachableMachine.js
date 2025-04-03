// // import React, { useState, useRef, useEffect } from "react";
// // import * as tmImage from "@teachablemachine/image";

// // const TeachableMachine = () => {
// //   const modelURL = "https://teachablemachine.withgoogle.com/models/hMnNpCsrd/" // Change this
// //   const [label, setLabel] = useState("Click Start to Detect");
// //   const webcamRef = useRef(null);
// //   let model, webcam, maxPredictions;

// //   useEffect(() => {
// //     return () => {
// //       if (webcam) {
// //         webcam.stop();
// //       }
// //     };
// //   }, []);

// //   const init = async () => {
// //     try {
// //       const modelJson = modelURL + "model.json";
// //       const metadataJson = modelURL + "metadata.json";

// //       // Load the model
// //       model = await tmImage.load(modelJson, metadataJson);
// //       maxPredictions = model.getTotalClasses();

// //       // Setup webcam
// //       const flip = true;
// //       webcam = new tmImage.Webcam(300, 300, flip);
// //       await webcam.setup();
// //       await webcam.play();
// //       window.requestAnimationFrame(loop);

// //       // Attach webcam to DOM
// //       if (webcamRef.current) {
// //         webcamRef.current.innerHTML = "";
// //         webcamRef.current.appendChild(webcam.canvas);
// //       }
// //     } catch (error) {
// //       console.error("Error initializing model:", error);
// //     }
// //   };

// //   const loop = async () => {
// //     webcam.update();
// //     await predict();
// //     window.requestAnimationFrame(loop);
// //   };

// //   const predict = async () => {
// //     const prediction = await model.predict(webcam.canvas);
// //     let bestPrediction = prediction.reduce((prev, current) =>
// //       prev.probability > current.probability ? prev : current
// //     );
// //     setLabel(`${bestPrediction.className}: ${(bestPrediction.probability * 100).toFixed(2)}%`);
// //   };

// //   return (
// //     <div>
// //       <h2>Plant Disease Detection</h2>
// //       <button onClick={init}>Start Detection</button>
// //       <div ref={webcamRef} id="webcam-container"></div>
// //       <div id="label-container">{label}</div>
// //     </div>
// //   );
// // };

// // export default TeachableMachine;


// import React, { useState, useRef, useEffect } from "react";
// import * as tmImage from "@teachablemachine/image";

// const TeachableMachine = () => {
//   const modelURL = "https://teachablemachine.withgoogle.com/models/hMnNpCsrd/"; // Correct URL
//   const [label, setLabel] = useState("Click Start to Detect");
//   const webcamRef = useRef(null);
//   const modelRef = useRef(null);  // Store model
//   const webcamInstance = useRef(null); // Store webcam instance

//   useEffect(() => {
//     return () => {
//       if (webcamInstance.current) {
//         webcamInstance.current.stop(); // Stop webcam on unmount
//       }
//     };
//   }, []);

//   const init = async () => {
//     try {
//       const modelJson = modelURL + "model.json";
//       const metadataJson = modelURL + "metadata.json";

//       // Load the model and store in ref
//       modelRef.current = await tmImage.load(modelJson, metadataJson);
//       const maxPredictions = modelRef.current.getTotalClasses();

//       // Setup webcam and store in ref
//       const flip = true;
//       webcamInstance.current = new tmImage.Webcam(300, 300, flip);
//       await webcamInstance.current.setup();
//       await webcamInstance.current.play();
//       window.requestAnimationFrame(loop);

//       // Attach webcam to DOM
//       if (webcamRef.current) {
//         webcamRef.current.innerHTML = "";
//         webcamRef.current.appendChild(webcamInstance.current.canvas);
//       }
//     } catch (error) {
//       console.error("Error initializing model:", error);
//     }
//   };

//   const loop = async () => {
//     if (!webcamInstance.current || !modelRef.current) return;
    
//     webcamInstance.current.update();
//     await predict();
//     window.requestAnimationFrame(loop);
//   };

//   const predict = async () => {
//     if (!modelRef.current || !webcamInstance.current) return;

//     const prediction = await modelRef.current.predict(webcamInstance.current.canvas);
//     let bestPrediction = prediction.reduce((prev, current) =>
//       prev.probability > current.probability ? prev : current
//     );
//     setLabel(`${bestPrediction.className}: ${(bestPrediction.probability * 100).toFixed(2)}%`);
//   };

//   return (
//     <div>
//       <h2>Plant Disease Detection</h2>
//       <button onClick={init}>Start Detection</button>
//       <div ref={webcamRef} id="webcam-container"></div>
//       <div id="label-container">{label}</div>
//     </div>
//   );
// };

// export default TeachableMachine;


import React, { useState, useRef, useEffect } from "react";
import * as tmImage from "@teachablemachine/image";

const TeachableMachine = () => {
  const modelURL = "https://teachablemachine.withgoogle.com/models/hMnNpCsrd/";
  const [label, setLabel] = useState("Click Start to Detect");
  const webcamRef = useRef(null);
  const modelRef = useRef(null);
  const webcamInstance = useRef(null);

  useEffect(() => {
    return () => {
      if (webcamInstance.current) {
        webcamInstance.current.stop();
      }
    };
  }, []);

  const init = async () => {
    try {
      const modelJson = modelURL + "model.json";
      const metadataJson = modelURL + "metadata.json";

      modelRef.current = await tmImage.load(modelJson, metadataJson);

      const flip = true;
      webcamInstance.current = new tmImage.Webcam(300, 300, flip);
      await webcamInstance.current.setup();
      await webcamInstance.current.play();
      window.requestAnimationFrame(loop);

      if (webcamRef.current) {
        webcamRef.current.innerHTML = "";
        webcamRef.current.appendChild(webcamInstance.current.canvas);
      }
    } catch (error) {
      console.error("Error initializing model:", error);
    }
  };

  const loop = async () => {
    if (!webcamInstance.current || !modelRef.current) return;
    webcamInstance.current.update();
    await predict();
    window.requestAnimationFrame(loop);
  };

  const predict = async () => {
    if (!modelRef.current || !webcamInstance.current) return;

    const prediction = await modelRef.current.predict(webcamInstance.current.canvas);
    let filteredPredictions = prediction
      .filter(p => p.probability > 0.1)
      .map(p => `${p.className}: ${(p.probability * 100).toFixed(2)}%`);

    setLabel(filteredPredictions.length ? filteredPredictions.join("<br>") : "No strong prediction");
  };

  return (
    <div>
      <h2>Plant Disease Detection</h2>
      <button onClick={init}>Start Detection</button>
      <div ref={webcamRef} id="webcam-container"></div>
      <div id="label-container" dangerouslySetInnerHTML={{ __html: label }}></div>
    </div>
  );
};

export default TeachableMachine;
