export class Wizard {
    constructor(name) {
        this._fellowship = undefined;
        this._name = name;
        this._life = true;
    }
    get name() {
        return this._name;
    }
    get fellowship() {
        return this._fellowship;
    }
    join(fellowship) {
        this._fellowship === undefined ? fellowship.signUp(this) : null;
    }
    isMemberOfTheFellowship(fellowship) {
        return fellowship === this._fellowship;
    }
    get isMemberOfAFellowship() {
        return this._fellowship !== undefined;
    }
    toString() {
        return this._name;
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
    fellow(person) {
        this.signUpFellowship(person._fellowship);
    }
}
