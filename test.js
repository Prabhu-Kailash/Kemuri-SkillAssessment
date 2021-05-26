const { readFileSync } = require('fs');
const { join } = require('path');

/**
 * @param {Array of integers} prices Money (in INR)
 * @param {Array of objects} input When to buy and sell (in key-value pairs)
 */ 
function maxProfit(input, prices) {
    let max_profit = new Number;
    for (let i = 0; i < input.length; i++) {
        max_profit += prices[input[i].sell] - prices[input[i].buy]
    }
    return max_profit;
}

/**
 * @param {Array of integers} prices Money (in INR)
 */ 
function buySellStock(prices, start, end) {
    // Initiate Empty array to store object pair of 
    // indexes at when stock should be purchased and sold
    let final = new Array;
    let i = start;
    let profit = new Number(0);
    while ( i < end ) {
        // Compare (n+1)th element to it's nth element to find local minimum index of the value
        while((i < end) && (prices[i + 1] <= prices [i])) i++;
        // If index (i) after previous whie loop is equal to last index of array, 
        // break the loop as there isn't profit available at this stock
        if (i == end) break;
        // If index fall within total array index, store it in variable 'buy' (as a potential date to buy the stock)
        // & post increment it to find potential day to sell the stock
        let buy = i++;
        // Compare nth element to it's (n-1)th element to find local maximum index of the value
        while((i < end + 1) && (prices[i] >= prices [i - 1])) i++;
        // Once potential maximum index value is found store it  variable 'sell' (as a potential date to sell the previously bought stock)
        let sell = i - 1;
        // store variable buy and sell as an object in final array
        final.push({ buy, sell });
    }
    if (final.length > 0) profit = maxProfit(final, prices);
    return { final, profit };
}

function sort_obj(objs){
    objs.sort((a, b) => (a.date > b.date) ? 1 : ((b.date > a.date) ? -1 : 0))
    return objs;
}

function findRange(sorted_arr1, sorted_arr2) {
    let return_list = new Array;
    let i = 0;
    let j = 0;
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

function getStockNames(input_data, initial_range, final_range){
    let stockObj = new Object;
    let buy_sell = new Object;
    let sorted_obj = sort_obj(input_data);
    let stock_names = [...new Set(sorted_obj.map(ele => ele.stock_name.toUpperCase()))];
    for(let val of stock_names) {
        filtered_Array = sorted_obj.filter(item => item.stock_name.toUpperCase() == val);
        stockObj[val] = filtered_Array.map(function(item) {
            return [item.date, item.price];
        })
    }
    for(let val of Object.keys(stockObj)){
        let [start, end] = findRange(stockObj[val].map(item => item[0]), ['05-02-2020', '31-02-2020']);
        buy_sell[val] = buySellStock(stockObj[val].map(item => item[1]), start, end);
    }
    console.log(buy_sell.AAPL.profit)
}

const givenData = JSON.parse(readFileSync(join(__dirname, './stock.json')));
getStockNames(givenData);