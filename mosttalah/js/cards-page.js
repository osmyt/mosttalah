// Cards page functionality
let allCards = [];
let filteredCards = [];
let selectedTags = new Set();
let currentSearchTerm = '';

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeCardsPage();
    setupMobileFiltersToggle();
    setupFooterComingSoonPopups();

    const toggleFiltersBtn = document.querySelector('.toggle-filters-btn');
    const closeSidebarBtn = document.querySelector('.close-sidebar-btn');
    const tagsSidebar = document.querySelector('.tags-sidebar');

    // Sidebar toggle functionality
    if (toggleFiltersBtn && tagsSidebar) {
        toggleFiltersBtn.addEventListener('click', () => {
            tagsSidebar.classList.add('active');
            // Add overlay
            const overlay = document.createElement('div');
            overlay.classList.add('sidebar-overlay');
            document.body.appendChild(overlay);
            overlay.addEventListener('click', () => {
                tagsSidebar.classList.remove('active');
                overlay.remove();
            });
        });
    }
    if (closeSidebarBtn && tagsSidebar) {
        closeSidebarBtn.addEventListener('click', () => {
            tagsSidebar.classList.remove('active');
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) overlay.remove();
        });
    }
    // Hide sidebar on resize if larger than mobile breakpoint
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            tagsSidebar.classList.remove('active');
            const overlay = document.querySelector('.sidebar-overlay');
            if (overlay) overlay.remove();
        }
    });
    // Initial state check for sidebar visibility on load
    if (window.innerWidth <= 768) {
        tagsSidebar.classList.remove('active');
        if (toggleFiltersBtn) toggleFiltersBtn.style.display = 'flex';
    } else {
        tagsSidebar.classList.add('active');
        if (toggleFiltersBtn) toggleFiltersBtn.style.display = 'none';
    }
});

function initializeCardsPage() {
    allCards = [...cardsData]; // Copy all cards
    filteredCards = [...allCards];
    
    setupTagsSidebar();
    setupSearch();
    setupClearFilters();
    renderCards();
    updateResultsCount();
}

// Setup tags sidebar
function setupTagsSidebar() {
    const tagsList = document.querySelector('.tags-list');
    if (!tagsList) return;
    
    // Get all unique tags
    const allTags = new Set();
    allCards.forEach(card => {
        card.tags.forEach(tag => allTags.add(tag));
    });
    
    // Create tag buttons
    const sortedTags = Array.from(allTags).sort();
    sortedTags.forEach(tag => {
        const tagButton = document.createElement('button');
        tagButton.className = 'sidebar-tag-btn';
        tagButton.setAttribute('data-tag', tag);
        tagButton.innerHTML = `
            <i class="fa-solid fa-tag"></i>
            <span>${tag}</span>
            <span class="tag-count">${getTagCount(tag)}</span>
        `;
        
        tagButton.addEventListener('click', () => toggleTagFilter(tag, tagButton));
        tagsList.appendChild(tagButton);
    });
}

// Get count of cards with specific tag
function getTagCount(tag) {
    return allCards.filter(card => card.tags.includes(tag)).length;
}

// Toggle tag filter
function toggleTagFilter(tag, button) {
    if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        button.classList.remove('active');
    } else {
        selectedTags.add(tag);
        button.classList.add('active');
    }
    
    filterAndRenderCards();
}

// Setup search functionality
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
        // Only allow Arabic, English letters, and numbers
        let cleanValue = e.target.value.replace(/[^\u0600-\u06FFa-zA-Z0-9\s]/g, '');
        if (e.target.value !== cleanValue) {
            e.target.value = cleanValue;
        }
        currentSearchTerm = cleanValue.trim();
        toggleClearButton();
        filterAndRenderCards();
    });
    
    // Clear button click event
    if (clearButton) {
        clearButton.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchTerm = '';
            searchInput.focus();
            toggleClearButton();
            filterAndRenderCards();
        });
    }
    
    // Initial state
    toggleClearButton();
}

// Utility to update clear filters button visibility
const updateClearFiltersButton = () => {
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    if (!clearFiltersBtn) return;
    if (selectedTags.size > 0) {
        clearFiltersBtn.classList.add('show');
    } else {
        clearFiltersBtn.classList.remove('show');
    }
};

