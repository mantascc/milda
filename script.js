function openModal(modalId) {
    document.getElementById(modalId).style.display = "block";
    document.body.style.overflow = "hidden"; // Prevent scrolling when modal is open
}

function closeModal(modalId) {
    document.getElementById(modalId).style.display = "none";
    document.body.style.overflow = "auto"; // Restore scrolling
}

function changeImage(modalId, direction) {
    const modal = document.getElementById(modalId);
    const images = modal.querySelectorAll('.carousel-image');
    const dots = modal.querySelectorAll('.carousel-dot');
    let activeIndex = Array.from(images).findIndex(img => img.classList.contains('active'));
    
    // Remove active class from current image and dot
    images[activeIndex].classList.remove('active');
    dots[activeIndex].classList.remove('active');
    
    // Calculate new index
    if (direction === 'next') {
        activeIndex = (activeIndex + 1) % images.length;
    } else {
        activeIndex = (activeIndex - 1 + images.length) % images.length;
    }
    
    // Add active class to new image and dot
    images[activeIndex].classList.add('active');
    dots[activeIndex].classList.add('active');
}

function goToImage(modalId, index) {
    const modal = document.getElementById(modalId);
    const images = modal.querySelectorAll('.carousel-image');
    const dots = modal.querySelectorAll('.carousel-dot');
    
    // Remove active class from all images and dots
    images.forEach(img => img.classList.remove('active'));
    dots.forEach(dot => dot.classList.remove('active'));
    
    // Add active class to selected image and dot
    images[index].classList.add('active');
    dots[index].classList.add('active');
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target.classList.contains('modal')) {
        event.target.style.display = "none";
        document.body.style.overflow = "auto";
    }
}

// Tab functionality
function openTab(evt, tabName) {
    // Hide all tab content
    const tabContents = document.getElementsByClassName("tab-content");
    for (let i = 0; i < tabContents.length; i++) {
        tabContents[i].classList.remove("active");
    }
    
    // Remove active class from all tab buttons
    const tabButtons = document.getElementsByClassName("tab-btn");
    for (let i = 0; i < tabButtons.length; i++) {
        tabButtons[i].classList.remove("active");
    }
    
    // Show the current tab and add active class to the button
    document.getElementById(tabName).classList.add("active");
    evt.currentTarget.classList.add("active");
}

// Function to populate timeline items from content.js
function populateTimeline() {
    const timelineContainer = document.getElementById('timeline-container');
    const modalsContainer = document.getElementById('modals-container');
    
    // Clear existing content
    timelineContainer.innerHTML = '';
    modalsContainer.innerHTML = '';
    
    // Add timeline items
    timelineContent.items.forEach(item => {
        // Create timeline item
        const timelineItem = document.createElement('div');
        timelineItem.className = `timeline-item ${item.position}`;
        
        // Create content container
        const content = document.createElement('div');
        content.className = 'content';
        
        // Create icon container and inject HTML
        const iconContainer = document.createElement('div');
        iconContainer.className = 'icon';
        iconContainer.innerHTML = item.icon;
        content.appendChild(iconContainer);
        
        // Add title
        const title = document.createElement('h2');
        title.textContent = item.title;
        content.appendChild(title);
        
        // Add date
        const date = document.createElement('div');
        date.className = 'date';
        date.textContent = item.date;
        content.appendChild(date);
        
        // Add description
        const description = document.createElement('p');
        description.textContent = item.description;
        content.appendChild(description);
        
        // Add "View more" link if has modal
        if (item.hasModal) {
            const viewMore = document.createElement('a');
            viewMore.className = 'view-more';
            viewMore.textContent = 'View more details';
            viewMore.onclick = function() { openModal(item.modalId); };
            content.appendChild(viewMore);
            
            // Create corresponding modal
            const modal = document.createElement('div');
            modal.id = item.modalId;
            modal.className = 'modal';
            
            // Create modal content with two columns
            const modalHTML = `
                <div class="modal-content">
                    <div class="modal-text">
                        <h2>${item.title}</h2>
                        <div class="date">${item.date}</div>
                        <div class="project-details">
                            <h3>Project Overview</h3>
                            <p>${item.modalContent.projectOverview}</p>
                            
                            <h3>Key Challenges</h3>
                            <ul>
                                ${item.modalContent.challenges.map(challenge => `<li>${challenge}</li>`).join('')}
                            </ul>
                            
                            <h3>Approach</h3>
                            <p>${item.modalContent.approach}</p>
                            
                            <h3>Results</h3>
                            <ul>
                                ${item.modalContent.results.map(result => `<li>${result}</li>`).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="modal-images">
                        ${item.modalContent.campaignImages.map((image, index) => `
                            <img src="${image.src}" alt="${image.alt}" class="carousel-image ${index === 0 ? 'active' : ''}" />
                        `).join('')}
                        <button class="carousel-nav carousel-prev" onclick="changeImage('${item.modalId}', 'prev')">←</button>
                        <button class="carousel-nav carousel-next" onclick="changeImage('${item.modalId}', 'next')">→</button>
                        <div class="carousel-controls">
                            ${item.modalContent.campaignImages.map((_, index) => `
                                <div class="carousel-dot ${index === 0 ? 'active' : ''}" onclick="goToImage('${item.modalId}', ${index})"></div>
                            `).join('')}
                        </div>
                    </div>
                    <span class="close-modal" onclick="closeModal('${item.modalId}')">&times;</span>
                </div>
            `;
            
            modal.innerHTML = modalHTML;
            modalsContainer.appendChild(modal);
        }
        
        timelineItem.appendChild(content);
        timelineContainer.appendChild(timelineItem);
    });
}

// Populate timeline when page loads
window.onload = populateTimeline; 