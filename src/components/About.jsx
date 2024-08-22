import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';

export default function About() {
  const [expanded, setExpanded] = React.useState(false);
  
  const arr = [
    { summary: 'Random summary to be written here', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rerum inventore nostrum!' },
    { summary: 'Random summary to be written here', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rerum inventore nostrum!' },
    { summary: 'Random summary to be written here', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rerum inventore nostrum!' },
    { summary: 'Random summary to be written here', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rerum inventore nostrum!' },
    { summary: 'Random summary to be written here', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rerum inventore nostrum!' },
    { summary: 'Random summary to be written here', detail: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil rerum inventore nostrum!' }
  ];

  const handleExpansion = (index) => {
    setExpanded((prevExpanded) => (prevExpanded === index ? false : index));
  };

  return (
    <div>
      <div className='border border-red-400 w-2/3 mx-auto'>
        {arr.map((item, index) => (
          <Accordion
            key={index}
            className='border-green-400 border mt-2'
            expanded={expanded === index}
            onChange={() => handleExpansion(index)}
            TransitionComponent={Fade}
            TransitionProps={{ timeout: 400 }}
            sx={{
              '& .MuiAccordion-region': { height: expanded === index ? 'auto' : 0 },
              '& .MuiAccordionDetails-root': { display: expanded === index ? 'block' : 'none' },
            }}
          >
            <AccordionSummary
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography>{item.summary}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography>
                {item.detail}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </div>
    </div>
  );
}
