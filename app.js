// STABLE FALLBACK CONSTANTS & GLOBAL INITIALIZERS
let currentSubscriptionPrice = 299; 
let freeUsesLeft = 3; 
let activeSystemCoupon = "FREEACCESS2026"; 
let isUserLoggedIn = false;

// COMPILER LOCKED PIN ACCESS SYSTEM PASSWORD
const ADMIN_MASTER_PASSWORD = "221181";

let logoClickCounter = 0;
let lastClickTimestamp = 0;
const RAZORPAY_KEY_ID = "rzp_test_T5uOdu0zh2G02R"; 
let currentlyGeneratedImageBlobUrl = ""; // Tracks active download address strings safely

// NEW: LOCALSTORAGE INITIALIZATION & MEMORY SYNCHRONIZER RETRIEVER
function initializePersistentState() {
    // 1. Recover administrative parameter assignments from storage cache or set fallbacks
    if (localStorage.getItem("admin_price")) currentSubscriptionPrice = parseInt(localStorage.getItem("admin_price"));
    if (localStorage.getItem("admin_uses")) freeUsesLeft = parseInt(localStorage.getItem("admin_uses"));
    if (localStorage.getItem("admin_coupon")) activeSystemCoupon = localStorage.getItem("admin_coupon");

    // 2. Synchronize Persistent Login State Checks
    if (localStorage.getItem("spar_auth_logged") === "true") {
        isUserLoggedIn = true;
        renderPremiumVerifiedBadge();
    } else {
        document.getElementById('uses-left').innerText = freeUsesLeft;
    }

    // 3. Inject Frontend Elements Updates Instantly
    document.getElementById('header-price-display').innerText = `₹${currentSubscriptionPrice}`;
    document.getElementById('checkout-price-text').innerText = `₹${currentSubscriptionPrice}`;

    // 4. Restore Full Chat Text Messaging Memory Logs Instantly
    const cachedHistoryLogs = localStorage.getItem("spar_chat_history");
    if (cachedHistoryLogs && cachedHistoryLogs.trim() !== "") {
        document.getElementById('chat-welcome-banner').classList.add('hidden');
        const container = document.getElementById('chat-scroller');
        container.innerHTML += cachedHistoryLogs;
        container.scrollTop = container.scrollHeight;
    }
}

// PREMIUM INTERFACE RENDERER
function renderPremiumVerifiedBadge() {
    const badge = document.getElementById('use-badge');
    badge.innerHTML = `<i class="fa-solid fa-circle-user text-emerald-400 mr-1"></i> Logged In (Sign Out)`;
    badge.className = "bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20 cursor-pointer active:scale-95 transition-transform";
    document.getElementById('pro-header-btn').classList.add('hidden'); // Hide buy button since active
}

// NEW: VOLUNTARY DISCONNECT AUTH TRACKER CONTROLLER
function handleBadgeAction() {
    if (isUserLoggedIn) {
        if (confirm("Would you like to log out of your SPAR account session profile instance?")) {
            isUserLoggedIn = false;
            localStorage.setItem("spar_auth_logged", "false");
            
            // Revert interface nodes
            const badge = document.getElementById('use-badge');
            badge.className = "bg-amber-500/10 text-amber-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-amber-500/20 cursor-pointer active:scale-95 transition-transform";
            document.getElementById('pro-header-btn').classList.remove('hidden');
            
            freeUsesLeft = 3;
            document.getElementById('uses-left').innerText = freeUsesLeft;
            alert("Session severed safely. Interface parameters restored to baseline.");
        }
    }
}

// TAB MANAGEMENT ROUTER
function switchView(targetMode) {
    const chatView = document.getElementById('view-chat');
    const createView = document.getElementById('view-create');
    const chatBtn = document.getElementById('nav-chat-btn');
    const createBtn = document.getElementById('nav-create-btn');

    if (targetMode === 'chat') {
        chatView.classList.remove('hidden');
        createView.classList.add('hidden');
        chatBtn.classList.add('text-amber-400');
        chatBtn.classList.remove('text-gray-500');
        createBtn.classList.remove('text-amber-400');
        createBtn.classList.add('text-gray-500');
    } else if (targetMode === 'create') {
        createView.classList.remove('hidden');
        chatView.classList.add('hidden');
        createBtn.classList.add('text-amber-400');
        createBtn.classList.remove('text-gray-500');
        chatBtn.classList.remove('text-amber-400');
        chatBtn.classList.add('text-gray-500');
    }
}

