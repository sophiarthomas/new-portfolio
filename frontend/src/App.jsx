import { useState } from 'react'
import profileImg from './assets/profile.png'
import './App.css'
import Projects from "./components/Project.jsx";
import Connect from "./components/Connect.jsx"; 


function App() {
  return (
    <>
      <section id="center">
        <div className="hero">
          <img src={profileImg} className="profile" width="70" height="90" alt="" />
        </div>
        <div>
          <h1>Sophia R. Thomas</h1>
          <h2>Projects</h2>
          <Projects />
        </div>
      </section>
      
      <div className="ticks"></div>
      <section id="next-steps">
        <Connect/>
      </section>
      <div className="ticks"></div>
      <section id="spacer"></section>
    </>
  )
}

export default App