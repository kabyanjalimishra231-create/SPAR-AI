/**
 * SPAR AI ULTRA MATRIX CONTROL ENGINE (REVISED)
 * Current System Epoch Baseline: 2026
 */

// GLOBAL CORE INITIALIZERS
let currentSubscriptionPrice = 299; 
let freeUsesLeft = 3; 
let activeSystemCoupon = "FREEACCESS2026"; 
let isUserLoggedIn = false;

// USER ACCOUNT AND PROFILE PROPERTIES
let loggedInUserEmail = "user@example.com"; 
let currentUsernameString = "Guest User";
let currentSelectedLanguage = "en"; 

const ADMIN_MASTER_PASSWORD = "221181";
let logoClickCounter = 0;
let lastClickTimestamp = 0;
const RAZORPAY_KEY_ID = "rzp_test_T5uOdu0zh2G02R"; 
let lastGeneratedImageUrlString = ""; 

const appTranslationDictionary = {
    en: {
        usesLeft: "Free Uses Left",
        chatWelcomeTitle: "Welcome to SPAR AI Ultra",
        chatWelcomeDesc: "Quantum Engine connected. Real-time metrics and advanced mathematics are online.",
        chatPlaceholder: "Ask anything, type math equations...",
        createTitle: "Image Studio Pro",
        createDesc: "Transform text into download-ready visual assets.",
        createPlaceholder: "Describe the image...",
        btnGenerate: "Synthesize Asset",
        btnSave: "Export to Disk",
        canvasPlaceholder: "Render engine idling...",
        loaderText: "Processing pixels...",
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
        navHistory: "History Ledger",
        guestUser: "Unverified Identity Token",
        noEmail: "No profile email synchronized",
        loadingAi: "Querying cloud clusters...",
        sysInstruction: "You are SPAR AI Ultra, an expert mathematics solver. Break down math equations step-by-step with proofs and calculations."
    }
};

function initializePersistentState() {
    if (localStorage.getItem("admin_price")) currentSubscriptionPrice = parseInt(localStorage.getItem("admin_price"));
    if (localStorage.getItem("admin_uses")) freeUsesLeft = parseInt(localStorage.getItem("admin_uses"));
    if (localStorage.getItem("admin_coupon")) activeSystemCoupon = localStorage.getItem("admin_coupon");
    if (localStorage.getItem("spar_user_email")) loggedInUserEmail = localStorage.getItem("spar_user_email");
    if (localStorage.getItem("spar_username")) currentUsernameString = localStorage.getItem("spar_username");
    if (localStorage.getItem("spar_app_lang")) currentSelectedLanguage = localStorage.getItem("spar_app_lang");

    if (localStorage.getItem("spar_auth_logged") === "true") {
        isUserLoggedIn = true;
        renderPremiumVerifiedBadge();
    } else {
        const usesDisplay = document.getElementById('uses-left');
        if (usesDisplay) usesDisplay.innerText = freeUsesLeft;
    }

    // Restore persistent chat bubbles
    const cachedHistoryLogs = localStorage.getItem("spar_chat_history");
    if (cachedHistoryLogs && cachedHistoryLogs.trim() !== "") {
        const welcomeBanner = document.getElementById('chat-welcome-banner');
        if (welcomeBanner) welcomeBanner.classList.add('hidden');
        const container = document.getElementById('chat-scroller');
        if (container) {
            container.innerHTML = cachedHistoryLogs;
            container.scrollTop = container.scrollHeight;
        }
    }
    renderAccountHistoryPanel();
}

// ADVANCED TEXT PROCESSING ENGINE (FIXED SERVER CORE BUSY ERROR)
async function handleTextMessage(overrideText = null) {
    const inputField = document.getElementById('chat-input');
    const chatScroller = document.getElementById('chat-scroller');
    const welcomeBanner = document.getElementById('chat-welcome-banner');
    
    if (!inputField || !chatScroller) return;

    // Use override text if clicked from history, else fetch input text
    const promptText = overrideText ? overrideText.trim() : inputField.value.trim();
    if (!promptText) return; 

    if (!overrideText && !checkLimits()) return;

    if (welcomeBanner) welcomeBanner.classList.add('hidden');
    
    // Append User Bubble
    const userBubble = document.createElement('div');
    userBubble.className = "flex justify-end mb-2";
    userBubble.innerHTML = `<div class="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl rounded-tr-none text-sm font-medium max-w-[85%] shadow-md">${promptText}</div>`;
    chatScroller.appendChild(userBubble);
    saveBubbleToPersistentHistory(userBubble.outerHTML);
    
    if (!overrideText) inputField.value = "";
    chatScroller.scrollTop = chatScroller.scrollHeight;

    // Append Loading Bubble
    const uniqueLoadingId = "loading-" + Date.now();
    const aiBubble = document.createElement('div');
    aiBubble.className = "flex justify-start mb-2";
    aiBubble.innerHTML = `
        <div id="${uniqueLoadingId}" class="bg-[#161920] border border-gray-800 text-gray-400 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
            <i class="fa-solid fa-circle-notch animate-spin mr-2 text-amber-400"></i> Processing calculations...
        </div>`;
    chatScroller.appendChild(aiBubble);
    chatScroller.scrollTop = chatScroller.scrollHeight;

    // CLEAN URL DISPATCH VECTOR (Prevents HTTP 414 / Server Busy Crashes)
    let aiResponseText = "";
    let successfullyFetched = false;
    const finalCleanPrompt = encodeURIComponent(`System Directive: Act as expert math solver in 2026. Solve step-by-step. Question: ${promptText}`);

    try {
        // Optimized endpoint payload execution
        const response = await fetch(`https://text.pollinations.ai/${finalCleanPrompt}?model=openai&cache=false`);
        if (response.ok) {
            aiResponseText = await response.text();
            successfullyFetched = true;
        }
    } catch (err) {
        console.error("Primary pipeline exception thrown");
    }

    // Final Render Updates
    const finalLoadingNode = document.getElementById(uniqueLoadingId);
    if (finalLoadingNode) {
        if (successfullyFetched && aiResponseText) {
            const stableResponseBlockHTML = `
                <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                    <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚡ SPAR Math Solver Core</p>
                    ${aiResponseText.replace(/\n/g, '<br>')}
                </div>`;
            finalLoadingNode.parentElement.innerHTML = stableResponseBlockHTML;
            saveBubbleToPersistentHistory(finalLoadingNode.parentElement.outerHTML);
        } else {
            finalLoadingNode.parentElement.innerHTML = `
                <div class="bg-[#161920] border border-amber-900/40 text-gray-400 px-4 py-2.5 rounded-2xl text-sm max-w-[85%]">
                    ⚠️ Connection bottleneck. Please re-submit the equation.
                </div>`;
        }
    }
    chatScroller.scrollTop = chatScroller.scrollHeight;
    renderAccountHistoryPanel();
}

