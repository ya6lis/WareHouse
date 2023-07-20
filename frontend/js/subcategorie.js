const loadSubcategorie = () => {
    $('.showSubcategorie').empty();
    $('.categorie').empty();
    $('.modalCategorie').empty();
    fetch('http://localhost:3000/api/subcategorie')
        .then((res) => res.json())
        .then((subcategories) => {
            subcategories.forEach((subcategorie) => {
                $('.showSubcategorie').prepend(`
                <div class="subcategorieData py-2 d-flex justify-content-between" id="${subcategorie.subcategorie_id}">
                    <div class="subcategorieInfo">id: ${subcategorie.subcategorie_id}</div>
                    <div class="subcategorieInfo">name: <span class="subcategorieName">${subcategorie.name}</span></div>
                    <div class="subcategorieInfo">categorie: <span class="subcategorieCategorie" id="${subcategorie.categorie.categorie_id}">${subcategorie.categorie.name}</span></div>
                    <div class="subcategorieInfo">is_deleted: ${subcategorie.is_deleted}</div>
                    <div>
                        <button type="button" class="updSubcategorie">Update Subcategorie</button>
                        <button type="button" class="delSubcategorie">Delete Subcategorie</button>
                    </div>
                </div>
            `);
            });
        })
        .catch((error) => console.log(error));

    fetch('http://localhost:3000/api/categorie')
        .then((res) => res.json())
        .then((categories) => {
            categories.forEach((categorie) => {
                $('.categorie').append(`
                        <option value="${categorie.categorie_id}">${categorie.name}</option>
                    `);
                $('.modalCategorie').append(`
                        <option value="${categorie.categorie_id}">${categorie.name}</option>
                    `);
            });
        })
        .catch((error) => console.log(error));
};

loadSubcategorie();

const getDataForNewSubcategorie = (data) => {
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
        return data;
    } else {
        return 0;
    }
};

// ADD

$('.addBtn').on('click', () => {
    const subcategorieData = {
        name: null,
    };

    getDataForNewSubcategorie(subcategorieData);
    subcategorieData.categorie_id = $('.categorie option:selected').val();
    const data = JSON.stringify(subcategorieData);

    if (data) {
        fetch('http://localhost:3000/api/subcategorie', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(setTimeout(() => loadSubcategorie(), 100))
            .then($(`input[name]`).val(''))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});

// UPDATE

$('.showSubcategorie').on('click', '.updSubcategorie', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    let name = $(`#${id}`).find('.subcategorieName').text();
    let categorie_id = $(`#${id}`).find('.subcategorieCategorie').attr('id');
    $('.modal').show();
    $('.modal').attr('id', id);
    $('.modalName').val(name);
    $('.modalCategorie').val(categorie_id);
});

$('.updateModal').on('click', () => {
    let id = $('.modal').attr('id');
    const subcategorieUpdData = {
        modalName: null,
    };

    getDataForNewSubcategorie(subcategorieUpdData);
    subcategorieUpdData.categorie_id = $(
        '.modalCategorie option:selected'
    ).val();
    const data = JSON.stringify(subcategorieUpdData);

    if (data) {
        fetch(`http://localhost:3000/api/subcategorie/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then($('.modal').hide())
            .then($('.modal').removeAttr('id'))
            .then(setTimeout(() => loadSubcategorie(), 100))
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

$('.showSubcategorie').on('click', '.delSubcategorie', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    fetch(`http://localhost:3000/api/subcategorie/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadSubcategorie(), 100))
        .catch((error) => console.log(error));
});
