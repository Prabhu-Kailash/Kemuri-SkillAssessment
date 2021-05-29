const start = document.getElementById('start');
const end = document.getElementById('end');
const button = document.getElementById('btn');
const canvas = new HTML();

// Main function which gets executed at a page load.
document.onload = (async () => {
    const items = await canvas.getData('/get');
    if(items.error) {
        canvas.option([items.error]);
        alert('Issue with reading the content! Try uploading the file again');
    } else {
        canvas.option(items.stock)
        start.value = items.start;
        start.min = items.start;
        start.max = items.end;
        end.value = items.end;
        end.min = items.start;
        end.max = items.end;
    }
})();