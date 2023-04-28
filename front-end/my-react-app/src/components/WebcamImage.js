import React, { useCallback, useEffect, useRef, useState } from "react";
import Webcam from "react-webcam";
function dataURItoBlob(dataURI) {
    const byteString = atob(dataURI.split(",")[1]);
    const mimeString = dataURI.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
}

function WebcamImage() {
    const [img, setImg] = useState(null);
    const [classimg, setClassimg] = useState(null);
    const [predictedImg, setPredictedImg] = useState(null); // [1
    const webcamRef = useRef(null);

    const isBoot = classimg === "Boot";
    const backgroundColor = isBoot ? "green" : "red";
    const resultText = isBoot ? "PASS" : "FAIL";

    const boxStyle = {
        backgroundColor,
        width: "200px",
        height: "200px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
    };

    const textStyle = {
        width: "200px",
        height: "200px",
        textAlign: "center",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: "10px",
        color: "black",
    };

    const videoConstraints = {
        width: 420,
        height: 420,
        facingMode: "user",
    };

    const capture = useCallback(() => {
        const webcam = webcamRef.current;
        if (webcam) {
            const imageSrc = webcam.getScreenshot();
            setImg(imageSrc);
        }
    }, [webcamRef]);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            capture();
            if (img) {
                const blob = dataURItoBlob(img);
                const formData = new FormData();
                formData.append("file", blob, "image.jpg");

                try {
                    const res = await fetch("http://0.0.0.0:8000/class", {
                        method: "POST",
                        body: formData,
                    });
                    const data = await res.json();
                    console.log(`data: ${data}`);
                    console.log(data);
                    setClassimg(data.Class);
                    const image = new Image();
                    image.src = `data:image/jpeg;base64,${data.Image}`;
                    setPredictedImg(image);
                } catch (err) {
                    console.error(err);
                }
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [img, capture]);

    return (
        <div className="Container">
            {img === null ? (
                <>
                    <Webcam
                        audio={false}
                        mirrored={true}
                        height={400}
                        width={400}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                </>
            ) : (
                <>
                    <Webcam
                        audio={false}
                        mirrored={true}
                        height={400}
                        width={400}
                        ref={webcamRef}
                        screenshotFormat="image/jpeg"
                        videoConstraints={videoConstraints}
                    />
                    {/* Add new Img  */}
                </>
            )}
            {/* show classimg */}
            {predictedImg && <img src={predictedImg.src} alt="predicted" />}
            <div style={textStyle}>{classimg && <h1>{classimg}</h1>}</div>
            <div style={boxStyle}>
                {resultText && (
                    <h1 style={{ color: "white", fontWeight: "bold" }}>{resultText}</h1>
                )}
            </div>
        </div>
    );
}

export default WebcamImage;