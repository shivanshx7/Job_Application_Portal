// Sample job data
// Force load jobs on any page with jobs-grid
window.onload = function() {
    console.log("Page loaded:", window.location.href);
    
    // Check for jobs grid and load if empty
    setTimeout(() => {
        const jobsGrid = document.querySelector('.jobs-grid');
        if (jobsGrid && jobsGrid.children.length === 0) {
            console.log("Jobs grid is empty, loading jobs...");
            
            if (document.querySelector('.featured-jobs')) {
                loadFeaturedJobs();
            } else if (document.querySelector('.job-listings')) {
                loadAllJobs();
            }
        }
    }, 500);
};
const jobsData = [
    {
        id: 1,
        title: "Frontend Developer",
        company: "Tech Solutions Inc.",
        location: "Remote",
        salary: "$60,000 - $80,000",
        type: "Full-time",
        description: "We're looking for a skilled Frontend Developer to join our team. You'll be working with modern JavaScript frameworks.",
        requirements: ["HTML/CSS/JavaScript", "React.js or Vue.js", "Git experience", "REST APIs"],
        benefits: ["Health insurance", "Remote work", "Flexible hours", "Learning budget"],
        posted: "2 days ago"
    },
    {
        id: 2,
        title: "Marketing Intern",
        company: "Digital Agency Co.",
        location: "New York, NY",
        salary: "$30,000 - $40,000",
        type: "Internship",
        description: "Join our marketing team for a 6-month internship. Learn digital marketing strategies.",
        requirements: ["Marketing interest", "Social media savvy", "Good communication", "Learning attitude"],
        benefits: ["Mentorship", "Stipend", "Networking", "Certificate"],
        posted: "1 week ago"
    },
    {
        id: 3,
        title: "Data Analyst",
        company: "Finance Corp",
        location: "Chicago, IL",
        salary: "$70,000 - $90,000",
        type: "Full-time",
        description: "Looking for a Data Analyst with SQL and Python experience to join our analytics team.",
        requirements: ["SQL", "Python/R", "Excel", "Data visualization"],
        benefits: ["401k matching", "Gym membership", "Bonus", "Conference budget"],
        posted: "3 days ago"
    },
    {
        id: 4,
        title: "Graphic Designer",
        company: "Creative Studio",
        location: "Los Angeles, CA",
        salary: "$50,000 - $65,000",
        type: "Part-time",
        description: "Part-time graphic designer for branding projects. Must have portfolio.",
        requirements: ["Adobe Creative Suite", "Branding experience", "Portfolio", "Team player"],
        benefits: ["Flexible schedule", "Creative freedom", "Remote options", "Project bonuses"],
        posted: "1 day ago"
    },
    {
        id: 5,
        title: "Backend Developer",
        company: "Cloud Systems",
        location: "Austin, TX",
        salary: "$80,000 - $100,000",
        type: "Full-time",
        description: "Senior backend developer needed for cloud infrastructure team.",
        requirements: ["Node.js/Python", "AWS/Azure", "Database design", "System architecture"],
        benefits: ["Stock options", "Unlimited PTO", "Home office setup", "Health & wellness"],
        posted: "5 days ago"
    },
    {
        id: 6,
        title: "Customer Support",
        company: "Service First",
        location: "Remote",
        salary: "$35,000 - $45,000",
        type: "Full-time",
        description: "Provide excellent customer support via chat, email, and phone.",
        requirements: ["Customer service", "Communication skills", "Problem solving", "Patience"],
        benefits: ["Work from home", "Training", "Growth opportunities", "Team bonuses"],
        posted: "4 days ago"
    }
];

// Debug function
function debugLog(message, data = null) {
    console.log(`[DEBUG] ${message}`, data || '');
}

