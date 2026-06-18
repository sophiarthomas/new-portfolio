import profileImg from './assets/github.jpg'
import './App.css'
import Projects from "./components/Project.jsx";
import Experience from './components/Experience.jsx';
import Connect from "./components/Connect.jsx"; 
import RibbitNavbar from './components/Menu.jsx';



function App() {
  return (
    <>
      <RibbitNavbar/>
      
      {/* Creating space for the RibbitNavBar */}
      <section id="spacer"></section>

      <section id="center">

        {/* Home Sections: contains description and picture. Horizontal format*/}
        <section id="home">
        {/* Profile Picture */}
        <div className="hero">
          <img src={profileImg} className="profile" width="90" height="90" alt=""  />
        </div>
        <p>This is a short description about me </p>
        </section>

        {/* Projects Section */}
        <section id="projects">
          <Projects />
        </section>

        {/* Experience Section */}
        <section id="experience">
          <Experience />
        </section>


      </section>

      
      {/* Contact Section: Separated so it is not centered */}
      <section id="contact">
        <Connect/>
      </section>

    </>
    
  )
}

export default App