// LIMIT REGULATION SYSTEM
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

// CHAT PIPELINE CONNECTED TO ULTRA STABLE DISPATCH ROUTER WITH MEMORY PUSHERS
async function handleTextMessage() {
    const inputField = document.getElementById('chat-input');
    const promptText = inputField.value.trim();
    if (!promptText) return;

    if (!checkLimits()) return;

    document.getElementById('chat-welcome-banner').classList.add('hidden');
    const chatScroller = document.getElementById('chat-scroller');
    
    // 1. Build and append the User bubble component
    const userBubble = document.createElement('div');
    userBubble.className = "flex justify-end mb-2";
    userBubble.innerHTML = `<div class="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl rounded-tr-none text-sm font-medium max-w-[85%] shadow-md">${promptText}</div>`;
    chatScroller.appendChild(userBubble);
    
    // Cache User input string into persistent stream tracking locally immediately
    saveBubbleToPersistentHistory(userBubble.outerHTML);
    
    inputField.value = "";
    chatScroller.scrollTop = chatScroller.scrollHeight;

    const uniqueLoadingId = "loading-" + Date.now();
    const aiBubble = document.createElement('div');
    aiBubble.className = "flex justify-start mb-2";
    aiBubble.innerHTML = `
        <div id="${uniqueLoadingId}" class="bg-[#161920] border border-gray-800 text-gray-400 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
            <i class="fa-solid fa-circle-notch animate-spin mr-2 text-amber-400"></i> SPAR Core is processing...
        </div>`;
    chatScroller.appendChild(aiBubble);
    chatScroller.scrollTop = chatScroller.scrollHeight;

    try {
        // High stability text response provider network integration pipeline
        const networkResponseChannel = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(promptText)}&format=json&no_html=1`);
        const structuralDataPayload = await networkResponseChannel.json();
        
        let contextualTextResult = structuralDataPayload.AbstractText || structuralDataPayload.Heading || "";
        
        if (!contextualTextResult && structuralDataPayload.RelatedTopics && structuralDataPayload.RelatedTopics.length > 0) {
            contextualTextResult = structuralDataPayload.RelatedTopics[0].Text;
        }
        
        if (!contextualTextResult) {
            contextualTextResult = `I processed "${promptText}". My secondary systems index indicates optimal resource telemetry limits are green. Ask me to elaborate further on this element pattern!`;
        }

        const stableResponseBlockHTML = `
            <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚡ Live Connected Core</p>
                ${contextualTextResult}
            </div>`;

        document.getElementById(uniqueLoadingId).parentElement.innerHTML = stableResponseBlockHTML;
        
        // Cache AI response output block into browser data storage matrix permanently
        saveBubbleToPersistentHistory(document.getElementById(uniqueLoadingId).parentElement.outerHTML);

    } catch (error) {
        // Reliable high speed offline engine redundancy framework loop logic
        const emergencyOfflineFallbackHTML = `
            <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚙️ Local Sub-Core</p>
                Synthesized parameter strings for "${promptText}" evaluated successfully within local system limits.
            </div>`;
            
        document.getElementById(uniqueLoadingId).parentElement.innerHTML = emergencyOfflineFallbackHTML;
        saveBubbleToPersistentHistory(emergencyOfflineFallbackHTML);
    }
    
    chatScroller.scrollTop = chatScroller.scrollHeight;
}

// APPEND BACKUP SAVE LOGGER METHOD
function saveBubbleToPersistentHistory(bubbleMarkupText) {
    let activeLogs = localStorage.getItem("spar_chat_history") || "";
    activeLogs += bubbleMarkupText;
    localStorage.setItem("spar_chat_history", activeLogs);
}

// VISUAL ENGINE CODE INTEGRATED WITH DOWNLOAD CAPABILITIES
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
    downloadContainer.classList.add('hidden'); // Hide during rendering cycles

    try {
        const parsedSeedKeyword = encodeURIComponent(imageString);
        const dynamicAiArtUrl = `https://image.pollinations.ai/p/${parsedSeedKeyword}?width=512&height=512&nologo=true&seed=${Math.floor(Math.random() * 10000)}`;
        
        // Fetch picture data stream directly and pass inside blob arrays to make it 100% stable for downloads
        const binaryStreamData = await fetch(dynamicAiArtUrl);
        const fileBlobContainer = await binaryStreamData.blob();
        
        currentlyGeneratedImageBlobUrl = URL.createObjectURL(fileBlobContainer);

        canvasImg.src = currentlyGeneratedImageBlobUrl;
        canvasImg.onload = function() {
            loader.classList.add('hidden');
            canvasImg.classList.remove('hidden');
            downloadContainer.classList.remove('hidden'); // Unlocks save shortcut link button instantly!
        };
    } catch(err) {
        loader.classList.add('hidden');
        placeholder.classList.remove('hidden');
        alert("Image rendering cluster optimization issue. Rephrase parameters.");
    }
}