// Initialize local storage data
function initializeLocalStorage() {
    debugLog("Initializing localStorage");
    
    if (!localStorage.getItem('appliedJobs')) {
        localStorage.setItem('appliedJobs', JSON.stringify([2, 4]));
        debugLog("Set default applied jobs");
    }
    if (!localStorage.getItem('savedJobs')) {
        localStorage.setItem('savedJobs', JSON.stringify([1, 3]));
        debugLog("Set default saved jobs");
    }
    if (!localStorage.getItem('userName')) {
        localStorage.setItem('userName', 'Demo User');
    }
    if (!localStorage.getItem('userEmail')) {
        localStorage.setItem('userEmail', 'demo@example.com');
    }
}

// DOM Content Loaded with error handling
document.addEventListener('DOMContentLoaded', function() {
    debugLog("DOM fully loaded and parsed");
    console.log("Current page:", window.location.pathname);
    
    try {
        initializeLocalStorage();
        
        // Check which page we're on and load appropriate content
        const currentPage = window.location.pathname;
        
        // Load featured jobs on homepage
        if (currentPage.includes('index.html') || currentPage === '/' || currentPage.endsWith('/')) {
            debugLog("Loading homepage");
            loadFeaturedJobs();
        }
        
        // Load all jobs on jobs page
        if (currentPage.includes('jobs.html')) {
            debugLog("Loading jobs page");
            loadAllJobs();
            setupFilters();
        }
        
        // Load job details if on job details page
        if (currentPage.includes('job-details.html')) {
            debugLog("Loading job details page");
            loadJobDetails();
        }
        
        // Load dashboard data
        if (currentPage.includes('dashboard.html')) {
            debugLog("Loading dashboard");
            loadDashboard();
        }
        
        // Setup application form
        const applyForm = document.getElementById('applyForm');
        if (applyForm) {
            debugLog("Setting up application form");
            setupApplicationForm();
        }
        
        // Setup event listeners
        setupEventListeners();
        
        debugLog("Initialization complete");
        
    } catch (error) {
        console.error("Error during initialization:", error);
        // Show error to user
        const errorDiv = document.createElement('div');
        errorDiv.style.cssText = 'background: #fee; color: #c00; padding: 10px; margin: 10px; border: 1px solid #c00;';
        errorDiv.innerHTML = `<strong>JavaScript Error:</strong> ${error.message}`;
        document.body.prepend(errorDiv);
    }
});

// Setup event listeners
function setupEventListeners() {
    debugLog("Setting up event listeners");
    
    // Mobile menu toggle
    const mobileMenu = document.querySelector('.mobile-menu');
    if (mobileMenu) {
        mobileMenu.addEventListener('click', function() {
            const nav = document.querySelector('.nav');
            nav.classList.toggle('active');
        });
    }
    
    // Search button
    const searchBtn = document.querySelector('.search-box .btn');
    if (searchBtn) {
        searchBtn.addEventListener('click', function() {
            const keyword = document.querySelector('.search-box input:first-child')?.value || '';
            const location = document.querySelector('.search-box input:last-child')?.value || '';
            
            if (keyword || location) {
                alert(`Searching for "${keyword}" jobs in "${location}"...\n\n(For demo, this would filter jobs)`);
                window.location.href = `./jobs.html?search=${encodeURIComponent(keyword)}&location=${encodeURIComponent(location)}`;
            }
        });
    }
    
    // Login/Register buttons
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const userName = prompt('Enter your name (demo login):', localStorage.getItem('userName') || '');
            if (userName) {
                localStorage.setItem('userName', userName);
                alert(`Welcome back, ${userName}!`);
                window.location.href = './dashboard.html';
            }
        });
    }
    
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const userName = prompt('Create a username for your account:');
            const userEmail = prompt('Enter your email:');
            
            if (userName && userEmail) {
                localStorage.setItem('userName', userName);
                localStorage.setItem('userEmail', userEmail);
                alert(`Account created successfully! Welcome ${userName}.`);
                window.location.href = './dashboard.html';
            }
        });
    }
}

