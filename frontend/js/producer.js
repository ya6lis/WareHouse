const loadProducer = () => {
    $('.showProducer').empty();
    fetch('http://localhost:3000/api/v1/producer')
        .then((res) => res.json())
        .then((producers) => {
            producers.forEach((producer) => {
                $('.showProducer')
                    .prepend(`<div class="producerData py-2 d-flex justify-content-between" id="${producer.producer_id}">
                <div class="producerInfo">id: ${producer.producer_id}</div>
                <div class="producerInfo">name: <span class="producerName">${producer.name}</span></div>
                <div class="producerInfo">is_deleted: ${producer.is_deleted}</div>
                <div>
                    <button type="button" class="updProducer">Update Producer</button>
                    <button type="button" class="delProducer">Delete Producer</button>
                </div>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadProducer();

const getDataForNewProducer = (data) => {
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
    const producerData = {
        name: null,
    };
    const data = getDataForNewProducer(producerData);
    if (data) {
        fetch('http://localhost:3000/api/v1/producer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then(setTimeout(() => loadProducer(), 100))
            .then($(`input[name]`).val(''))
            .catch((error) => console.log(error));
    } else {
        console.log('not fetching');
    }
});

// UPDATE

$('.showProducer').on('click', '.updProducer', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    let name = $(`#${id}`).find('.producerName').text();
    $('.modal').show();
    $('.modal').attr('id', id);
    $('.modalName').val(name);
});

$('.updateModal').on('click', () => {
    let id = $('.modal').attr('id');
    const producerData = {
        modalName: null,
    };
    const data = getDataForNewProducer(producerData);
    if (data) {
        fetch(`http://localhost:3000/api/v1/producer/${id}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json',
            },
            body: data,
        })
            .then($('.modal').hide())
            .then($('.modal').removeAttr('id'))
            .then(setTimeout(() => loadProducer(), 100))
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

$('.showProducer').on('click', '.delProducer', (event) => {
    let id = $(event.currentTarget.parentElement.parentElement).attr('id');
    fetch(`http://localhost:3000/api/v1/producer/${id}`, {
        method: 'DELETE',
    })
        .then(setTimeout(() => loadProducer(), 100))
        .catch((error) => console.log(error));
});
