// utility function to get DOM element from string
function getElementFromStrings(string) {
    let div = document.createElement("div");
    div.innerHTML = string;
    return div.firstElementChild;
}

// let addedparamCount
let addedparamCount = 0

// initially requestJsonBox shows
let paramatersBox = document.getElementById("paramatersBox")
paramatersBox.style.display = "none";

// when someone chooses json
let json = document.getElementById("json")
json.addEventListener("click", () => {
    let requestJsonBox = document.getElementById("requestJsonBox")
    requestJsonBox.style.display = "block"
    paramatersBox.style.display = "none";
})

// when someone choses custom
let custom = document.getElementById("custom")
custom.addEventListener("click", () => {
    let requestJsonBox = document.getElementById("requestJsonBox")
    requestJsonBox.style.display = "none"
    paramatersBox.style.display = "block";
})

// when someone clicks on +(add button)
let addParam = document.getElementById("addParam")
addParam.addEventListener("click", () => {
    let params = document.getElementById("params")
    let string = `<div class="form-row my-2">
    <label for="Parameter${addedparamCount + 2}" class="col-sm-2 col-form-label">Parameter ${addedparamCount + 2}</label>
    <div class=" col-md-4">
        <input type="text" class="form-control" id="parameterKey${addedparamCount + 2}" placeholder="Enter Parameter ${addedparamCount + 2} Key">
    </div>
    <div class=" col-md-4">
        <input type="text" class="form-control" id="parameterValue${addedparamCount + 2}" placeholder="Enter Parameter ${addedparamCount + 2} Value">
    </div>
    <button type="button" class="btn btn-secondary deletParam">-</button>
</div>`
    let paramelement = getElementFromStrings(string)
    params.appendChild(paramelement)
    let deletParam = document.getElementsByClassName("deletParam")
    for (let item of deletParam) {
        item.addEventListener("click", e => e.target.parentElement.remove())
    }
    addedparamCount++;
})

// clicking on sumit buttton
let submit = document.getElementById("submit")
submit.addEventListener("click", () => {
    document.getElementById("responsePrism").innerHTML = "Please Wait... Fetching response...";

    let url = document.getElementById("url").value
    let responseType = document.querySelector("input[name='requestType']:checked").value
    let contentType = document.querySelector("input[name='contentType']:checked").value

    if (contentType == "params") {
        data = {}
        for (i = 0; i < addedparamCount + 1; i++) {
            if (document.getElementById('"parameterKey"+(i+1)') != undefined) {
                let key = document.getElementById("parameterKey" + (i + 1)).value
                let value = document.getElementById("parametervalue" + (i + 1)).value
                data[key] = value
            }
            data = JSON.stringify(data)
        }
    }
    else {
        data = document.getElementById("responsePrism").innerHTML
    }

    if (responseType == "GET") {
        fetch(url, { method: "GET" }).then(response => response.text()).then(text => {document.getElementById("responsePrism").innerHTML = text;
        Prism.highlightAll();})
    }
    else {
        fetch(url, {
            method: "POST",
            body: data,
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(response => response.text()).then(text => {document.getElementById("responsePrism").innerHTML = text;
Prism.highlightAll(); })
    }
})





