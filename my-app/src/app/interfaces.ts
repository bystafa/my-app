export interface User {
    email: string,
    password: string,
    name?: string,
    productsInBasket?: [
        {
            id: number,
            quantity: number
        }
    ]
}

export interface Product {
    name: string,
    imageSrc?: string,
    quantity: number,
    price: number,
    category: string,
    id: number
}