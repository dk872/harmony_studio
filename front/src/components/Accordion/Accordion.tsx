import React, { useState } from 'react';
import {
  AccordionContainer,
  AccordionItem,
  AccordionHeader,
  AccordionContent,
  IconWrapper,
} from './Accordion.styles';
import { FaPlus, FaMinus } from 'react-icons/fa';

interface AccordionProps {
  items: { title: string; content: string }[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleItem = (index: number) => {
    setOpenIndex(index === openIndex ? null : index);
  };

  return (
    <AccordionContainer>
      {items.map((item, index) => (
        <AccordionItem key={index}>
          <AccordionHeader onClick={() => toggleItem(index)}>
            {item.title}
            <IconWrapper isOpen={openIndex === index}>
              {openIndex === index ? <FaMinus /> : <FaPlus />}
            </IconWrapper>
          </AccordionHeader>
          <AccordionContent isOpen={openIndex === index}>
            <p>{item.content}</p>
          </AccordionContent>
        </AccordionItem>
      ))}
    </AccordionContainer>
  );
};

export default Accordion;
