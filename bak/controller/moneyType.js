'use strict';

const Controller = require('egg').Controller;

class RoleController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const schoolId = ctx.request.header.schoolid;
    const filter = {
      schoolId
    };
    if (query.name) {
      filter['name'] = new RegExp(ctx.helper.escapeStringRegExp(query.name), 'i');
    }
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.moneyType.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.moneyType.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.moneyType.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.moneyType.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.moneyType.update(id, ctx.request.body);
  }
}

module.exports = RoleController;
