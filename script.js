// ========================================
// PORTFOLIO - JAVASCRIPT
// Admin Panel | Language Toggle | FAQ | Smooth Features
// ========================================

// State
let isAdmin = false;
let currentLang = 'en';
let projects = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    loadProjects();
    renderProjects();
    setupEventListeners();
    initFAQ();
});

// ========== PROJECT MANAGEMENT ==========
function loadProjects() {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
        projects = JSON.parse(saved);
    } else {
        projects = [
            {
                id: 1,
                title: 'Accounting Teacher Portfolio',
                category: 'Web Development',
                description: 'Professional portfolio showcasing teaching credentials and experience',
                image: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=500&h=300&fit=crop',
                link: 'https://sihem-09.github.io/hammoudi-zahra/',
                tags: 'HTML, CSS, JavaScript'
            },
            {
                id: 2,
                title: 'UGC Creator Portfolio',
                category: 'UI/UX Design',
                description: 'Modern portfolio for content creator with clean design',
                image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=500&h=300&fit=crop',
                link: 'https://sihem-09.github.io/ugc/',
                tags: 'React, Tailwind CSS'
            },
            {
                id: 3,
                title: 'Graphic Designer Portfolio',
                category: 'Web Development',
                description: 'Creative portfolio showcase with smooth animations',
                image: 'https://images.unsplash.com/photo-1626785774625-0b1c2c4eab67?w=500&h=300&fit=crop',
                link: 'https://sihem-09.github.io/alex/',
                tags: 'HTML, CSS, JavaScript'
            }
        ];
        saveProjects();
    }
}

function saveProjects() {
    localStorage.setItem('portfolio_projects', JSON.stringify(projects));
}

function renderProjects() {
    const grid = document.getElementById('projectsGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    projects.forEach(project => {
        const card = createProjectCard(project);
        grid.appendChild(card);
    });
}

function createProjectCard(project) {
    const card = document.createElement('div');
    card.className = 'project-card';
    
    const tags = project.tags ? project.tags.split(',').map(tag => 
        `<span class="project-tag">${tag.trim()}</span>`
    ).join('') : '';
    
    const adminButtons = isAdmin ? `
        <button class="project-edit" onclick="editProject(${project.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
            </svg>
        </button>
        <button class="project-delete" onclick="deleteProject(${project.id})">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
            </svg>
        </button>
    ` : '';
    
    card.innerHTML = `
        <img src="${project.image}" alt="${project.title}" class="project-image" onerror="this.src='https://via.placeholder.com/500x300?text=Project'">
        <div class="project-info">
            <div class="project-category">${project.category}</div>
            <h3 class="project-title">${project.title}</h3>
            <p class="project-description">${project.description}</p>
            ${tags ? `<div class="project-tags">${tags}</div>` : ''}
            <div class="project-actions">
                ${project.link ? `<a href="${project.link}" target="_blank" class="project-link">View Project</a>` : ''}
                ${adminButtons}
            </div>
        </div>
    `;
    
    return card;
}

function addProject(e) {
    e.preventDefault();
    
    const newProject = {
        id: Date.now(),
        title: document.getElementById('projectTitle').value,
        category: document.getElementById('projectCategory').value,
        description: document.getElementById('projectDescription').value,
        image: document.getElementById('projectImage').value,
        link: document.getElementById('projectLink').value,
        tags: document.getElementById('projectTags').value
    };
    
    projects.push(newProject);
    saveProjects();
    renderProjects();
    
    document.getElementById('projectForm').reset();
    showNotification('Project added successfully!');
}

function editProject(id) {
    const project = projects.find(p => p.id === id);
    if (!project) return;
    
    document.getElementById('projectTitle').value = project.title;
    document.getElementById('projectCategory').value = project.category;
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectImage').value = project.image;
    document.getElementById('projectLink').value = project.link;
    document.getElementById('projectTags').value = project.tags;
    
    deleteProject(id, true);
    document.getElementById('adminPanel').scrollIntoView({ behavior: 'smooth' });
}

function deleteProject(id, silent = false) {
    if (!silent && !confirm('Delete this project?')) return;
    
    projects = projects.filter(p => p.id !== id);
    saveProjects();
    renderProjects();
    
    if (!silent) showNotification('Project deleted');
}

