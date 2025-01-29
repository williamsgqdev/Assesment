import rateLimit from "express-rate-limit";

export const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    limit: 5,
    standardHeaders: 'draft-8',
	legacyHeaders: false,
    handler: (req, res, next, options) =>
      res.status(options.statusCode).send({
        message: options.message
      })
})