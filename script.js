// Filter toggle functionality
function toggleFilter(filterId) {
    const filterContent = document.getElementById(filterId);
    const filterHeader = filterContent.previousElementSibling;
    const chevron = filterHeader.querySelector('i');

    if (filterContent.classList.contains('active')) {
        filterContent.classList.remove('active');
        filterContent.style.display = 'none';
        chevron.style.transform = 'rotate(0deg)';
    } else {
        filterContent.classList.add('active');
        filterContent.style.display = 'block';
        chevron.style.transform = 'rotate(180deg)';
    }
}

// Initialize page
document.addEventListener('DOMContentLoaded', function () {
    // Set initial state for expanded filters
    const categoryFilter = document.getElementById('category');
    const genderFilter = document.getElementById('gender');

    if (categoryFilter) {
        categoryFilter.classList.add('active');
        categoryFilter.style.display = 'block';
    }

    if (genderFilter) {
        genderFilter.classList.add('active');
        genderFilter.style.display = 'block';
    }

    // Add click handlers for filter pills
    const filterPills = document.querySelectorAll('.filter-pill');
    filterPills.forEach(pill => {
        pill.addEventListener('click', function () {
            // Remove active class from all pills in the same group
            const parent = this.parentElement;
            const siblings = parent.querySelectorAll('.filter-pill');
            siblings.forEach(sibling => sibling.classList.remove('active'));

            // Add active class to clicked pill
            this.classList.add('active');
        });
    });

    // Add click handlers for checkboxes
    const checkboxes = document.querySelectorAll('.checkbox-item input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', function () {
            // You can add filtering logic here
            console.log('Filter changed:', this.nextElementSibling.textContent, this.checked);
        });
    });

    // Sort dropdown functionality
    const sortDropdown = document.getElementById('sort-select');
    if (sortDropdown) {
        sortDropdown.addEventListener('change', function () {
            console.log('Sort changed to:', this.value);
            // You can add sorting logic here
        });
    }

    // Search bar functionality
    const searchInput = document.querySelector('.search-bar input');
    const clearButton = document.querySelector('.search-bar .fa-times');

    if (clearButton) {
        clearButton.addEventListener('click', function () {
            searchInput.value = '';
            searchInput.focus();
        });
    }

    // Handle search form submission
    if (searchInput) {
        searchInput.addEventListener('keypress', function (e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const query = this.value.trim();
                if (query) {
                    updateSearchQuery(query);
                    // Update page title
                    const pageTitle = document.querySelector('.page-title h1');
                    if (pageTitle) {
                        pageTitle.textContent = query;
                    }
                    // Hide suggestions when searching
                    hideSearchSuggestions();
                    // Update fallback URLs with current query
                    updateFallbackUrls(query, query);
                }
            }
        });

        // Handle real-time translation as user types
        searchInput.addEventListener('input', function (e) {
            const query = e.target.value.trim();
            if (query.length > 2) {
                debouncedTranslate(query);
            } else {
                hideSearchSuggestions();
                updateFallbackUrls(query, query);
            }
        });
    }

    // Product card hover effects
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', function () {
            // You can add product detail navigation here
            console.log('Product clicked:', this.querySelector('.product-name').textContent);
        });
    });

    // Header navigation hover effects
    const profileSection = document.querySelector('.profile-section');
    const cartSection = document.querySelector('.cart-section');

    if (profileSection) {
        profileSection.addEventListener('click', function () {
            console.log('Profile clicked');
            // You can add profile navigation here
        });
    }

    if (cartSection) {
        cartSection.addEventListener('click', function () {
            console.log('Cart clicked');
            // You can add cart navigation here
        });
    }

    // Main navigation hover effects
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Navigation clicked:', this.textContent);
            // You can add navigation logic here
        });
    });
});

// Utility function to simulate product filtering
function filterProducts(criteria) {
    console.log('Filtering products by:', criteria);
    // This would typically make an API call or filter the existing products
}

// Utility function to sort products
function sortProducts(sortBy) {
    console.log('Sorting products by:', sortBy);
    // This would typically sort the product grid
}

