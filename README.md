# เTะ Detection Project (Sneaker Detection Project)

This repository contains the source code for a sneaker detection project, completed as part of ITCS498 Special Topics in Computer Science. The project is divided into two main parts: a front-end built using React, and a back-end built using Fast API (Python).

## How to Run the Program
### Front-end
  1. Navigate to the front-end folder:
  ```
  cd ./front-end/my-react-app/
  ```
  2. Run the front-end application:
  ```
  npm start
  ```
  3. The server will start at [http://localhost:3000](http://localhost:3000)
 
### Back-end
  1. Prepare the model weights.
  2. Create a folder named "weight".
  3. Download the model weights from [URL](https://drive.google.com/drive/folders/1yOfeCUAxDgyx53tuuUmuoTjA4-e2TW18?usp=share_link)
  4.Place the downloaded weights in the "weight" folder.
  5. Navigate to the service_api folder:
  ```
  cd ./service_api
  ```
  6. Run the command to start the back-end server:
  ```
  uvicorn app:app
  ```
  
Now, you can use the sneaker detection application through the front-end interface while the back-end server processes the data.





  
