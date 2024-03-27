import { RowDataPacket } from "mysql2";
import { ItemModel } from "../item/item.model";
import { UserModel } from "../user/user.model";

export interface TradeModel extends RowDataPacket {
  id: number;
  userId: number;
  categoryItemId: number;
  description: string;
  createdDate: string;
  user: UserModel | null;
  categoryItem: ItemModel | null;
  serverIpAddress: string;
  quantity: string;
}

export interface CreateTradeModel {
  userId: number;
  categoryItemId: number;
  description: string;
  serverIpAddress: string;
  quantity: string;
}