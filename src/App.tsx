import React, {useEffect, useState} from 'react';
import {loadRow, Row, updateRow} from "./client";

function App() {
  const [currentRow, setCurrentRow] = useState<Row | null | undefined>(null);
  const [formMessage, setFormMessage] = useState<string>('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = Number.parseInt(params.get('id') ?? '#', 10);

    if (isNaN(id)) {
      console.error('Invalid row');
      setCurrentRow(undefined);
    }

    async function load(): Promise<Row | null | undefined> {
      const { data, error } = await loadRow(id);

      if (error) {
        console.error(error);
      }

      return (
        error
          ? undefined
          : data[0] ?? undefined
      ) as any;
    }

    load()
      .then((data) => {
        setCurrentRow(data);
      });
  }, []);

  function update(
    event: React.ChangeEvent<HTMLInputElement>,
  ) {
    const propertyName = event.target.id as keyof Row;
    if (!currentRow) {
      return;
    }

    const newRow = {...currentRow};

    if (!propertyName) {
      return;
    }

    if (formMessage.length > 0) {
      setFormMessage('');
    }

    if (propertyName === 'id' || propertyName === 'score') {
      const value = parseInt(event.target.value, 10);
      if (!isNaN(value)) {
        newRow[propertyName] = value;
      }
    } else {
      newRow[propertyName] = event.target.value;
    }

    setCurrentRow(newRow);
  }

  async function submit() {
    setFormMessage('Updating, please wait');

    if (!currentRow) {
      return;
    }

    console.log(currentRow)

    const { data, error } = await updateRow(currentRow);

    if (error) {
      console.error(error);
      setFormMessage('Error occurred');
    } else {
      setFormMessage('Successfully updated!');
    }
  }

  if (currentRow === null) {
    return null;
  } else if (typeof currentRow === 'undefined') {
    return (
      <div>
        Row does not exist.
      </div>
    );
  } else {
    return (
      <div>
        <div>
          <label>First Name</label>
          <br/>
          <input
            id="first_name"
            type="text"
            value={currentRow.first_name}
            onChange={update}
          />
        </div>
        <div>
          <label>Last Name</label>
          <br/>
          <input
            id="last_name"
            type="text"
            value={currentRow.last_name}
            onChange={update}
          />
        </div>
        <div>
          <label>Score</label>
          <br/>
          <input
            id="score"
            type="number"
            value={currentRow.score}
            onChange={update}
          />
        </div>
        <button
          type="button"
          onClick={submit}>
          Update
        </button>
        <br />
        <span>
          {formMessage}
        </span>
      </div>
    );
  }
}

export default App;
