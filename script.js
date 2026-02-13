// =========================================
// SIHEM PORTFOLIO - MAIN JAVASCRIPT
// =========================================

let isAdmin = false;
let projects = [];

// Initialize
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadProjects();
    renderProjects();
    setupEventListeners();
    initFAQ();
});

// ========== THEME ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    }
    updateThemeIcon();
}

function toggleTheme() {
    document.body.classList.toggle('dark-mode');
    const theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
    localStorage.setItem('theme', theme);
    updateThemeIcon();
}

function updateThemeIcon() {
    const icon = document.querySelector('.theme-toggle .material-symbols-outlined');
    if (icon) {
        icon.textContent = document.body.classList.contains('dark-mode') ? 'light_mode' : 'dark_mode';
    }
}

// ========== PROJECTS ==========
function loadProjects() {
    const saved = localStorage.getItem('portfolio_projects');
    if (saved) {
        projects = JSON.parse(saved);
    } else {
        projects = [
            {
                id: 1,
                title: 'Fintech Dashboard',
                category: 'UI Design',
                description: 'Responsive web dashboard for a fintech platform with clear data visualisations.',
                details: 'A comprehensive financial dashboard designed for modern fintech applications. Features include real-time data visualization, transaction tracking, and user-friendly interface for managing multiple accounts.',
                image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=500&fit=crop',
                link: 'https://example.com/fintech',
                tags: 'UI Design, Frontend',
                tech: 'React, Tailwind CSS, Chart.js',
                year: '2024',
                client: 'FinanceApp'
            },
            {
                id: 2,
                title: 'Education Platform',
                category: 'UX Design',
                description: 'Clean interface for an online learning platform focused on readability and structure.',
                details: 'An intuitive educational platform designed to enhance the online learning experience. Features include course management, progress tracking, interactive lessons, and seamless communication between students and instructors.',
                image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=500&fit=crop',
                link: 'https://example.com/edulearn',
                tags: 'UX Design, UI Design',
                tech: 'HTML, CSS, JavaScript',
                year: '2024',
                client: 'EduLearn'
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
        <div class="project-admin-actions">
            <button class="btn-icon" onclick="editProject(${project.id})" title="Edit">
                <span class="material-symbols-outlined">edit</span>
            </button>
            <button class="btn-icon delete" onclick="deleteProject(${project.id})" title="Delete">
                <span class="material-symbols-outlined">delete</span>
            </button>
        </div>
    ` : '';
    
    card.innerHTML = `
        <div class="project-image-wrapper">
            <img src="${project.image}" alt="${project.title}" class="project-card-image" onerror="this.src='https://via.placeholder.com/800x500?text=Project+Image'">
        </div>
        <div class="project-card-content">
            <h3 class="project-card-title">${project.title}</h3>
            <p class="project-card-desc">${project.description}</p>
            ${tags ? `<div class="project-card-tags">${tags}</div>` : ''}
            <div class="project-card-footer">
                <a href="project.html?id=${project.id}" class="view-project-link">
                    projects.viewProject
                    <span class="material-symbols-outlined">arrow_forward</span>
                </a>
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
        details: document.getElementById('projectDetails').value,
        image: document.getElementById('projectImage').value,
        link: document.getElementById('projectLink').value,
        tags: document.getElementById('projectTags').value,
        tech: document.getElementById('projectTech').value,
        year: document.getElementById('projectYear').value,
        client: document.getElementById('projectClient').value
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
    document.getElementById('projectCategory').value = project.category || '';
    document.getElementById('projectDescription').value = project.description;
    document.getElementById('projectDetails').value = project.details || '';
    document.getElementById('projectImage').value = project.image;
    document.getElementById('projectLink').value = project.link || '';
    document.getElementById('projectTags').value = project.tags || '';
    document.getElementById('projectTech').value = project.tech || '';
    document.getElementById('projectYear').value = project.year || '';
    document.getElementById('projectClient').value = project.client || '';
    
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

function hideAdminPanel() {
    document.getElementById('adminPanel').style.display = 'none';
    isAdmin = false;
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

// ========== FAQ ==========
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            faqItems.forEach(i => i.classList.remove('active'));
            
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
            document.getElementById('navMenu')?.classList.remove('active');
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
        box-shadow: 0 8px 24px rgba(0, 0, 0, 0.2);
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
    // Theme
    document.getElementById('themeToggle')?.addEventListener('click', toggleTheme);
    
    // Admin
    document.getElementById('adminFab')?.addEventListener('click', showAdminModal);
    document.getElementById('adminLoginBtn')?.addEventListener('click', loginAdmin);
    document.getElementById('adminCancelBtn')?.addEventListener('click', hideAdminModal);
    
    document.getElementById('adminPassword')?.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') loginAdmin();
    });
    
    // Project form
    document.getElementById('projectForm')?.addEventListener('submit', addProject);
    
    // Mobile menu
    document.getElementById('mobileToggle')?.addEventListener('click', toggleMobileMenu);
    
    // Smooth scroll
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', smoothScroll);
    });
    
    // Close modal on overlay
    document.getElementById('adminModal')?.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay') || e.target.id === 'adminModal') {
            hideAdminModal();
        }
    });
    
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

// Add animations CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from { transform: translateX(100%); opacity: 0; }
        to { transform: translateX(0); opacity: 1; }
    }
    @keyframes slideOut {
        from { transform: translateX(0); opacity: 1; }
        to { transform: translateX(100%); opacity: 0; }
    }
`;
document.head.appendChild(style);