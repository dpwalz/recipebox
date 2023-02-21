
const unitRelativeSize = ['pinch', 'tsp', 'tbsp', 'cup'];

const compareDictionary = [
    { 
        size: 'pinch',
        multiplier: [
            {size: 'tsp', multiplier: 0.0625},
            {size: 'tbsp', multiplier: 0.0208333},
            {size: 'cup', multiplier: 0.0013020833}
        ]
    },
    {
        size: 'tsp',
        multiplier: [
        {size: 'tbsp', multiplier: 0.333333},
        {size: 'cup', multiplier: 0.0208333}
        ]
    },
    {
        size: 'tbsp',
        multiplier: [
            {size: 'cup', multiplier: 0.0625},
        ]
    }
]

const compareUnits = (unit1, unit2) => {
    let compare = unit1 === unit2
    return compare;
}

const convertUnits = async(unit, quantity, new_unit) => {
    const compareDict = compareDictionary.find(obj => {
        return obj.size === unit;
    })
    const multiplierDict = compareDict.multiplier.find(obj => {
        return obj.size === new_unit;
    })
   
    return quantity * multiplierDict.multiplier;
}

const combineUnits = async(payload1, payload2) => {
    let smallPayload;
    let largePayload;
    
    if(!compareUnits(payload1.unit, payload2.unit)){ 
        if(unitRelativeSize.indexOf(payload1.unit) < unitRelativeSize.indexOf(payload2.unit)){
            smallPayload = payload1;
            largePayload = payload2;
        } else {
            smallPayload = payload2;
            largePayload = payload1;
        }
        let quantitySmall = smallPayload.quantity;
        const unitSmall = smallPayload.unit;
        const quantityLarge = largePayload.quantity;
        const unitLarge = largePayload.unit;
        
        quantitySmall = await convertUnits(unitSmall, quantitySmall, unitLarge);
        
        const returnPayload = {
            quantity: quantityLarge + quantitySmall,
            unit: unitLarge
        };
        return returnPayload;

    } else {
        const returnPayload = {
            quantity: payload1.quantity + payload2.quantity,
            unit: payload1.unit
        }
        return returnPayload;
    }
}

module.exports = {combineUnits};