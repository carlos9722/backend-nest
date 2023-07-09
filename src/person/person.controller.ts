import { Body, Controller, Get, Param, Post, Put, Delete  } from '@nestjs/common';
import { Person } from './models/person.model';
import { PersonService } from './person.service';

@Controller('person')
export class PersonController {
    constructor(private readonly personService: PersonService) {}
    @Get()
  findAll(): Person[] {
    return this.personService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Person {
    return this.personService.findOne(id);
  }

  @Post()
  create(@Body() person: Person): Person {
    return this.personService.create(person);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() person: Person): Person {
    return this.personService.update(id, person);
  }

  @Delete(':id')
  delete(@Param('id') id: number): void {
    this.personService.delete(id);
  }
}
