import styled from "styled-components";

const ACCENT_COLOR = "#6c9a76";
const WHITE_BG = "rgba(255, 255, 255, 0.9)";
const LIGHT_BG = "#f5f5f5";

export const EditableField = styled.div`
  display: flex;
  gap: 5px;
  margin-bottom: 5px;
  width: 100%;

  input {
    padding: 5px 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    font-size: 1rem;
    text-align: center;
    width: 50%; /* For first name and last name */
  }

  input[name="phone_number"],
  input[name="email"] {
    width: 100%;
  }
`;

export const ProfileContainer = styled.div`
  padding: 40px 20px;
  min-height: 100vh;
  background-color: ${LIGHT_BG};
  display: flex;
  justify-content: center;

  h2 {
    font-family: "Montserrat", sans-serif;
    font-size: 1.8rem;
    color: ${ACCENT_COLOR};
    margin-bottom: 20px;
    text-align: center;
  }
`;

export const MasterContentWrapper = styled.div`
  display: flex;
  max-width: 1200px;
  width: 100%;
  gap: 30px;

  @media (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const InfoSection = styled.div`
  width: 350px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 15px;
  padding: 25px;
  background-color: ${WHITE_BG};
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  @media (max-width: 1024px) {
    width: 90%;
    max-width: 500px;
  }

  textarea {
    width: 100%;
    height: 100px;
    margin-top: 5px;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 4px;
    resize: vertical;
    font-size: 0.95rem;
  }
`;

export const MasterImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
`;

export const MasterBasicInfo = styled.div`
  text-align: center;
  width: 100%;

  h3 {
    font-size: 1.8rem;
    margin-bottom: 10px;
    color: #333;
    font-family: "Montserrat", sans-serif;
    font-weight: 700;
    letter-spacing: 0.5px;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    text-align: center;
    background: linear-gradient(to right, #6c9a76, #3e6b4c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 0.9rem;
    margin: 2px 0;
    color: #666;
  }
  .secondary {
    color: ${ACCENT_COLOR};
    font-weight: 500;
    line-height: 1.5;
  }
  .bio-text {
    color: #333;
    font-size: 0.95rem;
    text-align: center;
    margin-top: 10px;
  }
`;

export const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;

  button {
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
    transition: background-color 0.2s;

    &.delete {
      background-color: #f44336;
      color: white;
    }
    &.edit {
      background-color: #ffc107;
      color: #333;
    }
    &.exit {
      background-color: ${ACCENT_COLOR};
      color: white;
    }
  }
`;

export const FreeTimeSection = styled.div`
  width: 100%;
  margin-top: 20px;
  padding-top: 20px;
  border-top: 1px solid #eee;

  h3 {
    font-size: 1.2rem;
    color: #333;
    margin-bottom: 15px;
  }

  .available-times {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    justify-content: center;
    margin-top: 15px;
    padding-bottom: 15px;
    border-bottom: 1px solid #eee;

    h4 {
      width: 100%;
      text-align: left;
      font-size: 0.9rem;
      color: #666;
      margin-bottom: 5px;
    }
  }

  .add-time-input {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;

    input {
      padding: 8px;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 10px;
      background-color: ${ACCENT_COLOR};
      color: white;
      border: none;
      border-radius: 5px;
      font-weight: 600;
    }
  }
`;

export const DaySelector = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 10px;
  width: 100%;
  background-color: ${LIGHT_BG};
  border-radius: 8px;
  padding: 5px;
`;

export const DayNavButton = styled.button`
  background: none;
  border: none;
  color: ${ACCENT_COLOR};
  font-size: 1.5rem;
  cursor: pointer;
`;

export const DayButton = styled.button<{ isSelected: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 5px 10px;
  background-color: ${({ isSelected }) =>
    isSelected ? ACCENT_COLOR : "transparent"};
  color: ${({ isSelected }) => (isSelected ? "white" : "#333")};
  border: 1px solid
    ${({ isSelected }) => (isSelected ? ACCENT_COLOR : "transparent")};
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9rem;
  font-weight: 500;

  .month {
    font-size: 0.7rem;
  }
`;

export const TimeSlotButton = styled.button`
  padding: 5px 10px;
  background-color: ${LIGHT_BG};
  color: #333;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 0.85rem;
  cursor: pointer;
`;

export const AppointmentSection = styled.div`
  flex-grow: 1;
  padding: 25px;
  background-color: ${WHITE_BG};
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);

  h2 {
    text-align: left;
  }

  .appointments-list {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin-top: 20px;
    max-height: 700px;
    overflow-y: auto;
    padding: 10px;

    @media (max-width: 1024px) {
      grid-template-columns: repeat(2, 1fr);
    }

    @media (max-width: 600px) {
      grid-template-columns: 1fr;
    }
  }

  .see-more {
    display: block;
    width: 150px;
    margin: 20px auto 0 auto;
    padding: 10px;
    background-color: ${ACCENT_COLOR};
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-weight: 600;
  }
`;

export const CardText = styled.div`
  font-family: "Montserrat", sans-serif;
  color: #333;
  text-align: center;
  line-height: 1.4;
  margin-bottom: 8px;

  h3 {
    font-size: 1.2rem;
    font-weight: 700;
    margin: 0 0 6px 0;
    background: linear-gradient(to right, #6c9a76, #3e6b4c);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
  }

  p {
    font-size: 1rem;
    font-weight: 500;
    color: #555;
    margin: 0 0 4px 0;
  }

  .time {
    font-size: 0.95rem;
    color: #4caf50;
    font-weight: 600;
  }
`;

export const AppointmentCard = styled.div`
  background-color: white;
  border: 1px solid #ddd;
  border-radius: 12px;
  padding: 20px 15px;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  transition: transform 0.2s ease, box-shadow 0.2s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100%;
    height: 160px;
    object-fit: cover;
    border-radius: 8px;
    margin-bottom: 15px;
  }

  .details {
    margin-bottom: 15px;
    width: 100%;

    h3,
    p,
    .time {
      font-family: "Montserrat", sans-serif;
      color: #333;
      text-align: center;
      line-height: 1.4;
    }
    h3 {
      font-size: 1.2rem;
      font-weight: 700;
      margin-bottom: 6px;
      background: linear-gradient(to right, #6c9a76, #3e6b4c);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
    p {
      font-size: 1rem;
      font-weight: 500;
      color: #555;
      margin-bottom: 4px;
    }
    .time {
      font-size: 0.95rem;
      color: #4caf50;
      font-weight: 600;
    }
  }

  .cancel {
    background-color: transparent;
    color: #d32f2f;
    border: 1px solid #d32f2f;
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-weight: 600;
    font-size: 0.9rem;
    transition: all 0.2s ease;

    &:hover {
      background-color: #d32f2f;
      color: white;
    }
  }
`;