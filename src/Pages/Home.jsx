import Navbar from '../Components/Navbar'
import Hero from '../Components/Home/Hero'
import Feature from '../Components/Home/Feature'
import About from '../Components/Home/About'
import Categories from '../Components/Home/Categories'
import Community from '../Components/Home/Community'
import Footer from '../Components/Footer'
import StatsSection from '../Components/Home/StatsSection'
import FAQSection from '../Components/Home/FAQSection'

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
