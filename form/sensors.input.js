(function(sensors){

  sensors.matches = function(element, selectors) {
    var matchesFunc = Element.prototype.matches ||
      Element.prototype.matchesSelector ||
      Element.prototype.mozMatchesSelector ||
      Element.prototype.msMatchesSelector ||
      Element.prototype.oMatchesSelector ||
      Element.prototype.webkitMatchesSelector ||
      function(s) {
        var matches = (this.document || this.ownerDocument).querySelectorAll(s),
            i = matches.length;
        while (--i >= 0 && matches.item(i) !== this) {}
        return i > -1;
      };
    return matchesFunc.call(element, selectors);
  };

  sensors.triggerChangeEvent = function(element) {
    if (document.createEvent && element.dispatchEvent) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", true, true);
      element.dispatchEvent(evt);
    } else if (element.fireEvent) {
      element.fireEvent("onchange");
    }
  };

  sensors._addInputEvents = function() {

    document.body.addEventListener('focusin', function(event) {
      var target = event.target;
      if (target.tagName.toLowerCase() === 'input' && sensors.matches(target, sensors.para.normalInputSelectorArr.join(', '))) {
        target.dataset.focus_time = (new Date()).valueOf();
        target.dataset.focus_value = target.value;
      }
    });

    // 只读input发生改变时
    document.body.addEventListener('change', function(event) {
      console.log('event', event)
      var target = event.target;
      var targetTag = target.tagName.toLowerCase();
      if (targetTag === 'input' && sensors.matches(target, sensors.para.changeInputSelectorArr.join(', '))) {
        var now = (new Date()).valueOf();
        var requestData = {
          input_box_name: target.name,
          end_time: now,
          previous_value: target.dataset.previous_value || target.defaultValue,
          after_value: target.value,
          whether_to_paste: false,
          delete_or_not: false
        };
        //alert('InputChange:' + JSON.stringify(requestData));

        sensors.track('Input_box_out_of_focus', requestData);
        target.dataset.previous_value = target.value;
      }
    });

    // 普通input失去焦点时
    document.body.addEventListener('focusout', function(event) {

      console.log('event', event)
      var target = event.target;
      var targetTag = target.tagName.toLowerCase();
      if (targetTag === 'input' && sensors.matches(target, sensors.para.normalInputSelectorArr.join(', '))) {
        var now = (new Date()).valueOf();
        var requestData = {
          input_box_name: target.name,
          begin_time: parseInt(target.dataset.focus_time),
          end_time: now,
          $event_duration: now - target.dataset.focus_time,
          previous_value: target.dataset.focus_value,
          after_value: target.value
        };
        //alert('InputBlur:' + JSON.stringify(requestData));
        // 发送自定义事件
        sensors.track('Input_box_out_of_focus', requestData);
      }
    });
  };

  if (sensors.para.normalInputSelectorArr && sensors.para.changeInputSelectorArr) {
    sensors._addInputEvents();
  }

})(sensors);