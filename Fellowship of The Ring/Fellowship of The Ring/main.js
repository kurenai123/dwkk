import {Dwarf} from './objects/dwarf.class.js';
import {Hobbit} from './objects/hobbit.class.js';
import {Wizard} from './objects/wizard.class.js';
import {Elf} from './objects/elf.class.js';
import {Human} from './objects/human.class.js';
import {Membership} from './objects/membership.class.js';
import {Fellowship} from './objects/fellowship.class.js';

// main.js
// Initializing People
const Gandalf = new Wizard('Gandalf');
const Aragorn = new Human('Aragorn');
const Gimli = new Dwarf('Gimli');
const Legolas = new Elf('Legolas');
const Boromir = new Human('Boromir');
const Frodo = new Hobbit('Frodo');
const Sam = new Hobbit('Sam');
const Meriadoc = new Hobbit('Meriadoc');
const Peregrin = new Hobbit('Peregrin');

// Initializing Fellowships
const FellowshipOfTheRing = new Fellowship('of The Ring');
const EvilFellowship = new Fellowship('of Evil');

// Every person has a name
console.assert(Gandalf.name === 'Gandalf');
console.assert(Gandalf.toString() === 'Gandalf');

// There is no members yet
console.assert(FellowshipOfTheRing.toString() === 'Fellowship of The Ring');
console.assert(EvilFellowship.toString() === 'Fellowship of Evil');
console.assert(EvilFellowship.count() === 0);
console.assert(FellowshipOfTheRing.count() === 0);
console.assert(FellowshipOfTheRing.hasNoMembers === true);
console.assert(FellowshipOfTheRing.hasMembers === false);

// Members count from 1 (not 0)
console.assert(FellowshipOfTheRing.member(1) === undefined);
console.assert(FellowshipOfTheRing.lastMember === undefined);

// There is two members (order matters)
FellowshipOfTheRing.signUp(Gandalf); // member 1
FellowshipOfTheRing.signUp(Aragorn); // member 2
console.assert(FellowshipOfTheRing.count() === 2);
console.assert(FellowshipOfTheRing.hasNoMembers === false);
console.assert(FellowshipOfTheRing.hasMembers === true);

// `Membership` is a intermediary class between Fellowship and Person
console.assert(FellowshipOfTheRing.member(1) instanceof Membership);
console.assert(FellowshipOfTheRing.member(2) instanceof Membership);

// Through Membership we can access the people
console.assert(FellowshipOfTheRing.member(1).person.name === 'Gandalf');
console.assert(FellowshipOfTheRing.member(1).person === Gandalf);
console.assert(FellowshipOfTheRing.member(1).person !== Aragorn);
console.assert(FellowshipOfTheRing.member(2).person === Aragorn);

// Out of Range should not throw an exception
console.assert(FellowshipOfTheRing.member(-1) === undefined);
console.assert(FellowshipOfTheRing.member(3) === undefined);

// The relationship is bidirectional
console.assert(Aragorn.fellowship === FellowshipOfTheRing);
console.assert(Aragorn.fellowship !== EvilFellowship);
console.assert(Aragorn.fellowship === Gandalf.fellowship);
console.assert(Gimli.fellowship === undefined);

console.assert(Aragorn.isMemberOfAFellowship === true);
console.assert(Aragorn.isMemberOfTheFellowship(FellowshipOfTheRing) === true);
console.assert(Aragorn.isMemberOfTheFellowship(EvilFellowship) === false);
console.assert(Gimli.isMemberOfAFellowship === false);
console.assert(Gimli.isMemberOfTheFellowship(FellowshipOfTheRing) === false);
console.assert(Gimli.isMemberOfTheFellowship(EvilFellowship) === false);

// However, a person can be member of only one fellowship
EvilFellowship.signUp(Aragorn); // Aragorn has not been included
console.assert(EvilFellowship.count() === 0);
console.assert(EvilFellowship.hasNoMembers === true);
console.assert(Aragorn.fellowship === FellowshipOfTheRing);
console.assert(Aragorn.isMemberOfTheFellowship(FellowshipOfTheRing) === true);
console.assert(Aragorn.isMemberOfTheFellowship(EvilFellowship) === false);

