// Cards functionality - imports data from cards-data.js

// Function to create a card element
function createCard(cardData) {
    const card = document.createElement('div');
    card.className = 'card';
    
    const tagsHTML = cardData.tags.map(tag => 
        `<span class="tag" data-tag="${tag}"><i class="fa-solid fa-tag"></i>${tag}</span>`
    ).join('');
    
    card.innerHTML = `
        <div class="cardTitle">${cardData.title} <span class="enTerm">(${cardData.englishTerm})</span></div>
        <div class="cardDesc">${cardData.description}</div>
        <div class="cardTags">
            ${tagsHTML}
        </div>
    `;
    
    // Add click event listeners to tags
    const tags = card.querySelectorAll('.tag');
    tags.forEach(tag => {
        tag.addEventListener('click', () => {
            const tagText = tag.getAttribute('data-tag');
            const searchInput = document.querySelector('.cards-search-input');
            const clearButton = document.querySelector('.clear-search-icon');
            const searchIcon = document.querySelector('.search-icon-cards');
            
            if (searchInput) {
                searchInput.value = tagText;
                filterCards(tagText);
                
                // Show clear button and hide search icon
                if (clearButton) clearButton.style.display = 'block';
                if (searchIcon) searchIcon.style.display = 'none';
            }
        });
    });
    
    return card;
}

// Function to render all cards (limited to 3 for main page)
function renderCards() {
    const cardsGrid = document.querySelector('.cardsGrid');
    if (!cardsGrid) return;
    
    // Check if this is the main page (not cards.html)
    const isMainPage = !window.location.pathname.includes('html/cards.html');
    
    // Get all existing cards
    const existingCards = cardsGrid.querySelectorAll('.card');
    
    // Animate existing cards out if there are any
    if (existingCards.length > 0) {
        existingCards.forEach((card, index) => {
            setTimeout(() => {
                card.classList.add('slide-out');
            }, index * 20);
        });
        
        // Clear and add new cards after animation
        setTimeout(() => {
            cardsGrid.innerHTML = '';
            if (isMainPage) {
                // Show only first 3 cards on main page
                const limitedCards = cardsData.slice(0, 3);
                addCardsWithAnimation(limitedCards);
                addMoreButton();
            } else {
                // Show all cards on cards page
                addCardsWithLazyLoading(cardsData);
            }
        }, existingCards.length * 20 + 150);
    } else {
        // No existing cards, add directly
        cardsGrid.innerHTML = '';
        if (isMainPage) {
            // Show only first 3 cards on main page
            const limitedCards = cardsData.slice(0, 3);
            addCardsWithAnimation(limitedCards);
            addMoreButton();
        } else {
            // Show all cards on cards page
            addCardsWithLazyLoading(cardsData);
        }
    }
}

// Add "المزيد" button to main page
function addMoreButton() {
    const cardsContainer = document.querySelector('.cardsContainer');
    if (!cardsContainer) return;
    
    // Remove existing more button if any
    const existingButton = cardsContainer.querySelector('.more-button');
    if (existingButton) {
        existingButton.remove();
    }
    
    const moreButton = document.createElement('div');
    moreButton.className = 'more-button';
    moreButton.innerHTML = `
        <a href="../html/cards.html" class="more-btn">
            <span>المزيد</span>
            <i class="fa-solid fa-arrow-left"></i>
        </a>
    `;
    
    cardsContainer.appendChild(moreButton);
}

// Helper function to add cards with animation (for main page)
function addCardsWithAnimation(cardsToAdd) {
    const cardsGrid = document.querySelector('.cardsGrid');
    if (!cardsGrid) return;
    
    cardsToAdd.forEach((cardData, index) => {
        const card = createCard(cardData);
        card.style.transform = 'translateX(100%)'; // Start from right
        card.style.opacity = '0';
        cardsGrid.appendChild(card);
        
        // Trigger slide-in animation
        setTimeout(() => {
            card.style.transform = 'translateX(0)';
            card.style.opacity = '1';
        }, index * 20);
    });
}

