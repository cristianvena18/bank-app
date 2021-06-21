import promBundle from "express-prom-bundle";
import client from 'prom-client';
import { NextFunction, Request, Response } from 'express';

const bundle = promBundle({
  includeMethod: true,
  autoregister: true,
  includePath: true,
  customLabels: { year: null },
  transformLabels: labels => Object.assign(labels, { year: new Date().getFullYear() }),
  normalizePath: [
    // collect paths like "/customer/johnbobson" as just one "/custom/#name"
    ['^/customer/.*', '/customer/#val'],
  ],
  urlValueParser: {
    minHexLength: 1,
    extraMasks: [
      '[0-9]{1,}' // replace strings like 1243423, 73562 as #val
    ]
  }
});

const register = new client.Registry()

register.setDefaultLabels({
  app: 'example-nodejs-app'
})

client.collectDefaultMetrics({ register })

const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds_1',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.3, 0.5, 0.7, 1, 3, 5, 7, 10] // 0.1 to 10 seconds
})

register.registerMetric(httpRequestDurationMicroseconds)

const middleware = (req: Request, res: Response, next: NextFunction) => {
  const end = httpRequestDurationMicroseconds.startTimer();
  next();
  end({ method: req.method, route: req.path, code: res.statusCode });
}

export { middleware };

export default bundle;