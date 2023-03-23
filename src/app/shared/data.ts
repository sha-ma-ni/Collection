export interface Figure {
  _id: string,
  name: string,
  topic: string,
  articleNumber: string,
  purchasePrice: number,
  salePrice: number,
  // purchaseDatum: Date
}

export interface Set {
  _id: string,
  name: string,
  topic: string,
  articleNumber: string,
  purchasePrice: number,
  salePrice: number,
  // purchaseDatum: Date
}

export interface User {
  firstname: string,
  lastname: string,
  password: string,
  email: string
}


