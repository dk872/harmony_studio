import styled from 'styled-components';

export const CardContainer = styled.div`
  background-color: var(--main);
  width: 240px;
  height: 300px;
  border-radius: 16px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 40px rgba(0, 0, 0, 0.2);
  }
`;

export const CardImage = styled.img`
  width: 190px;
  height: 160px;
  object-fit: cover;
  margin: 25px auto 0;
  border-radius: 8px;

  @media (max-width: 1300px) {
    width: 80%;
    height: auto;
  }
`;

export const CardTitleContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 80%;
`;

export const CardTitle = styled.h3`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  font-weight: 600;
  color: var(--accent);
`;

export const CardDescriptionContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  width: 80%;
`;

export const CardDescription = styled.p`
  font-family: 'Montserrat', sans-serif;
  font-size: 10px;
  font-weight: 300;
  color: var(--accent);
  margin: 0;
  text-align: left;
`;

export const CardButtonContainer = styled.div`
  position: absolute;
  top: 200px;
  right: -60px;

  @media (max-width: 1300px) {
    right: -30px;
  }

  @media (max-width: 768px) {
    right: 30px;
    transform: scale(0.8);
    font-size: 8px;
  }
`;