const loadSubcategory = () => {
    $('.showSubcategory').empty();
    $('.category').empty();
    $('.modalCategory').empty();
    fetch('http://localhost:3000/api/v1/subcategory')
        .then((res) => res.json())
        .then((subcategories) => {
            subcategories.forEach((subcategory) => {
                $('.showSubcategory').prepend(`
                <div class="subcategoryData py-2 d-flex justify-content-between" id="${subcategory.subcategory_id}">
                    <div class="subcategoryInfo">id: ${subcategory.subcategory_id}</div>
                    <div class="subcategoryInfo">name: <span class="subcategoryName">${subcategory.name}</span></div>
                    <div class="subcategoryInfo">category: <span class="subcategoryCategory" id="${subcategory.category.category_id}">${subcategory.category.name}</span></div>
                    <div class="subcategoryInfo">is_deleted: ${subcategory.is_deleted}</div>
                    <div>
                        <button type="button" class="updSubcategory">Update Subcategory</button>
                        <button type="button" class="delSubcategory">Delete Subcategory</button>
                    </div>
                </div>
            `);
            });
        })
        .catch((error) => console.log(error));

    fetch('http://localhost:3000/api/v1/category')
        .then((res) => res.json())
        .then((categories) => {
            categories.forEach((category) => {
                $('.category').append(`
                        <option value="${category.category_id}">${category.name}</option>
                    `);
                $('.modalCategory').append(`
                        <option value="${category.category_id}">${category.name}</option>
                    `);
            });
        })
        .catch((error) => console.log(error));
};

loadSubcategory();

const getDataForNewSubcategory = (data) => {
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
    const subcategoryData = {
        name: null,
    };

    getDataForNewSubcategory(subcategoryData);
    subcategoryData.category_id = $('.category option:selected').val();
    const data = JSON.stringify(subcategoryData);

    if (data) {
        fetch('http://localhost:3000/api/v1/subcategory', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(setTimeout(() => loadSubcategory(), 100))
            .then($(`input[name]`).val(''))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});

// UPDATE

$('.showSubcategory').on('click', '.updSubcategory', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    let name = $(`#${id}`).find('.subcategoryName').text();
    let category_id = $(`#${id}`).find('.subcategoryCategory').attr('id');
    $('.modal').show();
    $('.modal').attr('id', id);
    $('.modalName').val(name);
    $('.modalCategory').val(category_id);
});

$('.updateModal').on('click', () => {
    let id = $('.modal').attr('id');
    const subcategoryUpdData = {
        modalName: null,
    };

    getDataForNewSubcategory(subcategoryUpdData);
    subcategoryUpdData.category_id = $(
        '.modalCategory option:selected'
    ).val();
    const data = JSON.stringify(subcategoryUpdData);

    if (data) {
        fetch(`http://localhost:3000/api/v1/subcategory/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then($('.modal').hide())
            .then($('.modal').removeAttr('id'))
            .then(setTimeout(() => loadSubcategory(), 100))
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

$('.showSubcategory').on('click', '.delSubcategory', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    fetch(`http://localhost:3000/api/v1/subcategory/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadSubcategory(), 100))
        .catch((error) => console.log(error));
});
