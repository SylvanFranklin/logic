import { writable } from "svelte/store"
export type LogicUnit = 'p' | 'q' | 'r' | 's' | 'N' | 'C' | 'A' | 'K' | 'E'
interface Reason {
    units: string[]
    rule: string
}
export let reasons = writable<Reason[]>([])

export function isWFF(expression: string): boolean {
    function isPropositionalVariable(char: string): boolean {
        return ['p', 'q', 'r', 's'].includes(char);
    }

    function checkWFF(expr: string): boolean {
        if (expr.length === 0) {
            return false;
        }

        if (expr.length === 1 && isPropositionalVariable(expr)) {
            reasons.update((r) => [...r, { units: [expr], rule: 'C1' }]);
            return true;
        }

        if (expr.length > 1 && expr[0] === 'N') {
            reasons.update((r) => [...r, { units: [expr], rule: 'C2' }]);
            return checkWFF(expr.substring(1));
        }

        if (expr.length > 2 && ['C', 'A', 'K', 'E'].includes(expr[0])) {
            for (let i = 1; i < expr.length - 1; i++) {
                const left = expr.substring(1, i + 1);
                const right = expr.substring(i + 1);
                if (checkWFF(left) && checkWFF(right)) {
                    reasons.update((r) => [...r, { units: [expr], rule: 'C3' }]);
                    return true;
                }
            }
        }

        reasons.set([])
        return false;
    }

    reasons.set([])
    return checkWFF(expression);
}



export function rollDice(count: number): LogicUnit[] {
    let dice: LogicUnit[] = []
    if (count % 2 == 0) {
        // then we draw half from p q r s, and half from the rest
        for (let i = 0; i < count / 2; i++) {
            dice.push(['p', 'q', 'r', 's'][Math.floor(Math.random() * 4)] as LogicUnit)
        }

        for (let i = 0; i < count / 2; i++) {
            dice.push(['C', 'A', 'K', 'E', 'N'][Math.floor(Math.random() * 5)] as LogicUnit)
        }

    } else {
        // then we draw half+1 from p q r s, and the remainint from the rest
        for (let i = 0; i < Math.ceil((count / 2)); i++) {
            dice.push(['p', 'q', 'r', 's'][Math.floor(Math.random() * 4)] as LogicUnit)
        }

        for (let i = 0; i < Math.floor(count / 2); i++) {
            dice.push(['C', 'A', 'K', 'E', 'N'][Math.floor(Math.random() * 5)] as LogicUnit)
        }
    }


    return dice
}

