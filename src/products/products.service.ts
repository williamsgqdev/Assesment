import { Prisma, PrismaClient } from "@prisma/client";
import { InternalServerException, NotFoundException, responseFormat } from "../common";
import { HttpStatusCode } from "../common/enums";
import { GetProductsType } from "./dto";
export const productRepo = new PrismaClient().product;

async function createProduct(payload: Prisma.ProductCreateInput){
    const product = await productRepo.create({
        data: payload,
    })
    return responseFormat(HttpStatusCode.CREATED, 'Product created', product);
}

async function getProducts(query: GetProductsType['query']){
    const skip = (query.page - 1) * query.limit;
    const where: Prisma.ProductWhereInput = {}
    const orderBy: Prisma.ProductOrderByWithRelationInput[] = []

    if(!!query?.name){
        where.name = {
            contains: query.name,
            mode: 'insensitive',
        }
    }

    if(!!query?.sort_by_category){
        orderBy.push({
            category: query.sort_by_category
        });
    }

    if(!!query?.sort_by_name){
        orderBy.push({
            name: query.sort_by_name
        });
    }

    if(!!query?.sort_by_quantity){
        orderBy.push({
            quantity: query.sort_by_quantity
        });
    }

    if(!!query?.sort_by_price){
        orderBy.push({
            price: query.sort_by_price
        });
    }



    if(!!query?.low_price_range && !!query?.high_price_range){
        where.price = {
            gte: query.low_price_range,
            lte: query.high_price_range,
        }
    }

    orderBy.push({
        created_at: 'desc'
    })

    const count = await productRepo.count({
        where,
    })

    const products = await productRepo.findMany({
        where,
        orderBy,
        take: query.limit,
        skip: skip,
    });

    const pageCount =  Math.ceil(count / query.limit);
    const data =  {
        products,
        count,
        page: query.page,
        page_count: pageCount,
        has_previous_page: query.page > 1,
        has_next_page: query.page < pageCount,
    }

    return responseFormat(HttpStatusCode.OK, 'Products', data)
}

async function getProduct(id: string){
    const product = await productRepo.findUnique({
        where: {
            id
        }
    })

    if(!product) throw new NotFoundException('Product not found')

    return responseFormat(HttpStatusCode.OK, 'Product found', product);
}

async function updateProduct(id: string, payload: Prisma.ProductUpdateInput){
    await getProduct(id)
    const product = await productRepo.update({
        where: {
            id,
        },
        data: payload
    })

    return responseFormat(HttpStatusCode.OK, 'Product updated', product);
}

async function deleteProduct(id: string){
    await getProduct(id);
    
    await productRepo.delete({
        where: {
            id
        }
    })

    return responseFormat(HttpStatusCode.OK, 'Product deleted successfully')
}

export {
    createProduct,
    getProducts,
    getProduct,
    updateProduct,
    deleteProduct,
}