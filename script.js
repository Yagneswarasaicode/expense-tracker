document.addEventListener("DOMContentLoaded", () => {

    let expense = JSON.parse(localStorage.getItem("expense")) || [];
    let categories = [];

    function save() {
        localStorage.setItem("expense", JSON.stringify(expense));
    }

    async function api() {
        const select = document.getElementById("selection");
        select.innerHTML = "<option>Loading...</option>";

        try {
            const response = await fetch("https://api.npoint.io/397a003601dc57cd6362");
            const data = await response.json();

            categories = data;
            select.innerHTML = "";

            for (let i = 0; i < categories.length; i++) {
                const name = categories[i]?.name;
                if (name) {
                    select.innerHTML += `<option>${name}</option>`;
                }
            }

        } catch (error) {
            select.innerHTML = "<option>Failed to load categories</option>";
            console.error(error);
        }
    }

    api();

    window.add = function () {
        const a = document.getElementById("amount").value;
        const b = document.getElementById("date").value;
        const c = document.getElementById("selection").value;
        const d = document.getElementById("story").value;

        expense.push({ amount: a, date: b, selection: c, story: d });
        alert("added");
        save();
        display();
    };

    window.display = function () {
        let s = "";
        for (let i = 0; i < expense.length; i++) {
            s += `<p>
                ${expense[i].amount}
                ${expense[i].date}
                ${expense[i].selection}
                ${expense[i].story}
                <button onclick="edit(${i})">edit</button>
                <button onclick="del(${i})">delete</button>
            </p>`;
        }
        document.getElementById("result").innerHTML = s;
    };

    window.edit = function (index) {
        if (!confirm("you want to change data")) return;

        const a = prompt("enter the amount:", expense[index].amount);
        const d = prompt("enter the date:", expense[index].date);
        const o = prompt("change category:", expense[index].selection);
        const s = prompt("enter description:", expense[index].story);

        expense[index] = { amount: a, date: d, selection: o, story: s };
        save();
        display();
    };

    window.del = function (index) {
        expense.splice(index, 1);
        save();
        display();
    };

    window.search = function () {
        const x = document.getElementById("search").value.toLowerCase();
        const box = document.getElementById("searchresult");

        if (x === "") {
            box.innerHTML = "";
            return;
        }

        let c = "";
        for (let i = 0; i < expense.length; i++) {
            if (
                expense[i].story.toLowerCase().includes(x) ||
                expense[i].selection.toLowerCase().includes(x) ||
                expense[i].date.includes(x) ||
                expense[i].amount.toString().includes(x)
            ) {
                c += `<p>
                    ${expense[i].amount}
                    ${expense[i].date}
                    ${expense[i].selection}
                    ${expense[i].story}
                </p>`;
            }
        }

        box.innerHTML = c || "no result found";
    };

});
