import { Request, Response } from "express"
import { CustomError } from "../../domain"
import { FileUploadService } from "../services"
import { UploadedFile } from "express-fileupload"

export class FileUploadController {
  constructor(
    public readonly fileUploadService: FileUploadService
  ) { }

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) { return res.status(error.statusCode).json({ error: error.message }) }
    return res.status(500).json({ error: "Internal server error" })
  }

  uploadFile = async (req: Request, res: Response) => {
    const file = (req.files as any).files[0] as UploadedFile;
    const type = req.params.type;

    this.fileUploadService.uploadSingle(file, `uploads/${type}`)
      .then(uploaded => res.json(uploaded))
      .catch(err => this.handleError(err, res));
  };

  uploadMultipleFiles = async (req: Request, res: Response) => {
    const files = (req.files as any).files as UploadedFile[];
    const type = req.params.type;

    this.fileUploadService.uploadMultiple(files, type)
      .then(uploaded => res.json(uploaded))
      .catch(err => this.handleError(err, res));
  }
}