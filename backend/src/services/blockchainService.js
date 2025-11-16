import { Chain } from '../blockchain/Chain.js';
import { DepartmentManager } from '../blockchain/DepartmentManager.js';
import { ClassManager } from '../blockchain/ClassManager.js';
import { StudentManager } from '../blockchain/StudentManager.js';
import { AttendanceManager } from '../blockchain/AttendanceManager.js';

export class BlockchainService {
  constructor() {
    this.mainChain = new Chain();
    this.mainChain.createGenesisBlock();

    const mainChainLastHash = this.mainChain.getLatestBlock().hash;

    this.departmentManager = new DepartmentManager(mainChainLastHash);
    this.classManager = new ClassManager(mainChainLastHash);
    this.studentManager = new StudentManager(mainChainLastHash);
    this.attendanceManager = new AttendanceManager(mainChainLastHash);
  }

  addAttendanceBlock(attendanceData) {
    return this.attendanceManager.recordAttendance(attendanceData);
  }

  addBulkAttendanceBlock(attendanceRecords) {
    return this.attendanceManager.recordBulkAttendance(attendanceRecords);
  }

  addDepartmentBlock(departmentData) {
    return this.departmentManager.recordDepartment(departmentData);
  }

  addClassBlock(classData) {
    return this.classManager.recordClass(classData);
  }

  addStudentBlock(studentData) {
    return this.studentManager.recordStudent(studentData);
  }

  getMainChain() {
    return this.mainChain.getChainData();
  }

  getAttendanceChain() {
    return this.attendanceManager.getAttendanceChain();
  }

  getDepartmentChain() {
    return this.departmentManager.getDepartmentChain();
  }

  getClassChain() {
    return this.classManager.getClassChain();
  }

  getStudentChain() {
    return this.studentManager.getStudentChain();
  }

  validateChain() {
    return {
      mainChain: this.mainChain.isChainValid(),
      departmentChain: this.departmentManager.validateDepartmentChain(),
      classChain: this.classManager.validateClassChain(),
      studentChain: this.studentManager.validateStudentChain(),
      attendanceChain: this.attendanceManager.validateAttendanceChain()
    };
  }

  getBlockByIndex(chainType, index) {
    const chains = {
      main: this.mainChain,
      department: this.departmentManager.departmentChain,
      class: this.classManager.classChain,
      student: this.studentManager.studentChain,
      attendance: this.attendanceManager.attendanceChain
    };

    const chain = chains[chainType];
    if (chain && index >= 0 && index < chain.getChainLength()) {
      return chain.getBlockByIndex(index).toJSON();
    }

    return null;
  }

  getAllChainStats() {
    return {
      mainChain: {
        chainType: 'Main',
        totalBlocks: this.mainChain.getChainLength(),
        isValid: this.mainChain.isChainValid(),
        lastBlockHash: this.mainChain.getLatestBlock().hash,
        difficulty: this.mainChain.difficulty
      },
      department: this.departmentManager.getChainStats(),
      class: this.classManager.getChainStats(),
      student: this.studentManager.getChainStats(),
      attendance: this.attendanceManager.getChainStats()
    };
  }
}

export const blockchainService = new BlockchainService();
