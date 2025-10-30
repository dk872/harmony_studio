import styled from 'styled-components';

export const NewsFaqContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  background-color: var(--secondary);

  h2 {
    font-family: 'Montserrat', cursive;
    font-size: 36px;
    color: var(--accent);
    margin: 20px 0;
  }

  @media (max-width: 768px) {
    margin-top: 0;
  }
`;
