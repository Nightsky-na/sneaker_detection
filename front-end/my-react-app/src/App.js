import '../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './App.css'
import Nav from './components/Nav'

// import Profile from './components/Profile'
import WebcamImage from './components/WebcamImage'
// import Webcam from "react-webcam";
export default function App() {
  return (
    <>
    <Nav/>
    <div className="container mt-5">
      {/* <Profile /> */}
      <WebcamImage />
    </div>
    </>
  )
}