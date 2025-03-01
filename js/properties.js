// Century One Management - Properties Page JavaScript

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS Animations with optimized settings
    if (typeof AOS !== 'undefined') {
        AOS.init({
            duration: 1000,
            once: true,
            offset: 100,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
            disable: window.innerWidth < 768 ? 'phone' : false // Disable on very small devices for better performance
        });
    }

    // Property Filtering System
    const filterButtons = document.querySelectorAll('.filter-btn');
    const propertyCards = document.querySelectorAll('.property-card');
    const propertySearch = document.getElementById('propertySearch');
    const propertySorting = document.getElementById('propertySorting');
    const propertiesGrid = document.querySelector('.properties-grid');
    
    // Track current filter and search terms
    let currentFilter = 'all';
    let searchTerm = '';
    
    // Property Details Modal Functionality
    const propertyDetailsOverlay = document.getElementById('propertyDetailsOverlay');
    const detailsContent = document.querySelector('.property-details-content');
    const closeDetailsBtn = document.querySelector('.close-details');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    
    // Function to open property details modal
    const openPropertyDetails = (propertyCard) => {
        // Get the hidden details content
        const hiddenDetails = propertyCard.querySelector('.hidden-property-details').cloneNode(true);
        
        // Clear previous content
        detailsContent.innerHTML = '';
        
        // Add new content
        detailsContent.appendChild(hiddenDetails.children[0]); // Gallery
        detailsContent.appendChild(hiddenDetails.children[0]); // Content (now first child after gallery is removed)
        
        // Set up thumbnail navigation
        setupThumbnailNavigation();
        
        // Show the overlay
        propertyDetailsOverlay.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    };
    
    // Function to close property details modal
    const closePropertyDetails = () => {
        propertyDetailsOverlay.classList.remove('active');
        document.body.style.overflow = ''; // Restore scrolling
    };
    
    // Setup thumbnail navigation in modal
    const setupThumbnailNavigation = () => {
        const thumbnails = detailsContent.querySelectorAll('.thumbnail');
        const mainImage = detailsContent.querySelector('.main-detail-image');
        
        if (!thumbnails.length || !mainImage) return;
        
        thumbnails.forEach(thumb => {
            thumb.addEventListener('click', () => {
                // Update active class
                thumbnails.forEach(t => t.classList.remove('active'));
                thumb.classList.add('active');
                
                // Update main image
                mainImage.src = thumb.src;
                mainImage.alt = thumb.alt;
            });
        });
    };
    
    // Add event listeners for view details buttons
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const propertyCard = btn.closest('.property-card');
            openPropertyDetails(propertyCard);
        });
    });
    
    // Close details modal on button click
    if (closeDetailsBtn) {
        closeDetailsBtn.addEventListener('click', closePropertyDetails);
    }
    
    // Close details modal when clicking outside the content
    if (propertyDetailsOverlay) {
        propertyDetailsOverlay.addEventListener('click', (e) => {
            if (e.target === propertyDetailsOverlay) {
                closePropertyDetails();
            }
        });
    }
    
    // Close details modal with escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && propertyDetailsOverlay.classList.contains('active')) {
            closePropertyDetails();
        }
    });
    
    // Function to handle property filtering
    const filterProperties = () => {
        // Track visible cards count
        let visibleCards = 0;
        
        propertyCards.forEach(card => {
            const category = card.getAttribute('data-category') || '';
            const title = card.querySelector('h3').textContent.toLowerCase();
            const location = card.querySelector('.property-location').textContent.toLowerCase();
            const description = card.querySelector('.property-description') ? 
                               card.querySelector('.property-description').textContent.toLowerCase() : '';
            
            // Combine all searchable text
            const searchableText = `${title} ${location} ${description}`;
            
            // Check if card matches both filter and search criteria
            const matchesFilter = currentFilter === 'all' || category.includes(currentFilter);
            const matchesSearch = !searchTerm || searchableText.includes(searchTerm);
            
            // Show/hide card based on criteria
            if (matchesFilter && matchesSearch) {
                card.style.display = '';
                visibleCards++;
                
                // Reset animation for visible cards
                if (typeof AOS !== 'undefined') {
                    card.setAttribute('data-aos', 'fade-up');
                    AOS.refresh();
                }
            } else {
                card.style.display = 'none';
            }
        });
        
        // Check if no properties are visible and display message
        checkEmptyResults(visibleCards);
    };
    
    // Function to check if no results are found
    const checkEmptyResults = (visibleCount) => {
        // Remove any existing no-results message
        const existingMessage = document.querySelector('.no-results-message');
        if (existingMessage) {
            existingMessage.remove();
        }
        
        // If no properties are visible, show message
        if (visibleCount === 0) {
            const noResultsMessage = document.createElement('div');
            noResultsMessage.className = 'no-results-message';
            noResultsMessage.innerHTML = `
                <div class="no-results-icon">
                    <i class="fas fa-search"></i>
                </div>
                <h3>No Properties Found</h3>
                <p>Try adjusting your search criteria or filter selection to find more properties.</p>
                <button class="reset-filters-btn">Reset Filters</button>
            `;
            
            // Insert message after the grid
            propertiesGrid.insertAdjacentElement('afterend', noResultsMessage);
            
            // Add event listener to reset button
            const resetButton = noResultsMessage.querySelector('.reset-filters-btn');
            if (resetButton) {
                resetButton.addEventListener('click', resetFilters);
            }
        }
    };
    
    // Function to reset all filters
    const resetFilters = () => {
        // Reset filter selection
        currentFilter = 'all';
        filterButtons.forEach(btn => {
            btn.classList.toggle('active', btn.getAttribute('data-filter') === 'all');
        });
        
        // Reset search field
        if (propertySearch) {
            propertySearch.value = '';
            searchTerm = '';
        }
        
        // Reset sorting
        if (propertySorting) {
            propertySorting.value = 'default';
            sortProperties('default');
        }
        
        // Apply filters
        filterProperties();
    };
    
    // Function to sort properties
    const sortProperties = (sortType) => {
        const cardsArray = Array.from(propertyCards);
        
        switch (sortType) {
            case 'newest':
                // For demo purposes, sort by data-date attribute (could be added to cards)
                // In real implementation, you'd use actual property dates
                cardsArray.sort((a, b) => {
                    const dateA = a.getAttribute('data-date') || '';
                    const dateB = b.getAttribute('data-date') || '';
                    return dateB.localeCompare(dateA);
                });
                break;
                
            case 'oldest':
                cardsArray.sort((a, b) => {
                    const dateA = a.getAttribute('data-date') || '';
                    const dateB = b.getAttribute('data-date') || '';
                    return dateA.localeCompare(dateB);
                });
                break;
                
            case 'aToZ':
                cardsArray.sort((a, b) => {
                    const titleA = a.querySelector('h3').textContent.toLowerCase();
                    const titleB = b.querySelector('h3').textContent.toLowerCase();
                    return titleA.localeCompare(titleB);
                });
                break;
                
            case 'zToA':
                cardsArray.sort((a, b) => {
                    const titleA = a.querySelector('h3').textContent.toLowerCase();
                    const titleB = b.querySelector('h3').textContent.toLowerCase();
                    return titleB.localeCompare(titleA);
                });
                break;
                
            default:
                // Default sorting (restore original order)
                cardsArray.sort((a, b) => {
                    const indexA = parseInt(a.getAttribute('data-index') || '0');
                    const indexB = parseInt(b.getAttribute('data-index') || '0');
                    return indexA - indexB;
                });
        }
        
        // Reappend cards in new order
        cardsArray.forEach(card => {
            propertiesGrid.appendChild(card);
        });
        
        // Refresh animations
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
    };
    
    // Store original card order for reset functionality
    propertyCards.forEach((card, index) => {
        card.setAttribute('data-index', index);
    });
    
    // Event Listeners for Filter Buttons
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Update active state
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Update current filter
            currentFilter = button.getAttribute('data-filter');
            
            // Apply filtering
            filterProperties();
        });
    });
    
    // Event Listener for Search Input with debounce
    if (propertySearch) {
        let searchTimeout;
        
        propertySearch.addEventListener('input', () => {
            // Clear previous timeout
            clearTimeout(searchTimeout);
            
            // Set new timeout for better performance (debounce)
            searchTimeout = setTimeout(() => {
                searchTerm = propertySearch.value.toLowerCase().trim();
                filterProperties();
            }, 300);
        });
    }
    
    // Event Listener for Sorting dropdown
    if (propertySorting) {
        propertySorting.addEventListener('change', () => {
            sortProperties(propertySorting.value);
            filterProperties(); // Re-apply filters after sorting
        });
    }
    
    // Pagination Functionality
    const pageButtons = document.querySelectorAll('.page-btn');
    const nextPageButton = document.querySelector('.page-nav.next');
    
    if (pageButtons.length) {
        pageButtons.forEach(button => {
            button.addEventListener('click', () => {
                // Update active state
                pageButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                
                // In this implementation, we're not actually loading new pages
                // since all properties are displayed on one page.
                // This would typically connect to server pagination in a real implementation.
                
                // Scroll to top of properties section for better UX
                window.scrollTo({
                    top: document.querySelector('.properties-grid-section').offsetTop - 120,
                    behavior: 'smooth'
                });
            });
        });
    }
    
    if (nextPageButton) {
        nextPageButton.addEventListener('click', () => {
            // Find current active page and go to next
            const activePage = document.querySelector('.page-btn.active');
            if (activePage) {
                const nextPage = activePage.nextElementSibling;
                if (nextPage && nextPage.classList.contains('page-btn')) {
                    // Simulate click on next page
                    nextPage.click();
                } else if (document.querySelector('.page-btn:first-child')) {
                    // If at last page, go to first page
                    document.querySelector('.page-btn:first-child').click();
                }
            }
        });
    }
    
    // Property Card Hover Effects
    propertyCards.forEach(card => {
        const image = card.querySelector('.property-image img');
        
        if (image) {
            // Optimize by using one event listener for each card
            card.addEventListener('mouseenter', () => {
                image.style.transform = 'scale(1.1)';
            });
            
            card.addEventListener('mouseleave', () => {
                image.style.transform = '';
            });
        }
    });
    
    // Initialize filters on page load
    filterProperties();
    
    // Scroll to active filter on mobile
    const scrollToActiveFilter = () => {
        if (window.innerWidth < 768) {
            const activeFilter = document.querySelector('.filter-btn.active');
            const filterList = document.querySelector('.filter-list');
            
            if (activeFilter && filterList) {
                // Scroll the active filter into view
                filterList.scrollLeft = activeFilter.offsetLeft - (filterList.clientWidth / 2) + (activeFilter.clientWidth / 2);
            }
        }
    };
    
    scrollToActiveFilter();
    
    // Update on window resize
    window.addEventListener('resize', () => {
        // Refresh animations
        if (typeof AOS !== 'undefined') {
            AOS.refresh();
        }
        
        // Scroll to active filter (for mobile)
        scrollToActiveFilter();
    });
    
    // Handle Back to Top button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        // Show/hide button based on scroll position
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > 300) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });
        
        // Scroll to top when clicked
        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }
    
    // Handle "More Properties Coming Soon" section animations
    const morePropertiesSection = document.querySelector('.more-properties-section');
    if (morePropertiesSection) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    // Add extra animation when section comes into view
                    const moreIcon = morePropertiesSection.querySelector('.more-icon');
                    if (moreIcon) {
                        moreIcon.style.transform = 'scale(1.1)';
                        setTimeout(() => {
                            moreIcon.style.transform = '';
                        }, 500);
                    }
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(morePropertiesSection);
    }
    
    // Preload images for better user experience
    const preloadPropertyImages = () => {
        // Get all thumbnail images that might be needed
        const thumbnails = document.querySelectorAll('.thumbnail');
        
        thumbnails.forEach(thumb => {
            const img = new Image();
            img.src = thumb.src;
        });
    };
    
    // Wait until page is fully loaded before preloading images
    window.addEventListener('load', preloadPropertyImages);
});
