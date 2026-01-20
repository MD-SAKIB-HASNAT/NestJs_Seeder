import { Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Order } from "./order.entity";
import { Factory } from "nestjs-seeder";
import { Faker } from "@faker-js/faker";

@Entity('products')
export class Product {
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Factory((faker?: Faker) => faker?.commerce.productName())
    @Column()
    title: string;

    @Factory((faker?: Faker) => faker?.commerce.productDescription() ?? 'No description')   
    @Column('text')
    description: string;

    @Factory((faker?: Faker) => parseFloat(faker?.commerce.price() ?? '0'))
    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @ManyToMany(() => Order, (order) => order.products)
    orders: Order[];
}