// Load featured jobs (homepage)
function loadFeaturedJobs() {
    debugLog("Loading featured jobs");
    const jobsGrid = document.querySelector('.jobs-grid');
    
    if (!jobsGrid) {
        console.warn("Jobs grid not found on this page");
        return;
    }
    
    jobsGrid.innerHTML = '';
    
    // Show first 4 jobs
    jobsData.slice(0, 4).forEach(job => {
        const jobCard = createJobCard(job);
        jobsGrid.appendChild(jobCard);
    });
    
    debugLog(`Loaded ${Math.min(4, jobsData.length)} featured jobs`);
}

// Load all jobs (jobs page)
function loadAllJobs(filteredJobs = jobsData) {
    debugLog("Loading all jobs", { count: filteredJobs.length });
    const jobsGrid = document.querySelector('.jobs-grid');
    
    if (!jobsGrid) {
        console.warn("Jobs grid not found on jobs page");
        return;
    }
    
    jobsGrid.innerHTML = '';
    
    if (filteredJobs.length === 0) {
        jobsGrid.innerHTML = '<p class="no-jobs" style="text-align:center; padding:40px; color:#666;">No jobs found matching your criteria.</p>';
        return;
    }
    
    filteredJobs.forEach(job => {
        const jobCard = createJobCard(job);
        jobsGrid.appendChild(jobCard);
    });
    
    debugLog(`Loaded ${filteredJobs.length} jobs`);
}

// Create job card element
function createJobCard(job) {
    const jobCard = document.createElement('div');
    jobCard.className = 'job-card';
    jobCard.dataset.id = job.id;
    
    const isSaved = getSavedJobs().includes(job.id);
    const isApplied = getAppliedJobs().includes(job.id);
    
    jobCard.innerHTML = `
        <h3 class="job-title">${job.title}</h3>
        <p class="job-company">${job.company}</p>
        <div class="job-details">
            <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
            <span><i class="fas fa-money-bill-wave"></i> ${job.salary}</span>
            <span><i class="fas fa-clock"></i> ${job.type}</span>
        </div>
        <p class="job-description">${job.description.substring(0, 100)}...</p>
        <div class="job-actions" style="display: flex; gap: 10px; margin-top: 15px;">
            <a href="./job-details.html?id=${job.id}" class="btn" style="flex: 1;">View Details</a>
            <button class="btn ${isApplied ? 'btn-secondary' : 'btn-success'} apply-btn" 
                    data-id="${job.id}" 
                    ${isApplied ? 'disabled' : ''}
                    style="flex: 1;">
                ${isApplied ? 'Applied' : 'Apply Now'}
            </button>
            <button class="btn ${isSaved ? 'btn-danger' : 'btn-secondary'} save-btn" 
                    data-id="${job.id}"
                    style="flex: 1;">
                ${isSaved ? 'Unsave' : 'Save Job'}
            </button>
        </div>
    `;
    
    // Add event listeners for buttons
    const applyBtn = jobCard.querySelector('.apply-btn');
    const saveBtn = jobCard.querySelector('.save-btn');
    
    applyBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const jobId = parseInt(this.dataset.id);
        if (applyToJob(jobId)) {
            this.textContent = 'Applied';
            this.classList.remove('btn-success');
            this.classList.add('btn-secondary');
            this.disabled = true;
        }
    });
    
    saveBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const jobId = parseInt(this.dataset.id);
        toggleSaveJob(jobId, this);
    });
    
    return jobCard;
}

