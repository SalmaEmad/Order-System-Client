export class product{
    ProductId: number;
    ProductName: string;
    ProductImage: string;
    ProductPrice: number;
    constructor(
        ProductId: number,
        ProductName: string,
        ProductImage: string,
        ProductPrice: number
    ){
        this.ProductId = ProductId;
        this.ProductName = ProductName;
        this.ProductImage = ProductImage;
        this.ProductPrice = ProductPrice;
    }
}
