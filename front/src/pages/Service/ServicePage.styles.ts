import styled from 'styled-components';

export const ServicePageContainer = styled.div`
  position: relative;
  padding: 60px 40px;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
`;

export const BackgroundImage = styled.img`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 0;
  object-fit: cover;
  pointer-events: none;
`;

export const ServiceHeader = styled.div`
  text-align: center;
  margin-bottom: 20px;
  position: relative;
  z-index: 2;

  h1 {
    font-family: 'Montserrat', sans-serif;
    font-size: 2.5rem;
    color: var(--accent);
  }
`;

export const ServiceDescriptionBox = styled.div`
  background-color: rgba(255, 255, 255, 0.8);
  border-radius: 10px;
  padding: 20px;
  margin: 20px auto;
  max-width: 800px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  position: relative;
  z-index: 2;
  text-align: left;

  p {
    font-family: 'Montserrat', sans-serif;
    font-size: 1rem;
    color: var(--grey);
    margin-bottom: 10px;
    line-height: 1.6;
  }
`;

export const SpecialistContainer = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  gap: 30px;
  padding: 20px 0;
  margin: 0 auto;
  max-width: 1200px;
  position: relative;
  z-index: 2;
`;

export const SpecialistCard = styled.div`
  width: 250px;
  background-color: #fcfcfc;
  border-radius: 10px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const SpecialistImage = styled.img`
  width: 100%;
  height: 250px;
  object-fit: cover;
  border-radius: 10px;
`;

export const SpecialistContent = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 10px 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0));
  text-align: left;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  color: white;
`;

export const SpecialistNameAndAge = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding-left: 15px;
  padding-bottom: 5px;

  .name {
    font-family: 'Montserrat', sans-serif;
    font-weight: 600;
    font-size: 1rem;
    color: white;
  }

  .age {
    font-family: 'Montserrat', sans-serif;
    font-size: 0.85rem;
    color: #eee;
  }
`;

export const SeeMoreButton = styled.button`
  padding: 5px 10px;
  background-color: var(--accent);
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: 'Montserrat', sans-serif;
  font-size: 0.85rem;
  font-weight: 500;
  margin-right: 10px;
  white-space: nowrap;
`;