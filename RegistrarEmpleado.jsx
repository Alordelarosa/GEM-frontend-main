import { useState, useEffect } from "react";
import { registrarEmpleado, actualizarEmpleado } from "../services/empleadoService";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import Swal from "sweetalert2";
import { validateNombre, validateMovil, validateEmail, validateDireccion } from "../components/ValidationRules";
import Button from "../components/Button";

function RegistrarEmpleado() {
    const [empleado, setEmpleado] = useState({
        nombre: "",
        email: "",
        movil: "",
        direccion: "",
    });

    const [errors, setErrors] = useState({
        nombre: "",
        movil: "",
        email: "",
        direccion: "",
    });

    const navigate = useNavigate();
    const { id } = useParams();
    const location = useLocation();

    useEffect(() => {
        if (location.state && location.state.empleado) {
            setEmpleado(location.state.empleado);
        }
    }, [location]);

    const handleChange = (e) => {
        const { name, value } = e.target;

        setEmpleado({
            ...empleado,
            [name]: value,
        });

        let error = "";
        switch (name) {
            case "nombre":
                error = validateNombre(value);
                break;
            case "movil":
                error = validateMovil(value);
                break;
            case "email":
                error = validateEmail(value);
                break;
            case "direccion":
                error = validateDireccion(value);
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Validación global antes de enviar
        const nombreError = validateNombre(empleado.nombre);
        const movilError = validateMovil(empleado.movil);
        const emailError = validateEmail(empleado.email);
        const direccionError = validateDireccion(empleado.direccion);

        setErrors({
            nombre: nombreError,
            movil: movilError,
            email: emailError,
            direccion: direccionError,
        });

        // Si hay algún error, no enviamos el formulario
        if (nombreError || movilError || emailError || direccionError) {
            return;
        }

        if (id) {
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Vas a actualizar la información del empleado",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, actualizar",
                cancelButtonText: "Cancelar",
            });

            if (!confirmacion.isConfirmed) {
                return;
            }

            const resultado = await actualizarEmpleado(id, empleado);
            if (resultado) {
                Swal.fire({
                    title: "¡Actualización exitosa!",
                    text: "El empleado se actualizó correctamente",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/");
                });
            } else {
                Swal.fire("Error", "Hubo un problema al actualizar el empleado", "error");
            }
        } else {
            const confirmacion = await Swal.fire({
                title: "¿Estás seguro?",
                text: "Vas a registrar un nuevo empleado",
                icon: "question",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Sí, registrar",
                cancelButtonText: "Cancelar",
            });

            if (!confirmacion.isConfirmed) {
                return;
            }

            const resultado = await registrarEmpleado(empleado);
            if (resultado) {
                Swal.fire({
                    title: "¡Registro exitoso!",
                    text: "El empleado se registró correctamente",
                    icon: "success",
                    confirmButtonText: "OK",
                }).then(() => {
                    navigate("/");
                });
            } else {
                Swal.fire("Error", "Hubo un problema al registrar el empleado", "error");
            }
        }
    };

    const handleGoHome = () => {
        Swal.fire({
            title: "¿Estás seguro?",
            text: "Si regresas, se perderán los cambios no guardados.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, regresar",
            cancelButtonText: "Cancelar",
        }).then((result) => {
            if (result.isConfirmed) {
                navigate("/");
            }
        });
    };

    return (
        <div className="flex justify-center p-8">
            <div className="w-96 bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-teal-600 mb-4 text-center">
                    {id ? "Actualizar empleado" : "Registrar empleado"}
                </h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <input
                            type="text"
                            name="nombre"
                            placeholder="Nombre"
                            value={empleado.nombre}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.nombre ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.nombre && <p className="text-red-500 text-sm">{errors.nombre}</p>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="movil"
                            placeholder="Móvil"
                            value={empleado.movil}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.movil ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.movil && <p className="text-red-500 text-sm">{errors.movil}</p>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="email"
                            name="email"
                            placeholder="Correo Electrónico"
                            value={empleado.email}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.email && <p className="text-red-500 text-sm">{errors.email}</p>}
                    </div>

                    <div className="mb-3">
                        <input
                            type="text"
                            name="direccion"
                            placeholder="Dirección"
                            value={empleado.direccion}
                            onChange={handleChange}
                            className={`w-full p-2 border rounded ${errors.direccion ? 'border-red-500' : 'border-gray-300'}`}
                        />
                        {errors.direccion && <p className="text-red-500 text-sm">{errors.direccion}</p>}
                    </div>

                    <div className="flex justify-between gap-4">
                        <Button
                            text="Regresar al Inicio"
                            onClick={handleGoHome}
                            className="w-1/2" 
                            type="cancel" 
                        />
                        <Button
                            text="Confirmar"
                            onClick={handleSubmit}
                            className="w-1/2" 
                            type="confirm"
                        />
                    </div>
                </form>
            </div>
        </div>
    );
}

export default RegistrarEmpleado;
