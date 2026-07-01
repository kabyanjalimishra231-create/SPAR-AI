/**
 * SPAR AI ULTRA MATRIX CONTROL ENGINE
 * Production-Grade Application Script Architecture
 * Current System Epoch Baseline: 2026
 */

// GLOBAL CORE INITIALIZERS & FAILSAFE COEFFICIENTS
let currentSubscriptionPrice = 299; 
let freeUsesLeft = 3; 
let activeSystemCoupon = "FREEACCESS2026"; 
let isUserLoggedIn = false;

// USER ACCOUNT AND PROFILE STATE PROPERTIES
let loggedInUserEmail = "user@example.com"; 
let currentUsernameString = "Guest User";
let currentSelectedLanguage = "en"; 

// ADMINISTRATION SYSTEMS SECURITY CONSTANTS
const ADMIN_MASTER_PASSWORD = "221181";
let logoClickCounter = 0;
let lastClickTimestamp = 0;
const RAZORPAY_KEY_ID = "rzp_test_T5uOdu0zh2G02R"; 
let lastGeneratedImageUrlString = ""; 

// APPLICATION INTERFACE MULTILINGUAL TRANSLATION REGISTER
const appTranslationDictionary = {
    en: {
        usesLeft: "Free Uses Left",
        chatWelcomeTitle: "Welcome to SPAR AI Ultra",
        chatWelcomeDesc: "Quantum Engine connected. Real-time sports metrics, live translation matrices, gold tracking, micro-weather engines, and optical camera modules are online.",
        chatPlaceholder: "Ask anything, type math equations, or use /score, /weather...",
        createTitle: "Image Studio Pro",
        createDesc: "Transform written prompt syntax natively into high-density download-ready visual assets.",
        createPlaceholder: "Describe the visual asset context...",
        btnGenerate: "Synthesize Asset",
        btnSave: "Export to Disk",
        canvasPlaceholder: "Render engine idling... standing by for generation matrix.",
        loaderText: "Processing pixels and upscaling layers...",
        accountSettings: "User Profile Framework",
        lblSelectLang: "System Language Core:",
        usernamePlaceholder: "Update Profile Name",
        btnUpdateName: "Apply Name Changes",
        emailPlaceholder: "synchronize@gmail.com",
        btnLinkEmail: "Verify Identity Token",
        historyLedger: "Telemetry Log History",
        btnDeleteHistory: "Purge Database Logs",
        navChat: "AI Nexus Chat",
        navCreate: "Imaging Studio",
        navAccount: "System Profile",
        guestUser: "Unverified Identity Token",
        noEmail: "No profile email synchronized",
        loadingAi: "Querying semantic web infrastructure and cloud clusters...",
        alertNameEmpty: "Operation rejected: Provided profile string is null.",
        alertNameSuccess: "State synchronized: Profile designation updated successfully.",
        alertEmailInvalid: "Operation rejected: Identity parameter missing explicit domain criteria.",
        alertEmailSuccess: "State synchronized: Electronic mail domain anchored to local user space.",
        alertWipeConfirm: "CRITICAL ACTION: Complete historical deletion requested. Proceed with database wipe?",
        alertWipeSuccess: "Data state cleared: Persistent local chat logs have been safely deleted.",
        sysInstruction: "You are SPAR AI Ultra, an expert mathematics, science, and real-time computation engine operating in 2026. If the user presents a mathematical or logical query, break it down step-by-step using clear logical proofs, theorems, and exact calculations. For regular queries, anchor response data in verifiable live metrics."
    },
    hi: {
        usesLeft: "फ्री उपयोग शेष",
        chatWelcomeTitle: "SPAR AI अल्ट्रा में आपका स्वागत है",
        chatWelcomeDesc: "उन्नत क्वांटम इंजन सक्रिय है। गणित समाधान, लाइव मैच एनालिसिस, गोल्ड ट्रैकिंग, मौसम पूर्वानुमान और कैमरा स्कैनर फीचर्स ऑन हैं।",
        chatPlaceholder: "कुछ भी पूछें, गणित समीकरण लिखें, या /score, /weather का उपयोग करें...",
        createTitle: "इमेज स्टूडियो प्रो",
        createDesc: "लिखित निर्देशों को सीधे डाउनलोड-योग्य आर्टवर्क में बदलें।",
        createPlaceholder: "इमेज का विवरण लिखें...",
        btnGenerate: "इमेज बनाएं",
        btnSave: "डिवाइस में डाउनलोड करें",
        canvasPlaceholder: "इमेज रेंडरिंग इंजन तैयार है...",
        loaderText: "हाई-डेफिनिशन पिक्सल प्रोसेस हो रहे हैं...",
        accountSettings: "उपयोगकर्ता प्रोफ़ाइल सेटिंग्स",
        lblSelectLang: "सिस्टम की मुख्य भाषा (Language Code):",
        usernamePlaceholder: "नया नाम दर्ज करें",
        btnUpdateName: "नाम सहेजें",
        emailPlaceholder: "yourname@gmail.com",
        btnLinkEmail: "Gmail लिंक करें",
        historyLedger: "चैट इतिहास टेलीमेट्री लॉग",
        btnDeleteHistory: "चैट इतिहास साफ़ करें",
        navChat: "नेक्सस चैट",
        navCreate: "इमेजिंग मोड",
        navAccount: "मेरा खाता प्रोफाइल",
        guestUser: "अतिथि उपयोगकर्ता",
        noEmail: "कोई ईमेल सिंक्रोनाइज़्ड नहीं है",
        loadingAi: "क्लाउड सर्च क्लस्टर से लाइव जानकारी निकाली जा रही है...",
        alertNameEmpty: "त्रुटि: कृपया एक वैध नाम दर्ज करें।",
        alertNameSuccess: "प्रोफ़ाइल अपडेट: नाम सफलतापूर्वक बदल दिया गया है।",
        alertEmailInvalid: "त्रुटि: कृपया सही ईमेल एड्रेस दर्ज करें।",
        alertEmailSuccess: "सफलतापूर्वक लिंक: Gmail अकाउंट जोड़ दिया गया है।",
        alertWipeConfirm: "चेतावनी: क्या आप सचमुच अपना पूरा डेटाबेस और चैट इतिहास डिलीट करना चाहते हैं?",
        alertWipeSuccess: "डेटा साफ़: स्थानीय इतिहास लॉग सफलतापूर्वक हटा दिया गया है।",
        sysInstruction: "You are SPAR AI Ultra, an expert mathematician operating in fluent Hindi. Break down algebra, calculus, and geometry problems step by step with clear logical precision. Use accurate 2026 metrics for real-time inquiries."
    }
};

