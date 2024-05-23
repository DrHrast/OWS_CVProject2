// modal.js
export function setupModalFunctionality() {
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-wrapper');

    // Create modal element
    const modal = document.createElement('div');
    modal.classList.add('modal');
    document.body.appendChild(modal);

    // Create modal content container
    const modalContent = document.createElement('div');
    modalContent.classList.add('modal-content');
    modal.appendChild(modalContent);

    // Create close button
    const closeButton = document.createElement('span');
    closeButton.classList.add('close-button');
    closeButton.innerHTML = '&times;';
    modalContent.appendChild(closeButton);

    // Handle click on portfolio items
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            // Copy item content to modal
            //modalContent.innerHTML = item.innerHTML;
            modalContent.appendChild(closeButton); // Re-append close button
            modal.style.display = 'block';
        });
    });

    // Handle close button click
    closeButton.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Handle click outside of modal content
    window.addEventListener('click', (event) => {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Call the function to set up modal functionality
setupModalFunctionality();
