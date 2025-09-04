// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Toggle mobile menu
    hamburger.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Close mobile menu when clicking on a link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });

    // Smooth scrolling for navigation links
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetSection.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Header background on scroll
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 100) {
            header.style.background = 'rgba(10, 10, 10, 0.98)';
        } else {
            header.style.background = 'rgba(10, 10, 10, 0.95)';
        }
    });

    // Animate service cards on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe service cards and contact items
    const animatedElements = document.querySelectorAll('.service-card, .contact-item, .feature-card');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });

    // CTA Button Click Handler
    const ctaButton = document.querySelector('.cta-button');
    ctaButton.addEventListener('click', function() {
        // Open popup form
        const popup = document.querySelector('#popupOverlay');
        popup.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Add click handlers for contact methods
    const phoneLinks = document.querySelectorAll('a[href^="tel:"]');
    const whatsappLinks = document.querySelectorAll('a[href^="https://wa.me/"]');
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');

    phoneLinks.forEach(phoneLink => {
        phoneLink.addEventListener('click', function() {
            // Analytics or tracking can be added here
            console.log('Phone contact initiated');
        });
    });

    whatsappLinks.forEach(whatsappLink => {
        whatsappLink.addEventListener('click', function() {
            // Analytics or tracking can be added here
            console.log('WhatsApp contact initiated');
        });
    });

    emailLinks.forEach(emailLink => {
        emailLink.addEventListener('click', function() {
            // Analytics or tracking can be added here
            console.log('Email contact initiated');
        });
    });

    // Popup Form Functionality
    const popup = document.getElementById('popupOverlay');
    const popupClose = document.getElementById('popupClose');
    const steps = document.querySelectorAll('.form-step');
    const stepIndicators = document.querySelectorAll('.step');
    
    let currentStep = 1;
    let formData = {
        name: '',
        email: '',
        phone: '',
        company: '',
        services: []
    };

    // Close popup
    function closePopup() {
        popup.classList.remove('active');
        document.body.style.overflow = '';
        // Reset form after a delay
        setTimeout(() => {
            currentStep = 1;
            showStep(1);
            resetForm();
        }, 300);
    }

    popupClose.addEventListener('click', closePopup);
    
    // Close popup when clicking outside
    popup.addEventListener('click', function(e) {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Show specific step
    function showStep(stepNumber) {
        steps.forEach(step => step.classList.remove('active'));
        if (stepNumber === 'successStep') {
            document.getElementById('successStep').classList.add('active');
        } else {
            document.getElementById(`step${stepNumber}`).classList.add('active');
        }
        
        // Update step indicators
        stepIndicators.forEach((indicator, index) => {
            indicator.classList.remove('active', 'completed');
            if (index + 1 < stepNumber) {
                indicator.classList.add('completed');
            } else if (index + 1 === stepNumber) {
                indicator.classList.add('active');
            }
        });
    }

    // Step 1 to Step 2
    document.getElementById('nextStep1').addEventListener('click', function() {
        const name = document.getElementById('clientName').value.trim();
        const email = document.getElementById('clientEmail').value.trim();
        const phone = document.getElementById('clientPhone').value.trim();
        const company = document.getElementById('companyName').value.trim();

        if (!name || !email || !phone) {
            alert('Please fill in all required fields');
            return;
        }

        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        formData.name = name;
        formData.email = email;
        formData.phone = phone;
        formData.company = company;

        currentStep = 2;
        showStep(2);
    });

    // Step 2 to Step 3
    document.getElementById('nextStep2').addEventListener('click', function() {
        const selectedServices = [];
        const checkboxes = document.querySelectorAll('.service-option input[type="checkbox"]:checked');
        
        checkboxes.forEach(checkbox => {
            selectedServices.push(checkbox.value);
        });

        if (selectedServices.length === 0) {
            alert('Please select at least one service');
            return;
        }

        formData.services = selectedServices;
        updateSummary();
        currentStep = 3;
        showStep(3);
    });

    // Back buttons
    document.getElementById('backStep1').addEventListener('click', function() {
        currentStep = 1;
        showStep(1);
    });

    document.getElementById('backStep2').addEventListener('click', function() {
        currentStep = 2;
        showStep(2);
    });

    // Submit form
    document.getElementById('submitForm').addEventListener('click', function() {
        sendEmail();
        showStep('successStep'); // Show success step
    });

    // Success step actions
    document.getElementById('openWhatsApp').addEventListener('click', function() {
        const message = createWhatsAppMessage();
        const whatsappUrl = `https://wa.me/919043619695?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
        closePopup();
    });

    document.getElementById('closePopup').addEventListener('click', closePopup);

    // Helper functions
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    function updateSummary() {
        const contactSummary = document.getElementById('summaryContact');
        const servicesSummary = document.getElementById('summaryServices');

        contactSummary.innerHTML = `
            <p><strong>Name:</strong> ${formData.name}</p>
            <p><strong>Email:</strong> ${formData.email}</p>
            <p><strong>Phone:</strong> ${formData.phone}</p>
            ${formData.company ? `<p><strong>Company:</strong> ${formData.company}</p>` : ''}
        `;

        servicesSummary.innerHTML = `
            <ul>
                ${formData.services.map(service => `<li>• ${service}</li>`).join('')}
            </ul>
        `;
    }

    function createWhatsAppMessage() {
        const servicesText = formData.services.join(', ');
        return `Hi! I'm ${formData.name} from ${formData.company || 'my company'}. I'm interested in the following services: ${servicesText}. My email is ${formData.email} and phone is ${formData.phone}. Please let me know how we can proceed.`;
    }

    function sendEmail() {
        // Create email template
        const emailSubject = `New Inquiry from ${formData.name} - The Upscala`;
        const emailBody = `
Dear ${formData.name},

Thank you for your interest in The Upscala's digital marketing services!

We have received your inquiry with the following details:

Contact Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
${formData.company ? `- Company: ${formData.company}` : ''}

Services of Interest:
${formData.services.map(service => `- ${service}`).join('\n')}

Our team will review your requirements and get back to you within 24 hours. In the meantime, feel free to reach out to us directly:

📞 Phone/WhatsApp: +91 9043619695
📧 Email: info@theupscala.com

We look forward to helping you grow your business with our digital solutions!

Best regards,
The Upscala Team
Digital Marketing Company, Karur

---
This is an automated confirmation email. Please do not reply to this email.
        `.trim();

        // Create mailto link for client
        const clientMailto = `mailto:${formData.email}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
        
        // Create mailto link for company
        const companyEmailBody = `
New inquiry received from website:

Contact Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone}
${formData.company ? `- Company: ${formData.company}` : ''}

Interested Services:
${formData.services.map(service => `- ${service}`).join('\n')}

Please follow up with this lead.
        `.trim();
        
        const companyMailto = `mailto:info@theupscala.com?subject=${encodeURIComponent(`New Website Inquiry - ${formData.name}`)}&body=${encodeURIComponent(companyEmailBody)}`;

        // Open both email templates
        window.open(clientMailto, '_blank');
        setTimeout(() => {
            window.open(companyMailto, '_blank');
        }, 1000);
    }

    function resetForm() {
        document.getElementById('clientName').value = '';
        document.getElementById('clientEmail').value = '';
        document.getElementById('clientPhone').value = '';
        document.getElementById('companyName').value = '';
        
        const checkboxes = document.querySelectorAll('.service-option input[type="checkbox"]');
        checkboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        
        formData = {
            name: '',
            email: '',
            phone: '',
            company: '',
            services: []
        };
    }
});