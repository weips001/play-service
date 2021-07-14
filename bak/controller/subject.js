'use strict';

const Controller = require('egg').Controller;

class SubjectController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    query.Type ? filter.Type = query.Type : null;
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.subject.list(filter, limit, offset);
  }
  async listOne() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    query.Type ? filter.Type = query.Type : null;
    const limit = parseInt(query.limit || 100);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.subject.listOne(filter, limit, offset);
  }
  async listFour() {
    const ctx = this.ctx;
    const query = ctx.query;
    const filter = {};
    query.Type ? filter.Type = query.Type : null;
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.subject.listFour(filter, limit, offset);
  }

  async listOneVip() {
    this.ctx.body = await this.ctx.service.subject.listOneVip();
  }
  async listFourVip() {
    this.ctx.body = await this.ctx.service.subject.listFourVip();
  }

  async mockSubjectOne() {
    this.ctx.body = await this.ctx.service.subject.mockSubjectOne();
  }
  async mockSubjectFour() {
    this.ctx.body = await this.ctx.service.subject.mockSubjectFour();
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.subject.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.subject.add(ctx.request.body);
  }
  async wrongOne() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.subject.wrongOne(ctx.request.body);
  }
  async wrongFour() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.subject.wrongFour(ctx.request.body);
  }
  async collectionOne() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.subject.collectionOne(ctx.request.body);
  }
  async collectionFour() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.subject.collectionFour(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.subject.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.subject.update(id, ctx.request.body);
  }
  async getFiftySubject() {
    this.ctx.body = await this.ctx.service.subject.getFiftySubject();
  }
  async getFiftySubjectOne() {
    this.ctx.body = await this.ctx.service.subject.getFiftySubjectOne();
  }
  async getFiftySubjectFour() {
    this.ctx.body = await this.ctx.service.subject.getFiftySubjectFour();
  }
  async getWrongSubject() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    this.ctx.body = await this.ctx.service.subject.getWrongSubject(id);
  }
  async addSubjectOne() {
    this.ctx.body = await this.ctx.service.subject.addSubjectOne();
  }
  async addSubjectFour() {
    this.ctx.body = await this.ctx.service.subject.addSubjectFour();
  }
  async deleteAllSubject() {
    this.ctx.body = await this.ctx.service.subject.deleteAllSubject();
  }
  async deleteSubjectOne() {
    this.ctx.body = await this.ctx.service.subject.deleteSubjectOne();
  }
  async deleteSubjectFour() {
    this.ctx.body = await this.ctx.service.subject.deleteSubjectFour();
  }
}

module.exports = SubjectController;