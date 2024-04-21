const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			name: "",
			phone: "",
			correo: "",
			direccion: "",
			contactos: []
		},
		actions: {
			guardarContacto: function ({ nombre, direccion, correo, telefono }) {
				fetch("https://playground.4geeks.com/contact/agendas/user_pcm/contacts", {
					method: 'POST',
					headers: { 'Content-Type': 'application/json', 'accept': 'application/json' },
					body: JSON.stringify({ 'name': nombre, 'phone': telefono, 'email': correo, 'address': direccion}),
				})
					.then(response => {
						if (!response.ok) {
							console.error('Error al enviar datos');
							throw new Error('Error al enviar datos');
						}
						return response.json();
					})
					.then(data => {
						console.log('Datos guardados correctamente:', data);
						setStore({ contactos: data.contacts });
					})
					.catch(error => console.error('Error:', error));
			},
			cargarContactos: function () {
				fetch("https://playground.4geeks.com/contact/agendas/user_pcm")
					.then((response) => response.json())
					.then((data) => {
						setStore({ contactos: data.contacts });
					})
					.catch((error) => console.error(error));
			},
			borrarContacto: function (id) {
				fetch('https://playground.4geeks.com/contact/agendas/user_pcm/contacts/'+ id, {
					method: 'DELETE'
				})
					.then(response => {
						if (!response.ok) {
							throw new Error('Error al borrar el contacto');
						}
						const updatedContacts = getStore().contactos.filter(contacto => contacto.id !== id);
						setStore({ contactos: updatedContacts });
						console.log('Contacto borrado correctamente');
					})
					.catch(error => console.error(error));
			}
		}
	};
};

export default getState;
