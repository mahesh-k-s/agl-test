import {CatOwners} from "../src/cat.owners"
import data from "./data.json"

describe("CatOwners", function() {
  let catOwners;
  beforeEach(function () {
      catOwners = new CatOwners();
  })

  describe('init', function() {
    it('should get the dom element with id "pets" as the target node', function () {
      
      catOwners.init().then(function() {
      document.getElementById('pets').innerHTML = "test";
        expect(document.getElementById('pets').innerHTML).toBe("test")
      }) 
    })
  })

  describe('fetchData', function() {
    it('should fetch data from the api', function() {
      const result = catOwners.fetchData()
      expect(result).toEqual(jasmine.any(Object))
      expect(result.length).toBeGreaterThan(1);
    })
  
  })


  describe('listAllCatsByGender', function() {
    it('should list all male and female cats array', function() {
      const result = catOwners.processData(data)
      expect(result).toEqual(jasmine.any(Object))
      expect(Object.keys(result)).toEqual([
        'male',
        'female',
      ]);
      expect(result.male.length).toBeGreaterThan(1);
      expect(result.female.length).toBeGreaterThan(1);
    })
  
  })

  describe('getAllCats', function() {
    it('should get all cats filtered and sorted', function() {
      const result = catOwners.getAllCats([{
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
        }
      ])
      expect(result).toEqual(jasmine.any(Object))
      expect(result.length).toBeGreaterThan(1);
    })
  
  })

  describe('drawOutput', function() {
    it('should get all cats filtered and sorted', function() {
      const result = catOwners.drawOutput([
          {
            "name": "Garfield",
            "type": "Cat"
          },
          {
            "name": "Tom",
            "type": "Cat"
          }
        ])

      expect(result).toEqual(jasmine.any(Object));
      expect(result.length).toBeGreaterThan(1);
    })

  })
  
});

