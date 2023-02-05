import { memo } from 'react';
import { format } from 'date-fns';
import Loader from '../Loader/Loader';
import { useAppContext } from '../../context';
import { useFormEvent } from '../../hooks/useFormEvent';
import styles from './EventForm.module.css';

const EventForm = () => {
  const { modalEvent, isLoading, error } = useAppContext();

  const {
    name,
    setName,
    date,
    setDate,
    start,
    setStart,
    end,
    setEnd,
    description,
    setDescription,
    handleSubmit,
    handleDelete,
  } = useFormEvent(modalEvent);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      {error && <span className={styles.formError}>{error}</span>}
      <label className={styles.label}>
        Event Name:
        <input
          className={styles.input}
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Event Date:
        <input
          className={styles.input}
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Start Time:
        <input
          className={styles.input}
          type="time"
          value={start}
          onChange={e => setStart(e.target.value)}
        />
      </label>

      <label className={styles.label}>
        End Time:
        <input
          className={styles.input}
          type="time"
          value={end}
          onChange={e => setEnd(e.target.value)}
        />
      </label>
      <label className={styles.label}>
        Description:
        <textarea
          className={styles.textarea}
          value={description}
          onChange={e => setDescription(e.target.value)}
        />
      </label>

      {modalEvent && (
        <div className={styles.addidionalInfo}>
          {modalEvent?.updatedAt ? (
            <span>
              Updated at:{' '}
              {`${format(new Date(modalEvent.updatedAt), 'yyyy-MM-dd HH:mm')}`}
            </span>
          ) : (
            <span>
              Created at:{' '}
              {`${format(new Date(modalEvent.createdAt), 'yyyy-MM-dd HH:mm')}`}
            </span>
          )}
        </div>
      )}

      <div className={styles.buttonsContainer}>
        {modalEvent && (
          <button
            className={styles.buttonCancel}
            type="button"
            onClick={() => handleDelete(modalEvent.id)}
          >
            Delete Event
          </button>
        )}
        <button className={styles.submitButton} type="submit">
          {modalEvent ? 'Update Event' : 'Add Event'}
        </button>
      </div>
    </form>
  );
};

export default memo(EventForm);