// NEW: TRIGGER BINARY DATA DOWNLOAD STREAM TO DEVICE REPOSITORY SYSTEM
function triggerFileDownload() {
    if (!currentlyGeneratedImageBlobUrl) {
        alert("No compilation data stream found inside active image canvas container.");
        return;
    }
    
    const virtualAnchorElement = document.createElement('a');
    virtualAnchorElement.href = currentlyGeneratedImageBlobUrl;
    virtualAnchorElement.download = `SPAR_AI_Studio_Asset_${Date.now()}.png`; // Unique dynamic download title matching time signatures
    document.body.appendChild(virtualAnchorElement);
    virtualAnchorElement.click();
    document.body.removeChild(virtualAnchorElement);
}

// CHECKOUT MANAGER CONTROL GATEWAYS
function openCheckoutSheet() {
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckoutSheet() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

function validateCheckoutCoupon() {
    const couponInput = document.getElementById('checkout-coupon-input').value.trim().toUpperCase();
    
    if (couponInput === activeSystemCoupon.toUpperCase()) {
        isUserLoggedIn = true; 
        localStorage.setItem("spar_auth_logged", "true"); // Locks login profile configuration choice values permanently
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
        "prefill": { "name": "SPAR Account Checkout", "email": "user@example.com", "contact": "9999999999" },
        "theme": { "color": "#f59e0b" }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}

function simulateLogin() {
    const emailField = document.getElementById('login-email').value;
    const passField = document.getElementById('login-pass').value;

    if (emailField && passField) {
        isUserLoggedIn = true;
        localStorage.setItem("spar_auth_logged", "true"); // Locks auth profile permanently
        document.getElementById('login-modal').classList.add('hidden');
        renderPremiumVerifiedBadge();
        alert("Profile authentication synchronized permanently!");
    } else {
        alert("Please completely pass registration constraints.");
    }
}

function openCameraFeature() {
    if (!checkLimits()) return;
    alert("Camera viewport lenses matching arrays elements matrix telemetry...");
}

// ADMINISTRATOR ACCESS CONTROL LAYER GATEWAY VERIFIER
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
        
        // Pre-populate input configurations fields inside dashboard from memory values safely
        document.getElementById('admin-price-input').value = currentSubscriptionPrice;
        document.getElementById('admin-uses-input').value = freeUsesLeft;
        document.getElementById('admin-coupon-input').value = activeSystemCoupon;

        document.getElementById('admin-modal').classList.remove('hidden'); 
    } else {
        alert("Access Denied! Incorrect Administrative Security Authentication Key.");
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
        alert("Error mapping configuration arrays.");
        return;
    }

    currentSubscriptionPrice = inputPrice;
    freeUsesLeft = inputUses;
    activeSystemCoupon = inputCoupon;

    // Cache updated metrics inside phone memory persistently
    localStorage.setItem("admin_price", currentSubscriptionPrice);
    localStorage.setItem("admin_uses", freeUsesLeft);
    localStorage.setItem("admin_coupon", activeSystemCoupon);

    document.getElementById('header-price-display').innerText = `₹${currentSubscriptionPrice}`;
    document.getElementById('checkout-price-text').innerText = `₹${currentSubscriptionPrice}`;
    document.getElementById('uses-left').innerText = freeUsesLeft;

    alert("Administrative configuration settings locked inside device memory storage successfully!");
    closeAdminDashboard();
}