// Helper function to add cards with animation (for main page)
function addCardsWithAnimation(cardsToAdd) {
    const cardsGrid = document.querySelector('.cardsGrid');
    if (!cardsGrid) return;
    
    cardsToAdd.forEach((cardData, index) => {
        const card = createCard(cardData);
        card.style.transform = 'translateX(100%)'; // Start from right
        card.style.opacity = '0';
        cardsGrid.appendChild(card);
        
        // Trigger slide-in animation
        setTimeout(() => {
            card.style.transform = 'translateX(0)';
            card.style.opacity = '1';
        }, index * 20);
    });
}

// Helper function to add cards with lazy loading
function addCardsWithLazyLoading(cardsToAdd) {
    const cardsGrid = document.querySelector('.cardsGrid');
    if (!cardsGrid) return;
    
    const cardsPerBatch = 6; // Load 6 cards at a time
    let currentIndex = 0;
    
    function loadNextBatch() {
        const batch = cardsToAdd.slice(currentIndex, currentIndex + cardsPerBatch);
        
        batch.forEach((cardData, batchIndex) => {
            const card = createCard(cardData);
            card.style.transform = 'translateX(100%)'; // Start from right
            card.style.opacity = '0';
            cardsGrid.appendChild(card);
            
            // Trigger slide-in animation
            setTimeout(() => {
                card.style.transform = 'translateX(0)';
                card.style.opacity = '1';
            }, batchIndex * 20);
        });
        
        currentIndex += cardsPerBatch;
        
        // Load more if there are more cards and user is near bottom
        if (currentIndex < cardsToAdd.length) {
            // Check if user is near bottom of page
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            
            if (scrollPosition >= pageHeight - 200) { // 200px from bottom
                setTimeout(loadNextBatch, 100);
            }
        }
    }
    
    // Start loading first batch
    loadNextBatch();
    
    // Add scroll listener for lazy loading
    const scrollHandler = () => {
        if (currentIndex < cardsToAdd.length) {
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            
            if (scrollPosition >= pageHeight - 200) {
                loadNextBatch();
            }
        }
    };
    
    window.addEventListener('scroll', scrollHandler);
    
    // Store the handler for cleanup
    window.currentScrollHandler = scrollHandler;
}

// Function to filter cards based on search
function filterCards(searchTerm) {
    const cardsGrid = document.querySelector('.cardsGrid');
    if (!cardsGrid) return;
    
    // Clean up previous scroll handler
    if (window.currentScrollHandler) {
        window.removeEventListener('scroll', window.currentScrollHandler);
        window.currentScrollHandler = null;
    }
    
    // Get all existing cards
    const existingCards = cardsGrid.querySelectorAll('.card');
    
    // Split search term into individual words
    const searchWords = searchTerm.toLowerCase().split(/\s+/).filter(word => word.length > 0);
    
    // Filter cards based on search words
    const filteredCards = cardsData.filter(card => {
        // Create a combined text string for searching
        const searchableText = [
            card.title.toLowerCase(),
            card.englishTerm.toLowerCase(),
            card.description.toLowerCase(),
            ...card.tags.map(tag => tag.toLowerCase())
        ].join(' ');
        
        // Check if ALL search words are found in the searchable text
        return searchWords.every(word => searchableText.includes(word));
    });
    
    // Animate existing cards out
    existingCards.forEach((card, index) => {
        setTimeout(() => {
            card.classList.add('slide-out');
        }, index * 20); // Stagger the animations
    });
    
    // Clear and add new cards after animation
    setTimeout(() => {
        cardsGrid.innerHTML = '';
        
        // For search results, load all cards immediately (no lazy loading)
        if (filteredCards.length <= 12) {
            // Small result set - load all at once
            filteredCards.forEach((cardData, index) => {
                const card = createCard(cardData);
                card.classList.add('slide-in');
                card.style.transform = 'translateX(100%)'; // Start from right
                card.style.opacity = '0';
                cardsGrid.appendChild(card);
                
                // Trigger slide-in animation
                setTimeout(() => {
                    card.style.transform = 'translateX(0)';
                    card.style.opacity = '1';
                }, index * 20); // Stagger the animations
            });
        } else {
            // Large result set - use lazy loading
            addCardsWithLazyLoading(filteredCards);
        }
    }, existingCards.length * 20 + 150); // Wait for slide-out animations to complete
}

