// Actualización de Nombre y Perfil
function openProfile() {
    document.getElementById('profileModal').style.display = 'flex';
    document.getElementById('nameInput').value = document.getElementById('displayUserName').innerText;
}

function saveProfile() {
    const newName = document.getElementById('nameInput').value;
    if(newName.trim() !== "") {
        document.getElementById('displayUserName').innerText = newName;
        document.getElementById('r_remitente').innerText = newName;
        closeAll();
    }
}

// Generación de Comprobante
function openTransfer() {
    document.getElementById('transferScreen').style.display = 'flex';
}

function generateReceipt() {
    // Mapeo de datos del formulario al comprobante
    document.getElementById('r_nombre').innerText = document.getElementById('f_nombre').value || "Destinatario";
    document.getElementById('r_monto').innerText = document.getElementById('f_monto').value || "0";
    document.getElementById('r_cuenta').innerText = document.getElementById('f_cuenta').value || "---";
    document.getElementById('r_banco').innerText = document.getElementById('f_banco').value || "Banco";
    document.getElementById('r_nota').innerText = document.getElementById('f_nota').value;
    
    // Fecha actual formateada
    const now = new Date();
    const options = { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' };
    document.getElementById('r_fecha').innerText = now.toLocaleDateString('es-BO', options).replace('.', '') + " a. m.";
    
    // Nro de transacción aleatorio de 9 dígitos
    document.getElementById('r_nro').innerText = Math.floor(100000000 + Math.random() * 900000000);

    document.getElementById('transferScreen').style.display = 'none';
    document.getElementById('receiptScreen').style.display = 'flex';
}

function closeAll() {
    document.querySelectorAll('.full-screen-modal, .modal-overlay').forEach(el => el.style.display = 'none');
}

function toggleBalance() {
    const amount = document.getElementById('balanceAmount');
    const label = document.getElementById('balanceLabel');
    const eye = document.getElementById('eyeIcon');
    amount.classList.toggle('hidden');
    label.classList.toggle('hidden');
    eye.classList.toggle('open');
}

function showTab(tab) {
    console.log("Cambiando a pestaña: " + tab);
    // Aquí puedes añadir lógica para ocultar/mostrar secciones específicas
}
