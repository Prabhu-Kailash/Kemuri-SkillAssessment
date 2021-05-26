
// Validates empty data set, invalid inputs and posts data to DB (JSON file)
function csv2JSON(results, e) {
    const data = results.data;
    // Checks if there is any content inside the input file
    if (!data.length) {
        alert('File is empty! Make sure to have content inside it.');
        e.preventDefault();
        return false;
    }
    const keys = ['date', 'stock_name', 'price'];
    // Verifies if keys in CSV matches with the default set of keys
    for (let i = 0; i < data.length; i++) {
        let obj_keys = Object.keys(data[i])
        if(!keys.every(i => obj_keys.includes(i))) {
            alert('Kindly make sure all these keys/columns exist in the CSV (date, stock_name, price) all lowercase.');
            e.preventDefault();
            return false;
        }
    }
    // Posts converted data to DB
    fetch('/post', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data)
    })
    .then(() => window.location.href = '/post')
    .catch(error => alert(error));
}


// Gets the file name selected to the front end
document.getElementById('upload-csv').addEventListener('change', () => {
    if(document.getElementById('upload-csv').files[0])
        document.getElementById('file-name').innerHTML = document.getElementById('upload-csv').files[0].name;
});

// Posts the submitted CSV data to route '/post' and gets to next page
document.getElementById('btn-upload-csv').addEventListener('click', (e) => {
    // Handles empty file selection
    if(!document.getElementById('upload-csv').files[0]) {
        alert('Select a file please!');
        e.preventDefault();
        return false;
    }			
    // Papa parse library to parse CSV data to JSON
    Papa.parse(document.getElementById('upload-csv').files[0], {
        download: true,
        header: true,
        complete: results => csv2JSON(results, e)
    });
});