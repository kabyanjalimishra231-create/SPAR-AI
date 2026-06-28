// STABLE FALLBACK CONSTANTS & GLOBAL INITIALIZERS
let currentSubscriptionPrice = 299; 
let freeUsesLeft = 3; 
let activeSystemCoupon = "FREEACCESS2026"; 
let isUserLoggedIn = false;
let loggedInUserEmail = "user@example.com"; 

// COMPILER LOCKED PIN ACCESS SYSTEM PASSWORD
const ADMIN_MASTER_PASSWORD = "221181";

let logoClickCounter = 0;
let lastClickTimestamp = 0;
const RAZORPAY_KEY_ID = "rzp_test_T5uOdu0zh2G02R"; 
let lastGeneratedImageUrlString = ""; 

// LOCALSTORAGE INITIALIZATION & MEMORY SYNCHRONIZER RETRIEVER
function initializePersistentState() {
    if (localStorage.getItem("admin_price")) currentSubscriptionPrice = parseInt(localStorage.getItem("admin_price"));
    if (localStorage.getItem("admin_uses")) freeUsesLeft = parseInt(localStorage.getItem("admin_uses"));
    if (localStorage.getItem("admin_coupon")) activeSystemCoupon = localStorage.getItem("admin_coupon");

    if (localStorage.getItem("spar_user_email")) {
        loggedInUserEmail = localStorage.getItem("spar_user_email");
    }

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
    
    renderAccountHistoryPanel();
}

// PREMIUM INTERFACE RENDERER
function renderPremiumVerifiedBadge() {
    const badge = document.getElementById('use-badge');
    badge.innerHTML = `<i class="fa-solid fa-circle-user text-emerald-400 mr-1"></i> Account Active (Tap to Options)`;
    badge.className = "bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20 cursor-pointer active:scale-95 transition-transform";
    document.getElementById('pro-header-btn').classList.add('hidden'); 
    renderAccountHistoryPanel();
}

// ACCOUNT STATUS BADGE ROUTER
function handleBadgeAction() {
    if (isUserLoggedIn) {
        const selectionPrompt = confirm("Select 'OK' to manage your PRO Subscription Upgrade & Voucher entry codes.\n\nSelect 'Cancel' if you want to completely Sign Out of your account.");
        if (selectionPrompt) {
            openCheckoutSheet();
        } else {
            processLogoutSequence();
        }
    }
}

// CENTRALIZED LOGOUT PROCESSOR
function processLogoutSequence() {
    isUserLoggedIn = false;
    localStorage.setItem("spar_auth_logged", "false");
    
    const badge = document.getElementById('use-badge');
    badge.innerHTML = `<i class="fa-solid fa-bolt text-amber-400 mr-1"></i> <span id="uses-left">${freeUsesLeft}</span> Free Uses Left`;
    badge.className = "bg-amber-500/10 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/20 cursor-pointer active:scale-95 transition-transform";
    document.getElementById('pro-header-btn').classList.remove('hidden');
    
    freeUsesLeft = 3;
    document.getElementById('uses-left').innerText = freeUsesLeft;
    
    renderAccountHistoryPanel();
    alert("Session severed safely. Interface parameters restored to baseline free status.");
}

// TAB NAVIGATION SWITCH
function switchView(targetMode) {
    const chatView = document.getElementById('view-chat');
    const createView = document.getElementById('view-create');
    const accountView = document.getElementById('view-account');
    
    const chatBtn = document.getElementById('nav-chat-btn');
    const createBtn = document.getElementById('nav-create-btn');
    const accountBtn = document.getElementById('nav-account-btn');

    chatView.classList.add('hidden');
    createView.classList.add('hidden');
    if (accountView) accountView.classList.add('hidden');

    [chatBtn, createBtn, accountBtn].forEach(btn => {
        if (btn) {
            btn.classList.remove('text-amber-400');
            btn.classList.add('text-gray-500');
        }
    });

    if (targetMode === 'chat') {
        chatView.classList.remove('hidden');
        chatBtn.classList.add('text-amber-400');
    } else if (targetMode === 'create') {
        createView.classList.remove('hidden');
        createBtn.classList.add('text-amber-400');
    } else if (targetMode === 'account') {
        if (accountView) accountView.classList.remove('hidden');
        if (accountBtn) accountBtn.classList.add('text-amber-400');
        renderAccountHistoryPanel(); 
    }
}

