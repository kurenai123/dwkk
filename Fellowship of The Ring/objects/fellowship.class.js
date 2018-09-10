import {Membership} from './membership.class.js';

export class Fellowship {
    constructor(name) {
        this._name = name;
        this._members = [];
    }
    count(person) {
        if (person === undefined) {
            return this._members.length;
        } else {
            let count = 0;
            for (const member of this._members) {
                (person === member.person.classPerson) ? count++ : null;
            }
            return count;
        }
    }
    has(person) {
        const log = (this.count(person) > 0) ? true : false;
        return log;
    }
    get hasNoMembers() {
        return this._members.length === 0;
    }
    get hasMembers() {
        return !this.hasNoMembers;
    }
    get lastMember() {
        return this._members[this._members.length - 1];
    }
    get lastMember() {
        return this._members[this._members.length - 1];
    }
    member(position) {
        return this._members[position - 1];
    }
    toString() {
        return `Fellowship ${this._name}`;
    }
    signUp() {
        const members = [].slice.call(arguments, 0);
        for (const member of members) {
            const newMember = this._members.find((m) => m === member);
            
            if (!newMember && member.fellowship === undefined && member._life) {
                member.signUpFellowship(this); 
                this._members.push(new Membership(member));
            }
        }
    }
    cancel(person) {
        let index = -1;
        for (let i=0; i<this._members.length -1; i++) {
            if (this._members[i].person === person) {
                index = i;
                break;
            }
        }
        if (index > -1 ) {
            this._members.splice(index, 1);
            person._fellowship = undefined;
        }
    }
    dissolve() {
        for (const member of this._members) {
            member.person._fellowship = undefined;
        }
        this._members = []; 
    }
}
