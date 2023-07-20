const loadCategorie = () => {
    $('.showCategorie').empty();
    fetch('http://localhost:3000/api/categorie')
        .then((res) => res.json())
        .then((categories) => {
            categories.forEach((categorie) => {
                $('.showCategorie')
                    .prepend(`<div class="categorieData py-2 d-flex justify-content-between" id="${categorie.categorie_id}">
                <div class="categorieInfo">id: ${categorie.categorie_id}</div>
                <div class="categorieInfo">name: <span class="categorieName">${categorie.name}</span></div>
                <div class="categorieInfo">is_deleted: ${categorie.is_deleted}</div>
                <div>
                    <button type="button" class="updCategorie">Update Categorie</button>
                    <button type="button" class="delCategorie">Delete Categorie</button>
                </div>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadCategorie();

const getDataForNewCategorie = (data) => {
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
    const categorieData = {
        name: null,
    };
    const data = getDataForNewCategorie(categorieData);
    if (data) {
        fetch('http://localhost:3000/api/categorie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(setTimeout(() => loadCategorie(), 100))
            .then($(`input[name]`).val(''))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});

// UPDATE

$('.showCategorie').on('click', '.updCategorie', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    let name = $(`#${id}`).find('.categorieName').text();
    $('.modal').show();
    $('.modal').attr('id', id);
    $('.modalName').val(name);
});

$('.updateModal').on('click', () => {
    let id = $('.modal').attr('id');
    const categorieData = {
        modalName: null,
    };
    const data = getDataForNewCategorie(categorieData);

    if (data) {
        fetch(`http://localhost:3000/api/categorie/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then($('.modal').hide())
            .then($('.modal').removeAttr('id'))
            .then(setTimeout(() => loadCategorie(), 100))
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

$('.showCategorie').on('click', '.delCategorie', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    fetch(`http://localhost:3000/api/categorie/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadCategorie(), 100))
        .catch((error) => console.log(error));
});
