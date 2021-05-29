const output = document.getElementById('output');
const canvas = new HTML();

/**
 * @param {Array} arr List of stock prices.
 * @description Calculates Minimum and Maximum in an array with minimum index less than the maximums index.
 * @return {Array} Returns Array of min and max elements.
 */
function minMax(arr) {
    let max = -Infinity;
    let min = Infinity;
    const dates = [];
    for (let i = arr.length - 1; i >= 0; i--) {
        const item = Number(arr[i]);
        if (item > max) {
        dates.push([min, max]);
        max = item;
        min = Infinity;
        } else if (item < min) {
        min = item;
        }
    }
    dates.push([min, max]);
    for(let j = dates.length - 1; j >= 0; j--) {
        if(Number.isFinite(dates[j][0])) return dates[j];
    }
    return [0, 0];
}

/**
 * @param {object} data Object with results from Stock buy and sell.
 * @description Appends results to canvas canvas depending on the input (output from Stock and sell problem).
 * @return {Array} Returns null.
 */
function outputElements(data) {
    let string = new String();
    if(data.buy_sell.final.length > 0) {
        let dateRange = data.buy_sell.range.map(item => item[0]);
        let priceRange = data.buy_sell.range.map(item => parseInt(item[1]));

        // To calculate Minimum and Maximum in an array with minimum index less than the maximums index.
        let [min, max] = minMax(priceRange);

        // Displays results for either one transaction (buy or sell) results.
        for (let val of data.buy_sell.final) {
            string = `Joe should buy stock at <strong>${dateRange[val.buy]}</strong> and sell at <strong>${dateRange[val.sell]}</strong> 
                                     which yields profit of <strong>${priceRange[val.sell] - priceRange[val.buy]}</strong> in INR`;
            canvas.textNode(output, string);
        }

        // Displays results for total profit yielded in given range with one transaction limit.
        string = `Total potential profit yielded in the given date range is <strong>${data.buy_sell.profit}</strong>
                   in INR with restriction of one transaction per day.`;
        canvas.textNode(output, string);

        // Displays Standard Deviation and Mean for given range.
        string = `<p>Standard Deviation (<strong>SD</strong>) : ${data.buy_sell.SD}</p>
                  <p>Mean (<strong>M</strong>) : ${data.buy_sell.mean}</p>`
        canvas.div(output, string, 'math');

        // Displays total max profit for 200 stocks by calculating min, max in the array.
        string = `<p>By buying <strong>200</strong> stocks at <strong>${dateRange[priceRange.indexOf(min)]}</strong> and selling all 
                   those stocks at <strong>${dateRange[priceRange.lastIndexOf(max)]}</strong>, Joe would yield a maximum profit of 
                   <strong>${(priceRange[priceRange.lastIndexOf(max)] - priceRange[priceRange.indexOf(min)]) * 200}</strong> in INR</p>`;
        canvas.div(output, string);
    } else {

        // Displays no profitable buy and sell found.
        string = `No possible dates found to buy or sell any of the stock to get profit in the selected range of dates. 
                      Try with different dates!`;
        canvas.textNode(output, string);
    }
    return null;
}


// Main function which gets executed at a page load.
document.onload = (async () => {
    const data = await canvas.getData('/getData');
    if(!data.error) {
        outputElements(data);
        document.getElementById('stock').innerHTML = `Stock : ${data.user[2]}`;
        document.getElementById('range').innerHTML = `Please find the results for selected range ${data.user[0]} to ${data.user[1]} below :- `;
    } else {
        canvas.textNode(output, `No stock details found! Try again.`);
    }
})();