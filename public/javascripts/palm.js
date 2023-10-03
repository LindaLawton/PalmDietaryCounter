


document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("textForm");
    const textInput = document.getElementById("textInput");
    const sendButton = document.getElementById("sendButton");
    const responseDiv = document.getElementById("response");
    const errorDiv = document.getElementById("error");

    let path = window.location.protocol + '//' + window.location.hostname + ':' + window.location.port;

    // Define the API endpoint URL
    const apiUrl = path + "/palm"// Grabs current endpoint.

    sendButton.addEventListener("click", function () {
        const text = textInput.value;

        // Make a POST request to the API endpoint
        fetch(apiUrl, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ text: text }),
        })
            .then(response => response.json())
            .then(data => {

                if(!data.message[0].hasOwnProperty("candidates")) {
                    // this should grab invalid api key and bad location errors.
                    throw new Error(`Palm API returned an error: .${data.message[0]}`);
                }
                // Verify response is json
                let clean;
                try {
                    clean = data.message[0].candidates[0].output.replace("json", "").replace("```", "").replace("```", "").replace("\n", "")
                    return JSON.parse(clean);
                } catch (e) {
                    // sometimes the API returns garbage json.
                    throw new Error(`Cant parse response: .${clean}`);
                }
            })
            .then(calories => {
                // If we are here then it should be clean.

                const p = document.createElement('p');
                p.textContent = `Tracking: ${calories.type}`;
                responseDiv.appendChild(p);


                // Create the HTML table
                const table = document.createElement("table");

                // Create table header row
                const headerRow = table.insertRow();
                const headerCell1 = headerRow.insertCell(0);
                const headerCell2 = headerRow.insertCell(1);
                const headerCell3 = headerRow.insertCell(2);
                headerCell1.textContent = "Amount";
                headerCell2.textContent = "Food Item";
                headerCell3.textContent = calories.type;

                // Populate the table with data
                calories.items.forEach(item => {
                    const row = table.insertRow();
                    const cell1 = row.insertCell(0);
                    const cell2 = row.insertCell(1);
                    const cell3 = row.insertCell(2);
                    cell1.textContent =  item.amount.amount + " "+ item.amount.unit_of_measure;
                    cell2.textContent = item.food_item;
                    cell3.textContent = item.total;
                });
                const row = table.insertRow();
                const cell1 = row.insertCell(0);
                const cell2 = row.insertCell(1);
                const cell3 = row.insertCell(2);
                cell1.textContent = "Total";
                cell3.textContent = calories.total_calories_consumed;
                // Append the list to the responseDiv
                responseDiv.appendChild(table);
                errorDiv.innerHTML = `Debug Json: ${JSON.stringify(calories, null, 4)}`;
            })
            .catch(error => {
                console.error("Error:", error);
                errorDiv.innerHTML = `${error}`;
            });
    });
});
