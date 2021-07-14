'use strict';

const Controller = require('egg').Controller;
// const fs = require('fs')
// const Excel = require('exceljs')

class CarController extends Controller {
  async list() {
    const ctx = this.ctx;
    const query = ctx.query;
    const schoolId = ctx.request.header.schoolid;
    const filter = {
      schoolId
    };
    if (query.carNumber) {
      filter['carNumber'] = new RegExp(ctx.helper.escapeStringRegExp(query.carNumber), 'i');
    }
    query.Type ? filter.Type = query.Type : null;
    const limit = parseInt(query.limit || 10);
    const offset = (parseInt(query.page || 1) - 1) * limit;
    this.ctx.body = await this.ctx.service.car.list(filter, limit, offset);
  }
  async get() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.car.get(id);
  }
  async add() {
    const ctx = this.ctx;
    ctx.body = await ctx.service.car.add(ctx.request.body);
  }
  async remove() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.car.remove(id);
  }
  async update() {
    const ctx = this.ctx;
    const id = ctx.params.id;
    ctx.body = await ctx.service.car.update(id, ctx.request.body);
  }

  // async excle() {
  //   const ctx = this.ctx;
  //   let param = {
  //     dataType: 'json',
  //     // data: {
  //     // }
  //     };

  //     // t:title k:key w:width  ==>表头
  //     let headers = [[
  //         { t: '姓名', k: 'userName', w: 20 },
  //         { t: '所属部门', k: 'deptName' },
  //         { t: '自评分', k: 'selfRate' },
  //         { t: 'learder评分', k: 'leaderRate' },
  //         { t: '绩效结果', k: 'rateResult' },
  //     ]];

  //     await ctx.helper.excelNew('https://www.baidu.com', param, headers, '绩效考核统计表', function (res) {
  //         //数据二次处理函数
  //     });
  // }
}

module.exports = CarController;
