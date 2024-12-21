import { useEffect, useState } from "react";
import "@/styles/numberSection.scss"; // Import the SCSS file for styling

const NumberSection = () => {
  const [inView, setInView] = useState(false); // To track if the section is in view

  // Animation function to increase numbers progressively
  const animateNumbers = (start: number, end: number, elementId: string, duration: number) => {
    let current = start;
    const stepTime = Math.abs(Math.floor(duration / (end - start))); // Time per step

    const updateNumber = () => {
      if (current < end) {
        current++;
        const element = document.getElementById(elementId);
        if (element) {
          element.textContent = `+${current}`;
        }
        requestAnimationFrame(updateNumber); // Animate numbers incrementally
      }
    };

    updateNumber();
  };

  useEffect(() => {
    // Ensure we are in the client-side environment before accessing document
    if (typeof document !== 'undefined') {
      const observer = new IntersectionObserver(
        (entries) => {
          // If the section is in view, start the animation
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setInView(true);
              animateNumbers(0, 18, "projectsNumber", 2000);  // Start animation for each number
              animateNumbers(0, 5, "yearsNumber", 2000);
              animateNumbers(0, 220, "websNumber", 2000);
            }
          });
        },
        { threshold: 0.5 } // Trigger when 50% of the section is visible
      );

      const section = document.getElementById("NumberSection");
      if (section) {
        observer.observe(section);
      }

      return () => {
        if (section) {
          observer.unobserve(section); // Clean up the observer on unmount
        }
      };
    }
  }, []);

  return (
    <div id="NumberSection" className="NumberSectionContainter">
      <div className="NumberSection">
        <div>
          <i className="fas fa-project-diagram"></i> {/* Example icon */}
        </div>
        <div>
          <p id="projectsNumber">+0</p>
          <p>Projects completed</p>
        </div>
      </div>
      <div className="NumberSection">
        <div>
          <i className="fas fa-briefcase"></i> {/* Example icon */}
        </div>
        <div>
          <p id="yearsNumber">+0</p>
          <p>Years of experience</p>
        </div>
      </div>
      <div className="NumberSection">
        <div>
          <i className="fas fa-laptop-code"></i> {/* Example icon */}
        </div>
        <div>
          <p id="websNumber">+0</p>
          <p>Websites built</p>
        </div>
      </div>
    </div>
  );
};

export default NumberSection;
