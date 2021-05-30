# [Stock calculator](https://kemuriskilltest-kailash.website/) - With Vanilla Node JS
#### Calculates when to to buy and sell stocks based on input (CSV) file with headers [ date, stock_name, price ]. No frontend/backend frameworks been used in making of this web application.

### Libraries/Modules :-
---
* Papa Parse - frontend library used to parse CSV file to JSON from client end.
* In built Node libraries (http, fs, path) used to create this responsive web application.

### Continous deployment to self hosted VM :-
---

##### Automated building with GitHub Actions and DigitalOcean Droplet on every push to GitHub.

Site - https://kemuriskilltest-kailash.website/

### Functional testing using Selenium (Python) :-
---

##### Website's functionality been extensively tested with multiple automated tested cases written using Selenium and Python's unittest framework.

### Assumptions/Constraints :-
---
#### Contraints -
* Input CSV file should have headers like below -

|date|stock_name|price|
|----|----------|-----|
|11-02-2020|AAPL|310|

* Only DD-MM-YYYY (Date format) is allowed.
* Input CSV shouldn't be empty (shouldn't have empty rows as it would cause keys issue).

#### Assumptions - 
##### Standard Deviation (**SD**) & Mean (**M**) is calculated for selected range of dates, assuming if the given range 12-02-2020 which doesn't have a stock listed in input. It will assign a nearest predecessor value for the stock and assumes the same for remaining dates.

```
Example :-

Selected date: ---------------------------------------++
                                                      ||
                                                    vvvvvv
                                                  "12-02-2020"
Available date list: ["07-02-2020", "09-02-2020", "10-02-2020", "15-02-2020"]
Price list date:     [       350,        330,         340,           350    ]
Assumes stock value of date "10-02-2020"             ^^^^^^

If selected range is "12-02-2020" to "15-02-2020", Stock value for dates missing date in the list.
In this case "13-02-2020" & "14-02-2020" will be assumed from stock value from "12-02-2020" (nearest selected predecessor).

For selected range "12-02-2020" to "15-02-2020":-

Mean is calculated = 340 + 340 + 340 + 350 / 4 (equals to 342.5)
SD is calculated   = Square Root of (((340 - 342.5)2 + (340 - 342.5)2 + (340 - 342.5)2 + (350 - 342.5)2)/4) (equals to 4.33)

Max profit - when to buy more (200) stocks is calculated by finding the maximum and minimum prices of the selected stock between the user selected date range with constraints of minimum prices date should come before the maximum prices date whose difference should be high.

["350", "314", "320", "319", "323", "313", "330"] --> min (313) and max (330).
["7", "6", "1", "2"] --> min (1) and max(2).
["4", "3", "2", "1"] --> no dates available to buy or sell the stock.
```