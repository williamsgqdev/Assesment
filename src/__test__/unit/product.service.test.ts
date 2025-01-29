import { createProduct, deleteProduct, getProduct, getProducts, productRepo, updateProduct } from "../../products/products.service";
import { NotFoundException, responseFormat } from "../../common";
import { HttpStatusCode } from "../../common/enums";
import { productStub } from "../stub";
import { GetProductsType } from "../../products/dto";

jest.mock('@prisma/client', () => ({
    PrismaClient: jest.fn(() => ({
      product: {
        create: jest.fn(),
        count: jest.fn(),
        findMany: jest.fn(),
        findUnique: jest.fn(),
        update: jest.fn(),
        delete: jest.fn(),
      },
    })),
}));
describe('Product service', ()=> {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('createProduct', ()=> {

    it('should create a product and return formatted response', async ()=> {
        const product = productStub()

        jest.spyOn(productRepo, 'create').mockResolvedValue(product)

        const result = await createProduct(product);

        expect(productRepo.create).toHaveBeenCalledTimes(1)

        expect(result).toEqual(
            responseFormat(HttpStatusCode.CREATED, 'Product created', product)
        )
    })
})


describe('getProducts', () => {

    it('should return an array of paginated products in the data field of the formatted response', async ()=> {
      const products = [];

      const paginationQuery: GetProductsType['query'] = {
        page: 1,
        limit: 10,
      }
      const count = 100;

      for(let i = 0; i <= paginationQuery.limit; i++){
        products.push(productStub())
      }
      const pageCount =  Math.ceil(count / paginationQuery.limit);

      jest.spyOn(productRepo, 'count').mockResolvedValue(count)
      jest.spyOn(productRepo, 'findMany').mockResolvedValue(products)
      
      const result = await getProducts(paginationQuery)
      expect(productRepo.count).toHaveBeenCalledTimes(1)
      expect(productRepo.findMany).toHaveBeenCalledTimes(1)

      expect(result).toEqual(
        responseFormat(HttpStatusCode.OK, 'Products', {
          products,
          count: 100,
          page: paginationQuery.page,
          page_count: pageCount,
          has_previous_page: paginationQuery.page > 1,
          has_next_page: paginationQuery.page < pageCount,
        })
      )
    })
})


describe('getProduct', () => {

  it('should get single product and return formatted response', async()=> {
    const product = productStub()
    jest.spyOn(productRepo, 'findUnique').mockResolvedValue(product)

    const result = await getProduct(product.id);

    expect(productRepo.findUnique).toHaveBeenCalledTimes(1)

    expect(result).toEqual(
      responseFormat(HttpStatusCode.OK, 'Product found', product)
    )
  })

  it('should throw not found exception if product do not exist', async () => {
    jest.spyOn(productRepo, 'findUnique').mockResolvedValue(null)
    expect(getProduct('some-random-uuid')).rejects.toThrow(NotFoundException)
  })
})

describe('updateProduct', ()=> {
  it('should update product and return formatted response ', async()=> {
    const product = productStub()
    jest.spyOn(productRepo, 'findUnique').mockResolvedValue(product)
    jest.spyOn(productRepo, 'update').mockResolvedValue({...product, name: 'Updated name'})
    const result = await updateProduct(product.id, {...product, name: 'Updated name'})

    expect(productRepo.findUnique).toHaveBeenCalledTimes(1)
    expect(productRepo.update).toHaveBeenCalledTimes(1)

    expect(result).toEqual(
      responseFormat(HttpStatusCode.OK, 'Product updated', {...product, name: 'Updated name'})
    )
  })

  it('should throw not found exception if product do not exist', async () => {
    jest.spyOn(productRepo, 'findUnique').mockResolvedValue(null)
    expect(updateProduct('some-random-uuid', {...productStub(), name: 'Updated name'})).rejects.toThrow(NotFoundException)
  })
})

describe('deleteProduct', ()=> {
  it('should delete product and return formatted response', async()=> {
    const product = productStub()
    jest.spyOn(productRepo, 'findUnique').mockResolvedValue(product)
    jest.spyOn(productRepo, 'delete').mockResolvedValue(product)

    const result = await deleteProduct(product.id)

    expect(productRepo.findUnique).toHaveBeenCalledTimes(1)
    expect(productRepo.delete).toHaveBeenCalledTimes(1)

    expect(result).toEqual(
      responseFormat(HttpStatusCode.OK, 'Product deleted successfully')
    )
  })

  it('should throw not found exception if product do not exist', async () => {
    jest.spyOn(productRepo, 'findUnique').mockResolvedValue(null)
    expect(deleteProduct('some-random-uuid')).rejects.toThrow(NotFoundException)
  })
})

})

