/** @jsx React.DOM */

var React = require('react');

var BannersCollection = [
   {
	    "id": 0,
	    "name": "English Banner",
	    "width": 1000,
	    "height": 1000,
	    "cssClass": "a0-banner-default square"
	  },
	   {
	    "id": 1,
	    "name": "Spain Banner",
	    "width": 1000,
	    "height": 1000,
	    "cssClass": "a0-banner-spain square"
	  },
	 {
	    "id": 2,
	    "name": "France Banner",
	    "width": 1000,
	    "height": 1000,
	    "cssClass": "a0-banner-france square"
	  },
	   {
	    "id": 3,
	    "name": "Brazil Banner",
	    "width": 1000,
	    "height": 1000,
	    "cssClass": "a0-banner-brazil square"
	  },
	   {
	    "id": 4,
	    "name": "Portugal Banner",
	    "width": 1000,
	    "height": 1000,
	    "cssClass": "a0-banner-portugal square"
	  },
];

var ContentEditable = React.createClass({
  render: function(){
    return <div
      className={this.props.className}
      ref={this.props.ref}
      onInput={this.emitChange}
      onBlur={this.emitChange}
      contentEditable
      spellCheck="false"
      dangerouslySetInnerHTML={{__html: this.props.html}}></div>;
  },
  shouldComponentUpdate: function(nextProps){
    return nextProps.html !== this.getDOMNode().innerHTML;
  },
  componentDidUpdate: function() {
    if (this.props.html !== this.getDOMNode().innerHTML) {
      this.getDOMNode().innerHTML = this.props.html;
    }
  },
  emitChange: function(){
    var html = this.getDOMNode().innerHTML;

    if (this.props.onChange && html !== this.lastHtml) {
      this.props.onChange({
        target: {
          value: html,
          name: this.props.ref
        }
      });
    }

    this.lastHtml = html;
  }
});

var Banner = React.createClass({
  getInitialState: function() {
    var config = this.props.config;

  
  },
  getStyles: function(x) {
    var props = this.props;

    return {
      width: props.config.width * x,
      height: props.config.height * x
    }
  },
  handleChange: function(event) {
    var state = {};

    state[event.target.name] = event.target.value;

    this.setState(state);
    this.props.updateDownload();
  },
   },
	  render: function () {
	    return (
	      React.DOM.div({className: "stage"}, 
	        React.DOM.div({style: this.getStyles(1), className: this.props.config.cssClass + ' a0-banner-base'}, 
	          React.DOM.div({className: "center"}, 
	         
	          
	          )
	        ), 
	        React.DOM.div({className: "clone-wrapper"}, 
	          React.DOM.div({ref: "clone", style: this.getStyles(2), className: this.props.config.cssClass + ' a0-banner-base clone'}, 
	            React.DOM.div({
	              spellCheck: "false", 
	              className: "copy", 
	              dangerouslySetInnerHTML: {__html: this.state.copy}}), 

	         
	          
  }
});

var Index = React.createClass({
  getInitialState: function() {
    return {
      banner: '',
      bannerTemplate: BannersCollection[0]
    }
  },
  componentDidMount: function() {
    this.generateURI();
  },
  generateURI: function() {
    var c = this;
    var button = c.refs.downloadButton.getDOMNode();
    var bannerComponent = c.refs.editedBanner;

    html2canvas(bannerComponent.refs.clone.getDOMNode(), {
      onrendered: function(canvas) {
        var img = canvas.toDataURL("image/png");

        c.setState({
          banner: img
        });
      }
    });
  },
  handleTemplateChange: function(event) {
    var val = event.target.value;

    this.setState({
      bannerTemplate: BannersCollection[val]
    });

    this.generateURI();
  },
  render: function () {
    var c = this;
    var template = c.state.bannerTemplate;

    var size = {
      w: template.width,
      h: template.height
    };

    var templateItem = function(item) {
      return <option key={item.id} value={item.id}>{item.name} ({item.width}x{item.height})</option>;
    };

    return (
      <div className="index">
        <p>
          <h2>Choose a Banner</h2>
          <select onChange={this.handleTemplateChange} value={c.state.bannerTemplate.id}>
            {BannersCollection.map(templateItem)}
          </select>
        </p>
        <Banner ref="editedBanner" config={template} updateDownload={this.generateURI} />
        <a href={this.state.banner} ref="downloadButton" download={'banner-' + size.w + 'x' + size.h + '.png'} className="btn btn-success btn-lg">Download</span></a>
      </div>
    );
  }
});
React.renderComponent(
    <Index /> , document.querySelector('.appl'));
