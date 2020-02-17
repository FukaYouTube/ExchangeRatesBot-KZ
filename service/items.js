function RUB(data) {
    let itemRUB = {
        title: data['elements'][0]['elements'][0]['elements'][6]['elements'][0]['elements'][0]['text'],
        update: data['elements'][0]['elements'][0]['elements'][6]['elements'][1]['elements'][0]['text'],
        course: data['elements'][0]['elements'][0]['elements'][6]['elements'][2]['elements'][0]['text'],
        ['up/down']: {
            level: data['elements'][0]['elements'][0]['elements'][6]['elements'][4]['elements'][0]['text'],
            num: data['elements'][0]['elements'][0]['elements'][6]['elements'][3]['elements'][0]['text']
        }
    }

    return itemRUB
}

function EUR(data) {
    let itemEUR = {
        title: data['elements'][0]['elements'][0]['elements'][7]['elements'][0]['elements'][0]['text'],
        update: data['elements'][0]['elements'][0]['elements'][7]['elements'][1]['elements'][0]['text'],
        course: data['elements'][0]['elements'][0]['elements'][7]['elements'][2]['elements'][0]['text'],
        ['up/down']: {
            level: data['elements'][0]['elements'][0]['elements'][7]['elements'][4]['elements'][0]['text'],
            num: data['elements'][0]['elements'][0]['elements'][7]['elements'][3]['elements'][0]['text']
        }
    }

    return itemEUR
}

function USD(data) {
    let itemUSD = {
        title: data['elements'][0]['elements'][0]['elements'][8]['elements'][0]['elements'][0]['text'],
        update: data['elements'][0]['elements'][0]['elements'][8]['elements'][1]['elements'][0]['text'],
        course: data['elements'][0]['elements'][0]['elements'][8]['elements'][2]['elements'][0]['text'],
        ['up/down']: {
            level: data['elements'][0]['elements'][0]['elements'][8]['elements'][4]['elements'][0]['text'],
            num: data['elements'][0]['elements'][0]['elements'][8]['elements'][3]['elements'][0]['text']
        }
    }

    return itemUSD
}

module.exports = {
    RUB,
    EUR,
    USD
}