// Setup filters on jobs page
function setupFilters() {
    const jobTypeFilter = document.getElementById('jobTypeFilter');
    const locationFilter = document.getElementById('locationFilter');
    const salaryFilter = document.getElementById('salaryFilter');
    const filterBtn = document.getElementById('filterBtn');
    const clearBtn = document.getElementById('clearBtn');
    
    if (!filterBtn) {
        console.warn("Filter button not found");
        return;
    }
    
    filterBtn.addEventListener('click', function() {
        const selectedType = jobTypeFilter?.value || 'all';
        const selectedLocation = (locationFilter?.value || '').toLowerCase();
        const selectedSalary = salaryFilter?.value || 'all';
        
        let filtered = jobsData;
        
        if (selectedType !== 'all') {
            filtered = filtered.filter(job => job.type === selectedType);
        }
        
        if (selectedLocation) {
            filtered = filtered.filter(job => job.location.toLowerCase().includes(selectedLocation));
        }
        
        if (selectedSalary !== 'all') {
            // Simple salary filtering for demo
            filtered = filtered.filter(job => {
                const salaryStr = job.salary.replace(/[^0-9\-]/g, '');
                const match = salaryStr.match(/(\d+)/);
                if (!match) return true;
                
                const salary = parseInt(match[1]);
                if (selectedSalary === 'low') return salary < 50000;
                if (selectedSalary === 'medium') return salary >= 50000 && salary < 80000;
                if (selectedSalary === 'high') return salary >= 80000;
                return true;
            });
        }
        
        loadAllJobs(filtered);
    });
    
    if (clearBtn) {
        clearBtn.addEventListener('click', function() {
            if (jobTypeFilter) jobTypeFilter.value = 'all';
            if (locationFilter) locationFilter.value = '';
            if (salaryFilter) salaryFilter.value = 'all';
            loadAllJobs(jobsData);
        });
    }
}

// Load job details page
function loadJobDetails() {
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('id'));
    
    debugLog("Loading job details", { jobId });
    
    if (!jobId) {
        document.querySelector('.job-detail-container').innerHTML = '<p>Job not found. <a href="./jobs.html">Browse Jobs</a></p>';
        return;
    }
    
    const job = jobsData.find(j => j.id === jobId);
    
    if (!job) {
        document.querySelector('.job-detail-container').innerHTML = '<p>Job not found. <a href="./jobs.html">Browse Jobs</a></p>';
        return;
    }
    
    const jobHeader = document.querySelector('.job-header');
    const jobDescription = document.querySelector('.job-description-content');
    const jobRequirements = document.querySelector('.job-requirements-content');
    const jobBenefits = document.querySelector('.job-benefits-content');
    
    if (jobHeader) {
        jobHeader.innerHTML = `
            <h1>${job.title}</h1>
            <p class="job-company">${job.company}</p>
            <div class="job-meta">
                <span><i class="fas fa-map-marker-alt"></i> ${job.location}</span>
                <span><i class="fas fa-money-bill-wave"></i> ${job.salary}</span>
                <span><i class="fas fa-clock"></i> ${job.type}</span>
                <span><i class="fas fa-calendar"></i> ${job.posted}</span>
            </div>
        `;
    }
    
    if (jobDescription) {
        jobDescription.textContent = job.description;
    }
    
    if (jobRequirements) {
        jobRequirements.innerHTML = job.requirements.map(req => `<li>${req}</li>`).join('');
    }
    
    if (jobBenefits) {
        jobBenefits.innerHTML = job.benefits.map(benefit => `<li>${benefit}</li>`).join('');
    }
    
    // Update apply button
    const applyBtn = document.querySelector('.apply-btn-detail');
    const isApplied = getAppliedJobs().includes(jobId);
    
    if (applyBtn) {
        applyBtn.dataset.id = jobId;
        if (isApplied) {
            applyBtn.textContent = 'Already Applied';
            applyBtn.classList.remove('btn-success');
            applyBtn.classList.add('btn-secondary');
            applyBtn.disabled = true;
        }
        
        applyBtn.addEventListener('click', function(e) {
            e.preventDefault();
            if (!isApplied) {
                window.location.href = `./apply.html?id=${jobId}`;
            }
        });
    }
    
    // Update save button
    const saveBtn = document.querySelector('.save-btn-detail');
    const isSaved = getSavedJobs().includes(jobId);
    
    if (saveBtn) {
        saveBtn.dataset.id = jobId;
        if (isSaved) {
            saveBtn.textContent = 'Unsave Job';
            saveBtn.classList.remove('btn-secondary');
            saveBtn.classList.add('btn-danger');
        }
        
        saveBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const jobId = parseInt(this.dataset.id);
            toggleSaveJob(jobId, this);
        });
    }
}

