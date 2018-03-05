(function() {
  'use strict';

  var globals = typeof global === 'undefined' ? self : global;
  if (typeof globals.require === 'function') return;

  var modules = {};
  var cache = {};
  var aliases = {};
  var has = {}.hasOwnProperty;

  var expRe = /^\.\.?(\/|$)/;
  var expand = function(root, name) {
    var results = [], part;
    var parts = (expRe.test(name) ? root + '/' + name : name).split('/');
    for (var i = 0, length = parts.length; i < length; i++) {
      part = parts[i];
      if (part === '..') {
        results.pop();
      } else if (part !== '.' && part !== '') {
        results.push(part);
      }
    }
    return results.join('/');
  };

  var dirname = function(path) {
    return path.split('/').slice(0, -1).join('/');
  };

  var localRequire = function(path) {
    return function expanded(name) {
      var absolute = expand(dirname(path), name);
      return globals.require(absolute, path);
    };
  };

  var initModule = function(name, definition) {
    var hot = hmr && hmr.createHot(name);
    var module = {id: name, exports: {}, hot: hot};
    cache[name] = module;
    definition(module.exports, localRequire(name), module);
    return module.exports;
  };

  var expandAlias = function(name) {
    return aliases[name] ? expandAlias(aliases[name]) : name;
  };

  var _resolve = function(name, dep) {
    return expandAlias(expand(dirname(name), dep));
  };

  var require = function(name, loaderPath) {
    if (loaderPath == null) loaderPath = '/';
    var path = expandAlias(name);

    if (has.call(cache, path)) return cache[path].exports;
    if (has.call(modules, path)) return initModule(path, modules[path]);

    throw new Error("Cannot find module '" + name + "' from '" + loaderPath + "'");
  };

  require.alias = function(from, to) {
    aliases[to] = from;
  };

  var extRe = /\.[^.\/]+$/;
  var indexRe = /\/index(\.[^\/]+)?$/;
  var addExtensions = function(bundle) {
    if (extRe.test(bundle)) {
      var alias = bundle.replace(extRe, '');
      if (!has.call(aliases, alias) || aliases[alias].replace(extRe, '') === alias + '/index') {
        aliases[alias] = bundle;
      }
    }

    if (indexRe.test(bundle)) {
      var iAlias = bundle.replace(indexRe, '');
      if (!has.call(aliases, iAlias)) {
        aliases[iAlias] = bundle;
      }
    }
  };

  require.register = require.define = function(bundle, fn) {
    if (bundle && typeof bundle === 'object') {
      for (var key in bundle) {
        if (has.call(bundle, key)) {
          require.register(key, bundle[key]);
        }
      }
    } else {
      modules[bundle] = fn;
      delete cache[bundle];
      addExtensions(bundle);
    }
  };

  require.list = function() {
    var list = [];
    for (var item in modules) {
      if (has.call(modules, item)) {
        list.push(item);
      }
    }
    return list;
  };

  var hmr = globals._hmr && new globals._hmr(_resolve, require, modules, cache);
  require._cache = cache;
  require.hmr = hmr && hmr.wrap;
  require.brunch = true;
  globals.require = require;
})();

