const loadCategorie = () => {
    $('.showCategorie').empty();
    fetch('http://localhost:3000/api/categorie')
        .then((res) => res.json())
        .then((categories) => {
            categories.forEach((categorie) => {
                $('.showCategorie')
                    .prepend(`<div class="categorieData py-2 d-flex justify-content-between" id="${categorie.categorie_id}">
                <div class="categorieInfo">id: ${categorie.categorie_id}</div>
                <div class="categorieInfo">name: ${categorie.name}</div>
                <div class="categorieInfo">is_deleted: ${categorie.is_deleted}</div>
                <button type="button" class="delCategorie">Delete Categorie</button>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadCategorie();

const getDataForNewCategorie = () => {
    const categorieData = {
        name: null,
    };
    let checkAllRight = 0;

    Object.keys(categorieData).forEach((value) => {
        if (
            !$(`input[name=${value}]`).val()
        ) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            categorieData[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(categorieData).length) {
        return JSON.stringify(categorieData);
    } else {
        return 0;
    }
};

$('.addBtn').on('click', () => {
    const data = getDataForNewCategorie();
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

$('.showCategorie').on('click', '.delCategorie', (event) => {
    const returnId = {
        id: $(event.currentTarget.parentElement).attr('id'),
    };
    fetch('http://localhost:3000/api/categorie', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnId),
    })
        .then(setTimeout(() => loadCategorie(), 100))
        .catch((error) => console.log(error));
});