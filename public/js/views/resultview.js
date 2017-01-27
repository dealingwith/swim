var ResultView = Backbone.View.extend({

  className: 'reference',

  events: {
    'click .create-link'    : 'createLink',
    'click .create-footnote': 'createFootnote',
    'click .create-new'     : function() {
      console.log('create new clicked');
      return;
    },
    'click p'               : function() {
      var win = window.open(this.model.get('result').url);
      win.focus();
      return;
    }
  },

  template: Handlebars.compile($('#template-result').html()),

  initialize: function() {
    this.render();
  },

  render: function() {
    this.$el.html(this.template(this.model.get('result')));
  },

  createLink: function() {
    var link = this.model.get('result').displayUrl;
    var text = this.model.get('search');
    var $textarea = $('.main-textarea');
    var val = $textarea.val();
    var newval = val.replace(`{${text}}`, `[${text}](${link})`);
    $textarea.val(newval);
  },

  createFootnote: function() {
    var link = this.model.get('result').displayUrl;
    var text = this.model.get('search');
    var $textarea = $('.main-textarea');
    var cursorPos = $textarea.prop('selectionStart');
    var val = $textarea.val();
    var textBefore = val.substring(0,  cursorPos);
    var textAfter  = val.substring(cursorPos, val.length);

    // multiple footnote style links
    var re = /\[\[([\s\S]*?)\]\(/g; //capture footnote links
    var results;
    var lastResult;
    while ((results = re.exec(textBefore)) !== null) {
      lastResult = results[1];
    }
    var footnoteNumber = isNaN(parseInt(lastResult) + 1) ? 1 : parseInt(lastResult) + 1;

    // reformat SWIM {search syntax}
    textBefore = textBefore.replace(`{${text}}`, text);

    var newval = `[[${footnoteNumber}](${link})]`;
    $textarea.val(textBefore + newval + textAfter);
  } 

});
