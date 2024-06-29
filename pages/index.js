import Head from "next/head";
import Image from "next/image";
import { Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Layout from "@/components/Layout";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="container mt-5 page">
        <div className="container page home-landing-message">
          <h1>Kamusta kamo</h1>
          <p>
            "Welcome to your gateway to the richness of the Hiligaynon/Ilonggo
            language! Hiligaynon is a Visayan/Bisaya language spoken in the
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
            </div>
          </div>
        </div>
        <div className="container home-landing-message mt-2">
          If you haven't found a word, please help us expand our resources by
          contributing.
          <br></br>
          <Link href="/dictionarycontribute" className="btn btn-primary mt-2">
            Contribute
          </Link>
        </div>
      </div>
    </>
  );
}
