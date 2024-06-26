document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('user-form');
    const userTable = document.getElementById('user-table');

    const fetchUsers = () => {
        fetch('https://api-topicos-dnw6.onrender.com')
            .then(response => response.json())
            .then(data => {
                userTable.innerHTML = '';
                data.forEach(user => {
                    const row = document.createElement('tr');
                    row.className = 'table-row';
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
        const nombre = document.getElementById('nombre').value.trim();
        if (nombre) {
            fetch('https://api-topicos-dnw6.onrender.com', {
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
                })
                .catch(error => console.error('Error:', error));
        } else {
            alert('El nombre no puede estar vacío');
        }
    });

    window.editUser = (id, nombre) => {
        const newName = prompt('Editar nombre:', nombre);
        if (newName && newName.trim()) {
            fetch('https://api-topicos-dnw6.onrender.com', {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id, nombre: newName.trim() })
            })
                .then(response => response.json())
                .then(data => {
                    fetchUsers();
                })
                .catch(error => console.error('Error:', error));
        } else {
            alert('El nombre no puede estar vacío');
        }
    };

    window.deleteUser = (id) => {
        if (confirm('¿Estás seguro de que quieres eliminar este usuario?')) {
            fetch('https://api-topicos-dnw6.onrender.com', {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ id })
            })
                .then(response => response.json())
                .then(data => {
                    fetchUsers();
                })
                .catch(error => console.error('Error:', error));
        }
    };

    fetchUsers();
});
