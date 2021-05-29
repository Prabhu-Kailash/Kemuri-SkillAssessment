# Stock calculator - With Vanilla Node JS
#### Calculates when to to buy and sell stocks based on input (CSV) file with headers [ date, stock_name, price ]. No frontend/backend frameworks been used in making of this application.

### Libraries/Modules :-
* Papa Parse - frontend library used to parse CSV file to JSON from client end.
* In build Node libraries (http, fs, path) used to create this web application.

### Assumptions/Constraints :-
---
#### Contraints -
* Input CSV file should have headers like below -

|date|stock_name|price|
|----|----------|-----|
|11-02-2020|AAPL|310|

* Only DD-MM-YYYY (Date format) is allowed.
* Input CSV shouldn't be empty (shouldn't have empty rows as it would case keys issue).

#### Assumptions - 
Standard Deviation (**SD**) & Mean (**M**) is calculated for selected range of dates, assuming if the given range 12-02-2020 which doesn't have a stock listed in input. It will assign a nearest predecessor value for the stock and assumes the same for remaining dates.

```
Example :-

Selected date: ---------------------------------------++
                                                      ||
                                                    vvvvvv
                                                  "12-02-2020"
Available date list: ["07-02-2020", "09-02-2020", "10-02-2020", "15-02-2020"]
Price list date:     [       320,        330,         340,           350    ]
Assumes stock value of date "10-02-2020"             ^^^^^^

If selected range is "12-02-2020" to "15-02-2020", Stock value for dates missing date in the list.
In this case "13-02-2020" & "14-02-2020" will be assumed from stock value from "12-02-2020" (nearest selected predecessor).

For selected range "12-02-2020" to "15-02-2020":-

Mean is calculated = 340 + 340 + 340 + 350 / 4 (equals to 342.5)
SD is calculated   = Square Root of (((340 - 342.5)2 + (340 - 342.5)2 + (340 - 342.5)2 + (350 - 342.5)2)/4) (equals to 4.33)
```