const LogEntry = require('../models/LogEntry');

const getLogs = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.level) filter.level = req.query.level;
    if (req.query.search) {
      filter.message = new RegExp(req.query.search, 'i');
    }

    const page = parseInt(req.query.page, 10) || 1;
    const limit = Math.min(parseInt(req.query.limit, 10) || 50, 200);
    const skip = (page - 1) * limit;

    const [logs, total] = await Promise.all([
      LogEntry.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit),
      LogEntry.countDocuments(filter)
    ]);

    res.status(200).json({
      success: true,
      data: logs,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit)
      }
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { getLogs };
