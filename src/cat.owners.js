import './styles/cat.owner.css';

const APIURL = "http://agl-developer-test.azurewebsites.net/people.json";


export class CatOwners {
    constructor () {
        this.config = {
            dataurl : APIURL
        }
    }

    init() {
        this.config.targetNode = document.getElementById("pets");
        const self = this;
        return Promise.resolve()
        .then(this.fetchData)
        .then(data => this.processData(data)) 
        .catch(function(error) {
            console.log(error);
        })
        .then(data => this.drawResultantList(data))
        
    }

    fetchData () {
        return window.fetch(APIURL)
        .then((response) => {return response.json()})
        .catch(function(error) {
            console.log(error);
        })
    }

    processData (data) {
        return this.listAllCatsByGender(data);
    }

    listAllCatsByGender (data) {
        
        var sortedCatsList = {
            "male" : this.getAllCats(data.filter(subitem => subitem.gender === 'Male')),
            "female" : this.getAllCats(data.filter(subitem => subitem.gender === 'Female'))
        }
        return sortedCatsList;
    }

    getAllCats (filtereddata) {
        var self = this;
        var sortList = [];
        filtereddata.map(item => {
          var catArr =  (item.pets || []).filter(pet => pet.type === 'Cat');
          catArr.map(cat => {
               sortList.push(cat);
           });
        })
        return sortList.sort(function(a,b) {return (a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0);} );
        
    }

    drawResultantList (data) {
        this.config.targetNode.innerHTML = [
            ...this.drawOutput(data.male,'MALE'),
            ...this.drawOutput(data.female,'FEMALE')
        ].join('\n');
    }

    drawOutput (data, type) {
        const liNodes = data.map(item => {
           return  [`<li></span>${item.name}</li>`]
        })
        
        return [
                `<h2>${type}</h2>`,
                `<ul>`,
                    ...liNodes,
                `</ul>`
             ];
    }



    getData () {
       return [{
    "name": "Bob",
    "gender": "Male",
    "age": 23,
    "pets": [{
        "name": "Garfield",
        "type": "Cat"
    }, {
        "name": "Fido",
        "type": "Dog"
    }]
}, {
    "name": "Jennifer",
    "gender": "Female",
    "age": 18,
    "pets": [{
        "name": "Garfield",
        "type": "Cat"
    }]
}, {
    "name": "Steve",
    "gender": "Male",
    "age": 45,
    "pets": null
}, {
    "name": "Fred",
    "gender": "Male",
    "age": 40,
    "pets": [{
        "name": "Tom",
        "type": "Cat"
    }, {
        "name": "Max",
        "type": "Cat"
    }, {
        "name": "Sam",
        "type": "Dog"
    }, {
        "name": "Jim",
        "type": "Cat"
    }]
}, {
    "name": "Samantha",
    "gender": "Female",
    "age": 40,
    "pets": [{
        "name": "Tabby",
        "type": "Cat"
    }]
}, {
    "name": "Alice",
    "gender": "Female",
    "age": 64,
    "pets": [{
        "name": "Simba",
        "type": "Cat"
    }, {
        "name": "Nemo",
        "type": "Fish"
    }]
}];
    }
    
    
}