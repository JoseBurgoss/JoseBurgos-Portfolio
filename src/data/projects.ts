import { ImageMetadata } from "astro";  
import elZuliano from "../../public/projects/el-zuliano.png";  
import reportaya from "../../public/projects/reportaya.png";  
import webNotes from "../../public/projects/web-notes.png";  
import virtualStore from "../../public/projects/virtual-store.png";  
  
interface Project {  
  title: string;  
  image: ImageMetadata;  
  link: string;  
  preview: string;  
  status: string;  
  description: string;  
  technologies: string[];  
}  
  
export const projects: Project[] = [  
  {  
    title: "El Zuliano",  
    description: "News platform with React, HTML, and CSS. Includes registration, subscription, social media integration, real-time updates, and responsive design.",  
    image: elZuliano as ImageMetadata,  
    link: "https://github.com/JoseBurgoss/El-Zuliano",  
    preview: "https://el-zuliano.vercel.app",  
    status: "Deployed",  
    technologies: ["React", "HTML", "CSS", "JavaScript"]  
  },  
  {  
    title: "ReportaYa",  
    description: "Android-based mobile application that allows citizens of Maracaibo to easily and quickly report urban problems in real-time.",  
    image: reportaya as ImageMetadata,  
    link: "https://github.com/joseandresburgos/reportaya",  
    preview: "https://play.google.com/store/apps/details?id=com.reportaya",  
    status: "Mobile App (Not deployed)",  
    technologies: ["Java", "Firebase", "Android"]  
  },  
  {  
    title: "Web Notes Application",  
    description: "Notes app with React. Allows creating, saving, deleting, and customizing notes. Responsive design.",  
    image: webNotes as ImageMetadata,  
    link: "https://github.com/JoseBurgoss/Online_Notepad",  
    preview: "https://online-notepad-jade.vercel.app/",  
    status: "Deployed",  
    technologies: ["React", "JavaScript", "CSS"]  
  },  
  {  
    title: "Virtual Store",  
    description: "Online store with React. Features: add/remove products, filtered search, and quantity management.",  
    image: virtualStore as ImageMetadata,  
    link: "https://github.com/JoseBurgoss/Tienda-virtual",  
    preview: "https://tienda-virtual-pi-liart.vercel.app/",  
    status: "Deployed",  
    technologies: ["React", "JavaScript", "CSS"]  
  }  
];