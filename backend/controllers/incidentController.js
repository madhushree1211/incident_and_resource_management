const Incident = require('../models/Incident');
const { logEvent } = require('../utils/logger');

const getIncidents = async (req, res, next) => {
  try {
    const filter = {};

    if (req.query.status) filter.status = req.query.status;
    if (req.query.severity) filter.severity = req.query.severity;
    if (req.query.reportedBy) filter.reportedBy = req.query.reportedBy;
    if (req.query.assignedTo) filter.assignedTo = req.query.assignedTo;
    if (req.query.search) {
      filter.$or = [
        { title: new RegExp(req.query.search, 'i') },
        { description: new RegExp(req.query.search, 'i') }
      ];
    }

    if (req.user.role === 'technician') {
      filter.assignedTo = req.user._id;
    }

    if (req.user.role === 'user') {
      filter.reportedBy = req.user._id;
    }

    const incidents = await Incident.find(filter)
      .populate('reportedBy', 'name email role')
      .populate('assignedTo', 'name email role')
      .populate('resource', 'name type location');

    res.status(200).json({ success: true, data: incidents });
  } catch (error) {
    next(error);
  }
};

const getIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id)
      .populate('reportedBy', 'name email role')
      .populate('assignedTo', 'name email role')
      .populate('resource', 'name type location');

    if (!incident) {
      return res.status(404).json({ success: false, message: 'Incident not found' });
    }

    if (req.user.role === 'technician' && incident.assignedTo && !incident.assignedTo._id.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    if (req.user.role === 'user' && !incident.reportedBy._id.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    res.status(200).json({ success: true, data: incident });
  } catch (error) {
    next(error);
  }
};

const createIncident = async (req, res, next) => {
  try {
    const incident = await Incident.create({
      ...req.body,
      reportedBy: req.user._id
    });

    await logEvent({
      level: 'info',
      message: 'Incident created',
      meta: { incidentId: incident._id, reportedBy: req.user._id }
    });

    res.status(201).json({ success: true, data: incident });
  } catch (error) {
    next(error);
  }
};

const updateIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ success: false, message: 'Incident not found' });
    }

    if (req.user.role === 'user' && !incident.reportedBy.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    if (req.user.role === 'technician' && incident.assignedTo && !incident.assignedTo.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    Object.assign(incident, req.body);
    await incident.save();

    await logEvent({
      level: 'info',
      message: 'Incident updated',
      meta: { incidentId: incident._id, updatedBy: req.user._id }
    });

    res.status(200).json({ success: true, data: incident });
  } catch (error) {
    next(error);
  }
};

const deleteIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ success: false, message: 'Incident not found' });
    }

    if (req.user.role === 'user' && !incident.reportedBy.equals(req.user._id)) {
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }

    await incident.deleteOne();

    await logEvent({
      level: 'info',
      message: 'Incident deleted',
      meta: { incidentId: incident._id, deletedBy: req.user._id }
    });

    res.status(200).json({ success: true, message: 'Incident deleted' });
  } catch (error) {
    next(error);
  }
};

const assignIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ success: false, message: 'Incident not found' });
    }

    incident.assignedTo = req.body.assignedTo;
    incident.status = 'in_progress';
    await incident.save();

    await logEvent({
      level: 'info',
      message: 'Incident assigned',
      meta: { incidentId: incident._id, assignedBy: req.user._id, assignedTo: req.body.assignedTo }
    });

    res.status(200).json({ success: true, data: incident });
  } catch (error) {
    next(error);
  }
};

const resolveIncident = async (req, res, next) => {
  try {
    const incident = await Incident.findById(req.params.id);
    if (!incident) {
      return res.status(404).json({ success: false, message: 'Incident not found' });
    }

    incident.status = 'resolved';
    Object.assign(incident, req.body);
    await incident.save();

    await logEvent({
      level: 'info',
      message: 'Incident resolved',
      meta: { incidentId: incident._id, resolvedBy: req.user._id }
    });

    res.status(200).json({ success: true, data: incident });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getIncidents,
  getIncident,
  createIncident,
  updateIncident,
  deleteIncident,
  assignIncident,
  resolveIncident
};
