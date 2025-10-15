import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Feature from '../Components/Feature'
import About from '../Components/About'
import Categories from '../Components/Categories'
import Community from '../Components/Community'
import SecurePlatform from '../Components/SecurePlatform'
import Footer from '../Components/Footer'
import StatsSection from '../Components/StatsSection'


const Home = () => {
  return (
    <div>
      <Navbar />

      <section id="home">
        <Hero />
      </section>

      <section id="features">
        <Feature />
      </section>

      <section id="about">
        <About />
      </section>

      <section id="games">
        <Categories />
        <StatsSection/>
      </section>

      <section id="faq">
        <Community />
      </section>

      <section id="secure">
        <SecurePlatform />
      </section>

      <Footer />
    </div>
  )
}

export default Home
