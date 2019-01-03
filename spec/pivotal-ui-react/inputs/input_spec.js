import '../spec_helper';
import {Input} from '../../../src/react/inputs';

describe('Input', () => {
  let subject;

  beforeEach(() => {
    subject = ReactDOM.render(<Input />, root);
  });

  it('renders an HTML input', () => {
    expect('input').toExist();
  });

  describe('when given props', () => {
    beforeEach(() => {
      setProps(subject, {
        type: 'password',
        className: 'some-class'
      });
    });

    it('passes the props to the HTML input', () => {
      expect('input').toHaveAttr('type', 'password');
      expect('input').toHaveClass('some-class');
    });
  });

  describe('size = sm', () => {
    beforeEach(() => {
      setProps(subject, {size: 'sm'});
    });

    it('has the input-sm class', () => {
      expect('input').toHaveClass('input-sm');
    });
  });

  describe('size = small', () => {
    beforeEach(() => {
      setProps(subject, {size: 'small'});
    });

    it('has the input-sm class', () => {
      expect('input').toHaveClass('input-sm');
    });
  });

  describe('size = lg', () => {
    beforeEach(() => {
      setProps(subject, {size: 'lg'});
    });

    it('has the input-lg class', () => {
      expect('input').toHaveClass('input-lg');
    });
  });

  describe('size = large', () => {
    beforeEach(() => {
      setProps(subject, {size: 'large'});
    });

    it('has the input-lg class', () => {
      expect('input').toHaveClass('input-lg');
    });
  });

  describe('icon', () => {
    beforeEach(() => {
      setProps(subject, {icon: 'search'});
    });

    it('renders an input-icon-container', () => {
      expect('.input-icon-container').toExist();
    });

    it('renders an icon', () => {
      expect('.input-icon-container > .icon svg').toHaveClass('icon-search');
    });

    it('renders an input', () => {
      expect('.input-icon-container > input').toExist();
    });
  });
});