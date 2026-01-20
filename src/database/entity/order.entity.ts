import { Column, Entity, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.enity";
import { Product } from "./product.entity";
import { Factory } from "nestjs-seeder";
import { Faker } from "@faker-js/faker";

@Entity('orders')
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Factory((faker?: Faker) => faker?.date.past() ?? new Date())
    @Column()
    orderDate: Date;

    @ManyToOne(() => User, (user) => user.orders)
    user: User;

    @ManyToMany(() => Product, (product) => product.orders)
    @JoinTable({ name: 'order_products' })  // Added JoinTable
    products: Product[];
}
