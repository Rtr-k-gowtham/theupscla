// Contact page functionality
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');

    // Handle contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const formData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            email: document.getElementById('email').value,
            phone: document.getElementById('phone').value,
            company: document.getElementById('company').value,
            service: document.getElementById('service').value,
            budget: document.getElementById('budget').value,
            message: document.getElementById('message').value,
            newsletter: document.getElementById('newsletter').checked
        };

        // Validate form
        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.service || !formData.message) {
            alert('Please fill in all required fields');
            return;
        }

        if (!isValidEmail(formData.email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Submit to Supabase
        submitContactForm(formData);
    });

    // Submit contact form to Supabase
    async function submitContactForm(formData) {
        try {
            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
            submitBtn.disabled = true;

            // Here you would normally submit to Supabase
            // For now, we'll simulate the submission and create email templates
            
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create email templates
            createContactEmailTemplates(formData);

            // Show success message
            alert('Thank you! Your message has been sent successfully. We\'ll get back to you within 24 hours.');
            
            // Reset form
            contactForm.reset();

            // Reset button
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

        } catch (error) {
            console.error('Error submitting form:', error);
            alert('There was an error sending your message. Please try again or contact us directly.');
            
            // Reset button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }
    }

    // Create email templates for contact form
    function createContactEmailTemplates(formData) {
        const fullName = `${formData.firstName} ${formData.lastName}`;
        
        // Client confirmation email
        const clientSubject = `Contact Form Confirmation - The Upscala`;
        const clientBody = `
Dear ${fullName},

Thank you for contacting The Upscala!

We have received your message with the following details:

Name: ${fullName}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.company ? `Company: ${formData.company}` : ''}
Service Interest: ${formData.service}
${formData.budget ? `Budget: ${formData.budget}` : ''}

Your Message:
${formData.message}

Our team will review your inquiry and get back to you within 24 hours. We're excited to discuss how we can help your business grow with our digital marketing services.

In the meantime, feel free to reach out to us directly:
📞 Phone/WhatsApp: +91 9043619695
📧 Email: info@theupscala.com

${formData.newsletter ? 'You have been subscribed to our newsletter for the latest digital marketing tips and updates.' : ''}

Best regards,
The Upscala Team
Digital Marketing Company, Karur

---
This is an automated confirmation email.
        `.trim();

        // Company notification email
        const companySubject = `New Contact Form Submission from ${fullName}`;
        const companyBody = `
New contact form submission received:

Name: ${fullName}
Email: ${formData.email}
Phone: ${formData.phone}
${formData.company ? `Company: ${formData.company}` : ''}
Service Interest: ${formData.service}
${formData.budget ? `Budget: ${formData.budget}` : ''}
Newsletter Subscription: ${formData.newsletter ? 'Yes' : 'No'}

Message:
${formData.message}

Please follow up with this lead within 24 hours.

---
Submitted from: Contact Page
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

    // FAQ toggle functionality
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const question = item.querySelector('h3');
        const answer = item.querySelector('p');
        
        question.addEventListener('click', function() {
            // Close other FAQ items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
        });
    });
});