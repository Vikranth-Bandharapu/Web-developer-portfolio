/* ==========================================================================
   STACKLY — AUTHENTICATION LOGIC & VALIDATION MODULE
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initRoleSelectors();
  initLoginForm();
  initSignupForm();
  initPasswordStrengthMeter();
});

/* 1. ROLE SELECTOR SWITCHER */
function initRoleSelectors() {
  const roleButtons = document.querySelectorAll('.role-select-btn');
  const roleInput = document.getElementById('selected-role');
  const emailInput = document.getElementById('login-email');

  if (roleButtons.length === 0) return;

  roleButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      roleButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const selectedRole = btn.getAttribute('data-role');
      if (roleInput) roleInput.value = selectedRole;

      if (emailInput) {
        emailInput.placeholder = selectedRole === 'Admin' ? 'admin@company.com' : 'name@company.com';
      }
    });
  });
}

/* 2. UNIVERSAL LOGIN FORM VALIDATION & REDIRECT FOR 2 DASHBOARDS */
function initLoginForm() {
  const loginForm = document.getElementById('login-form');
  if (!loginForm) return;

  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const email = document.getElementById('login-email')?.value.trim();
    const password = document.getElementById('login-password')?.value;
    const selectedRoleVal = document.getElementById('selected-role')?.value || 'Client';
    const role = (selectedRoleVal === 'Admin' || email?.includes('admin')) ? 'Admin' : 'Client';

    let hasError = false;

    // Email validation (accept any non-empty input)
    if (!email) {
      showFieldError('login-email-error', 'Please enter your email address.');
      hasError = true;
    } else {
      clearFieldError('login-email-error');
    }

    // Password validation (accept any non-empty input)
    if (!password) {
      showFieldError('login-password-error', 'Please enter your password.');
      hasError = true;
    } else {
      clearFieldError('login-password-error');
    }

    if (hasError) return;

    // Simulate login session storage for ANY email and password
    const userName = email.includes('@') ? email.split('@')[0].toUpperCase() : 'MEMBER';
    const mockUser = {
      name: userName,
      email: email,
      role: role,
      token: 'stackly_jwt_demo_' + Date.now()
    };

    localStorage.setItem('stackly_user_session', JSON.stringify(mockUser));

    const isAdmin = role === 'Admin';
    const dashTitle = isAdmin ? 'Dashboard 2 (Admin Operations)' : 'Dashboard 1 (Client Portal)';
    showToast(`Authenticated as ${role} (${email}). Launching ${dashTitle}...`, 'success');

    setTimeout(() => {
      if (isAdmin) {
        window.location.href = 'dashboard-admin.html';
      } else {
        window.location.href = 'dashboard.html';
      }
    }, 1000);
  });
}

/* 3. SIGNUP FORM VALIDATION & REDIRECT */
function initSignupForm() {
  const signupForm = document.getElementById('signup-form');
  if (!signupForm) return;

  signupForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('signup-name')?.value.trim();
    const email = document.getElementById('signup-email')?.value.trim();
    const password = document.getElementById('signup-password')?.value;
    const confirmPassword = document.getElementById('signup-confirm-password')?.value;
    const terms = document.getElementById('signup-terms')?.checked;

    let hasError = false;

    if (!name) {
      showFieldError('signup-name-error', 'Full name is required.');
      hasError = true;
    } else {
      clearFieldError('signup-name-error');
    }

    if (!email || !validateEmail(email)) {
      showFieldError('signup-email-error', 'Please provide a valid work email.');
      hasError = true;
    } else {
      clearFieldError('signup-email-error');
    }

    // Strict Password Validation: 8+ chars, uppercase, lowercase, number, special char
    const passwordCriteria = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!password || !passwordCriteria.test(password)) {
      showFieldError('signup-password-error', 'Password requires 8+ chars, 1 uppercase, 1 lowercase, 1 number, and 1 special char.');
      hasError = true;
    } else {
      clearFieldError('signup-password-error');
    }

    if (password !== confirmPassword) {
      showFieldError('signup-confirm-error', 'Passwords do not match.');
      hasError = true;
    } else {
      clearFieldError('signup-confirm-error');
    }

    if (!terms) {
      showFieldError('signup-terms-error', 'You must agree to the Terms of Service.');
      hasError = true;
    } else {
      clearFieldError('signup-terms-error');
    }

    if (hasError) return;

    showToast('Account created successfully! Redirecting to login...', 'success');

    setTimeout(() => {
      window.location.href = 'login.html';
    }, 1500);
  });
}

/* 4. LIVE PASSWORD STRENGTH METER */
function initPasswordStrengthMeter() {
  const passwordInput = document.getElementById('signup-password');
  const meterBar = document.getElementById('password-strength-bar');
  const meterText = document.getElementById('password-strength-text');

  if (!passwordInput || !meterBar || !meterText) return;

  passwordInput.addEventListener('input', () => {
    const val = passwordInput.value;
    let score = 0;

    if (val.length >= 8) score++;
    if (/[A-Z]/.test(val)) score++;
    if (/[a-z]/.test(val)) score++;
    if (/[0-9]/.test(val)) score++;
    if (/[@$!%*?&]/.test(val)) score++;

    let strength = 'Weak';
    let width = '20%';
    let color = '#f43f5e';

    if (score >= 4) {
      strength = 'Strong';
      width = '100%';
      color = '#10b981';
    } else if (score >= 3) {
      strength = 'Medium';
      width = '60%';
      color = '#f59e0b';
    }

    meterBar.style.width = width;
    meterBar.style.backgroundColor = color;
    meterText.textContent = `Strength: ${strength}`;
    meterText.style.color = color;
  });
}

/* HELPER VALIDATION UTILITIES */
function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function showFieldError(elementId, message) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = message;
    el.style.display = 'block';
    el.style.color = '#f43f5e';
    el.style.fontSize = '0.85rem';
    el.style.marginTop = '6px';
  }
}

function clearFieldError(elementId) {
  const el = document.getElementById(elementId);
  if (el) {
    el.textContent = '';
    el.style.display = 'none';
  }
}
