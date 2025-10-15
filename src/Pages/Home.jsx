import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Feature from '../Components/Feature'
import About from '../Components/About'
import Categories from '../Components/Categories'
import Community from '../Components/Community'
import SecurePlatform from '../Components/SecurePlatform'
import Footer from '../Components/Footer'
import StatsSection from '../Components/StatsSection'
import FAQSection from '../Components/FAQSection'

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
      </section>
      <StatsSection/>
      <Community />

      <section id="faq">
        <FAQSection />
      </section>

      <Footer />
    </div>
  )
}

export default Home