// Setup application form
function setupApplicationForm() {
    const applyForm = document.getElementById('applyForm');
    const urlParams = new URLSearchParams(window.location.search);
    const jobId = parseInt(urlParams.get('id'));
    
    debugLog("Setting up application form", { jobId });
    
    if (jobId) {
        const job = jobsData.find(j => j.id === jobId);
        if (job) {
            const jobTitleEl = document.getElementById('jobTitle');
            const companyNameEl = document.getElementById('companyName');
            
            if (jobTitleEl) jobTitleEl.textContent = job.title;
            if (companyNameEl) companyNameEl.textContent = job.company;
        }
    }
    
    if (!applyForm) {
        console.warn("Application form not found");
        return;
    }
    
    applyForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const name = document.getElementById('name')?.value || '';
        const email = document.getElementById('email')?.value || '';
        const phone = document.getElementById('phone')?.value || '';
        const coverLetter = document.getElementById('coverLetter')?.value || '';
        
        if (!name || !email || !phone) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // In a real app, you would send this data to a server
        if (jobId && !getAppliedJobs().includes(jobId)) {
            saveAppliedJob(jobId);
            
            // Update user info
            localStorage.setItem('userName', name);
            localStorage.setItem('userEmail', email);
            
            alert(`Application submitted successfully for ${jobsData.find(j => j.id === jobId)?.title || 'the job'}!\n\nWe'll contact you at ${email} if selected.`);
            window.location.href = './dashboard.html';
        } else if (getAppliedJobs().includes(jobId)) {
            alert('You have already applied for this job.');
            window.location.href = `./job-details.html?id=${jobId}`;
        } else {
            alert('Job not found. Returning to job listings.');
            window.location.href = './jobs.html';
        }
    });
}

// Load dashboard data
function loadDashboard() {
    debugLog("Loading dashboard");
    
    const appliedJobs = getAppliedJobs();
    const savedJobs = getSavedJobs();
    const userName = localStorage.getItem('userName') || 'User';
    const userEmail = localStorage.getItem('userEmail') || '';
    
    // Update user info
    const userNameEl = document.getElementById('userName');
    const profileNameEl = document.getElementById('profileName');
    const profileEmailEl = document.getElementById('profileEmail');
    
    if (userNameEl) userNameEl.textContent = `Welcome, ${userName}!`;
    if (profileNameEl) profileNameEl.textContent = userName;
    if (profileEmailEl) profileEmailEl.textContent = userEmail;
    
    // Update stats
    const appliedCountEl = document.getElementById('appliedCount');
    const savedCountEl = document.getElementById('savedCount');
    
    if (appliedCountEl) appliedCountEl.textContent = appliedJobs.length;
    if (savedCountEl) savedCountEl.textContent = savedJobs.length;
    
    // Load applied jobs
    const appliedJobsList = document.getElementById('appliedJobsList');
    if (appliedJobsList) {
        appliedJobsList.innerHTML = '';
        
        if (appliedJobs.length === 0) {
            appliedJobsList.innerHTML = '<p>You haven\'t applied to any jobs yet. <a href="./jobs.html">Browse Jobs</a></p>';
        } else {
            appliedJobs.forEach(jobId => {
                const job = jobsData.find(j => j.id === jobId);
                if (job) {
                    const statuses = ['pending', 'viewed', 'rejected', 'accepted'];
                    const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
                    
                    const item = document.createElement('div');
                    item.className = 'application-item';
                    item.innerHTML = `
                        <div>
                            <strong>${job.title}</strong>
                            <p>${job.company} • ${job.location}</p>
                        </div>
                        <span class="status status-${randomStatus}">${randomStatus.charAt(0).toUpperCase() + randomStatus.slice(1)}</span>
                    `;
                    appliedJobsList.appendChild(item);
                }
            });
        }
    }
    
    // Load saved jobs
    const savedJobsList = document.getElementById('savedJobsList');
    if (savedJobsList) {
        savedJobsList.innerHTML = '';
        
        if (savedJobs.length === 0) {
            savedJobsList.innerHTML = '<p>You haven\'t saved any jobs yet. <a href="./jobs.html">Browse Jobs</a></p>';
        } else {
            savedJobs.forEach(jobId => {
                const job = jobsData.find(j => j.id === jobId);
                if (job) {
                    const item = document.createElement('div');
                    item.className = 'saved-job-item';
                    item.innerHTML = `
                        <div>
                            <strong>${job.title}</strong>
                            <p>${job.company} • ${job.location} • ${job.salary}</p>
                        </div>
                        <a href="./job-details.html?id=${job.id}" class="btn">View</a>
                    `;
                    savedJobsList.appendChild(item);
                }
            });
        }
    }
}