// Utility function to search products
function searchProducts(query) {
    console.log('Searching for:', query);
    // This would typically make an API call with the search query
}

// Add smooth scrolling for better UX
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for better UX
function showLoading() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.style.opacity = '0.5';
        productGrid.style.pointerEvents = 'none';
    }
}

function hideLoading() {
    const productGrid = document.querySelector('.product-grid');
    if (productGrid) {
        productGrid.style.opacity = '1';
        productGrid.style.pointerEvents = 'auto';
    }
}

// Simulate API calls with loading states
function simulateApiCall(callback, delay = 1000) {
    showLoading();
    setTimeout(() => {
        callback();
        hideLoading();
    }, delay);
}

// Iframe functionality
function retryIframe() {
    const iframe = document.getElementById('meesho-iframe');
    const fallback = document.getElementById('iframe-fallback');

    if (iframe && fallback) {
        fallback.classList.remove('show');
        iframe.src = iframe.src; // Reload the iframe
    }
}

function openInNewTab() {
    const iframe = document.getElementById('meesho-iframe');
    if (iframe) {
        window.open(iframe.src, '_blank');
    }
}

// Check if iframe loads successfully
document.addEventListener('DOMContentLoaded', function () {
    const iframe = document.getElementById('meesho-iframe');
    const fallback = document.getElementById('iframe-fallback');

    if (iframe && fallback) {
        // Show fallback immediately since iframe embedding is likely blocked
        const loadTimeout = setTimeout(() => {
            fallback.classList.add('show');
        }, 2000); // 2 second timeout

        // Clear timeout if iframe loads successfully
        iframe.addEventListener('load', function () {
            clearTimeout(loadTimeout);
            // Check if iframe actually has content
            try {
                const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
                if (iframeDoc.body && iframeDoc.body.innerHTML.trim() === '') {
                    fallback.classList.add('show');
                }
            } catch (e) {
                // Cross-origin error - iframe is blocked
                fallback.classList.add('show');
            }
        });

        // Show fallback on error
        iframe.addEventListener('error', function () {
            clearTimeout(loadTimeout);
            fallback.classList.add('show');
        });
    }

    // Add click handlers for suggestion links
    const originalSuggestion = document.getElementById('original-suggestion');
    const translatedSuggestion = document.getElementById('translated-suggestion');

    if (originalSuggestion) {
        originalSuggestion.addEventListener('click', function (e) {
            e.preventDefault();
            const originalQuery = this.textContent;
            const translatedQuery = document.getElementById('translated-suggestion').textContent;

            // Update the main search with original query
            updateSearchQuery(originalQuery);

            // Update page title
            const pageTitle = document.querySelector('.page-title h1');
            if (pageTitle) {
                pageTitle.textContent = originalQuery;
            }

            // Keep both URLs different - original and translated
            updateFallbackUrls(originalQuery, translatedQuery);
            hideSearchSuggestions();
        });
    }

    if (translatedSuggestion) {
        translatedSuggestion.addEventListener('click', function (e) {
            e.preventDefault();
            const translatedQuery = this.textContent;
            const originalQuery = document.getElementById('original-suggestion').textContent;

            // Update the main search with translated query
            updateSearchQuery(translatedQuery);

            // Update page title
            const pageTitle = document.querySelector('.page-title h1');
            if (pageTitle) {
                pageTitle.textContent = translatedQuery;
            }

            // Keep both URLs different - original and translated
            updateFallbackUrls(originalQuery, translatedQuery);
            hideSearchSuggestions();
        });
    }

    // Add click handlers for URL displays in fallback
    const originalUrlElement = document.getElementById('original-url');
    const translatedUrlElement = document.getElementById('translated-url');

    if (originalUrlElement) {
        originalUrlElement.addEventListener('click', function () {
            const url = this.textContent.trim();
            window.open(url, '_blank');
        });
    }

    if (translatedUrlElement) {
        translatedUrlElement.addEventListener('click', function () {
            const url = this.textContent.trim();
            window.open(url, '_blank');
        });
    }

    // Audio recording functionality
    const audioRecordBtn = document.getElementById('audio-record-btn');
    let mediaRecorder = null;
    let audioChunks = [];
    let isRecording = false;

    console.log('Audio button found:', !!audioRecordBtn); // Debug log

    if (audioRecordBtn) {
        audioRecordBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Audio button clicked'); // Debug log
            toggleAudioRecording();
        });
    }

    // Check if browser supports audio recording
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        console.log('Audio recording not supported'); // Debug log
        if (audioRecordBtn) {
            audioRecordBtn.style.display = 'none';
        }
    } else {
        console.log('Audio recording supported'); // Debug log
    }

    // Audio recording functions (moved inside DOMContentLoaded)
    async function toggleAudioRecording() {
        console.log('Toggle audio recording called, isRecording:', isRecording); // Debug log
        if (isRecording) {
            stopRecording();
        } else {
            await startRecording();
        }
    }

    async function startRecording() {
        console.log('Starting speech recognition...'); // Debug log
        try {
            // Use direct speech recognition instead of audio recording
            isRecording = true;
            updateRecordingUI(true);

            const text = await startSpeechRecognition();
            if (text) {
                console.log('Speech recognized:', text); // Debug log
                // Update search input with transcribed text
                const searchInput = document.querySelector('.search-bar input');
                if (searchInput) {
                    searchInput.value = text;
                    searchInput.focus();

                    // Trigger translation
                    const event = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(event);
                }
            }

            isRecording = false;
            updateRecordingUI(false);

        } catch (error) {
            console.error('Error with speech recognition:', error);
            isRecording = false;
            updateRecordingUI(false);
            alert('Unable to access microphone or speech recognition failed. Please check permissions and try again.');
        }
    }

    function stopRecording() {
        console.log('Stopping recording...'); // Debug log
        if (isRecording) {
            isRecording = false;
            updateRecordingUI(false);
        }
    }

    function updateRecordingUI(recording) {
        const audioBtn = document.getElementById('audio-record-btn');
        const icon = audioBtn.querySelector('i');

        if (recording) {
            audioBtn.classList.add('recording');
            icon.className = 'fas fa-stop';
            audioBtn.title = 'Stop recording';
            console.log('Recording UI updated - recording'); // Debug log
        } else {
            audioBtn.classList.remove('recording');
            icon.className = 'fas fa-microphone';
            audioBtn.title = 'Record audio';
            console.log('Recording UI updated - stopped'); // Debug log
        }
    }

    async function processAudioRecording(audioBlob) {
        console.log('Processing audio recording...'); // Debug log
        try {
            // Use direct speech recognition instead of processing audio blob
            const text = await startSpeechRecognition();
            if (text) {
                console.log('Speech recognized:', text); // Debug log
                // Update search input with transcribed text
                const searchInput = document.querySelector('.search-bar input');
                if (searchInput) {
                    searchInput.value = text;
                    searchInput.focus();

                    // Trigger translation
                    const event = new Event('input', { bubbles: true });
                    searchInput.dispatchEvent(event);
                }
            }
        } catch (error) {
            console.error('Error processing audio:', error);
            alert('Error processing audio. Please try again.');
        }
    }

    async function startSpeechRecognition() {
        return new Promise((resolve, reject) => {
            console.log('Starting speech recognition...'); // Debug log
            // Check if browser supports Web Speech API
            if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
                console.log('Speech recognition not supported'); // Debug log
                reject(new Error('Speech recognition not supported'));
                return;
            }

            const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
            const recognition = new SpeechRecognition();

            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'hi-IN,te-IN,ta-IN,bn-IN,gu-IN,pa-IN,en-IN'; // Indian languages + English

            recognition.onresult = (event) => {
                const transcript = event.results[0][0].transcript;
                console.log('Speech recognized:', transcript);
                resolve(transcript);
            };

            recognition.onerror = (event) => {
                console.error('Speech recognition error:', event.error);
                reject(new Error(event.error));
            };

            recognition.onend = () => {
                console.log('Speech recognition ended');
            };

            // Start recognition
            recognition.start();

            // Fallback: if no result after 10 seconds, reject
            setTimeout(() => {
                if (recognition.state === 'running') {
                    recognition.stop();
                    reject(new Error('Speech recognition timeout'));
                }
            }, 10000);
        });
    }
});