// ========== ADMIN ==========
function showAdminModal() {
    document.getElementById('adminModal').classList.add('active');
    document.getElementById('adminPassword').focus();
}

function hideAdminModal() {
    document.getElementById('adminModal').classList.remove('active');
    document.getElementById('adminPassword').value = '';
}

function loginAdmin() {
    const password = document.getElementById('adminPassword').value;
    
    if (password === 'admin123') {
        isAdmin = true;
        hideAdminModal();
        document.getElementById('adminPanel').style.display = 'block';
        renderProjects();
        showNotification('Welcome Admin!');
    } else {
        showNotification('Incorrect password', 'error');
    }
}

function logoutAdmin() {
    isAdmin = false;
    document.getElementById('adminPanel').style.display = 'none';
    renderProjects();
}

// ========== LANGUAGE ==========
function toggleLanguage() {
    currentLang = currentLang === 'en' ? 'ar' : 'en';
    document.getElementById('langBtn').textContent = currentLang === 'en' ? 'AR' : 'EN';
    
    if (currentLang === 'ar') {
        document.body.style.direction = 'rtl';
    } else {
        document.body.style.direction = 'ltr';
    }
    
    showNotification(`Language switched to ${currentLang === 'en' ? 'English' : 'Arabic'}`);
}

// ========== FAQ ==========
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ========== MOBILE MENU ==========
function toggleMobileMenu() {
    document.getElementById('navMenu').classList.toggle('active');
}

// ========== SMOOTH SCROLL ==========
function smoothScroll(e) {
    const href = e.currentTarget.getAttribute('href');
    if (href && href.startsWith('#')) {
        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
            document.getElementById('navMenu').classList.remove('active');
        }
    }
}

// ========== NOTIFICATION ==========
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 24px;
        padding: 16px 24px;
        background: ${type === 'success' ? 'linear-gradient(135deg, #2dd4bf 0%, #14b8a6 100%)' : '#ef4444'};
        color: white;
        border-radius: 12px;
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
        z-index: 3000;
        font-weight: 500;
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}

// ========== EVENT LISTENERS ==========
function setupEventListeners() {
    // Admin
    const adminBtn = document.getElementById('adminBtn');
    if (adminBtn) {
        adminBtn.addEventListener('click', () => {
            if (isAdmin) {
                logoutAdmin();
            } else {
                showAdminModal();
            }
        });
    }
    
    const adminLoginBtn = document.getElementById('adminLoginBtn');
    if (adminLoginBtn) {
        adminLoginBtn.addEventListener('click', loginAdmin);
    }
    
    const adminCancelBtn = document.getElementById('adminCancelBtn');
    if (adminCancelBtn) {
        adminCancelBtn.addEventListener('click', hideAdminModal);
    }
    
    const adminPassword = document.getElementById('adminPassword');
    if (adminPassword) {
        adminPassword.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') loginAdmin();
        });
    }
    
    // Project form
    const projectForm = document.getElementById('projectForm');
    if (projectForm) {
        projectForm.addEventListener('submit', addProject);
    }
    
    // Language
    const langBtn = document.getElementById('langBtn');
    if (langBtn) {
        langBtn.addEventListener('click', toggleLanguage);
    }
    
    // Mobile menu
    const mobileToggle = document.getElementById('mobileToggle');
    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMobileMenu);
    }
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Close modal on overlay click
    const modal = document.getElementById('adminModal');
    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal || e.target.classList.contains('modal-overlay')) {
                hideAdminModal();
            }
        });
    }
    
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        const navMenu = document.getElementById('navMenu');
        const mobileToggle = document.getElementById('mobileToggle');
        
        if (navMenu && mobileToggle && 
            !navMenu.contains(e.target) && 
            !mobileToggle.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ========== NAVBAR SCROLL ==========
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll && currentScroll > 100) {
        navbar.style.transform = 'translateY(-100%)';
    } else {
        navbar.style.transform = 'translateY(0)';
    }
    
    navbar.style.transition = 'transform 0.3s ease';
    lastScroll = currentScroll;
});

// Add CSS for animations
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);