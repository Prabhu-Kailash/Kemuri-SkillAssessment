const start = document.getElementById('start');
const end = document.getElementById('end');
const button = document.getElementById('btn');

function createElements(items) {
    for (let val of items) {
        let option = document.createElement("option");
        option.innerHTML = val;
        option.value = val;
        document.getElementById("slct").appendChild(option);
    }
}

async function getData(url){
    const response = await fetch(url);
    const data = response.json();
    return data;
}

document.onload = (async () => {
    const items = await getData("/get");
    if(items.error) {
        createElements([items.error]);
        start.disable = true;
        end.disable = true;
        button.disable = true;
        alert('Issue with reading the content! Try uploading the file again');
    } else {
        createElements(items.stock)
        start.value = items.start;
        start.min = items.start;
        start.max = items.end;
        end.value = items.end;
        end.min = items.start;
        end.max = items.end;
    }
})();