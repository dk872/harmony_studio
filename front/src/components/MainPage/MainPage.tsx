import React from 'react';
import { Section, TextContainer, ImageContainer, ButtonContainer } from './MainPage.styles';
import Button from '../Button/Button';
import ServicesSection from '../ServicesPage/ServicesSection';
import NewsFaqPage from '../NewsFaq/NewsFaqPage';
import Footer from '../Footer/Footer';
import Header from '../Header/Header';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const MainPage: React.FC = () => {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <>
      <Header isAuthenticated={isAuthenticated} /> {/* Dynamic header */}
      <Section>
        <TextContainer>
          <h1>Harmony Studio</h1>
          <p>Welcome to Harmony Studio</p>
          <p>
            At Harmony Studio, beauty and balance come together in perfect unison. Our mission
            is to enhance your natural charm while offering a serene and personalized experience.
            From the moment you step into our studio, you’ll feel embraced by a calming atmosphere,
            designed to help you unwind and focus on self-care.
          </p>
          <p>
            Harmony Studio is more than just a beauty salon — it’s a sanctuary where your individuality
            shines, and your beauty is celebrated. With our focus on quality, attention to detail, and a
            genuine passion for what we do, we strive to make every visit a memorable one.
          </p>
          <p>Rediscover yourself in a place where beauty meets harmony.</p>

          <ButtonContainer>
            <Button
              width="200px"
              height="40"
              color="accent"
              borderRadius="25"
              variant="filled"
              fontSize="16"
              fontWeight="400"
              onClick={() => navigate('/services')}
            >
              See more
            </Button>
          </ButtonContainer>
        </TextContainer>

        <ImageContainer>
          <img
            src={require('../../assets/images/model.jpg')}
            alt="Harmony Studio Model"
          />
        </ImageContainer>
      </Section>

      <ServicesSection />
      <NewsFaqPage />
      <Footer />
    </>
  );
};

export default MainPage;