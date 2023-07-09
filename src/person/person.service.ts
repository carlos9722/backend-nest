import { Injectable } from '@nestjs/common';
import * as fs from 'fs';
import { Person } from './models/person.model';

const DB_PATH = 'db.json';

@Injectable()
export class PersonService {
  private persons: Person[];

  constructor() {
    this.loadPersons();
  }

  private loadPersons(): void {
    if (fs.existsSync(DB_PATH)) {
      const data = fs.readFileSync(DB_PATH, 'utf8');
      this.persons = JSON.parse(data);
    } else {
      this.persons = [];
    }
  }

  private savePersons(): void {
    fs.writeFileSync(DB_PATH, JSON.stringify(this.persons), 'utf8');
  }

  findAll(): Person[] {
    return this.persons;
  }

  findOne(id: number): Person {
    return this.persons.find((person) => person.id == id);
  }

  create(person: Person): Person {
    const id = this.persons.length > 0 ? this.persons[this.persons.length - 1].id + 1 : 1;
    person.id = id;
    this.persons.push(person);
    this.savePersons();
    return person;
  }

  update(id: number, updatedPerson: Person): Person {
    const index = this.persons.findIndex((person) => person.id == id);
    if (index !== -1) {
      updatedPerson.id = id;
      this.persons[index] = updatedPerson;
      this.savePersons();
      return updatedPerson;
    }
    return null;
  }

  delete(id: number): void {
    const index = this.persons.findIndex((person) => person.id == id);
    if (index !== -1) {
      this.persons.splice(index, 1);
      this.savePersons();
    }
  }
}