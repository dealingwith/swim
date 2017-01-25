var ResultsView = Backbone.View.extend({

  el: '.reference-results',

  events: {
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.listenTo(resultsCollection, 'add', this.render);
  },

  render: function() {
    var self = this;
    this.collection.each(function(result){
      var resultView = new ResultView({ model: result });
      self.$el.prepend(resultView.el);
    });
  }

});
