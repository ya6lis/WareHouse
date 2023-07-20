const loadUser = () => {
    $('.showUser').empty();
    fetch('http://localhost:3000/api/user')
        .then((res) => res.json())
        .then((users) => {
            users.forEach((user) => {
                $('.showUser')
                    .prepend(`<div class="userData py-2 d-flex justify-content-between" id="${user.user_id}">
                <div class="userInfo">id: ${user.user_id}</div>
                <div class="userInfo">login: <span class="userLogin">${user.login}</span></div>
                <div class="userInfo">email: <span class="userEmail">${user.email}</span></div>
                <div class="userInfo">name: <span class="userName">${user.name}</span></div>
                <div class="userInfo">is_admin: ${user.is_admin}</div>
                <div class="userInfo">is_deleted: ${user.is_deleted}</div>
                <div>
                    <button type="button" class="updUser">Update User</button>
                    <button type="button" class="delUser">Delete User</button>
                </div>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadUser();

const getDataForNewUser = (data) => {
    let checkAllRight = 0;
    Object.keys(data).forEach((value) => {
        if (!$(`input[name=${value}]`).val()) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            data[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(data).length) {
        return JSON.stringify(data);
    } else {
        return 0;
    }
};

// ADD

$('.addBtn').on('click', () => {
    const userData = {
        login: null,
        password: null,
        email: null,
        name: null,
    };

    const data = getDataForNewUser(userData);

    if (data) {
        fetch('http://localhost:3000/api/user', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(setTimeout(() => loadUser(), 100))
            .then($(`input[name]`).val(''))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});

// UPDATE

$('.showUser').on('click', '.updUser', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    let login = $(`#${id}`).find('.userLogin').text();
    let email = $(`#${id}`).find('.userEmail').text();
    let name = $(`#${id}`).find('.userName').text();
    $('.modal').show();
    $('.modal').attr('id', id);
    $('.modalLogin').val(login);
    $('.modalEmail').val(email);
    $('.modalName').val(name);

    console.log(id, login, email, name)
});

$('.updateModal').on('click', () => {
    let id = $('.modal').attr('id');
    const userUpdData = {
        modalLogin: null,
        modalEmail: null,
        modalName: null,
    };
    const data = getDataForNewUser(userUpdData);
    
    if (data) {
        fetch(`http://localhost:3000/api/user/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then($('.modal').hide())
            .then($('.modal').removeAttr('id'))
            .then(setTimeout(() => loadUser(), 100))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});

$('.closeModal').on('click', () => {
    $('.modal').removeAttr('id');
    $('.modal').hide();
});

// DELETE

$('.showUser').on('click', '.delUser', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id')
    fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadUser(), 100))
        .catch((error) => console.log(error));
});