// Utility functions for localStorage
function getAppliedJobs() {
    try {
        return JSON.parse(localStorage.getItem('appliedJobs')) || [];
    } catch (e) {
        console.error("Error reading applied jobs:", e);
        return [];
    }
}

function getSavedJobs() {
    try {
        return JSON.parse(localStorage.getItem('savedJobs')) || [];
    } catch (e) {
        console.error("Error reading saved jobs:", e);
        return [];
    }
}

function saveAppliedJob(jobId) {
    try {
        let appliedJobs = getAppliedJobs();
        if (!appliedJobs.includes(jobId)) {
            appliedJobs.push(jobId);
            localStorage.setItem('appliedJobs', JSON.stringify(appliedJobs));
            debugLog(`Saved job ${jobId} to applied jobs`);
            return true;
        }
        return false;
    } catch (e) {
        console.error("Error saving applied job:", e);
        return false;
    }
}

function toggleSaveJob(jobId, buttonElement) {
    try {
        let savedJobs = getSavedJobs();
        const index = savedJobs.indexOf(jobId);
        
        if (index === -1) {
            // Save job
            savedJobs.push(jobId);
            if (buttonElement) {
                buttonElement.textContent = 'Unsave';
                buttonElement.classList.remove('btn-secondary');
                buttonElement.classList.add('btn-danger');
            }
            alert('Job saved to your list!');
        } else {
            // Unsave job
            savedJobs.splice(index, 1);
            if (buttonElement) {
                buttonElement.textContent = 'Save Job';
                buttonElement.classList.remove('btn-danger');
                buttonElement.classList.add('btn-secondary');
            }
            alert('Job removed from saved list.');
        }
        
        localStorage.setItem('savedJobs', JSON.stringify(savedJobs));
        
        // Update dashboard if on dashboard page
        if (window.location.pathname.includes('dashboard.html')) {
            loadDashboard();
        }
        
        return true;
    } catch (e) {
        console.error("Error toggling saved job:", e);
        return false;
    }
}

// Apply to job function
function applyToJob(jobId) {
    if (saveAppliedJob(jobId)) {
        alert('Application submitted successfully!');
        return true;
    } else {
        alert('You have already applied for this job.');
        return false;
    }
}

// Fallback: If jobs don't load, add a manual load button
window.addEventListener('load', function() {
    // Check if jobs loaded after 1 second
    setTimeout(() => {
        const jobsGrid = document.querySelector('.jobs-grid');
        if (jobsGrid && jobsGrid.children.length === 0) {
            // Add a manual load button
            const manualLoadBtn = document.createElement('button');
            manualLoadBtn.textContent = 'Load Jobs Manually';
            manualLoadBtn.className = 'btn';
            manualLoadBtn.style.cssText = 'display: block; margin: 20px auto; padding: 15px 30px;';
            manualLoadBtn.onclick = function() {
                if (window.location.pathname.includes('jobs.html') || window.location.pathname === '/') {
                    loadAllJobs();
                } else if (window.location.pathname.includes('index.html') || window.location.pathname === '/') {
                    loadFeaturedJobs();
                }
                this.remove();
            };
            
            const container = document.querySelector('.container') || document.body;
            container.appendChild(manualLoadBtn);
            
            console.warn("Jobs failed to load automatically. Manual load button added.");
        }
    }, 1000);
});