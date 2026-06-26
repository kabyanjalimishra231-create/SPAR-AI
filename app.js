// TRACKING VARIABLES FOR FREE USES AND SYSTEM LOCKS
let freeUsesLeft = 3; 
let isUserLoggedIn = false;
const RAZORPAY_KEY_ID = "rzp_test_T5uOdu0zh2G02R"; 

// NAVIGATION: CONTROL TABS AND VIEWS
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

// SECURITY CONTROLLER: COUNT SYSTEM ACTIONS AND TRIGGER LOGIN SCREEN
function checkLimits() {
    if (isUserLoggedIn) return true; // Logged-in users bypass completely

    freeUsesLeft--;
    if (freeUsesLeft <= 0) {
        document.getElementById('uses-left').innerText = "0";
        document.getElementById('login-modal').classList.remove('hidden'); // Force modal popup
        return false;
    }
    document.getElementById('uses-left').innerText = freeUsesLeft;
    return true;
}

// CHAT FEATURE: RESPOND TO TEXT MESSAGES INSTANTLY
function handleTextMessage() {
    const inputField = document.getElementById('chat-input');
    const promptText = inputField.value.trim();
    if (!promptText) return;

    if (!checkLimits()) return; // Exit logic if blocked by login wall

    const chatScroller = document.getElementById('chat-scroller');
    
    // Create and attach User Chat Bubble
    const userBubble = document.createElement('div');
    userBubble.className = "flex justify-end mb-2";
    userBubble.innerHTML = `
        <div class="bg-amber-500 text-slate-950 px-4 py-2.5 rounded-2xl rounded-tr-none text-sm font-medium max-w-[85%] shadow-md">
            ${promptText}
        </div>`;
    chatScroller.appendChild(userBubble);
    inputField.value = ""; // Empty typing line box

    // Generate lightning fast simulated response
    setTimeout(() => {
        const aiBubble = document.createElement('div');
        aiBubble.className = "flex justify-start mb-2";
        aiBubble.innerHTML = `
            <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] leading-relaxed shadow-sm">
                <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1">⚡ Ultra-Fast Core</p>
                I have processed your query immediately. Here is the highly accurate solution compiled from our lightning server clusters.
            </div>`;
        chatScroller.appendChild(aiBubble);
        chatScroller.scrollTop = chatScroller.scrollHeight; // Auto-scroll to view bottom
    }, 400); 
}

// CREATE MODE: GENERIC IMAGE CANVAS MAKER
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

    // Simulate high-speed model art generator rendering
    setTimeout(() => {
        loader.classList.add('hidden');
        canvasImg.classList.remove('hidden');
        // Displays a beautiful abstract art design image from stock database
        canvasImg.src = `https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop`;
    }, 1800); 
}

// CAMERA SEARCH: CLICK PHOTO ANALYSIS SIMULATOR
function openCameraFeature() {
    if (!checkLimits()) return;
    
    alert("Camera Activated! Scanning visual frame components...");
    
    const chatScroller = document.getElementById('chat-scroller');
    const cameraBubble = document.createElement('div');
    cameraBubble.className = "flex justify-start mb-2";
    cameraBubble.innerHTML = `
        <div class="bg-[#161920] border border-gray-800 text-gray-200 px-4 py-2.5 rounded-2xl rounded-tl-none text-sm max-w-[85%] shadow-sm">
            <p class="text-amber-400 text-[10px] font-bold uppercase tracking-wider mb-1"><i class="fa-solid fa-camera mr-1"></i> Camera Lens Input</p>
            <div class="w-full h-32 bg-gray-800 rounded-lg mb-2 flex flex-col items-center justify-center text-xs text-gray-500 border border-dashed border-gray-700">
                <i class="fa-solid fa-image text-lg mb-1"></i> [ Analyzed Picture Frame Matrix ]
            </div>
            I have analyzed your clicked picture frame. Everything matches perfectly. How can I assist you further with this scene item?
        </div>`;
    chatScroller.appendChild(cameraBubble);
    chatScroller.scrollTop = chatScroller.scrollHeight;
}

// USER ACCREDITATION LOGIC: UNLOCK LIMIT WALL
function simulateLogin() {
    const emailField = document.getElementById('login-email').value;
    const passField = document.getElementById('login-pass').value;

    if (emailField && passField) {
        isUserLoggedIn = true;
        document.getElementById('login-modal').classList.add('hidden');
        document.getElementById('use-badge').innerHTML = `<i class="fa-solid fa-circle-check text-emerald-400 mr-1"></i> Unlimited Access`;
        document.getElementById('use-badge').className = "bg-emerald-500/10 text-emerald-400 text-xs font-semibold px-2.5 py-1 rounded-full border border-emerald-500/20";
        alert("Login successful! Welcome back.");
    } else {
        alert("Please type a valid email and password profile to proceed.");
    }
}

// INTEGRATED GATEWAY: PAYMENT CORE PORTAL HANDLER
function triggerPayment() {
    var options = {
        "key": RAZORPAY_KEY_ID,
        "amount": "29900", // ₹299.00 formatted in currency subunits (paise)
        "currency": "INR",
        "name": "SPAR AI Studio",
        "description": "Unlock Pro Unlimited Core Access",
        "image": "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=100",
        "handler": function (response) {
            alert("Payment completed successfully! Reference: " + response.razorpay_payment_id);
        },
        "prefill": {
            "name": "SPAR Developer Account",
            "email": "user@example.com",
            "contact": "9999999999"
        },
        "theme": {
            "color": "#f59e0b" // Matches beautiful golden premium styling accents
        }
    };
    var rzp1 = new Razorpay(options);
    rzp1.open();
}