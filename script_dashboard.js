/* =========================================
   SCRIPT_DASHBOARD.JS - CONTROL TOTAL
   ========================================= */

// --- ESTADO GLOBAL ---
let saldoActual = 3000.00;
let saldoVisible = false;
let nombreUsuarioApp = "Cristian"; // Nombre por defecto

// --- AL CARGAR EL DOCUMENTO ---
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar el nombre en la interfaz
    const displayDash = document.getElementById('displayUserName');
    if (displayDash) displayDash.innerText = nombreUsuarioApp;
    
    const displayRemitente = document.getElementById('r_remitente');
    if (displayRemitente) displayRemitente.innerText = nombreUsuarioApp;
});

// --- GESTIÓN DE SALDO (OJO) ---
function toggleBalance() {
    const balanceDiv = document.getElementById('balanceAmount');
    const eyeIcon = document.getElementById('eyeIcon');
    const label = document.getElementById('balanceLabel');

    saldoVisible = !saldoVisible;

    if (saldoVisible) {
        balanceDiv.innerText = `Bs ${saldoActual.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
        balanceDiv.classList.remove('hidden');
        eyeIcon.classList.add('open');
        label.classList.add('hidden');
    } else {
        balanceDiv.classList.add('hidden');
        eyeIcon.classList.remove('open');
        label.classList.remove('hidden');
    }
}

// --- NAVEGACIÓN Y MODALES ---
function openTransfer(tipo) {
    const modal = document.getElementById('transferScreen');
    const title = document.getElementById('transferTitle');
    const bankGroup = document.getElementById('bankGroup');
    const bancoInput = document.getElementById('f_banco');

    modal.style.display = 'flex';
    
    if (tipo === 'yape') {
        title.innerText = "Enviar a otro Yape";
        bankGroup.style.display = 'none';
        bancoInput.value = "Yape";
    } else {
        title.innerText = "Enviar a otro banco";
        bankGroup.style.display = 'block';
        bancoInput.value = ""; 
    }
}

function openProfileSettings() {
    document.getElementById('profileSettingsModal').style.display = 'flex';
    document.getElementById('userNameInput').value = nombreUsuarioApp;
}

function closeAll() {
    document.getElementById('transferScreen').style.display = 'none';
    document.getElementById('receiptScreen').style.display = 'none';
    document.getElementById('profileSettingsModal').style.display = 'none';
}

// --- ACTUALIZACIÓN DE PERFIL ---
function updateProfileName() {
    const nuevoNombre = document.getElementById('userNameInput').value;
    
    if (nuevoNombre.trim() !== "") {
        nombreUsuarioApp = nuevoNombre;
        document.getElementById('displayUserName').innerText = nombreUsuarioApp;
        document.getElementById('r_remitente').innerText = nombreUsuarioApp;
        closeAll();
    } else {
        alert("Por favor, ingresa un nombre válido.");
    }
}

// --- GENERACIÓN DE COMPROBANTE ---
function generateReceipt() {
    // 1. Obtener valores del formulario
    const monto = parseFloat(document.getElementById('f_monto').value) || 0;
    const nombre = document.getElementById('f_nombre').value || "Destinatario";
    const cuenta = document.getElementById('f_cuenta').value || "---";
    const banco = document.getElementById('f_banco').value || "Yape";
    const nota = document.getElementById('f_nota').value || "Yapeaste a " + nombre;

    // 2. Validaciones
    if (monto <= 0) {
        alert("Ingresa un monto válido.");
        return;
    }
    if (monto > saldoActual) {
        alert("Saldo insuficiente.");
        return;
    }

    // 3. Procesar lógica (Restar saldo)
    saldoActual -= monto;

    // 4. Inyectar datos en el comprobante blanco
    document.getElementById('r_monto').innerText = monto.toLocaleString('en-US');
    document.getElementById('r_cuenta').innerText = cuenta;
    document.getElementById('r_banco').innerText = banco;
    document.getElementById('r_nota').innerText = nota;
    document.getElementById('r_remitente').innerText = nombreUsuarioApp;
    
    // Nro de transacción aleatorio
    document.getElementById('r_nro').innerText = Math.floor(Math.random() * 90000000) + 10000000;

    // Configuración de Fecha y Hora automática
    const ahora = new Date();
    const meses = ["ene.", "feb.", "mar.", "abr.", "may.", "jun.", "jul.", "ago.", "sep.", "oct.", "nov.", "dic."];
    const fechaText = `${ahora.getDate()} ${meses[ahora.getMonth()]} ${ahora.getFullYear()}`;
    
    let h = ahora.getHours();
    let m = ahora.getMinutes().toString().padStart(2, '0');
    let ampm = h >= 12 ? 'p. m.' : 'a. m.';
    h = h % 12 || 12;
    
    document.getElementById('r_fecha').innerText = `${fechaText} | ${h}:${m} ${ampm}`;

    // 5. Actualizar el saldo en el dashboard
    if (saldoVisible) {
        document.getElementById('balanceAmount').innerText = `Bs ${saldoActual.toLocaleString('en-US', { minimumFractionDigits: 2 })}`;
    }

    // 6. Cambiar pantalla
    document.getElementById('transferScreen').style.display = 'none';
    document.getElementById('receiptScreen').style.display = 'flex';
}
