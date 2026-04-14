const Resource = require('../models/Resource');
const { logEvent } = require('../utils/logger');

const getResources = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.type) filter.type = req.query.type;
    if (req.query.status) filter.status = req.query.status;
    if (req.query.search) {
      filter.$or = [
        { name: new RegExp(req.query.search, 'i') },
        { location: new RegExp(req.query.search, 'i') },
        { description: new RegExp(req.query.search, 'i') }
      ];
    }

    const resources = await Resource.find(filter).sort({ name: 1 });
    res.status(200).json({ success: true, data: resources });
  } catch (error) {
    next(error);
  }
};

const getResource = async (req, res, next) => {
  try {
    const resource = await Resource.findById(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }
    res.status(200).json({ success: true, data: resource });
  } catch (error) {
    next(error);
  }
};

const createResource = async (req, res, next) => {
  try {
    const resource = await Resource.create(req.body);

    await logEvent({
      level: 'info',
      message: 'Resource created',
      meta: { resourceId: resource._id, createdBy: req.user ? req.user._id : null }
    });

    res.status(201).json({ success: true, data: resource });
  } catch (error) {
    next(error);
  }
};

const updateResource = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    await logEvent({
      level: 'info',
      message: 'Resource updated',
      meta: { resourceId: resource._id, updatedBy: req.user ? req.user._id : null }
    });

    res.status(200).json({ success: true, data: resource });
  } catch (error) {
    next(error);
  }
};

const deleteResource = async (req, res, next) => {
  try {
    const resource = await Resource.findByIdAndDelete(req.params.id);
    if (!resource) {
      return res.status(404).json({ success: false, message: 'Resource not found' });
    }

    await logEvent({
      level: 'info',
      message: 'Resource deleted',
      meta: { resourceId: resource._id, deletedBy: req.user ? req.user._id : null }
    });

    res.status(200).json({ success: true, message: 'Resource deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = { getResources, getResource, createResource, updateResource, deleteResource };
