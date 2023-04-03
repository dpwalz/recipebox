
const unitRelativeSize = ['pinch', 'tsps', 'tbsps', 'cups'];

const compareDictionary = [
    { 
        size: 'pinch',
        multiplier: [
            {size: 'tsps', multiplier: 0.0625},
            {size: 'tbsps', multiplier: 0.0208333},
            {size: 'cups', multiplier: 0.0013020833}
        ]
    },
    {
        size: 'tsps',
        multiplier: [
        {size: 'tbsps', multiplier: 0.333333},
        {size: 'cups', multiplier: 0.0208333}
        ]
    },
    {
        size: 'tbsps',
        multiplier: [
            {size: 'cups', multiplier: 0.0625},
        ]
    }
]

const conversionAvailable = async(unit1, unit2) => {
    if(unit1 === unit2){
        return true;
    } else if (unitRelativeSize.includes(unit1) && unitRelativeSize.includes(unit2)){
        return true;
    } else {
        return false;
    }
}

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

module.exports = {combineUnits, conversionAvailable};