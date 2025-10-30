import styled from 'styled-components';

export const Section = styled.section`
  position: relative;
  margin: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 40px 60px;
  color: var(--grey);
  box-sizing: border-box;

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 10px;
  }
`;

export const TextContainer = styled.div`
  margin-top: 60px;
  max-width: 50%;

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 40px;
    color: var(--accent);
    margin-bottom: 40px;
  }

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 16px;
    line-height: 1.6;
    margin-bottom: 20px;
  }

  @media (max-width: 768px) {
    width: 90%;
  }
`;

export const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;

  @media (max-width: 768px) {
    margin-top: 30px;
    margin-bottom: 20px;
  }
`;

export const ImageContainer = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  max-width: 40%;

  img {
    width: auto;
    height: auto;
    z-index: 1;
  }

  @media (max-width: 990px) {
    opacity: 0;
  }
`;
