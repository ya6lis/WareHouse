const loadCategory = () => {
    $('.showCategory').empty();
    fetch('http://localhost:3000/api/category')
        .then((res) => res.json())
        .then((categorys) => {
            categorys.forEach((category) => {
                $('.showCategory')
                    .prepend(`<div class="categoryData py-2 d-flex justify-content-between" id="${category.category_id}">
                <div class="categoryInfo">id: ${category.category_id}</div>
                <div class="categoryInfo">name: ${category.name}</div>
                <div class="categoryInfo">is_deleted: ${category.is_deleted}</div>
                <button type="button" class="delCategory">Delete Category</button>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadCategory();

const getDataForNewCategory = () => {
    const categoryData = {
        name: null,
    };
    let checkAllRight = 0;

    Object.keys(categoryData).forEach((value) => {
        if (
            !$(`input[name=${value}]`).val()
        ) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            categoryData[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(categoryData).length) {
        return JSON.stringify(categoryData);
    } else {
        return 0;
    }
};

$('.addBtn').on('click', () => {
    const data = getDataForNewCategory();
    if (data) {
        fetch('http://localhost:3000/api/category', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(setTimeout(() => loadCategory(), 100))
            .then($(`input[name]`).val(''))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});

$('.showCategory').on('click', '.delCategory', (event) => {
    const returnId = {
        id: $(event.currentTarget.parentElement).attr('id'),
    };
    fetch('http://localhost:3000/api/category', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnId),
    })
        .then(setTimeout(() => loadCategory(), 100))
        .catch((error) => console.log(error));
});