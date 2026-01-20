import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Seeder } from "nestjs-seeder";
import { Order } from "../entity/order.entity";
import { Repository } from "typeorm";
import { User } from "../entity/user.enity";
import { Product } from "../entity/product.entity";

@Injectable()
export class OrderSeed implements Seeder {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,

    @InjectRepository(User)
    private readonly userRepo: Repository<User>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async seed() {
    const users = await this.userRepo.find();
    const products = await this.productRepo.find();

    const orders: Order[] = [];

    for (const user of users) {
      // each user gets 2 orders
      for (let i = 0; i < 2; i++) {
        const order = new Order();

        order.orderDate = new Date();
        order.user = user;

        // 🔥 MANY-TO-MANY MAGIC HERE
        order.products = this.pickRandomProducts(products, 3);

        orders.push(order);
      }
    }

    await this.orderRepo.save(orders);

    console.log('✅ Orders + order_products seeded');
  }

  async drop() {
    await this.orderRepo.clear();
  }

  // helper function
  private pickRandomProducts(products: Product[], count: number): Product[] {
    const shuffled = [...products].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
  }
}
