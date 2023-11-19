import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Invoice } from './entities/invoices.entity';
import { Product } from './entities/product.entity';
import { InvoiceDto } from './dto/invoice.dto';
import { isEmpty } from 'class-validator';

@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepository: Repository<Invoice>,
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(
    invoiceDto: InvoiceDto,
  ): Promise<{ products: Product[]; invoice: Invoice }> {
    const { products } = invoiceDto;

    if (!Array.isArray(products)) {
      throw new Error('Products must be an array');
    }

    let totalAmount = 0;
    const total = new Invoice();
    total.totalExpense = 0; // Initialize totalExpense

    for (const productDto of products) {
      totalAmount += parseFloat(productDto.amount + '');
    }

    total.totalExpense = totalAmount;
    const invoiceEntity = await this.invoiceRepository.save(total);

    const savedProducts: Product[] = [];

    for (const productDto of products) {
      const product = new Product();
      product.description = productDto.description;
      product.amount = parseFloat(productDto.amount + '');
      product.invoiceId = invoiceEntity.id;
      product.invoice = invoiceEntity;

      const savedProduct = await this.productRepository.save(product);
      savedProducts.push(savedProduct);
    }

    return {
      products: savedProducts,
      invoice: invoiceEntity,
    };
  }

  async get(): Promise<Invoice[]> {
    return await this.invoiceRepository.find({
      relations: ['products'],
    });
  }

  ////

  // async update(id: number, updateDto: InvoiceDto): Promise<Invoice> {
  //   const invoice = await this.invoiceRepository.findOne({ where: { id } });

  //   if (!invoice) {
  //     throw new NotFoundException(`Invoice with ID ${id} not found`);
  //   }

  //   const { products } = updateDto;

  //   if (Array.isArray(products) && !isEmpty(products)) {
  //     // Update the products associated with the invoice
  //     await this.productRepository.remove(invoice.products);

  //     const updatedProducts: Product[] = [];

  //     for (const productDto of products) {
  //       const product = new Product();
  //       product.description = productDto.description;
  //       product.amount = parseInt(productDto.amount + '');
  //       product.invoiceId = invoice.id;
  //       product.invoice = invoice;

  //       const updatedProduct = await this.productRepository.save(product);
  //       updatedProducts.push(updatedProduct);
  //     }

  //     // Update the totalExpense based on the updated products
  //     invoice.totalExpense = updatedProducts.reduce(
  //       (total, product) => total + product.amount,
  //       0,
  //     );

  //     await this.invoiceRepository.save(invoice);
  //   }

  //   return invoice;
  // }
}
