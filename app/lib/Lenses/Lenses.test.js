import expect from 'expect.js';
import Lenses from './Lenses.js';

describe('Lenses', () => {
  it('Should return a copy of the object with the attribute changed', () => {
    let Person = function(name, age) {
      this.name = name;
      this.age = age;
    };

    let person1 = new Person('Jackson', 23);
    Lenses(person1);
    let copy = person1.set('name', 'Fernando');
    expect(person1.name).to.be.equal('Jackson');
    expect(person1.age).to.be.equal(23);
    expect(copy.name).to.be.equal('Fernando');
    expect(copy.age).to.be.equal(23);
  });

  //TODO Testing with composed objects
});
