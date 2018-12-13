import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { initialMockData, oneBookinWishList } from './__mock__/mockTestData';

Enzyme.configure({adapter: new Adapter()});

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it('should clear wish list when clicking on the clear button', () => {
  const wrapper = shallow(<App />);
  const clearButton = wrapper.find('button').at(0);

  wrapper.setState({books: oneBookinWishList})
  clearButton.simulate('click');

  expect(wrapper.state().books.columns['column-2'].bookIds.length).toEqual(0);
})

describe('add/remove wish list', () => {
  const wrapper = shallow(<App />);
  const instance = wrapper.instance();

  wrapper.setState({books: initialMockData})

  it('should add a book to wish list', () => {
    instance.listUpdate('column-1', 'one', 0);
    expect(wrapper.state().books.columns['column-2'].bookIds.length).toEqual(1);
  })
  
  it('should delete a book from wish list', () => {
    instance.listUpdate('column-2', 'one', 0)
    expect(wrapper.state().books.columns['column-2'].bookIds.length).toEqual(0);
  })
})
