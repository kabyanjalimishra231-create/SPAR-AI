// Hardcoded Exclusive Admin ID Key
const AUTHORIZED_ADMIN_PHONE = "9214605427"; 
let isAdminAuthenticated = false;

const initialFreeLimit = 10;
const totalMaxFreeMessages = 20;
let messageCount = 0;
let currentTier = "free"; 
let isLoggedIn = false;

// PASTE YOUR WORKING GROQ KEY IN THE QUOTATION MARKS BELOW:
const GROQ_API_KEY = "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"; 
const PROXY_URL = "https://thingproxy.freeboard.io/fetch/";
const API_ENDPOINT = "https://api.groq.com/openai/v1/chat/completions";
const GATEWAY_URL = window.location.protocol === "file:" ? API_ENDPOINT : PROXY_URL + API_ENDPOINT;

function checkDailyLimit() {
    const savedTier = localStorage.getItem("spar_ai_subscription_tier");
    if (savedTier) currentTier = savedTier;

    if (localStorage.getItem("spar_ai_user_email")) isLoggedIn = true;

    const today = new Date().toDateString();
    if (localStorage.getItem("spar_ai_date") !== today) {
        localStorage.setItem("spar_ai_date", today);
        localStorage.setItem("spar_ai_count", "0");
        messageCount = 0;
    } else {
        messageCount = parseInt(localStorage.getItem("spar_ai_count") || "0", 10);
    }
    updateBadge();
    renderActiveCouponDescriptor();
}