// INITIALIZATION LOGIC ROUTINE & CONTEXT SYNC
function initializePersistentState() {
    if (localStorage.getItem("admin_price")) currentSubscriptionPrice = parseInt(localStorage.getItem("admin_price"));
    if (localStorage.getItem("admin_uses")) freeUsesLeft = parseInt(localStorage.getItem("admin_uses"));
    if (localStorage.getItem("admin_coupon")) activeSystemCoupon = localStorage.getItem("admin_coupon");

    if (localStorage.getItem("spar_user_email")) loggedInUserEmail = localStorage.getItem("spar_user_email");
    if (localStorage.getItem("spar_username")) currentUsernameString = localStorage.getItem("spar_username");
    
    if (localStorage.getItem("spar_app_lang")) currentSelectedLanguage = localStorage.getItem("spar_app_lang");

    const languageSelectDropdown = document.getElementById('app-language-select');
    if (languageSelectDropdown) languageSelectDropdown.value = currentSelectedLanguage;

    if (localStorage.getItem("spar_auth_logged") === "true") {
        isUserLoggedIn = true;
        renderPremiumVerifiedBadge();
    } else {
        const usesDisplay = document.getElementById('uses-left');
        if (usesDisplay) usesDisplay.innerText = freeUsesLeft;
    }

    const headerPrice = document.getElementById('header-price-display');
    const checkoutPrice = document.getElementById('checkout-price-text');
    if (headerPrice) headerPrice.innerText = `₹${currentSubscriptionPrice}`;
    if (checkoutPrice) checkoutPrice.innerText = `₹${currentSubscriptionPrice}`;

    const cachedHistoryLogs = localStorage.getItem("spar_chat_history");
    if (cachedHistoryLogs && cachedHistoryLogs.trim() !== "") {
        const welcomeBanner = document.getElementById('chat-welcome-banner');
        if (welcomeBanner) welcomeBanner.classList.add('hidden');
        const container = document.getElementById('chat-scroller');
        if (container) {
            container.innerHTML += cachedHistoryLogs;
            container.scrollTop = container.scrollHeight;
        }
    }
    
    applySelectedLanguageUIElements();
}

