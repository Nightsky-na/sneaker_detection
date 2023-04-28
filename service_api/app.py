from ultralytics import YOLO
from typing import Union
from fastapi import FastAPI, File, UploadFile, Form, Request
from fastapi.responses import HTMLResponse, JSONResponse, FileResponse
from fastapi.templating import Jinja2Templates
from fastapi.staticfiles import StaticFiles
from io import BytesIO
from PIL import Image
from torchvision.transforms import functional as F
import cv2
import io
from starlette.responses import StreamingResponse
from fastapi.middleware.cors import CORSMiddleware
import base64

app = FastAPI()

origins = [
    "http://localhost:3000",
    "http://localhost",
    "http://localhost:3001",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# load model 
# path_to_model = './yolov5x.pt'
path_to_model = './weight/yolov8n_best.pt'
# path_to_model = './weight/yolov8s_best.pt'
model = YOLO(path_to_model)


# Return image and properties
@app.post("/")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    # Convert from bytes to PIL image
    img = Image.open(BytesIO(contents))

    result = model(img)
    
    boxes = result[0].boxes
    box = boxes[0]  # returns one box
    
    res_plotted = result[0].plot()
    
    # res, im_png = cv2.imencode(".png", res_plotted)
    _, im_png = cv2.imencode(".png", res_plotted)
    print(result)
    # response
    # json_response = JSONResponse(content=response)
    image_response = StreamingResponse(io.BytesIO(im_png.tobytes()),media_type="image/png")

    # json_response.headers["Content-Type"] = "application/json"
    image_response.headers["Content-Type"] = "image/png"

    return image_response

@app.post("/class")
async def predict_image(file: UploadFile = File(...)):
    contents = await file.read()
    # Convert from bytes to PIL image
    img = Image.open(BytesIO(contents))

    result = model(img)
    try:
        boxes = result[0].boxes
        box = boxes[0]  # returns one box
        print(box.cls)
        res_plotted = result[0].plot()
        res, im_png = cv2.imencode(".png", res_plotted)
        encoded = base64.b64encode(im_png)
        # _, im_png = cv2.imencode(".png", res_plotted)
        # print(result)
        # response
        response_dict = {
            "Class": result[0].names[int(box.cls)],
            "Image": encoded.decode("utf-8")
        }
        response = JSONResponse(response_dict)
        # return response
        return response
    
    except:
        response_dict = {
            "Class": "No object detected",
            "Image": ""
        }
        
        response = JSONResponse(response_dict)
        return response

# RUN 
# uvicorn app:app --reload

# contents = await file.read()
# Convert from bytes to PIL image
# img = Image.open('./2016_09_18__00_01_26_-848--0000157500_jpg.rf.b29472e31eb0ff1300ffc2bda604eb5c.jpg')

# result = model(img)
# res_plotted = result[0].plot()
# # results = model(inputs)
# print(result ) # cls prob, (num_class, )
# cv2.imshow("result", res_plotted)

# cv2.waitKey(0)

# # # closing all open windows
# cv2.destroyAllWindows()