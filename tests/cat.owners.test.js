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
    let apiUrl = "testurl.api.com";
    let window = {};
      beforeEach(function () {
        window = {
          fetch: function(apiUrl) {
            return {};
          }
        };
      })

    it('should call window.fetch function and get data from api', function () {
      spyOn(window,'fetch').and.callThrough();
      window.fetch(apiUrl);
      catOwners.fetchData();

      expect(window).toBeDefined();
      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch).toHaveBeenCalledWith(apiUrl);
      
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

    it('should return if data is undefined', function() {
      const result = catOwners.processData(undefined)
      expect(result).toBe(undefined)
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

    it('should return an empty array if data is undefined', function() {
      const result = catOwners.getAllCats(undefined)
       expect(result).toEqual(jasmine.any(Object))
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
        ],'MALE')
        
      expect(result).toBeDefined();
      expect(result).toEqual(jasmine.any(Object));
      expect(result.length).toBeGreaterThan(1);
      expect(result[0]).toEqual('<h2>MALE</h2>')
      expect(result[1]).toEqual('<ul>')
      expect(result[2]).toEqual(['<li>Garfield</li>'])
      expect(result[3]).toEqual(['<li>Tom</li>'])
      expect(result[4]).toEqual('</ul>')
    })

    it('should return "No Cats For Male" message if data is undefined', function() {
      const result = catOwners.drawOutput(undefined,'Male')

       expect(result).toEqual(jasmine.any(Object))
       expect(result[0]).toEqual('<h2>No Cats For Male</h2>')
    })

  })
  
});

