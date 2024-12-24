'use client'
import Header from "@/components/Header";
import ProjectCard from "@/components/ProjectCard";
import '@/styles/gallery.scss'

export default function Page() {

    const WebProjects = [
        {
            name: 'Boat Scene',
            description: 'A 3D scene with a boat traveling',
            image: './Projects/Boat.png', // Replace with actual image URL
            technologies: ['Threejs', 'Fiber', 'REACT', 'HTML', 'CSS', "Javascript"],
            tag: 'Public' as 'Public', // Make sure the tag is 'Public' or 'Private'
            link: "/examples/boatscene"
        },
    ]

    return (
        <div className="gallery-container">
            <Header/>
            <p className="title">Gallery</p>
            <div className="projects-container">
            {WebProjects.map((project, index) => (
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
        </div>
    );
}