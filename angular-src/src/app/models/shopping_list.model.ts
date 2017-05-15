import { Item } from './item.model';

export class ShoppingList {
  _id: String;
  userId: String;
  name: String;
  items: Item[] = [];
}
