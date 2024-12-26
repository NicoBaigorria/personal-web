"use client";
import Header from "@/components/Header";
import ListCards from "@/components/ListCards";
import { ListCard } from "@/components/ListCards"; // Importing ListCard class
import NumberSection from "@/components/NumberSection";
import ProjectsExamples from "@/components/ProjectsExamples";
import styles from "@/styles/home.module.scss"; // Importing the SCSS module


export default function Page() {
  // Sample ListCard data
  const lists = [
    new ListCard("Program Lenguajes", ["Javascript", "Typescript", "C#", "Phyton"], "fas fa-code"), // Example icon
    new ListCard("Frontend", ["HTML", "CSS", "SCSS", "THREEJS", "Javascript", "NEXTJS", "React"], "fas fa-desktop"),
    new ListCard("Backend", [".NET", "SQLServer", "NODEJS","DOCKER"], "fas fa-server"),
    new ListCard("Projects", ["Landing Pages", "Webs", "APIs", "Integrations", "WebApps", "Ecommerces"], "fas fa-list-check"),
    new ListCard("Others Skills", ["Blender", "AffterEffects", "Figma", "Threejs"], "fas fa-plus"),
  ];

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.content}>
        <div className={styles.principal}>
          <div className={styles.principalText}>
            <p>Hello! I´m <br /> Nicolás Baigorria</p>
            <h1>Web Developer</h1>
            <p>with more out 5 years of experience.
              I got into programming after my wife had our first child.
              I was and still am a stay-at-home dad,
              and I wanted a career that I can do from home and still
              be there with my daugther to watch her grow up.</p>
          </div>
          <div className={styles.principalImage}>
            <img src="./MiFoto.png" alt="Nicolás Baigorria" />
          </div>
        </div>

      </main>

      {/* Pass the lists data to ListCards component */}
      <ListCards lists={lists} />

      <NumberSection />

      <p className={styles.notable}>Notable Projects</p>
      <ProjectsExamples />

      <div className="light light1"></div>
    <div className="light light2"></div>
    <div className="light light3"></div>
    <div className="light light4"></div>
    <div className="light light5"></div>
    <div className="light light6"></div>
    <div className="light light7"></div>
    <div className="light light8"></div>
    </div>
  );
}
