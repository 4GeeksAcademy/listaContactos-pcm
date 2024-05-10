import React, { useContext, useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Form2 = () => {
    const { id } = useParams();
    const idNumber = parseInt(id, 10); // Asegurar que el ID es un número
    const { store, actions } = useContext(Context);
    const [userInput, setUserInput] = useState({
        nombredos: "",
        correodos: "",
        telefonodos: "",
        direcciondos: ""
    });

    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        actions.EditContact(idNumber, userInput) // Llamar a EditContact con el ID y el objeto
            .then((success) => {
                if (success) {
                    navigate("/"); // Redirigir a la página principal
                    actions.cargarContactos(); // Actualizar la lista de contactos
                } else {
                    console.error("Error al actualizar el contacto");
                }
            });
    };

    useEffect(() => {
        const contact = store.contactos.find((contact) => contact.id === idNumber); // Buscar el contacto por ID
        if (contact) {
            setUserInput({
                nombredos: contact.name,
                correodos: contact.email,
                telefonodos: contact.phone,
                direcciondos: contact.address
            });
        }
    }, [idNumber, store.contactos]); // Re-evaluar cuando el ID o contactos cambien

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className="container mt-5">
                    <div className="mt-5">
                        <label className="form-label d-flex text-start">
                            <i className="fa fa-user bigicon mx-2" style={{ color: "#B197FC", fontSize: 24 }}></i>
                            Full Name
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            minLength={3}
                            required
                            value={userInput.nombredos}
                            onChange={(e) => setUserInput({ ...userInput, nombredos: e.target.value })}
                            placeholder="Full Name"
                        />
                    </div>
                    <div className="my-3">
                        <label className="form-label d-flex text-start">
                            <i className="fas fa-envelope mx-2" style={{ color: "#B197FC", fontSize: 24 }}></i>
                            Email
                        </label>
                        <input
                            type="email"
                            className="form-control"
                            minLength={3}
                            required
                            value={userInput.correodos}
                            onChange={(e) => setUserInput({ ...userInput, correodos: e.target.value })}
                            placeholder="name@example.com"
                        />
                    </div>
                    <div class="my-3">
                        <label class="form-label d-flex text-start">
                            <i class="fas fa-phone-square mx-2" style={{ color: "#B197FC", fontSize: 24 }}></i>
                            Phone
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            minLength={3}
                            required
                            value={userInput.telefonodos}
                            onChange={(e) => setUserInput({ ...userInput, telefonodos: e.target.value })}
                            placeholder="+34-666-66-66-66"
                        />
                    </div>
                    <div class="my-3">
                        <label class="form-label d-flex text-start">
                            <i class="fas fa-map-marker-alt mx-2" style={{ color: "#B197FC", fontSize: 24 }}></i>
                            Address
                        </label>
                        <input
                            type="text"
                            class="form-control"
                            minLength={3}
                            required
                            value={userInput.direcciondos}
                            onChange={(e) => setUserInput({ ...userInput, direcciondos: e.target.value })}
                            placeholder="Address"
                        />
                    </div>
                </div>
                <div className="d-flex justify-content-center mt-4">
                    <button className="btn btn-primary" type="submit">
                        Save
                    </button>
                </div>
            </form>
        </>
    );
};
