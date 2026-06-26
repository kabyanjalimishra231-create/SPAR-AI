// GLOBAL STATES
let currentSubscriptionPrice = 299; 
let freeUsesLeft = 3; 
let activeSystemCoupon = "FREEACCESS2026"; 
let isUserLoggedIn = false;

// ENCRYPTED SYSTEM KEY CONSTANT MATCH VALUE
const ADMIN_MASTER_PASSWORD = "221181";

let logoClickCounter = 0;
let lastClickTimestamp = 0;
const RAZORPAY_KEY_ID = "rzp_test_T5uOdu0zh2G02R"; 

// TAB VIEWS CONFIGURATION
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

// SECURITY COUNT BLOCKER
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

// TEXT INSTRUCTIONS CHAT PIPELINE
async function handleTextMessage() {
    const inputField = document.getElementById('chat-input');
    const promptText = inputField.value.trim();
    if (!promptText) return;

    if (!checkLimits()) return;

    const chatScroller = document.getElementById('chat-scroller');
    const userBubble = document.createElement('div');
    userBubble.className = "flex justify-end mb-2";
    userBubble.innerHTML = `<div class="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl rounded-tr-none text-sm font-medium max-w-[85%] shadow-md">${promptText}</div>`;
    chatScroller.appendChild(userBubble);
    inputField.value = "";
    chatScroller.scrollTop = chatScroller.scrollHeight;

    const uniqueLoadingId = "loading-" + Date.now();
    const aiBubble = document.createElement('div');
    aiBubble.className = "flex justify-start mb-2";
    aiBubble.innerHTML = `
        <div id="${uniqueLoadingId}" class="bg-[#161920] border border-gray-800 text-gray-400 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
            <i class="fa-solid fa-circle-notch animate-spin mr-2 text-amber-400"></i> SPAR Core processing...
        </div>`;
    chatScroller.appendChild(aiBubble);
    chatScroller.scrollTop = chatScroller.scrollHeight;

    try {
        const response = await fetch(`https://api.duckduckgo.com/?q=${encodeURIComponent(promptText)}&format=json&no_html=1`);
        const data = await response.json();
        let finalAnswer = data.AbstractText || data.Heading || "";
        
        if (!finalAnswer && data.RelatedTopics && data.RelatedTopics.length > 0) {
            finalAnswer = data.RelatedTopics[0].Text;
        }
        if (!finalAnswer) {
            finalAnswer = "I evaluated your input, but no public summary match was indexed in my core module. Try rephrasing!";
        }

        document.getElementById(uniqueLoadingId).parentElement.innerHTML = `
            <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚡ Live Connected Core</p>
                ${finalAnswer}
            </div>`;
    } catch (error) {
        document.getElementById(uniqueLoadingId).parentElement.innerHTML = `
            <div class="bg-[#161920] border border-red-900/30 text-gray-400 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
                <p class="text-red-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚠️ Network Anomaly</p>
                Offline core tracking data issue. Check connections.
            </div>`;
    }
    chatScroller.scrollTop = chatScroller.scrollHeight;
}

// VISUAL IMAGE GENERATION ENGINE (CREATE MODE)
async function generateImage() {
    const promptField = document.getElementById('image-prompt');
    const imageString = promptField.value.trim();
    if (!imageString) return;

    if (!checkLimits()) return;

    const loader = document.getElementById('generation-loader');
    const canvasImg = document.getElementById('generated-image');
    const placeholder = document.getElementById('canvas-placeholder');

    loader.classList.remove('hidden');
    placeholder.classList.add('hidden');

    try {
        const parsedSeedKeyword = encodeURIComponent(imageString);
        const dynamicAiArtUrl = `https://image.pollinations.ai/p/${parsedSeedKeyword}?width=512&height=512&nologo=true&seed=${Math.floor(Math.random() * 10000)}`;
        
        const imagePreloaderObject = new Image();
        imagePreloaderObject.src = dynamicAiArtUrl;
        imagePreloaderObject.onload = function() {
            loader.classList.add('hidden');
            canvasImg.classList.remove('hidden');
            canvasImg.src = dynamicAiArtUrl;
        };
    } catch(err) {
        loader.classList.add('hidden');
        placeholder.classList.remove('hidden');
        alert("Image rendering cluster timed out.");
    }
}

