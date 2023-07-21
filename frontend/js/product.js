const loadProduct = () => {
    $('.showProduct').empty();
    $('.subcategory').empty();
    $('.producer').empty();
    $('.storage').empty();
    $('.modalSubcategory').empty();
    $('.modalProducer').empty();
    fetch('http://localhost:3000/api/v1/product')
        .then((res) => res.json())
        .then((products) => {
            products.forEach((product) => {
                $('.showProduct')
                    .prepend(`<div class="productData py-2 d-flex justify-content-between" id="${product.product_id}">
                <div class="productInfo">id: ${product.product_id}</div>
                <div class="productInfo">name: <span class="productName">${product.name}</span></div>
                <div class="productInfo">price: <span class="productPrice">${product.price}</span></div>
                <div class="productInfo">unit: <span class="productUnit">${product.unit}</span></div>
                <div class="productInfo">subcategory: <span class="productSubcategory" id="${product.subcategory.subcategory_id}">${product.subcategory.name}</span></div>
                <div class="productInfo">producer: <span class="productProducer" id="${product.producer.producer_id}">${product.producer.name}</span></div>
                <div class="productInfo">is_deleted: ${product.is_deleted}</div>
                <div>
                    <button type="button" class="updProduct">Update Product</button>
                    <button type="button" class="delProduct">Delete Product</button>
                </div>
            </div>`);
            });
        })
        .catch((error) => console.log(error));

    fetch('http://localhost:3000/api/v1/subcategory')
        .then((res) => res.json())
        .then((subcategories) => {
            subcategories.forEach((subcategory) => {
                $('.subcategory').append(`
                        <option value="${subcategory.subcategory_id}">${subcategory.name}</option>
                    `);
                $('.modalSubcategory').append(`
                        <option value="${subcategory.subcategory_id}">${subcategory.name}</option>
                    `);
            });
        })
        .catch((error) => console.log(error));

    fetch('http://localhost:3000/api/v1/producer')
        .then((res) => res.json())
        .then((producers) => {
            producers.forEach((producer) => {
                $('.producer').append(`
                        <option value="${producer.producer_id}">${producer.name}</option>
                    `);
                $('.modalProducer').append(`
                        <option value="${producer.producer_id}">${producer.name}</option>
                    `);
            });
        })
        .catch((error) => console.log(error));

    fetch('http://localhost:3000/api/v1/storage')
        .then((res) => res.json())
        .then((storages) => {
            storages.forEach((storage) => {
                $('.storage').append(`
                        <option value="${storage.storage_id}">${storage.name}</option>
                    `);
            });
        })
        .catch((error) => console.log(error));
};

loadProduct();

const getDataForNewProduct = (data) => {
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
    const productData = {
        name: null,
        price: null,
        amount: null,
    };

    getDataForNewProduct(productData);
    productData.unit = $('.unit option:selected').text();
    productData.subcategory_id = $('.subcategory option:selected').val();
    productData.producer_id = $('.producer option:selected').val();
    productData.storage_id = $('.storage option:selected').val();
    const data = JSON.stringify(productData);

    if (data) {
        fetch('http://localhost:3000/api/v1/product', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(setTimeout(() => loadProduct(), 100))
            .then($(`input[name]`).val(''))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});

// UPDATE

$('.showProduct').on('click', '.updProduct', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    let name = $(`#${id}`).find('.productName').text();
    let price = $(`#${id}`).find('.productPrice').text();
    let subcategory_id = $(`#${id}`).find('.productSubcategory').attr('id');
    let producer_id = $(`#${id}`).find('.productProducer').attr('id');
    $('.modal').show();
    $('.modal').attr('id', id);
    $('.modalName').val(name);
    $('.modalPrice').val(price);
    $('.modalSubcategory').val(subcategory_id);
    $('.modalProducer').val(producer_id);
});

$('.updateModal').on('click', () => {
    let id = $('.modal').attr('id');
    const productUpdData = {
        modalName: null,
        modalPrice: null,
    };

    getDataForNewProduct(productUpdData);
    productUpdData.unit = $('.modalUnit option:selected').text();
    productUpdData.subcategory_id = $(
        '.modalSubcategory option:selected'
    ).val();
    productUpdData.producer_id = $('.modalProducer option:selected').val();
    const data = JSON.stringify(productUpdData);

    if (data) {
        fetch(`http://localhost:3000/api/v1/product/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then($('.modal').hide())
            .then($('.modal').removeAttr('id'))
            .then(setTimeout(() => loadProduct(), 100))
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

$('.showProduct').on('click', '.delProduct', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    fetch(`http://localhost:3000/api/v1/product/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadProduct(), 100))
        .catch((error) => console.log(error));
});
