import '@/styles/certifications.scss';

import React from "react";

const badges = [
    {
        link: "https://app.hubspot.com/academy/achievements/zvgpb8q0/en/1/nicolas-baigorria/integrating-with-hubspot-i-foundations",
        imageSrc: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/c1ce797f662a4a9083c2f27adab92a44.png",
        title: "Integrating With HubSpot I: Foundations",
    },
    {
        link: "https://app.hubspot.com/academy/achievements/6l5v6d81/en/1/nicolas-baigorria/hubspot-cms-for-developers",
        imageSrc: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/9d586d6ca39a4a2bb7140b0acc040c43.png",
        title: "HubSpot CMS for Developers",
    },
    {
        link: "https://app.hubspot.com/academy/achievements/l474ztj0/en/1/nicolas-baigorria/email-marketing",
        imageSrc: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/02650b72008a43bea0c8f453bf8a2cfa.png",
        title: "Email Marketing",
    },
    {
        link: "https://app.hubspot.com/academy/achievements/qj06vsqn/en/1/nicolas-baigorria/seo",
        imageSrc: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/a1bf8ce1b1be4585a91b2d6e0b874fb4.png",
        title: "SEO",
    },
    {
        link: "https://app.hubspot.com/academy/achievements/knrjgcg9/en/1/nicolas-baigorria/seo-ii",
        imageSrc: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/5cd630f7d0ae4a239c3ea1a15c81ff55.png",
        title: "SEO II",
    },
    {
        link: "https://app.hubspot.com/academy/achievements/3005v0cm/en/1/nicolas-baigorria/content-marketing",
        imageSrc: "https://hubspot-credentials-na1.s3.amazonaws.com/prod/badges/user/6872d1280c3e44d3b6f5a9ef362650d0.png",
        title: "Content Marketing",
    }
];

const Certifications: React.FC = () => {
    return (
        <div className='Certifications'>
            <p>Hubspot Certifications</p>
            <div className="Certifications-cont">
                {badges.map((badge, index) => (
                    <div key={index} className="academy-badge">
                        <a href={badge.link} title={badge.title} target="_blank" rel="noopener noreferrer">
                            <img src={badge.imageSrc} alt={badge.title} />
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Certifications;