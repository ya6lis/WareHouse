const loadProduct = () => {
    $('.showProduct').empty();
    $('.subcategorie').empty();
    $('.producer').empty();
    $('.storage').empty();
    $('.modalSubcategorie').empty();
    $('.modalProducer').empty();
    fetch('http://localhost:3000/api/product')
        .then((res) => res.json())
        .then((products) => {
            products.forEach((product) => {
                $('.showProduct')
                    .prepend(`<div class="productData py-2 d-flex justify-content-between" id="${product.product_id}">
                <div class="productInfo">id: ${product.product_id}</div>
                <div class="productInfo">name: <span class="productName">${product.name}</span></div>
                <div class="productInfo">price: <span class="productPrice">${product.price}</span></div>
                <div class="productInfo">unit: <span class="productUnit">${product.unit}</span></div>
                <div class="productInfo">subcategorie: <span class="productSubcategorie">${product.subcategorie.name}</span></div>
                <div class="productInfo">producer: <span class="productProducer">${product.producer.name}</span></div>
                <div class="productInfo">is_deleted: ${product.is_deleted}</div>
                <div>
                    <button type="button" class="updProduct">Update Product</button>
                    <button type="button" class="delProduct">Delete Product</button>
                </div>
            </div>`);
            });
        })
        .catch((error) => console.log(error));

    fetch('http://localhost:3000/api/subcategorie')
        .then((res) => res.json())
        .then((subcategories) => {
            subcategories.forEach((subcategorie) => {
                $('.subcategorie').append(`
                        <option value="${subcategorie.subcategorie_id}">${subcategorie.name}</option>
                    `);
                $('.modalSubcategorie').append(`
                        <option value="${subcategorie.subcategorie_id}">${subcategorie.name}</option>
                    `);
            });
        })
        .catch((error) => console.log(error));

    fetch('http://localhost:3000/api/producer')
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

    fetch('http://localhost:3000/api/storage')
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
    productData.subcategorie_id = $('.subcategorie option:selected').val();
    productData.producer_id = $('.producer option:selected').val();
    productData.storage_id = $('.storage option:selected').val();
    const data = JSON.stringify(productData);

    if (data) {
        fetch('http://localhost:3000/api/product', {
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
    let categorie_id = $(`#${id}`).find('.productCategorie').attr('id');
    $('.modal').show();
    $('.modal').attr('id', id);
    $('.modalName').val(name);
    $('.modalCategorie').val(categorie_id);
});

$('.updateModal').on('click', () => {
    let id = $('.modal').attr('id');
    const productUpdData = {
        modalName: null,
        modalPrice: null,
    };

    getDataForNewProduct(productUpdData);
    productUpdData.unit = $('.modalUnit option:selected').text();
    productUpdData.subcategorie_id = $(
        '.modalSubcategorie option:selected'
    ).val();
    productUpdData.producer_id = $('.modalProducer option:selected').val();
    const data = JSON.stringify(productUpdData);

    if (data) {
        fetch(`http://localhost:3000/api/product/${id}`, {
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
    fetch(`http://localhost:3000/api/product/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadProduct(), 100))
        .catch((error) => console.log(error));
});
