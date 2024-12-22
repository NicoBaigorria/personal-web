import { useEffect, useState } from "react";
import "@/styles/numberSection.scss"; // Import the SCSS file for styling

const NumberSection = () => {
  const [inView, setInView] = useState(false); // To track if the section is in view

  // Animation function to increase numbers progressively, now synchronized to 4 seconds
  const animateNumbers = (start: number, end: number, elementId: string, duration: number) => {
    const totalSteps = end - start; // Total steps required
    const stepTime = duration / totalSteps; // Time per step, adjusted to total duration
    
    let current = start;
    
    const updateNumber = () => {
      if (current < end) {
        current++;
        const element = document.getElementById(elementId);
        if (element) {
          element.textContent = `+${current}`;
        }
        setTimeout(updateNumber, stepTime); // Use setTimeout to control timing between steps
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
              // Start animations for all numbers with a synchronized 4-second duration
              animateNumbers(0, 18, "projectsNumber", 2000);  // Start animation for projects completed
              animateNumbers(0, 5, "yearsNumber", 2000);      // Start animation for years of experience
              animateNumbers(0, 220, "websNumber", 2000);     // Start animation for websites built
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
        <div className="Text">
          <p id="projectsNumber">+0</p>
          <p>Projects completed</p>
        </div>
      </div>
      <div className="NumberSection">
        <div>
          <i className="fas fa-briefcase"></i> {/* Example icon */}
        </div>
        <div className="Text">
          <p id="yearsNumber">+0</p>
          <p>Years of experience</p>
        </div>
      </div>
      <div className="NumberSection">
        <div>
          <i className="fas fa-laptop-code"></i> {/* Example icon */}
        </div>
        <div className="Text">
          <p id="websNumber">+0</p>
          <p>Websites & Landings builded</p>
        </div>
      </div>
    </div>
  );
};

export default NumberSection;
