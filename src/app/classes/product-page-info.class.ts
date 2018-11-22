export class ProductPageInfo {
  // value?: T, <T>
  id: number;
  categoryId: number;
  name: string;
  description: string;
  cost: number;
  gender: string;

  constructor(editPage: any) {
    // this.value = editPage.value;
    this.id = editPage.id;
    this.categoryId = editPage.categoryId;
    this.name = editPage.name;
    this.description = editPage.description;
    this.cost = editPage.cost;
    this.gender = editPage.gender;
  }
}
