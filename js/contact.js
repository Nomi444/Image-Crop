// ===================================
// Contact Form Functionality
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    if (!contactForm) return;
    
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = {
            name: document.getElementById('name').value.trim(),
            email: document.getElementById('email').value.trim(),
            subject: document.getElementById('subject').value.trim(),
            message: document.getElementById('message').value.trim()
        };
        
        // Validate form
        if (!formData.name || !formData.email || !formData.subject || !formData.message) {
            showMessage('Please fill in all required fields.', 'error');
            return;
        }
        
        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }
        
        // Simulate form submission (since we don't have a backend)
        // In production, you would send this to your server
        
        // Disable submit button
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
        
        // Simulate API call
        setTimeout(() => {
            // Show success message
            showMessage(
                'Thank you for your message! We\'ll get back to you within 24-48 hours.',
                'success'
            );
            
            // Reset form
            contactForm.reset();
            
            // Re-enable button
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalText;
            
            // Log to console (in production, this would be sent to server)
            console.log('Form submission:', formData);
            
            // In a real application, you would do something like:
            /*
            fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                showMessage('Message sent successfully!', 'success');
                contactForm.reset();
            })
            .catch(error => {
                showMessage('Failed to send message. Please try again.', 'error');
            })
            .finally(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalText;
            });
            */
        }, 1500);
    });
    
    function showMessage(text, type) {
        formMessage.textContent = text;
        formMessage.className = `form-message ${type}`;
        formMessage.style.display = 'block';
        
        // Scroll to message
        formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        // Auto-hide after 5 seconds for success messages
        if (type === 'success') {
            setTimeout(() => {
                formMessage.style.display = 'none';
            }, 5000);
        }
    }
    
    // Real-time validation for email field
    const emailInput = document.getElementById('email');
    if (emailInput) {
        emailInput.addEventListener('blur', () => {
            const email = emailInput.value.trim();
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (email && !emailRegex.test(email)) {
                emailInput.style.borderColor = 'var(--accent)';
            } else {
                emailInput.style.borderColor = '';
            }
        });
        
        emailInput.addEventListener('input', () => {
            emailInput.style.borderColor = '';
        });
    }
    
    // Character counter for message textarea (optional)
    const messageTextarea = document.getElementById('message');
    if (messageTextarea) {
        const maxLength = 1000;
        const counterDiv = document.createElement('div');
        counterDiv.style.cssText = `
            text-align: right;
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-top: -0.5rem;
            margin-bottom: 1rem;
        `;
        messageTextarea.parentNode.insertBefore(counterDiv, messageTextarea.nextSibling);
        
        const updateCounter = () => {
            const length = messageTextarea.value.length;
            counterDiv.textContent = `${length} / ${maxLength} characters`;
            
            if (length > maxLength) {
                counterDiv.style.color = 'var(--accent)';
                messageTextarea.value = messageTextarea.value.substring(0, maxLength);
            } else {
                counterDiv.style.color = 'var(--text-secondary)';
            }
        };
        
        messageTextarea.addEventListener('input', updateCounter);
        updateCounter();
    }
});