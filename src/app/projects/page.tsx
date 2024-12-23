'use client'

import Header from "@/components/Header";
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
            name: 'maresacenter.com',
            description: 'Another fantastic project with lots of features.',
            image: './Projects/Chery.png', // Replace with actual image URL
            technologies: ['Hubspot', 'HTML', 'CSS', "Javascript"],
            tag: 'Public' as 'Public', // Make sure the tag is 'Public' or 'Private'
            link: 'https://www.maresacenter.com/', // Optional link
        },
        {
            name: 'jeep.com.ec',
            description: 'Another fantastic project with lots of features.',
            image: './Projects/Chery.png', // Replace with actual image URL
            technologies: ['Hubspot', 'HTML', 'CSS', "Javascript"],
            tag: 'Public' as 'Public', // Make sure the tag is 'Public' or 'Private'
            link: 'https://www.jeep.com.ec/', // Optional link
        },
        {
            name: 'dongfeng.com.ec',
            description: 'Another fantastic project with lots of features.',
            image: './Projects/Chery.png', // Replace with actual image URL
            technologies: ['Hubspot', 'HTML', 'CSS', "Javascript"],
            tag: 'Public' as 'Public', // Make sure the tag is 'Public' or 'Private'
            link: 'https://www.dongfeng.com.ec/', // Optional link
        },
        {
            name: 'dodge.com.ec',
            description: 'Another fantastic project with lots of features.',
            image: './Projects/Chery.png', // Replace with actual image URL
            technologies: ['Hubspot', 'HTML', 'CSS', "Javascript"],
            tag: 'Public' as 'Public', // Make sure the tag is 'Public' or 'Private'
            link: 'https://www.dodge.com.ec/', // Optional link
        },
        {
            name: 'ram.com.ec',
            description: 'Another fantastic project with lots of features.',
            image: './Projects/Chery.png', // Replace with actual image URL
            technologies: ['Hubspot', 'HTML', 'CSS', "Javascript"],
            tag: 'Public' as 'Public', // Make sure the tag is 'Public' or 'Private'
            link: 'https://www.ram.com.ec/', // Optional link
        },
    ];

    const AppsProjects = [
        {
            name: 'Inventory San Patricio Gardens',
            description: 'A great project that does amazing things.',
            image: './Projects/SanPatricioInventario.jpeg', // Replace with actual image URL
            technologies: ['React', 'CSS', 'Javascript', "Nodejs", "HubspotDB"],
            tag: 'Private' as 'Private', // Make sure the tag is 'Public' or 'Private'
            link: undefined
        },
        {
            name: 'PDF Filler Planb',
            description: 'A FullStack Project were the contact data of Hubspot is procesed using workflow to send request to this API and update DataBase with PDF files autofilled of the Canada Goberment, also I develop a Inteface to test and check the info, properties and fields types',
            image: './Projects/SanPatricioInventario.jpeg', // Replace with actual image URL
            technologies: ['React', 'CSS', 'Typescript', "Nodejs", "HubspotDB", "HubspotWorkflows", "AWS", "DOCKER"],
            tag: 'Private' as 'Private', // Make sure the tag is 'Public' or 'Private'
            link: undefined
        },
        {
            name: 'ThunderGo Ecommerce',
            description: 'A FullStack Project were ERP, HubspotAPI, Nodejs, React and PlaceToPayAPI works toguether to create a Ecommerce to buy Motorbikes and Accesories',
            image: './Projects/SanPatricioInventario.jpeg', // Replace with actual image URL
            technologies: ['React', 'CSS', 'Javascript', "Nodejs", "HubspotDB", "HubspotWorkflows, PlaceToPay, ERP", "NGINX", "APACHE"],
            tag: 'Private' as 'Private', // Make sure the tag is 'Public' or 'Private'
            link: undefined
        },
    ]

    const IntegrationsProjects = [
        {
            name: 'Integration Hubspot Equifax',
            description: 'A integration between Hubspot and EquifaxApi using Workflows and Nodejs API to automate calification of contacts',
            image: './Projects/SanPatricioInventario.jpeg', // Replace with actual image URL
            technologies: ['Javascript', "Nodejs", "Hubspot Workflow"],
            tag: 'Private' as 'Private', // Make sure the tag is 'Public' or 'Private'
            link: undefined
        },
    ]

    return (
        <div className="ProjectsPage">
            <Header />
            <p id="principal-Title">Projects</p>

            <p className="secondary-Title">Webs</p>

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


            <p className="secondary-Title">Applications</p>

            <div className="projects-examples">
                {/* Map over the projects array and render a ProjectCard for each project */}
                {AppsProjects.map((project, index) => (
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

            <p className="secondary-Title">Integrations</p>

            <div className="projects-examples">
                {/* Map over the projects array and render a ProjectCard for each project */}
                {IntegrationsProjects.map((project, index) => (
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