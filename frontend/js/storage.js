const loadStorage = () => {
    $('.showStorage').empty();
    fetch('http://localhost:3000/api/storage')
        .then((res) => res.json())
        .then((storages) => {
            storages.forEach((storage) => {
                $('.showStorage')
                    .prepend(`<div class="storageData py-2 d-flex justify-content-between" id="${storage.storage_id}">
                <div class="storageInfo">id: ${storage.storage_id}</div>
                <div class="storageInfo">name: ${storage.name}</div>
                <div class="storageInfo">is_deleted: ${storage.is_deleted}</div>
                <button type="button" class="delStorage">Delete Storage</button>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadStorage();

const getDataForNewStorage = () => {
    const storageData = {
        name: null,
    };
    let checkAllRight = 0;

    Object.keys(storageData).forEach((value) => {
        if (
            !$(`input[name=${value}]`).val()
        ) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            storageData[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(storageData).length) {
        return JSON.stringify(storageData);
    } else {
        return 0;
    }
};

$('.addBtn').on('click', () => {
    const data = getDataForNewStorage();
    if (data) {
        fetch('http://localhost:3000/api/storage', {
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

$('.showStorage').on('click', '.delStorage', (event) => {
    const returnId = {
        id: $(event.currentTarget.parentElement).attr('id'),
    };
    fetch('http://localhost:3000/api/storage', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnId),
    })
        .then(setTimeout(() => loadStorage(), 100))
        .catch((error) => console.log(error));
});