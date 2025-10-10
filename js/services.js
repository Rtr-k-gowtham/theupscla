// Services page functionality
document.addEventListener('DOMContentLoaded', function() {
    const serviceButtons = document.querySelectorAll('.service-cta');
    const servicePopup = document.getElementById('servicePopup');
    const servicePopupClose = document.getElementById('servicePopupClose');
    const serviceForm = document.getElementById('serviceForm');
    const serviceTitle = document.getElementById('serviceTitle');
    const selectedServiceInput = document.getElementById('selectedService');

    // Open service popup
    serviceButtons.forEach(button => {
        button.addEventListener('click', function() {
            const serviceName = this.getAttribute('data-service');
            serviceTitle.textContent = `${serviceName} - Get Quote`;
            selectedServiceInput.value = serviceName;
            servicePopup.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close service popup
    function closeServicePopup() {
        servicePopup.classList.remove('active');
        document.body.style.overflow = '';
        serviceForm.reset();
    }

    servicePopupClose.addEventListener('click', closeServicePopup);

    // Close popup when clicking outside
    servicePopup.addEventListener('click', function(e) {
        if (e.target === servicePopup) {
            closeServicePopup();
        }
    });

    // Handle service form submission
    serviceForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            name: document.getElementById('serviceName').value,
            email: document.getElementById('serviceEmail').value,
            phone: document.getElementById('servicePhone').value,
            company: document.getElementById('serviceCompany').value,
            message: document.getElementById('serviceMessage').value,
            service: selectedServiceInput.value
        };

        // Validate form
        if (!formData.name || !formData.email || !formData.phone || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        if (!isValidEmail(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Submit to Supabase
        submitServiceInquiry(formData);
    });

    // Submit service inquiry to Supabase
    async function submitServiceInquiry(formData) {
        try {
            // Show loading state
            const submitBtn = serviceForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...';
            submitBtn.disabled = true;

            // Here you would normally submit to Supabase
            // For now, we'll simulate the submission and create email templates
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create email templates
            createServiceEmailTemplates(formData);

            // Show success message
            alert('Thank you! Your inquiry has been submitted successfully. We\'ll get back to you within 24 hours.');
            
            // Close popup
            closeServicePopup();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error submitting your inquiry. Please try again or contact us directly.');
            
            // Reset button
            const submitBtn = serviceForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span>Send Inquiry</span><i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }
    }

    // Create email templates for service inquiry
    function createServiceEmailTemplates(formData) {
        // Client confirmation email
        const clientSubject = `Service Inquiry Confirmation - ${formData.service} | The Upscala`;
        const clientBody = `
Dear ${formData.name},

Thank you for your interest in our ${formData.service} service!

We have received your inquiry with the following details:

Service: ${formData.service}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.company ? `Company: ${formData.company}` : ''}

Project Details:
${formData.message}

Our team will review your requirements and get back to you within 24 hours with a detailed proposal and next steps.

In the meantime, feel free to reach out to us directly:
📞 Phone/WhatsApp: +91 9043619695
📧 Email: info@theupscala.com

We look forward to helping you achieve your digital goals!

Best regards,
The Upscala Team
Digital Marketing Company, Karur

---
This is an automated confirmation email.
        `.trim();

        // Company notification email
        const companySubject = `New Service Inquiry - ${formData.service} from ${formData.name}`;
        const companyBody = `
New service inquiry received from website:

Service: ${formData.service}
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.company ? `Company: ${formData.company}` : ''}

Project Details:
${formData.message}

Please follow up with this lead within 24 hours.

---
Submitted from: Services Page
Date: ${new Date().toLocaleString()}
        `.trim();

        // Create mailto links
        const clientMailto = `mailto:${formData.email}?subject=${encodeURIComponent(clientSubject)}&body=${encodeURIComponent(clientBody)}`;
        const companyMailto = `mailto:info@theupscala.com?subject=${encodeURIComponent(companySubject)}&body=${encodeURIComponent(companyBody)}`;

        // Open email templates
        window.open(clientMailto, '_blank');
        setTimeout(() => {
            window.open(companyMailto, '_blank');
        }, 1000);
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth scrolling for service links
    const serviceLinks = document.querySelectorAll('a[href^="#"]');
    serviceLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});