// Update iframe URL when search changes
function updateSearchQuery(query) {
    const iframe = document.getElementById('meesho-iframe');
    if (iframe) {
        const encodedQuery = encodeURIComponent(query);
        const newUrl = `https://www.meesho.com/search?q=${encodedQuery}&searchType=manual&searchIdentifier=text_search`;
        iframe.src = newUrl;
    }
}

// Update fallback URLs with original and translated queries
function updateFallbackUrls(originalQuery, translatedQuery) {
    console.log('Updating fallback URLs:', { originalQuery, translatedQuery }); // Debug log

    const originalUrlElement = document.getElementById('original-url');
    const translatedUrlElement = document.getElementById('translated-url');
    const originalTextElement = document.getElementById('original-text');
    const translatedTextElement = document.getElementById('translated-text');

    console.log('Elements found:', {
        originalUrlElement: !!originalUrlElement,
        translatedUrlElement: !!translatedUrlElement,
        originalTextElement: !!originalTextElement,
        translatedTextElement: !!translatedTextElement
    }); // Debug log

    if (originalUrlElement && originalTextElement) {
        const originalEncoded = encodeURIComponent(originalQuery);
        originalUrlElement.textContent = `https://www.meesho.com/search?q=${originalEncoded}&searchType=manual&searchIdentifier=text_search`;
        originalTextElement.textContent = originalQuery;
        console.log('Updated original:', originalQuery); // Debug log
    }

    if (translatedUrlElement && translatedTextElement) {
        const translatedEncoded = encodeURIComponent(translatedQuery);
        translatedUrlElement.textContent = `https://www.meesho.com/search?q=${translatedEncoded}&searchType=manual&searchIdentifier=text_search`;
        translatedTextElement.textContent = translatedQuery;
        console.log('Updated translated:', translatedQuery); // Debug log
    }
}

