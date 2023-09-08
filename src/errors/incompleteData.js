export function incompleteDataError() {
    return {
        type: "incompleteData",
        message: `Preencha todos os dados!`
    }
}