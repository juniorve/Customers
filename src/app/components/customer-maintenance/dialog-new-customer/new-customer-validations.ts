export const customerValidation = {
    name: [
        { type: 'required', message: 'Nombre es obligatorio' },
    ],
    lastName: [
        { type: 'required', message: 'Apellidos son obligatorios' }
    ],
    age: [
        { type: 'required', message: 'Edad es obligatorio' }
    ],
    birthDate: [
        { type: 'required', message: 'Fecha de nacimiento es obligatorio' }
    ]
};
