import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import { mount, configure } from 'enzyme';
import FormGenerator from './FormGenerator';

configure({ adapter: new Adapter() });

describe('<FormGenerator />', () => {
  const fields = [
    [
      {
        component: 'FormField',
        colProps: { sm: 12, md: 6, lg: 6 },
        name: 'firstName',
        label: 'First Name',
        onChange: (e) => console.log(e.target.value),
      },
    ],
    [
      {
        component: 'Button',
        theme: 'primary',
        children: 'Submit',
        className: 'margin-top-8',
      },
    ],
  ];

  let formGenerator;

  beforeEach(() => {
    formGenerator = mount(<FormGenerator fieldsets={fields} rowSpacing="8" />);
  });

  it('Should render without errors', () => {
    expect(formGenerator).toBeTruthy();
  });

  it('Should render a input and a button', () => {
    expect(formGenerator.find('input')).toBeTruthy();
    expect(formGenerator.find('button')).toBeTruthy();
  });
});
