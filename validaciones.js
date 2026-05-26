// Validación del nombre
function validarNombre(nombre) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{3,60}$/;
    return regex.test(nombre.trim());
}

// Validación de fecha de nacimiento (mayor a 18 años)
function validarFechaNacimiento(fecha) {
    if (!fecha) return false;
    
    const fechaNacimiento = new Date(fecha);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        edad--;
    }
    
    return edad >= 18;
}

// Validación de RUT chileno
function validarRUT(rut) {
    // Remover puntos y guión
    const rutLimpio = rut.replace(/[.-]/g, '');
    
    // Verificar que tenga entre 7 y 8 dígitos
    if (!/^\d{7,9}$/.test(rutLimpio)) {
        return false;
    }
    
    // Separar números del dígito verificador
    const rutNumeros = rutLimpio.slice(0, -1);
    const dvIngresado = rutLimpio.slice(-1).toLowerCase();
    
    // Calcular dígito verificador
    let suma = 0;
    let multiplicador = 2;
    
    for (let i = rutNumeros.length - 1; i >= 0; i--) {
        suma += parseInt(rutNumeros[i]) * multiplicador;
        multiplicador++;
        if (multiplicador > 7) {
            multiplicador = 2;
        }
    }
    
    const dvCalculado = 11 - (suma % 11);
    let dv;
    
    if (dvCalculado === 11) {
        dv = '0';
    } else if (dvCalculado === 10) {
        dv = 'k';
    } else {
        dv = dvCalculado.toString();
    }
    
    return dvIngresado === dv;
}

// Validación de género (debe ser diferente del placeholder)
function validarGenero(genero) {
    return genero !== '' && genero !== undefined;
}

// Validación de email
function validarEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Validación de contraseña (mín 8 caracteres, 1 mayúscula, 1 número, 1 carácter especial)
function validarContraseña(password) {
    const regex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{8,}$/;
    return regex.test(password);
}

// Validación de teléfono (solo dígitos, mínimo 8 caracteres)
function validarTelefono(telefono) {
    const regex = /^\d{8,}$/;
    return regex.test(telefono.replace(/[\s+\-()]/g, ''));
}

// Validación de ciudad (solo letras y espacios)
function validarCiudad(ciudad) {
    const regex = /^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]{1,}$/;
    return regex.test(ciudad.trim());
}

// Validación de código postal (alfanuméricos, entre 4 y 10 caracteres)
function validarCodigoPostal(codigoPostal) {
    const regex = /^[a-zA-Z0-9]{4,10}$/;
    return regex.test(codigoPostal.trim());
}

// Función para mostrar error en un campo
function mostrarError(campo, mensaje) {
    const fieldGroup = campo.closest('.field-group') || campo.closest('.field-card');
    if (fieldGroup) {
        fieldGroup.classList.add('campo-error');
        fieldGroup.classList.remove('campo-ok');
        const errorSpan = fieldGroup.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = mensaje;
        }
    }
}

// Función para limpiar error en un campo
function limpiarError(campo) {
    const fieldGroup = campo.closest('.field-group') || campo.closest('.field-card');
    if (fieldGroup) {
        fieldGroup.classList.remove('campo-error');
        const errorSpan = fieldGroup.querySelector('.error-message');
        if (errorSpan) {
            errorSpan.textContent = '';
        }
    }
}

// Función para marcar campo como válido
function marcarValido(campo) {
    const fieldGroup = campo.closest('.field-group') || campo.closest('.field-card');
    if (fieldGroup) {
        fieldGroup.classList.add('campo-ok');
        fieldGroup.classList.remove('campo-error');
    }
}

