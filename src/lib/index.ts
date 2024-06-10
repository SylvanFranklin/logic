
interface Expression {
    body: [string, Expression, Expression] | [string, Expression] | string
    isWFF: boolean
}
export function validateWFF(exp: Expression): boolean {

    if (exp.body.length == 1 && (exp.body == 'p' || exp.body == 'q' || exp.body == 'r' || exp.body == 's')) {
        return true
    }

    if (exp.body.length == 2) {
        if (exp.body[0] == 'N' && validateWFF(exp.body[1] as Expression)) {
            return true
        }

    }

    if (exp.body.length == 3 && (exp.body[0] == 'C' || exp.body[0] == 'A' || exp.body[0] == 'K' || exp.body[0] == 'E') &&
        validateWFF(exp.body[1] as Expression) &&
        validateWFF(exp.body[2] as Expression)
    ) {
        return true
    }
    return false
}
