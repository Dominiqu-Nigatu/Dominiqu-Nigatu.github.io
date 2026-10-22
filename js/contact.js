// ==================== EmailJS Setup ====================
// Initialize EmailJS - Replace with your actual Public Key from emailjs.com
const PUBLIC_KEY = "H_gNQYLMtVDmthFjA"; // Get this from EmailJS dashboard
const SERVICE_ID = "service_i11llha"; // Or your chosen service ID
const TEMPLATE_ID = "template_okwdzil"; // Or your chosen template ID
const EMAILJS_READY = Boolean(PUBLIC_KEY && SERVICE_ID && TEMPLATE_ID);
let emailjsLoaded = false;
let emailjsLoadPromise = null;

function loadEmailJSSDK() {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Browser environment not available"));
  }

  if (typeof window.emailjs !== "undefined") {
    return Promise.resolve(window.emailjs);
  }

  if (emailjsLoadPromise) {
    return emailjsLoadPromise;
  }

  emailjsLoadPromise = new Promise((resolve, reject) => {
    const existingScript = document.querySelector(
      'script[data-emailjs-sdk="true"]',
    );
    if (existingScript) {
      existingScript.addEventListener("load", () => resolve(window.emailjs));
      existingScript.addEventListener("error", () =>
        reject(new Error("Failed to load EmailJS SDK")),
      );
      return;
    }

    const script = document.createElement("script");
    script.src =
      "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
    script.async = true;
    script.dataset.emailjsSdk = "true";
    script.onload = () => resolve(window.emailjs);
    script.onerror = () => reject(new Error("Failed to load EmailJS SDK"));
    document.head.appendChild(script);
  });

  return emailjsLoadPromise;
}

function initEmailJS() {
  if (
    emailjsLoaded ||
    typeof window.emailjs === "undefined" ||
    !EMAILJS_READY
  ) {
    return emailjsLoaded;
  }

  if (typeof window.emailjs.init === "function") {
    window.emailjs.init({ publicKey: PUBLIC_KEY });
    emailjsLoaded = true;
  }

  return emailjsLoaded;
}

// Initialize only if the EmailJS library and config are available
if (typeof window !== "undefined") {
  loadEmailJSSDK()
    .then(() => initEmailJS())
    .catch((error) => console.warn("EmailJS SDK could not be loaded:", error));
}

// ==================== Form Handling ====================
const contactForm = document.getElementById("contactForm");

contactForm.addEventListener("submit", async function (e) {
  e.preventDefault();

  // Get form data
  const nameInput = this.querySelector('input[placeholder="Your Name"]');
  const emailInput = this.querySelector('input[placeholder="Your Email"]');
  const subjectInput = this.querySelector('input[placeholder="Subject"]');
  const messageInput = this.querySelector(
    'textarea[placeholder="Your Message"]',
  );

  const data = {
    name: nameInput.value,
    email: emailInput.value,
    subject: subjectInput.value,
    message: messageInput.value,
  };

  // Validation
  if (!data.name || !data.email || !data.subject || !data.message) {
    showNotification("Please fill in all fields", "error");
    return;
  }

  if (!isValidEmail(data.email)) {
    showNotification("Please enter a valid email", "error");
    return;
  }

  const submitBtn = this.querySelector(".btn");
  const originalText = submitBtn.textContent;
  submitBtn.textContent = "Sending...";
  submitBtn.disabled = true;

  // Check if EmailJS is initialized
  try {
    await loadEmailJSSDK();
  } catch (error) {
    showNotification(
      "⚠️ EmailJS could not load. Check your internet connection and reload.",
      "error",
    );
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    return;
  }

  if (!initEmailJS()) {
    showNotification(
      "⚠️ EmailJS is not ready yet. Please reload and try again.",
      "error",
    );
    submitBtn.textContent = originalText;
    submitBtn.disabled = false;
    return;
  }

  // Send email via EmailJS
  window.emailjs
    .send(SERVICE_ID, TEMPLATE_ID, {
      from_name: data.name,
      from_email: data.email,
      subject: data.subject,
      message: data.message,
      reply_to: data.email,
    })
    .then(
      function (response) {
        console.log("SUCCESS:", response);
        showNotification(
          "✅ Message sent successfully! I'll get back to you soon.",
          "success",
        );
        contactForm.reset();
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      },
      function (error) {
        console.log("FAILED:", error);
        const errorDetails =
          error?.text || error?.message || "Unknown EmailJS error";
        showNotification(`❌ Failed to send message: ${errorDetails}`, "error");
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      },
    );
});

// ==================== Utility Functions ====================
function isValidEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.setAttribute("role", type === "error" ? "alert" : "status");
  notification.textContent = message;

  const bgColor = type === "success" ? "#43e97b" : "#ff6b6b";
  const borderColor = type === "success" ? "#2bc47d" : "#ff5252";

  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${bgColor};
        color: white;
        padding: 16px 24px;
        border-radius: 8px;
        border-left: 4px solid ${borderColor};
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
        z-index: 9999;
        animation: slideIn 0.3s ease-out;
        font-weight: 500;
        font-size: 14px;
        max-width: 400px;
        word-wrap: break-word;
    `;

  document.body.appendChild(notification);

  setTimeout(() => {
    notification.style.animation = "slideOut 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