// Validación de un campo individual
function validarCampoIndividual(campo) {
    const nombre = campo.name;
    const valor = campo.value;
    
    limpiarError(campo);
    
    switch(nombre) {
        case 'nombre':
            if (!valor.trim()) {
                mostrarError(campo, 'El nombre no puede estar vacío');
                return false;
            } else if (!validarNombre(valor)) {
                mostrarError(campo, 'El nombre debe tener solo letras y espacios, entre 3 y 60 caracteres');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'fecha_nacimiento':
            if (!valor) {
                mostrarError(campo, 'La fecha de nacimiento no puede estar vacía');
                return false;
            } else if (!validarFechaNacimiento(valor)) {
                mostrarError(campo, 'Debes ser mayor de 18 años');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'rut':
            if (!valor.trim()) {
                mostrarError(campo, 'El RUT no puede estar vacío');
                return false;
            } else if (!validarRUT(valor)) {
                mostrarError(campo, 'El RUT debe tener entre 7 y 8 dígitos y ser válido');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'genero':
            if (!validarGenero(valor)) {
                mostrarError(campo, 'Debes seleccionar un género');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'nacionalidad':
            if (!valor) {
                mostrarError(campo, 'Debes seleccionar una nacionalidad');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'correo':
            if (!valor.trim()) {
                mostrarError(campo, 'El correo electrónico no puede estar vacío');
                return false;
            } else if (!validarEmail(valor)) {
                mostrarError(campo, 'El correo debe contener @ y un dominio válido');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'correo_confirm':
            const correo = document.querySelector('input[name="correo"]').value;
            if (valor !== correo) {
                mostrarError(campo, 'Los correos electrónicos no coinciden');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'password':
            if (!valor) {
                mostrarError(campo, 'La contraseña no puede estar vacía');
                return false;
            } else if (!validarContraseña(valor)) {
                mostrarError(campo, 'Mín 8 caracteres, 1 mayúscula, 1 número y 1 especial');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'password_confirm':
            const password = document.querySelector('input[name="password"]').value;
            if (valor !== password) {
                mostrarError(campo, 'Las contraseñas no coinciden');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'telefono':
            if (!valor.trim()) {
                mostrarError(campo, 'El teléfono no puede estar vacío');
                return false;
            } else if (!validarTelefono(valor)) {
                mostrarError(campo, 'Solo dígitos, mínimo 8 caracteres');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'pais':
            if (!valor) {
                mostrarError(campo, 'Debes seleccionar un país');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'provincia':
            if (!valor.trim()) {
                mostrarError(campo, 'La provincia/estado no puede estar vacía');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'ciudad':
            if (!valor.trim()) {
                mostrarError(campo, 'La ciudad no puede estar vacía');
                return false;
            } else if (!validarCiudad(valor)) {
                mostrarError(campo, 'La ciudad debe contener solo letras y espacios');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'calle_numero':
            if (!valor.trim()) {
                mostrarError(campo, 'La calle y número no pueden estar vacíos');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'codigo_postal':
            if (!valor.trim()) {
                mostrarError(campo, 'El código postal no puede estar vacío');
                return false;
            } else if (!validarCodigoPostal(valor)) {
                mostrarError(campo, 'Entre 4 y 10 caracteres alfanuméricos');
                return false;
            }
            marcarValido(campo);
            return true;
            
        case 'referencia':
            if (valor && valor.length > 200) {
                mostrarError(campo, 'No puede exceder 200 caracteres');
                return false;
            }
            marcarValido(campo);
            return true;
    }
}

// Validación del formulario completo
function validarFormulario(event) {
    event.preventDefault();
    
    // Obtener valores de datos personales
    const nombre = document.querySelector('input[name="nombre"]').value;
    const fechaNacimiento = document.querySelector('input[name="fecha_nacimiento"]').value;
    const rut = document.querySelector('input[name="rut"]').value;
    const genero = document.querySelector('select[name="genero"]').value;
    const nacionalidad = document.querySelector('select[name="nacionalidad"]').value;
    
    // Obtener valores de datos de acceso
    const correo = document.querySelector('input[name="correo"]').value;
    const correoConfirm = document.querySelector('input[name="correo_confirm"]').value;
    const password = document.querySelector('input[name="password"]').value;
    const passwordConfirm = document.querySelector('input[name="password_confirm"]').value;
    const telefono = document.querySelector('input[name="telefono"]').value;
    
    // Obtener valores de dirección
    const pais = document.querySelector('select[name="pais"]').value;
    const provincia = document.querySelector('input[name="provincia"]').value;
    const ciudad = document.querySelector('input[name="ciudad"]').value;
    const calleNumero = document.querySelector('input[name="calle_numero"]').value;
    const codigoPostal = document.querySelector('input[name="codigo_postal"]').value;
    const referencia = document.querySelector('textarea[name="referencia"]').value;
    
    // Obtener valores de preferencias y permisos
    const categoriasSeleccionadas = document.querySelectorAll('input[name="categorias"]:checked');
    const tipoCliente = document.querySelector('input[name="tipo_cliente"]:checked');
    const aceptoTerminos = document.querySelector('input[name="acepto_terminos"]').checked;
    const aceptoPrivacidad = document.querySelector('input[name="acepto_privacidad"]').checked;
    
    // Array de errores
    let errores = [];
    let esValido = true;
    
    // Validar nombre
    if (!nombre.trim()) {
        errores.push('El nombre no puede estar vacío');
        mostrarError(document.querySelector('input[name="nombre"]'), 'El nombre no puede estar vacío');
        esValido = false;
    } else if (!validarNombre(nombre)) {
        errores.push('El nombre debe tener solo letras y espacios, entre 3 y 60 caracteres');
        mostrarError(document.querySelector('input[name="nombre"]'), 'El nombre debe tener solo letras y espacios, entre 3 y 60 caracteres');
        esValido = false;
    }
    
    // Validar fecha de nacimiento
    if (!fechaNacimiento) {
        errores.push('La fecha de nacimiento no puede estar vacía');
        mostrarError(document.querySelector('input[name="fecha_nacimiento"]'), 'La fecha de nacimiento no puede estar vacía');
        esValido = false;
    } else if (!validarFechaNacimiento(fechaNacimiento)) {
        errores.push('Debes ser mayor de 18 años');
        mostrarError(document.querySelector('input[name="fecha_nacimiento"]'), 'Debes ser mayor de 18 años');
        esValido = false;
    }
    
    // Validar RUT
    if (!rut.trim()) {
        errores.push('El RUT no puede estar vacío');
        mostrarError(document.querySelector('input[name="rut"]'), 'El RUT no puede estar vacío');
        esValido = false;
    } else if (!validarRUT(rut)) {
        errores.push('El RUT debe tener entre 7 y 8 dígitos y ser válido');
        mostrarError(document.querySelector('input[name="rut"]'), 'El RUT debe tener entre 7 y 8 dígitos y ser válido');
        esValido = false;
    }
    
    // Validar género
    if (!validarGenero(genero)) {
        errores.push('Debes seleccionar un género');
        mostrarError(document.querySelector('select[name="genero"]'), 'Debes seleccionar un género');
        esValido = false;
    }
    
    // Validar nacionalidad
    if (!nacionalidad) {
        errores.push('Debes seleccionar una nacionalidad');
        mostrarError(document.querySelector('select[name="nacionalidad"]'), 'Debes seleccionar una nacionalidad');
        esValido = false;
    }
    
    // Validar email
    if (!correo.trim()) {
        errores.push('El correo electrónico no puede estar vacío');
        mostrarError(document.querySelector('input[name="correo"]'), 'El correo electrónico no puede estar vacío');
        esValido = false;
    } else if (!validarEmail(correo)) {
        errores.push('El correo debe contener @ y un dominio válido');
        mostrarError(document.querySelector('input[name="correo"]'), 'El correo debe contener @ y un dominio válido');
        esValido = false;
    }
    
    // Validar confirmación de email
    if (correo !== correoConfirm) {
        errores.push('Los correos electrónicos no coinciden');
        mostrarError(document.querySelector('input[name="correo_confirm"]'), 'Los correos electrónicos no coinciden');
        esValido = false;
    }
    
    // Validar contraseña
    if (!password) {
        errores.push('La contraseña no puede estar vacía');
        mostrarError(document.querySelector('input[name="password"]'), 'La contraseña no puede estar vacía');
        esValido = false;
    } else if (!validarContraseña(password)) {
        errores.push('Mín 8 caracteres, 1 mayúscula, 1 número y 1 especial');
        mostrarError(document.querySelector('input[name="password"]'), 'Mín 8 caracteres, 1 mayúscula, 1 número y 1 especial');
        esValido = false;
    }
    
    // Validar confirmación de contraseña
    if (password !== passwordConfirm) {
        errores.push('Las contraseñas no coinciden');
        mostrarError(document.querySelector('input[name="password_confirm"]'), 'Las contraseñas no coinciden');
        esValido = false;
    }
    
    // Validar teléfono
    if (!telefono.trim()) {
        errores.push('El teléfono no puede estar vacío');
        mostrarError(document.querySelector('input[name="telefono"]'), 'El teléfono no puede estar vacío');
        esValido = false;
    } else if (!validarTelefono(telefono)) {
        errores.push('Solo dígitos, mínimo 8 caracteres');
        mostrarError(document.querySelector('input[name="telefono"]'), 'Solo dígitos, mínimo 8 caracteres');
        esValido = false;
    }
    
    // Validar país
    if (!pais) {
        errores.push('Debes seleccionar un país');
        mostrarError(document.querySelector('select[name="pais"]'), 'Debes seleccionar un país');
        esValido = false;
    }
    
    // Validar provincia
    if (!provincia.trim()) {
        errores.push('La provincia/estado no puede estar vacía');
        mostrarError(document.querySelector('input[name="provincia"]'), 'La provincia/estado no puede estar vacía');
        esValido = false;
    }
    
    // Validar ciudad
    if (!ciudad.trim()) {
        errores.push('La ciudad no puede estar vacía');
        mostrarError(document.querySelector('input[name="ciudad"]'), 'La ciudad no puede estar vacía');
        esValido = false;
    } else if (!validarCiudad(ciudad)) {
        errores.push('La ciudad debe contener solo letras y espacios');
        mostrarError(document.querySelector('input[name="ciudad"]'), 'La ciudad debe contener solo letras y espacios');
        esValido = false;
    }
    
    // Validar calle y número
    if (!calleNumero.trim()) {
        errores.push('La calle y número no pueden estar vacíos');
        mostrarError(document.querySelector('input[name="calle_numero"]'), 'La calle y número no pueden estar vacíos');
        esValido = false;
    }
    
    // Validar código postal
    if (!codigoPostal.trim()) {
        errores.push('El código postal no puede estar vacío');
        mostrarError(document.querySelector('input[name="codigo_postal"]'), 'El código postal no puede estar vacío');
        esValido = false;
    } else if (!validarCodigoPostal(codigoPostal)) {
        errores.push('Entre 4 y 10 caracteres alfanuméricos');
        mostrarError(document.querySelector('input[name="codigo_postal"]'), 'Entre 4 y 10 caracteres alfanuméricos');
        esValido = false;
    }
    
    // Validar referencia
    if (referencia && referencia.length > 200) {
        errores.push('La referencia no puede exceder 200 caracteres');
        mostrarError(document.querySelector('textarea[name="referencia"]'), 'No puede exceder 200 caracteres');
        esValido = false;
    }
    
    // Validar categorías de interés
    if (categoriasSeleccionadas.length === 0) {
        errores.push('Debes seleccionar al menos una categoría de interés');
        const fieldCard = document.querySelector('fieldset:has(input[name="categorias"])');
        if (fieldCard) {
            fieldCard.classList.add('campo-error');
            const errorSpan = fieldCard.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = 'Debes seleccionar al menos una categoría';
            }
        }
        esValido = false;
    } else {
        const fieldCard = document.querySelector('fieldset:has(input[name="categorias"])');
        if (fieldCard) {
            fieldCard.classList.remove('campo-error');
            fieldCard.classList.add('campo-ok');
        }
    }
    
    // Validar tipo de cliente
    if (!tipoCliente) {
        errores.push('Debes seleccionar un tipo de cliente');
        const fieldCard = document.querySelector('fieldset:has(input[name="tipo_cliente"])');
        if (fieldCard) {
            fieldCard.classList.add('campo-error');
            const errorSpan = fieldCard.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = 'Debes seleccionar un tipo de cliente';
            }
        }
        esValido = false;
    } else {
        const fieldCard = document.querySelector('fieldset:has(input[name="tipo_cliente"])');
        if (fieldCard) {
            fieldCard.classList.remove('campo-error');
            fieldCard.classList.add('campo-ok');
        }
    }
    
    // Validar términos y condiciones
    if (!aceptoTerminos) {
        errores.push('Debes aceptar los términos y condiciones');
        const checkboxLabel = document.querySelector('input[name="acepto_terminos"]').closest('.field-group');
        if (checkboxLabel) {
            checkboxLabel.classList.add('campo-error');
            const errorSpan = checkboxLabel.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = 'Acepta los términos y condiciones';
            }
        }
        esValido = false;
    } else {
        const checkboxLabel = document.querySelector('input[name="acepto_terminos"]').closest('.field-group');
        if (checkboxLabel) {
            checkboxLabel.classList.remove('campo-error');
            checkboxLabel.classList.add('campo-ok');
        }
    }
    
    // Validar política de privacidad
    if (!aceptoPrivacidad) {
        errores.push('Debes aceptar la política de privacidad');
        const checkboxLabel = document.querySelector('input[name="acepto_privacidad"]').closest('.field-group');
        if (checkboxLabel) {
            checkboxLabel.classList.add('campo-error');
            const errorSpan = checkboxLabel.querySelector('.error-message');
            if (errorSpan) {
                errorSpan.textContent = 'Acepta la política de privacidad';
            }
        }
        esValido = false;
    } else {
        const checkboxLabel = document.querySelector('input[name="acepto_privacidad"]').closest('.field-group');
        if (checkboxLabel) {
            checkboxLabel.classList.remove('campo-error');
            checkboxLabel.classList.add('campo-ok');
        }
    }
    
    // Si hay errores, mostrarlos
    if (!esValido) {
        return false;
    }
    
    // Si todo es válido, mostrar pantalla de éxito
    mostrarPantallaExito(nombre);
    return true;
}

// Función para mostrar pantalla de éxito
function mostrarPantallaExito(nombre) {
    const successScreen = document.getElementById('successScreen');
    const userName = document.getElementById('userName');
    userName.textContent = nombre;
    successScreen.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// Asignar evento al formulario cuando se cargue el DOM
document.addEventListener('DOMContentLoaded', function() {
    const formulario = document.querySelector('.registro-form');
    if (formulario) {
        formulario.addEventListener('submit', validarFormulario);
        
        // Agregar validación en blur para campos de texto
        const campos = formulario.querySelectorAll('input, select, textarea');
        campos.forEach(campo => {
            if (campo.type !== 'checkbox' && campo.type !== 'radio') {
                campo.addEventListener('blur', function() {
                    if (this.value || this.closest('.field-group')?.classList.contains('campo-error')) {
                        validarCampoIndividual(this);
                    }
                });
                
                // Limpiar error al escribir
                campo.addEventListener('input', function() {
                    if (this.closest('.field-group')?.classList.contains('campo-error')) {
                        limpiarError(this);
                    }
                });
            }
        });
        
        // Agregar validación para checkboxes y radio buttons
        const checkboxes = formulario.querySelectorAll('input[type="checkbox"], input[type="radio"]');
        checkboxes.forEach(checkbox => {
            checkbox.addEventListener('change', function() {
                const fieldGroup = this.closest('.field-group') || this.closest('.field-card');
                if (fieldGroup && fieldGroup.classList.contains('campo-error')) {
                    limpiarError(this);
                }
            });
        });
        
        // Actualizar contador de caracteres del textarea
        const textarea = formulario.querySelector('textarea[name="referencia"]');
        if (textarea) {
            const charCount = document.getElementById('char-count');
            textarea.addEventListener('input', function() {
                charCount.textContent = this.value.length;
                if (this.closest('.field-group')?.classList.contains('campo-error')) {
                    limpiarError(this);
                }
            });
        }
    }
});
