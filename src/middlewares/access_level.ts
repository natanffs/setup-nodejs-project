import { Request, Response, NextFunction } from 'express'

export const admin = (req: Request, res: Response, next: NextFunction) => {

    if (req.userLevel > 0) return res.status(403).json({ message: 'Acesso não autorizado para esse usuário' })

    return next()
}

export const manager = (req: Request, res: Response, next: NextFunction) => {

    if (req.userLevel > 1) return res.status(403).json({ message: 'Acesso não autorizado para esse usuário' })

    return next()
}

export const student = (req: Request, res: Response, next: NextFunction) => {

    if (req.userLevel > 2) return res.status(403).json({ message: 'Acesso não autorizado para esse usuário' })

    return next()
}

export const stakeholder = (req: Request, res: Response, next: NextFunction) => {
    /** > 3 caso algum nível de acesso seja adicionado posteriormente  */
    if (req.userLevel > 3 || req.userLevel === 2) return res.status(403).json({ message: 'Acesso não autorizado para esse usuário' })

    return next()
}