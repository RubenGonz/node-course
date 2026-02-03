import { Request, Response } from "express"
import { CreateProductDto, CustomError } from "../../domain"
import { ProductService } from "../services"
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';

export class ProductController {
  constructor(
    public readonly productService: ProductService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) { return res.status(error.statusCode).json({ error: error.message }) }
    return res.status(500).json({ error: "Internal server error" })
  }

  createProduct = (req: Request, res: Response) => {
    const [error, createProductDto] = CreateProductDto.create({
      ...req.body,
      user: req.body.user.id
    })
    if (error) return res.status(400).json({ error })

    this.productService.createProduct(createProductDto!)
      .then(product => res.status(201).json(product))
      .catch(err => this.handleError(err, res))
  }

  getProducts = (req: Request, res: Response) => {
    const { page, limit } = req.query

    const [error, paginationDto] = PaginationDto.create(page ? +page : undefined, limit ? +limit : undefined)
    if (error) return res.status(400).json({ error })

    this.productService.getProducts(paginationDto!)
      .then(products => res.status(200).json(products))
      .catch(err => this.handleError(err, res))
  }
}