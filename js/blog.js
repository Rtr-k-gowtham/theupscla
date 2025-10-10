// Blog page functionality
document.addEventListener('DOMContentLoaded', function() {
    const categoryButtons = document.querySelectorAll('.category-btn');
    const blogCards = document.querySelectorAll('.blog-card');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    const newsletterForm = document.querySelector('.newsletter-form');

    // Category filtering
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter blog cards
            blogCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-category') === category) {
                    card.style.display = 'block';
                    card.style.animation = 'fadeInUp 0.5s ease';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // Load more functionality (simulated)
    let visiblePosts = 9;
    const totalPosts = blogCards.length;

    // Initially hide posts beyond the first 9
    blogCards.forEach((card, index) => {
        if (index >= visiblePosts) {
            card.style.display = 'none';
        }
    });

    loadMoreBtn.addEventListener('click', function() {
        const hiddenCards = Array.from(blogCards).filter(card => 
            card.style.display === 'none' && 
            (document.querySelector('.category-btn.active').getAttribute('data-category') === 'all' || 
             card.getAttribute('data-category') === document.querySelector('.category-btn.active').getAttribute('data-category'))
        );

        // Show next 6 posts
        hiddenCards.slice(0, 6).forEach(card => {
            card.style.display = 'block';
            card.style.animation = 'fadeInUp 0.5s ease';
        });

        // Hide load more button if no more posts
        if (hiddenCards.length <= 6) {
            loadMoreBtn.style.display = 'none';
        }
    });

    // Newsletter form submission
    newsletterForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const email = this.querySelector('input[type="email"]').value;
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        // Submit newsletter subscription
        submitNewsletterSubscription(email);
    });

    // Submit newsletter subscription
    async function submitNewsletterSubscription(email) {
        try {
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
            submitBtn.disabled = true;

            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Create email template for newsletter subscription
            const subject = 'Welcome to The Upscala Newsletter!';
            const body = `
Dear Subscriber,

Welcome to The Upscala newsletter!

Thank you for subscribing to our digital marketing insights. You'll now receive:

✅ Weekly digital marketing tips and trends
✅ Exclusive content for Karur and Tamil Nadu businesses  
✅ Case studies and success stories
✅ Early access to our new services and offers

We're committed to helping businesses in Karur and Tamil Nadu succeed in the digital world.

Stay tuned for valuable insights that will help grow your business!

Best regards,
The Upscala Team
Digital Marketing Company, Karur

---
If you no longer wish to receive these emails, you can unsubscribe at any time.
            `.trim();

            // Create mailto link
            const mailto = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
            
            // Also create notification for company
            const companySubject = 'New Newsletter Subscription';
            const companyBody = `
New newsletter subscription:

Email: ${email}
Date: ${new Date().toLocaleString()}
Source: Blog Page

Please add this email to the newsletter list.
            `.trim();
            
            const companyMailto = `mailto:info@theupscala.com?subject=${encodeURIComponent(companySubject)}&body=${encodeURIComponent(companyBody)}`;

            // Open email templates
            window.open(mailto, '_blank');
            setTimeout(() => {
                window.open(companyMailto, '_blank');
            }, 1000);

            // Show success message
            alert('Thank you for subscribing! Check your email for confirmation.');
            
            // Reset form
            newsletterForm.reset();
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;

        } catch (error) {
            console.error('Error subscribing to newsletter:', error);
            alert('There was an error subscribing. Please try again.');
            
            const submitBtn = newsletterForm.querySelector('button[type="submit"]');
            submitBtn.innerHTML = '<span>Subscribe</span><i class="fas fa-paper-plane"></i>';
            submitBtn.disabled = false;
        }
    }

    // Email validation helper
    function isValidEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    // Smooth scrolling for blog navigation
    const blogLinks = document.querySelectorAll('a[href^="#"]');
    blogLinks.forEach(link => {
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

    // Add reading time animation on scroll
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

    // Observe blog cards for animation
    blogCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(card);
    });
});