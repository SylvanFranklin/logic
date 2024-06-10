export type Expression = LogicUnit[]
export type WellFormedFormula = (LogicUnit | boolean)[]
export type LogicUnit = 'p' | 'q' | 'r' | 's' | 'N' | 'C' | 'A' | 'K' | 'E'

// export function validateWFF(exp: Expression): boolean {
//     let unit: string;
//     switch (exp.body.length) {
//         case 1:
//             unit = exp.body[0]
//             if (unit == 'p' || unit == 'q' || unit == 'r' || unit == 's') {
//                 console.log('case 1 unit', unit)
//                 return true
//             }
//             break
//         case 2:
//             unit = exp.body[0]
//             if (unit == 'N' && exp.body[1] instanceof WellFormedFormula) {
//                 console.log('case 2 unit', unit)
//                 return true
//             }
//             break
//         case 3:
//             unit = exp.body[0]
//             if ((unit == 'C' || unit3 == 'A' || unit3 == 'K' || unit3 == 'E')
//                 && (exp.body[1] as Expression).wff
//                 && (exp.body[2] as Expression).wff) {
//                 console.log('case 3 unit', unit3)
//                 return true
//             }
//             break
//     }
//     return false
// }

function validateWFF(exp: WellFormedFormula): boolean {
    if (exp.length == 1) {
        if (exp[0] == 'p' || exp[0] == 'q' || exp[0] == 'r' || exp[0] == 's' || exp[0] == true) {
            return true
        }
    }
    return false
}

export function validateExpression(exp: Expression): boolean {
    let wff: WellFormedFormula = [exp[exp.length - 1] as LogicUnit];

    if (!(wff[0] == 'p' || wff[0] == 'q' || wff[0] == 'r' || wff[0] == 's')) {
        return false
    }

    for (let i = exp.length - 2; i >= 0; i--) {
        let current = exp[i] as LogicUnit
        wff.unshift(current)
        if (wff.length == 2) {
            if (current == "N" && validateWFF([wff[1]])) {
                wff = [true]
            }
        } else if (wff.length == 3 && validateWFF([wff[1]]) && validateWFF([wff[2]])) {
            if (current == 'N') {
                wff = [true, true]
            }

            if (current == 'C' || current == 'A' || current == 'K' || current == 'E') {
                wff = [true]
            }

        }
        console.log('wff', wff)
    }

    if (validateWFF(wff)) {
        return true
    }

    return false
}
