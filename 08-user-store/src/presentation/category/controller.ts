import { Request, Response } from "express"
import { CreateCategoryDto, CustomError } from "../../domain"
import { CategoryService } from "../services"
import { PaginationDto } from '../../domain/dtos/shared/pagination.dto';

export class CategoryController {
  constructor(
    public readonly categoryService: CategoryService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) { return res.status(error.statusCode).json({ error: error.message }) }
    return res.status(500).json({ error: "Internal server error" })
  }

  createCategory = (req: Request, res: Response) => {
    const [error, createCategoryDto] = CreateCategoryDto.create(req.body)
    if (error) return res.status(400).json({ error })

    this.categoryService.createCategory(createCategoryDto!, req.body.user)
      .then(category => res.status(201).json(category))
      .catch(err => this.handleError(err, res))
  }

  getCategories = (req: Request, res: Response) => {
    const { page, limit } = req.query

    const [error, paginationDto] = PaginationDto.create(page ? +page : undefined, limit ? +limit : undefined)
    if (error) return res.status(400).json({ error })

    this.categoryService.getCategories(paginationDto!)
      .then(categories => res.status(200).json(categories))
      .catch(err => this.handleError(err, res))
  }
}