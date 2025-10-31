import styled from 'styled-components';

export const Section = styled.section`
  position: relative;
  padding: 60px 40px;
  text-align: center;
  margin-top: 100px;

  h2 {
    font-family: 'Montserrat', sans-serif;
    font-size: 36px;
    color: var(--accent);
    margin-bottom: 40px;
    margin-top: 0;
    position: relative;
    z-index: 2;
  }

  @media (max-width: 1900px) {
    padding: 60px 40px;
  }

  @media (max-width: 1300px) {
    padding: 40px 20px;
  }

  @media (max-width: 768px) {
    padding: 20px 20px;
  }
`;

export const ServicesContainer = styled.div`
  position: relative;
  z-index: 3;
  justify-self: center;
  display: grid;
  width: 75%;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
  margin-bottom: 20px;

  @media (max-width: 1300px) {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    scroll-snap-type: x mandatory;

    & > * {
      scroll-snap-align: center;
      flex-shrink: 0;
    }
  }
  @media (max-width: 768px) {
    margin-bottom: 0;
  }
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: auto;
  z-index: 0;
`;