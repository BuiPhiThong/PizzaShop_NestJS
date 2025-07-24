import { Column, DataType, HasMany, Model, Table } from 'sequelize-typescript';
import { Product } from './product.model';
import { Ingredient } from './ingredient.model';

@Table
export class Category extends Model<Category> {
    @Column({
        allowNull: false,
        type: DataType.STRING,
    })
    name: string;


    @Column({
        allowNull: false,
        type: DataType.STRING,
        unique: true
    })
    slug: string;

    @Column({
        allowNull: true,
        type: DataType.TEXT,
    })
    description: string;


    @Column({
        defaultValue: 0,
        type: DataType.INTEGER,
    })
    sortOrder: number;

    @Column({
        defaultValue: true,
        allowNull: true,
        type: DataType.BOOLEAN,
    })
    isActive: boolean;

    //Relationship
    @HasMany(() => Product)
    products: Product[]

    @HasMany(() => Ingredient)
    ingredients: Ingredient[]
}