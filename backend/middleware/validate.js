const Joi = require('joi');

const validate = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body, { abortEarly: false, allowUnknown: false });

  if (error) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: error.details.map((detail) => ({
        field: detail.path.join('.'),
        message: detail.message
      }))
    });
  }

  next();
};

const authRegisterSchema = Joi.object({
  name: Joi.string().max(100).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
  role: Joi.string().valid('admin', 'technician', 'user').optional()
});

const authLoginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
});

const resourceSchema = Joi.object({
  name: Joi.string().max(120).required(),
  type: Joi.string().valid('classroom', 'lab', 'equipment', 'vehicle', 'other').required(),
  location: Joi.string().max(120).required(),
  capacity: Joi.number().min(0).optional(),
  description: Joi.string().max(500).allow('', null).optional(),
  amenities: Joi.array().items(Joi.string().max(80)).optional(),
  status: Joi.string().valid('active', 'maintenance', 'inactive').optional()
});

const incidentSchema = Joi.object({
  title: Joi.string().max(200).required(),
  description: Joi.string().max(2000).required(),
  severity: Joi.string().valid('low', 'medium', 'high', 'critical').optional(),
  status: Joi.string().valid('open', 'in_progress', 'resolved', 'closed').optional(),
  assignedTo: Joi.string().hex().length(24).optional(),
  resource: Joi.string().hex().length(24).optional(),
  tags: Joi.array().items(Joi.string().max(80)).optional()
});

module.exports = {
  validate,
  schemas: {
    authRegisterSchema,
    authLoginSchema,
    resourceSchema,
    incidentSchema
  }
};
