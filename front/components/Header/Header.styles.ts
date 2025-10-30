import styled from 'styled-components';

export const HeaderContainer = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 60px;
  background-color: rgba(var(--grey-rgba), 0.3);
  color: var(--accent);
  z-index: 1000;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 40px;
  box-sizing: border-box;

  @media (max-width: 768px) {
    padding: 0 20px;
    height: 50px;
  }
`;

export const Logo = styled.div`
  font-family: 'MonteCarlo', cursive;
  font-size: 24px;
  cursor: pointer;

  &:hover {
    color: var(--secondary-accent);
  }

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

export const Nav = styled.nav`
  display: flex;
  flex-direction: row;
  gap: 20px;
  font-family: 'Montserrat', sans-serif;
  font-weight: 400;
  margin-right: 30px;

  @media (max-width: 768px) {
    gap: 10px;
    margin-right: 0;
  }
`;

export const NavLink = styled.a`
  color: var(--accent);
  text-decoration: none;
  transition: font-weight 0.2s, color 0.3s;

  &:hover {
    font-weight: 600;
    color: var(--secondary-accent);
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;
