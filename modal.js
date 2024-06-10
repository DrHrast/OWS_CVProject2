let isModalOpen = false;

export function setupModalFunctionality() {
    const portfolioItems = document.querySelectorAll('.portfolio-wrapper');
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-button');

    function openModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "block";
            document.body.classList.add("modal-open");
            isModalOpen = true;
        } else {
            console.error(`Modal with ID ${modalId} not found`);
        }
    }

    function closeModal(modalId) {
        const modal = document.getElementById(modalId);
        if (modal) {
            modal.style.display = "none";
            document.body.classList.remove("modal-open");
            isModalOpen = false;
        } else {
            console.error(`Modal with ID ${modalId} not found`);
        }
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
