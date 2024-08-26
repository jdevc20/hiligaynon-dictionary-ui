import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import Link from "next/link";
import HiligaynonCities from "@/components/HiligaynonCities";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <div className="container mt-5 page">

        <div className="container page home-landing-message">
                <div className="jumbotron bg-primary text-white mt-2">
        <h1 className="display-4 mt-2">Kamusta, Kasimanwa!</h1>
      </div>
      <div className="card">
        <div className="card-body">
          <h2 className="card-title text-primary">
            🌟 Malipayon nga pag-abot diri! 🌟
          </h2>
          <p className="card-text text-dark">
            We're thrilled to have you here as we celebrate the beauty and
            richness of the Hiligaynon language. Whether you're a native
            speaker, a language enthusiast, or someone eager to learn, this page
            is your gateway to all things Hiligaynon. Are you passionate about
            preserving and promoting our language? We're always looking for
            dedicated volunteers to join us in our mission. If you're willing to
            lend a hand, whether through teaching, translating, or simply
            sharing your love for Hiligaynon, we'd love to have you on board!
            Together, let's nurture and celebrate the language that binds us.
            Join us in embracing our heritage, fostering connections, and
            spreading the joy of Hiligaynon far and wide. Mangin gwapo kag gwapa kamo
            tanan! (Be well, everyone!) `
          </p>
        </div>
      </div >
          <p className="mt-4">
            <b>Hiligaynon</b>" is a <i>Visayan/Bisaya language</i> spoken in the
            Western Visayas region of the Philippines. Explore our comprehensive
            dictionary, delve into the intricacies of grammar, and discover the
            vibrant culture embedded within each word. Whether you're a language
            enthusiast, a student, or simply curious, let us guide you through
            the nuances and beauty of Hiligaynon/Ilonggo."
          </p>
        </div>
        <div className="container home-landing-message mt-2">
          <div className="row mt-2 distribution">
            <div className="col-md-3 ">
              <img src="/hiligaynon_map.png" alt="Map" className="map-image" />
            </div>
            <div className="col-md-9">
              <div className="container">
                <h3 className="mt-2">Geographic Distribution</h3>
                <p className="dis-par">
                  "Hiligaynon is primarily spoken in the Western Visayas region,
                  including Iloilo, Capiz, Guimaras, and Negros Occidental. It
                  is also found in South Cotabato (including General Santos),
                  Sultan Kudarat, and North Cotabato in Soccsksargen.
                  Additionally, it is spoken in neighboring provinces such as
                  Antique and Aklan in Western Visayas, Negros Oriental in
                  Central Visayas, and parts of Mindoro, Romblon, and Palawan in
                  Mimaropa."
                </p>
              </div>
              <HiligaynonCities/>
            </div>
            
          </div>
         
        </div>
      </div>
      <Footer/>
    </>
  );
}
