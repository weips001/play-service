'use strict';

const Controller = require('egg').Controller;

class TrainingGroundController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const schoolId = ctx.request.header.schoolid;
    const filter = {
      schoolId
    };
    query.Type ? filter.Type = query.Type : null;
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.trainingGround.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.trainingGround.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.trainingGround.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.trainingGround.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.trainingGround.update(id, ctx.request.body);
  }
}

module.exports = TrainingGroundController;