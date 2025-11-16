import express from 'express';
import {
  recordAttendance,
  getAttendanceByClass,
  getAttendanceByStudent,
  getAttendanceByDate
} from '../controllers/attendanceController.js';

const router = express.Router();

router.post('/', recordAttendance);
router.get('/class/:classId', getAttendanceByClass);
router.get('/student/:studentId', getAttendanceByStudent);
router.get('/date/:date', getAttendanceByDate);

export default router;
