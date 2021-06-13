const searchField = document.querySelector("#searchField");

const tableOutput = document.querySelector(".table-output");
const appTable = document.querySelector(".app-table");
const paginationContainer = document.querySelector(".pagination-container");
tableOutput.style.display = "none";
const noResults = document.querySelector(".no-results");
const tbody = document.querySelector(".table-body");

searchField.addEventListener("keyup", (e) => {
    const searchValue = e.target.value;

    if (searchValue.trim().length > 0) {
        paginationContainer.style.display = "none";
        tbody.innerHTML = "";
        fetch("/search_todos", {
            body: JSON.stringify({ searchText: searchValue }),
            method: "POST",
        })
            .then((res) => res.json())
            .then((data) => {
                console.log("on data", data);
                appTable.style.display = "none";
                tableOutput.style.display = "block";

                if (data.length === 0) {
                    tableOutput.innerHTML = "No result found";
                } else {
                    data.forEach((item) => {
                    console.log(item)
                        tbody.innerHTML+=`
                            <tr>
                                <td>${item.created}</td>
                                <td>${item.description}</td>
                                <td>${item.deadline}</td>
                                <td>${item.status}</td>
                            </tr>`;
                    })
                }
            });
        } else {
            tableOutput.style.display = "none";
            appTable.style.display = "block";
            paginationContainer.style.display = "block";
        }
    })
