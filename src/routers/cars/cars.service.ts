import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCarDto } from "./dto/create-car.dto";
import { UpdateCarDto } from "./dto/update-car.dto";
import { v1 as uuid } from "uuid";
import { Car } from "./interface/car.interface";

@Injectable()
export class CarsService {
  Cars: any[] = [
    { id: uuid(), model: "Corolla", brand: "Toyota" },
    { id: uuid(), model: "Honda", brand: "Civic" },
    { id: uuid(), model: "Cherokee", brand: "Jeep" },
  ];

  create(createCarDto: CreateCarDto) {
    let newCar = { ...createCarDto, id: uuid() };
    this.Cars = [...this.Cars, newCar];
    return newCar;
  }

  findAll() {
    return this.Cars;
  }

  findOne(id: string) {
    const car = this.Cars.find((car) => car.id === id);
    if (!car) {
      throw new NotFoundException(`Car with id ${id} no found`);
    }
    return car;
  }

  update(id: string, updateCarDto: UpdateCarDto) {
    let carDb = this.findOne(id);
    console.log(
      "🚀 ~ file: cars.service.ts:35 ~ CarsService ~ update ~ carDb",
      carDb
    );
    this.Cars = this.Cars.map((e) =>
      e.id === id ? { ...carDb, ...updateCarDto, id } : e
    );
    return this.findOne(id);
  }

  remove(id: string) {
    this.findOne(id);
    this.Cars = this.Cars.filter((car) => car.id !== id);
    return this.findAll();
  }
}
