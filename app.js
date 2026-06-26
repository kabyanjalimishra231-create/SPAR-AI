// ADMINISTRATIVE DEFAULT PARAMETERS
let currentSubscriptionPrice = 299; // Set in INR base values
let freeUsesLeft = 3; 
let activeSystemCoupon = "VA1FREE"; // Default live fallback voucher
let isUserLoggedIn = false;

// INTERNAL CLICK TRACKER MECHANISM FOR HIDDEN PORTAL ACCESS
let logoClickCounter = 0;
let lastClickTimestamp = 0;
const RAZORPAY_KEY_ID = "rzp_test_T5uOdu0zh2G02R"; 

// TAB VIEWS SYSTEM CONTROLLER
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

// SECURITY LOGIC GATEWAY COUNTER
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

// CHAT HANDLER INTERFACE
function handleTextMessage() {
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

    setTimeout(() => {
        const aiBubble = document.createElement('div');
        aiBubble.className = "flex justify-start mb-2";
        aiBubble.innerHTML = `
            <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚡ Ultra-Fast Core</p>
                Processed data query instantly. SPAR optimization protocols executed correctly with 0ms delay.
            </div>`;
        chatScroller.appendChild(aiBubble);
        chatScroller.scrollTop = chatScroller.scrollHeight;
    }, 400); 
}

// IMAGE CONVERSION RENDER CREATOR
function generateImage() {
    const promptField = document.getElementById('image-prompt');
    const imageString = promptField.value.trim();
    if (!imageString) return;

    if (!checkLimits()) return;

    const loader = document.getElementById('generation-loader');
    const canvasImg = document.getElementById('generated-image');
    const placeholder = document.getElementById('canvas-placeholder');

    loader.classList.remove('hidden');
    placeholder.classList.add('hidden');

    setTimeout(() => {
        loader.classList.add('hidden');
        canvasImg.classList.remove('hidden');
        canvasImg.src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop`;
    }, 1800); 
}

// REVISED VOUCHER / COUPON RECOGNITION HANDLING SUBSYSTEM
function applyUserCoupon() {
    const rawInput = document.getElementById('coupon-entry-input').value.trim().toUpperCase();
    
    if (rawInput === activeSystemCoupon.toUpperCase()) {
        isUserLoggedIn = true; 
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('use-badge').innerHTML = `<i class="fa-solid fa-ticket text-emerald-400 mr-1"></i> Coupon Active`;
        document.getElementById('use-badge').className = "bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20";
        alert(`Success! Coupon "${rawInput}" applied. Free unlimited access unlocked.`);
    } else {
        alert("Invalid coupon code reference profile. Please double check and re-apply.");
    }
}

// ACCOUNT AUTHENTICATOR METHOD
function simulateLogin() {
    const emailField = document.getElementById('login-email').value;
    const passField = document.getElementById('login-pass').value;

    if (emailField && passField) {
        isUserLoggedIn = true;
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('use-badge').innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 mr-1"></i> Verified User`;
        document.getElementById('use-badge').className = "bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20";
        alert("Login validated successfully!");
    } else {
        alert("Please completely satisfy authorization entry details.");
    }
}

// CAMERA SCAN METHOD
function openCameraFeature() {
    if (!checkLimits()) return;
    alert("Camera interface engine scanning local elements array variables...");
}

// RAZORPAY ENGINE PAYMENTS DEPLOYMENT HANDLER (DYNAMIC SECTOR)
function triggerPayment() {
    const computedPaiseAmount = currentSubscriptionPrice * 100; // Translate to paise structure base currency
    
    var options = {
        "key": RAZORPAY_KEY_ID,
        "amount": computedPaiseAmount.toString(),
        "currency": "INR",
        "name": "SPAR AI Studio",
        "description": "Unlock Pro Unlimited System Access Environment",
        "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100",
        "handler": function (response) {
            alert("Payment verified! Reference: " + response.razorpay_payment_id);
            isUserLoggedIn = true;
            document.getElementById('use-badge').innerHTML = `<i class="fa-solid fa-crown text-amber-400 mr-1"></i> PRO Tier Active`;
        },
        "prefill": {
            "name": "SPAR Mobile Dev Account User",
            "email": "user@example.com",
            "contact": "9999999999"
        },
        "theme": { "color": "#f59e0b" }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}

// NEW: ADMINISTRATOR DASHBOARD SECRET INTERCEPT SYSTEM
function handleAdminSecretClick() {
    const now = new Date().getTime();
    if (now - lastClickTimestamp > 1500) {
        logoClickCounter = 0; // Reset counter window threshold if idle
    }
    
    logoClickCounter++;
    lastClickTimestamp = now;

    if (logoClickCounter === 5) {
        logoClickCounter = 0;
        document.getElementById('admin-modal').classList.remove('hidden'); // Launch hidden UI
    }
}

function closeAdminDashboard() {
    document.getElementById('admin-modal').classList.add('hidden');
}

// NEW: ADMIN SYSTEM CONFIG COMMIT MUTATOR RUNTIME EXECUTOR
function saveAdminSettings() {
    const inputPrice = parseInt(document.getElementById('admin-price-input').value);
    const inputUses = parseInt(document.getElementById('admin-uses-input').value);
    const inputCoupon = document.getElementById('admin-coupon-input').value.trim();

    if (isNaN(inputPrice) || isNaN(inputUses) || !inputCoupon) {
        alert("Error! Please populate administration controls parsing parameters precisely.");
        return;
    }

    // Rewrite Application Configurations at Runtime Execution
    currentSubscriptionPrice = inputPrice;
    freeUsesLeft = inputUses;
    activeSystemCoupon = inputCoupon;

    // Update Main Screen Frontend Views Instantly
    document.getElementById('header-price-display').innerText = `₹${currentSubscriptionPrice}`;
    document.getElementById('uses-left').innerText = freeUsesLeft;

    alert("Configurations committed to application instance runtime successfully!");
    closeAdminDashboard();
}