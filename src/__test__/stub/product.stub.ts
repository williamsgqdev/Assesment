import { Product } from "@prisma/client";

export function productStub (): Product {
    return {
        id: '9b5b90a7-65ad-4c84-aef5-c58d9800ec99',
        name: 'Test Product',
        price: 100,
        description: 'Test Description',
        quantity: 10,
        category: 'Electronics',
        created_at: new Date()
    }
}