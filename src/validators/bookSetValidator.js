import Joi from 'joi';

// Schema for creating a book set
export const createBookSetSchema = Joi.object({
  board_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Board ID must be a number',
    'number.integer': 'Board ID must be an integer',
    'number.positive': 'Board ID must be positive',
    'any.required': 'Board ID is required'
  }),
  medium_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Medium ID must be a number',
    'number.integer': 'Medium ID must be an integer',
    'number.positive': 'Medium ID must be positive',
    'any.required': 'Medium ID is required'
  }),
  class_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Class ID must be a number',
    'number.integer': 'Class ID must be an integer',
    'number.positive': 'Class ID must be positive',
    'any.required': 'Class ID is required'
  }),
  year_id: Joi.number().integer().positive().required().messages({
    'number.base': 'Year ID must be a number',
    'number.integer': 'Year ID must be an integer',
    'number.positive': 'Year ID must be positive',
    'any.required': 'Year ID is required'
  }),
  set_name: Joi.string().trim().min(3).max(100).required().messages({
    'string.base': 'Set name must be a string',
    'string.empty': 'Set name cannot be empty',
    'string.min': 'Set name must be at least 3 characters long',
    'string.max': 'Set name cannot exceed 100 characters',
    'any.required': 'Set name is required'
  }),
  books: Joi.array()
    .items(
      Joi.object({
        book_id: Joi.number().integer().positive().required().messages({
          'number.base': 'Book ID must be a number',
          'number.integer': 'Book ID must be an integer',
          'number.positive': 'Book ID must be positive',
          'any.required': 'Book ID is required'
        }),
        quantity: Joi.number().integer().min(1).max(1000).default(1).messages({
          'number.base': 'Quantity must be a number',
          'number.integer': 'Quantity must be an integer',
          'number.min': 'Quantity must be at least 1',
          'number.max': 'Quantity cannot exceed 1000'
        })
      })
    )
    .min(1)
    .required()
    .messages({
      'array.base': 'Books must be an array',
      'array.min': 'At least one book is required',
      'any.required': 'Books array is required'
    })
});

// Schema for updating a book set
export const updateBookSetSchema = Joi.object({
  board_id: Joi.number().integer().positive().messages({
    'number.base': 'Board ID must be a number',
    'number.integer': 'Board ID must be an integer',
    'number.positive': 'Board ID must be positive'
  }),
  medium_id: Joi.number().integer().positive().messages({
    'number.base': 'Medium ID must be a number',
    'number.integer': 'Medium ID must be an integer',
    'number.positive': 'Medium ID must be positive'
  }),
  class_id: Joi.number().integer().positive().messages({
    'number.base': 'Class ID must be a number',
    'number.integer': 'Class ID must be an integer',
    'number.positive': 'Class ID must be positive'
  }),
  year_id: Joi.number().integer().positive().messages({
    'number.base': 'Year ID must be a number',
    'number.integer': 'Year ID must be an integer',
    'number.positive': 'Year ID must be positive'
  }),
  set_name: Joi.string().trim().min(3).max(100).messages({
    'string.base': 'Set name must be a string',
    'string.empty': 'Set name cannot be empty',
    'string.min': 'Set name must be at least 3 characters long',
    'string.max': 'Set name cannot exceed 100 characters'
  }),
  books: Joi.array()
    .items(
      Joi.object({
        book_id: Joi.number().integer().positive().required().messages({
          'number.base': 'Book ID must be a number',
          'number.integer': 'Book ID must be an integer',
          'number.positive': 'Book ID must be positive',
          'any.required': 'Book ID is required'
        }),
        quantity: Joi.number().integer().min(1).max(1000).default(1).messages({
          'number.base': 'Quantity must be a number',
          'number.integer': 'Quantity must be an integer',
          'number.min': 'Quantity must be at least 1',
          'number.max': 'Quantity cannot exceed 1000'
        })
      })
    )
    .min(1)
    .messages({
      'array.base': 'Books must be an array',
      'array.min': 'At least one book is required'
    })
}).min(1).messages({
  'object.min': 'At least one field must be provided for update'
});

// Schema for ID parameter
export const idParamSchema = Joi.object({
  id: Joi.number().integer().positive().required().messages({
    'number.base': 'ID must be a number',
    'number.integer': 'ID must be an integer',
    'number.positive': 'ID must be positive',
    'any.required': 'ID is required'
  })
});

// Schema for query parameters
export const queryParamsSchema = Joi.object({
  board_id: Joi.number().integer().positive().messages({
    'number.base': 'Board ID must be a number',
    'number.integer': 'Board ID must be an integer',
    'number.positive': 'Board ID must be positive'
  }),
  medium_id: Joi.number().integer().positive().messages({
    'number.base': 'Medium ID must be a number',
    'number.integer': 'Medium ID must be an integer',
    'number.positive': 'Medium ID must be positive'
  }),
  class_id: Joi.number().integer().positive().messages({
    'number.base': 'Class ID must be a number',
    'number.integer': 'Class ID must be an integer',
    'number.positive': 'Class ID must be positive'
  }),
  year_id: Joi.number().integer().positive().messages({
    'number.base': 'Year ID must be a number',
    'number.integer': 'Year ID must be an integer',
    'number.positive': 'Year ID must be positive'
  })
}).unknown(false);
