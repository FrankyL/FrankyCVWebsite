// Modern CV Website Interactions
document.addEventListener('DOMContentLoaded', function() {
    // Theme Management
    const themeToggle = document.getElementById('theme-toggle');
    const sunIcon = document.querySelector('.sun-icon');
    const moonIcon = document.querySelector('.moon-icon');
    
    // Check for saved theme preference or default to system preference
    const getCurrentTheme = () => {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme) {
            return savedTheme;
        }
        // Check system preference
        if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            return 'dark';
        }
        return 'light';
    };
    
    // Apply theme
    const applyTheme = (theme) => {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Update icons
        if (theme === 'dark') {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'block';
        } else {
            sunIcon.style.display = 'block';
            moonIcon.style.display = 'none';
        }
    };
    
    // Toggle theme
    const toggleTheme = () => {
        const currentTheme = getCurrentTheme();
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        applyTheme(newTheme);
    };
    
    // Initialize theme
    applyTheme(getCurrentTheme());
    
    // Event listener for theme toggle
    themeToggle.addEventListener('click', toggleTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            applyTheme(e.matches ? 'dark' : 'light');
        }
    });

    // Enhanced collapsible functionality
    document.querySelectorAll(".collapsible").forEach(button => {
        const content = button.nextElementSibling;
        const toggleSymbol = button.querySelector('.toggle-symbol');
        let isOpen = false;

        // Click to toggle
        button.addEventListener("click", function() {
            if (isOpen) {
                closeContent();
            } else {
                openContent();
            }
        });

        // Hover to preview (optional)
        let hoverTimeout;
        button.addEventListener("mouseenter", function() {
            if (!isOpen) {
                hoverTimeout = setTimeout(() => {
                    content.style.maxHeight = content.scrollHeight + "px";
                    content.style.opacity = "0.8";
                }, 500);
            }
        });

        button.addEventListener("mouseleave", function() {
            if (hoverTimeout) {
                clearTimeout(hoverTimeout);
                if (!isOpen) {
                    content.style.maxHeight = "0";
                    content.style.opacity = "0";
                }
            }
        });

        function openContent() {
            isOpen = true;
            content.classList.add("open");
            
            // Calculate the full height including padding and margins
            const contentHeight = content.scrollHeight;
            const computedStyle = window.getComputedStyle(content);
            const paddingTop = parseFloat(computedStyle.paddingTop);
            const paddingBottom = parseFloat(computedStyle.paddingBottom);
            const marginTop = parseFloat(computedStyle.marginTop);
            const marginBottom = parseFloat(computedStyle.marginBottom);
            
            // Set max-height to full content height plus some buffer
            const totalHeight = contentHeight + paddingTop + paddingBottom + marginTop + marginBottom + 20; // 20px buffer
            content.style.maxHeight = totalHeight + "px";
            
            toggleSymbol.textContent = "−";
            toggleSymbol.style.transform = "rotate(0deg)";
        }

        function closeContent() {
            isOpen = false;
            content.classList.remove("open");
            content.style.maxHeight = "0";
            toggleSymbol.textContent = "+";
            toggleSymbol.style.transform = "rotate(0deg)";
        }
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Add scroll-triggered animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe all sections for scroll animations
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });

    // Add typing effect to header
    const headerTitle = document.querySelector('header h1');
    if (headerTitle) {
        const text = headerTitle.textContent;
        headerTitle.textContent = '';
        
        let i = 0;
        const typeWriter = () => {
            if (i < text.length) {
                headerTitle.textContent += text.charAt(i);
                i++;
                setTimeout(typeWriter, 100);
            }
        };
        
        // Start typing effect after a short delay
        setTimeout(typeWriter, 500);
    }

    // Add floating animation to social buttons
    const socialButtons = document.querySelectorAll('.btn');
    socialButtons.forEach((btn, index) => {
        btn.style.animationDelay = `${index * 0.2}s`;
        btn.classList.add('float-animation');
    });

    // Add CSS for floating animation
    const style = document.createElement('style');
    style.textContent = `
        .float-animation {
            animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-10px); }
        }
        
        .collapsible .toggle-symbol {
            transition: transform 0.3s ease;
        }
        
        .content {
            transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
            opacity: 0;
        }
        
        .content.open {
            opacity: 1;
        }
        
        /* Theme toggle animations */
        .theme-toggle {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        .theme-toggle:hover {
            transform: scale(1.1) rotate(5deg);
        }
        
        .theme-toggle svg {
            transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }
        
        /* Smooth theme transitions */
        * {
            transition: background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease;
        }
    `;
    document.head.appendChild(style);
});



