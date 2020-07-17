import path from 'path'

module.exports = {
    client: 'mysql2',
    connection: {
        host: 'localhost',
        port: 3308,
        user: 'root',
        password: '',
        database: 'test_db'
    },
    migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
    }
}