(function() {
var global = typeof window === 'undefined' ? this : window;
var process;
var __makeRelativeRequire = function(require, mappings, pref) {
  var none = {};
  var tryReq = function(name, pref) {
    var val;
    try {
      val = require(pref + '/node_modules/' + name);
      return val;
    } catch (e) {
      if (e.toString().indexOf('Cannot find module') === -1) {
        throw e;
      }

      if (pref.indexOf('node_modules') !== -1) {
        var s = pref.split('/');
        var i = s.lastIndexOf('node_modules');
        var newPref = s.slice(0, i).join('/');
        return tryReq(name, newPref);
      }
    }
    return none;
  };
  return function(name) {
    if (name in mappings) name = mappings[name];
    if (!name) return;
    if (name[0] !== '.' && pref) {
      var val = tryReq(name, pref);
      if (val !== none) return val;
    }
    return require(name);
  }
};
require.register("components/Process.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Process = function (_React$Component) {
  _inherits(Process, _React$Component);

  function Process(props) {
    _classCallCheck(this, Process);

    var _this = _possibleConstructorReturn(this, (Process.__proto__ || Object.getPrototypeOf(Process)).call(this, props));

    _this.deleteProcess = _this.deleteProcess.bind(_this);
    return _this;
  }

  _createClass(Process, [{
    key: "deleteProcess",
    value: function deleteProcess(event) {
      this.props.onDeleteProcess(this.props.id);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "tr",
        null,
        _react2.default.createElement(
          "td",
          null,
          this.props.name
        ),
        _react2.default.createElement(
          "td",
          null,
          this.props.priority
        ),
        _react2.default.createElement(
          "td",
          null,
          this.props.quantum
        ),
        _react2.default.createElement(
          "td",
          null,
          _react2.default.createElement(
            "button",
            { type: "button", className: "btn btn-danger btn-sm", onClick: this.deleteProcess },
            "x"
          )
        )
      );
    }
  }]);

  return Process;
}(_react2.default.Component);

exports.default = Process;
});

