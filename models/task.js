const mongoose = require('mongoose');
const TaskSchema = new mongoose.Schema({
  title: String,
  explanation: String,
  priority: { type: String, enum: ['High', 'Medium', 'Low'] },
  deadline: Date,
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, enum: ['Pending', 'Completed', 'Delayed'], default: 'Pending' },
  completedAt: Date
});
module.exports = mongoose.model('Task', TaskSchema);