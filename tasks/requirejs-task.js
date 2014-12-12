var _ = require('lodash'),
    path = require('path'),
    MODULE_NAME = 'requireConfig',
    TEMPLATE_PATH = path.join(__dirname, 'config.tpl.ejs');

module.exports = function (grunt) {
  grunt.task.registerMultiTask(MODULE_NAME, 'RequireJS JSON-to-javascript compiler', function (a) {
    function requiredOptions(options, properties) {
      var pluralize = grunt.util.pluralize;
      var missing = properties.filter(function (key) {
        return !options[key];
      });

      if (!_.isEmpty(missing)) {
        throw grunt.util.error('Required option propert' + pluralize(missing.length, 'y/ies') + ' ' + missing.join(', ') + ' is missing');
      }
    }

    var template = grunt.file.read(TEMPLATE_PATH);
    var options = this.options({
      template: template
    });
    _.merge(options, this.data);

    requiredOptions(options, ['dest']);

    grunt.log.write('Creating configuration file ' + options.dest + '...');
    var result = _.template(options.template, {
      values: JSON.stringify(options.values)
    });
    grunt.file.write(options.dest, result);
    grunt.log.ok();
  });
}
