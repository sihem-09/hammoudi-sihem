// =========================================
// PROJECT DETAIL PAGE - JAVASCRIPT
// =========================================

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    loadProjectDetail();
});

// ========== THEME ==========
function initTheme() {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    if (savedTheme === 'light') {
        document.body.classList.remove('dark-mode');
    }
}

// ========== LOAD PROJECT ==========
function loadProjectDetail() {
    // Get project ID from URL
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = parseInt(urlParams.get('id'));
    
    if (!projectId) {
        window.location.href = 'index.html#projects';
        return;
    }
    
    // Load projects from localStorage
    const saved = localStorage.getItem('portfolio_projects');
    if (!saved) {
        window.location.href = 'index.html#projects';
        return;
    }
    
    const projects = JSON.parse(saved);
    const project = projects.find(p => p.id === projectId);
    
    if (!project) {
        window.location.href = 'index.html#projects';
        return;
    }
    
    // Populate page with project data
    displayProject(project);
}

function displayProject(project) {
    // Title and meta
    document.title = `${project.title} - Sihem Hammoudi`;
    document.getElementById('projectTitle').textContent = project.title;
    document.getElementById('projectCategory').textContent = project.category || 'Project';
    document.getElementById('projectYear').textContent = project.year || '2024';
    document.getElementById('projectDescription').textContent = project.description;
    
    // Hero image
    const heroImg = document.getElementById('projectHeroImage');
    heroImg.src = project.image;
    heroImg.alt = project.title;
    heroImg.onerror = () => {
        heroImg.src = 'https://via.placeholder.com/1000x600?text=Project+Image';
    };
    
    // Details
    const detailsEl = document.getElementById('projectDetails');
    if (project.details) {
        detailsEl.textContent = project.details;
    } else {
        detailsEl.textContent = 'This project showcases modern design principles and clean development practices.';
    }
    
    // Client
    const clientEl = document.getElementById('projectClient');
    if (project.client) {
        clientEl.textContent = project.client;
    } else {
        clientEl.textContent = 'Personal Project';
    }
    
    // Technologies
    const techEl = document.getElementById('projectTech');
    if (project.tech) {
        const techs = project.tech.split(',').map(t => t.trim());
        techEl.innerHTML = techs.map(tech => 
            `<div class="tech-item">${tech}</div>`
        ).join('');
    } else {
        techEl.innerHTML = '<div class="tech-item">HTML</div><div class="tech-item">CSS</div><div class="tech-item">JavaScript</div>';
    }
    
    // Tags
    const tagsEl = document.getElementById('projectTags');
    if (project.tags) {
        const tags = project.tags.split(',').map(t => t.trim());
        tagsEl.innerHTML = tags.map(tag => 
            `<div class="tag-item">${tag}</div>`
        ).join('');
    } else {
        tagsEl.innerHTML = '<div class="tag-item">Web Design</div><div class="tag-item">Development</div>';
    }
    
    // Project link button
    const linkBtn = document.getElementById('projectLinkBtn');
    if (project.link) {
        linkBtn.href = project.link;
        linkBtn.style.display = 'inline-flex';
    } else {
        linkBtn.style.display = 'none';
    }
}