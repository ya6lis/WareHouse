const loadProduct = () => {
    $('.showProduct').empty();
    $('.subcategory').empty();
    $('.producer').empty();
    let products = [];
    let subcategorys = [];
    let producers = [];
    fetch('http://localhost:3000/api/product')
        .then(async (res) => {
            let tempData = await res.json();
            products = tempData[0];
            subcategorys = tempData[1];
            producers = tempData[2];
        })
        .then(() => {
            products.forEach((product) => {
                $('.showProduct')
                    .prepend(`<div class="productData py-2 d-flex justify-content-between" id="${product.product_id}">
                <div class="productInfo">id: ${product.product_id}</div>
                <div class="productInfo">name: ${product.name}</div>
                <div class="productInfo">price: ${product.price}</div>
                <div class="productInfo">unit: ${product.unit}</div>
                <div class="productInfo">subcategory_id: ${product.subcategory_id}</div>
                <div class="productInfo">producer_id: ${product.producer_id}</div>
                  <div class="productInfo">is_deleted: ${product.is_deleted}</div>
                <button type="button" class="delProduct">Delete Product</button>
            </div>`);
            });
        })
        .then(() => {
            subcategorys.forEach((subcategory) => {
                $('.subcategory').append(`
                        <option value="${subcategory.subcategory_id}">${subcategory.name}</option>
                    `);
            });
        })
        .then(() => {
            producers.forEach((producer) => {
                $('.producer').append(`
                        <option value="${producer.producer_id}">${producer.name}</option>
                    `);
            });
        })
        .catch((error) => console.log(error));
};

loadProduct();

const getDataForNewProduct = () => {
    const productData = {
        name: null,
        price: null,
    };
    let checkAllRight = 0;

    Object.keys(productData).forEach((value) => {
        if (
            !$(`input[name=${value}]`).val()
        ) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            productData[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(productData).length) {
        productData.unit = $('.unit option:selected').text();
        productData.subcategory_id = $('.subcategory option:selected').val();
        productData.producer_id = $('.producer option:selected').val();
        return JSON.stringify(productData);
    } else {
        return 0;
    }
};

$('.addBtn').on('click', () => {
    const data = getDataForNewProduct();
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

$('.showProduct').on('click', '.delProduct', (event) => {
    const returnId = {
        id: $(event.currentTarget.parentElement).attr('id'),
    };
    fetch('http://localhost:3000/api/product', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnId),
    })
        .then(setTimeout(() => loadProduct(), 100))
        .catch((error) => console.log(error));
});
