import React, { useState, useEffect, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Briefcase, Code, Mail, Linkedin, Github, FileText, User, Star, Award, Zap, Cpu, Server, Database, CodeXml, GraduationCap } from 'lucide-react';

// --- Constellation Canvas Component ---
const ConstellationCanvas = () => {
    const canvasRef = useRef(null);
    const mouse = useRef({ x: undefined, y: undefined, radius: 150 });

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        let particlesArray;

        const handleMouseMove = (event) => {
            mouse.current.x = event.x;
            mouse.current.y = event.y;
        };

        window.addEventListener('mousemove', handleMouseMove);

        class Particle {
            constructor(x, y, directionX, directionY, size, color) {
                this.x = x;
                this.y = y;
                this.directionX = directionX;
                this.directionY = directionY;
                this.size = size;
                this.color = color;
            }

            draw() {
                ctx.beginPath();
                ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
                ctx.fillStyle = 'rgba(173, 216, 230, 0.5)'; // Light blue with transparency
                ctx.fill();
            }

            update() {
                if (this.x > canvas.width || this.x < 0) {
                    this.directionX = -this.directionX;
                }
                if (this.y > canvas.height || this.y < 0) {
                    this.directionY = -this.directionY;
                }
                this.x += this.directionX;
                this.y += this.directionY;
                this.draw();
            }
        }

        function init() {
            particlesArray = [];
            let numberOfParticles = (canvas.height * canvas.width) / 9000;
            for (let i = 0; i < numberOfParticles; i++) {
                let size = (Math.random() * 2) + 1;
                let x = (Math.random() * ((window.innerWidth - size * 2) - (size * 2)) + size * 2);
                let y = (Math.random() * ((window.innerHeight - size * 2) - (size * 2)) + size * 2);
                let directionX = (Math.random() * .4) - .2;
                let directionY = (Math.random() * .4) - .2;
                let color = 'rgba(173, 216, 230, 0.5)';

                particlesArray.push(new Particle(x, y, directionX, directionY, size, color));
            }
        }

        function connect() {
            let opacityValue = 1;
            for (let a = 0; a < particlesArray.length; a++) {
                for (let b = a; b < particlesArray.length; b++) {
                    let distance = ((particlesArray[a].x - particlesArray[b].x) * (particlesArray[a].x - particlesArray[b].x)) +
                        ((particlesArray[a].y - particlesArray[b].y) * (particlesArray[a].y - particlesArray[b].y));
                    if (distance < (canvas.width / 7) * (canvas.height / 7)) {
                        opacityValue = 1 - (distance / 20000);
                        ctx.strokeStyle = `rgba(173, 216, 230, ${opacityValue})`;
                        ctx.lineWidth = 1;
                        ctx.beginPath();
                        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
                        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
                        ctx.stroke();
                    }
                }
            }
        }

        function animate() {
            requestAnimationFrame(animate);
            ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

            for (let i = 0; i < particlesArray.length; i++) {
                particlesArray[i].update();
            }
            connect();
        }

        const handleResize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            mouse.current.radius = ((canvas.height/80) * (canvas.width/80));
            init();
        }
        window.addEventListener('resize', handleResize);

        init();
        animate();

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('resize', handleResize);
        }
    }, []);

    return <canvas ref={canvasRef} style={{ position: 'fixed', top: 0, left: 0, zIndex: -1, background: '#0a192f' }} />;
};


// Custom Hook for Mouse Position
const useMousePosition = () => {
    const [mousePosition, setMousePosition] = useState({ x: null, y: null });

    useEffect(() => {
        const mouseMoveHandler = (event) => {
            const { clientX, clientY } = event;
            setMousePosition({ x: clientX, y: clientY });
        };
        document.addEventListener("mousemove", mouseMoveHandler);

        return () => {
            document.removeEventListener("mousemove", mouseMoveHandler);
        };
    }, []);

    return mousePosition;
};

// Animated Component on Scroll
const AnimatedSection = ({ children, className, id }) => {
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            controls.start("visible");
        }
    }, [controls, inView]);

    return (
        <motion.section
            id={id}
            ref={ref}
            animate={controls}
            initial="hidden"
            variants={{
                visible: { opacity: 1, y: 0 },
                hidden: { opacity: 0, y: 50 },
            }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className={className}
        >
            {children}
        </motion.section>
    );
};


