'use strict';

const Controller = require('egg').Controller;

class SignUpController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.signUp.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.signUp.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.signUp.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.signUp.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.signUp.update(id, ctx.request.body);
  }
}

module.exports = SignUpController;
