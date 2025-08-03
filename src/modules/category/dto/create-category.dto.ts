import { Type } from "class-transformer";
import { IsBoolean, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateCategoryDto {
    @IsString({message:'Name là bắt buộc'})
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    sortOrder?: number;

    @IsBoolean()
    @IsOptional()
    isActive?: boolean
}
