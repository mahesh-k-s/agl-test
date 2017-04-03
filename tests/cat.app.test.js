import { CatApp } from "../src/cat.app"
import data from "./data.json"


describe("CatApp", function () {
  let catApp;

  beforeEach(function () {
    catApp = new CatApp();
  })

  describe('init', function () {
    it('should get the dom element with id "pets" as the target node', function () {

      catApp.init().then(function () {
        document.getElementById('pets').innerHTML = "test";
        expect(document.getElementById('pets').innerHTML).toBe("test")
      })
    })
  })


  describe('fetchData', function () {
    let apiUrl = "testurl.api.com";
    let window = {};
    beforeEach(function () {
      window = {
        fetch: function (apiUrl) {
          return {};
        }
      };
    })

    it('should call window.fetch function and get data from api', function () {
      spyOn(window, 'fetch').and.callThrough();
      window.fetch(apiUrl);
      catApp.fetchData();

      expect(window).toBeDefined();
      expect(window.fetch).toHaveBeenCalled();
      expect(window.fetch).toHaveBeenCalledWith(apiUrl);

    })
  })

  describe('processData', function () {
    it('should list all male and female pets grouped by owners gender', function () {
      const result = catApp.processData(data)
      expect(result).toEqual(jasmine.any(Object))
      expect(Object.keys(result)).toEqual([
        'male',
        'female',
      ]);
      expect(result.male.length).toBeGreaterThan(1);
      expect(result.female.length).toBeGreaterThan(1);
    })

    it('should return if data is undefined', function () {
      const result = catApp.processData(undefined)
      expect(result).toBe(undefined)
    })

  })

  describe('getCatsSortedByName', function () {
    it('should filter all cats from pets sorted by  name', function () {
      const result = catApp.getCatsSortedByName([{
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

    it('should return an empty array if data is undefined', function () {
      const result = catApp.getCatsSortedByName(undefined)
      expect(result).toEqual(jasmine.any(Object))
    })

  })

  describe('drawPets', function () {
    it('should render output to the target node', function () {
      const result = catApp.drawPets([
        {
          "name": "Garfield",
          "type": "Cat"
        },
        {
          "name": "Tom",
          "type": "Cat"
        }
      ], 'MALE')

      expect(result).toBeDefined();
      expect(result).toEqual(jasmine.any(Object));
      expect(result.length).toBeGreaterThan(1);
      expect(result[0]).toEqual('<h2>MALE</h2>')
      expect(result[1]).toEqual('<ul>')
      expect(result[2]).toEqual(['<li>Garfield</li>'])
      expect(result[3]).toEqual(['<li>Tom</li>'])
      expect(result[4]).toEqual('</ul>')
    })

    it('should return "No Cats For Male" message if data is undefined', function () {
      const result = catApp.drawPets(undefined, 'Male')

      expect(result).toEqual(jasmine.any(Object))
      expect(result[0]).toEqual('<h2>No Cats For Male</h2>')
    })

  })

});