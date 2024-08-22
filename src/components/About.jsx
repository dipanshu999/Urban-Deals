import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import Fade from '@mui/material/Fade';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

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
    <div className='min-h-screen'>

      <div className="profile ">
        <div className="pic w-20 h-20 ">
          <img className='w-full h-full object-cover' src="https://media.licdn.com/dms/image/v2/D5635AQFnYuhQyD0bBQ/profile-framedphoto-shrink_200_200/profile-framedphoto-shrink_200_200/0/1708197027423?e=1724947200&v=beta&t=XthPSfHdq_Gb_T54GxIlAXKZjwEASpJpM5Q1tVlxqS8" alt="" />
        </div>
      </div>


      <div className='border border-red-400 tab:w-2/3 mx-auto'>
        {arr.map((item, index) => (
          <Accordion
            key={index}
            className='border-green-400 border mt-2 '
            expanded={expanded === index}
            onChange={() => handleExpansion(index)}
           
            sx={{
              '& .MuiAccordion-region': { height: expanded === index ? 'auto' : 0 },
              '& .MuiAccordionDetails-root': { display: expanded === index ? 'block' : 'none' },
            }}
          >
            <AccordionSummary
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography style={{ fontWeight: 'bold', fontSize:'1.2em' }} className='font-bold'>{item.summary}</Typography>
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
