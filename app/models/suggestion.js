import DS from 'ember-data';

var model = DS.Model.extend({
  word: DS.belongsTo("word"),
  entries: DS.attr()
});

export default model;