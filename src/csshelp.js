var argv = require('yargs').argv;
var colors = require('colors');
var css = require('css');
var fs = require('fs');

/**
 * Template for documentation file
 */
var template = require('./template');

/**
 * Configuration object
 */
var config = {
    generatedFile: 'csshelp.html'
};

var successMessage = colors.green('Success: Documentation generated, check: ' + config.generatedFile );

/**
 * Error messages for missing arguments
 */
var includeArgError = colors.red('Error: You should specify file with css: --include [CSSFILE]');
var srcArgError = colors.red('Error: You should specify source: --src [STYLES]');

if ( !argv.include ) {
    return console.error( includeArgError );
}

if ( !argv.src ) {
    return console.error( srcArgError );
}

/**
 * Parse source file
 */
var styles = css.parse( fs.readFileSync( argv.src, { encoding: 'utf8' } ) );

/**
 * Container for content
 */
var fileContent = '';

/**
 * Go throw all rules to find content for documentation file
 */
styles.stylesheet.rules.forEach(function ( rule ) {

    /**
     * Skip all types except comments
     */
    if ( rule.type !== 'comment' ) {
        return;
    }

    /**
     * Skip comments without @csshelp label
     */
    if ( rule.comment.indexOf('@csshelp') === -1 ) {
        return;
    }

    var commentContent = rule.comment.trim();

    var title = commentContent.match(/@title([\s\S]*?)(?=@group|@example|$)/);
    var codeExample = commentContent.match(/@example([\s\S]*?)(?=@group|@title|$)/);

    /**
     * Exclude examples without @title or @example
     */
    if ( !title[1] || !codeExample ) {
        return;
    }

    title = title[1].trim().replace(/\r\n.*\*/g, '\r\n');
    codeExample = codeExample[1].replace(/\r\n.*\*/g, '\r\n');

    fileContent += template.fileBlock
                    .replace('{{title}}', title )
                    .replace('{{code}}', codeExample.replace(/</g, '&lt;').replace(/>/g, '&gt;') )
                    .replace('{{example}}', codeExample );
});

/**
 * Add content into template
 */
var generatedFile = template.fileTemplate
                        .replace('{{include}}', argv.include )
                        .replace('{{content}}', fileContent );

/**
 * Save generated file
 */
fs.writeFileSync( config.generatedFile, generatedFile );

console.log( successMessage );
