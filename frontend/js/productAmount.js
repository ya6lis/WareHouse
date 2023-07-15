const loadProductAmount = () => {
    $('.showProductAmount').empty();
    $('.storage').empty();
    $('.product').empty();
    let productAmounts = [];
    let subcategorys = [];
    let producers = [];
    fetch('http://localhost:3000/api/productAmount')
        .then(async (res) => {
            let tempData = await res.json();
            productAmounts = tempData[0];
            storages = tempData[1];
            products = tempData[2];
        })
        .then(() => {
            productAmounts.forEach((productAmount) => {
                $('.showProductAmount')
                    .prepend(`<div class="productAmountData py-2 d-flex justify-content-between">
                <div class="productAmountInfo">amount: ${productAmount.amount}</div>
                <div class="productAmountInfo">storage_id: ${productAmount.storage_id}</div>
                <div class="productAmountInfo">product_id: ${productAmount.product_id}</div>
            </div>`);
            });
        })
        .then(() => {
            storages.forEach((storage) => {
                $('.storage').append(`
                        <option value="${storage.storage_id}">${storage.name}</option>
                    `);
            });
        })
        .then(() => {
            products.forEach((product) => {
                $('.product').append(`
                        <option value="${product.product_id}">${product.name}</option>
                    `);
            });
        })
        .catch((error) => console.log(error));
};

loadProductAmount();

const getDataForNewProductAmount = () => {
    const productAmountData = {
        amount: null,
    };
    let checkAllRight = 0;

    Object.keys(productAmountData).forEach((value) => {
        if (
            !$(`input[name=${value}]`).val()
        ) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            productAmountData[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(productAmountData).length) {
        productAmountData.storage_id = $('.storage option:selected').val();
        productAmountData.product_id = $('.product option:selected').val();
        return JSON.stringify(productAmountData);
    } else {
        return 0;
    }
};

$('.addBtn').on('click', () => {
    const data = getDataForNewProductAmount();
    if (data) {
        fetch('http://localhost:3000/api/productAmount', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(setTimeout(() => loadProductAmount(), 100))
            .then($(`input[name]`).val(''))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});