// Main App Component
const App = () => {
    const [activeSection, setActiveSection] = useState('home');
    const [cursorVariant, setCursorVariant] = useState("default");
    const { x, y } = useMousePosition();

    // Changed to a local path
    const professionalPhotoPath = "/images/ram-photo.png"; 

    const portfolioData = {
        name: "Ram Vaidya",
        title: "Software Engineer",
        tagline: "Love Building innovate solutions and solving complex problems",
        about: "Hi, I am a Software Engineer currently pursuing my Masters in Computer Science at Cornell University. I love swimming, watching movies and playing pickleball.",
        projects: [
            {
                title: "E-commerce Platform",
                description: "A full-featured e-commerce website with product listings, a shopping cart, and a secure checkout process.",
                tech: ["React", "Node.js", "PostgreSQL", "Stripe API"],
                liveUrl: "#",
                repoUrl: "#",
            },
            {
                title: "Project Management Tool",
                description: "A collaborative platform for teams to manage tasks, track progress, and communicate effectively.",
                tech: ["Next.js", "TypeScript", "Firebase", "Tailwind CSS"],
                liveUrl: "#",
                repoUrl: "#",
            },
            {
                title: "Personal Blog",
                description: "A dynamic blog application with a custom CMS for creating and managing posts.",
                tech: ["Vue.js", "Express", "MongoDB"],
                liveUrl: "#",
                repoUrl: "#",
            },
        ],
        experience: [
            {
                role: "Software Engineer Intern",
                company: "Amazon",
                period: "September 2024 - December 2024",
                logo: "/images/amazon-logo.png" // Local path for Amazon logo
            },
            {
                role: "Cloud Engineer Intern",
                company: "Infosys - Univision",
                period: "June 2024 - August 2024",
                logo: "/images/infosys-logo.png" // Local path for Infosys-Univision logo
            },
            {
                role: "Software Engineer Intern",
                company: "Persistent Systems",
                period: "June 2023 - August 2023",
                logo: "/images/persistent-logo.png" // Local path for Persistent Systems logo
            },
            {
                role: "Mathematics Course Assistant",
                company: "University of Wisconsin - Madison",
                period: "Sept 2022 - May 2025",
                logo: "/images/uw-madison-logo.png" // Local path for UW-Madison logo
            },
        ],
        education: [
            {
                degree: "Master of Engineering in Computer Science",
                university: "Cornell University",
                period: "2025 - 2026",
                logo: "/images/cornell-logo.png" // Local path for Cornell logo
            },
            {
                degree: "Bachelor of Science in Computer Science, Data Science, Mathematics",
                university: "University of Wisconsin - Madison",
                period: "2021 - 2025",
                logo: "/images/uw-madison-logo.png" // Local path for UW-Madison logo
            },
        ],
        contact: {
            email: "vaidyaram0501@gmail.com",
            linkedin: "https://www.linkedin.com/in/ram-vaidya/",
            github: "https://github.com/ramvaidya05",
            resume: "/Ram_Resume_Intern.pdf",
        },
    };

    const navLinks = [
        { id: 'home', title: 'Home', icon: <User className="w-5 h-5" /> },
        { id: 'about', title: 'About', icon: <User className="w-5 h-5" /> },
        { id: 'experience', title: 'Experience', icon: <Award className="w-5 h-5" /> },
        { id: 'education', title: 'Education', icon: <GraduationCap className="w-5 h-5" /> }, // Moved Education link
        { id: 'projects', title: 'Projects', icon: <Briefcase className="w-5 h-5" /> },
        { id: 'contact', title: 'Contact', icon: <Mail className="w-5 h-5" /> },
    ];

    const textEnter = () => setCursorVariant("text");
    const textLeave = () => setCursorVariant("default");

    const cursorVariants = {
        default: {
            height: 32,
            width: 32,
            backgroundColor: "rgba(173, 216, 230, 0.5)",
            mixBlendMode: "difference"
        },
        text: {
            height: 100,
            width: 100,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            mixBlendMode: "difference"
        }
    };

    return (
        <div className="text-gray-200 font-sans leading-relaxed cursor-none bg-transparent">
            <ConstellationCanvas />
            <motion.div
                className="fixed top-0 left-0 h-8 w-8 bg-blue-600 rounded-full pointer-events-none z-[9999]"
                variants={cursorVariants}
                animate={cursorVariant}
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                style={{
                    translateX: x ? x - 16 : -100,
                    translateY: y ? y - 16 : -100,
                }}
            />
            
            {/* Header & Navigation */}
            <motion.header 
                initial={{ y: -100 }}
                animate={{ y: 0 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="fixed top-0 left-0 right-0 z-50 bg-slate-900/80 backdrop-blur-sm shadow-md">
                <div className="container mx-auto px-6 py-3 flex justify-between items-center">
                    <a href="#home" className="text-2xl font-bold text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>{portfolioData.name}</a>
                    <nav className="hidden md:flex space-x-6">
                        {navLinks.map(link => (
                            <a key={link.id} href={`#${link.id}`} onMouseEnter={textEnter} onMouseLeave={textLeave} className="flex items-center gap-2 text-gray-300 hover:text-cyan-400 transition-colors">
                                {link.icon}
                                {link.title}
                            </a>
                        ))}
                    </nav>
                    <button className="md:hidden text-white">
                        <Code className="w-6 h-6" />
                    </button>
                </div>
            </motion.header>

            <main className="container mx-auto px-6 pt-24 relative z-10">
                {/* Hero Section */}
                <section id="home" className="min-h-screen flex flex-col md:flex-row items-center justify-center text-center md:text-left">
                    <motion.div 
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
                        className="md:w-1/2 flex justify-center md:justify-start">
                        {/* Now using an img tag with local path */}
                        <img src={professionalPhotoPath} alt="Ram Vaidya" className="rounded-full w-64 h-64 md:w-80 md:h-80 mx-auto md:mx-0 border-8 border-slate-700 shadow-lg object-cover" />
                    </motion.div>
                    <motion.div 
                        initial={{ x: 100, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
                        className="md:w-1/2 mt-8 md:mt-0">
                        <h1 className="text-4xl md:text-6xl font-bold text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>{portfolioData.name}</h1>
                        <h2 className="text-2xl md:text-3xl text-cyan-400 mt-2" onMouseEnter={textEnter} onMouseLeave={textLeave}>{portfolioData.title}</h2>
                        <p className="mt-4 text-lg text-gray-300" onMouseEnter={textEnter} onMouseLeave={textLeave}>{portfolioData.tagline}</p>
                        <div className="mt-8 flex justify-center md:justify-start space-x-4">
                            <motion.a whileHover={{ scale: 1.1, y: -5 }} href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="p-3 bg-cyan-500 text-white rounded-full hover:bg-cyan-600 transition-all duration-300 shadow-lg" onMouseEnter={textEnter} onMouseLeave={textLeave}><Linkedin /></motion.a>
                            <motion.a whileHover={{ scale: 1.1, y: -5 }} href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="p-3 bg-slate-600 text-white rounded-full hover:bg-slate-700 transition-all duration-300 shadow-lg" onMouseEnter={textEnter} onMouseLeave={textLeave}><Github /></motion.a>
                            <motion.a whileHover={{ scale: 1.1, y: -5 }} href={portfolioData.contact.resume} download className="p-3 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all duration-300 shadow-lg" onMouseEnter={textEnter} onMouseLeave={textLeave}><FileText /></motion.a>
                        </div>
                    </motion.div>
                </section>

                {/* About Section */}
                <AnimatedSection id="about" className="py-20">
                    <h2 className="text-3xl font-bold text-center mb-12 text-white" onMouseEnter={textEnter} onMouseLeave={textLeave}>About Me</h2>
                    <div className="max-w-3xl mx-auto bg-slate-800/70 backdrop-blur-sm p-8 rounded-lg shadow-lg">
                        <p className="text-lg text-gray-300 leading-relaxed" onMouseEnter={textEnter} onMouseLeave={textLeave}>{portfolioData.about}</p>
                    </div>
                </AnimatedSection>
                
                {/* Experience Section */}
                <AnimatedSection id="experience" className="py-20">
                    <h2 className="text-3xl font-bold text-center mb-12" onMouseEnter={textEnter} onMouseLeave={textLeave}>Work Experience</h2>
                    <div className="max-w-4xl mx-auto space-y-8">
                        {portfolioData.experience.map((exp, index) => (
                            <motion.div
                                key={index}
                                className="bg-slate-800/70 backdrop-blur-sm p-6 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6"
                                whileHover={{ y: -5, boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 8px -4px rgba(0, 0, 0, 0.05)" }}
                                transition={{ duration: 0.3 }}
                                onMouseEnter={textEnter} onMouseLeave={textLeave}
                            >
                                {/* Now using an img tag with local path */}
                                {exp.logo && (
                                    <img src={exp.logo} alt={`${exp.company} Logo`} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                                )}
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-white">{exp.role}</h3>
                                    <p className="text-cyan-400 text-lg">{exp.company}</p>
                                    <p className="text-gray-400 text-sm mb-2">{exp.period}</p>
                                    <p className="text-gray-300 leading-relaxed">{exp.description}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>

                {/* Education Section */}
                <AnimatedSection id="education" className="py-20">
                    <h2 className="text-3xl font-bold text-center mb-12" onMouseEnter={textEnter} onMouseLeave={textLeave}>Education</h2>
                    <div className="max-w-4xl mx-auto space-y-8">
                        {portfolioData.education.map((edu, index) => (
                            <motion.div
                                key={index}
                                className="bg-slate-800/70 backdrop-blur-sm p-8 rounded-lg shadow-lg flex flex-col md:flex-row items-start md:items-center gap-6"
                                whileHover={{ y: -5, boxShadow: "0 15px 20px -5px rgba(0, 0, 0, 0.1), 0 8px 8px -4px rgba(0, 0, 0, 0.05)" }}
                                transition={{ duration: 0.3 }}
                                onMouseEnter={textEnter} onMouseLeave={textLeave}
                            >
                                {/* Now using an img tag with local path */}
                                {edu.logo && (
                                    <img src={edu.logo} alt={`${edu.university} Logo`} className="w-12 h-12 rounded-full object-cover flex-shrink-0" />
                                )}
                                <div className="flex-grow">
                                    <h3 className="text-xl font-bold text-white">{edu.degree}</h3>
                                    <p className="text-cyan-400 text-lg">{edu.university}</p>
                                    <p className="text-gray-400 text-sm">{edu.period}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>


                {/* Projects Section */}
                <AnimatedSection id="projects" className="py-20">
                    <h2 className="text-3xl font-bold text-center mb-12" onMouseEnter={textEnter} onMouseLeave={textLeave}>Projects</h2>
                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {portfolioData.projects.map((project, index) => (
                            <motion.div 
                                key={index} 
                                className="bg-slate-800/70 backdrop-blur-sm rounded-lg shadow-lg overflow-hidden"
                                whileHover={{ y: -8, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.2), 0 10px 10px -5px rgba(0, 0, 0, 0.1)" }}
                                transition={{ duration: 0.3 }}
                                onMouseEnter={textEnter} onMouseLeave={textLeave}
                            >
                                <div className="p-6">
                                    <h3 className="text-xl font-bold mb-2 text-white">{project.title}</h3>
                                    <p className="text-gray-400 mb-4">{project.description}</p>
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        {project.tech.map(t => <span key={t} className="bg-cyan-900 text-cyan-200 text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full">{t}</span>)}
                                    </div>
                                    <div className="flex justify-between">
                                        <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">Live Demo</a>
                                        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:underline">GitHub Repo</a>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </AnimatedSection>
                
            </main>

            {/* Footer */}
            <footer className="bg-slate-900/80 backdrop-blur-sm py-6 text-center relative z-10">
                <div className="container mx-auto px-6">
                    <div className="flex justify-center space-x-4 mb-4">
                        <a href={portfolioData.contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-cyan-400"><Linkedin /></a>
                        <a href={portfolioData.contact.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white"><Github /></a>
                        <a href={`mailto:${portfolioData.contact.email}`} className="text-gray-400 hover:text-red-400"><Mail /></a>
                    </div>
                    <p className="text-gray-500">&copy; {new Date().getFullYear()} {portfolioData.name}. All Rights Reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default App;
