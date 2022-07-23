const winston = require('winston');    			
const winstonDaily = require('winston-daily-rotate-file');    	
const moment = require('moment');    	
const {printf} = winston.format;

const colors = {
    error: "red",
    warn: "yellow",
    info: "green",
    http: "magenta",
    debug: "blue",
};

winston.addColors(colors);

function timeStampFormat() {
    return moment().format('YYYY-MM-DD HH:mm:ss.SSS ZZ'); // '2022-07-23 15:40:28.500 +0900'
};

const logFormat = printf((info) => {
    return `${timeStampFormat()} [${info.level}] ${info.message}`;
});

var logger= winston.createLogger({
    format: logFormat,
    colorize: true,
    transports: [
        new winstonDaily({
//이름이 info-file인 설정 정보는 매일 새로운 파일에 로그를 기록하도록 설정
            name: 'info-file',
            filename: './log/info',
            datePattern: '_yyyy-MM-dd.log',
// 50MB를 넘어 가면 자동으로 새로운 파일을 생성되며, 이때 자동으로 분리되어 생성 되는 파일의 개수는 최대 1000개 까지 가능하다.
            maxsize: 50000000,           
            maxFiles: 1000,
//info 수준의 로그만 기록하도록 설정함.
            level: 'info',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
            
        }),
        new winstonDaily({
            name: 'error-file',
            filename: './log/error',
            datePattern: '_yyyy-MM-dd.log',
            level: "error",
        }), 
        new (winston.transports.Console)({
            name: 'debug-console',
            level: 'debug',
            showLevel: true,
            json: false,
            timestamp: timeStampFormat
        })
    ]
});

module.exports = logger;