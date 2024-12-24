import React from 'react';
import ProjectCard from './ProjectCard'; // Import the ProjectCard component
import "@/styles/ProjectsExamples.scss"

const ProjectsExamples: React.FC = () => {
  // Array of project examples
  const projects = [
    {
      name: 'mazda.com.ec',
      description: 'A project with multiple custom modules such as Google maps, sliders, online quote, 3D viewers, among others.',
      image: './Projects/Mazda.png', // Replace with actual image URL
      technologies: ['Hubspot', 'HTML', 'CSS', "Javascript"],
      tag: 'Public' as 'Public', // Make sure the tag is 'Public' or 'Private'
      link: 'https://www.mazda.com.ec/', // Optional link
    },
    {
      name: 'chery.com.ec',
      description: 'Another fantastic project with lots of features.',
      image: './Projects/Chery.png', // Replace with actual image URL
      technologies: ['Hubspot', 'HTML', 'CSS', "Javascript"],
      tag: 'Public' as 'Public', // Make sure the tag is 'Public' or 'Private'
      link: 'https://www.chery.com.ec/', // Optional link
    },
    {
      name: 'San Patricio InventoryApp',
      description: 'A great project that does amazing things. How to obtain information about the departments according to availability and characteristics. Make complex quotes for multiple properties simultaneously, print pdfs and send triggers to track the sale by integrating Equifax and Hubspot using API Developed in Nodejs',
      image: '/Projects/SanPatricioInventario.jpeg', // Replace with actual image URL
      technologies: ['React', 'Nodejs', 'HubspotDB', 'HubspotAPI', 'PDF.js'],
      tag: 'Private' as 'Private', // Make sure the tag is 'Public' or 'Private'
    },
  ];

  return (
    <>

    <div className="projects-examples">
      {/* Map over the projects array and render a ProjectCard for each project */}
      {projects.map((project, index) => (
        <ProjectCard
          key={index} // Use index as a key or a unique id
          name={project.name}
          description={project.description}
          image={project.image}
          technologies={project.technologies}
          tag={project.tag}
          link={project.link} // Optional link
        />
      ))}
    </div>
    <a href='/projects' className='btn-blue'>
      See More
    </a>
      </>
  );
};

export default ProjectsExamples;
