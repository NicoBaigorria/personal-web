"use client";
import Header from "@/components/Header";
import ListCards from "@/components/ListCards";
import { ListCard } from "@/components/ListCards"; // Importing ListCard class
import styles from "@/styles/home.module.scss"; // Importing the SCSS module


export default function Page() {
  // Sample ListCard data
  const lists = [
    new ListCard("Program Lenguajes", ["Javascript", "Typescript", "C#", "Phyton"], "fas fa-code"), // Example icon
    new ListCard("Frontend", ["HTML", "CSS", "SCSS", "THREEJS", "Javascript", "NEXTJS", "React"], "fas fa-desktop"),
    new ListCard("Backend", [".NET", "SQLServer", "NODEJS"], "fas fa-server"),
    new ListCard("Projects", ["Landing Pages", "Webs", "APIs", "Integrations", "WebApps", "Ecommerces"], "fas fa-list-check"),
    new ListCard("Others Tools", ["Blender", "AffterEffects", "Figma"], "fas fa-plus"),
  ];

  return (
    <div className={styles.pageContainer}>
      <Header />
      <main className={styles.content}>
        <div className={styles.principal}>
          <div className={styles.principalText}>
            <p>Hello! I´m <br /> Nicolás Baigorria</p>
            <h1>Web Developer</h1>
          </div>
          <div className={styles.principalImage}>
            <img src="./MiFoto.png" alt="Nicolás Baigorria" />
          </div>
        </div>

      </main>

      {/* Pass the lists data to ListCards component */}
      <ListCards lists={lists} />
    </div>
  );
}
