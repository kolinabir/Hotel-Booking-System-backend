import { Express, Request, Response } from 'express';
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import { version } from '../../../package.json';

const UserSchema = {
  type: 'object',
  required: ['userId', 'name', 'email', 'password', 'role'],
  properties: {
    userId: {
      type: 'string',
      description: 'Unique identifier for the user.',
    },
    name: {
      type: 'string',
      description: 'The name of the user.',
    },
    email: {
      type: 'string',
      format: 'email',
      description: 'The email address of the user.',
    },
    password: {
      type: 'string',
      format: 'password',
      description: 'The password of the user.',
    },
    role: {
      type: 'string',
      enum: ['admin', 'user'],
      description: 'The role of the user.',
    },
  },
};

const RoomSchema = {
  type: 'object',
  required: [
    'name',
    'description',
    'bedCount',
    'roomType',
    'price',
    'breakfastIncluded',
    'dinnerIncluded',
    'lunchIncluded',
    'roomQuality',
    'isBooked',
  ],
  properties: {
    name: {
      type: 'string',
      description: 'The name of the room.',
    },
    description: {
      type: 'string',
      description: 'Description of the room.',
    },
    bedCount: {
      type: 'integer',
      description: 'Number of beds in the room.',
    },
    roomType: {
      type: 'string',
      enum: ['single', 'double', 'triple', 'quad'],
      description: 'Type of the room.',
    },
    price: {
      type: 'number',
      description: 'Price per night for the room.',
    },
    breakfastIncluded: {
      type: 'boolean',
      description: 'Indicates whether breakfast is included.',
    },
    dinnerIncluded: {
      type: 'boolean',
      description: 'Indicates whether dinner is included.',
    },
    lunchIncluded: {
      type: 'boolean',
      description: 'Indicates whether lunch is included.',
    },
    roomQuality: {
      type: 'string',
      enum: ['normal', 'deluxe', 'super deluxe'],
      description: 'Quality level of the room.',
    },
    isBooked: {
      type: 'boolean',
      description: 'Indicates whether the room is currently booked.',
    },
    bookedBy: {
      type: 'string',
      description: 'The user who booked the room.',
    },
    bookedAt: {
      type: 'string',
      format: 'date-time',
      description: 'The date and time when the room was booked.',
    },
    bookedFor: {
      type: 'string',
      description: 'Additional information about the booking.',
    },
    checkIn: {
      type: 'string',
      format: 'date-time',
      description: 'The date and time of check-in.',
    },
    checkOut: {
      type: 'string',
      format: 'date-time',
      description: 'The date and time of check-out.',
    },
    bookList: {
      type: 'array',
      items: {
        type: 'object',
        properties: {
          bookedBy: {
            type: 'string',
            description: 'The user who booked the room.',
          },
          bookedAt: {
            type: 'string',
            format: 'date-time',
            description: 'The date and time when the room was booked.',
          },
          bookedFor: {
            type: 'string',
            description: 'Additional information about the booking.',
          },
          checkIn: {
            type: 'string',
            format: 'date-time',
            description: 'The date and time of check-in.',
          },
          checkOut: {
            type: 'string',
            format: 'date-time',
            description: 'The date and time of check-out.',
          },
        },
      },
      description: 'List of bookings for the room.',
    },
  },
};

export const options: swaggerJsdoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Hotel booking Api Documentation',
      version,
    },
    servers: [
      {
        url: 'http://localhost:5000',
        description: 'Development server',
      },
    ],
    components: {
      schemas: { UserSchema, RoomSchema },
      securitySchemes: {
        ApiKeyAuth: {
          type: 'apiKey',
          in: 'header',
          name: 'Authorization',
          description: 'Generate token from /auth/login',
        },
      },
    },
    security: [
      {
        ApiKeyAuth: [],
      },
    ],
  },
  apis: ['src/app/routes/index.ts', 'src/app/Modules/**/*.ts'],
};

const swaggerSpec = swaggerJsdoc(options);

function swaggerDocs(app: Express) {
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.get('/api-docs.json', (req: Request, res: Response) => {
    res.setHeader('Content-Type', 'application/json');
    res.send(swaggerSpec);
  });
}

export default swaggerDocs;
