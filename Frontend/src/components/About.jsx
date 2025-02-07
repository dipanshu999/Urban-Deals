import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { ProductContext } from '../Utils/Context';

export default function About() {
  const [expanded, setExpanded] = React.useState(false);
  const{darkMode}=React.useContext(ProductContext);
  
  const arr = [
    { summary: '1.  What is Urban Deals ?', detail: "Urban-Deals is an API based E-commerce web app, which fetches data from an external API and stores it to user's local storage for showing unique data for each and every user" },
    { summary: '2.  Why did you choose React, Tailwind CSS and Material UI', detail: "React is used for making single page application which updates the website data by using virtual-dom, Tailwind CSS for using css classes and Material UI for using stylish components" },
    { summary: '3.  How data is fetched and stored in Urban Deals', detail: 'Data is fetched from an external API is called Fakestore where we get all the details of products like their price, title, category etc. After that the data is stored in the local storage of user so that unique data can be shown according to different users' },
    { summary: '4.  How is Responsive design is acheived in Urban-Deals', detail: 'Resposnive design is acheived by using Tailwind CSS where we took help of amazing CSS properties like Flex-box, width, padding etc.' },
    { summary: '5.  What features does Urban-Deals offer', detail: 'It offers you to perform CRUD(Create, Read, Update, Delete) operation , Web Scraping of liked products from Flipkart ,Email and third party based app authentication,  Category wise product filter, Toggle between light and dark mode, price evaluation at cart section etc and. Using Context API helps to access of data all over across the app' },
    // { summary: '6.  Random summary to be written here', detail: ' rerum inventore nostrum!' }
  ];

  const handleExpansion = (index) => {
    setExpanded((prevExpanded) => (prevExpanded === index ? false : index));
  };

  return (
    <div className=' mb-10 min-h-screen'>

      <div className="  profile border rounded-xl shadow-xl py-4 mt-8 w-[95vw] mob:w-[75vw] tab:w-[60vw] lap:w-[40vw] mx-auto">
        
        <div className=" pic w-24 h-24 tab:w-32 tab:h-32 rounded-full mx-auto overflow-hidden">
          <img className='w-full h-full object-cover' src='../my-pic.png' alt="profile" />
        </div>

        <div className="name">
          <p className={`text-4xl font-semibold ${darkMode?'text-white': 'text-slate-700'} text-center`}>Dipanshu Pandey</p>
        </div>

        <div className="description w-[90%] mob:w-[90%] tab:w-[80%] mx-auto mt-6 ">
          <p className={`text-center opacity-65 leading-[1.2rem]  mob:leading-5 ${darkMode?'text-white': 'text-slate-700'} `}> 
            <span className='text-blue-700 shadow-lg shadow-blue-200 text-lg font-semibold'>Frontend developer</span>  🚀 Crafting Seamless UIs with - React JS ☢|| Javascript || Tailwind CSS || HTML || CSS || Context API || Git/GitHub
          </p>
        </div>
      </div>


      <div className='w-[95vw] mob:w-[75vw] tab:w-[70vw] lap:w-[60vw] mx-auto mt-12'>
        {arr.map((item, index) => (
          <Accordion
            style={{background:'#fedc00' , borderRadius:'8px'}}
            key={index}
            className='border mt-2'
            expanded={expanded === index}
            onChange={() => handleExpansion(index)}
           
            sx={{
              '& .MuiAccordion-region': { height: expanded === index ? 'auto' : 0 },
              '& .MuiAccordionDetails-root': { display: expanded === index ? 'block' : 'none' },
            }}
          >
            <AccordionSummary
              style={{color:'#7312e9'}}
              expandIcon={<ExpandMoreIcon />}
              aria-controls={`panel${index + 1}-content`}
              id={`panel${index + 1}-header`}
            >
              <Typography style={{ fontWeight:'normal', fontSize:'1.2em' }} >{item.summary}</Typography>
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
