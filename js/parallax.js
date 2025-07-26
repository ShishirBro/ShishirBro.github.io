// Enhanced parallax and interactive effects for futuristic theme

document.addEventListener("DOMContentLoaded", () => {
    // Create bubble container
    const bubbleContainer = document.createElement("div");
    bubbleContainer.id = "bubble-container";
    bubbleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: 9999;
        overflow: hidden;
    `;
    document.body.appendChild(bubbleContainer);

    // Create animated grid lines
    const gridContainer = document.createElement("div");
    gridContainer.id = "grid-container";
    gridContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;
    
    // Create grid lines
    for (let i = 0; i < 20; i++) {
        const line = document.createElement("div");
        line.style.cssText = `
            position: absolute;
            width: 1px;
            height: 100vh;
            background: linear-gradient(to bottom, transparent, hsl(180, 100%, 50%), transparent);
            left: ${i * 5}%;
            animation: grid-pulse ${2 + Math.random() * 3}s ease-in-out infinite alternate;
        `;
        gridContainer.appendChild(line);
    }
    
    for (let i = 0; i < 15; i++) {
        const line = document.createElement("div");
        line.style.cssText = `
            position: absolute;
            width: 100vw;
            height: 1px;
            background: linear-gradient(to right, transparent, hsl(180, 100%, 50%), transparent);
            top: ${i * 6.67}%;
            animation: grid-pulse ${2 + Math.random() * 3}s ease-in-out infinite alternate;
        `;
        gridContainer.appendChild(line);
    }
    
    document.body.appendChild(gridContainer);

    // Add grid pulse animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes grid-pulse {
            0% { opacity: 0.05; }
            100% { opacity: 0.15; }
        }
        
        @keyframes particle-float {
            0% { transform: translateY(0px) rotate(0deg); opacity: 0; }
            10% { opacity: 1; }
            90% { opacity: 1; }
            100% { transform: translateY(-100vh) rotate(360deg); opacity: 0; }
        }
    `;
    document.head.appendChild(style);

    // Enhanced mouse trail effect
    let mouseX = 0, mouseY = 0;
    let trailing = false;

    document.addEventListener("mousemove", (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (!trailing) {
            trailing = true;
            createTrail();
        }
    });

    function createTrail() {
        const trail = document.createElement("div");
        const size = Math.random() * 8 + 4;
        
        trail.style.cssText = `
            position: absolute;
            left: ${mouseX - size / 2}px;
            top: ${mouseY - size / 2}px;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: radial-gradient(circle, hsl(180, 100%, 70%) 0%, hsl(180, 100%, 50%) 50%, transparent 100%);
            pointer-events: none;
            animation: trail-fade 1s ease-out forwards;
        `;
        
        bubbleContainer.appendChild(trail);
        
        setTimeout(() => {
            if (trail.parentNode) {
                trail.parentNode.removeChild(trail);
            }
        }, 1000);
        
        setTimeout(() => {
            trailing = false;
        }, 50);
    }

    // Add trail fade animation
    style.textContent += `
        @keyframes trail-fade {
            0% { 
                opacity: 0.8; 
                transform: scale(1);
                filter: blur(0px);
            }
            100% { 
                opacity: 0; 
                transform: scale(2);
                filter: blur(4px);
            }
        }
    `;

    // Floating particles
    function createFloatingParticle() {
        const particle = document.createElement("div");
        const size = Math.random() * 6 + 2;
        const startX = Math.random() * window.innerWidth;
        const colors = [
            'hsl(180, 100%, 50%)',
            'hsl(260, 100%, 60%)',
            'hsl(120, 100%, 50%)'
        ];
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        particle.style.cssText = `
            position: absolute;
            left: ${startX}px;
            top: 100vh;
            width: ${size}px;
            height: ${size}px;
            border-radius: 50%;
            background: ${color};
            box-shadow: 0 0 ${size * 2}px ${color};
            pointer-events: none;
            animation: particle-float ${15 + Math.random() * 10}s linear forwards;
        `;
        
        bubbleContainer.appendChild(particle);
        
        setTimeout(() => {
            if (particle.parentNode) {
                particle.parentNode.removeChild(particle);
            }
        }, 25000);
    }

    // Create particles periodically
    setInterval(createFloatingParticle, 2000);

    // Parallax scroll effect for sections
    const parallaxElements = document.querySelectorAll('.content-section');
    
    function updateParallax() {
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        parallaxElements.forEach((element, index) => {
            const speed = (index + 1) * 0.1;
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px)`;
        });
    }

    // Throttled scroll handler
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(updateParallax);
            ticking = true;
        }
    }

    window.addEventListener('scroll', () => {
        requestTick();
        ticking = false;
    });

    // Interactive hover effects for project cards
    const projects = document.querySelectorAll('.project');
    projects.forEach(project => {
        project.addEventListener('mouseenter', () => {
            project.style.transform = 'translateY(-10px) scale(1.02)';
            project.style.boxShadow = '0 20px 40px hsl(180, 100%, 50% / 0.3)';
        });
        
        project.addEventListener('mouseleave', () => {
            project.style.transform = 'translateY(0) scale(1)';
            project.style.boxShadow = 'none';
        });
    });

    // Glitch effect for terminal text
    const terminalTexts = document.querySelectorAll('.terminal-body p');
    function addGlitchEffect() {
        const randomText = terminalTexts[Math.floor(Math.random() * terminalTexts.length)];
        if (randomText) {
            randomText.style.animation = 'glitch 0.3s ease-in-out';
            setTimeout(() => {
                randomText.style.animation = '';
            }, 300);
        }
    }

    // Add glitch animation
    style.textContent += `
        @keyframes glitch {
            0% { transform: translateX(0); }
            20% { transform: translateX(-2px); }
            40% { transform: translateX(2px); }
            60% { transform: translateX(-1px); }
            80% { transform: translateX(1px); }
            100% { transform: translateX(0); }
        }
    `;

    // Random glitch effect
    setInterval(addGlitchEffect, 5000);

    // Enhanced cursor following
    const cursor = document.querySelector('.cursor');
    if (cursor) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
        });

        // Interactive elements cursor effect
        const interactiveElements = document.querySelectorAll('a, button, .button');
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1.5)';
                cursor.style.borderColor = 'hsl(120, 100%, 50%)';
                cursor.style.boxShadow = '0 0 30px hsl(120, 100%, 50%)';
            });
            
            element.addEventListener('mouseleave', () => {
                cursor.style.transform = 'translate(-50%, -50%) scale(1)';
                cursor.style.borderColor = 'hsl(180, 100%, 50%)';
                cursor.style.boxShadow = '0 0 20px hsl(180, 100%, 50%)';
            });
        });
    }

    // Typing effect for terminal
    function typeWriter(element, text, speed = 50) {
        let i = 0;
        element.innerHTML = '';
        
        function type() {
            if (i < text.length) {
                element.innerHTML += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }

    // Auto-scroll navigation highlighting
    const navLinks = document.querySelectorAll('nav a');
    const sections = document.querySelectorAll('section[id]');
    
    function highlightNavigation() {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= (sectionTop - 200)) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').slice(1) === current) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', highlightNavigation);

    // Initialize
    updateParallax();
    highlightNavigation();
});