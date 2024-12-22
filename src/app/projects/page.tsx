import ProjectCard from "@/components/ProjectCard";
import "@/styles/ProjectsExamples.scss"

export default function Page() {

    const WebProjects = [
        {
            name: 'mazda.com.ec',
            description: 'A great project that does amazing things.',
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
            description: 'This project is under construction, but it will be awesome!',
            image: '/Projects/SanPatricioInventario.jpeg', // Replace with actual image URL
            technologies: ['React', 'Nodejs', 'HubspotDB', 'HubspotAPI', 'PDF.js'],
            tag: 'Private' as 'Private', // Make sure the tag is 'Public' or 'Private'
        },
    ];

    return (
        <div>
            <p>Projects</p>

            <p>Webs</p>

            <div className="projects-examples">
                {/* Map over the projects array and render a ProjectCard for each project */}
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