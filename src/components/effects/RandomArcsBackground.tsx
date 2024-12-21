import { useEffect, useRef, useState } from "react";
import styles from "./RandomArcsBackground.module.scss"; // Import the SCSS module

const RandomArcsBackground = () => {
  const svgRef = useRef<SVGSVGElement | null>(null); // Ref to the SVG container
  const [paths, setPaths] = useState<string[]>([]); // Store the generated paths

  // Function to generate random arc paths
  const generateArcPaths = (numArcs: number) => {
    const arcs: string[] = [];
    for (let i = 0; i < numArcs; i++) {
      const x1 = Math.random() * 500;
      const y1 = Math.random() * 500;
      const x2 = Math.random() * 500;
      const y2 = Math.random() * 500;
      const path = `M${x1},${y1} Q${x1 + 50},${y1 + 50} ${x2},${y2}`; // Quadratic Bézier curve
      arcs.push(path);
    }
    return arcs;
  };

  // Function to reset paths and start animation again
  const resetAnimation = () => {
    const newPaths = generateArcPaths(5); // Generate new paths
    setPaths(newPaths); // Set the new paths in state
  };

  // Function to trigger a reflow and restart the animation
  const triggerReflow = () => {
    if (svgRef.current) {
      svgRef.current.getBoundingClientRect(); // This will trigger a reflow
    }
  };

  // Start animation when the component is mounted
  useEffect(() => {
    resetAnimation(); // Generate initial random paths
    triggerReflow(); // Trigger the reflow for initial render
  }, []);

  // Watch for changes in paths and trigger restart
  useEffect(() => {
    const intervalId = setInterval(() => {
      resetAnimation(); // Reset paths and start new ones
      triggerReflow(); // Trigger reflow to restart the animation cycle
    }, 8000); // Restart every 8 seconds (4s draw + 4s fade)

    return () => clearInterval(intervalId); // Cleanup interval on component unmount
  }, [paths]);

  return (
    <svg ref={svgRef} className={styles.svgContainer} width="100%" height="100%" viewBox="0 0 500 500">
      {paths.map((path, index) => (
        <path key={index} d={path} className={styles.arc} />
      ))}
    </svg>
  );
};

export default RandomArcsBackground;
