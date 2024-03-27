import { RowDataPacket } from "mysql2";


export interface CategoryModel extends RowDataPacket {
    id: number;
    name: string;
    imagePath: string;
}

export interface CreateCategoryModel {
    name: string;
    imagePath: string
}

export interface UpdateCategoryModel {
    name?: string;
    imagePath?: string;
}