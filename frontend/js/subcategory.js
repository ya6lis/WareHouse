const loadSubcategory = () => {
    $('.showSubcategory').empty();
    $('.category').empty();
    let subcategorys = [];
    let categorys = [];
    fetch('http://localhost:3000/api/subcategory')
        .then(async (res) => {
            let tempData = await res.json();
            subcategorys = tempData[0];
            categorys = tempData[1];
        })
        .then(() => {
            subcategorys.forEach((subcategory) => {
                $('.showSubcategory').prepend(`
                <div class="subcategoryData py-2 d-flex justify-content-between" id="${subcategory.subcategory_id}">
                    <div class="subcategoryInfo">id: ${subcategory.subcategory_id}</div>
                    <div class="subcategoryInfo">name: ${subcategory.name}</div>
                    <div class="subcategoryInfo">is_deleted: ${subcategory.is_deleted}</div>
                    <div class="subcategoryInfo">category_id: ${subcategory.category_id}</div>
                    <button type="button" class="delSubcategory">Delete Subcategory</button>
                </div>
            `);
            });
        })
        .then(() => {
            categorys.forEach((category) => {
                $('.category').append(`
                        <option value="${category.category_id}">${category.name}</option>
                    `);
            });
        })
        .catch((error) => console.log(error));
};

loadSubcategory();

const getDataForNewSubcategory = () => {
    const subcategoryData = {
        name: null,
        
    };
    let checkAllRight = 0;

    Object.keys(subcategoryData).forEach((value) => {
        if (
            !$(`input[name=${value}]`).val()
        ) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            subcategoryData[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(subcategoryData).length) {
        subcategoryData.category_id = $(".category option:selected").val()
        return JSON.stringify(subcategoryData);
    } else {
        return 0;
    }

    
};

$('.addBtn').on('click', () => {
    const data = getDataForNewSubcategory();
    if (data) {
        fetch('http://localhost:3000/api/subcategory', {
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

$('.showSubcategory').on('click', '.delSubcategory', (event) => {
    const returnId = {
        id: $(event.currentTarget.parentElement).attr('id'),
    };
    fetch('http://localhost:3000/api/subcategory', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnId),
    })
        .then(setTimeout(() => loadSubcategory(), 100))
        .catch((error) => console.log(error));
});