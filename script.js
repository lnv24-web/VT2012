
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('show');
        });
    }
    const quizOptions = document.querySelectorAll('.quiz-option');

    quizOptions.forEach(option => {
        option.addEventListener('click', function() {

            quizOptions.forEach(opt => {
                opt.classList.remove('active');
            });

            this.classList.add('active');

            const answerFeedback = document.querySelector('.answer-feedback');
            if (answerFeedback) {
                answerFeedback.innerHTML = `<i class="fas fa-check-circle"></i> You selected: ${this.textContent}. Answer sent successfully!`;
            }
        });
    });

    const newsletterForm = document.getElementById('newsletterForm');

    if (newsletterForm) {
        newsletterForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('.newsletter-input');
            const email = emailInput.value;

            if (email && validateEmail(email)) {
                alert(`Thank you for subscribing with email: ${email}`);
                emailInput.value = '';
            } else {
                alert('Please enter a valid email address.');
            }
        });
    }

    const submitReviewBtn = document.querySelector('.submit-review-btn');
    const reviewTextarea = document.getElementById('review-text');

    if (submitReviewBtn && reviewTextarea) {
        submitReviewBtn.addEventListener('click', function() {
            const review = reviewTextarea.value.trim();

            if (review) {
                alert('Thank you for your review! It will be published after moderation.');
                reviewTextarea.value = '';

                const testimonialBox = document.querySelector('.testimonial-box');
                if (testimonialBox) {

                    console.log('New review submitted:', review);
                }
            } else {
                alert('Please write your review before submitting.');
            }
        });
    }

    const exploreButtons = document.querySelectorAll('.explore-button');

    exploreButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const courseTitle = this.closest('.course-content').querySelector('.course-title').textContent;
            alert(`You're exploring: ${courseTitle}. In a real application, this would take you to the course details page.`);
        });
    });

    const readMoreLinks = document.querySelectorAll('.read-more-link');

    readMoreLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const newsTitle = this.closest('.news-content').querySelector('.news-title').textContent;
            alert(`You clicked on: ${newsTitle}. In a real application, this would take you to the full article.`);
        });
    });

    const endDiscussionBtn = document.querySelector('.end-discussion');

    if (endDiscussionBtn) {
        endDiscussionBtn.addEventListener('click', function() {
            if (confirm('Are you sure you want to end this discussion?')) {
                alert('Discussion ended successfully.');
            }
        });
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');

            if (href !== '#' && href.startsWith('#')) {
                e.preventDefault();

                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);

                if (targetElement) {
                    window.scrollTo({
                        top: targetElement.offsetTop - 80,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function animateStats() {
        const statNumbers = document.querySelectorAll('.success-number');

        statNumbers.forEach(stat => {
            const target = parseInt(stat.textContent.replace('+', '').replace('%', ''));
            const increment = target / 100;
            let current = 0;

            const timer = setInterval(() => {
                current += increment;
                if (current >= target) {
                    stat.textContent = stat.textContent.includes('+') ? target + '+' :
                                      stat.textContent.includes('%') ? target + '%' : target;
                    clearInterval(timer);
                } else {
                    stat.textContent = Math.floor(current) +
                                      (stat.textContent.includes('+') ? '+' :
                                       stat.textContent.includes('%') ? '%' : '');
                }
            }, 20);
        });
    }

    const observerOptions = {
        threshold: 0.5
    };

    const successSection = document.querySelector('.success-section');

    if (successSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateStats();
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        observer.observe(successSection);
    }
});
