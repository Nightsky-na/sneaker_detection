import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
// import Profile from './components/Profile'
import WebcamImage from './components/WebcamImage'
import Webcam from "react-webcam";
export default function App() {
  return (
    <div className="container mt-5">
      {/* <Profile /> */}
      <WebcamImage />
    </div>
  )
}