// Modify toggleTagFilter to update button visibility
function toggleTagFilter(tag, button) {
    if (selectedTags.has(tag)) {
        selectedTags.delete(tag);
        button.classList.remove('active');
    } else {
        selectedTags.add(tag);
        button.classList.add('active');
    }
    filterAndRenderCards();
    updateClearFiltersButton();
}

// Setup clear filters button
function setupClearFilters() {
    const clearFiltersBtn = document.querySelector('.clear-filters-btn');
    if (!clearFiltersBtn) {
        console.error('Clear filters button not found');
        return;
    }
    
    // Remove any existing event listeners
    const newClearFiltersBtn = clearFiltersBtn.cloneNode(true);
    clearFiltersBtn.parentNode.replaceChild(newClearFiltersBtn, clearFiltersBtn);
    
    newClearFiltersBtn.addEventListener('click', function(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log('Clear filters button clicked'); // Debug log
        
        // Clear selected tags completely
        selectedTags.clear();
        console.log('Selected tags cleared, count:', selectedTags.size);
        
        // Remove active class from all tag buttons and reset their appearance
        const tagButtons = document.querySelectorAll('.sidebar-tag-btn');
        tagButtons.forEach(btn => {
            btn.classList.remove('active');
            // Force a visual refresh
            btn.style.backgroundColor = '';
            btn.style.color = '';
            console.log('Reset tag button:', btn.textContent);
        });
        
        // Clear search completely
        const searchInput = document.querySelector('.cards-search-input');
        const clearButton = document.querySelector('.clear-search-icon');
        const searchIcon = document.querySelector('.search-icon-cards');
        
        if (searchInput) {
            searchInput.value = '';
            currentSearchTerm = '';
            console.log('Search cleared');
        }
        
        // Update search input display state
        if (clearButton) clearButton.style.display = 'none';
        if (searchIcon) searchIcon.style.display = 'block';
        
        // Reset filtered cards to show ALL cards
        filteredCards = [...allCards];
        console.log('Filtered cards reset to show all:', filteredCards.length, 'cards');
        
        // Force immediate UI update
        renderCards();
        updateResultsCount();
        updateClearFiltersButton(); // Update button visibility after clearing
        
        // Focus back to search input for better UX
        if (searchInput) {
            searchInput.focus();
        }
        
        console.log('Clear filters completed successfully');
    });
}

// Filter and render cards
function filterAndRenderCards() {
    // Apply search filter
    let searchFiltered = allCards;
    if (currentSearchTerm) {
        const searchWords = currentSearchTerm.toLowerCase().split(/\s+/).filter(word => word.length > 0);
        searchFiltered = allCards.filter(card => {
            const searchableText = [
                card.title.toLowerCase(),
                card.englishTerm.toLowerCase(),
                card.description.toLowerCase(),
                ...card.tags.map(tag => tag.toLowerCase())
            ].join(' ');
            return searchWords.every(word => searchableText.includes(word));
        });
    }
    
    // Apply tag filter
    if (selectedTags.size > 0) {
        filteredCards = searchFiltered.filter(card => 
            card.tags.some(tag => selectedTags.has(tag))
        );
    } else {
        filteredCards = searchFiltered;
    }
    
    renderCards();
    updateResultsCount();
}

// Render cards with lazy loading
function renderCards() {
    const cardsGrid = document.querySelector('.cardsGrid');
    if (!cardsGrid) return;
    
    // Clean up previous scroll handler
    if (window.currentScrollHandler) {
        window.removeEventListener('scroll', window.currentScrollHandler);
        window.currentScrollHandler = null;
    }
    
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
            addCardsWithLazyLoading(filteredCards);
        }, existingCards.length * 20 + 150);
    } else {
        // No existing cards, add directly
        cardsGrid.innerHTML = '';
        addCardsWithLazyLoading(filteredCards);
    }
}

