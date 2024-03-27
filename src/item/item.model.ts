import { RowDataPacket } from "mysql2";

export interface ItemModel extends RowDataPacket {
    id: number;
    category: string;
    name: string;
    image: string;
}

export interface CreateItemModel {
    category: string;
    name: string;
    image: string;
    userId: number;
}