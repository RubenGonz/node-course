import { CategoryModel } from '../../data';
import { CreateCategoryDto, CustomError, PaginationDto, UserEntity } from '../../domain';

export class CategoryService {

  public async createCategory(createCategoryDto: CreateCategoryDto, user: UserEntity) {
    const categoryExist = await CategoryModel.findOne({ name: createCategoryDto.name })
    if (categoryExist) throw CustomError.badRequest("Category already exists")

    try {
      const category = new CategoryModel({
        ...createCategoryDto,
        user: user.id
      })
      await category.save()

      const { id, name, available } = category
      return {
        id,
        name,
        available
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }

  public async getCategories(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto

    try {
      const [total, categories] = await Promise.all([
        CategoryModel.countDocuments(),
        CategoryModel.find()
          .skip((page - 1) * limit)
          .limit(limit)
      ])

      return {
        total,
        page,
        limit,
        next: page * limit < total
          ? `/api/categories?page=${page + 1}&limit=${limit}`
          : null,
        prev: page > 1
          ? `/api/categories?page=${page - 1}&limit=${limit}`
          : null,
        categories: categories.map(({ id, name, available }) => {
          return {
            id,
            name,
            available
          }
        })
      }
    } catch (error) {
      throw CustomError.internalServer(`${error}`)
    }
  }
}