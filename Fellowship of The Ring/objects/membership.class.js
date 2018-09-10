export class Membership {
    constructor(member) {
        this._member = member;
    }
    get person() {
        return this._member;
    }
}
