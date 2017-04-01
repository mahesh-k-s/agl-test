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
        if (data == undefined) return;
        var sortedCatsList = {
            "male" : this.getAllCats(data.filter(subitem => subitem.gender === 'Male')),
            "female" : this.getAllCats(data.filter(subitem => subitem.gender === 'Female'))
        }
        return sortedCatsList;
    }

    getAllCats (filtereddata) {
        if (filtereddata == undefined) return [];
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
        if (data == undefined) return;
        this.config.targetNode.innerHTML = [
            ...this.drawOutput(data.male,'MALE'),
            ...this.drawOutput(data.female,'FEMALE')
        ].join('\n');
    }

    drawOutput (data, type) {
        if (data == undefined) return [`<h2>No Cats For ${type}</h2>`];
        const liNodes = data.map(item => {
           return  [`<li>${item.name}</li>`]
        })
        
        return [
                `<h2>${type}</h2>`,
                `<ul>`,
                    ...liNodes,
                `</ul>`
             ];
    }



  
    
}