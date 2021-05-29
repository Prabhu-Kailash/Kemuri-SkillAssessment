/**
 * @description Instanciates CSV class object.
 */
class CSV {
    
    /**
     * @param {Object} upload Uploaded file object.
     */
    constructor(upload) {
        this.upload = upload;
    }

    /**
     * @description Handles empty file selection.
     * @returns {boolean} Returns true or false.
     */
    filecheck() {
        if(!this.upload) {
            alert('Select a file please!');
            return false;
        }
        return true;
    }

    /**
     * @param {Array} data List of stock objects.
     * @description  Checks if there is any content inside the input file & 
     * verifies if keys in CSV matches with the default set of keys.
     * @returns {boolean} Returns true or false.
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
            if(!(data[i].date.split('-').length > 1 && data[i].date.split('-')[2].length == 4 && parseInt(data[i].date.split('-')[1]) < 13 && parseInt(data[i].date.split('-')[0]) < 32)) {
                alert('Date should be in "DD-MM-YYYY" format.');
                return false;
            }
        }
        return true;
    }

    /**
     * @method private
     * @param {Array} data List of stock objects.
     * @description Posts converted data to DB.
     * @returns {object} Returns Instance of class object.
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
     * @description Converts CSV to JSON using Papa parse library.
     * @returns {null} Returns null.
     */
    parseCSV() {
        Papa.parse(this.upload, {
            download: true,
            header: true,
            complete: results => (this.validation(results.data) == true) ? this.#store(results.data) : undefined
        });
        return null;
    }
}

/**
 * @description Instanciates HTML class object.
 */
class HTML {

    /**
     * @param {HTMLCanvasElement} parent Parent HTML element.
     * @param {string} template_literal String to be added.
     * @description Create's a paragraph element and attaches it to Parent element.
     * @return {Array} Returns null.
     */
    textNode(parent, template_literal) {
        let child = document.createElement('p');
        child.innerHTML = template_literal
        parent.appendChild(child);
        return null;
    }

    /**
     * @param {HTMLCanvasElement} parent Parent HTML element.
     * @param {string} template_literal String to be added.
     * @param {string} id HTML ID element.
     * @description Create's a div element and attaches it to Parent element.
     * @return {Array} Returns null.
     */
    div(parent, template_literal, id = 'undefined') {
        let div = document.createElement('div');
        div.id = id;
        div.innerHTML = template_literal;
        parent.appendChild(div);
        return null;
    }

    /**
     * @param {Array} items List of stock names.
     * @description Creates list of stock names under select.
     * @returns {null} null.
     */
    option(items) {
        for (let val of items) {
            let option = document.createElement('option');
            option.innerHTML = val;
            option.value = val;
            document.getElementById('slct').appendChild(option);
        }
        return null;
    }

    /**
     * @param {string} url URL endpoint.
     * @description Fetches data from a endpoint.
     * @return {object} returns json object.
     */
    async getData(url){
        const response = await fetch(url);
        const data = response.json();
        return data;
    }
}