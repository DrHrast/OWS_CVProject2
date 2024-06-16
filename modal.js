let isModalOpen = false;

export function setupModalFunctionality() {
    const portfolioItems = document.querySelectorAll('.portfolio-wrapper');

    portfolioItems.forEach((item, index) => {
        const modalId = `modal-content${index + 1}`;
        const openButton = item;
        const closeButton = document.querySelector(`#${modalId} .close-button`);
        const modal = document.getElementById(modalId);

        openButton.addEventListener('click', () => {
            openModal(modal);
        });

        closeButton.addEventListener('click', () => {
            closeModal(modal);
        });
    });

    window.addEventListener('click', (event) => {
        if (event.target.classList.contains('modal')) {
            closeModal(event.target);
        }
    });

    window.addEventListener('keydown', (event) => {
        if (event.key === "Escape") {
            const openModal = document.querySelector('.modal.show');
            if (openModal) {
                closeModal(openModal);
            }
        }
    });

    function openModal(modal) {
        if (modal) {
            console.log(`Opening modal with ID: ${modal.id}`);
            modal.classList.add('show');
            document.body.classList.add("modal-open");
            isModalOpen = true;
        }
    }

    function closeModal(modal) {
        if (modal) {
            console.log(`Closing modal with ID: ${modal.id}`);
            modal.classList.remove('show');
            document.body.classList.remove("modal-open");
            isModalOpen = false;
        }
    }
}


setupModalFunctionality();

export function isModalOpenFunc() {
    return isModalOpen;
}
