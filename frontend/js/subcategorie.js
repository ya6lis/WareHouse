const loadSubcategorie = () => {
    $('.showSubcategorie').empty();
    $('.categorie').empty();
    fetch('http://localhost:3000/api/subcategorie')
        .then((res) => res.json())
        .then((subcategories) => {
            subcategories.forEach((subcategorie) => {
                $('.showSubcategorie').prepend(`
                <div class="subcategorieData py-2 d-flex justify-content-between" id="${subcategorie.subcategorie_id}">
                    <div class="subcategorieInfo">id: ${subcategorie.subcategorie_id}</div>
                    <div class="subcategorieInfo">name: ${subcategorie.name}</div>
                    <div class="subcategorieInfo">is_deleted: ${subcategorie.is_deleted}</div>
                    <div class="subcategorieInfo">categorie: ${subcategorie.categorie.name}</div>
                    <button type="button" class="delSubcategorie">Delete Subcategorie</button>
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
            });
        })
        .catch((error) => console.log(error));
};

loadSubcategorie();

const getDataForNewSubcategorie = () => {
    const subcategorieData = {
        name: null,
    };
    let checkAllRight = 0;

    Object.keys(subcategorieData).forEach((value) => {
        if (!$(`input[name=${value}]`).val()) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            subcategorieData[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(subcategorieData).length) {
        subcategorieData.categorie_id = $('.categorie option:selected').val();
        return JSON.stringify(subcategorieData);
    } else {
        return 0;
    }
};

$('.addBtn').on('click', () => {
    const data = getDataForNewSubcategorie();
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

$('.showSubcategorie').on('click', '.delSubcategorie', (event) => {
    let id = $(event.currentTarget.parentElement).attr('id')
    fetch(`http://localhost:3000/api/subcategorie/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadSubcategorie(), 100))
        .catch((error) => console.log(error));
});
