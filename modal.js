export function setupModalFunctionality() {
    // Get all portfolio items
    const portfolioItems = document.querySelectorAll('.portfolio-wrapper');
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    // Get all close buttons
    const closeButtons = document.querySelectorAll('.close-button');

    const container = document.getElementById('.container');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
        document.body.classList.add("modal-open"); // Add class to body to disable scrolling
        document.body.container.add("modal-open");
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
        document.body.classList.remove("modal-open"); // Remove class to enable scrolling
        document.body.container.remove("modal-open");
    }

    // Handle click on portfolio items to open the respective modal
    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            openModal(modalId); // Call openModal function with the correct modalId
        });
    });

    // Handle click on close buttons to close the modal
    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.closest('.modal').id;
            closeModal(modalId); // Call closeModal function with the correct modalId
        });
    });

    // Handle click outside of modal content to close the modal
    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                const modalId = modal.id;
                closeModal(modalId); // Call closeModal function with the correct modalId
            }
        });
    });
}

// Call the function to set up modal functionality
setupModalFunctionality();
