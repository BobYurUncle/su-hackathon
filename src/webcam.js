import Webcam from "react-webcam";
import { useCallback, useRef, useState, useEffect } from "react";
import { geminiImageResponse } from "./ai/api-image-interface";

const CustomWebcam = ({onSearch}) => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);

    const [img64, setimg64] = useState('');
    const [triggerSearch, setTriggerSearch] = useState(false);

    useEffect(() => {
      if (triggerSearch) {
        async function getResponse() {
          const ai = await geminiImageResponse(img64);
          onSearch(ai);
          setimg64('');
        }
        getResponse();
        setTriggerSearch(false);
      }
      }, [triggerSearch, img64, onSearch]);
  

    // Function to resize while keeping aspect ratio
    const resizeImage = (imageSrc, maxWidth) => {
    return new Promise((resolve) => {
        const img = new Image();
        img.src = imageSrc;
        img.onload = () => {
          // Maintain aspect ratio
          const aspectRatio = img.width / img.height;
          const newWidth = maxWidth;
          const newHeight = newWidth / aspectRatio;
  
          const canvas = document.createElement("canvas");
          canvas.width = newWidth;
          canvas.height = newHeight;
          const ctx = canvas.getContext("2d");
  
          // Flip horizontally before drawing
          ctx.translate(newWidth, 0);
          ctx.scale(-1, 1);
          ctx.drawImage(img, 0, 0, newWidth, newHeight);
          
          const base64 = canvas.toDataURL()
          setimg64(base64)
          setTriggerSearch(true)
  
          // Convert to Blob and create a downloadable file
          canvas.toBlob((blob) => {
            if (blob) {
              const resizedFile = new File([blob], "resized_screenshot.jpeg", { type: "image/jpeg" });
              resolve(resizedFile);
            }
          }, "image/jpeg");
        };
      });
    };

  // Capture and resize function
  const capture = useCallback(async () => {
    if (webcamRef.current) {

      const imageSrc = webcamRef.current.getScreenshot();
      if (imageSrc) {
        const resizedFile = await resizeImage(imageSrc, 400); // Adjust dimensions if needed
        const fileUrl = URL.createObjectURL(resizedFile);
        setImgSrc(fileUrl);
        setDownloadUrl(fileUrl);
        console.log(resizedFile)

      }
    }
  }, [webcamRef]);

  // Retake function
  const retake = () => {
    setImgSrc(null);
    setDownloadUrl(null);
  };

  return (
    <div className="container" style={{ textAlign: "center", marginTop: "20px" }}>
      {imgSrc ? (
        <img src={imgSrc} alt="Captured Screenshot" style={{ width: "max-width", height: "max-height", borderRadius: "8px" }} />
      ) : (
        <Webcam 
            style={{ width: "400px", height: "max-height", borderRadius: "8px", transform: "scaleX(-1)", WebkitTransform: "scaleX(-1)" }} 
            ref={webcamRef} 
            screenshotFormat="image/jpeg" 
        />
      )}

      <div className="btn-container" style={{ marginTop: "10px" }}>
        {imgSrc ? (
          <>
            <button onClick={retake} style={buttonStyle}>Retake</button>
          </>
        ) : (
          <button onClick={capture} style={buttonStyle}>Capture</button>
        )}
      </div>
    </div>
  );
};

const buttonStyle = {
  padding: "10px 20px",
  fontSize: "16px",
  margin: "5px",
  cursor: "pointer",
  border: "none",
  borderRadius: "5px",
  backgroundColor: "#4e33d4",
  color: "white",
};

export default CustomWebcam;