import React from 'react';
import {
  CardContainer,
  CardImage,
  CardTitle,
  CardDescription,
  CardButtonContainer,
  CardTitleContainer,
  CardDescriptionContainer,
} from './ServiceCard.styles';
import Button from '../Button/Button';
import { useNavigate } from 'react-router-dom';

interface ServiceCardProps {
  id: number;
  name: string;
  description: string;
  img: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ id, name, description, img }) => {
  const navigate = useNavigate();

  const handleSeeMore = () => {
    navigate(`/services/${id}`);
  };

  return (
    <CardContainer>
      <CardImage src={img} alt={name} />
      <CardTitleContainer>
        <CardTitle>{name}</CardTitle>
      </CardTitleContainer>
      <CardButtonContainer>
        <Button
          width="135px"
          height="25"
          color="accent"
          borderRadius="16"
          variant="filled"
          fontSize="12"
          fontWeight="400"
          onClick={handleSeeMore}
        >
          See more
        </Button>
      </CardButtonContainer>
      <CardDescriptionContainer>
        <CardDescription>{description}</CardDescription>
      </CardDescriptionContainer>
    </CardContainer>
  );
};

export default ServiceCard;