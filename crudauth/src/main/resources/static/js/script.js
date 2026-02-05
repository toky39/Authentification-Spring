// ===== Form Validation =====
document.addEventListener('DOMContentLoaded', function() {
    setupFormValidation();
    setupDeleteConfirmation();
    setupInputAnimation();
});

function setupFormValidation() {
    const forms = document.querySelectorAll('form');
    
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            if (!validateForm(this)) {
                e.preventDefault();
            }
        });
    });
}

function validateForm(form) {
    const inputs = form.querySelectorAll('input[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            showError(input, 'Ce champ est requis');
            isValid = false;
        } else {
            removeError(input);
        }
        
        // Validation spécifique par type
        if (input.type === 'password' && input.value.length < 6) {
            showError(input, 'Le mot de passe doit contenir au moins 6 caractères');
            isValid = false;
        } else if (input.type === 'password') {
            removeError(input);
        }
    });
    
    return isValid;
}

function showError(input, message) {
    input.classList.add('error');
    
    let errorDiv = input.nextElementSibling;
    if (!errorDiv || !errorDiv.classList.contains('error-text')) {
        errorDiv = document.createElement('div');
        errorDiv.className = 'error-text';
        input.parentNode.insertBefore(errorDiv, input.nextSibling);
    }
    errorDiv.textContent = message;
    errorDiv.style.color = '#dc2626';
    errorDiv.style.fontSize = '12px';
    errorDiv.style.marginTop = '5px';
}

function removeError(input) {
    input.classList.remove('error');
    const errorDiv = input.nextElementSibling;
    if (errorDiv && errorDiv.classList.contains('error-text')) {
        errorDiv.remove();
    }
}

// ===== Delete Confirmation =====
function setupDeleteConfirmation() {
    const deleteButtons = document.querySelectorAll('.delete-btn');
    
    deleteButtons.forEach(button => {
        button.addEventListener('click', function(e) {
            if (!confirm('Êtes-vous sûr de vouloir supprimer cet utilisateur ?')) {
                e.preventDefault();
            }
        });
    });
}

// ===== Input Animation =====
function setupInputAnimation() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', function() {
            this.parentElement.classList.add('focused');
        });
        
        input.addEventListener('blur', function() {
            if (!this.value) {
                this.parentElement.classList.remove('focused');
            }
        });
    });
}

// ===== Show Toast Messages =====
function showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        background: ${type === 'error' ? '#ef4444' : type === 'success' ? '#10b981' : '#3b82f6'};
        color: white;
        border-radius: 8px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
        z-index: 9999;
        animation: slideIn 0.3s ease;
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ===== Password Strength Indicator =====
function setupPasswordStrengthMeter() {
    const passwordInputs = document.querySelectorAll('input[type="password"]');
    
    passwordInputs.forEach(input => {
        input.addEventListener('input', function() {
            const strength = calculatePasswordStrength(this.value);
            updatePasswordStrengthUI(this, strength);
        });
    });
}

function calculatePasswordStrength(password) {
    let strength = 0;
    
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^a-zA-Z0-9]/.test(password)) strength++;
    
    return strength;
}

function updatePasswordStrengthUI(input, strength) {
    let strengthMeter = input.nextElementSibling;
    
    if (!strengthMeter || !strengthMeter.classList.contains('strength-meter')) {
        strengthMeter = document.createElement('div');
        strengthMeter.className = 'strength-meter';
        input.parentNode.insertBefore(strengthMeter, input.nextSibling);
    }
    
    const colors = ['#ef4444', '#f59e0b', '#eab308', '#84cc16', '#10b981'];
    const labels = ['Très faible', 'Faible', 'Moyen', 'Fort', 'Très fort'];
    
    strengthMeter.style.cssText = `
        height: 4px;
        background: ${colors[strength - 1] || '#ccc'};
        border-radius: 2px;
        margin-top: 5px;
        transition: all 0.3s ease;
    `;
}

// ===== Table Search/Filter =====
function setupTableFilter() {
    const searchInput = document.getElementById('userSearch');
    if (!searchInput) return;
    
    const table = document.querySelector('table tbody');
    
    searchInput.addEventListener('input', function() {
        const query = this.value.toLowerCase();
        const rows = table.querySelectorAll('tr');
        
        rows.forEach(row => {
            const text = row.textContent.toLowerCase();
            row.style.display = text.includes(query) ? '' : 'none';
        });
    });
}

// ===== Copy to Clipboard =====
function copyToClipboard(text) {
    navigator.clipboard.writeText(text).then(() => {
        showToast('Copié !', 'success', 2000);
    }).catch(err => {
        console.error('Erreur:', err);
    });
}

// ===== Init on DOM Ready =====
document.addEventListener('DOMContentLoaded', function() {
    setupPasswordStrengthMeter();
    setupTableFilter();
});

// ===== CSS Animations for Toast =====
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
    
    input.error {
        border-color: #ef4444 !important;
        background: #fef2f2;
    }
    
    .form-group.focused label {
        color: #4f46e5;
    }
`;
document.head.appendChild(style);
