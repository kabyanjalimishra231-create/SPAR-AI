// STABLE FALLBACK CONSTANTS & GLOBAL INITIALIZERS
let currentSubscriptionPrice = 299; 
let freeUsesLeft = 3; 
let activeSystemCoupon = "FREEACCESS2026"; 
let isUserLoggedIn = false;

// PROFILE SYSTEM STATE PROPERTIES
let loggedInUserEmail = "user@example.com"; 
let currentUsernameString = "Guest User";
let currentSelectedLanguage = "en"; 

const ADMIN_MASTER_PASSWORD = "221181";
let logoClickCounter = 0;
let lastClickTimestamp = 0;
const RAZORPAY_KEY_ID = "rzp_test_T5uOdu0zh2G02R"; 
let lastGeneratedImageUrlString = ""; 

// MULTILINGUAL APPLICATION INTERFACE TRANSLATION MATRIX REGISTER
const appTranslationDictionary = {
    en: {
        usesLeft: "Free Uses Left",
        chatWelcomeTitle: "Welcome to SPAR AI Studio",
        chatWelcomeDesc: "Ask questions in English or हिंदी! Your advanced search-connected engine is active.",
        chatPlaceholder: "Ask anything (e.g., Live match metrics, today's gold rate, recent news)...",
        createTitle: "Image Studio",
        createDesc: "Transform written specifications directly into download-ready artwork.",
        createPlaceholder: "Describe the image context...",
        btnGenerate: "Generate",
        btnSave: "Save to Device",
        canvasPlaceholder: "Render high definition assets instantly",
        loaderText: "Processing pixels...",
        accountSettings: "Account Settings",
        lblSelectLang: "App Language / ऐप की भाषा:",
        usernamePlaceholder: "New Username",
        btnUpdateName: "Update Name",
        emailPlaceholder: "yourname@gmail.com",
        btnLinkEmail: "Link Gmail",
        historyLedger: "History Ledger",
        btnDeleteHistory: "Delete History",
        navChat: "Fast Chat",
        navCreate: "Create Mode",
        navAccount: "My Account",
        guestUser: "Guest User",
        noEmail: "No profile email synchronized",
        loadingAi: "Connecting to real-time search clusters...",
        alertNameEmpty: "Please enter a valid username.",
        alertNameSuccess: "Username updated successfully!",
        alertEmailInvalid: "Please enter a valid Gmail address.",
        alertEmailSuccess: "Gmail address linked successfully!",
        alertWipeConfirm: "Are you sure you want to completely clear your local historical database?",
        alertWipeSuccess: "Local search history logs wiped successfully.",
        sysInstruction: "You are an advanced live AI assistant with web search groundings. Provide accurate details on live matches, gold rates, and modern trends for the year 2026."
    },
    hi: {
        usesLeft: "फ्री उपयोग शेष",
        chatWelcomeTitle: "SPAR AI स्टूडियो में आपका स्वागत है",
        chatWelcomeDesc: "अंग्रेजी या हिंदी में प्रश्न पूछें! लाइव वेब सर्च डेटा सक्रिय है।",
        chatPlaceholder: "आज का लाइव क्रिकेट स्कोर, गोल्ड रेट या ताजा समाचार पूछें...",
        createTitle: "इमेज स्टूडियो",
        createDesc: "लिखित निर्देशों को सीधे डाउनलोड-योग्य कलाकृतियों में बदलें।",
        createPlaceholder: "इमेज का विवरण लिखें...",
        btnGenerate: "बनाएं",
        btnSave: "डिवाइस में सहेजें",
        canvasPlaceholder: "तुरंत उच्च गुणवत्ता वाली इमेज तैयार करें",
        loaderText: "पिक्सेल प्रोसेस हो रहे हैं...",
        accountSettings: "खाता सेटिंग्स",
        lblSelectLang: "App Language / ऐप की भाषा:",
        usernamePlaceholder: "नया यूजरनेम दर्ज करें",
        btnUpdateName: "नाम अपडेट करें",
        emailPlaceholder: "yourname@gmail.com",
        btnLinkEmail: "Gmail लिंक करें",
        historyLedger: "इतिहास डेटा",
        btnDeleteHistory: "इतिहास हटाएं",
        navChat: "फास्ट चैट",
        navCreate: "क्रिएट मोड",
        navAccount: "मेरा खाता",
        guestUser: "अतिथि उपयोगकर्ता",
        noEmail: "कोई ईमेल लिंक नहीं है",
        loadingAi: "इंटरनेट से ताजा लाइव डेटा निकाला जा रहा है...",
        alertNameEmpty: "कृपया एक वैध यूजरनेम दर्ज करें।",
        alertNameSuccess: "यूजरनेम सफलतापूर्वक अपडेट हो गया!",
        alertEmailInvalid: "कृपया सही ईमेल एड्रेस दर्ज करें।",
        alertEmailSuccess: "Gmail सफलतापूर्वक लिंक हो गया!",
        alertWipeConfirm: "क्या आप सचमुच अपना पूरा चैट इतिहास डिलीट करना चाहते हैं?",
        alertWipeSuccess: "चैट इतिहास सफलतापूर्वक साफ़ कर दिया गया है।",
        sysInstruction: "You are an advanced live AI assistant. Respond entirely in fluent Hindi language using Devanagari script. Provide real-time data for matches and live gold rates."
    }
};

