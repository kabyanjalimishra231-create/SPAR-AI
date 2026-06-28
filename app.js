// STABLE FALLBACK CONSTANTS & GLOBAL INITIALIZERS
let currentSubscriptionPrice = 299; 
let freeUsesLeft = 3; 
let activeSystemCoupon = "FREEACCESS2026"; 
let isUserLoggedIn = false;

// PROFILE SYSTEM STATE PROPERTIES
let loggedInUserEmail = "user@example.com"; 
let currentUsernameString = "Guest User";
let currentSelectedLanguage = "en"; // Default tracking code configuration fallback

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
        chatWelcomeDesc: "Ask questions in English or हिंदी! Your conversational AI model session is active.",
        chatPlaceholder: "Message SPAR AI...",
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
        loadingAi: "SPAR AI is generating response...",
        alertNameEmpty: "Please enter a valid username.",
        alertNameSuccess: "Username updated successfully!",
        alertEmailInvalid: "Please enter a valid Gmail address.",
        alertEmailSuccess: "Gmail address linked successfully!",
        alertWipeConfirm: "Are you sure you want to completely clear your local historical database?",
        alertWipeSuccess: "Local search history logs wiped successfully.",
        sysInstruction: "Answer the prompt clearly and accurately."
    },
    hi: {
        usesLeft: "फ्री उपयोग शेष",
        chatWelcomeTitle: "SPAR AI स्टूडियो में आपका स्वागत है",
        chatWelcomeDesc: "अंग्रेजी या हिंदी में प्रश्न पूछें! आपका संवादात्मक AI आदेश सत्र सक्रिय है।",
        chatPlaceholder: "SPAR AI को संदेश भेजें...",
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
        loadingAi: "SPAR AI उत्तर तैयार कर रहा है...",
        alertNameEmpty: "कृपया एक वैध यूजरनेम दर्ज करें।",
        alertNameSuccess: "यूजरनेम सफलतापूर्वक अपडेट हो गया!",
        alertEmailInvalid: "कृपया सही ईमेल एड्रेस दर्ज करें।",
        alertEmailSuccess: "Gmail सफलतापूर्वक लिंक हो गया!",
        alertWipeConfirm: "क्या आप सचमुच अपना पूरा चैट इतिहास डिलीट करना चाहते हैं?",
        alertWipeSuccess: "चैट इतिहास सफलतापूर्वक साफ़ कर दिया गया है।",
        sysInstruction: "Respond entirely in fluent Hindi language using Devanagari script. Keep it highly natural."
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

// TEXT MODEL PIPELINE UPGRADED WITH STABLE ARCHITECTURE ROUTING ARRAYS
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
    saveBubbleToPersistentHistory(userBubble.outerHTML);
    inputField.value = "";
    chatScroller.scrollTop = chatScroller.scrollHeight;

    const uniqueLoadingId = "loading-" + Date.now();
    const aiBubble = document.createElement('div');
    aiBubble.className = "flex justify-start mb-2";
    aiBubble.innerHTML = `
        <div id="${uniqueLoadingId}" class="bg-[#161920] border border-gray-800 text-gray-400 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
            <i class="fa-solid fa-circle-notch animate-spin mr-2 text-amber-400"></i> ${dict.loadingAi}
        </div>`;
    chatScroller.appendChild(aiBubble);
    chatScroller.scrollTop = chatScroller.scrollHeight;

    try {
        const structuralQueryPrompt = `${dict.sysInstruction} User Question: ${promptText}`;
        
        // Added model parameters explicitly to pull directly from high-capacity computing layers
        const response = await fetch(`https://text.pollinations.ai/${encodeURIComponent(structuralQueryPrompt)}?model=openai&cache=false`);

        if (response.ok) {
            let aiResponseText = await response.text();
            
            const stableResponseBlockHTML = `
                <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                    <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">🧠 SPAR Intelligent Core</p>
                    ${aiResponseText.replace(/\n/g, '<br>')}
                </div>`;

            document.getElementById(uniqueLoadingId).parentElement.innerHTML = stableResponseBlockHTML;
            saveBubbleToPersistentHistory(document.getElementById(uniqueLoadingId).parentElement.outerHTML);
        } else {
            throw new Error("Matrix connection drop");
        }
    } catch (error) {
        const errorMsg = currentSelectedLanguage === "hi" ? "त्रुटि! कनेक्शन की जांच करें या कुछ देर बाद प्रयास करें।" : "Server busy. Please try again in a moment.";
        document.getElementById(uniqueLoadingId).parentElement.innerHTML = `
            <div class="bg-[#161920] border border-red-900 text-gray-400 px-4 py-2.5 rounded-2xl text-sm max-w-[85%]">
                ⚠️ ${errorMsg}
            </div>`;
    }
    chatScroller.scrollTop = chatScroller.scrollHeight;
    renderAccountHistoryPanel();
}

function renderPremiumVerifiedBadge() {
    const badge = document.getElementById('use-badge');
    badge.innerHTML = `<i class="fa-solid fa-crown text-emerald-400 mr-1"></i> PRO Active`;
    badge.className = "bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20 cursor-pointer transition-transform";
    document.getElementById('pro-header-btn').classList.add('hidden'); 
    renderAccountHistoryPanel();
}

