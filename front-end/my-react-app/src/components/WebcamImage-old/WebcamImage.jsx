import React, { useCallback, useEffect, useRef, useState } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Webcam from "react-webcam";
import "./WebcamImage.css"

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
                    })
                    const data = await res.json()
                    console.log(`data: ${data}`);
                    console.log(data)
                    setClassimg(data.Class)
                    const image = new Image();
                    image.src = `data:image/jpeg;base64,${data.Image}`;
                    setPredictedImg(image);
                } catch (err) {
                    console.error(err)
                }
            }
        }, 1000);
        return () => clearInterval(intervalId);
    }, [img, capture]);

    return (
        <div className="Container">
            {img === null ? (
                <>
                    <Container>
                        <Row>
                            <Col>
                                <Webcam
                                    audio={false}
                                    mirrored={true}
                                    height={400}
                                    width={400}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    id="my_camera"
                                />
                            </Col>
                            <Col>
                                {/* <h1>Formal Footwear Detection</h1> */}
                            </Col>
                        </Row>

                    </Container>


                </>
            ) : (
                <>
                    <Container>
                        <Row>
                            <Col>
                                <Webcam
                                    audio={false}
                                    mirrored={true}
                                    height={400}
                                    width={400}
                                    ref={webcamRef}
                                    screenshotFormat="image/jpeg"
                                    videoConstraints={videoConstraints}
                                    id="my_camera"
                                />
                            </Col>
                            <Col>
                                {/* Add new Img  */}
                                {classimg !== "No object detected" && predictedImg && (
                                    <img src={predictedImg.src} alt="predicted" />
                                )}
                                {/* {classimg && <h1>{classimg}</h1>} */}
                                {classimg && <h1>{classimg}</h1>}
                            </Col>
                        </Row>

                    </Container>


                </>
            )}
            {/* show classimg */}
        </div>
    );
}

export default WebcamImage;
