import React, {Component} from 'react';
import HtmlCodeArea from './HtmlCodeArea';
import JsCodeArea from './JsCodeArea';

const customRenderLanguages = ['language-js', 'language-jsx', 'language-html'];

export default (file, name) => class extends Component {
  render() {
    const {className = '', children} = this.props.children[0].props;
    const matches = className.match(/language-js|language-jsx|language-html/) || [];

    const lang = matches[0];

    let props;

    if (customRenderLanguages.includes(lang)) {
      const rawContent = children[0];

      const lines = rawContent.split('\n');
      let title = '';

      if (lines[0].includes('::title=')) {
        title = lines[0];
        lines.splice(0, 1);
        title = title.replace('::title=', '');
      }

      const code = lines.join('\n');

      props = {title, code, file, name};
    }

    switch (lang) {
      case 'language-js':
      case 'language-jsx':
        return <JsCodeArea {...props}/>;
      case 'language-html':
        return <HtmlCodeArea {...props}/>;
      default:
        return <pre {...this.props}/>;
    }
  }
};