const add_user = document.getElementById('add_user');
const double_money = document.getElementById('double_money');
const show_mill = document.getElementById('show_mill');
const sort_richest = document.getElementById('sort_richest');
const total_wealth = document.getElementById('total_wealth');
const main = document.getElementById('main');

let data = [];

getRandomUser();
getRandomUser();

async function getRandomUser() {
    const res = await fetch('https://randomuser.me/api');
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
        name: `${user.name.first} ${user.name.last}`,
        money: Math.floor(Math.random() * 1000000)
    };
    addUser(newUser);
}

function addUser(obj) {
    data.push(obj);
    updateDOM();
}

function doubleMoney() {
    data = data.map(user => {
        return { ...user, money: user.money * 2 };
    });
    updateDOM();
}

function showMill() {
    data = data.filter(user => user.money > 1000000);
    updateDOM();
}

function sortRichest() {
    data = data.sort((a, b) => {
        return b.money - a.money;
    });
    updateDOM();
}

function totalWealth() {
    const wealth = data.reduce((i, user) => (i +=
        user.money), 0);
    const newElement = document.createElement('tr');
    newElement.innerHTML = `<td><strong>TOTAL WEALTH: </strong></td>
    <td>${formatMoney(wealth)}</td>`;
    main.appendChild(newElement);
}

function updateDOM(givenData = data) {
    main.innerHTML = `<tr>
                        <th>PERSON</th>
                        <th>WEALTH</th>
                    </tr>`;
    givenData.forEach(item => {
        const element = document.createElement('tr');

        element.innerHTML = `<td><strong>${item.name}</strong></td>
        <td>${formatMoney(item.money)}</td>`;
        main.appendChild(element);
    });
}

function formatMoney(item) {
    return '$' + item.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

add_user.addEventListener('click', getRandomUser);
double_money.addEventListener('click', doubleMoney);
show_mill.addEventListener('click', showMill);
sort_richest.addEventListener('click', sortRichest);
total_wealth.addEventListener('click', totalWealth);