const { Command } = require('commander');
const { logger } = require('../config/logger');

const program = new Command();

program
    .option('-d, --debug', 'Enable debugging', false)
    .option('--mode <mode>', 'Set the working mode', 'development');

program.parse();

logger.info('Runtime options:', program.opts());

module.exports = program;