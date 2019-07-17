(function(sensors){

  /**
   * 查询元素是否匹配CSS选择器
   */
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

  /**
   * 触发一个元素的 change 事件
   */
  sensors.triggerChangeEvent = function(element) {
    if (document.createEvent && element.dispatchEvent) {
      var evt = document.createEvent("HTMLEvents");
      evt.initEvent("change", true, true);
      element.dispatchEvent(evt);
    } else if (element.fireEvent) {
      element.fireEvent("onchange");
    }
  };

  // 备用方案a. 使用定时器监听输入框变化
  // 浏览器兼容性好但可能影响页面性能，不建议使用
  sensors._addInputTimer = function(changeInputs) {
    setInterval(function() {
      changeInputs.forEach(function(input) {
        if (input.dataset.previous_value !== input.value) {
          sensors.trackChangeInput(input);
          input.dataset.previous_value = input.value;
        }
      });
    }, 50);
  };

  // 备用方案b. 修改 HTMLInputElement 的 setter
  // 不会影响页面性能但可能存在浏览器兼容性问题，不建议使用
  sensors._hookInputSetter = function(changeInputs) {
    var descriptor = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value");
    var inputSetter = descriptor.set;

    //Then modify the "setter" of the value to notify when the value is changed:
    descriptor.set = function(val) {
      //changing to native setter to prevent the loop while setting the value
      Object.defineProperty(this, "value", {set:inputSetter});
      this.value = val;

      //Custom code triggered when $input.value is set
      sensors.trackChangeInput(this);

      //changing back to custom setter
      Object.defineProperty(this, "value", descriptor);
    };
    changeInputs.forEach(function(input) {
      //Last add the new "value" descriptor to the input element
      Object.defineProperty(input, "value", descriptor);
    });
  };

  /**
   * 向神策后台发送input的方法，data-customlabel="input-change"] 手动发送数据时需要调用此方法。
   */
  sensors.trackChangeInput = function(input) {
    var target = input;
    var targetTag = target.tagName.toLowerCase();
    if (targetTag === 'input' && sensors.matches(target, sensors.para.changeInputSelectorArr.join(', '))) {
      var requestData = {
        input_box_name: target.name,
        end_time: (new Date()).valueOf(),
        previous_value: target.dataset.previous_value,
        after_value: target.value,
        whether_to_paste: false,
        delete_or_not: false
      };

      sensors.track('Input_box_out_of_focus', requestData);
      target.dataset.previous_value = target.value;
    }
  };

  /**
   * 为输入框绑定事件监听器
   */
  sensors._addInputEvents = function() {

    var solutions = ['manual', 'timer', 'inputsetter'];
    var currentSolution = solutions[0];

    var changeInputs = document.querySelectorAll(sensors.para.changeInputSelectorArr.join(', '));
    changeInputs.forEach(function(input) {
      input.dataset.previous_value = input.defaultValue;
    });

    if (sensors.para.inputObserverSolution && solutions.indexOf(sensors.para.inputObserverSolution) > -1) {
      currentSolution = sensors.para.inputObserverSolution;
    }

    switch (currentSolution) {
      case 'timer':
        sensors._addInputTimer(changeInputs);
        break;
      case 'inputsetter':
        sensors._hookInputSetter(changeInputs);
        break;
      default:
        break;
    }

    document.body.addEventListener('focusin', function(event) {
      var target = event.target;
      if (target.tagName.toLowerCase() === 'input' && sensors.matches(target, sensors.para.normalInputSelectorArr.join(', '))) {
        target.dataset.focus_time = (new Date()).valueOf();
        target.dataset.focus_value = target.value;
      }
    });

    // 普通input失去焦点时
    document.body.addEventListener('focusout', function(event) {
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
        sensors.track('Input_box_out_of_focus', requestData);
      }
    });
  };

  // 如果有相关配置项，绑定事件监听器
  if (sensors.para.normalInputSelectorArr && sensors.para.changeInputSelectorArr) {
    sensors._addInputEvents();
  }

})(sensors);