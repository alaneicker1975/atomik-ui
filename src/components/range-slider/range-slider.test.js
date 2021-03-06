import Adapter from 'enzyme-adapter-react-16';
import React from 'react';
import sinon from 'sinon';
import { mount, configure } from 'enzyme';
import RangeSlider from './RangeSlider';

configure({ adapter: new Adapter() });

describe('<RangeSlider />', () => {
  let rangeSlider;
  let onChangeSpy;

  beforeEach(() => {
    onChangeSpy = sinon.spy();

    rangeSlider = mount(
      <RangeSlider
        label="Select Amount"
        min="100"
        max="1000"
        step="100"
        value="400"
        onChange={onChangeSpy}
        ticks={[
          { text: '$100', val: '100' },
          { text: '$200', val: '200' },
          { text: '$300', val: '300' },
          { text: '$400', val: '400' },
          { text: '$500', val: '500' },
          { text: '$600', val: '600' },
          { text: '$700', val: '700' },
          { text: '$800', val: '800' },
          { text: '$900', val: '900' },
          { text: '$1000', val: '1000' },
        ]}
      />,
    );
  });

  it('Should render 10 ticks', () => {
    expect(rangeSlider.find('[data-test-id="range-slider-tick"]').length).toBe(
      10,
    );
  });

  it('If range slider `is not disabled` ticks should have onClick event', () => {
    expect(
      rangeSlider
        .find('[data-test-id="range-slider-tick"]')
        .first()
        .prop('onFocus'),
    ).toBeDefined();
  });

  it('If range slider `is disabled` ticks should not have onClick event', () => {
    rangeSlider.setProps({ disabled: true });

    expect(
      rangeSlider
        .find('[data-test-id="range-slider-tick"]')
        .first()
        .prop('onFocus'),
    ).toBeUndefined();
  });

  it('Should update the tick label when the value changes', () => {
    rangeSlider
      .find('[data-test-id="range-slider-input"]')
      .simulate('change', { target: { value: '500' } });

    expect(
      rangeSlider
        .find('[data-test-id="range-slider-ticks-label"].is-selected')
        .text(),
    ).toBe('$500');
  });

  it('Should trigger onChange callback when input value changes', () => {
    rangeSlider
      .find('[data-test-id="range-slider-input"]')
      .simulate('change', { target: { value: '900' } });

    expect(onChangeSpy.withArgs('900').called).toBeTruthy();
  });

  it('Should trigger onChange callback when tick label is clicked', () => {
    rangeSlider
      .find('[data-test-id="range-slider-ticks-label"]')
      .first()
      .simulate('focus');

    expect(onChangeSpy.withArgs('100').called).toBeTruthy();
  });

  it('Should handle an error', () => {
    rangeSlider.setProps({
      hasError: true,
      errorText: 'This field is required',
    });

    expect(
      rangeSlider.find('[data-test-id="range-slider"]').hasClass('has-error'),
    ).toBeTruthy();
    expect(rangeSlider.find('Hint')).toBeTruthy();
    expect(rangeSlider.find('Hint').text()).toBe('This field is required');
  });

  it('Should render a hint', () => {
    rangeSlider.setProps({ helpText: 'Some helpful text' });

    expect(rangeSlider.find('Hint')).toBeTruthy();
    expect(rangeSlider.find('Hint').text()).toBe('Some helpful text');
  });
});
