import React from 'react';
import Accordion from '../Accordion/Accordion';
import OurPromise from '../OurPromise/OurPromise';
import { NewsFaqContainer } from './NewsFaqPage.styles';

const news = [
  {
    title: 'Grand Opening!',
    content:
      'We’re excited to announce the grand opening of Harmony Studio! Join us this weekend for a special celebration. Enjoy complimentary consultations, exclusive discounts, and a chance to experience our services firsthand. Your journey to beauty and harmony begins here.',
  },
  {
    title: 'New Seasonal Services Now Available',
    content:
      'Discover our latest seasonal offerings designed to meet your beauty and relaxation needs. From rejuvenating facials to signature massages, our new services will help you feel your best. Book now and experience the seasonal specials before they’re gone!',
  },
  {
    title: 'Harmony Membership Program Launched',
    content:
      'We are thrilled to introduce our Harmony Membership Program. Members receive exclusive discounts, priority bookings, and tailored services. Join now to become part of our beauty and wellness family, and enjoy personalized care at its finest.',
  },
  {
    title: 'Customer Appreciation Week',
    content:
      "Thank you for being a part of our journey! During our Customer Appreciation Week, enjoy special offers, giveaways, and surprises. It's our way of saying thank you for your loyalty and trust in Harmony Studio.",
  },
  {
    title: 'Professional Development for Our Team',
    content:
      'Our team is dedicated to providing top-notch services by staying ahead in the beauty and wellness industry. We regularly attend training and workshops to ensure you receive the latest techniques and treatments. Your satisfaction is our priority.',
  },
];

const faq = [
  {
    title: 'What services do you offer?',
    content:
      'We offer a wide range of beauty and relaxation services, including facials, massages, manicures, pedicures, and hair treatments. Additionally, we provide seasonal specials and personalized care to meet your unique needs.',
  },
  {
    title: 'How can I book an appointment?',
    content:
      'Booking an appointment is easy! You can book online through our website or call our studio directly. Our friendly staff is always ready to assist you in finding the perfect time for your visit.',
  },
  {
    title: 'Do you offer discounts?',
    content:
      'Yes, we offer discounts during special promotions and events. Our Harmony Membership Program also provides exclusive benefits and savings. Follow us on social media to stay updated on our latest offers.',
  },
  {
    title: 'Can I reschedule my appointment?',
    content:
      'Absolutely! We understand that plans can change. Simply notify us at least 24 hours in advance, and we’ll be happy to help you reschedule your appointment to a more convenient time.',
  },
  {
    title: 'Are your products eco-friendly?',
    content:
      'Yes, we prioritize using eco-friendly and sustainable products. Our studio is committed to reducing environmental impact while providing the highest quality care for our clients.',
  },
];

const NewsFaqPage: React.FC = () => {
  return (
    <NewsFaqContainer>
      <h2>News</h2>
      <Accordion items={news} />
      <OurPromise />
      <h2>FAQ</h2>
      <Accordion items={faq} />
    </NewsFaqContainer>
  );
};

export default NewsFaqPage;
