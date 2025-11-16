import { Chain } from './Chain.js';

export class AttendanceManager {
  constructor(parentChainLastHash = '') {
    this.attendanceChain = new Chain(parentChainLastHash);
    this.attendanceChain.createGenesisBlock();
  }

  recordAttendance(attendanceData) {
    const blockData = {
      type: 'attendance',
      action: 'record',
      attendance: attendanceData,
      timestamp: new Date().toISOString()
    };

    return this.attendanceChain.addBlock(blockData);
  }

  recordBulkAttendance(attendanceRecords) {
    const blockData = {
      type: 'attendance',
      action: 'bulk_record',
      records: attendanceRecords,
      timestamp: new Date().toISOString()
    };

    return this.attendanceChain.addBlock(blockData);
  }

  getAttendanceChain() {
    return this.attendanceChain.getChainData();
  }

  validateAttendanceChain() {
    return this.attendanceChain.isChainValid();
  }

  getChainStats() {
    return {
      chainType: 'Attendance',
      totalBlocks: this.attendanceChain.getChainLength(),
      isValid: this.attendanceChain.isChainValid(),
      lastBlockHash: this.attendanceChain.getLatestBlock().hash,
      difficulty: this.attendanceChain.difficulty
    };
  }
}