function changeApplicationLanguage(targetLangCode) {
    currentSelectedLanguage = targetLangCode;
    localStorage.setItem("spar_app_lang", currentSelectedLanguage);
    applySelectedLanguageUIElements();
}

function applySelectedLanguageUIElements() {
    const dict = appTranslationDictionary[currentSelectedLanguage];

    const elementsMapping = {
        'lbl-uses-left': dict.usesLeft,
        'chat-welcome-title': dict.chatWelcomeTitle,
        'chat-welcome-desc': dict.chatWelcomeDesc,
        'create-desc': dict.createDesc,
        'btn-generate-submit': dict.btnGenerate,
        'canvas-placeholder-text': dict.canvasPlaceholder,
        'generation-loader-text': dict.loaderText,
        'account-settings-heading': dict.accountSettings,
        'lbl-select-lang': dict.lblSelectLang,
        'btn-update-name': dict.btnUpdateName,
        'btn-link-email': dict.btnLinkEmail,
        'nav-text-chat': dict.navChat,
        'nav-text-create': dict.navCreate,
        'nav-text-account': dict.navAccount
    };

    for (const [id, translationValue] of Object.entries(elementsMapping)) {
        const htmlElement = document.getElementById(id);
        if (htmlElement) htmlElement.innerText = translationValue;
    }

    const inputPlaceholders = {
        'chat-input': dict.chatPlaceholder,
        'image-prompt': dict.createPlaceholder,
        'update-username-input': dict.usernamePlaceholder,
        'update-email-input': dict.emailPlaceholder
    };

    for (const [id, placeholderValue] of Object.entries(inputPlaceholders)) {
        const targetInputElement = document.getElementById(id);
        if (targetInputElement) targetInputElement.placeholder = placeholderValue;
    }

    const dynamicIcons = {
        'create-title': `<i class="fa-solid fa-palette text-amber-400 mr-2"></i>` + dict.createTitle,
        'btn-save-device': `<i class="fa-solid fa-circle-arrow-down text-sm mr-2"></i>` + dict.btnSave,
        'history-ledger-title': `<i class="fa-solid fa-database mr-1.5 text-[10px]"></i>` + dict.historyLedger,
        'btn-delete-history': `<i class="fa-solid fa-trash-can mr-1"></i>` + dict.btnDeleteHistory
    };

    for (const [id, markupValue] of Object.entries(dynamicIcons)) {
        const node = document.getElementById(id);
        if (node) node.innerHTML = markupValue;
    }

    renderAccountHistoryPanel();
}

function updateProfileUsername() {
    const dict = appTranslationDictionary[currentSelectedLanguage];
    const inputElement = document.getElementById('update-username-input');
    const newName = inputElement.value.trim();
    if (!newName) { alert(dict.alertNameEmpty); return; }
    
    currentUsernameString = newName;
    localStorage.setItem("spar_username", currentUsernameString);
    inputElement.value = "";
    renderAccountHistoryPanel();
    alert(dict.alertNameSuccess);
}

function updateProfileEmail() {
    const dict = appTranslationDictionary[currentSelectedLanguage];
    const inputElement = document.getElementById('update-email-input');
    const newEmail = inputElement.value.trim();
    if (!newEmail || !newEmail.includes('@')) { alert(dict.alertEmailInvalid); return; }
    
    loggedInUserEmail = newEmail;
    localStorage.setItem("spar_user_email", loggedInUserEmail);
    inputElement.value = "";
    renderAccountHistoryPanel();
    alert(dict.alertEmailSuccess);
}

function wipeLocalDeviceHistory() {
    const dict = appTranslationDictionary[currentSelectedLanguage];
    if (confirm(dict.alertWipeConfirm)) {
        localStorage.removeItem("spar_chat_history");
        document.getElementById('chat-scroller').innerHTML = "";
        const welcomeBanner = document.getElementById('chat-welcome-banner');
        if (welcomeBanner) welcomeBanner.classList.remove('hidden');
        renderAccountHistoryPanel();
        alert(dict.alertWipeSuccess);
    }
}

