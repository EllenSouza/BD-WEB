/**
 * Recebe um array de objetos e o separa dois arrays,
 * um de labels e outro com os values.
 * @param {Array} data : Dados a serem mapeados
 * @param {string} label : Campo que representa as labels
 * @param {string} value : Campo que representa os dados
 * @returns Array com as labels e os values
 */

export function separateData(data, label, value) {
    const labels = data.map((reg) => {
        return reg[label];
    });
    const values = data.map((reg) => {
        return reg[value];
    });
    return [labels, values];
}
