import React from 'react';
import ProjectCard from './ProjectCard'; // Import the ProjectCard component

const Projects: React.FC = () => {
  const projects = [
    {
      name: 'Project 1',
      description: 'A great project that does amazing things.',
      image: 'https://via.placeholder.com/80', // Replace with actual image URL
      technologies: ['React', 'TypeScript', 'Node.js'],
      tag: 'Public' as 'Public', // Ensure tag is explicitly 'Public'
      link: 'https://example.com/project-1', // Optional link
    },
    {
      name: 'Project 2',
      description: 'Another fantastic project with lots of features.',
      image: 'https://via.placeholder.com/80', // Replace with actual image URL
      technologies: ['Vue', 'JavaScript', 'Express'],
      tag: 'Private' as 'Private', // Ensure tag is explicitly 'Private'
      link: 'https://example.com/project-2', // Optional link
    },
    {
      name: 'Project 3',
      description: 'This project is under construction, but it will be awesome!',
      image: 'https://via.placeholder.com/80', // Replace with actual image URL
      technologies: ['Angular', 'TypeScript'],
      tag: 'Private' as 'Private', // Ensure tag is explicitly 'Private'
    },
  ];

  return (
    <div className="projects-container">
      {projects.map((project, index) => (
        <ProjectCard
          key={index}
          name={project.name}
          description={project.description}
          image={project.image}
          technologies={project.technologies}
          tag={project.tag} // Now TypeScript knows it's either 'Private' or 'Public'
          link={project.link} // Optional
        />
      ))}
    </div>
  );
};

export default Projects;
