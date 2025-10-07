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

    // Custom Audio Recording functionality with Gemini API
    const audioRecordBtn = document.getElementById('audio-record-btn');
    let isRecording = false;
    let mediaRecorder = null;
    let audioChunks = [];
    let recordingTimer = null;
    let recordingStartTime = null;
    let recordingTimeout = null;

    console.log('Audio button found:', !!audioRecordBtn);

    if (audioRecordBtn) {
        audioRecordBtn.addEventListener('click', function (e) {
            e.preventDefault();
            console.log('Audio button clicked');
            toggleAudioRecording();
        });
    }

    // Check browser support for audio recording
    const audioSupported = navigator.mediaDevices && navigator.mediaDevices.getUserMedia;
    console.log('Audio recording supported:', audioSupported);

    if (!audioSupported && audioRecordBtn) {
        audioRecordBtn.style.display = 'none';
        console.log('Audio recording not supported, hiding audio button');
    }

    async function toggleAudioRecording() {
        console.log('Toggle audio recording called, isRecording:', isRecording);

        // Only start recording if not already recording
        if (!isRecording) {
            await startRecording();
        }
        // If already recording, do nothing - user should use stop button in popup
    }

    async function startRecording() {
        console.log('Starting custom audio recording...');

        try {
            // Get microphone access
            const stream = await navigator.mediaDevices.getUserMedia({
                audio: {
                    echoCancellation: true,
                    noiseSuppression: true,
                    sampleRate: 44100
                }
            });

            isRecording = true;
            audioChunks = [];
            recordingStartTime = Date.now();

            // Create MediaRecorder
            mediaRecorder = new MediaRecorder(stream, {
                mimeType: 'audio/webm;codecs=opus'
            });

            // Set up event handlers
            mediaRecorder.ondataavailable = (event) => {
                if (event.data.size > 0) {
                    audioChunks.push(event.data);
                }
            };

            mediaRecorder.onstop = async () => {
                console.log('Recording stopped, processing audio...');
                await processAudioRecording();
                // Stop all tracks
                stream.getTracks().forEach(track => track.stop());
            };

            // Start recording
            mediaRecorder.start(100); // Collect data every 100ms

            // Update UI and show recording popup
            updateRecordingUI(true);
            showRecordingPopup();

            // Start timer
            startRecordingTimer();

            // Set 30-second timeout for auto-stop
            recordingTimeout = setTimeout(async () => {
                console.log('30-second recording limit reached. Auto-stopping...');
                await stopRecording();
                showToast('Recording stopped automatically after 30 seconds.', 'info');
            }, 30000);

        } catch (error) {
            console.error('Error starting recording:', error);
            isRecording = false;
            updateRecordingUI(false);

            if (error.name === 'NotAllowedError') {
                showToast('Microphone access denied. Please allow microphone access and try again.', 'error');
            } else if (error.name === 'NotFoundError') {
                showToast('No microphone found. Please check your microphone.', 'error');
            } else {
                showToast('Error starting recording. Please try again.', 'error');
            }
        }
    }

    async function stopRecording() {
        console.log('Stopping recording...');

        if (mediaRecorder && isRecording) {
            mediaRecorder.stop();
        }

        isRecording = false;
        updateRecordingUI(false);
        hideRecordingPopup();
        stopRecordingTimer();

        // Clear the 30-second timeout if it exists
        if (recordingTimeout) {
            clearTimeout(recordingTimeout);
            recordingTimeout = null;
        }
    }

    async function processAudioRecording() {
        try {
            if (audioChunks.length === 0) {
                throw new Error('No audio data recorded');
            }

            // Create audio blob
            const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
            console.log('Audio blob created, size:', audioBlob.size);

            // Convert to base64 for Gemini API
            const base64Audio = await blobToBase64(audioBlob);

            // Show loading indicator for transcription
            showLoadingIndicator();
            
            // Send to Gemini API for speech-to-text
            const transcript = await transcribeAudioWithGemini(base64Audio);
            
            // Hide loading indicator
            hideLoadingIndicator();
            
            if (transcript && transcript.trim()) {
                console.log('Audio transcribed:', transcript);
                
                // Update search input
                const searchInput = document.querySelector('.search-bar input');
                if (searchInput) {
                    searchInput.value = transcript;
                    searchInput.focus();
                    
                    // Trigger translation (which will show its own loading indicator)
                    await debouncedTranslate(transcript);
                }
            } else {
                showToast('No speech detected in recording. Please try again.', 'warning');
            }

        } catch (error) {
            console.error('Error processing audio:', error);
            hideLoadingIndicator(); // Hide loading indicator on error
            showToast('Error processing audio. Please try again.', 'error');
        }
    }

    function updateRecordingUI(recording) {
        const audioBtn = document.getElementById('audio-record-btn');
        if (!audioBtn) return;

        const icon = audioBtn.querySelector('i');

        if (recording) {
            audioBtn.classList.add('recording');
            // Keep microphone icon but make it disabled
            icon.className = 'fas fa-microphone';
            audioBtn.title = 'Recording in progress...';
            audioBtn.style.opacity = '0.6';
            audioBtn.style.cursor = 'not-allowed';
            console.log('Recording UI updated - recording');
        } else {
            audioBtn.classList.remove('recording');
            icon.className = 'fas fa-microphone';
            audioBtn.title = 'Record audio';
            audioBtn.style.opacity = '1';
            audioBtn.style.cursor = 'pointer';
            console.log('Recording UI updated - stopped');
        }
    }

    function showRecordingPopup() {
        // Create recording popup
        const popup = document.createElement('div');
        popup.id = 'recording-popup';
        popup.innerHTML = `
            <div class="recording-popup-content">
                <div class="recording-animation">
                    <div class="recording-circle"></div>
                    <div class="recording-pulse"></div>
                </div>
                <div class="recording-text">Recording...</div>
                <div class="recording-timer" id="recording-timer">00:00</div>
                <div class="recording-instructions">Speak things you require (e.g., పసుపు చీర, ಹಳದಿ ಸೀರೆ, पीली साड़ी)</div>
                <button class="stop-recording-btn" id="stop-recording-btn">
                    <i class="fas fa-stop"></i>
                    Stop Recording
                </button>
                <div class="recording-limit-info">Recording will automatically stop after 30 seconds</div>
            </div>
        `;

        popup.style.cssText = `
            position: fixed;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%);
            background: rgba(0, 0, 0, 0.9);
            color: white;
            padding: 30px;
            border-radius: 15px;
            z-index: 10000;
            text-align: center;
            min-width: 300px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        `;

        // Add CSS for animation
        const style = document.createElement('style');
        style.textContent = `
            .recording-animation {
                position: relative;
                width: 80px;
                height: 80px;
                margin: 0 auto 20px;
            }
            .recording-circle {
                width: 60px;
                height: 60px;
                background: #ff4444;
                border-radius: 50%;
                position: absolute;
                top: 10px;
                left: 10px;
                animation: pulse 1.5s infinite;
            }
            .recording-pulse {
                width: 80px;
                height: 80px;
                border: 3px solid #ff4444;
                border-radius: 50%;
                position: absolute;
                top: 0;
                left: 0;
                animation: ripple 1.5s infinite;
            }
            @keyframes pulse {
                0% { transform: scale(1); opacity: 1; }
                50% { transform: scale(1.1); opacity: 0.7; }
                100% { transform: scale(1); opacity: 1; }
            }
            @keyframes ripple {
                0% { transform: scale(0.8); opacity: 1; }
                100% { transform: scale(1.2); opacity: 0; }
            }
            .recording-text {
                font-size: 18px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .recording-timer {
                font-size: 24px;
                font-weight: bold;
                color: #ff4444;
                margin-bottom: 10px;
            }
            .recording-instructions {
                font-size: 14px;
                opacity: 0.8;
                margin-bottom: 20px;
            }
            .stop-recording-btn {
                background: #ff4444;
                color: white;
                border: none;
                padding: 12px 24px;
                border-radius: 25px;
                font-size: 16px;
                font-weight: bold;
                cursor: pointer;
                display: flex;
                align-items: center;
                gap: 8px;
                margin: 0 auto;
                transition: all 0.3s ease;
                box-shadow: 0 4px 15px rgba(255, 68, 68, 0.3);
            }
            .stop-recording-btn:hover {
                background: #ff3333;
                transform: translateY(-2px);
                box-shadow: 0 6px 20px rgba(255, 68, 68, 0.4);
            }
            .stop-recording-btn:active {
                transform: translateY(0);
            }
            .stop-recording-btn i {
                font-size: 14px;
            }
            .recording-limit-info {
                font-size: 12px;
                color: #ccc;
                margin-top: 10px;
                text-align: center;
                opacity: 0.8;
            }
        `;

        document.head.appendChild(style);
        document.body.appendChild(popup);

        // Add event listener for stop button
        const stopBtn = document.getElementById('stop-recording-btn');
        if (stopBtn) {
            stopBtn.addEventListener('click', async () => {
                console.log('Stop button clicked');
                await stopRecording();
            });
        }
    }

    function hideRecordingPopup() {
        const popup = document.getElementById('recording-popup');
        if (popup) {
            popup.remove();
        }
    }

    function startRecordingTimer() {
        recordingTimer = setInterval(() => {
            if (recordingStartTime) {
                const elapsed = Math.floor((Date.now() - recordingStartTime) / 1000);
                const minutes = Math.floor(elapsed / 60);
                const seconds = elapsed % 60;
                const timeString = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;

                const timerElement = document.getElementById('recording-timer');
                if (timerElement) {
                    timerElement.textContent = timeString;
                }
            }
        }, 1000);
    }

    function stopRecordingTimer() {
        if (recordingTimer) {
            clearInterval(recordingTimer);
            recordingTimer = null;
        }
        recordingStartTime = null;
    }

    function showToast(message, type = 'info') {
        // Create a simple toast notification
        const toast = document.createElement('div');
        toast.className = `toast toast-${type}`;
        toast.textContent = message;

        const colors = {
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FF9800',
            error: '#F44336'
        };

        toast.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${colors[type] || colors.info};
            color: white;
            padding: 12px 20px;
            border-radius: 4px;
            z-index: 10001;
            font-size: 14px;
            max-width: 300px;
            box-shadow: 0 2px 10px rgba(0,0,0,0.2);
        `;

        document.body.appendChild(toast);

        // Remove toast after 4 seconds
        setTimeout(() => {
            if (toast.parentNode) {
                toast.parentNode.removeChild(toast);
            }
        }, 4000);
    }


    // Helper function to convert blob to base64
    function blobToBase64(blob) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => {
                const base64 = reader.result.split(',')[1]; // Remove data:audio/webm;base64, prefix
                resolve(base64);
            };
            reader.onerror = reject;
            reader.readAsDataURL(blob);
        });
    }

    // Function to transcribe audio using Gemini API
    async function transcribeAudioWithGemini(base64Audio) {
        try {
            console.log('Sending audio to Gemini API for transcription...');

            const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    contents: [{
                        parts: [{
                            text: `Please transcribe this audio to text. The audio contains speech in Indian languages (Hindi, Telugu, Tamil, Bengali, Gujarati, Punjabi) or English. Return only the transcribed text without any additional formatting or explanation.`
                        }, {
                            inline_data: {
                                mime_type: "audio/webm",
                                data: base64Audio
                            }
                        }]
                    }],
                    generationConfig: {
                        temperature: 0.1,
                        topK: 32,
                        topP: 1,
                        maxOutputTokens: 1024,
                    }
                })
            });

            if (!response.ok) {
                throw new Error(`Gemini API error: ${response.status} ${response.statusText}`);
            }

            const data = await response.json();
            console.log('Gemini API response:', data);

            if (data.candidates && data.candidates[0] && data.candidates[0].content) {
                const transcript = data.candidates[0].content.parts[0].text.trim();
                console.log('Transcribed text:', transcript);
                return transcript;
            } else {
                throw new Error('No transcription result from Gemini API');
            }

        } catch (error) {
            console.error('Error transcribing audio with Gemini:', error);
            throw new Error('Failed to transcribe audio. Please try again.');
        }
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

// Loading indicator functions
function showLoadingIndicator() {
    // Remove any existing loading indicator
    hideLoadingIndicator();
    
    // Create loading indicator
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'gemini-loading';
    loadingDiv.className = 'loading-text';
    loadingDiv.innerHTML = `
        <span>Translating with Gemini AI</span>
        <div class="loading-spinner"></div>
    `;
    
    // Insert after the search suggestions container
    const searchSuggestions = document.getElementById('search-suggestions');
    if (searchSuggestions && searchSuggestions.parentNode) {
        searchSuggestions.parentNode.insertBefore(loadingDiv, searchSuggestions.nextSibling);
    }
}

function hideLoadingIndicator() {
    const loadingDiv = document.getElementById('gemini-loading');
    if (loadingDiv) {
        loadingDiv.remove();
    }
}

// Debounced translation function (optimized for Gemini 2.0 Flash speed)
const debouncedTranslate = debounce(async (query) => {
    if (query.trim().length > 2) {
        // Show loading indicator
        showLoadingIndicator();
        
        try {
            const result = await translateWithGemini(query);
            console.log('Translation result:', result); // Debug log

            // Hide loading indicator
            hideLoadingIndicator();

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
        } catch (error) {
            // Hide loading indicator on error
            hideLoadingIndicator();
            console.error('Translation error:', error);
            // Fallback: show original query as both original and translated
            hideSearchSuggestions();
            updateFallbackUrls(query, query);
        }
    } else {
        hideLoadingIndicator();
        hideSearchSuggestions();
        updateFallbackUrls(query, query);
    }
}, 500); // Reduced from 1000ms to 500ms for faster response with Gemini 2.0 Flash


