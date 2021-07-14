'use strict';

const Service = require('egg').Service;
// const http = require('http');
// const request = require('request');
// const fs = require('fs');
const {
  distanceOne,
  fineOne,
  speedOne,
  markingLineOne,
  gestureOne,
  signalLampOne,
  deductionOne,
  lightingOne,
  timeFour,
  distanceFour,
  speedFour,
  markingLineFour,
  gestureFour,
  signalLampFour,
  drunkDrivingFour,
  lightingFour
} = require('./vip')
class SubjectService extends Service {
  async distanceOne() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: distanceOne
      },
    });
    return {
      list,
      total: list.length,
    };
  }
  async fineOne() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: fineOne
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async speedOne() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: speedOne
      },
    });
    return {
      list,
      total: list.length,
    };
  }
  async markingLineOne() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: markingLineOne
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async gestureOne() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: gestureOne
      },
    });
    return {
      list,
      total: list.length,
    };
  }
  async signalLampOne() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: signalLampOne
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async deductionOne() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: deductionOne
      },
    });
    return {
      list,
      total: list.length,
    };
  }
  async lightingOne() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: lightingOne
      },
    });
    return {
      list,
      code: 0,
    };
  }

  // 科目四
  async timeFour() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectOne.find({
      id: {
        $in: timeFour
      },
    });
    return {
      list,
      total: list.length,
    };
  }
  async distanceFour() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: distanceFour
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async speedFour() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: speedFour
      },
    });
    return {
      list,
      total: list.length,
    };
  }
  async markingLineFour() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: markingLineFour
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async gestureFour() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: gestureFour
      },
    });
    return {
      list,
      total: list.length,
    };
  }
  async signalLampFour() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: signalLampFour
      },
    });
    return {
      list,
      code: 0,
    };
  }
  async drunkDrivingFour() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: drunkDrivingFour
      },
    });
    return {
      list,
      total: list.length,
    };
  }
  async lightingFour() {
    const ctx = this.ctx;
    const list = await ctx.model.SubjectFour.find({
      id: {
        $in: lightingFour
      },
    });
    return {
      list,
      code: 0,
    };
  }
}
module.exports = SubjectService;