;require.register("components/ProcessAbstApp.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ProcessList = require('./ProcessList');

var _ProcessList2 = _interopRequireDefault(_ProcessList);

var _ProcessorList = require('./ProcessorList');

var _ProcessorList2 = _interopRequireDefault(_ProcessorList);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProcessAbstApp = function (_React$Component) {
  _inherits(ProcessAbstApp, _React$Component);

  function ProcessAbstApp(props) {
    _classCallCheck(this, ProcessAbstApp);

    var _this = _possibleConstructorReturn(this, (ProcessAbstApp.__proto__ || Object.getPrototypeOf(ProcessAbstApp)).call(this, props));

    _this.state = {
      processes: [],
      processors: [],
      ready: [],
      running: [],
      blocked: [],
      count: 0,
      countProcessor: 0,
      name: "",
      nameProcessor: "",
      scheduling: "priority", // priority or round-robin
      priority: 1,
      quantum: 1,
      quantumProcessor: 1
    };

    _this.handlePriorityChange = _this.handlePriorityChange.bind(_this);
    _this.handleQuantumChange = _this.handleQuantumChange.bind(_this);
    _this.handleQuantumProcessorChange = _this.handleQuantumProcessorChange.bind(_this);
    _this.handleAddProcess = _this.handleAddProcess.bind(_this);
    _this.handleAddProcessor = _this.handleAddProcessor.bind(_this);
    _this.handleDeleteProcess = _this.handleDeleteProcess.bind(_this);
    _this.handleDeleteProcessor = _this.handleDeleteProcessor.bind(_this);
    _this.handleStartProcessing = _this.handleStartProcessing.bind(_this);
    return _this;
  }

  _createClass(ProcessAbstApp, [{
    key: 'handlePriorityChange',
    value: function handlePriorityChange(event) {
      this.setState({
        priority: event.target.value
      });
    }
  }, {
    key: 'handleQuantumChange',
    value: function handleQuantumChange(event) {
      this.setState({
        quantum: event.target.value
      });
    }
  }, {
    key: 'handleQuantumProcessorChange',
    value: function handleQuantumProcessorChange(event) {
      this.setState({
        quantumProcessor: event.target.value
      });
    }
  }, {
    key: 'handleAddProcess',
    value: function handleAddProcess(event) {
      var _this2 = this;

      event.preventDefault();

      var newProcess = {
        id: Date.now(),
        name: 'P' + (this.state.count + 1),
        priority: this.state.priority,
        quantum: this.state.quantum
      };

      this.setState(function (prevState) {
        return {
          processes: prevState.processes.concat(newProcess),
          count: _this2.state.count + 1,
          name: "",
          priority: 1,
          quantum: 1
        };
      });
    }
  }, {
    key: 'handleAddProcessor',
    value: function handleAddProcessor(event) {
      var _this3 = this;

      event.preventDefault();

      var newProcessor = {
        id: Date.now(),
        name: 'N' + (this.state.countProcessor + 1),
        quantum: this.state.quantumProcessor
      };

      this.setState(function (prevState) {
        return {
          processors: prevState.processors.concat(newProcessor),
          countProcessor: _this3.state.countProcessor + 1,
          nameProcessor: "",
          quantumProcessor: 1
        };
      });
    }
  }, {
    key: 'handleDeleteProcess',
    value: function handleDeleteProcess(processId) {
      var updatedProcesses = this.state.processes.filter(function (process) {
        return process.id !== processId;
      });

      this.setState({
        processes: [].concat(updatedProcesses)
      });
    }
  }, {
    key: 'handleDeleteProcessor',
    value: function handleDeleteProcessor(processorId) {
      var updatedProcessors = this.state.processors.filter(function (processor) {
        return processor.id !== processorId;
      });

      this.setState({
        processors: [].concat(updatedProcessors)
      });
    }
  }, {
    key: 'handleStartProcessing',
    value: function handleStartProcessing() {}
  }, {
    key: 'render',
    value: function render() {
      return _react2.default.createElement(
        'div',
        { className: 'p-2' },
        _react2.default.createElement(
          'h3',
          { className: 'apptitle text-center' },
          'Abstra\xE7\xE3o de processador'
        ),
        _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'form',
            { className: 'col-6' },
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'h4',
                null,
                'Processos'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'priority' },
                'Prioridade (1- Baixa, 10- Alta)'
              ),
              _react2.default.createElement('input', { type: 'number', id: 'priority', className: 'form-control', min: '1', max: '10', onChange: this.handlePriorityChange, value: this.state.priority })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'quantum' },
                'Quantum'
              ),
              _react2.default.createElement('input', { type: 'number', id: 'quantum', className: 'form-control', min: '1', max: '50', onChange: this.handleQuantumChange, value: this.state.quantum })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary', onClick: this.handleAddProcess },
                "Add processo #" + (this.state.processes.length + 1)
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-6' },
            _react2.default.createElement(_ProcessList2.default, { processes: this.state.processes, onDeleteProcess: this.handleDeleteProcess })
          )
        ),
        this.state.processes.length > 0 && _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'form',
            { className: 'col-6' },
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'h4',
                null,
                'Processadores'
              )
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'label',
                { htmlFor: 'quantumProcessor' },
                'Quantum'
              ),
              _react2.default.createElement('input', { type: 'number', id: 'quantumProcessor', className: 'form-control', min: '1', max: '50', onChange: this.handleQuantumProcessorChange, value: this.state.quantumProcessor })
            ),
            _react2.default.createElement(
              'div',
              { className: 'form-group' },
              _react2.default.createElement(
                'button',
                { className: 'btn btn-primary', onClick: this.handleAddProcessor },
                "Add processador #" + (this.state.processors.length + 1)
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-6' },
            _react2.default.createElement(_ProcessorList2.default, { processors: this.state.processors, onDeleteProcessor: this.handleDeleteProcessor })
          )
        ),
        this.state.processes.length > 0 && this.state.processors.length > 0 && _react2.default.createElement(
          'div',
          { className: 'row' },
          _react2.default.createElement(
            'form',
            { className: 'col-12 text-center form-inline' },
            _react2.default.createElement(
              'select',
              { value: this.state.scheduling, onChange: this.handleSchedulingChange },
              _react2.default.createElement(
                'option',
                { value: 'priority' },
                'Prioridade'
              ),
              _react2.default.createElement(
                'option',
                { value: 'round-robin' },
                'Round Robin'
              )
            )
          ),
          _react2.default.createElement(
            'div',
            { className: 'col-12 text-center' },
            _react2.default.createElement(
              'button',
              { className: 'btn btn-success btn-lg btn-block', onClick: this.handle },
              'Iniciar processamento'
            )
          )
        )
      );
    }
  }]);

  return ProcessAbstApp;
}(_react2.default.Component);

exports.default = ProcessAbstApp;
});

