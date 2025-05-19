export const validateNombre = (nombre) => {
    const nombrePattern = /^[a-zA-ZÀ-ÿ\u00f1\u00d1]+(\s*[a-zA-ZÀ-ÿ\u00f1\u00d1]*)*[a-zA-ZÀ-ÿ\u00f1\u00d1]+$/;
    if (!nombre) {
        return "El nombre es requerido.";
    }
    if (!nombrePattern.test(nombre)) {
        return "El nombre sólo puede contener letras, tildes y espacios.";
    }
    return ""; 
};

export const validateMovil = (movil) => {
    const movilPattern = /^[0-9]{9}$/; 
    if (!movil) {
        return "El número de teléfono es requerido.";
    }
    if (!movilPattern.test(movil)) {
        return "El número de teléfono debe contener exactamente 9 dígitos numéricos.";
    }
    return ""; 
};


export const validateEmail = (email) => {
    if (!email) return "El email es requerido.";
    const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    if (!emailPattern.test(email)) return "El email no tiene un formato válido.";
    return "";
};


export const validateDireccion = (direccion) => {
    if (!direccion) return "La dirección es requerida.";
    if (direccion.length < 5) return "La dirección debe tener al menos 5 caracteres.";
    return "";
};