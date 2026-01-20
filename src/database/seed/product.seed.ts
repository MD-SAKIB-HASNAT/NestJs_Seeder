import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Product } from "../entity/product.entity";
import { DataFactory, Seeder } from "nestjs-seeder";
import { Repository } from "typeorm";

@Injectable()
export class ProductSeed implements Seeder {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async seed() {
    const products = DataFactory.createForClass(Product).generate(5);
    await this.productRepo.save(products);
    console.log('✅ Products seeded');
  }

  async drop() {
    await this.productRepo.clear();
  }
}