function openAdminModal() {
    document.getElementById('adminModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function openCouponManagerModal() {
    if(!isAdminAuthenticated) return;
    document.getElementById('couponManagerModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function verifyAdminPhone() {
    const inputKey = document.getElementById('adminPhoneInput').value.trim();
    if (inputKey === AUTHORIZED_ADMIN_PHONE) {
        isAdminAuthenticated = true;
        
        document.getElementById('restrictedAdminPanel').style.display = 'flex';
        document.getElementById('adminLogoutBtn').style.display = 'block';
        document.getElementById('adminCouponBtn').style.display = 'block';
        document.getElementById('adminGateLink').style.display = 'none';
        
        document.getElementById('adminPhoneInput').value = '';
        closeAllModals();
        printSystemLog("🛡️ Access Granted. Administrator workspace parameters compiled.");
    } else {
        alert("Authorization Denied: Provided credential key structure does not match host record variables.");
        closeAllModals();
    }
}

function logoutAdmin() {
    isAdminAuthenticated = false;
    document.getElementById('restrictedAdminPanel').style.display = 'none';
    document.getElementById('adminLogoutBtn').style.display = 'none';
    document.getElementById('adminCouponBtn').style.display = 'none';
    document.getElementById('adminGateLink').style.display = 'block';
    
    document.getElementById('modelSelect').value = "llama-3.1-8b-instant";
    document.body.className = "";
    document.getElementById('themeSelect').value = "dark";
    
    printSystemLog("🔒 Administrator session closed. Control configurations reset to factory state.");
}

function saveAdminCoupon() {
    const codeInput = document.getElementById('newCouponCode').value.trim().toUpperCase();
    const tierInput = document.getElementById('newCouponTier').value;

    if (codeInput === "") {
        alert("Please declare a string representation value.");
        return;
    }

    localStorage.setItem("spar_admin_coupon_code", codeInput);
    localStorage.setItem("spar_admin_coupon_tier", tierInput);
    
    document.getElementById('newCouponCode').value = '';
    renderActiveCouponDescriptor();
    alert(`Coupon Code [ ${codeInput} ] successfully generated into system rules!`);
}

function renderActiveCouponDescriptor() {
    const savedCode = localStorage.getItem("spar_admin_coupon_code");
    const savedTier = localStorage.getItem("spar_admin_coupon_tier");
    const displayBlock = document.getElementById('activeCouponList');

    if(savedCode && savedTier) {
        displayBlock.innerHTML = `<b>Live App Rule:</b> Code <span style="color:#f9e2af; font-weight:bold;">${savedCode}</span> grants full access to the <b>${savedTier.toUpperCase()}</b> Tier pipeline.`;
    } else {
        displayBlock.textContent = "No active custom deployment code saved.";
    }
}

function redeemUserCoupon() {
    const userEntered = document.getElementById('userCouponInput').value.trim().toUpperCase();
    const savedCode = localStorage.getItem("spar_admin_coupon_code");
    const savedTier = localStorage.getItem("spar_admin_coupon_tier");

    if (userEntered === "") {
        alert("Input code sector cannot pass blank.");
        return;
    }

    if (savedCode && userEntered === savedCode) {
        purchaseTier(savedTier);
        document.getElementById('userCouponInput').value = '';
        alert(`🎉 Promotion accepted! You have successfully assigned the ${savedTier.toUpperCase()} tier bundle.`);
    } else {
        alert("Validation processing error: Invalid or inactive custom coupon sequence string.");
    }
}

function updateBadge() {
    const badge = document.getElementById('tierBadge');
    const sidebarBadge = document.getElementById('sidebarPlanBadge');
    
    document.getElementById('cardFree').classList.remove('active-plan');
    document.getElementById('cardPlus').classList.remove('active-plan');
    document.getElementById('cardUltra').classList.remove('active-plan');

    if (currentTier === "plus") {
        sidebarBadge.textContent = "Plan: Spar Plus ⚡";
        sidebarBadge.style.color = "#89b4fa";
        badge.textContent = "Plus Active (Unlimited)";
        badge.style.background = "#89b4fa";
        badge.style.color = "#11111b";
        document.getElementById('cardPlus').classList.add('active-plan');
    } else if (currentTier === "ultra") {
        sidebarBadge.textContent = "Plan: Pro Ultra 🔥";
        sidebarBadge.style.color = "#fab387";
        badge.textContent = "Ultra Active (Priority)";
        badge.style.background = "linear-gradient(135deg, #f9e2af 0%, #fab387 100%)";
        badge.style.color = "#11111b";
        document.getElementById('cardUltra').classList.add('active-plan');
    } else {
        sidebarBadge.textContent = "Plan: Free Basic";
        sidebarBadge.style.color = "#a6adc8";
        document.getElementById('cardFree').classList.add('active-plan');
        badge.style.background = "var(--bg-bubble)";
        badge.style.color = "#a6adc8";

        if (!isLoggedIn) {
            const remainingToLogin = initialFreeLimit - messageCount;
            if (remainingToLogin <= 0) {
                badge.textContent = "Login Required";
                showLoginModal();
            } else {
                badge.textContent = `Free Trial (${remainingToLogin} left)`;
            }
        } else {
            const remainingTotal = totalMaxFreeMessages - messageCount;
            badge.textContent = remainingTotal > 0 ? `Free Tier (${remainingTotal} left)` : `Daily Limit Reached`;
        }
    }
}

function showLoginModal() {
    document.getElementById('loginModal').style.display = 'block';
    document.getElementById('overlay').style.display = 'block';
}

function handleEmailLogin() {
    const emailInput = document.getElementById('userEmailInput').value.trim();
    if (emailInput === "" || !emailInput.includes("@")) {
        alert("Please enter a valid address payload.");
        return;
    }
    isLoggedIn = true;
    localStorage.setItem("spar_ai_user_email", emailInput);
    closeAllModals();
    updateBadge();
    printSystemLog(`✓ Access assigned to ${emailInput}. Extra 10 daily system queries opened.`);
}

function openPlansModal() { 
    document.getElementById('plansModal').style.display = 'block'; 
    document.getElementById('overlay').style.display = 'block'; 
}

function closeAllModals() { 
    document.getElementById('plansModal').style.display = 'none'; 
    document.getElementById('adminModal').style.display = 'none'; 
    document.getElementById('couponManagerModal').style.display = 'none'; 
    if (currentTier !== "free" || isLoggedIn || messageCount < initialFreeLimit) {
        document.getElementById('loginModal').style.display = 'none';
        document.getElementById('overlay').style.display = 'none'; 
    }
}

function purchaseTier(tier) {
    currentTier = tier;
    localStorage.setItem("spar_ai_subscription_tier", tier);
    updateBadge();
    closeAllModals();
    printSystemLog(`🎉 System configurations successfully switched to **${tier.toUpperCase()}** metrics.`);
}

function handleModelChange() {
    const modelSelect = document.getElementById('modelSelect');
    const selectedModel = modelSelect.value;

    if (selectedModel === "llama-3.3-70b-specdec" && currentTier === "free") {
        alert("The Llama 3.3 70B asset demands an active Plus or Ultra bundle.");
        modelSelect.value = "llama-3.1-8b-instant";
    } else if (selectedModel === "mixtral-8x7b-32768" && currentTier !== "ultra") {
        alert("The Mixtral Deep-Reasoning engine is strictly dedicated to Ultra tier members.");
        modelSelect.value = "llama-3.1-8b-instant";
    }
}

function handleThemeChange() {
    const val = document.getElementById('themeSelect').value;
    if (val === "oled" && currentTier !== "ultra") {
        alert("OLED Black layouts are optimized exclusively for Ultra members.");
        document.getElementById('themeSelect').value = "dark";
        return;
    }
    document.body.className = "";
    if(val === "light") document.body.classList.add('light-theme');
    if(val === "oled") document.body.classList.add('oled-theme');
}

function printSystemLog(text) {
    const chatMessages = document.getElementById('chatMessages');
    const systemDiv = document.createElement('div');
    systemDiv.className = 'message ai-message';
    systemDiv.style.borderLeft = '4px solid var(--accent-color)';
    systemDiv.textContent = text;
    chatMessages.appendChild(systemDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function startVoiceRecognition() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
        alert("Voice features unsupported in this window environment.");
        return;
    }
    const recognition = new SpeechRecognition();
    const micBtn = document.getElementById('micBtn');
    micBtn.textContent = "🛑";
    
    recognition.onresult = function(event) {
        document.getElementById('userInput').value = event.results[0][0].transcript;
    };
    recognition.onend = function() { micBtn.textContent = "🎤"; };
    recognition.start();
}

function speakText(text) {
    if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        window.speechSynthesis.speak(utterance);
    }
}

function toggleMenu() { document.getElementById('sidebar').classList.toggle('active'); }

async function fetchAIResponse(userPrompt) {
    const selectedModel = document.getElementById('modelSelect').value;
    
    // LIVE DATA & TIMING INJECTION SECTION (Lines 201-210)
    const now = new Date();
    const dateString = now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const timeString = now.toLocaleTimeString('en-US');
    const contextPrompt = `You are SPAR-AI Studio, an advanced live chat assistant. Real-Time Tracking Data: Today is completely verified as ${dateString}. The current local live clock tracking time is exactly ${timeString}. Use this explicit timing parameter context if the user asks any temporal, schedule, current data, time, or date-related inquiries.`;

    try {
        const response = await fetch(GATEWAY_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + GROQ_API_KEY
            },
            body: JSON.stringify({
                model: selectedModel,
                messages: [
                    { role: "system", content: contextPrompt },
                    { role: "user", content: userPrompt }
                ]
            })
        });

        const data = await response.json();
        
        if (data && data.error) {
            return `⚠️ Groq API Error: ${data.error.message}`;
        }

        if (data && data.choices && data.choices[0].message.content) {
            return data.choices[0].message.content.trim();
        }
        
        return "The interface encountered an unreadable network data transmission. Response received: " + JSON.stringify(data);
    } catch (error) {
        return "Network connection routing path exception: " + error.message;
    }
}