// INITIALIZATION ROUTINE & STATE SYNC
function initializePersistentState() {
    if (localStorage.getItem("admin_price")) currentSubscriptionPrice = parseInt(localStorage.getItem("admin_price"));
    if (localStorage.getItem("admin_uses")) freeUsesLeft = parseInt(localStorage.getItem("admin_uses"));
    if (localStorage.getItem("admin_coupon")) activeSystemCoupon = localStorage.getItem("admin_coupon");

    if (localStorage.getItem("spar_user_email")) loggedInUserEmail = localStorage.getItem("spar_user_email");
    if (localStorage.getItem("spar_username")) currentUsernameString = localStorage.getItem("spar_username");
    
    if (localStorage.getItem("spar_app_lang")) currentSelectedLanguage = localStorage.getItem("spar_app_lang");

    document.getElementById('app-language-select').value = currentSelectedLanguage;

    if (localStorage.getItem("spar_auth_logged") === "true") {
        isUserLoggedIn = true;
        renderPremiumVerifiedBadge();
    } else {
        document.getElementById('uses-left').innerText = freeUsesLeft;
    }

    document.getElementById('header-price-display').innerText = `₹${currentSubscriptionPrice}`;
    document.getElementById('checkout-price-text').innerText = `₹${currentSubscriptionPrice}`;

    const cachedHistoryLogs = localStorage.getItem("spar_chat_history");
    if (cachedHistoryLogs && cachedHistoryLogs.trim() !== "") {
        document.getElementById('chat-welcome-banner').classList.add('hidden');
        const container = document.getElementById('chat-scroller');
        container.innerHTML += cachedHistoryLogs;
        container.scrollTop = container.scrollHeight;
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

    document.getElementById('lbl-uses-left').innerText = dict.usesLeft;
    document.getElementById('chat-welcome-title').innerText = dict.chatWelcomeTitle;
    document.getElementById('chat-welcome-desc').innerText = dict.chatWelcomeDesc;
    document.getElementById('chat-input').placeholder = dict.chatPlaceholder;
    document.getElementById('create-title').innerHTML = `<i class="fa-solid fa-palette text-amber-400 mr-2"></i>` + dict.createTitle;
    document.getElementById('create-desc').innerText = dict.createDesc;
    document.getElementById('image-prompt').placeholder = dict.createPlaceholder;
    document.getElementById('btn-generate-submit').innerText = dict.btnGenerate;
    document.getElementById('btn-save-device').innerHTML = `<i class="fa-solid fa-circle-arrow-down text-sm mr-2"></i>` + dict.btnSave;
    document.getElementById('canvas-placeholder-text').innerText = dict.canvasPlaceholder;
    document.getElementById('generation-loader-text').innerText = dict.loaderText;
    document.getElementById('account-settings-heading').innerText = dict.accountSettings;
    document.getElementById('lbl-select-lang').innerText = dict.lblSelectLang;
    document.getElementById('update-username-input').placeholder = dict.usernamePlaceholder;
    document.getElementById('btn-update-name').innerText = dict.btnUpdateName;
    document.getElementById('update-email-input').placeholder = dict.emailPlaceholder;
    document.getElementById('btn-link-email').innerText = dict.btnLinkEmail;
    document.getElementById('history-ledger-title').innerHTML = `<i class="fa-solid fa-database mr-1.5 text-[10px]"></i>` + dict.historyLedger;
    document.getElementById('btn-delete-history').innerHTML = `<i class="fa-solid fa-trash-can mr-1"></i>` + dict.btnDeleteHistory;
    document.getElementById('nav-text-chat').innerText = dict.navChat;
    document.getElementById('nav-text-create').innerText = dict.navCreate;
    document.getElementById('nav-text-account').innerText = dict.navAccount;

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
        document.getElementById('chat-welcome-banner').classList.remove('hidden');
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

// TEXT PIPELINE BUILT WITH HIGH-AVAILABILITY FAILOVER ENDPOINTS
async function handleTextMessage() {
    const inputField = document.getElementById('chat-input');
    const promptText = inputField.value.trim();
    if (!promptText) return;

    if (!checkLimits()) return;

    const dict = appTranslationDictionary[currentSelectedLanguage];
    document.getElementById('chat-welcome-banner').classList.add('hidden');
    const chatScroller = document.getElementById('chat-scroller');
    
    const userBubble = document.createElement('div');
    userBubble.className = "flex justify-end mb-2";
    userBubble.innerHTML = `<div class="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl rounded-tr-none text-sm font-medium max-w-[85%] shadow-md">${promptText}</div>`;
    
    chatScroller.appendChild(userBubble);
    saveBubbleToPersistentHistory(userBubble.