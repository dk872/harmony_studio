import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import {
  ServicePageContainer,
  BackgroundImage,
  ServiceHeader,
  ServiceDescriptionBox,
  SpecialistContainer,
  SpecialistCard,
  SeeMoreButton,
  SpecialistImage,
  SpecialistContent,
  SpecialistNameAndAge,
} from "./ServicePage.styles";
import api from "../../api";
import Header from "../../components/Header/Header";
import { useAuth } from "../../context/AuthContext";

interface Specialist {
  id: number;
  photoUrl: string; // URL for the specialist's photo
  name: string;
  age: number;
  bio: string;
}

interface Service {
  id: number;
  name: string;
  description: string;
  specialists: Specialist[];
}

const ServicePage: React.FC = () => {
  const { serviceId } = useParams<{ serviceId: string }>();
  const [service, setService] = useState<Service | null>(null);
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchService = async () => {
      try {
        const response = await api.get(`/services/${serviceId}`);
        setService(response.data);
      } catch (error) {
        console.error("Failed to fetch service:", error);
      }
    };

    fetchService();
  }, [serviceId]);

  if (!service) {
    return <p>Service not found</p>;
  }

  return (
    <>
      <Header isAuthenticated={isAuthenticated} />
      <ServicePageContainer>
        <BackgroundImage
          src={require("../../assets/images/services-background.jpg")}
        />
        <ServiceHeader>
          <h1>{service.name}</h1>
        </ServiceHeader>

        <ServiceDescriptionBox>
          <p>{service.description}</p>
        </ServiceDescriptionBox>

        <SpecialistContainer>
          {service.specialists.map((specialist) => (
            <SpecialistCard key={specialist.id}>
              <SpecialistImage
                src={specialist.photoUrl}
                alt={specialist.name}
              />

              <SpecialistContent>
                <SpecialistNameAndAge>
                  <span className="name">{specialist.name}</span>
                  <span className="age">{specialist.age} years</span>
                </SpecialistNameAndAge>

                <SeeMoreButton
                  onClick={() => navigate(`/masters/${specialist.id}`)}
                >
                  See more
                </SeeMoreButton>
              </SpecialistContent>
            </SpecialistCard>
          ))}
        </SpecialistContainer>
      </ServicePageContainer>
    </>
  );
};

export default ServicePage;