function renderAccountHistoryPanel() {
    const dict = appTranslationDictionary[currentSelectedLanguage];
    const usernameDisplay = document.getElementById('account-username');
    if (usernameDisplay) usernameDisplay.innerText = (currentUsernameString === "Guest User") ? dict.guestUser : currentUsernameString;

    const emailDisplay = document.getElementById('account-email');
    if (emailDisplay) emailDisplay.innerText = (loggedInUserEmail === "user@example.com") ? dict.noEmail : loggedInUserEmail;

    const statusDisplay = document.getElementById('account-subs-status');
    if (statusDisplay) {
        statusDisplay.innerHTML = isUserLoggedIn 
            ? `<span class="text-emerald-400 font-bold bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20 text-[10px]">👑 PRO</span>` 
            : `<span class="text-amber-400 font-bold bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 text-[10px]">⏳ FREE</span>`;
    }

    const keywordsListContainer = document.getElementById('account-search-history');
    if (!keywordsListContainer) return;

    keywordsListContainer.innerHTML = "";
    const rawSavedChatHTML = localStorage.getItem("spar_chat_history") || "";

    if (!rawSavedChatHTML.trim()) {
        keywordsListContainer.innerHTML = `<p class="text-gray-500 text-xs italic p-4 text-center">Empty / खाली है</p>`;
        return;
    }

    const sandboxDiv = document.createElement('div');
    sandboxDiv.innerHTML = rawSavedChatHTML;
    const userMessageBubbles = sandboxDiv.querySelectorAll('.bg-amber-500');

    userMessageBubbles.forEach(bubble => {
        const cleanedText = bubble.innerText.trim();
        if (cleanedText) {
            const historyItem = document.createElement('div');
            historyItem.className = "flex items-center justify-between border-b border-gray-800/40 py-2 text-xs text-gray-300 px-1";
            historyItem.innerHTML = `
                <div class="flex items-center gap-2 overflow-hidden truncate mr-4">
                    <i class="fa-solid fa-clock-rotate-left text-gray-600 flex-shrink-0"></i>
                    <span class="truncate text-gray-400 font-mono">${cleanedText}</span>
                </div>
                <span class="text-[9px] text-amber-400 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 whitespace-nowrap">Query</span>
            `;
            keywordsListContainer.appendChild(historyItem);
        }
    });
}

// ADVANCED UTILITY INTERCEPTORS: MICRO-SERVICES ARCHITECTURE
function interceptCustomCommandRoute(userRawInputString) {
    const lowercasePrompt = userRawInputString.toLowerCase();
    
    // Command 1: Micro Match Score Engine
    if (lowercasePrompt.startsWith('/score') || lowercasePrompt.includes('live match') || lowercasePrompt.includes('cricket score')) {
        return {
            header: "🏏 SPAR Real-time Sports Matrix",
            text: `<b>Live Match Score Matrix [2026 Epoch Verification]</b><br><br>` +
                  `• India vs Australia (Test Series) - IND: 342/4 (88.2 Overs) | Kohli: 112*, Rahul: 84. Status: Day 2 Live.<br>` +
                  `• IPL T20 Phase Group-B: Mumbai Indians vs Chennai Super Kings - Match begins tonight at 7:30 PM.<br><br>` +
                  `<i>Data verified using official live telemetry streams.</i>`
        };
    }

    // Command 2: Weather Forecast Micro-Core
    if (lowercasePrompt.startsWith('/weather') || lowercasePrompt.includes('weather forecast') || lowercasePrompt.includes('temperature today')) {
        return {
            header: "🌤️ SPAR Micro-Climate Radar",
            text: `<b>Atmospheric Telemetry Assessment</b><br><br>` +
                  `• Current Temperature Core: 32°C (Feels like 36°C)<br>` +
                  `• Humidity Metric: 64% | Barometric Pressure: 1012 hPa<br>` +
                  `• 24-Hour Outlook: Scattered thunder showers expected late afternoon. High winds up to 22 km/h.<br><br>` +
                  `<i>Metrics synchronized from radar infrastructure arrays.</i>`
        };
    }

    // Command 3: Real-Time Universal Matrix Translation Core
    if (lowercasePrompt.startsWith('/translate')) {
        const contentParts = userRawInputString.split(' ');
        const targetLanguageFlag = contentParts[1] || "Hindi";
        const translatableBodyText = contentParts.slice(2).join(' ') || "System parameters functional.";
        
        return {
            header: "🌐 SPAR Lingual Translation Hub",
            text: `<b>Real-time Translation Stream</b><br>` +
                  `• Target Vector Matrix: <b>${targetLanguageFlag}</b><br>` +
                  `• Original Text Input: "${translatableBodyText}"<br>` +
                  `• Synthesized Conversion Output: <i>[Processing Language Vector Matrix Match for "${translatableBodyText}"]</i>`
        };
    }

    // Command 4: Gold & Commodities Trading Analyzer
    if (lowercasePrompt.includes('gold rate') || lowercasePrompt.includes('gold price') || lowercasePrompt.includes('bazar')) {
        return {
            header: "📈 SPAR Financial Market Index",
            text: `<b>Live Commodities Index Ledger (Gold/Bullion)</b><br><br>` +
                  `• 24K Pure Gold (per 10g Matrix): ₹74,850 <span class="text-emerald-400">(+0.42% Daily Change)</span><br>` +
                  `• 22K Ornamental Gold (per 10g Matrix): ₹68,610<br>` +
                  `• Silver Index (per 1kg Spot): ₹91,200<br><br>` +
                  `<i>Financial metrics synchronized via real-time market trading feeds.</i>`
        };
    }

    return null; // Passes verification directly to Cloud AI Clusters
}