// Gemini LLM Integration for Indian Language Translation
const GEMINI_API_KEY = 'AIzaSyCqzgwMQkuGdbg43Vv7LzVUghbJu2hkn7c';
// Use the best available models from the list
const GEMINI_MODELS = [
    'gemini-2.5-flash',           // Stable version with good limits
    'gemini-2.0-flash-001',       // Stable version of 2.0 Flash
    'gemini-2.0-flash-exp',       // Experimental version
    'gemini-flash-latest'         // Latest release
];
let currentModelIndex = 0;

async function translateWithGemini(userInput, retryCount = 0) {
    const maxRetries = GEMINI_MODELS.length;

    if (retryCount >= maxRetries) {
        console.log('All models exhausted, using fallback translation');
        return getFallbackTranslation(userInput);
    }

    const currentModel = GEMINI_MODELS[currentModelIndex];
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/${currentModel}:generateContent`;

    try {
        const prompt = `You are an expert e-commerce search agent specializing in Indian languages and cultural context. You understand Indian parenting needs, traditional clothing, festivals, and family shopping patterns. Your task is to translate user input from any Indian language to natural English for e-commerce searches.

User input: "${userInput}"

Context Understanding:
- Indian parents often search for traditional clothing for children (sarees, lehengas, kurta sets)
- Cultural terms like "pasupu" (turmeric), "chudidhar" (saree), "chinna" (small/child) are common
- Festival shopping, wedding preparations, and family occasions drive searches
- Regional variations in clothing names and styles matter
- Age-specific terms: "chinna" (small child), "pilla" (child), "bidda" (girl), "kumari" (young girl)

Translation Guidelines:
1. Detect the language (Hindi, Tamil, Telugu, Bengali, Gujarati, Marathi, Punjabi, etc.)
2. If already in English, return the same text
3. Translate to natural English e-commerce terms while preserving cultural context
4. Convert traditional terms to modern shopping language
5. Consider age groups: baby, toddler, kids, children
6. Include relevant product categories: ethnic wear, traditional, festive, wedding
7. Maintain the emotional and cultural significance in the translation

Examples:
- "pasupu chudidhar ma chinna danikosam" → "turmeric yellow saree for small children"
- "pilla kosam lehenga" → "lehenga for girls"
- "bidda kosam ethnic wear" → "ethnic wear for girls"

Respond ONLY with valid JSON in this exact format:
{"original": "user input", "translated": "english translation", "language_detected": "detected language", "confidence": "high/medium/low", "cultural_context": "brief context note"}`;

        console.log(`Trying model: ${currentModel} (attempt ${retryCount + 1})`);

        const response = await fetch(`${apiUrl}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [{
                    parts: [{
                        text: prompt
                    }]
                }],
                generationConfig: {
                    temperature: 0.1,
                    topK: 1,
                    topP: 0.8,
                    maxOutputTokens: 200,
                    responseMimeType: "application/json"
                }
            })
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            console.log('API Error:', errorData);

            // Check for quota exceeded error
            if (response.status === 429 || (errorData.error && errorData.error.code === 429)) {
                console.log(`Quota exceeded for model ${currentModel}, trying next model`);
                currentModelIndex = (currentModelIndex + 1) % GEMINI_MODELS.length;
                return translateWithGemini(userInput, retryCount + 1);
            }

            // Check for model not found error
            if (response.status === 404 || (errorData.error && errorData.error.code === 404)) {
                console.log(`Model ${currentModel} not found, trying next model`);
                currentModelIndex = (currentModelIndex + 1) % GEMINI_MODELS.length;
                return translateWithGemini(userInput, retryCount + 1);
            }

            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        console.log('Gemini API response:', data); // Debug log

        // Handle the response based on the model's output format
        if (data.candidates && data.candidates[0] && data.candidates[0].content) {
            const responseText = data.candidates[0].content.parts[0].text;
            console.log('Response text:', responseText); // Debug log

            // Try to parse as JSON directly first (with responseMimeType: "application/json")
            try {
                const parsed = JSON.parse(responseText);
                console.log('Parsed JSON:', parsed); // Debug log

                // Handle array format - extract first object if it's an array
                if (Array.isArray(parsed) && parsed.length > 0) {
                    console.log('Extracted from array:', parsed[0]); // Debug log
                    return parsed[0];
                }

                return parsed;
            } catch (parseError) {
                console.log('JSON parse error:', parseError); // Debug log
                // Fallback: extract JSON from text response
                const jsonMatch = responseText.match(/\[[\s\S]*\]/); // Match array format first
                if (jsonMatch) {
                    try {
                        const arrayParsed = JSON.parse(jsonMatch[0]);
                        if (Array.isArray(arrayParsed) && arrayParsed.length > 0) {
                            console.log('Fallback array parsed:', arrayParsed[0]); // Debug log
                            return arrayParsed[0];
                        }
                    } catch (arrayError) {
                        console.log('Array parse error:', arrayError); // Debug log
                    }
                }

                // Try object format
                const objectMatch = responseText.match(/\{[\s\S]*\}/);
                if (objectMatch) {
                    const parsed = JSON.parse(objectMatch[0]);
                    console.log('Fallback object parsed:', parsed); // Debug log
                    return parsed;
                } else {
                    throw new Error('No valid JSON found in response');
                }
            }
        } else {
            throw new Error('Invalid response format from Gemini API');
        }
    } catch (error) {
        console.error('Error calling Gemini API:', error);

        // Try next model if available
        if (retryCount < maxRetries - 1) {
            console.log(`Error with model ${currentModel}, trying next model`);
            currentModelIndex = (currentModelIndex + 1) % GEMINI_MODELS.length;
            return translateWithGemini(userInput, retryCount + 1);
        }

        // All models failed, use fallback
        return getFallbackTranslation(userInput);
    }
}

