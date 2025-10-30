import React from 'react';
import {
  FooterContainer,
  FooterContent,
  FooterContacts,
  FooterAddress,
  FooterIcons,
  FooterParagraph,
  FooterCopyright,
  A,
} from './Footer.styles';
import { FaFacebook, FaInstagram, FaTelegram, FaLinkedin, FaYoutube } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <FooterContainer>
      <FooterContent>
        <FooterContacts>
          <h3>Contacts</h3>
          <a
            href="tel:+380932872580"
            style={{ color: 'var(--main)', textDecoration: 'none' }}
          >
            +38 (093) 287-25-80
          </a>
          <br />
          <a
            href='mailto:harmony.studio@gmail.com'
            style={{ color: 'var(--main)', textDecoration: 'none' }}
          >
            harmony.studio@gmail.com
          </a>
          <FooterIcons>
            <A href='https://facebook.com' target='_blank' rel='noopener noreferrer'>
              <FaFacebook size={30} />
            </A>
            <A href='https://instagram.com' target='_blank' rel='noopener noreferrer'>
              <FaInstagram size={30} />
            </A>
            <A href='https://telegram.org' target='_blank' rel='noopener noreferrer'>
              <FaTelegram size={30} />
            </A>
            <A href='https://linkedin.com' target='_blank' rel='noopener noreferrer'>
              <FaLinkedin size={30} />
            </A>
          </FooterIcons>
        </FooterContacts>

        <FooterAddress>
          <h3>Address</h3>
          <FooterParagraph>Springfield, 62704</FooterParagraph>
          <FooterParagraph>123 Maple Street</FooterParagraph>
        </FooterAddress>
      </FooterContent>

      <FooterCopyright>
        © 2025 Harmony Studio. All rights reserved.
      </FooterCopyright>
    </FooterContainer>
  );
};

export default Footer;
