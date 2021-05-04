import 'mocha';
import {expect} from 'chai';

import {Note} from '../src/note'; 

describe('Test block class Note', () => {
  const note1 = new Note('Primera nota', 'Soy la primera', 'blue');
  it('getTitle gets "Primera nota"', () => {
    expect(note1.getTitle()).to.be.equal('Primera nota');
  });

  it('getBody gets "Soy la primera"', () => {
    expect(note1.getBody()).to.be.equal('Soy la primera');
  });

  it('getColour gets "blue"', () => {
    expect(note1.getColour()).to.be.equal('blue');
  });
})