import { Request, Response } from 'express'
import knex from '../database/connection'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

class AuthController {
    
    async login(req: Request, res: Response) { 
        if (!req.body.email || !req.body.password) return res.status(400).json({ message: 'Usuário ou senha não informados' })
        
        const user = await knex('users').select('*').where({ email: req.body.email }).first()

        if (!user || !await bcrypt.compare(req.body.password, user.password)) return res.status(400).json({ message: 'Usuário ou senha incorretos' })

        const token: string = jwt.sign({ id: user.id, level: user.access_level }, process.env.SECRET || 'beterraba-vermelha', { expiresIn: 86400 })
        
        const accesLevels = ['admin', 'manager', 'student', 'stakholder']
        // console.log('Welcome', accesLevels[user.access_level])

        user.password = undefined
        user.access_level = accesLevels[user.access_level]

        return res.header('Authorization', `Bearer ${token}`).json(user)
    }
}

export default AuthController