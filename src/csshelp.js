var colors = require('colors');
var program = require('commander');

/**
 * Templates for documentation file
 */
var templates = require('csshelp-template');

/**
 * Parser
 */
var Parser = require('csshelp-parser');

/**
 * Configuration
 */
var config = {
    generatedFile: 'csshelp.html',
    templates: templates
};

/**
 * Messages for success/failure cases
 */
var messages = {
    successMessage: colors.green('Success: Documentation generated, check: csshelp.html'),
    includeArgError: colors.red('Error: You should specify file with css: --styles <file>'),
    srcArgError: colors.red('Error: You should specify source: --src <file>')
};

/**
 * Parse CLI options
 * @type {{ styles: string, src: string }}
 */
program
    .option('--styles <file>', 'Specify CSS file, which will be added to the generated docs to render examples', null, null )
    .option('--src    <file>', 'Specify source with comments for documentation', null, null )
    .parse( process.argv );

/**
 * Check required data
 * @param {{ styles: string, src: string }} program
 */
function checkOptions( program ) {
    var isError = false;

    if ( !program.styles ) {
        isError = true;
        console.error( messages.includeArgError );
    }

    if ( !program.src ) {
        isError = true;
        console.error( messages.srcArgError );
    }

    return isError;
}

/**
 * Check required data
 * @param {{ styles: string, src: string }} program
 * @param {object} config
 */
function startProcess( program, config ) {
    var csshelp = new Parser({ styles: program.styles, src: program.src, templates: config.templates });

    csshelp.process( config, function() {
        console.log( messages.successMessage );
    });
}

/**
 * Check required data
 */
if ( checkOptions( program ) ) {
    return;
}

/**
 * Start docs generation
 */
startProcess( program, config );