// Function to handle search input
function setupSearch() {
    const searchInput = document.querySelector('.cards-search-input');
    const clearButton = document.querySelector('.clear-search-icon');
    const searchIcon = document.querySelector('.search-icon-cards');
    
    if (!searchInput) return;
    
    // Show/hide clear button based on input
    function toggleClearButton() {
        const hasValue = searchInput.value.length > 0;
        if (clearButton) clearButton.style.display = hasValue ? 'block' : 'none';
        if (searchIcon) searchIcon.style.display = hasValue ? 'none' : 'block';
    }
    
    // Search input event
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.trim();
        toggleClearButton();
        
        if (searchTerm === '') {
            renderCards(); // Show all cards if search is empty
        } else {
            filterCards(searchTerm);
        }
    });
    
    // Clear button click event
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            searchInput.focus();
            toggleClearButton();
            renderCards(); // Show all cards
        });
    }
    
    // Initial state
    toggleClearButton();
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    setupFooterComingSoonPopups();
    // إذا كنا في index.html فقط
    if (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/html/') || window.location.pathname === '/html/') {
        renderMainPageCards();
    }
});

function renderMainPageCards() {
    const cardsGrid = document.querySelector('.cardsGrid');
    if (!cardsGrid) return;
    cardsGrid.innerHTML = '';
    // Show only the first 3 cards as a preview
    const previewCards = cardsData.slice(0, 3);
    previewCards.forEach(card => {
        const cardEl = createCard(card);
        cardsGrid.appendChild(cardEl);
    });
    addMoreButton(); // يجب أن تكون هنا!
}

function setupFooterComingSoonPopups() {
    const telegramBtn = document.querySelector('.footerContact .fa-telegram')?.parentElement;
    const discordBtn = document.querySelector('.footerContact .fa-discord')?.parentElement;
    if (!telegramBtn && !discordBtn) return;

    function showComingSoon() {
        // Remove any existing modal
        document.querySelectorAll('.coming-soon-modal').forEach(e => e.remove());
        const modal = document.createElement('div');
        modal.className = 'coming-soon-modal';
        modal.style.position = 'fixed';
        modal.style.top = 0;
        modal.style.left = 0;
        modal.style.width = '100vw';
        modal.style.height = '100vh';
        modal.style.background = 'rgba(0,0,0,0.4)';
        modal.style.display = 'flex';
        modal.style.alignItems = 'center';
        modal.style.justifyContent = 'center';
        modal.style.zIndex = 2000;
        modal.innerHTML = `<div style="background:#fff;padding:2rem 2.5rem;border-radius:18px;font-size:1.5rem;color:#2bb686;box-shadow:0 4px 24px #0002;text-align:center;">قادم قريبا<br><button style='margin-top:1.5rem;padding:0.5rem 1.5rem;border:none;background:#2bb686;color:#fff;border-radius:8px;font-size:1rem;cursor:pointer;'>إغلاق</button></div>`;
        document.body.appendChild(modal);
        modal.querySelector('button').onclick = () => modal.remove();
        modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
    }
    if (telegramBtn) telegramBtn.onclick = (e) => { e.preventDefault(); showComingSoon(); };
    if (discordBtn) discordBtn.onclick = (e) => { e.preventDefault(); showComingSoon(); };
}

// Export functions for potential external use
window.cardsManager = {
    renderCards,
    filterCards,
    setupSearch
}; 