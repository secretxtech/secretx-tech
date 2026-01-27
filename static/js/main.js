/* ==========================================
   SecretX Tech - Main JavaScript
   ========================================== */

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initTechRing();
    initNeuralCanvas();
    initFloatingParticles();
    initCardAnimations();
    initServiceModal();
    initContentProtection();
    initSideMenu();
    initActiveMenuLink();
});

/* ==========================================
   Content Protection - Disable Copy/Right-Click
   ========================================== */
function initContentProtection() {
    // Disable right-click context menu
    document.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable text selection
    document.addEventListener('selectstart', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable copy
    document.addEventListener('copy', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable cut
    document.addEventListener('cut', function(e) {
        e.preventDefault();
        return false;
    });

    // Disable keyboard shortcuts (Ctrl+C, Ctrl+U, Ctrl+S, F12)
    document.addEventListener('keydown', function(e) {
        // Ctrl+C, Ctrl+U, Ctrl+S, Ctrl+A
        if (e.ctrlKey && (e.key === 'c' || e.key === 'u' || e.key === 's' || e.key === 'a')) {
            e.preventDefault();
            return false;
        }
        // F12 (DevTools)
        if (e.key === 'F12') {
            e.preventDefault();
            return false;
        }
        // Ctrl+Shift+I (DevTools)
        if (e.ctrlKey && e.shiftKey && e.key === 'I') {
            e.preventDefault();
            return false;
        }
    });

    // Disable drag
    document.addEventListener('dragstart', function(e) {
        e.preventDefault();
        return false;
    });
}

/* ==========================================
   Side Menu Toggle
   ========================================== */
function initSideMenu() {
    const menuToggle = document.getElementById('menuToggle');
    const menuClose = document.getElementById('menuClose');
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    if (!menuToggle || !menuClose || !sideMenu || !menuOverlay) return;

    // Open menu
    menuToggle.addEventListener('click', function() {
        sideMenu.classList.add('active');
        menuOverlay.classList.add('active');
    });

    // Close menu
    menuClose.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
    });

    // Close menu when clicking overlay
    menuOverlay.addEventListener('click', function() {
        sideMenu.classList.remove('active');
        menuOverlay.classList.remove('active');
    });
}

/* ==========================================
   Active Menu Link Highlight
   ========================================== */
function initActiveMenuLink() {
    const menuLinks = document.querySelectorAll('.menu-list a');
    const currentPath = window.location.pathname;
    const sideMenu = document.getElementById('sideMenu');
    const menuOverlay = document.getElementById('menuOverlay');

    // Mark the current page as active on load
    menuLinks.forEach(link => {
        const linkHref = link.getAttribute('href');

        // Only match exact paths, not anchor links
        if (!linkHref.startsWith('#')) {
            const linkPath = new URL(link.href).pathname;
            if (linkPath === currentPath) {
                link.classList.add('active');
            }
        }

        // Add click effect - mark clicked item as active and close menu
        link.addEventListener('click', function(e) {
            // Remove active from all
            menuLinks.forEach(l => l.classList.remove('active'));
            // Add active to clicked item
            this.classList.add('active');

            // Close the menu
            if (sideMenu && menuOverlay) {
                sideMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            }

            // Handle anchor links - smooth scroll
            if (linkHref.startsWith('#')) {
                e.preventDefault();
                const targetId = linkHref.substring(1);
                const targetElement = document.getElementById(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({ behavior: 'smooth' });
                }
            }
        });
    });
}

/* ==========================================
   Tech Ring Mouse Follow Effect
   ========================================== */
function initTechRing() {
    const techRing = document.getElementById('techRing');
    const logoWrapper = document.querySelector('.logo-wrapper');

    if (!techRing || !logoWrapper) return;

    logoWrapper.addEventListener('mouseenter', () => {
        techRing.classList.add('active');
    });

    logoWrapper.addEventListener('mouseleave', () => {
        techRing.classList.remove('active');
    });

    logoWrapper.addEventListener('mousemove', (e) => {
        techRing.style.left = e.clientX + 'px';
        techRing.style.top = e.clientY + 'px';
    });
}

/* ==========================================
   Neural Network Canvas Animation
   ========================================== */
