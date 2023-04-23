import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Homepage from './pages/Homepage/Homepage'
// import Profile from './components/Profile'
// import WebcamImage from './components/WebcamImage/WebcamImage'
// import Webcam from "react-webcam";
export default function App() {
  return (
    <div className="container mt-5">
      {/* <Profile /> */}
      <Homepage />
    </div>
    
  )
}