var ResultView = Backbone.View.extend({

  className: 'reference',

  events: {
  },

  template: Handlebars.compile($('#template-result').html()),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.get('result')));
  }

});
