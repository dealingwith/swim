var TextareaView = Backbone.View.extend({

  el: '.main-textarea',

  events: {
    'keyup'  :'keyupEventHandler',
    // 'keydown':'keydownEventHandler'
  },

  keyupEventHandler: function(e) {
    // start search by closing }
    if (e.key == '}')
      this.processSearch();
  },

  // keydownEventHandler: function(e) {
  //   // support tab to start search
  //   if (e.keyCode == 9) {
  //     console.log('tab pressed');
  //     e.preventDefault();
  //     this.insertAtCursor('}');
  //     this.processSearch();
  //   }
  // },

  processSearch: function() {
    var text = this.$el.val();
    console.log(text);
    var re = /\{([\d\D\w\W\s\S]*?)\}/g; //capture everything between brackets
    var results;
    var lastResult;
    while ((results = re.exec(text)) !== null) {
      lastResult = results[1];
    }
    console.log(lastResult);
    if (lastResult)
      doSearch(lastResult); // global func
  },

  // insertAtCursor: function(value) {
  //   console.log('insertAtCursor', value);
  //   if (document.selection) {
  //     //IE support
  //     this.$el.focus();
  //     sel = document.selection.createRange();
  //     sel.text = value;
  //   } else if (this.$el.selectionStart || this.$el.selectionStart == '0') {
  //     var startPos = this.$el.selectionStart;
  //     var endPos = this.$el.selectionEnd;
  //     this.$el.value = this.$el.value.substring(0, startPos)
  //         + value
  //         + this.$el.value.substring(endPos, this.$el.value.length);
  //     this.$el.selectionStart = startPos + value.length;
  //     this.$el.selectionEnd = startPos + value.length;
  //   } else {
  //     this.$el.value += value;
  //   }
  // },

});
