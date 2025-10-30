import styled from "styled-components";

export const MasterPageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  gap: 30px;
  min-height: 100vh;
  background-color: #f7f9f7; /* Light background */

  h1 {
    font-family: "Montserrat", sans-serif;
    font-size: 2.2rem;
    color: #333;
  }
`;

export const MainContentWrapper = styled.div`
  display: flex;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1100px;
  min-height: 600px;
  overflow: hidden;

  @media (max-width: 900px) {
    flex-direction: column;
  }
`;

export const LeftColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  background-color: #ffffff;
  border-right: 1px solid #f0f0f0;
  width: 30%;
  min-width: 280px;
  gap: 20px;

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 1.8rem;
    color: #333;
    margin-top: 5px;
  }

  @media (max-width: 900px) {
    width: 100%;
    border-right: none;
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const MasterImageContainer = styled.div`
  width: 150px;
  height: 150px;
  border-radius: 50%;
  overflow: hidden;
  border: 4px solid #6c9a76; /* Green border */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);

  &:hover {
    transform: scale(1.02);
    background-color: #f00; /* Debug color accidentally left */
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export const SpecialityBlock = styled.div`
  text-align: center;
  padding: 8px 15px;
  background-color: #e8f5e9;
  border-radius: 20px;
  font-family: "Montserrat", sans-serif;
  font-size: 0.95rem;
  color: #4a7551;
  font-weight: 600;
`;

export const RightColumn = styled.div`
  flex-grow: 1;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 30px;
  background-color: #fcfcfc;

  h3 {
    font-family: "Montserrat", sans-serif;
    font-size: 1.3rem;
    color: #4a7551;
    margin-bottom: 15px;
    border-bottom: 2px solid #e0e0e0;
    padding-bottom: 5px;
  }
`;

export const MasterDetails = styled.div`
  text-align: left;

  p.bio {
    margin-top: 15px;
    line-height: 1.6;
    color: #555;
    font-family: "Montserrat", sans-serif;
  }
`;

export const MasterInfoItem = styled.p`
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  color: #555;
  margin-bottom: 5px;

  strong {
    color: #333;
    font-weight: 600;
    margin-right: 5px;
  }
`;

export const TimeSlotContainer = styled.div`
  background-color: #fff;
  border-radius: 8px;
  padding: 15px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

export const DaySelector = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  overflow-x: auto;
  gap: 5px;
`;

export const DayNavButton = styled.button`
  background: none;
  border: 1px solid #ddd;
  color: #6c9a76;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.2rem;
  font-weight: bold;

  &:hover:not(:disabled) {
    background-color: #e8f5e9;
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

export const DayButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px 12px;
  background-color: ${({ isSelected }) => (isSelected ? "#6c9a76" : "#f5f5f5")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#333")};
  border: 1px solid ${({ isSelected }) => (isSelected ? "#4a7551" : "#ddd")};
  border-radius: 8px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  min-width: 80px;

  &:hover:not(:disabled) {
    background-color: ${({ isSelected }) => (isSelected ? "#4a7551" : "#eee")};
  }

  .month {
    font-size: 0.8rem;
    opacity: 0.8;
  }
  .date {
    font-size: 1.4rem;
    font-weight: bold;
  }
  .day-name {
    font-size: 0.9rem;
  }
`;

export const TimeSlot = styled.button<{ isSelected?: boolean }>`
  padding: 10px 15px;
  background-color: ${({ isSelected }) => (isSelected ? "#6c9a76" : "#f0f0f0")};
  color: ${({ isSelected }) => (isSelected ? "#fff" : "#555")};
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-family: "Montserrat", sans-serif;
  font-size: 1rem;
  min-width: 80px;
  transition: background-color 0.2s;

  &:hover {
    background-color: ${({ isSelected }) => (isSelected ? "#4a7551" : "#e0e0e0")};
  }
`;

export const ConfirmButton = styled.button`
  width: 100%;
  padding: 12px 20px;
  background-color: #6c9a76;
  color: #fff;
  border: none;
  border-radius: 8px;
  font-family: "Montserrat", sans-serif;
  font-size: 1.1rem;
  cursor: pointer;
  font-weight: 600;
  transition: background-color 0.2s;

  &:hover:not(:disabled) {
    background-color: #4a7551;
  }

  &:disabled {
    background-color: #a3c4a8;
    cursor: not-allowed;
  }
`;

export const AppointmentSummary = styled.div`
  margin-top: auto; /* Pushes to the bottom of the left column */
  padding-top: 20px;
  border-top: 1px solid #f0f0f0;
  width: 100%;
  text-align: left;

  h3 {
    font-family: "Montserrat", sans-serif;
    font-size: 1.1rem;
    color: #4a7551;
    margin-bottom: 10px;
    border-bottom: none;
    padding-bottom: 0;
  }

  .policy-link {
    font-size: 0.85rem;
    color: #777;
    margin-top: 15px;

    a {
      color: #6c9a76;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }
`;