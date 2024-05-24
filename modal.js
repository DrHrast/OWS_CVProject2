let isModalOpen = false;

export function setupModalFunctionality() {
    const portfolioItems = document.querySelectorAll('.portfolio-wrapper');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "block";
        document.body.classList.add("modal-open");
        isModalOpen = true;
    }
    
    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
        isModalOpen = false;
    }

    portfolioItems.forEach(item => {
        item.addEventListener('click', () => {
            const modalId = item.getAttribute('data-modal');
            openModal(modalId);
        });
    });

    closeButtons.forEach(button => {
        button.addEventListener('click', () => {
            const modalId = button.closest('.modal').id;
            closeModal(modalId);
        });
    });

    window.addEventListener('click', (event) => {
        modals.forEach(modal => {
            if (event.target === modal) {
                modal.style.display = 'none';
                const modalId = modal.id;
                closeModal(modalId);
            }
        });
    });
}

setupModalFunctionality();

export function isModalOpenFunc() {
    return isModalOpen;
}