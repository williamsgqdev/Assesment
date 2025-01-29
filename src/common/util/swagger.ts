import { Express, Request, Response } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express'
import {version} from '../../../package-lock.json'

const options: swaggerJsdoc.Options = {
  definition: {
      openapi: '3.0.0',
      info: {
          title: 'Scelloo Api Doc',
          version,
      },
      components: {
          securitySchemes: { // Corrected from "securitySchemas"
              basicAuth: {
                  type: 'http',
                  scheme: 'basic'
              }
          }
      },
      security: [
          {
              basicAuth: []
          }
      ]
  },
  apis: ['./src/**/*.router.ts']
};

const swaggerSpec = swaggerJsdoc(options)

export function swaggerDocs(app: Express){
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

  app.get('docs.json', (req: Request, res: Response)=> {
    res.setHeader('Content-Type', 'application/json')
    res.send(swaggerSpec)
  })
}