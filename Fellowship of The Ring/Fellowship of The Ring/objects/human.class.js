export class Human {
    constructor(name) {
        this._name = name;
        this._fellowship = undefined;
        this._classPerson = 'Human';
        this._life = true;
    }
    get classPerson() {
        return this._classPerson;
    }
    get fellowship() {
        return this._fellowship;
    }
    fellow(person) {
        this.signUpFellowship(person._fellowship);
    }
    get name() {
        return this._name;
    }
    get toString() {
        return this.name;
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
        return (person.fellowship === this._fellowship);
    }
}
