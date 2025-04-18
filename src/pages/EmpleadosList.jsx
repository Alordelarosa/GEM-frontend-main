import React, { useState, useEffect } from "react";
import { obtenerEmpleados, eliminarEmpleado } from "../services/empleadoService";
import Swal from "sweetalert2";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

function EmpleadosList() {
    const [empleados, setEmpleados] = useState([]);
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(0); // Página actual
    const [nombre, setNombre] = useState(''); 
    const navigate = useNavigate();


    useEffect(() => {
        const cargarEmpleados = async () => {
            const data = await obtenerEmpleados(page, 5, nombre); 
            setEmpleados(data.content); 
            setTotalPages(data.totalPages); 
        };
        cargarEmpleados();
    }, [page, nombre]);

    const handleEliminar = async (id) => {
        const resultado = await Swal.fire({
            title: "¿Estás seguro?",
            text: "Esta acción no se puede deshacer",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Sí, eliminar",
            cancelButtonText: "Cancelar",
        });

        if (resultado.isConfirmed) {
            const eliminado = await eliminarEmpleado(id);
            if (eliminado) {
                Swal.fire("Empleado eliminado", "El empleado ha sido eliminado correctamente", "success");
                const data = await obtenerEmpleados(page, 5, nombre);
                setEmpleados(data.content);
                setTotalPages(data.totalPages);

            }
            else {
                Swal.fire("Error", "El empleado no ha sido eliminado", "error");
            }
        }
    };
    const handleEditar = (empleado) => {
        navigate(`/actualizar/${empleado.id}`, { state: { empleado } });
    };

    const handlePageChange = (newPage) => {
        setPage(newPage); 
    };


    return (
        <div className="flex justify-center items-start h-screen pt-5">
            <div className="w-3/5 mx-auto p-4 bg-blue-50 shadow-lg rounded-lg">
                <h2 className="text-6xl font-mono text-green-800 text-center mb-6" >Gestión Empleados</h2>
                <div className="flex justify-between mb-4">
                    <input
                        type="text"
                        placeholder="Buscar por nombre..."
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                        className="p-2 border border-slate-300 bg-slate-50 rounded w-1/2"
                    />
                    <Button text="Agregar empleado" onClick={() => navigate("/registrar")} className="ml-4 bg-sky-800" />
                </div>
                <table className="w-full border-collapse border-green-200 shadow-md">
                    <thead className="bg-green-50">
                        <tr>
                            <th className="border border-green-200 text-green-800 px-4 py-2 text-left">Nombre</th>
                            <th className="border border-green-200 text-green-800 px-4 py-2 text-left">Email</th>
                            <th className="border border-green-200 text-green-800 px-4 py-2 text-left">Teléfono</th>
                            <th className="border border-green-200 text-green-800 px-4 py-2 text-left">Dirección</th>
                            <th className="border border-green-200 text-green-800 px-4 py-2 text-left">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {empleados.length > 0 ? (
                            empleados.map((empleado) => (
                                <tr key={empleado.id} className="bg-cyan-50">
                                    <td className="border border-green-200 px-4 py-2">{empleado.nombre}</td>
                                    <td className="border border-green-200 px-4 py-2">{empleado.email}</td>
                                    <td className="border border-green-200 px-4 py-2">{empleado.movil}</td>
                                    <td className="border border-green-200 px-4 py-2">{empleado.direccion}</td>
                                    <td className="border border-green-200 px-4 py-2">
                                        <div className="flex gap-2">
                                            <button
                                                onClick={() => handleEditar(empleado)}
                                                className="bg-green-600 hover:bg-green-500 text-white px-3 py-1 rounded-md">
                                                Editar
                                            </button>
                                            <button
                                                className="bg-red-500 hover:bg-red-400 text-white px-3 py-1 rounded-md"
                                                onClick={() => handleEliminar(empleado.id)} >
                                                Eliminar
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center py-2 bg-green-50">No hay empleados disponibles</td>
                            </tr>
                        )}
                    </tbody>
                </table>
                <div className="flex justify-between mt-4">
                    <button
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page <= 0}
                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                    >
                        Anterior
                    </button>
                    <span className="text-gray-400">Página {page + 1} de {totalPages}</span>
                    <button
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page + 1 >= totalPages}
                        className="px-4 py-2 bg-gray-400 hover:bg-gray-500 text-white rounded"
                    >
                        Siguiente
                    </button>
                </div>
            </div>
        </div>
    );
}
export default EmpleadosList;
