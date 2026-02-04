import { NextFunction, Request, Response } from "express";

export class FileUploadMiddleware {
  static containFiles(req: Request, res: Response, next: NextFunction) {    
    if (!req.files || !req.files.file) {
      return res.status(400).json({ error: "No files were selected" });
    }

    const files = req.files.file;

    req.files = {
      files: Array.isArray(files) ? files : [files]
    } as any;

    next();
  }
}