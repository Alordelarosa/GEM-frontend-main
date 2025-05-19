const API_URL = "http://localhost:8090/empleado";

export const 
obtenerEmpleados = async (page = 0, size = 5, nombre = '') => {
    try {
        const url = `${API_URL}/listar?page=${page}&size=${size}&nombre=${nombre}`;
        const respuesta = await fetch(url);
        if (!respuesta.ok) {
            throw new Error("Error en la petición");
        }
        return await respuesta.json(); 
    } catch (error) {
        console.log(error);
        return { content: [], totalPages: 0 };
    }
};

export const eliminarEmpleado = async (id) => {
    try {
        const respuesta = await fetch(API_URL + "/eliminar/" + id, {
            method: "DELETE"
        });
        if (!respuesta.ok) {
            throw new Error("Error en la petición");
        }
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const registrarEmpleado = async (empleado) => {
    try {
        const respuesta = await fetch(API_URL + "/registrar", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(empleado),
        });

        if (!respuesta.ok) {
            throw new Error("Error al registrar empleado");
        }

        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const actualizarEmpleado = async (id, empleado) => {
    try {
        const respuesta = await fetch(`${API_URL}/actualizar/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(empleado),
        });

        if (!respuesta.ok) {
            throw new Error("Error en la actualización del empleado");
        }

        return await respuesta.json();
    } catch (error) {
        console.error(error);
        return null;
    }
};