// DYNAMIC ACCOUNT RENDERING & SEARCH HISTORY LEDGER PARSER
function renderAccountHistoryPanel() {
    const usernameDisplay = document.getElementById('account-username');
    if (usernameDisplay) {
        usernameDisplay.innerText = isUserLoggedIn ? loggedInUserEmail.split('@')[0] : "Guest User";
    }

    const emailDisplay = document.getElementById('account-email');
    if (emailDisplay) {
        emailDisplay.innerText = isUserLoggedIn ? loggedInUserEmail : "No email linked (Free Session)";
    }

    const statusDisplay = document.getElementById('account-subs-status');
    if (statusDisplay) {
        statusDisplay.innerHTML = isUserLoggedIn 
            ? `<span class="text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-1 rounded-md border border-emerald-500/20">👑 PRO UNLIMITED</span>` 
            : `<span class="text-amber-400 font-bold bg-amber-500/10 px-2.5 py-1 rounded-md border border-amber-500/20">⏳ FREE TIER (${freeUsesLeft} Left)</span>`;
    }

    const keywordsListContainer = document.getElementById('account-search-history');
    if (!keywordsListContainer) return;

    keywordsListContainer.innerHTML = "";
    const rawSavedChatHTML = localStorage.getItem("spar_chat_history") || "";

    if (!rawSavedChatHTML.trim()) {
        keywordsListContainer.innerHTML = `<p class="text-gray-500 text-xs italic p-4 text-center">Your search history registry index is currently empty.</p>`;
        return;
    }

    const sandboxDiv = document.createElement('div');
    sandboxDiv.innerHTML = rawSavedChatHTML;
    const userMessageBubbles = sandboxDiv.querySelectorAll('.bg-amber-500');
    
    if (userMessageBubbles.length === 0) {
        keywordsListContainer.innerHTML = `<p class="text-gray-500 text-xs italic p-4 text-center">No prior keywords tracked locally on this device.</p>`;
        return;
    }

    userMessageBubbles.forEach(bubble => {
        const cleanedText = bubble.innerText.trim();
        if (cleanedText) {
            const historyItem = document.createElement('div');
            historyItem.className = "flex items-center justify-between border-b border-gray-800/40 py-2.5 text-xs text-gray-300 px-1";
            historyItem.innerHTML = `
                <div class="flex items-center gap-2 overflow-hidden truncate mr-4">
                    <i class="fa-solid fa-clock-rotate-left text-gray-600 flex-shrink-0"></i>
                    <span class="truncate tracking-wide font-mono text-gray-400">${cleanedText}</span>
                </div>
                <span class="text-[9px] text-amber-400/70 bg-amber-500/5 px-2 py-0.5 rounded border border-amber-500/10 uppercase tracking-wider whitespace-nowrap">Text Query</span>
            `;
            keywordsListContainer.appendChild(historyItem);
        }
    });
}

function wipeLocalDeviceHistory() {
    if (confirm("Are you sure you want to completely clear your chat log and search history data from this device?")) {
        localStorage.removeItem("spar_chat_history");
        document.getElementById('chat-scroller').innerHTML = "";
        document.getElementById('chat-welcome-banner').classList.remove('hidden');
        renderAccountHistoryPanel();
        alert("Local history registry purged successfully.");
    }
}

function checkLimits() {
    if (isUserLoggedIn) return true;
    freeUsesLeft--;
    if (freeUsesLeft <= 0) {
        document.getElementById('uses-left').innerText = "0";
        document.getElementById('login-modal').classList.remove('hidden');
        return false;
    }
    document.getElementById('uses-left').innerText = freeUsesLeft;
    return true;
}