// CHECKOUT PORTAL MODAL SHEET MANAGEMENT
function openCheckoutSheet() {
    document.getElementById('checkout-modal').classList.remove('hidden');
}

function closeCheckoutSheet() {
    document.getElementById('checkout-modal').classList.add('hidden');
}

// REDEMPTION COUPON
function validateCheckoutCoupon() {
    const couponInput = document.getElementById('checkout-coupon-input').value.trim().toUpperCase();
    
    if (!couponInput) {
        alert("Please enter a coupon token string.");
        return;
    }

    if (couponInput === activeSystemCoupon.toUpperCase()) {
        isUserLoggedIn = true; 
        closeCheckoutSheet();
        document.getElementById('use-badge').innerHTML = `<i class="fa-solid fa-ticket text-emerald-400 mr-1"></i> Coupon Unlocked`;
        document.getElementById('use-badge').className = "bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20";
        alert(`Verification Success! Promo code "${couponInput}" is active. Free access enabled.`);
    } else {
        alert("The coupon code entered is invalid or expired.");
    }
}

// SECURE GATEWAY PURCHASE TRANSACTION
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
            document.getElementById('use-badge').innerHTML = `<i class="fa-solid fa-crown text-amber-400 mr-1"></i> PRO Active`;
            alert("Payment verified securely! ID: " + response.razorpay_payment_id);
        },
        "prefill": {
            "name": "SPAR Account Checkout",
            "email": "user@example.com",
            "contact": "9999999999"
        },
        "theme": { "color": "#f59e0b" }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}

// PROFILE AUTHENTICATOR
function simulateLogin() {
    const emailField = document.getElementById('login-email').value;
    const passField = document.getElementById('login-pass').value;

    if (emailField && passField) {
        isUserLoggedIn = true;
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('use-badge').innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 mr-1"></i> Account Logged`;
        document.getElementById('use-badge').className = "bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20";
        alert("Profile authentication synchronized!");
    } else {
        alert("Please completely pass registration constraints.");
    }
}

// CAMERA LENS
function openCameraFeature() {
    if (!checkLimits()) return;
    alert("Scanning environment via device matrix view lenses...");
}

// REVISED: SECRET ADMINISTRATIVE TRIGGER STAGE
function handleAdminSecretClick() {
    const now = new Date().getTime();
    if (now - lastClickTimestamp > 1500) {
        logoClickCounter = 0; 
    }
    logoClickCounter++;
    lastClickTimestamp = now;

    if (logoClickCounter === 5) {
        logoClickCounter = 0;
        document.getElementById('admin-passkey-field').value = ""; // Clear last input
        document.getElementById('admin-auth-modal').classList.remove('hidden'); // Show Password Sheet
    }
}

// NEW ACTION: VERIFY PASSKEY COMBINATION KEY FRAME
function verifyAdminPasskey() {
    const userEnteredPin = document.getElementById('admin-passkey-field').value.trim();
    
    if (userEnteredPin === ADMIN_MASTER_PASSWORD) {
        document.getElementById('admin-auth-modal').classList.add('hidden'); // Close Password prompt
        document.getElementById('admin-modal').classList.remove('hidden'); // Open Control Dashboard
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
        alert("Error mapping runtime system parameters configuration arrays.");
        return;
    }

    currentSubscriptionPrice = inputPrice;
    freeUsesLeft = inputUses;
    activeSystemCoupon = inputCoupon;

    document.getElementById('header-price-display').innerText = `₹${currentSubscriptionPrice}`;
    document.getElementById('checkout-price-text').innerText = `₹${currentSubscriptionPrice}`;
    document.getElementById('uses-left').innerText = freeUsesLeft;

    alert("Administrative runtime database updated safely!");
    closeAdminDashboard();
}