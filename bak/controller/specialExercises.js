'use strict';

const Controller = require('egg').Controller;

class SubjectController extends Controller {
  // 科目一
  async distanceOne() {
    this.ctx.body = await this.ctx.service.specialExercises.distanceOne();
  }
  async fineOne() {
    this.ctx.body = await this.ctx.service.specialExercises.fineOne();
  }
  async speedOne() {
    this.ctx.body = await this.ctx.service.specialExercises.speedOne();
  }
  async markingLineOne() {
    this.ctx.body = await this.ctx.service.specialExercises.markingLineOne();
  }
  async gestureOne() {
    this.ctx.body = await this.ctx.service.specialExercises.gestureOne();
  }
  async signalLampOne() {
    this.ctx.body = await this.ctx.service.specialExercises.signalLampOne();
  }
  async deductionOne() {
    this.ctx.body = await this.ctx.service.specialExercises.deductionOne();
  }
  async lightingOne() {
    this.ctx.body = await this.ctx.service.specialExercises.lightingOne();
  }

  // 科目四
  async timeFour() {
    this.ctx.body = await this.ctx.service.specialExercises.timeFour();
  }
  async distanceFour() {
    this.ctx.body = await this.ctx.service.specialExercises.distanceFour();
  }
  async speedFour() {
    this.ctx.body = await this.ctx.service.specialExercises.speedFour();
  }
  async markingLineFour() {
    this.ctx.body = await this.ctx.service.specialExercises.markingLineFour();
  }
  async gestureFour() {
    this.ctx.body = await this.ctx.service.specialExercises.gestureFour();
  }
  async signalLampFour() {
    this.ctx.body = await this.ctx.service.specialExercises.signalLampFour();
  }
  async drunkDrivingFour() {
    this.ctx.body = await this.ctx.service.specialExercises.drunkDrivingFour();
  }
  async lightingFour() {
    this.ctx.body = await this.ctx.service.specialExercises.lightingFour();
  }

}

module.exports = SubjectController;