function initNeuralCanvas() {
    const canvas = document.getElementById('neural-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Neural nodes
    const nodes = [];
    const nodeCount = 50;

    for (let i = 0; i < nodeCount; i++) {
        nodes.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            vx: (Math.random() - 0.5) * 0.5,
            vy: (Math.random() - 0.5) * 0.5,
            radius: Math.random() * 3 + 1,
            color: ['#8800ff', '#ff0088', '#0066ff', '#ffffff', '#cc00ff'][Math.floor(Math.random() * 5)]
        });
    }

    function drawNeural() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Draw connections
        for (let i = 0; i < nodes.length; i++) {
            for (let j = i + 1; j < nodes.length; j++) {
                const dx = nodes[i].x - nodes[j].x;
                const dy = nodes[i].y - nodes[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                if (dist < 200) {
                    ctx.beginPath();
                    ctx.moveTo(nodes[i].x, nodes[i].y);
                    ctx.lineTo(nodes[j].x, nodes[j].y);
                    const opacity = (1 - dist / 200) * 0.3;
                    ctx.strokeStyle = `rgba(150, 0, 255, ${opacity})`;
                    ctx.lineWidth = 1;
                    ctx.stroke();
                }
            }
        }

        // Draw and update nodes
        nodes.forEach(node => {
            // Draw glow
            const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 4);
            gradient.addColorStop(0, node.color);
            gradient.addColorStop(1, 'transparent');
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius * 4, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();

            // Draw node
            ctx.beginPath();
            ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
            ctx.fillStyle = node.color;
            ctx.fill();

            // Update position
            node.x += node.vx;
            node.y += node.vy;

            // Bounce off edges
            if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
            if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
        });

        requestAnimationFrame(drawNeural);
    }
    drawNeural();
}

/* ==========================================
   Floating Particles
   ========================================== */
function initFloatingParticles() {
    const particlesContainer = document.getElementById('particles');
    if (!particlesContainer) return;

    for (let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 8 + 's';
        particle.style.animationDuration = (Math.random() * 4 + 6) + 's';
        particlesContainer.appendChild(particle);
    }
}

/* ==========================================
   Card Animations
   ========================================== */
function initCardAnimations() {
    const cards = document.querySelectorAll('.card');
    cards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.1) + 's';
    });
}

/* ==========================================
   Service Modal
   ========================================== */