// There is another way to join the fellowships
Gimli.join(FellowshipOfTheRing);
Gimli.join(EvilFellowship); // has no effect (already in a fellowship)
console.assert(FellowshipOfTheRing.count() === 3);
console.assert(FellowshipOfTheRing.member(3).person === Gimli);

// Even indirect way
Legolas.join(Gimli.fellowship);
console.assert(FellowshipOfTheRing.count() === 4);
console.assert(FellowshipOfTheRing.lastMember.person === Legolas);

// More queries
console.assert(FellowshipOfTheRing.count('Human') === 1);
console.assert(FellowshipOfTheRing.count('Elf') === 1);
console.assert(FellowshipOfTheRing.count('Hobbit') === 0);
console.assert(FellowshipOfTheRing.has('Human') === true);
console.assert(FellowshipOfTheRing.has('Hobbit') === false);

// Get the fellowship complete (adding various members at one time)
console.assert(FellowshipOfTheRing.count() === 4);
FellowshipOfTheRing.signUp(Boromir, Frodo);
FellowshipOfTheRing.signUp(Sam, Meriadoc, Peregrin);
console.assert(FellowshipOfTheRing.count() === 9);
console.assert(FellowshipOfTheRing.count('Hobbit') === 4);

// Left the FellowshipOfTheRing
console.assert(FellowshipOfTheRing.count() === 9);
console.assert(FellowshipOfTheRing.count('Human') === 2);
console.assert(Boromir.fellowship === FellowshipOfTheRing);
console.assert(FellowshipOfTheRing.member(5).person === Boromir);

FellowshipOfTheRing.cancel(Boromir);

console.assert(FellowshipOfTheRing.count() === 8);
console.assert(FellowshipOfTheRing.count('Human') === 1);
console.assert(Boromir.fellowship === undefined);
console.assert(FellowshipOfTheRing.member(5).person === Frodo);

// Other way to unsubscribe
Frodo.left(); // leave current fellowship if any
console.assert(FellowshipOfTheRing.count() === 7);
console.assert(Frodo.fellowship === undefined);

Gandalf.die();
console.assert(FellowshipOfTheRing.count() === 6);
console.assert(Gandalf.fellowship === undefined);

// People can't join fellowships after die
console.assert(FellowshipOfTheRing.count() === 6);
Gandalf.join(FellowshipOfTheRing);
console.assert(Gandalf.fellowship === undefined);
console.assert(FellowshipOfTheRing.count() === 6);

// Asking if people are sharing a fellowship
console.assert(Meriadoc.isFellowOf(Peregrin) === true);
console.assert(Meriadoc.isFellowOf(Gandalf) === false);
console.assert(Meriadoc.isFellowOf(Boromir) === false);
console.assert(Meriadoc.isFellowOf(Meriadoc) === true);
console.assert(Gandalf.isFellowOf(Gandalf) === true);

// Should be reflexive
console.assert(Meriadoc.isFellowOf(Peregrin) === Peregrin.isFellowOf(Meriadoc));
console.assert(Meriadoc.isFellowOf(Boromir) === Boromir.isFellowOf(Meriadoc));

// Yet another way to join a fellowship
console.assert(Boromir.fellowship === undefined);
Boromir.fellow(Meriadoc);
console.assert(Boromir.fellowship === Meriadoc.fellowship);
console.assert(Meriadoc.isFellowOf(Boromir) === true);
Boromir.left();
console.assert(Boromir.fellowship === undefined);
Meriadoc.fellow(Boromir);
console.assert(Boromir.fellowship === Meriadoc.fellowship);

// Dissolve the fellowship :(
FellowshipOfTheRing.dissolve();
console.assert(FellowshipOfTheRing.count() === 0);
console.assert(FellowshipOfTheRing.hasNoMembers === true);
console.assert(FellowshipOfTheRing.member(1) === undefined);
console.assert(FellowshipOfTheRing.lastMember === undefined);