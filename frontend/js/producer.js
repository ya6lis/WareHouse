const loadProducer = () => {
    $('.showProducer').empty();
    fetch('http://localhost:3000/api/producer')
        .then((res) => res.json())
        .then((producers) => {
            producers.forEach((producer) => {
                $('.showProducer')
                    .prepend(`<div class="producerData py-2 d-flex justify-content-between" id="${producer.producer_id}">
                <div class="producerInfo">id: ${producer.producer_id}</div>
                <div class="producerInfo">name: ${producer.name}</div>
                <div class="producerInfo">is_deleted: ${producer.is_deleted}</div>
                <button type="button" class="delProducer">Delete Producer</button>
            </div>`);
            });
        })
        .catch((error) => console.log(error));
};

loadProducer();

const getDataForNewProducer = () => {
    const producerData = {
        name: null,
    };
    let checkAllRight = 0;

    Object.keys(producerData).forEach((value) => {
        if (
            !$(`input[name=${value}]`).val()
        ) {
            console.log('inncorect');
        } else {
            checkAllRight++;
            producerData[value] = $(`input[name=${value}]`).val();
        }
    });
    if (checkAllRight === Object.keys(producerData).length) {
        return JSON.stringify(producerData);
    } else {
        return 0;
    }
};

$('.addBtn').on('click', () => {
    const data = getDataForNewProducer();
    if (data) {
        fetch('http://localhost:3000/api/producer', {
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

$('.showProducer').on('click', '.delProducer', (event) => {
    const returnId = {
        id: $(event.currentTarget.parentElement).attr('id'),
    };
    fetch('http://localhost:3000/api/producer', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(returnId),
    })
        .then(setTimeout(() => loadProducer(), 100))
        .catch((error) => console.log(error));
});