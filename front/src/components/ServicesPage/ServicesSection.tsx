import React from 'react';
import { Section, ServicesContainer, BackgroundImage } from './ServicesSection.styles';
import ServiceCard from "../ServiceCard/ServiceCard";

const services = [
    { id: 1, name: 'Face', description: 'Facial care includes cleansing, nourishing, and restoring the skin. Give your skin a radiant glow.', img: require('../../assets/images/face.jpg') },
    { id: 2, name: 'Eyes', description: 'Eye services include skincare, professional makeup, and brow restoration. Give your eyes a healthy look.', img: require('../../assets/images/eyes.jpg') },
    { id: 3, name: 'Massage', description: 'Massage to relieve tension, improve circulation, and restore energy. Experience complete peace and harmony', img: require('../../assets/images/massage.jpg') },
    { id: 4, name: 'Manicure', description: 'Manicure for a flawless look for your hands. Choose designs that complement your style', img: require('../../assets/images/nails.jpg') },
    { id: 5, name: 'Eyebrows', description: 'Shaping and caring for your eyebrows to create the perfect frame for your face.', img: require('../../assets/images/brows.jpg') },
    { id: 6, name: 'Lips', description: 'Lip services include hydration, restoration, and adding a glossy finish.', img: require('../../assets/images/lips.jpg') },
];

const ServicesSection = () => {
    return (
        <Section>
            <BackgroundImage src={require('../../assets/images/services.png')} alt="Branch Background" />
            <h2>Our Services</h2>
            <ServicesContainer>
                {services.map((service) => (
                    <ServiceCard
                        key={service.id}
                        id={service.id}
                        name={service.name}
                        description={service.description}
                        img={service.img}
                    />
                ))}
            </ServicesContainer>
        </Section>
    );
};

export default ServicesSection;