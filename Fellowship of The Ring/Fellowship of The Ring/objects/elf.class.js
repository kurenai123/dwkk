export class Elf {
    constructor(name) {
        this._name = name;
        this._fellowship = undefined;
        this._classPerson = 'Elf';
        this._life = true;
    }
    get name() {
        return this._name;
    }
    get classPerson() {
        return this._classPerson;
    }
    toString() {
        return this._name;
    }
    get fellowship() {
        return this._fellowship;
    }
    signUpFellowship(fellowship) {
        this._fellowship = fellowship;
    }
    get isMemberOfAFellowship() {
        return this._fellowship !== undefined;
    }
    isMemberOfTheFellowship(fellowship) {
        return fellowship === this._fellowship;
    }
    join(fellowship) {
        this._fellowship === undefined ? fellowship.signUp(this) : null;
    }
    die() {
        this._fellowship.cancel(this);
        this._life = false;
    }
    left() {
        this._fellowship.cancel(this);
        this._fellowship = undefined;
    }
    isFellowOf(person) {
        return (person.fellowship === this.this._fellowship);
    }
    fellow(person) {
        this.signUpFellowship(person._fellowship);
    }
}
