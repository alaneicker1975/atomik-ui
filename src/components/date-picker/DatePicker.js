import React, { useState, useEffect, useRef } from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Calendar from 'react-calendar';
import moment from 'moment';
import createFocusTrap from 'focus-trap';
import FormField from '../form-field';
import Button from '../button';

const DatePicker = ({
  classes,
  disabled,
  onChange,
  onDateChange,
  value,
  ...props
}) => {
  const calendar = useRef();
  const [focusTrap, setFocusTrap] = useState(null);
  const [originalValue, setOriginalValue] = useState(value);
  const [theValue, setTheValue] = useState(value);
  const [isOpen, setIsOpen] = useState(false);

  const handleDateChange = (details) => {
    const date = moment(details).format('MM/DD/YYYY');
    setTheValue(date);
  };

  const handleCalendarSubmit = () => {
    setOriginalValue(theValue);
    onChange(theValue);
    setIsOpen(false);
  };

  const handleCalendarCancel = () => {
    cancel();
  };

  const handleKeyDown = (e) => {
    e.keyCode === 27 && cancel();
  };

  const cancel = () => {
    setTheValue(originalValue);
    setIsOpen(false);
  };

  useEffect(() => {
    setFocusTrap(
      createFocusTrap(calendar.current, {
        allowOutsideClick: false,
        clickOutsideDeactivates: false,
        escapeDeactivates: true,
        fallbackFocus: calendar,
      }),
    );
  }, [calendar]);

  useEffect(() => {
    if (focusTrap) {
      setTimeout(() => {
        focusTrap[isOpen ? 'activate' : 'deactivate']();
      }, 200);
    }
  }, [focusTrap, isOpen]);

  return (
    <div className={classnames('date-picker', classes)}>
      <div className="date-picker__input">
        <FormField
          onChange={onChange}
          value={theValue}
          disabled={disabled}
          {...props}
        />
        <Button
          classes="date-picker__input__btn"
          variant="hollow"
          size="md"
          onClick={() => setIsOpen(!isOpen)}
          disabled={disabled}
        >
          Select a Date
        </Button>
      </div>
      <div
        ref={calendar}
        className={classnames('date-picker__calendar', {
          'is-open': isOpen,
        })}
        onKeyDown={(e) => handleKeyDown(e)}
      >
        <Calendar
          onChange={(details) => handleDateChange(details)}
          value={theValue ? new Date(theValue) : ''}
        />
        <div className="date-picker__calendar__btns">
          <Button size="md" onClick={() => handleCalendarCancel()}>
            Cancel
          </Button>
          <Button
            variant="primary"
            size="md"
            onClick={() => handleCalendarSubmit()}
            disabled={theValue === originalValue}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
};

DatePicker.propTypes = {
  /** Adds custom component CSS classes */
  classes: PropTypes.string,
  /** Disables a date picker form field and calandar. */
  disabled: PropTypes.bool,
  /** Triggers callback when date picker input value changes */
  onChange: PropTypes.func,
  /** Triggers callback when calendar date changes */
  onDateChange: PropTypes.func,
  /** The date picker input value. Must be a Date(). */
  value: PropTypes.string,
};

DatePicker.defaultProps = {
  classes: '',
  disabled: false,
  onChange() {},
  onDateChange() {},
  value: '',
};

export default DatePicker;
