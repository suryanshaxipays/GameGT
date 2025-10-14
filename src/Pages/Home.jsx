import Navbar from '../Components/Navbar'
import Hero from '../Components/Hero'
import Feature from '../Components/Feature'
import About from '../Components/About'
import Categories from '../Components/Categories'
import Community from '../Components/Community'
import SecurePlatform from '../Components/SecurePlatform'
import Footer from '../Components/Footer'

const Home = () => {
  return (
    <div>
        <Navbar/>
        <Hero/>
        <Feature/>
        <About/>
        <Categories/>
        <Community/>
        <SecurePlatform/>
        <Footer/> 

    </div>
  )
}

export default Home