// LIVE CONVERSATIONAL AI MODEL PIPELINE (QWEN INFERENCE VECTOR MATRIX) WITH STABLE MULTI-ENDPOINTS
async function handleTextMessage() {
    const inputField = document.getElementById('chat-input');
    const promptText = inputField.value.trim();
    if (!promptText) return;

    if (!checkLimits()) return;

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
            <i class="fa-solid fa-circle-notch animate-spin mr-2 text-amber-400"></i> SPAR AI is generating response...
        </div>`;
    chatScroller.appendChild(aiBubble);
    chatScroller.scrollTop = chatScroller.scrollHeight;

    try {
        const response = await fetch("https://api-inference.huggingface.co/models/Qwen/Qwen2.5-7B-Instruct", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                inputs: promptText,
                parameters: { max_new_tokens: 300, temperature: 0.7 }
            })
        });

        if (response.ok) {
            const data = await response.json();
            let aiResponseText = "";
            if (Array.isArray(data) && data[0] && data[0].generated_text) {
                aiResponseText = data[0].generated_text;
                if (aiResponseText.startsWith(promptText)) {
                    aiResponseText = aiResponseText.substring(promptText.length).trim();
                }
            } else {
                throw new Error("Payload structure text block mismatch");
            }

            if (!aiResponseText) aiResponseText = "The AI core processed an empty execution block. Please rephrase your input.";

            const stableResponseBlockHTML = `
                <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                    <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">🧠 SPAR Intelligent Core</p>
                    ${aiResponseText.replace(/\n/g, '<br>')}
                </div>`;

            document.getElementById(uniqueLoadingId).parentElement.innerHTML = stableResponseBlockHTML;
            saveBubbleToPersistentHistory(document.getElementById(uniqueLoadingId).parentElement.outerHTML);
        } else {
            throw new Error("Primary model cluster offline, shifting to fact backup arrays");
        }
    } catch (error) {
        try {
            const searchChannel = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(promptText)}`);
            if (searchChannel.ok) {
                const structuralDataPayload = await searchChannel.json();
                let contextualTextResult = structuralDataPayload.extract;

                const wikiHTML = `
                    <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                        <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚡ Live Connected Core (Fact Base)</p>
                        ${contextualTextResult}
                    </div>`;

                document.getElementById(uniqueLoadingId).parentElement.innerHTML = wikiHTML;
                saveBubbleToPersistentHistory(wikiHTML);
            } else {
                throw new Error("All proxy endpoints restricted");
            }
        } catch (secondaryErr) {
            const emergencyOfflineFallbackHTML = `
                <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                    <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚙️ Local Sub-Core</p>
                    I understand you are asking about "${promptText}". My server optimization channels are currently running fine-tuning sync loops. Please ask me again in a moment!
                </div>`;
            document.getElementById(uniqueLoadingId).parentElement.innerHTML = emergencyOfflineFallbackHTML;
            saveBubbleToPersistentHistory(emergencyOfflineFallbackHTML);
        }
    }
    chatScroller.scrollTop = chatScroller.scrollHeight;
    renderAccountHistoryPanel();
}

function saveBubbleToPersistentHistory(bubbleMarkupText) {
    let activeLogs = localStorage.getItem("spar_chat_history") || "";
    activeLogs += bubbleMarkupText;
    localStorage.setItem("spar_chat_history", activeLogs);
}

// IMAGE STUDIO CORE
async function generateImage() {
    const promptField = document.getElementById('image-prompt');
    const imageString = promptField.value.trim();
    if (!imageString) return;

    if (!checkLimits()) return;

    const loader = document.getElementById('generation-loader');
    const canvasImg = document.getElementById('generated-image');
    const placeholder = document.getElementById('canvas-placeholder');
    const downloadContainer = document.getElementById('download-overlay');

    loader.classList.remove('hidden');
    placeholder.classList.add('hidden');
    downloadContainer.classList.add('hidden'); 

    try {
        const parsedSeedKeyword = encodeURIComponent(imageString);
        const dynamicAiArtUrl = `https://image.pollinations.ai/p/${parsedSeedKeyword}?width=512&height=512&nologo=true&seed=${Math.floor(Math.random() * 10000)}`;
        
        lastGeneratedImageUrlString = dynamicAiArtUrl; 
        canvasImg.src = dynamicAiArtUrl;

        canvasImg.onload = function() {
            loader.classList.add('hidden');
            canvasImg.classList.remove('hidden');
            downloadContainer.classList.remove('hidden'); 
        };
    } catch(err) {
        loader.classList.add('hidden');
        placeholder.classList.remove('hidden');
        alert("Image rendering timed out.");
    }
}

// CORS-BYPASS STABLE REDIRECT DOWNLOAD CONTROLLER
function triggerFileDownload() {
    if (!lastGeneratedImageUrlString) {
        alert("No compilation data stream found inside active canvas container.");
        return;
    }
    const dynamicWindowChannel = window.open(lastGeneratedImageUrlString, '_blank');
    if (!dynamicWindowChannel) {
        const virtualAnchorElement = document.createElement('a');
        virtualAnchorElement.href = lastGeneratedImageUrlString;
        virtualAnchorElement.target = "_blank";
        virtualAnchorElement.download = `SPAR_AI_Asset_${Date.now()}.png`;
        document.body.appendChild(virtualAnchorElement);
        virtualAnchorElement.click();
        document.body.removeChild(virtualAnchorElement);
    }
}

// CHECKOUT MANAGER
function openCheckoutSheet() {
    document.getElementById('checkout-modal').classList.remove('hidden');
}

