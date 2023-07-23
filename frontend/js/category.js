const loadCategory = () => {
    $('.showCategory').empty();
    fetch('http://localhost:3000/api/v1/category')
        .then((res) => res.json())
        .then((categories) => {
            categories.forEach((category) => {
                $('.showCategory').prepend(`
                <div class="categoryData py-2 d-flex justify-content-between" id="${category.category_id}">
                    <div class="categoryInfo">id: ${category.category_id}</div>
                    <div class="categoryInfo">name: <span class="categoryName">${category.name}</span></div>
                    <div class="categoryInfo">is_deleted: ${category.is_deleted}
                </div>
                <div>
                    <button type="button" class="updCategory">Update Category</button>
                    <button type="button" class="delCategory">Delete Category</button>
                </div>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadCategory();

const getDataForNewCategory = (data) => {
    let checkAllRight = 0;
    Object.keys(data).forEach((value) => {
        if (!$(`input[name=${value}]`).val()) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            if (value.startsWith('modal')) {
                let newValue = value.toLowerCase().slice(5)
                data[newValue] = $(`input[name=${value}]`).val();
                delete data[value]
            } else{
                data[value] = $(`input[name=${value}]`).val();
            }
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
    const categoryData = {
        name: null,
    };
    const data = getDataForNewCategory(categoryData);
    if (data) {
        fetch('http://localhost:3000/api/v1/category', {
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

// UPDATE

$('.showCategory').on('click', '.updCategory', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    let name = $(`#${id}`).find('.categoryName').text();
    $('.modal').show();
    $('.modal').attr('id', id);
    $('.modalName').val(name);
});

$('.updateModal').on('click', () => {
    let id = $('.modal').attr('id');
    const categoryData = {
        modalName: null,
    };
    const data = getDataForNewCategory(categoryData);
    if (data) {
        fetch(`http://localhost:3000/api/v1/category/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then($('.modal').hide())
            .then($('.modal').removeAttr('id'))
            .then(setTimeout(() => loadCategory(), 100))
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

$('.showCategory').on('click', '.delCategory', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    fetch(`http://localhost:3000/api/v1/category/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadCategory(), 100))
        .catch((error) => console.log(error));
});
