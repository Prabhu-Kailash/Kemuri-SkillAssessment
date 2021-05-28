
// Gets the file name selected to the front end,
// creates instance of class CSV to post data to backend.
document.getElementById('upload-csv').addEventListener('change', (e) => {
    e.preventDefault();
    // Instance of class CSV
    let upload = new CSV (document.getElementById('upload-csv').files[0]);
    if(upload) {
        document.getElementById('file-name').innerHTML = upload.name == undefined ? 'No file selected' : upload.name;
        if(upload.filecheck()) upload.parseCSV();
    }
});