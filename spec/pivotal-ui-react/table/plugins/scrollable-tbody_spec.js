import '../../spec_helper';
import {Table} from '../../../../src/react/table';
import {withScrollableTbody} from '../../../../src/react/table/plugins/scrollable-tbody';

describe('withScrollableTbody', () => {
  let data, columns, ComposedTable;

  beforeEach(() => {
    columns = [{
      attribute: 'attr1',
    }];
    data = [{attr1: 'my value'}];
    ComposedTable = withScrollableTbody(Table);
  });

  describe('when "scrollable" prop is falsy', () => {
    beforeEach(() => {
      ReactDOM.render(<ComposedTable {...{
        columns,
        data,
        tbodyHeight: '70vh',
      }}/>, root);
    });

    it('does not apply the "scrollable-body" class to tbody', () => {
      expect('table tbody').not.toHaveClass('scrollable-body');
    });

    it('does not set the height of the tbody with the given prop', () => {
      expect('table tbody').not.toHaveAttr('style', 'height: 70vh;');
    });
  });

  describe('when "scrollable" prop is true', () => {
    beforeEach(() => {
      ReactDOM.render(<ComposedTable {...{
        columns,
        data,
        tbodyHeight: '70vh',
        scrollable: true
      }}/>, root);
    });

    it('applies the "scrollable-body" class to tbody', () => {
      expect('table tbody').toHaveClass('scrollable-body');
    });

    it('sets the height of the tbody with the given prop', () => {
      expect('table tbody').toHaveAttr('style', 'height: 70vh;');
    });
  });
});