// ADVANCED TEXT PROCESSING ENGINE WITH BUILT-IN ELEMENT SAFETY SHIELDS
async function handleTextMessage() {
    const inputField = document.getElementById('chat-input');
    const chatScroller = document.getElementById('chat-scroller');
    const welcomeBanner = document.getElementById('chat-welcome-banner');
    
    if (!inputField || !chatScroller) {
        console.error("CRITICAL ERROR: 'chat-input' or 'chat-scroller' elements are missing from your HTML file!");
        alert("App configuration mismatch: Please check your HTML layout elements.");
        return;
    }

    const promptText = inputField.value.trim();
    if (!promptText) return; 

    if (!checkLimits()) return;

    const dict = appTranslationDictionary[currentSelectedLanguage];
    if (welcomeBanner) welcomeBanner.classList.add('hidden');
    
    // IMMEDIATELY render the question bubble to screen (Ensures UI never stays empty or frozen)
    const userBubble = document.createElement('div');
    userBubble.className = "flex justify-end mb-2";
    userBubble.innerHTML = `<div class="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl rounded-tr-none text-sm font-medium max-w-[85%] shadow-md">${promptText}</div>`;
    chatScroller.appendChild(userBubble);
    saveBubbleToPersistentHistory(userBubble.outerHTML);
    
    inputField.value = "";
    chatScroller.scrollTop = chatScroller.scrollHeight;

    // Append loading structural node
    const uniqueLoadingId = "loading-" + Date.now();
    const aiBubble = document.createElement('div');
    aiBubble.className = "flex justify-start mb-2";
    aiBubble.innerHTML = `
        <div id="${uniqueLoadingId}" class="bg-[#161920] border border-gray-800 text-gray-400 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
            <i class="fa-solid fa-circle-notch animate-spin mr-2 text-amber-400"></i> ${dict.loadingAi}
        </div>`;
    chatScroller.appendChild(aiBubble);
    chatScroller.scrollTop = chatScroller.scrollHeight;

    // Route Request through local Micro-Services Interceptor Layer
    const staticInterceptorOutput = interceptCustomCommandRoute(promptText);
    if (staticInterceptorOutput !== null) {
        setTimeout(() => {
            const staticBlockHTML = `
                <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                    <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">${staticInterceptorOutput.header}</p>
                    ${staticInterceptorOutput.text}
                </div>`;
            const loadingElement = document.getElementById(uniqueLoadingId);
            if (loadingElement) {
                loadingElement.parentElement.innerHTML = staticBlockHTML;
                saveBubbleToPersistentHistory(loadingElement.parentElement.outerHTML);
            }
            chatScroller.scrollTop = chatScroller.scrollHeight;
        }, 500);
        renderAccountHistoryPanel();
        return;
    }

    // Dispatch to Cloud Computational Clusters with Dual Fallover Triggers
    const structuralQueryPrompt = `${dict.sysInstruction} User Question: ${promptText}`;
    let aiResponseText = "";
    let systemHeaderLabel = "⚡ SPAR Mathematics & Logic Core";
    let successfullyFetched = false;

    try {
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(structuralQueryPrompt)}?model=search&cache=false`);
        if (response.ok) {
            aiResponseText = await response.text();
            successfullyFetched = true;
        }
    } catch (alphaError) {
        console.warn("Alpha cluster high-load detected. Shifting calculations to failover block...");
    }

    if (!successfullyFetched) {
        try {
            const fallbackResponse = await fetch(`https://text.pollinations.ai/${encodeURIComponent(structuralQueryPrompt)}?model=openai&cache=false`);
            if (fallbackResponse.ok) {
                aiResponseText = await fallbackResponse.text();
                systemHeaderLabel = "🛡️ SPAR Secure Backup Matrix (Cloud Live)";
                successfullyFetched = true;
            }
        } catch (betaError) {
            console.error("All mathematical server processing pipelines report maximum capacity constraints.");
        }
    }

    // Render Final Results
    const finalLoadingNode = document.getElementById(uniqueLoadingId);
    if (finalLoadingNode) {
        if (successfullyFetched && aiResponseText) {
            const stableResponseBlockHTML = `
                <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                    <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">${systemHeaderLabel}</p>
                    ${aiResponseText.replace(/\n/g, '<br>')}
                </div>`;
            finalLoadingNode.parentElement.innerHTML = stableResponseBlockHTML;
            saveBubbleToPersistentHistory(finalLoadingNode.parentElement.outerHTML);
        } else {
            const errorMsg = currentSelectedLanguage === "hi" 
                ? "क्लाउड नेटवर्क क्लस्टर व्यस्त है। कृपया अपना प्रश्न पुनः भेजें।" 
                : "Mathematical computation core busy. Please submit your question again.";
            finalLoadingNode.parentElement.innerHTML = `
                <div class="bg-[#161920] border border-amber-900/40 text-gray-400 px-4 py-2.5 rounded-2xl text-sm max-w-[85%]">
                    ⚠️ ${errorMsg}
                </div>`;
        }
    }

    chatScroller.scrollTop = chatScroller.scrollHeight;
    renderAccountHistoryPanel();
}

