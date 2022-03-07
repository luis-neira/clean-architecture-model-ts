import PinoHttp from 'pino-http';

const pinoHttp = PinoHttp({
  customLogLevel: (res, err) => {
    if (res.statusCode > 451) return 'error';
    if (res.statusCode >= 400) return 'warn';
    return 'info';
  }
});

export default pinoHttp;