// RENDERS THE LOGS INSIDE THE DEDICATED HISTORY TAB AS INTERACTIVE CLICKABLE TRIGGERS
function renderAccountHistoryPanel() {
    const keywordsListContainer = document.getElementById('account-search-history');
    if (!keywordsListContainer) return;

    keywordsListContainer.innerHTML = "";
    const rawSavedChatHTML = localStorage.getItem("spar_chat_history") || "";

    if (!rawSavedChatHTML.trim()) {
        keywordsListContainer.innerHTML = `<p class="text-gray-500 text-xs italic p-4 text-center">No history logs stored yet.</p>`;
        return;
    }

    const sandboxDiv = document.createElement('div');
    sandboxDiv.innerHTML = rawSavedChatHTML;
    const userMessageBubbles = sandboxDiv.querySelectorAll('.bg-amber-500');

    userMessageBubbles.forEach(bubble => {
        const cleanedText = bubble.innerText.trim();
        if (cleanedText) {
            const historyItem = document.createElement('div');
            historyItem.className = "flex items-center justify-between border-b border-gray-800/40 py-3 text-xs text-gray-300 px-2 hover:bg-gray-900/40 cursor-pointer rounded-xl transition-all";
            
            // Onclick handler automatically switches screen view to chat and processes query context again!
            historyItem.onclick = () => {
                switchView('chat');
                handleTextMessage(cleanedText);
            };

            historyItem.innerHTML = `
                <div class="flex items-center gap-2 overflow-hidden truncate mr-4">
                    <i class="fa-solid fa-clock-rotate-left text-amber-500 flex-shrink-0"></i>
                    <span class="truncate text-gray-300 font-mono font-medium">${cleanedText}</span>
                </div>
                <span class="text-[9px] text-gray-400 bg-gray-800 px-2 py-0.5 rounded border border-gray-700 whitespace-nowrap">Re-open <i class="fa-solid fa-chevron-right ml-1 text-[7px]"></i></span>
            `;
            keywordsListContainer.appendChild(historyItem);
        }
    });
}

function saveBubbleToPersistentHistory(htmlMarkupPayload) {
    let cumulativeLogs = localStorage.getItem("spar_chat_history") || "";
    localStorage.setItem("spar_chat_history", cumulativeLogs + htmlMarkupPayload);
}

function switchView(targetMode) {
    const views = {
        'chat': document.getElementById('view-chat'),
        'create': document.getElementById('view-create'),
        'account': document.getElementById('view-account'),
        'history': document.getElementById('view-history')
    };
    const buttons = {
        'chat': document.getElementById('nav-chat-btn'),
        'create': document.getElementById('nav-create-btn'),
        'account': document.getElementById('nav-account-btn'),
        'history': document.getElementById('nav-history-btn')
    };

    Object.values(views).forEach(viewNode => viewNode ? viewNode.classList.add('hidden') : null);
    Object.values(buttons).forEach(btnNode => btnNode ? btnNode.classList.replace('text-amber-400', 'text-gray-500') : null);

    if (views[targetMode]) views[targetMode].classList.remove('hidden');
    if (buttons[targetMode]) buttons[targetMode].classList.replace('text-gray-500', 'text-amber-400');
    
    if (targetMode === 'history' || targetMode === 'account') renderAccountHistoryPanel();
}

function wipeLocalDeviceHistory() {
    if (confirm("Purge database history logs completely?")) {
        localStorage.removeItem("spar_chat_history");
        document.getElementById('chat-scroller').innerHTML = "";
        renderAccountHistoryPanel();
        alert("History purged.");
    }
}

function checkLimits() {
    if (isUserLoggedIn) return true;
    freeUsesLeft--;
    if (freeUsesLeft <= 0) { 
        document.getElementById('login-modal').classList.remove('hidden'); 
        return false; 
    }
    document.getElementById('uses-left').innerText = freeUsesLeft;
    return true;
}

function renderPremiumVerifiedBadge() {
    const badge = document.getElementById('use-badge');
    if (badge) {
        badge.innerHTML = `<i class="fa-solid fa-crown text-emerald-400 mr-1"></i> PRO`;
    }
}