;require.register("components/ProcessList.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Process = require('./Process');

var _Process2 = _interopRequireDefault(_Process);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProcessList = function (_React$Component) {
  _inherits(ProcessList, _React$Component);

  function ProcessList() {
    _classCallCheck(this, ProcessList);

    return _possibleConstructorReturn(this, (ProcessList.__proto__ || Object.getPrototypeOf(ProcessList)).apply(this, arguments));
  }

  _createClass(ProcessList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var processes = this.props.processes;
      return _react2.default.createElement(
        'table',
        { className: 'table table-hover' },
        processes.length > 0 && _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              null,
              'Nome'
            ),
            _react2.default.createElement(
              'th',
              null,
              'Prioridade'
            ),
            _react2.default.createElement(
              'th',
              null,
              'Quantum'
            ),
            _react2.default.createElement(
              'th',
              null,
              'Excluir'
            )
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          processes.map(function (process) {
            return _react2.default.createElement(_Process2.default, { key: process.id, id: process.id, name: process.name, priority: process.priority, quantum: process.quantum, onDeleteProcess: _this2.props.onDeleteProcess });
          })
        )
      );
    }
  }]);

  return ProcessList;
}(_react2.default.Component);

exports.default = ProcessList;
});

;require.register("components/Processor.jsx", function(exports, require, module) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require("react");

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Processor = function (_React$Component) {
  _inherits(Processor, _React$Component);

  function Processor(props) {
    _classCallCheck(this, Processor);

    var _this = _possibleConstructorReturn(this, (Processor.__proto__ || Object.getPrototypeOf(Processor)).call(this, props));

    _this.deleteProcessor = _this.deleteProcessor.bind(_this);
    return _this;
  }

  _createClass(Processor, [{
    key: "deleteProcessor",
    value: function deleteProcessor(event) {
      this.props.onDeleteProcessor(this.props.id);
    }
  }, {
    key: "render",
    value: function render() {
      return _react2.default.createElement(
        "tr",
        null,
        _react2.default.createElement(
          "td",
          null,
          this.props.name
        ),
        _react2.default.createElement(
          "td",
          null,
          this.props.quantum
        ),
        _react2.default.createElement(
          "td",
          null,
          _react2.default.createElement(
            "button",
            { type: "button", className: "btn btn-danger btn-sm", onClick: this.deleteProcessor },
            "x"
          )
        )
      );
    }
  }]);

  return Processor;
}(_react2.default.Component);

exports.default = Processor;
});

;require.register("components/ProcessorList.jsx", function(exports, require, module) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Processor = require('./Processor');

var _Processor2 = _interopRequireDefault(_Processor);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ProcessorList = function (_React$Component) {
  _inherits(ProcessorList, _React$Component);

  function ProcessorList() {
    _classCallCheck(this, ProcessorList);

    return _possibleConstructorReturn(this, (ProcessorList.__proto__ || Object.getPrototypeOf(ProcessorList)).apply(this, arguments));
  }

  _createClass(ProcessorList, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var processors = this.props.processors;
      return _react2.default.createElement(
        'table',
        { className: 'table table-hover' },
        processors.length > 0 && _react2.default.createElement(
          'thead',
          null,
          _react2.default.createElement(
            'tr',
            null,
            _react2.default.createElement(
              'th',
              { className: 'col-6' },
              'Nome'
            ),
            _react2.default.createElement(
              'th',
              null,
              'Quantum'
            ),
            _react2.default.createElement(
              'th',
              null,
              'Excluir'
            )
          )
        ),
        _react2.default.createElement(
          'tbody',
          null,
          processors.map(function (processor) {
            return _react2.default.createElement(_Processor2.default, { key: processor.id, id: processor.id, name: processor.name, quantum: processor.quantum, onDeleteProcessor: _this2.props.onDeleteProcessor });
          })
        )
      );
    }
  }]);

  return ProcessorList;
}(_react2.default.Component);

exports.default = ProcessorList;
});

;require.register("initialize.js", function(exports, require, module) {
'use strict';

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _ProcessAbstApp = require('components/ProcessAbstApp');

var _ProcessAbstApp2 = _interopRequireDefault(_ProcessAbstApp);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

document.addEventListener('DOMContentLoaded', function () {
  _reactDom2.default.render(_react2.default.createElement(_ProcessAbstApp2.default, null), document.getElementById('app'));
});
});

require.alias("process/browser.js", "process");process = require('process');require.register("___globals___", function(exports, require, module) {
  
});})();require('___globals___');


//# sourceMappingURL=app.js.map