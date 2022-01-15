import { createConnection, getConnectionOptions } from 'typeorm'

export const createConnectionApp = async () => {
  const defaultOptions = await getConnectionOptions()
  return createConnection(
    Object.assign(defaultOptions, {
      database:
        process.env.NODE_ENV === 'test'
          ? './src/database/database.test.sqlite'
          : defaultOptions.database,
    })
  )
}
