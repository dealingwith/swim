var ResultsView = Backbone.View.extend({

  el: '.reference-results',

  events: {
  },

  initialize: function() {
    _.bindAll(this, 'render');
    this.listenTo(resultsCollection, 'add', this.render);
  },

  render: function() {
    this.$el.empty();
    var self = this;
    var groupedCollection = this.collection.groupBy('search');
    _.each(groupedCollection, function(childCollection, search) {
      _.each(childCollection, function(result) {
        var resultView = new ResultView({model: result});
        self.$el.prepend(resultView.el);
      });
      self.$el.prepend(`<div class="reference-subhead yellow"><span class="glyphicon glyphicon-tint"></span> <span class="search-term">${search}</span></div>`);
    });
  }

});
