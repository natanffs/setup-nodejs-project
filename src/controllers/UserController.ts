import { Request, Response } from 'express'
import knex from '../database/connection'
import bcrypt from 'bcrypt'

class UserController {

    async index(req: Request, res: Response) {
        try {
            const users = await knex('users').select('*')

            users.map(u => u.password = undefined)

            return res.json(users)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async show(req: Request, res: Response) {
        try {
            const userId = req.params.id
            const user = await knex('users').select('*').where('id', userId).first()

            if (!user) return res.status(400).json({ message: 'Usuário não existente na base dedados' })

            user.password = undefined

            return res.json(user)
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async store(req: Request, res: Response) {
        try {
            const user = req.body

            const hasUser = await knex('users').select('email').where('email', user.email).first()

            if (hasUser) return res.status(400).json({ message: 'Email já existe na base de dados' })

            const hash = await bcrypt.hash(user.password, 9)
            user.password = hash

            user.created_at = new Date()

            await knex('users').insert(user)

            return res.status(201).json({ message: 'Cadastrado realizado com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async update(req: Request, res: Response) {
        try {
            const userId = req.params.id
            const user = await knex('users').where('id', userId).update(req.body)

            if (!user) return res.status(400).json({ message: 'Usuário não existente na base dedados' })

            return res.json({ message: 'Dados atualizados com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }

    async delete(req: Request, res: Response) {
        try {
            const userId = req.params.id
            const user = await knex('users').where('id', userId).del()

            if (!user) return res.status(400).json({ message: 'Usuário não existente na base dedados' })

            return res.json({ message: 'Usuário removido com sucesso!' })
        } catch (error) {
            console.log('Erro:', error)
            return res.json({ message: error })
        }
    }
}

export default UserController