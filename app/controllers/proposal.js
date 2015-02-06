import Ember from 'ember';

export default Ember.ObjectController.extend({
  needs: ['application'],
  isAdmin: Ember.computed.alias('controllers.application.isAdmin'),
  isOpen: function() {
    return (this.get("model").get("state") === "open")
  }.property("state"),
  canApprove: function() {
    return this.get("isAdmin") && this.get("isOpen");
  }.property("isOpen", "isAdmin"),
  actions: {
    approveProposal: function() {
      var model = this.get("model")
      var _this = this;
      var task = this.get('content');
      var adapter = this.container.lookup('adapter:application');
      var url = adapter.buildURL('proposal', this.get("model").get('id')) + '/approve';
      adapter.ajax(url, 'PUT')
        .then(function(response) {
          _this.get("model").set("state", "accepted");
        });
    }
  }

});