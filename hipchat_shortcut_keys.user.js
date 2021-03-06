// ==UserScript==
// @name        hipchat_shortcut_keys
// @namespace   http://uberweiss.org
// @description Adds some extra shortcut keys (command-w, command-1 through command-9, etc.) to the HipChat web interface.
// @include     *
// @author      Justin Weiss
// ==/UserScript==

var HipChatHelper = {
  in_lobby: function() {
    $('#tabs li.selected').attr('name') != 'tab_lobby';
  },
  close_current_tab: function() {
    chat.close_chat($('#tabs li.selected').attr('jid'));
  },
  select_tab_by_position: function(pos) {
    var tabs = $('#tabs li');
    if (pos > tabs.length) {
      pos = tabs.length;
    }
    var jid = $(tabs[pos - 1]).attr('jid');
    chat.focus_chat(jid);
  }
};

(function () {
  if (window.fluid) {
    $('li a.download').hide();
    var bind_elems = [$(document), $('#message_input')];
    for(i in bind_elems) {
      elem = bind_elems[i];
      elem.bind('keydown', function(e) {

        // Cmd-W closes the current tab if it can be closed
        if (e.metaKey && String.fromCharCode(e.which).toLowerCase() == 'w') {
          if (!HipChatHelper.in_lobby()) {
            HipChatHelper.close_current_tab();
            e.preventDefault();
            e.stopPropagation();
          }
        } else if (e.metaKey && String.fromCharCode(e.which).toLowerCase() > '0' && String.fromCharCode(e.which).toLowerCase() <= '9') {
          // Cmd-(1-9) switch to the window at position 1 through 9
          HipChatHelper.select_tab_by_position(String.fromCharCode(e.which).toLowerCase());
          e.stopPropagation();
        } else if (e.metaKey && e.shiftKey && e.which == 219) {
          // Cmd-{} moves to the previous or next tab
          chat.show_prev_tab();
          e.stopPropagation();
        } else if (e.metaKey && e.shiftKey && e.which == 221) {
          chat.show_next_tab();
          e.stopPropagation();
        }
      });
    }
  }
})();