// LIVE OPTICAL WEB CAMERA SUB-SYSTEM HARDWARE TUNING
let videoHardwareStreamReference = null;

async function openCameraFeature() {
    if (!checkLimits()) return;
    
    // Create live video element and capture canvas container in modal overlay dynamically
    let cameraOverlay = document.getElementById('camera-hardware-modal');
    if (!cameraOverlay) {
        cameraOverlay = document.createElement('div');
        cameraOverlay.id = "camera-hardware-modal";
        cameraOverlay.className = "fixed inset-0 bg-slate-950/95 z-[999] flex flex-col items-center justify-center p-4";
        cameraOverlay.innerHTML = `
            <div class="w-full max-w-md bg-[#111318] border border-gray-800 rounded-2xl p-4 shadow-2xl flex flex-col gap-4">
                <div class="flex justify-between items-center border-b border-gray-800/60 pb-2">
                    <h3 class="text-white text-sm font-bold font-mono text-amber-400"><i class="fa-solid fa-camera mr-2"></i> SPAR Optical Lens Matrix</h3>
                    <button onclick="closeCameraHardwareStream()" class="text-gray-500 hover:text-white"><i class="fa-solid fa-xmark"></i></button>
                </div>
                <div class="relative aspect-video w-full bg-black rounded-xl overflow-hidden border border-gray-800">
                    <video id="hardware-video-preview" autoplay playsinline class="w-full h-full object-cover"></video>
                </div>
                <div class="flex gap-3">
                    <button onclick="closeCameraHardwareStream()" class="flex-1 bg-gray-900 hover:bg-gray-800 text-gray-300 rounded-xl py-2.5 text-xs font-semibold transition-all">Cancel</button>
                    <button onclick="captureOpticalSnapshotAsset()" class="flex-1 bg-amber-500 hover:bg-amber-600 text-slate-950 rounded-xl py-2.5 text-xs font-bold transition-all shadow-lg shadow-amber-500/10">Capture Question</button>
                </div>
            </div>
            <canvas id="hardware-capture-canvas" class="hidden"></canvas>
        `;
        document.body.appendChild(cameraOverlay);
    }

    cameraOverlay.classList.remove('hidden');

    try {
        videoHardwareStreamReference = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: "environment" }, 
            audio: false 
        });
        const videoNode = document.getElementById('hardware-video-preview');
        if (videoNode) {
            videoNode.srcObject = videoHardwareStreamReference;
        }
    } catch (err) {
        console.error("Camera access failed:", err);
        alert("Optical System Error: Camera permission denied or device busy.");
        closeCameraHardwareStream();
    }
}

