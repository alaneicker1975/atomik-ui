import React, { useState, useRef, forwardRef } from 'react';
import mergeRefs from 'react-merge-refs';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import Hint from '../hint';
import Label from '../label';

const RangeSlider = forwardRef(
  (
    {
      className,
      defaultValue,
      disabled,
      errorText,
      hasError,
      helpText,
      hideLabelsOnMobile,
      id,
      label,
      max,
      min,
      name,
      onChange,
      required,
      step,
      ticks,
      value,
      ...others
    },
    ref,
  ) => {
    const sliderRef = useRef();
    const [rangeValue, setRangeValue] = useState(value || defaultValue);

    const uid = id || shortid.generate();
    const inputName = name || uid;
    const inputHintId = `${inputName}_hint`;
    const inputErrorId = `${inputName}_error`;

    const handleChange = (updateValue) => {
      setRangeValue(updateValue);
      onChange(updateValue);
      sliderRef.current.focus();
    };

    const handleTickClick = (val) => {
      return handleChange(val);
    };

    return (
      <>
        {label && <Label htmlFor={uid}>{label}</Label>}
        <div
          className={classnames('atomikui-range-slider', className, {
            'has-error': hasError,
            'is-disabled': disabled,
          })}
        >
          <input
            ref={mergeRefs([sliderRef, ref])}
            id={uid}
            aria-valuemin={min}
            aria-valuemax={max}
            aria-valuetext={`$${rangeValue}`}
            aria-describedby={`${inputErrorId} ${inputHintId}`}
            min={min}
            max={max}
            step={step}
            {...(value && { value: rangeValue })}
            {...(defaultValue && !value && { defaultValue: rangeValue })}
            type="range"
            onChange={(e) => {
              return handleChange(e.target.value);
            }}
            required={required}
            disabled={disabled}
            {...others}
          />
          {ticks && (
            <div className="atomikui-range-slider__ticks" aria-hidden="true">
              {ticks.map(({ text, val }) => {
                return (
                  <div
                    role="button"
                    key={shortid.generate()}
                    className="atomikui-range-slider__ticks__tick"
                    tabIndex="0"
                    {...(!disabled && {
                      onKeyUp: () => {
                        return handleTickClick(val);
                      },
                      onClick: () => {
                        return handleTickClick(val);
                      },
                    })}
                  >
                    <div
                      className={classnames(
                        'atomikui-range-slider__ticks__label',
                        {
                          'is-selected': val === rangeValue,
                          'is-hidden-on-mobile': hideLabelsOnMobile,
                        },
                      )}
                    >
                      {text}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        {(helpText || errorText) && (
          <div className="margin-top-2">
            {helpText && <Hint id={inputHintId}>{helpText}</Hint>}
            {hasError && (
              <Hint id={inputErrorId} type="error">
                {errorText}
              </Hint>
            )}
          </div>
        )}
      </>
    );
  },
);

RangeSlider.propTypes = {
  /** Specifies custom component classes. */
  className: PropTypes.string,
  /** Sets the defaultValue for uncontrolled range slider */
  defaultValue: PropTypes.string,
  /** Specifies range slider disabled state. */
  disabled: PropTypes.bool,
  /** Text to be displayed when there is an error. */
  errorText: PropTypes.string,
  /** Specifies the error state. */
  hasError: PropTypes.bool,
  /** Assistive text to be displayed with form field. */
  helpText: PropTypes.string,
  /** hides slider tick labels on mobile. */
  hideLabelsOnMobile: PropTypes.bool,
  /** A unique id. */
  id: PropTypes.string,
  /** Specifies label text. */
  label: PropTypes.string,
  /** Maximum range value. */
  max: PropTypes.string,
  /** Minimum range value. */
  min: PropTypes.string,
  /** Specifies input name attribute. */
  name: PropTypes.string,
  /** onChange callback. */
  onChange: PropTypes.func,
  /** Specifies if a field is required. */
  required: PropTypes.bool,
  /** Step numerical increment. */
  step: PropTypes.string,
  /** Ticks for each step. */
  ticks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string,
      val: PropTypes.string,
    }),
  ),
  /** Specifies the inputs value. */
  value: PropTypes.string,
};

RangeSlider.defaultProps = {
  className: '',
  defaultValue: null,
  disabled: false,
  errorText: '',
  hasError: false,
  helpText: '',
  hideLabelsOnMobile: false,
  id: null,
  label: '',
  max: '',
  min: '',
  name: '',
  onChange() {},
  required: false,
  step: '',
  ticks: [],
  value: '',
};

RangeSlider.displayName = 'RangeSlider';

export default RangeSlider;