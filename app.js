document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const userTable = document.getElementById('user-table');

    const fetchUsers = () => {
        fetch('http://localhost:3000/',)
            .then(response => response.json())
            .then(data => {
                userTable.innerHTML = '';
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${user.id}</td>
                        <td>${user.nombre}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editUser(${user.id}, '${user.nombre}')">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteUser(${user.id})">Eliminar</button>
                        </td>
                    `;
                    userTable.appendChild(row);
                });
            });
    };

    form.addEventListener('submit', (event) => {
        event.preventDefault();
        const nombre = document.getElementById('nombre').value;
        fetch('http://localhost:3000/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre })
        })
            .then(response => response.json())
            .then(data => {
                form.reset();
                fetchUsers();
            });
    });

    window.editUser = (id, nombre) => {
        const newName = prompt('Editar nombre:', nombre);
        if (newName) {
            fetch('http://localhost:3000/', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, nombre: newName })
            })
                .then(response => response.json())
                .then(data => {
                    fetchUsers();
                });
        }
    };

    window.deleteUser = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            fetch('http://localhost:3000/', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
                .then(response => response.json())
                .then(data => {
                    fetchUsers();
                });
        }
    };

    fetchUsers();
});
