import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalesEntities } from 'src/entitities/sales.entities';
import { SalesItemsEntities } from 'src/entitities/sales-items.entities';
import { CreateOrderParams } from 'src/utils/types/CreateOrder.types';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(SalesEntities)
    private salesRepository: Repository<SalesEntities>,
    @InjectRepository(SalesItemsEntities)
    private salesItemsRepository: Repository<SalesItemsEntities>,
  ) {}

  // Find sales data
  findSales() {
    return this.salesRepository.find({
      relations: ['sales_items'],
      order: {
        sales_id: 'desc',
      },
    });
  }

  // Find sales data this year
  async findSalesPerYear(currentYear: number) {
    const result: { sum: string; sales_month: string }[] =
      await this.salesRepository
        .createQueryBuilder('sales')
        .select([
          `(select sum(sales_items.quantity * products.packaging_size))`,
          `(select extract(MONTH from sales."createdAt"::date) as sales_month)`,
        ])
        .innerJoin('sales.sales_items', 'sales_items')
        .innerJoin('sales_items.product', 'products')
        .where(`extract(YEAR from sales."createdAt"::date) = :currentYear `, {
          currentYear: currentYear,
        })
        .groupBy('sales_month')
        .orderBy('sales_month', 'ASC')
        .getRawMany();
    return result.map(({ sum, sales_month }) => {
      return {
        total_outbounded: sum,
        month:
          sales_month === '1'
            ? 'January'
            : sales_month === '2'
            ? 'February'
            : sales_month === '3'
            ? 'March'
            : sales_month === '4'
            ? 'April'
            : sales_month === '5'
            ? 'May'
            : sales_month === '6'
            ? 'June'
            : sales_month === '7'
            ? 'July'
            : sales_month === '8'
            ? 'August'
            : sales_month === '9'
            ? 'September'
            : sales_month === '10'
            ? 'October'
            : sales_month === '11'
            ? 'November'
            : sales_month === '12'
            ? 'December'
            : null,
      };
    });
  }

  // Find the sales volume for the last 7 days
  async findSalesThisWeek() {
    const queryResult = await this.salesRepository
      .createQueryBuilder('sales')
      .select([
        `sales."createdAt"::date as sales_date`,
        `sum(sales_items.quantity * products.packaging_size)`,
      ])
      .leftJoin('sales.sales_items', 'sales_items')
      .leftJoin('sales_items.product', 'products')
      .orderBy('sales_date', 'DESC')
      .groupBy('sales_date')
      .limit(7)
      .getRawMany();


    // Forward the result
    return queryResult.map(({ sales_date, sum }) => {
      return {
        sales_date: new Date(sales_date).toLocaleDateString(),
        sum: sum,
      };
    });
      
  }

  // Create new sales instance
  async createSales(orderDetails: CreateOrderParams) {
    const newSales = this.salesRepository.save({
      ...orderDetails,
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    // Iterate list from sales_items type from OrderItem request body
    orderDetails.sales_items.map(async (values) => {
      const newSalesItems = this.salesItemsRepository.create({
        product_id: values.product_id,
        quantity: values.quantity,
        sales: {
          sales_id: (await newSales).sales_id,
        },
      });
      await this.salesItemsRepository.save(newSalesItems);
    });
    return newSales;
  }
}
