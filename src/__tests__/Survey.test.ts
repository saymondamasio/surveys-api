import request from 'supertest'

import { app } from '../app'
import { createConnectionApp } from '../database'

describe('Surveys', () => {
  beforeAll(async () => {
    const connection = await createConnectionApp()
    await connection.runMigrations()
  })

  it('should be able to create a new survey', async () => {
    const response = await request(app).post('/surveys').send({
      title: 'Title',
      description: 'Description',
    })

    expect(response.status).toBe(201)
    expect(response.body).toHaveProperty('id')
  })

  it('should be able to get all surveys', async () => {
    await request(app).post('/surveys').send({
      title: 'Title 2',
      description: 'Description 2',
    })

    const response = await request(app).get('/surveys').send()

    expect(response.body.length).toBe(2)
  })
})
