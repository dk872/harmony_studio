import styled from "styled-components";

export const RegisterFormContainer = styled.div`
  min-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
  background-color: var(--main);
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(var(--grey-rgba), 0.2);
  text-align: center;

  h2 {
    font-family: "Montserrat", cursive;
    font-size: 36px;
    color: var(--accent);
    margin-bottom: 20px;
    margin-top: 0;
  }

  p {
    font-family: "Montserrat", sans-serif;
    font-size: 14px;
    color: var(--grey);
    margin: 10px 0;
  }
`;

export const LinkText = styled.a`
  color: var(--accent);
  text-decoration: none;
  font-weight: 500;
  font-size: 14px;

  &:hover {
    text-decoration: underline;
  }
`;