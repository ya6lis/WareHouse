const loadUser = () => {
    $('.showUser').empty();
    fetch('http://localhost:3000/api/user')
        .then((res) => res.json())
        .then((users) => {
            users.forEach((user) => {
                $('.showUser')
                    .prepend(`<div class="userData py-2 d-flex justify-content-between" id="${user.user_id}">
                <div class="userInfo">id: ${user.user_id}</div>
                <div class="userInfo">login: ${user.login}</div>
                <div class="userInfo">email: ${user.email}</div>
                <div class="userInfo">name: ${user.name}</div>
                <div class="userInfo">is_admin: ${user.is_admin}</div>
                <div class="userInfo">is_deleted: ${user.is_deleted}</div>
                <button type="button" class="delUser">Delete User</button>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadUser();

const getDataForNewUser = () => {
    const userData = {
        login: null,
        password: null,
        email: null,
        name: null,
    };
    let checkAllRight = 0;

    Object.keys(userData).forEach((value) => {
        if (
            !$(`input[name=${value}]`).val() ||
            new Array($(`input[name=${value}]`).val())[0].includes(' ')
        ) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            userData[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(userData).length) {
        return JSON.stringify(userData);
    } else {
        return 0;
    }
};

$('.addBtn').on('click', () => {
    const data = getDataForNewUser();
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

$('.showUser').on('click', '.delUser', (event) => {
    let id = $(event.currentTarget.parentElement).attr('id')
    fetch(`http://localhost:3000/api/user/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadUser(), 100))
        .catch((error) => console.log(error));
});