// Add cards with lazy loading
function addCardsWithLazyLoading(cardsToAdd) {
    const cardsGrid = document.querySelector('.cardsGrid');
    if (!cardsGrid) return;
    
    const cardsPerBatch = 8; // Load 8 cards at a time
    let currentIndex = 0;
    
    function loadNextBatch() {
        const batch = cardsToAdd.slice(currentIndex, currentIndex + cardsPerBatch);
        
        batch.forEach((cardData, batchIndex) => {
            const card = createCard(cardData);
            card.style.transform = 'translateX(100%)';
            card.style.opacity = '0';
            cardsGrid.appendChild(card);
            
            // Trigger slide-in animation
            setTimeout(() => {
                card.style.transform = 'translateX(0)';
                card.style.opacity = '1';
            }, batchIndex * 20);
        });
        
        currentIndex += cardsPerBatch;
        
        // Show/hide loading indicator
        const loadingIndicator = document.querySelector('.loading-indicator');
        if (loadingIndicator) {
            loadingIndicator.style.display = currentIndex < cardsToAdd.length ? 'flex' : 'none';
        }
        
        // Load more if there are more cards and user is near bottom
        if (currentIndex < cardsToAdd.length) {
            const scrollPosition = window.scrollY + window.innerHeight;
            const pageHeight = document.documentElement.scrollHeight;
            
            if (scrollPosition >= pageHeight - 200) {
                setTimeout(loadNextBatch, 100);
            }
        }
    }
    
    function shouldLoadMore() {
        const footer = document.getElementById('footer');
        if (!footer) return false;
        const footerRect = footer.getBoundingClientRect();
        return footerRect.top < window.innerHeight && footerRect.bottom > 0;
    }
    // Start loading first batch
    loadNextBatch();
    // Add scroll listener for lazy loading
    const scrollHandler = () => {
        if (currentIndex < cardsToAdd.length && shouldLoadMore()) {
            loadNextBatch();
        }
    };
    window.currentScrollHandler = scrollHandler;
    window.addEventListener('scroll', scrollHandler);
}

// Create card element
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
            // Find the sidebar tag button by exact data-tag match
            const sidebarTagBtn = document.querySelector(`.sidebar-tag-btn[data-tag='${tagText}']`);
            if (sidebarTagBtn) {
                sidebarTagBtn.scrollIntoView({ behavior: 'smooth', block: 'center' });
                if (!sidebarTagBtn.classList.contains('active')) {
                    sidebarTagBtn.click();
                }
            }
        });
    });
    
    return card;
}

// Update results count
function updateResultsCount() {
    const resultsCount = document.querySelector('.results-count');
    if (!resultsCount) return;
    
    const totalCards = allCards.length;
    const filteredCount = filteredCards.length;
    
    if (selectedTags.size > 0 || currentSearchTerm) {
        resultsCount.textContent = `عرض ${filteredCount} من ${totalCards} مصطلح`;
    } else {
        resultsCount.textContent = `عرض جميع المصطلحات (${totalCards})`;
    }
} 

function setupMobileFiltersToggle() {
    const sidebar = document.querySelector('.tags-sidebar');
    const toggleBtn = document.querySelector('.toggle-filters-btn');
    if (!sidebar || !toggleBtn) return;

    // Create overlay for mobile
    let overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = 0;
    overlay.style.left = 0;
    overlay.style.width = '100vw';
    overlay.style.height = '100vh';
    overlay.style.background = 'rgba(0,0,0,0.3)';
    overlay.style.zIndex = 999;
    overlay.style.display = 'none';
    document.body.appendChild(overlay);

    // Style sidebar for mobile slide-in
    sidebar.style.transition = 'right 0.3s';
    sidebar.style.position = 'fixed';
    sidebar.style.top = '0';
    sidebar.style.right = '-100vw';
    sidebar.style.height = '100vh';
    sidebar.style.zIndex = 1000;
    sidebar.style.background = '#fff';
    sidebar.style.boxShadow = '0 0 20px #0002';
    sidebar.style.width = '80vw';
    sidebar.style.maxWidth = '350px';

    const closeBtn = sidebar.querySelector('.close-sidebar-btn');
    function showSidebar() {
        sidebar.classList.add('sidebar-visible');
        sidebar.style.right = '0';
        overlay.style.display = 'block';
        document.body.style.overflow = 'hidden';
        if (closeBtn) closeBtn.style.display = 'block';
    }
    function hideSidebar() {
        sidebar.classList.remove('sidebar-visible');
        sidebar.style.right = '-100vw';
        overlay.style.display = 'none';
        document.body.style.overflow = '';
        if (closeBtn) closeBtn.style.display = 'none';
    }

    toggleBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (sidebar.style.right === '0px') {
            hideSidebar();
        } else {
            showSidebar();
        }
    });
    overlay.addEventListener('click', hideSidebar);
    // Hide on resize to desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 600) {
            hideSidebar();
        }
    });

    if (closeBtn) {
        closeBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            hideSidebar();
            console.log('Sidebar closed by close button');
        });
    }
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