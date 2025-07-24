import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Address } from './address.model';
import { Order } from './order.model';
import { Carts } from './carts.model';
import { UserCoupons } from './user-coupons.model';
import { Reviews } from './reviews.model';

export enum ENUMROLE {
    ADMIN = 'ADMIN',
    User = 'User',
}

@Table
export class User extends Model<User> {
    @Column({
        allowNull: false,
        unique: true,
        type: DataType.STRING,
    })
    email: string;


    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    password: string;

    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    avatar: string;

    @Column({
        allowNull: true,
        type: DataType.STRING,
    })
    phone: string;

    @Column({
        allowNull: false,
        defaultValue: ENUMROLE.User,
        type: DataType.ENUM(...Object.values(ENUMROLE)),
    })
    role: ENUMROLE;

    @HasMany(() => Address)
    addresses: Address[]

    @HasMany(() => Order)
    orders: Order[]
    //

    @HasMany(() => Carts)
    carts: Carts[]

    @HasMany(() => UserCoupons)
    userCoupons: UserCoupons[]

    @HasMany(()=> Reviews)
    reviews: Reviews[]
}