document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar "Base de Datos" local si no existe
    if (!localStorage.getItem('usuariosYape')) {
        const usuariosIniciales = [
            { telefono: "78899001", pin: "1234", nombre: "Cristian" },
            { telefono: "60011223", pin: "0000", nombre: "Juan Diego" }
        ];
        localStorage.setItem('usuariosYape', JSON.stringify(usuariosIniciales));
    }

    const pinFields = document.querySelectorAll('.pin-field');
    const togglePin = document.getElementById('togglePin');
    const eyeSlash = document.getElementById('eyeSlash');
    const submitBtn = document.getElementById('submitBtn');
    const phoneInput = document.getElementById('phoneNumber');
    
    // Elementos de Modales
    const modalInfo = document.getElementById('modalInfo');
    const modalHelp = document.getElementById('modalHelp');
    const btnInfo = document.getElementById('btnInfo');
    const btnHelp = document.getElementById('btnHelp');
    const closeButtons = document.querySelectorAll('.btn-close');

    // --- LÓGICA DE CAMPOS PIN ---
    pinFields.forEach((field, index) => {
        field.addEventListener('input', (e) => {
            // Solo permitir números
            field.value = field.value.replace(/[^0-9]/g, '');
            
            // Salto automático al siguiente campo
            if (field.value && index < pinFields.length - 1) {
                pinFields[index + 1].focus();
            }
        });

        field.addEventListener('keydown', (e) => {
            // Volver al campo anterior al borrar
            if (e.key === 'Backspace' && !field.value && index > 0) {
                pinFields[index - 1].focus();
            }
        });
    });

    // --- MOSTRAR / OCULTAR PIN ---
    let isVisible = false;
    togglePin.addEventListener('click', () => {
        isVisible = !isVisible;
        pinFields.forEach(f => f.type = isVisible ? 'text' : 'password');
        eyeSlash.style.display = isVisible ? 'none' : 'block';
    });

    // --- GESTIÓN DE MODALES ---
    btnInfo.addEventListener('click', () => modalInfo.classList.add('active'));
    btnHelp.addEventListener('click', () => modalHelp.classList.add('active'));

    closeButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            modalInfo.classList.remove('active');
            modalHelp.classList.remove('active');
        });
    });

    // Cerrar modal al tocar fuera del contenido
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal-overlay')) {
            e.target.classList.remove('active');
        }
    });

    // --- PROCESO DE LOGUEO ---
    submitBtn.addEventListener('click', () => {
        const phone = phoneInput.value;
        const pin = Array.from(pinFields).map(f => f.value).join('');

        if (phone.length < 8) {
            alert("Por favor, ingresa tu número de celular completo.");
            return;
        }

        if (pin.length < 4) {
            alert("Ingresa tu clave Yape de 4 dígitos.");
            return;
        }

        // Obtener lista de usuarios de localStorage
        const usuarios = JSON.parse(localStorage.getItem('usuariosYape'));
        
        // Buscar coincidencia
        const usuarioValido = usuarios.find(u => u.telefono === phone && u.pin === pin);

        if (usuarioValido) {
            // Guardar la sesión actual antes de redirigir
            localStorage.setItem('sesionActiva', JSON.stringify(usuarioValido));
            window.location.href = "dashboard.html";
        } else {
            alert("Los datos ingresados no son correctos. Revisa tu número o PIN.");
        }
    });
});