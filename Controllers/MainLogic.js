/**
 * @description Instantiates Stock class object
 */
class Stock {

    /**
     * @param {Array} data list of stock objects
     */ 
    constructor(data) {
        this.data = data;
    }

    /**
     * @param {Array} _data list of stock objects
     * @method static
     * @description Sorts the array based on date
     * @returns {object} Sorted array
     */
    static sort_obj(objs){
        objs.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
        return objs;
    }

    /**
     * @param {Array} prices Money (in INR)
     * @param {Array} input When to buy and sell (in key-value pairs)
     * @description Compares the indices of buy and sell (object) with prices array to return max profit
     * @returns {number} returns max profit
     */ 
    maxProfit(input, prices) {
        // Get object of when to buy and sell a stock
        // Compares the indices of buy and sell with prices array to return max profit
        let max_profit = new Number();
        for (let i = 0; i < input.length; i++) {
            max_profit += prices[input[i].sell] - prices[input[i].buy]
        }
        return max_profit;
    }

    /**
     * @param {Array} prices Money (in INR)
     * @param {Number} start start index of array
     * @param {Number} end end index of array
     * @description Calculates when to buy and sell stock for given range of dates
     * @returns {object} Object (includes index when to buy and sell stock) and total profit
     */ 
    buySellStock(prices) {
        // Initiate Empty array to store object pair of 
        // indexes at when stock should be purchased and sold
        let final = new Array();
        let i = 0;
        let profit = new Number(0);
        while (i < prices.length - 1) {

            // Compare (n+1)th element to it's nth element to find local minimum index of the value
            while((i < prices.length - 1) && (prices[i + 1] <= prices [i])) i++;

            // If index (i) after previous while loop is equal to last index of array, 
            // break the loop as there isn't profit available at this stock
            if (i == prices.length - 1) break;

            // If index fall within total array index, store it in variable 'buy' (as a potential date to buy the stock)
            // & post increment it to find potential day to sell the stock
            let buy = i++;

            // Compare nth element to it's (n-1)th element to find local maximum index of the value
            while((i < prices.length) && (prices[i] >= prices [i - 1])) i++;

            // Once potential maximum index value is found store it variable 'sell' (as a potential date to sell the previously bought stock)
            let sell = i - 1;

            // store variable buy and sell as an object in final array
            final.push({ buy, sell });
        }
        if (final.length > 0) profit = this.maxProfit(final, prices);
        return { final, profit };
    }

    /**
     * @param {Array} sorted_arr1 list of dates
     * @param {Array} sorted_arr2 list of dates
     * @description Gets the a stock prices list and compares them with given 
     * input range to identify & return the index
     * @returns {Array} returns array of start and end index 
     */ 
    findRange(sorted_arr1, sorted_arr2) {
        let return_list = new Array();
        let i = new Number(0);
        let j = new Number(0);
        while (i < sorted_arr1.length && j < sorted_arr2.length) {
            if(sorted_arr1[i] < sorted_arr2[j]) {
                i++;
            } else if (sorted_arr1[i] >= sorted_arr2[j]) {
                if(sorted_arr1[i] == sorted_arr2[j]) return_list.push(i);
                if(sorted_arr1[i] > sorted_arr2[j]) return_list.push((i == 0) ? 0: (i-1));
                j++;
            }
        }
        if(j == 1) return_list.push(sorted_arr1.length - 1);
        return return_list;
    }
}

/**
 * @description Instanciates StockMath class object
 */
class StockMath {

    #stockDates;
    #stockPrices;
    /**
     * @param {Array} stockDates Sorted array of dates
     * @param {Array} stockPrices Sorted array of prices
     */ 
    constructor(stockDates, stockPrices) {
        this.#stockDates = stockDates;
        this.#stockPrices = stockPrices;
        this.#rangeCleanup();
    }

    /**
     * @method static
     * @param {number} Number range(0, n)
     * @description Similar to Python range function
     * @returns {Array} Array of numbers (n-1)
     */ 
    static range(n) {
        return [...Array(n).keys()];
    }

    /**
     * @method private
     * @description Mutates Stock prices array to get range of prices as per user's input
     */
    #rangeCleanup() {
        let date_range = this.#stockDates.map(date => parseInt(date.split('-')[0]));
        let i = new Number(0);
        while(i < date_range.length) {
            if((date_range[i + 1] - date_range[i]) > 1) {
                for(let k in StockMath.range(date_range[i + 1] - date_range[i] - 1)) {
                    this.#stockPrices.splice(i, 0, this.#stockPrices[i])
                }
            }
            i++;
        }
    }

    /**
     * @description Gets Uncorrected Standard Deviation
     * @returns {string} Uncorrected SD for an initialized range of stock prices
     */
    get standardDeviation() {
        return (Math.sqrt(this.#stockPrices.map(x => Math.pow(parseInt(x) - this.mean, 2)).reduce((a, b) => a + b) / this.#stockPrices.length)).toFixed(2);
    }

    /**
     * @description Gets mean for given range
     * @returns {string} Mean for an initialized range of stock prices
     */
    get mean() {
        return ((this.#stockPrices.reduce((a, b) => parseInt(a) + parseInt(b))) / this.#stockPrices.length).toFixed(2);
    }
}


module.exports = {
    Stock,
    StockMath
}