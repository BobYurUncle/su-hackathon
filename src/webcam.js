import Webcam from "react-webcam";
import { useCallback, useRef, useState } from "react";

const CustomWebcam = () => {
    const webcamRef = useRef(null);
    const [imgSrc, setImgSrc] = useState(null);
    const [downloadUrl, setDownloadUrl] = useState(null);
  
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
        const resizedFile = await resizeImage(imageSrc, 500); // Adjust dimensions if needed
        const fileUrl = URL.createObjectURL(resizedFile);
        setImgSrc(fileUrl);
        setDownloadUrl(fileUrl);
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
            style={{ width: "500px", height: "max-height", borderRadius: "8px", transform: "scaleX(-1)", WebkitTransform: "scaleX(-1)" }} 
            ref={webcamRef} 
            screenshotFormat="image/jpeg" 
        />
      )}

      <div className="btn-container" style={{ marginTop: "10px" }}>
        {imgSrc ? (
          <>
            <button onClick={retake} style={buttonStyle}>Retake</button>
            {downloadUrl && (
              <a href={downloadUrl} download="resized_screenshot.jpeg">
                <button style={buttonStyle}>Download</button>
              </a>
            )}
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
  backgroundColor: "#007bff",
  color: "white",
};

export default CustomWebcam;