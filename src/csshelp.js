var argv = require('yargs').argv;
var colors = require('colors');
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
 * Constructor
 */
function CSSHelp( styles, src, template ) {
    this.styles = styles;
    this.src = src;
    this.template = template;

    /**
     * Container for content
     */
    this.fileContent = {
        'General': ''
    };
}

/**
 * Parse source file
 */
CSSHelp.prototype.getSrcContent = function () {
    return fs.readFileSync( this.src, { encoding: 'utf8' } );
};

/**
 * Parse all comments in source file
 */
CSSHelp.prototype.parseComments = function ( srcContent ) {
    return srcContent.match(/(\/\*([^*]|[\r\n]|(\*+([^*/]|[\r\n])))*\*+\/)|(\/\/.*)/g);
};

/**
 * Get title option
 */
CSSHelp.prototype.getTitle = function ( commentContent ) {
    var title = commentContent.match(/@title([\s\S]*?)(?=@group|@example|@code|$)/);

    return ( title && title[1] ) ? title[1].replace(/\r\n.*\*/g, '\r\n').trim() : null;
};

/**
 * Get group option
 */
CSSHelp.prototype.getGroup = function ( commentContent ) {
    var group = commentContent.match(/@group([\s\S]*?)(?=@code|@title|@example|$)/);

    return ( group && group[1] ) ? group[1].replace(/\r\n.*\*/g, '\r\n').trim() : null;
};

/**
 * Get code option
 */
CSSHelp.prototype.getCode = function ( commentContent ) {
    var code = commentContent.match(/@code([\s\S]*?)(?=@group|@title|@example|$)/);

    return ( code && code[1] ) ? code[1].replace(/\r\n.*\*/g, '\r\n').trim() : null;
};

/**
 * Get example option
 */
CSSHelp.prototype.getExample = function ( commentContent ) {
    var example = commentContent.match(/@example([\s\S]*?)(?=@group|@title|@code|$)/);

    return ( example && example[1] ) ? example[1].replace(/\r\n.*\*/g, '\r\n').trim() : null;
};

/**
 * Go throw all comments to find content for documentation file
 */
CSSHelp.prototype.iterateComments = function ( comments ) {
    comments.forEach(function ( comment ) {

        /**
         * Skip comments without @csshelp label
         */
        if ( comment.indexOf('@csshelp') === -1 ) {
            return;
        }

        var commentContent = comment.replace(/\/\*/, '').replace(/\*\//, '').trim();

        var title = this.getTitle( commentContent );
        var example = this.getExample( commentContent );
        var code = this.getCode( commentContent );
        var group = this.getGroup( commentContent );

        /**
         * Exclude examples without @title or @example
         */
        if ( !title || !example ) {
            return;
        }

        if ( group && !this.fileContent[ group ] ) {
            this.fileContent[ group ] = '';
        }

        this.fileContent[ group || 'General' ] += this.template.fileBlock
            .replace('{{title}}', title )
            .replace('{{code}}', (( code )
                ? code.replace(/</g, '&lt;').replace(/>/g, '&gt;')
                : example.replace(/</g, '&lt;').replace(/>/g, '&gt;')
            ))
            .replace('{{example}}', example );

    }.bind( this ));
};

/**
 * Process source
 */
CSSHelp.prototype.process = function () {
    var srcContent = this.getSrcContent();
    var comments = this.parseComments( srcContent );

    this.iterateComments( comments );
    this.save();
};

/**
 * Save generated file
 */
CSSHelp.prototype.save = function () {
    var generatedContent = '';

    for ( var group in this.fileContent ) {
        if ( !this.fileContent.hasOwnProperty( group ) ) {
            return
        }

        generatedContent += this.template.headerBlock.replace('{{title}}', group );
        generatedContent += this.fileContent[ group ];
    }

    /**
     * Add content into template
     */
    var generatedFile = this.template.fileTemplate
        .replace('{{include}}', this.styles )
        .replace('{{content}}', generatedContent );

    fs.writeFileSync( config.generatedFile, generatedFile );
};

/**
 * Create CSSHelp instance
 */
var csshelp = new CSSHelp( argv.include, argv.src, template );

csshelp.process();

console.log( successMessage );