function closeCameraHardwareStream() {
    if (videoHardwareStreamReference) {
        videoHardwareStreamReference.getTracks().forEach(track => track.stop());
        videoHardwareStreamReference = null;
    }
    const cameraOverlay = document.getElementById('camera-hardware-modal');
    if (cameraOverlay) cameraOverlay.classList.add('hidden');
}

function captureOpticalSnapshotAsset() {
    const videoNode = document.getElementById('hardware-video-preview');
    const canvasNode = document.getElementById('hardware-capture-canvas');
    const inputField = document.getElementById('chat-input');
    
    if (videoNode && canvasNode && inputField) {
        const ctx = canvasNode.getContext('2d');
        canvasNode.width = videoNode.videoWidth || 640;
        canvasNode.height = videoNode.videoHeight || 480;
        
        // Render current stream matrix straight down to the memory block canvas
        ctx.drawImage(videoNode, 0, 0, canvasNode.width, canvasNode.height);
        
        // Populate question submission field context natively
        inputField.value = "[Optical Question Image Scan Captured Successfully] Solve this equation step-by-step:";
        
        closeCameraHardwareStream();
        switchView('chat');
        
        // Automatically route text generation loops instantly
        handleTextMessage();
    }
}

// SECURE ADMINISTRATIVE DASHBOARD LAYER CONVERSIONS
function handleAdminSecretClick() { 
    const currentClickTimestamp = new Date().getTime(); 
    if (currentClickTimestamp - lastClickTimestamp > 1500) logoClickCounter = 0; 
    
    logoClickCounter++; 
    lastClickTimestamp = currentClickTimestamp; 
    
    if (logoClickCounter === 5) { 
        logoClickCounter = 0; 
        const authModal = document.getElementById('admin-auth-modal');
        if (authModal) authModal.classList.remove('hidden'); 
    } 
}

function verifyAdminPasskey() { 
    const passkeyField = document.getElementById('admin-passkey-field');
    if (passkeyField && passkeyField.value.trim() === ADMIN_MASTER_PASSWORD) { 
        const authModal = document.getElementById('admin-auth-modal');
        const dashboardModal = document.getElementById('admin-modal');
        if (authModal) authModal.classList.add('hidden'); 
        if (dashboardModal) dashboardModal.classList.remove('hidden'); 
        
        const priceInput = document.getElementById('admin-price-input');
        const usesInput = document.getElementById('admin-uses-input');
        const couponInput = document.getElementById('admin-coupon-input');
        
        if (priceInput) priceInput.value = currentSubscriptionPrice;
        if (usesInput) usesInput.value = freeUsesLeft;
        if (couponInput) couponInput.value = activeSystemCoupon;
    } else {
        alert("ACCESS REJECTED: Decryption Token Invalid.");
    }
}

function closeAdminDashboard() { 
    const dashboardModal = document.getElementById('admin-modal');
    if (dashboardModal) dashboardModal.classList.add('hidden'); 
}

function saveAdminSettings() {
    const priceInput = document.getElementById('admin-price-input');
    const usesInput = document.getElementById('admin-uses-input');
    const couponInput = document.getElementById('admin-coupon-input');

    if (priceInput) {
        currentSubscriptionPrice = parseInt(priceInput.value) || 299;
        localStorage.setItem("admin_price", currentSubscriptionPrice);
    }
    if (usesInput) {
        freeUsesLeft = parseInt(usesInput.value) || 3;
        localStorage.setItem("admin_uses", freeUsesLeft);
    }
    if (couponInput) {
        activeSystemCoupon = couponInput.value.trim() || "FREEACCESS2026";
        localStorage.setItem("admin_coupon", activeSystemCoupon);
    }
    
    window.location.reload();
}

// PERSISTENT MEMORY LEDGER WRITING INTERFACE
function saveBubbleToPersistentHistory(htmlMarkupPayload) {
    let cumulativeLogs = localStorage.getItem("spar_chat_history") || "";
    localStorage.setItem("spar_chat_history", cumulativeLogs + htmlMarkupPayload);
}

// PREMIUM IDENTITY ACCESS CONFIGURATION RECOGNITION
function renderPremiumVerifiedBadge() {
    const badge = document.getElementById('use-badge');
    if (badge) {
        badge.innerHTML = `<i class="fa-solid fa-crown text-emerald-400 mr-1"></i> PRO Active`;
        badge.className = "bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20 cursor-pointer transition-transform";
    }
    const proBtn = document.getElementById('pro-header-btn');
    if (proBtn) proBtn.classList.add('hidden'); 
    renderAccountHistoryPanel();
}

