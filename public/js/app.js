/**
 * Ruang Aman - Client-side Script
 * Handles form submissions, validation, and UI interactions
 */

document.addEventListener('DOMContentLoaded', () => {
    // Report Form
    const reportForm = document.getElementById('reportForm');
    if (reportForm) {
        reportForm.addEventListener('submit', handleReportSubmit);
    }

    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', handleContactSubmit);
    }

    // Set active nav link
    updateActiveNavLink();
});

/**
 * Update active navigation link based on current page
 */
function updateActiveNavLink() {
    const currentPage = window.location.pathname;
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.classList.remove('active');

        // Match href to current page
        if (
            (currentPage === '/' && link.getAttribute('href') === '/') ||
            (currentPage.includes(link.getAttribute('href')) && link.getAttribute('href') !== '/')
        ) {
            link.classList.add('active');
        }
    });
}

/**
 * Handle Report Form Submission
 */
async function handleReportSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = document.getElementById('submitBtn');
    const errorMsg = document.getElementById('errorMsg');
    const loadingMsg = document.getElementById('loadingMsg');

    // Clear previous messages
    errorMsg.style.display = 'none';
    errorMsg.textContent = '';

    // Validate form
    if (!form.checkValidity()) {
        errorMsg.textContent = 'Mohon isi semua field yang wajib diisi.';
        errorMsg.style.display = 'block';
        return;
    }

    // Show loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';
    loadingMsg.style.display = 'block';

    try {
        // Create FormData for multipart/form-data
        const formData = new FormData(form);

        const response = await fetch('/api/report', {
            method: 'POST',
            body: formData
        });

        const data = await response.json();

        if (!response.ok || !data.ok) {
            throw new Error(data.error || 'Gagal mengirim pengaduan.');
        }

        // Success! Redirect to success page
        window.location.href = '/success.html';

    } catch (error) {
        console.error('Error:', error);
        errorMsg.textContent = error.message || 'Terjadi kesalahan. Silakan coba lagi.';
        errorMsg.style.display = 'block';
        loadingMsg.style.display = 'none';

        // Re-enable submit button
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim Cerita';
    }
}

/**
 * Handle Contact Form Submission
 * This is a simple frontend demo (doesn't actually send email without backend integration)
 */
async function handleContactSubmit(e) {
    e.preventDefault();

    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const successMsg = document.getElementById('contactSuccess');

    // Validate form
    if (!form.checkValidity()) {
        alert('Mohon isi semua field yang diperlukan.');
        return;
    }

    // Show success message (demo only - in production, send to backend)
    submitBtn.disabled = true;
    submitBtn.textContent = 'Mengirim...';

    // Simulate delay
    setTimeout(() => {
        successMsg.style.display = 'block';
        submitBtn.disabled = false;
        submitBtn.textContent = 'Kirim Pesan';
        form.reset();

        // Hide success message after 5 seconds
        setTimeout(() => {
            successMsg.style.display = 'none';
        }, 5000);
    }, 1000);
}

/**
 * Smooth scroll to anchor
 */
function smoothScroll(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

/**
 * Generic error handler for API calls
 */
function showError(message) {
    const errorMsg = document.getElementById('errorMsg');
    if (errorMsg) {
        errorMsg.textContent = message;
        errorMsg.style.display = 'block';
    } else {
        alert(message);
    }
}

/**
 * Generic success handler
 */
function showSuccess(message) {
    const successMsg = document.createElement('div');
    successMsg.className = 'alert alert-success';
    successMsg.textContent = message;
    document.body.insertBefore(successMsg, document.body.firstChild);

    setTimeout(() => successMsg.remove(), 4000);
}
