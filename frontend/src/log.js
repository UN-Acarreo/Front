import debug from 'debug';

const BASE = 'UN-Acarreo';

const COLOURS = {
    TRACE: 'green',
    INFO: 'lightblue',
    WARN: 'orange',
    ERROR: 'red'
}

class Log{
    generateMessage(level, message, source){
        const namespace = `${BASE}: ${level}`;
        const createDebug = debug(namespace);

        createDebug.color = COLOURS[level];

        if(source){createDebug(source, message);}
        else{createDebug(message);}
    }

    trace(message, source){
        return this.generateMessage('TRACE', message, source);
    }

    info(message, source){
        return this.generateMessage('INFO', message, source);
    }
    warn(message, source){
        return this.generateMessage('WARN', message, source);
    }
    error(message, source){
        return this.generateMessage('ERROR', message, source);
   }
}

export default new Log();