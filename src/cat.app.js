import './cat.app.css';

const API_URL = "http://agl-developer-test.azurewebsites.net/people.json";

export class CatApp {
    constructor() {
        this.targetNode = document.getElementById("pets");
    }
    init() {
        return Promise.resolve()
            .then(this.fetchData)
            .then(data => this.processData(data))
            .catch(function (error) {
                console.log(error);
            })
            .then(data => this.renderList(data))
    }

    fetchData() {
        return window.fetch(API_URL)
            .then((response) => { return response.json() })
            .catch(function (error) {
                console.log(error);
            })
    }

    processData(data) {
        if (data == undefined) return;
        var sortedCatsList = {
            "male": this.getCatsSortedByName(data.filter(subitem => subitem.gender === 'Male')),
            "female": this.getCatsSortedByName(data.filter(subitem => subitem.gender === 'Female'))
        }
        return sortedCatsList;
    }

    getCatsSortedByName(data) {
        if (data == undefined) return [];
        var sortList = [];
        data.map(item => {
            var catArr = (item.pets || []).filter(pet => pet.type === 'Cat');
            catArr.map(cat => {
                sortList.push(cat);
            });
        })
        return sortList.sort(function (a, b) { return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0); });

    }

    renderList(data) {
        if (data == undefined) return;
        this.targetNode.innerHTML = [
            ...this.drawPets(data.male, 'MALE'),
            ...this.drawPets(data.female, 'FEMALE')
        ].join('\n');
    }

    drawPets(data, type) {
        if (data == undefined) return [`<h2>No Cats For ${type}</h2>`];
        const liNodes = data.map(item => {
            return [`<li>${item.name}</li>`]
        })

        return [
            `<h2>${type}</h2>`,
            `<ul>`,
            ...liNodes,
            `</ul>`
        ];
    }
}
