const loadStorage = () => {
    $('.showStorage').empty();
    fetch('http://localhost:3000/api/v1/storage')
        .then((res) => res.json())
        .then((storages) => {
            storages.forEach((storage) => {
                $('.showStorage')
                    .prepend(`<div class="storageData py-2 d-flex justify-content-between" id="${storage.storage_id}">
                <div class="storageInfo">id: ${storage.storage_id}</div>
                <div class="storageInfo">name: <span class="storageName">${storage.name}</span></div>
                <div class="storageInfo">is_deleted: ${storage.is_deleted}</div>
                <div>
                    <button type="button" class="updStorage">Update Storage</button>
                    <button type="button" class="delStorage">Delete Storage</button>
                </div>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadStorage();

const getDataForNewStorage = (data) => {
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
    const storageData = {
        name: null,
    };
    const data = getDataForNewStorage(storageData);
    if (data) {
        fetch('http://localhost:3000/api/v1/storage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(setTimeout(() => loadStorage(), 100))
            .then($(`input[name]`).val(''))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});

// UPDATE

$('.showStorage').on('click', '.updStorage', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    let name = $(`#${id}`).find('.storageName').text();
    $('.modal').show();
    $('.modal').attr('id', id);
    $('.modalName').val(name);
});

$('.updateModal').on('click', () => {
    let id = $('.modal').attr('id');
    const storageData = {
        modalName: null,
    };
    const data = getDataForNewStorage(storageData);

    if (data) {
        fetch(`http://localhost:3000/api/v1/storage/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then($('.modal').hide())
            .then($('.modal').removeAttr('id'))
            .then(setTimeout(() => loadStorage(), 100))
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

$('.showStorage').on('click', '.delStorage', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    fetch(`http://localhost:3000/api/v1/storage/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadStorage(), 100))
        .catch((error) => console.log(error));
});