import styled from 'styled-components';

export const FooterContainer = styled.footer`
  background-color: var(--accent);
  color: var(--main);
  position: relative;
  bottom: 0;
  width: 100%;
  height: 260px;
  padding: 45px 180px 12px 180px;
  box-sizing: border-box;
  margin-top: 0;

  @media (max-width: 768px) {
    width: 100vh;
    padding: 20px;
    height: auto;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
  }
`;

export const FooterContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
`;

export const FooterContacts = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;

  h3 {
    margin-bottom: 10px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
    justify-self: center;
  }
`;

export const FooterAddress = styled.div`
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;

  h3 {
    margin-bottom: 10px;
    font-weight: 600;
  }

  @media (max-width: 768px) {
    max-width: 100%;
    text-align: center;
    margin-top: 10px;
  }
`;

export const FooterIcons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  img {
    width: 24px;
    height: 24px;
    transition: transform 0.3s;
    margin-right: 25px;

    &:hover {
      transform: scale(1.1);
    }
  }

  @media (max-width: 768px) {
    justify-content: center;
  }
`;

export const FooterParagraph = styled.p`
  margin: 5px 0;
`;

export const FooterCopyright = styled.p`
  font-size: 14px;
  text-align: left;
  font-family: 'Montserrat', sans-serif;
  margin-top: 29px;
  margin-bottom: 0;
  position: relative;
  bottom: 0;

  @media (max-width: 768px) {
    position: static;
    bottom: 10px;
    justify-self: center;
  }
`;

export const A = styled.a`
  margin-right: 10px;
  color: var(--main);
  transition: transform 0.2s, color 0.2s;

  &:hover {
    transform: scale(1.1);
  }
`;