function handleBadgeAction() {
    if (isUserLoggedIn && !confirm("Log out of current session?")) return;
    if (isUserLoggedIn) { localStorage.setItem("spar_auth_logged", "false"); window.location.reload(); }
}

function switchView(targetMode) {
    const chatView = document.getElementById('view-chat');
    const createView = document.getElementById('view-create');
    const accountView = document.getElementById('view-account');
    const chatBtn = document.getElementById('nav-chat-btn');
    const createBtn = document.getElementById('nav-create-btn');
    const accountBtn = document.getElementById('nav-account-btn');

    [chatView, createView, accountView].forEach(v => v ? v.classList.add('hidden') : null);
    [chatBtn, createBtn, accountBtn].forEach(b => b ? b.classList.replace('text-amber-400', 'text-gray-500') : null);

    if (targetMode === 'chat') { chatView.classList.remove('hidden'); chatBtn.classList.replace('text-gray-500', 'text-amber-400'); }
    else if (targetMode === 'create') { createView.classList.remove('hidden'); createBtn.classList.replace('text-gray-500', 'text-amber-400'); }
    else if (targetMode === 'account') { accountView.classList.remove('hidden'); accountBtn.classList.replace('text-gray-500', 'text-amber-400'); renderAccountHistoryPanel(); }
}

function checkLimits() {
    if (isUserLoggedIn) return true;
    freeUsesLeft--;
    if (freeUsesLeft <= 0) { document.getElementById('login-modal').classList.remove('hidden'); return false; }
    document.getElementById('uses-left').innerText = freeUsesLeft;
    return true;
}

function saveBubbleToPersistentHistory(html) {
    let logs = localStorage.getItem("spar_chat_history") || "";
    localStorage.setItem("spar_chat_history", logs + html);
}

async function generateImage() {
    const string = document.getElementById('image-prompt').value.trim();
    if (!string || !checkLimits()) return;
    document.getElementById('generation-loader').classList.remove('hidden');
    document.getElementById('canvas-placeholder').classList.add('hidden');
    const dynamicUrl = `https://image.pollinations.ai/p/${encodeURIComponent(string)}?width=512&height=512&nologo=true&seed=${Math.floor(Math.random() * 9999)}`;
    lastGeneratedImageUrlString = dynamicUrl;
    const canvasImg = document.getElementById('generated-image');
    canvasImg.src = dynamicUrl;
    canvasImg.onload = () => {
        document.getElementById('generation-loader').classList.add('hidden');
        canvasImg.classList.remove('hidden');
        document.getElementById('download-overlay').classList.remove('hidden');
    };
}

function triggerFileDownload() { if(lastGeneratedImageUrlString) window.open(lastGeneratedImageUrlString, '_blank'); }
function openCheckoutSheet() { document.getElementById('checkout-modal').classList.remove('hidden'); }
function closeCheckoutSheet() { document.getElementById('checkout-modal').classList.add('hidden'); }

function validateCheckoutCoupon() {
    if (document.getElementById('checkout-coupon-input').value.trim().toUpperCase() === activeSystemCoupon.toUpperCase()) {
        isUserLoggedIn = true; localStorage.setItem("spar_auth_logged", "true");
        closeCheckoutSheet(); renderPremiumVerifiedBadge();
        alert("PRO Plan Unlocked!");
    } else alert("Invalid Code.");
}

function executeSecureRazorpayPurchase() {
    var options = {
        "key": RAZORPAY_KEY_ID, "amount": (currentSubscriptionPrice*100).toString(), "currency": "INR", "name": "SPAR AI Studio",
        "handler": function() { isUserLoggedIn = true; localStorage.setItem("spar_auth_logged", "true"); closeCheckoutSheet(); renderPremiumVerifiedBadge(); }
    };
    new Razorpay(options).open();
}

function openCameraFeature() { if(checkLimits()) alert("Lens Core initialized."); }
function handleAdminSecretClick() { const now = new Date().getTime(); if(now - lastClickTimestamp > 1500) logoClickCounter=0; logoClickCounter++; lastClickTimestamp=now; if(logoClickCounter===5) { logoClickCounter=0; document.getElementById('admin-auth-modal').classList.remove('hidden'); } }
function verifyAdminPasskey() { if(document.getElementById('admin-passkey-field').value.trim()===ADMIN_MASTER_PASSWORD) { document.getElementById('admin-auth-modal').classList.add('hidden'); document.getElementById('admin-modal').classList.remove('hidden'); } }
function closeAdminDashboard() { document.getElementById('admin-modal').classList.add('hidden'); }
function saveAdminSettings() {
    currentSubscriptionPrice = parseInt(document.getElementById('admin-price-input').value);
    freeUsesLeft = parseInt(document.getElementById('admin-uses-input').value);
    activeSystemCoupon = document.getElementById('admin-coupon-input').value.trim();
    localStorage.setItem("admin_price", currentSubscriptionPrice); localStorage.setItem("admin_uses", freeUsesLeft); localStorage.setItem("admin_coupon", activeSystemCoupon);
    window.location.reload();
}