async function sendMessage() {
    if (currentTier === "free") {
        if (!isLoggedIn && messageCount >= initialFreeLimit) { showLoginModal(); return; }
        if (isLoggedIn && messageCount >= totalMaxFreeMessages) { openPlansModal(); return; }
    }

    const inputField = document.getElementById('userInput');
    const messageText = inputField.value.trim();
    if (messageText === '') return;

    const chatMessages = document.getElementById('chatMessages');
    const userDiv = document.createElement('div');
    userDiv.className = 'message user-message';
    userDiv.textContent = messageText;
    chatMessages.appendChild(userDiv);

    inputField.value = '';
    chatMessages.scrollTop = chatMessages.scrollHeight;

    if (currentTier === "free") {
        messageCount++;
        localStorage.setItem("spar_ai_count", messageCount.toString());
        updateBadge();
    }

    const aiDiv = document.createElement('div');
    aiDiv.className = 'message ai-message';
    aiDiv.textContent = "Spar AI is parsing query parameters...";
    chatMessages.appendChild(aiDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;

    const realAIResponse = await fetchAIResponse(messageText);
    aiDiv.textContent = realAIResponse;
    
    const audioBtn = document.createElement('button');
    audioBtn.className = 'speak-btn';
    audioBtn.textContent = "🔊 Audio playback";
    audioBtn.onclick = function() { speakText(realAIResponse); };
    aiDiv.appendChild(audioBtn);

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

document.getElementById('userInput').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') sendMessage();
});

checkDailyLimit();