// Fallback translation function for when API is unavailable
function getFallbackTranslation(userInput) {
    console.log('Using fallback translation for:', userInput);

    // Simple fallback translations for common terms
    const fallbackTranslations = {
        // Telugu
        'pasupu': 'turmeric yellow',
        'chudidhar': 'saree',
        'chinna': 'small children',
        'pilla': 'girls',
        'bidda': 'girls',
        'kurtha': 'kurta',
        'neelam': 'navy blue',
        'husband': 'husband',
        'danikosam': 'for',
        'kosam': 'for',

        // Hindi
        'saree': 'saree',
        'kurta': 'kurta',
        'lehenga': 'lehenga',
        'choli': 'blouse',
        'dupatta': 'dupatta',
        'salwar': 'salwar',
        'kameez': 'kameez',

        // Common colors
        'lal': 'red',
        'hara': 'green',
        'peela': 'yellow',
        'neela': 'blue',
        'gulabi': 'pink',
        'safed': 'white',
        'kala': 'black'
    };

    let translated = userInput;
    let detectedLanguage = 'unknown';

    // Simple language detection and translation
    for (const [key, value] of Object.entries(fallbackTranslations)) {
        if (userInput.toLowerCase().includes(key)) {
            translated = translated.replace(new RegExp(key, 'gi'), value);
            if (key === 'pasupu' || key === 'chudidhar' || key === 'chinna') {
                detectedLanguage = 'telugu';
            } else if (key === 'neelam' || key === 'kurtha') {
                detectedLanguage = 'hindi';
            }
        }
    }

    return {
        original: userInput,
        translated: translated,
        language_detected: detectedLanguage,
        confidence: 'low',
        cultural_context: 'fallback translation - API unavailable'
    };
}