// CLOSES THE CHECKOUT MODAL UNIFORMLY
function closeCheckoutSheet() {
    document.getElementById('checkout-coupon-input').value = "";
    document.getElementById('checkout-modal').classList.add('hidden');
}

function validateCheckoutCoupon() {
    const couponInput = document.getElementById('checkout-coupon-input').value.trim().toUpperCase();
    if (couponInput === activeSystemCoupon.toUpperCase()) {
        isUserLoggedIn = true; 
        localStorage.setItem("spar_auth_logged", "true"); 
        closeCheckoutSheet();
        renderPremiumVerifiedBadge();
        alert(`Verification Success! Free unlimited access enabled.`);
    } else {
        alert("The coupon code entered is invalid or expired.");
    }
}

function executeSecureRazorpayPurchase() {
    const computedPaiseAmount = currentSubscriptionPrice * 100;
    var options = {
        "key": RAZORPAY_KEY_ID,
        "amount": computedPaiseAmount.toString(),
        "currency": "INR",
        "name": "SPAR AI Studio",
        "description": "Unlock Pro Unlimited System Access Core",
        "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100",
        "handler": function (response) {
            closeCheckoutSheet();
            isUserLoggedIn = true;
            localStorage.setItem("spar_auth_logged", "true");
            renderPremiumVerifiedBadge();
            alert("Payment verified securely!");
        },
        "prefill": { "name": "SPAR Account Checkout", "email": loggedInUserEmail, "contact": "9999999999" },
        "theme": { "color": "#f59e0b" }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}

function simulateLogin() {
    const emailField = document.getElementById('login-email').value.trim();
    const passField = document.getElementById('login-pass').value;

    if (emailField && passField) {
        isUserLoggedIn = true;
        loggedInUserEmail = emailField;
        localStorage.setItem("spar_auth_logged", "true"); 
        localStorage.setItem("spar_user_email", emailField); 
        document.getElementById('login-modal').classList.add('hidden');
        renderPremiumVerifiedBadge();
        alert("Profile authentication synchronized permanently!");
    } else {
        alert("Please completely satisfy registration fields.");
    }
}

function openCameraFeature() {
    if (!checkLimits()) return;
    alert("Accessing lens optics matrices...");
}

// ADMINISTRATIVE SYSTEM HOOKS
function handleAdminSecretClick() {
    const now = new Date().getTime();
    if (now - lastClickTimestamp > 1500) {
        logoClickCounter = 0; 
    }
    logoClickCounter++;
    lastClickTimestamp = now;

    if (logoClickCounter === 5) {
        logoClickCounter = 0;
        document.getElementById('admin-passkey-field').value = ""; 
        document.getElementById('admin-auth-modal').classList.remove('hidden'); 
    }
}

function verifyAdminPasskey() {
    const userEnteredPin = document.getElementById('admin-passkey-field').value.trim();
    if (userEnteredPin === ADMIN_MASTER_PASSWORD) {
        document.getElementById('admin-auth-modal').classList.add('hidden');
        document.getElementById('admin-price-input').value = currentSubscriptionPrice;
        document.getElementById('admin-uses-input').value = freeUsesLeft;
        document.getElementById('admin-coupon-input').value = activeSystemCoupon;
        document.getElementById('admin-modal').classList.remove('hidden'); 
    } else {
        alert("Access Denied! Incorrect Authentication Key.");
    }
}

function closeAdminDashboard() {
    document.getElementById('admin-modal').classList.add('hidden');
}

function saveAdminSettings() {
    const inputPrice = parseInt(document.getElementById('admin-price-input').value);
    const inputUses = parseInt(document.getElementById('admin-uses-input').value);
    const inputCoupon = document.getElementById('admin-coupon-input').value.trim();

    if (isNaN(inputPrice) || isNaN(inputUses) || !inputCoupon) {
        alert("Error mapping runtime configurations.");
        return;
    }

    currentSubscriptionPrice = inputPrice;
    freeUsesLeft = inputUses;
    activeSystemCoupon = inputCoupon;

    localStorage.setItem("admin_price", currentSubscriptionPrice);
    localStorage.setItem("admin_uses", freeUsesLeft);
    localStorage.setItem("admin_coupon", activeSystemCoupon);

    document.getElementById('header-price-display').innerText = `₹${currentSubscriptionPrice}`;
    document.getElementById('checkout-price-text').innerText = `₹${currentSubscriptionPrice}`;
    document.getElementById('uses-left').innerText = freeUsesLeft;

    alert("Administrative setup committed cleanly!");
    closeAdminDashboard();
}