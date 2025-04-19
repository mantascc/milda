// Function to load markdown content
async function loadMarkdownContent(filename, targetId) {
    try {
        console.log(`Loading ${filename} into ${targetId}...`);
        const response = await fetch(filename);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const text = await response.text();
        console.log(`Content loaded from ${filename}:`, text.substring(0, 100) + '...');
        const htmlContent = marked.parse(text);
        const targetElement = document.getElementById(targetId);
        if (!targetElement) {
            throw new Error(`Target element ${targetId} not found!`);
        }
        targetElement.innerHTML = htmlContent;
        console.log(`Successfully loaded content into ${targetId}`);
    } catch (error) {
        console.error('Error loading markdown:', error);
    }
}

// Load markdown content when the page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM Content Loaded, starting to load markdown...');
    loadMarkdownContent('experience.md', 'resume-section-experience');
    loadMarkdownContent('resume.md', 'resume-section-competencies');
}); 