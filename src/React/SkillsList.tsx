import React, { useState } from "react";  
  
const CategoryIcons = {  
  "Web Development": (  
    <svg  
      xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 24 24"  
      fill="currentColor"  
      className="w-6 h-6 text-[var(--sec)] opacity-70"  
    >  
      <path d="M21 3C21.5523 3 22 3.44772 22 4V20C22 20.5523 21.5523 21 21 21H3C2.44772 21 2 20.5523 2 20V4C2 3.44772 2.44772 3 3 3H21ZM20 11H4V19H20V11ZM20 5H4V9H20V5ZM11 6V8H9V6H11ZM7 6V8H5V6H7Z"></path>  
    </svg>  
  ),  
  "Mobile Development": (  
    <svg  
      xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 24 24"  
      fill="currentColor"  
      className="w-6 h-6 text-[var(--sec)] opacity-70"  
    >  
      <path d="M7 4V20H17V4H7ZM6 2H18C18.5523 2 19 2.44772 19 3V21C19 21.5523 18.5523 22 18 22H6C5.44772 22 5 21.5523 5 21V3C5 2.44772 5.44772 2 6 2ZM12 17C12.5523 17 13 17.4477 13 18C13 18.5523 12.5523 19 12 19C11.4477 19 11 18.5523 11 18C11 17.4477 11.4477 17 12 17Z"></path>  
    </svg>  
  ),
  "Backend & Databases": (  
    <svg  
      xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 24 24"  
      fill="currentColor"  
      className="w-6 h-6 text-[var(--sec)] opacity-70"  
    >  
      <path d="M5 12V7C5 5.89543 5.89543 5 7 5H10V3H7C4.79086 3 3 4.79086 3 7V12C3 14.2091 4.79086 16 7 16H10V14H7C5.89543 14 5 13.1046 5 12ZM14 3V5H17C18.1046 5 19 5.89543 19 7V12C19 13.1046 18.1046 14 17 14H14V16H17C19.2091 16 21 14.2091 21 12V7C21 4.79086 19.2091 3 17 3H14Z"></path>  
    </svg>  
  ),  
  "Tools & Methodologies": (  
    <svg  
      xmlns="http://www.w3.org/2000/svg"  
      viewBox="0 0 24 24"  
      fill="currentColor"  
      className="w-6 h-6 text-[var(--sec)] opacity-70"  
    >  
      <path d="M5.33 3.271C5.9 2.621 6.814 2.215 7.8 2.215c.986 0 1.9.406 2.47 1.056L15.736 9H20c1.105 0 2 .895 2 2s-.895 2-2 2h-4.264l-5.466 5.729c-.57.65-1.484 1.056-2.47 1.056-.986 0-1.9-.406-2.47-1.056L2 13V11l5.33-7.729z"></path>  
    </svg>  
  ),  
};  
  
const SkillsList = () => {  
  const [openItem, setOpenItem] = useState<string | null>(null);  
  
  const skills = {  
    "Web Development": [  
      "Single Page Applications with React",  
      "RESTful APIs with Node.js and Express.js",  
      "Responsive design with HTML5 and CSS3",  
      "TypeScript for type-safe development",  
      "JWT authentication implementation"  
    ],  
    "Mobile Development": [  
      "Android native apps with Java",  
      "React Native with Expo",  
      "Firebase integration for real-time features",  
      "Mobile-optimized user interfaces"  
    ],  
    "Backend & Databases": [  
      "PostgreSQL database design and optimization",  
      "Firebase Firestore and Authentication",  
      "RESTful API development and documentation",  
      "SQL query optimization and database management"  
    ],  
    "Tools & Methodologies": [  
      "Git Flow and version control",  
      "Docker containerization",  
      "Agile/Scrum methodologies",  
      "Unit testing with Jest",  
      "Webpack bundling and optimization",  
      "Monitoring with Sentry"  
    ]  
  };  
  
  const toggleItem = (item: string) => {  
    setOpenItem(openItem === item ? null : item);  
  };  
  
  return (  
    <div className="text-left pt-3 md:pt-9">  
      <h3 className="text-[var(--white)] text-3xl md:text-4xl font-semibold md:mb-6">  
        What I do?  
      </h3>  
      <ul className="space-y-4 mt-4 text-lg">  
        {Object.entries(skills).map(([category, items]) => (  
          <li key={category} className="w-full">  
            <div  
              onClick={() => toggleItem(category)}  
              className="md:w-[400px] w-full bg-[#1414149c] rounded-2xl text-left hover:bg-opacity-80 transition-all border border-[var(--white-icon-tr)] cursor-pointer overflow-hidden"  
            >  
              <div className="flex items-center gap-3 p-4">  
                {CategoryIcons[category as keyof typeof CategoryIcons]}  
                <div className="flex items-center gap-2 flex-grow justify-between">  
                  <div className="min-w-0 max-w-[200px] md:max-w-none overflow-hidden">  
                    <span className="block truncate text-[var(--white)] text-lg">  
                      {category}  
                    </span>  
                  </div>  
                  <svg  
                    xmlns="http://www.w3.org/2000/svg"  
                    viewBox="0 0 24 24"  
                    fill="currentColor"  
                    className={`w-6 h-6 text-[var(--white)] transform transition-transform flex-shrink-0 ${  
                      openItem === category ? "rotate-180" : ""  
                    }`}  
                  >  
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>  
                  </svg>  
                </div>  
              </div>  
  
              <div  
                className={`transition-all duration-300 px-4 ${  
                  openItem === category  
                    ? "max-h-[500px] pb-4 opacity-100"  
                    : "max-h-0 opacity-0"  
                }`}  
              >  
                <ul className="space-y-2 text-[var(--white-icon)] text-sm">  
                  {items.map((item, index) => (  
                    <div key={index} className="flex items-center">  
                      <span className="pl-1">•</span>  
                      <li className="pl-3">{item}</li>  
                    </div>  
                  ))}  
                </ul>  
              </div>  
            </div>  
          </li>  
        ))}  
      </ul>  
    </div>  
  );  
};  
  
export default SkillsList;