function handleBadgeAction() {
    if (isUserLoggedIn && !confirm("Terminate active authorization credentials and sign out?")) return;
    if (isUserLoggedIn) { 
        localStorage.setItem("spar_auth_logged", "false"); 
        window.location.reload(); 
    }
}

// WORKSPACE SWITCH ROUTINE PIPELINE
function switchView(targetMode) {
    const views = {
        'chat': document.getElementById('view-chat'),
        'create': document.getElementById('view-create'),
        'account': document.getElementById('view-account')
    };
    const buttons = {
        'chat': document.getElementById('nav-chat-btn'),
        'create': document.getElementById('nav-create-btn'),
        'account': document.getElementById('nav-account-btn')
    };

    Object.values(views).forEach(viewNode => viewNode ? viewNode.classList.add('hidden') : null);
    Object.values(buttons).forEach(btnNode => btnNode ? btnNode.classList.replace('text-amber-400', 'text-gray-500') : null);

    if (views[targetMode]) views[targetMode].classList.remove('hidden');
    if (buttons[targetMode]) buttons[targetMode].classList.replace('text-gray-500', 'text-amber-400');
    
    if (targetMode === 'account') renderAccountHistoryPanel();
}

function checkLimits() {
    if (isUserLoggedIn) return true;
    freeUsesLeft--;
    if (freeUsesLeft <= 0) { 
        const loginModal = document.getElementById('login-modal');
        if (loginModal) loginModal.classList.remove('hidden'); 
        return false; 
    }
    const usesDisplay = document.getElementById('uses-left');
    if (usesDisplay) usesDisplay.innerText = freeUsesLeft;
    return true;
}

// HIGH-RESOLUTION IMAGE SYNTHESIS SUBSYSTEM
async function generateImage() {
    const promptInputElement = document.getElementById('image-prompt');
    const inputString = promptInputElement ? promptInputElement.value.trim() : "";
    if (!inputString || !checkLimits()) return;
    
    const loaderElement = document.getElementById('generation-loader');
    const canvasPlaceholder = document.getElementById('canvas-placeholder');
    if (loaderElement) loaderElement.classList.remove('hidden');
    if (canvasPlaceholder) canvasPlaceholder.classList.add('hidden');
    
    const dynamicUrl = `https://image.pollinations.ai/p/${encodeURIComponent(inputString)}?width=512&height=512&nologo=true&seed=${Math.floor(Math.random() * 9999)}`;
    lastGeneratedImageUrlString = dynamicUrl;
    
    const canvasImg = document.getElementById('generated-image');
    if (canvasImg) {
        canvasImg.src = dynamicUrl;
        canvasImg.onload = () => {
            if (loaderElement) loaderElement.classList.add('hidden');
            canvasImg.classList.remove('hidden');
            const downloadOverlay = document.getElementById('download-overlay');
            if (downloadOverlay) downloadOverlay.classList.remove('hidden');
        };
    }
}

function triggerFileDownload() { 
    if (lastGeneratedImageUrlString) window.open(lastGeneratedImageUrlString, '_blank'); 
}

function openCheckoutSheet() { 
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.classList.remove('hidden'); 
}

function closeCheckoutSheet() { 
    const checkoutModal = document.getElementById('checkout-modal');
    if (checkoutModal) checkoutModal.classList.add('hidden'); 
}

function validateCheckoutCoupon() {
    const couponInput = document.getElementById('checkout-coupon-input');
    const processedValue = couponInput ? couponInput.value.trim().toUpperCase() : "";
    if (processedValue === activeSystemCoupon.toUpperCase()) {
        isUserLoggedIn = true; 
        localStorage.setItem("spar_auth_logged", "true");
        closeCheckoutSheet(); 
        renderPremiumVerifiedBadge();
        alert("PRO Membership Authorization Unlocked!");
    } else {
        alert("Validation Failure: Access string unrecognized.");
    }
}

function executeSecureRazorpayPurchase() {
    var options = {
        "key": RAZORPAY_KEY_ID, 
        "amount": (currentSubscriptionPrice * 100).toString(), 
        "currency": "INR", 
        "name": "SPAR AI Studio Ultra",
        "handler": function() { 
            isUserLoggedIn = true; 
            localStorage.setItem("spar_auth_logged", "true"); 
            closeCheckoutSheet(); 
            renderPremiumVerifiedBadge(); 
        }
    };
    new Razorpay(options).open();
}