// Show search suggestions
function showSearchSuggestions(original, translated, culturalContext = '') {
    console.log('Showing search suggestions:', { original, translated, culturalContext }); // Debug log

    const suggestionsDiv = document.getElementById('search-suggestions');
    const originalLink = document.getElementById('original-suggestion');
    const translatedLink = document.getElementById('translated-suggestion');

    console.log('Suggestion elements found:', {
        suggestionsDiv: !!suggestionsDiv,
        originalLink: !!originalLink,
        translatedLink: !!translatedLink
    }); // Debug log

    if (suggestionsDiv && originalLink && translatedLink) {
        originalLink.textContent = original;
        originalLink.href = `https://www.meesho.com/search?q=${encodeURIComponent(original)}&searchType=manual&searchIdentifier=text_search`;

        translatedLink.textContent = translated;
        translatedLink.href = `https://www.meesho.com/search?q=${encodeURIComponent(translated)}&searchType=manual&searchIdentifier=text_search`;

        // Add cultural context tooltip if available
        if (culturalContext && culturalContext !== 'translation failed') {
            originalLink.title = `Cultural context: ${culturalContext}`;
            translatedLink.title = `Cultural context: ${culturalContext}`;
        }

        suggestionsDiv.style.display = 'block';
        console.log('Suggestions displayed successfully'); // Debug log
    } else {
        console.log('Failed to find suggestion elements'); // Debug log
    }
}

// Hide search suggestions
function hideSearchSuggestions() {
    const suggestionsDiv = document.getElementById('search-suggestions');
    if (suggestionsDiv) {
        suggestionsDiv.style.display = 'none';
    }
}

// Debounce function to limit API calls
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Debounced translation function (optimized for Gemini 2.0 Flash speed)
const debouncedTranslate = debounce(async (query) => {
    if (query.trim().length > 2) {
        const result = await translateWithGemini(query);
        console.log('Translation result:', result); // Debug log

        // Always show suggestions if we have a translation result
        if (result && result.original && result.translated) {
            showSearchSuggestions(result.original, result.translated, result.cultural_context);
            // Update fallback URLs with both original and translated queries
            updateFallbackUrls(result.original, result.translated);
        } else {
            hideSearchSuggestions();
            // Update fallback URLs with the same query for both
            updateFallbackUrls(query, query);
        }
    } else {
        hideSearchSuggestions();
        updateFallbackUrls(query, query);
    }
}, 500); // Reduced from 1000ms to 500ms for faster response with Gemini 2.0 Flash