function initServiceModal() {
    const modal = document.getElementById('serviceModal');
    const modalClose = document.getElementById('modalClose');
    const modalIcon = document.getElementById('modalIcon');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    const modalContainer = modal ? modal.querySelector('.modal-container') : null;
    const cards = document.querySelectorAll('.card');
    const previewBtn = document.querySelector('.modal-btn-preview');

    // Video modal elements
    const videoModal = document.getElementById('videoModal');
    const videoModalClose = document.getElementById('videoModalClose');
    const videoFrame = document.getElementById('videoFrame');

    let currentVideoId = '';

    if (!modal || !modalContainer) return;

    // Create click origin indicator
    const clickOrigin = document.createElement('div');
    clickOrigin.className = 'click-origin';
    document.body.appendChild(clickOrigin);

    // Create energy beam
    const energyBeam = document.createElement('div');
    energyBeam.className = 'energy-beam';
    document.body.appendChild(energyBeam);

    // Card click handlers
    cards.forEach(card => {
        card.style.cursor = 'pointer';
        card.addEventListener('click', (e) => {
            const icon = card.querySelector('.card-icon').textContent;
            const title = card.querySelector('h2').textContent;
            const description = card.querySelector('p').textContent;

            modalIcon.textContent = icon;
            modalTitle.textContent = title;
            modalDescription.textContent = description;

            // Store video ID for this card
            currentVideoId = card.dataset.video || '';

            // Get click position
            const clickX = e.clientX;
            const clickY = e.clientY;

            // Get center of viewport
            const centerX = window.innerWidth / 2;
            const centerY = window.innerHeight / 2;

            // Calculate offset from center
            const offsetX = clickX - centerX;
            const offsetY = clickY - centerY;

            // Position click origin indicator
            clickOrigin.style.left = clickX + 'px';
            clickOrigin.style.top = clickY + 'px';
            clickOrigin.classList.remove('active');
            clickOrigin.offsetHeight; // Reflow
            clickOrigin.classList.add('active');

            // Position and animate energy beam
            energyBeam.style.left = clickX + 'px';
            energyBeam.style.top = clickY + 'px';
            const angle = Math.atan2(centerY - clickY, centerX - clickX) * 180 / Math.PI + 90;
            energyBeam.style.transform = `rotate(${angle}deg)`;
            energyBeam.classList.remove('active');
            energyBeam.offsetHeight; // Reflow
            energyBeam.classList.add('active');

            // Position screen breach at click location
            const screenBreach = modal.querySelector('.screen-breach');
            if (screenBreach) {
                screenBreach.style.left = clickX + 'px';
                screenBreach.style.top = clickY + 'px';
            }

            // Set starting offset for modal container animation (from click to center)
            modalContainer.style.setProperty('--start-x', offsetX + 'px');
            modalContainer.style.setProperty('--start-y', offsetY + 'px');

            // Show modal immediately
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Close modal
    modalClose.addEventListener('click', (e) => {
        closeModal(e.clientX, e.clientY);
    });

    // Close on overlay click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal(closeX, closeY) {
        // If X button was clicked, show circle at X button position
        if (closeX && closeY) {
            clickOrigin.style.left = closeX + 'px';
            clickOrigin.style.top = closeY + 'px';
            clickOrigin.classList.remove('active');
            clickOrigin.offsetHeight;
            clickOrigin.classList.add('active');
        }

        modal.classList.add('closing');
        modal.classList.remove('active');

        setTimeout(() => {
            modal.classList.remove('closing');
            document.body.style.overflow = '';
            clickOrigin.classList.remove('active');
            // Reset modal position for next open
            modalContainer.style.setProperty('--start-x', '0px');
            modalContainer.style.setProperty('--start-y', '0px');
        }, 350);
    }

    // Helper function to get embed URL from various video sources
    function getVideoEmbedUrl(input) {
        if (!input || input.startsWith('YOUR_')) return '';

        // YouTube - various URL formats
        // youtube.com/watch?v=ID, youtu.be/ID, youtube.com/embed/ID
        const youtubeMatch = input.match(/(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([a-zA-Z0-9_-]+)/);
        if (youtubeMatch) {
            return `https://www.youtube.com/embed/${youtubeMatch[1]}?autoplay=1`;
        }

        // Facebook video
        // facebook.com/watch/?v=ID, facebook.com/video.php?v=ID, fb.watch/ID
        if (input.includes('facebook.com') || input.includes('fb.watch')) {
            return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(input)}&show_text=false`;
        }

        // Google Drive - /d/ID format
        // Use embed instead of preview to have more control
        const driveMatch = input.match(/\/d\/([a-zA-Z0-9_-]+)/);
        if (driveMatch) {
            return `https://drive.google.com/file/d/${driveMatch[1]}/preview?rm=minimal`;
        }

        // If it looks like just a Google Drive ID (no slashes, alphanumeric)
        if (/^[a-zA-Z0-9_-]+$/.test(input) && input.length > 10) {
            return `https://drive.google.com/file/d/${input}/preview?rm=minimal`;
        }

        // Direct embed URL (already formatted)
        if (input.startsWith('http')) {
            return input;
        }

        return '';
    }

    // Preview button - open video modal
    if (previewBtn && videoModal) {
        previewBtn.addEventListener('click', () => {
            const embedUrl = getVideoEmbedUrl(currentVideoId);
            if (embedUrl) {
                videoFrame.src = embedUrl;
                videoModal.classList.add('active');
            }
        });

        // Close video modal
        videoModalClose.addEventListener('click', () => {
            videoModal.classList.remove('active');
            // Stop video by clearing src
            setTimeout(() => {
                videoFrame.src = '';
            }, 300);
        });

        // Close on overlay click
        videoModal.addEventListener('click', (e) => {
            if (e.target === videoModal) {
                videoModal.classList.remove('active');
                setTimeout(() => {
                    videoFrame.src = '';
                }, 300);
            }
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && videoModal.classList.contains('active')) {
                videoModal.classList.remove('active');
                setTimeout(() => {
                    videoFrame.src = '';
                }, 300);
            }
        });
    }
}
