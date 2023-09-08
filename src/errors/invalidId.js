export function invalidIdError() {
    return {
        type: "invalidId",
        message: `ID inválido! Deve ser um número inteiro maior que zero.`
    }
}