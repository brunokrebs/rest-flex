import * as mockery from 'mockery';

mockery.enable({
  warnOnReplace: false,
  warnOnUnregistered: false
});

const jwtMock = () => {
  return async function (ctx, next): Promise<any> {
    return await next();
  }
};

mockery.registerMock('koa-jwt', jwtMock);
