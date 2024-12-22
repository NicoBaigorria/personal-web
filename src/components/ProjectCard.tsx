import React from 'react';
import '@/styles/ProjectCard.scss'; // Import your SCSS styles

interface ProjectCardProps {
  name: string;
  description: string;
  image: string;
  technologies: string[];
  tag: 'Private' | 'Public'; // Keep the tag type to ensure it's either 'Private' or 'Public'
  link?: string;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ name, description, image, technologies, tag, link }) => {
  return (
    <div className="project-card">
      <div className="project-image-container">
        <img src={image} alt={name} className="project-image" />
      </div>
      <div className='project-info'>
        <div className="project-card-header">

          <h3>{name}</h3>
          <span className={`tag ${tag.toLowerCase()}`}>{tag}</span>

        </div>
        <p className="project-description">{description}</p>
        <div className="technologies">
          {technologies.map((tech, index) => (
            <span key={index} className="technology">
              {tech}
            </span>
          ))}
        </div>
        <div className="project-footer">
          {tag === 'Public' && link && (
            <a href={link} target="_blank" rel="noopener noreferrer" className="link-button">
              Visit Project
            </a>
          )}
        </div>
      </div>

    </div>
  );
};

export default ProjectCard;
