/**
 * @description Instanciates CSV class object
 */
class CSV {
    
    /**
     * @param {Object} upload Uploaded file object
     */
    constructor(upload) {
        this.upload = upload;
    }

    /**
     * @description Handles empty file selection
     * @returns {boolean} true or false
     */
    filecheck() {
        if(!this.upload) {
            alert('Select a file please!');
            return false;
        }
        return true;
    }

    /**
     * @param {Arrays} data list of stock objects
     * @description  Checks if there is any content inside the input file & 
     * verifies if keys in CSV matches with the default set of keys
     * @returns {boolean} true or false
     */
    validation(data) {

        if (!data.length) {
            alert('File is empty! Make sure to have content inside it.');
            return false;
        }

        for (let i = 0; i < data.length; i++) {
            if(!['date', 'stock_name', 'price'].every(j => Object.keys(data[i]).includes(j))) {
                alert('Kindly make sure all these keys/columns exist in the CSV (date, stock_name, price) all lowercase.');
                return false;
            }
            if(!(data[i].date.split("-").length > 1 && data[i].date.split("-")[2].length == 4 && parseInt(data[i].date.split("-")[1]) < 13 && parseInt(data[i].date.split("-")[0]) < 32)) {
                alert('Date should be in "DD-MM-YYYY" format.');
                return false;
            }
        }
        return true;
    }

    /**
     * @method private
     * @param {Arrays} data list of stock objects
     * @description Posts converted data to DB
     * @returns {object} instance of class object
     */
    #store(data) {
        fetch('/post', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        })
        .then(() => window.location.href = '/post')
        .catch(error => alert(error));
        return this;
    }
    
    /**
     * @description Converts CSV to JSON using Papa parse library
     */
    parseCSV() {
        Papa.parse(this.upload, {
            download: true,
            header: true,
            complete: results => (this.validation(results.data) == true) ? this.#store(results.data) : undefined
        });
    }
}