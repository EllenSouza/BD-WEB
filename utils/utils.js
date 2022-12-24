/**
 * Recebe um array de objetos cada campo em um novo array.
 * @param {Array} data : Dados a serem mapeados
 * @param {Array<string>} fields : Campos a serem separados
 * @returns Array, onde cada posição é um array com os fields
 */

export function separateData(data, fields) {
    const newData = fields.map((field) => {
        return data.map((reg) => {
            return reg[field];
        });
    });

    return newData;
}

/**
 * Recebe um array de labels e um conjunto de datasets e retorna o CharModel
 * correspondente para gerar o gráfico.
 * @param {Array<string>} labels
 * @param {Array} datasets
 * @returns ChartModel para geração do gráfico
 */

export function newChartData(labels, datasets) {
    return {
        labels: labels,
        datasets: datasets,
    };
}

/**
 * Cria um dataset a partir dos parâmetros de configurações
 * @param {string} label
 * @param {Array} data
 * @param {Array<string>} backgroundColor
 * @param {Array<string>} hoverBackgroundColor
 * @returns Dataset
 */
export function newDataset(
    label,
    data,
    backgroundColor = [],
    hoverBackgroundColor = []
) {
    return {
        label: label,
        data: data,
        // backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726', '#FFCE56'],
        backgroundColor: backgroundColor,
        hoverBackgroundColor: hoverBackgroundColor,
        // hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D', '#FFCE56'],
        fill: false,
        borderColor: '#42A5F5',
    };
}

const newChartOptions = (title) => {
    return {
        plugins: {
            title: {
                display: true,
                text: title,
                font: {
                    size: 16,
                },
            },
            legend: {
                position: 'top',
            },
        },
    };
};
