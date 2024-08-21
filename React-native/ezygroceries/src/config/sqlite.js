import db from './database';

/** Function to create tables */
export const createTable = (tableName, fields) => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      console.log(
        '---------',
        `CREATE TABLE IF NOT EXISTS ${tableName} (${fields});`,
      );
      txn.executeSql(
        `CREATE TABLE IF NOT EXISTS ${tableName} (${fields});`,
        [],
        (tx, result) => {
          console.log('-----result--create----', result.rows);
          resolve(result);
        },
        error => {
          console.log('---eror-create---', error);
          reject(error);
        },
      );
    });
  });
};

/** Function to alter table */
export const alterTable = {
  newColumn: (table, column_name, coloumn_type) => {
    return new Promise((resolve, reject) => {
      db.transaction(txn => [
        txn.executeSql(
          `ALTER TABLE ${table} ADD COLUMN ${column_name} ${coloumn_type}`,
          [],
          (tx, results) => {
            resolve(results);
          },
          err => {
            reject(err);
          },
        ),
      ]);
    });
  },
  deleteColumn: (table, column_name) => {
    return new Promise((resolve, reject) => {
      db.transaction(txn => [
        txn.executeSql(
          `ALTER TABLE ${table} DROP COLUMN ${column_name}`,
          [],
          (tx, results) => {
            resolve(results);
          },
          err => {
            reject(err);
          },
        ),
      ]);
    });
  },
};

/** Function to delete tables */
export const deleteTable = tableName => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => [
      txn.executeSql(
        `DROP TABLE IF EXISTS ${tableName};`,
        (tx, result) => {
          console.log('---result-delete--', result);
          resolve(result);
        },
        err => {
          console.log('---err-delete---', err);
          reject(err);
        },
      ),
    ]);
  });
};

/** Function to insert records */
export const insertRecord = (tableName, fields, values) => {
  return new Promise((resolve, reject) => {
    db.transaction(txn => {
      try {
        txn.executeSql(
          `INSERT INTO  ${tableName} (${fields}) values (${setValue(
            values.length,
          )})`,
          values,
          (tx, result) => {
            console.log('--- result--insert--', result);
            resolve(res);
          },
          err => {
            console.log('---err insert-', err);
            reject(err);
          },
        );
      } catch (err) {
        console.log('---err---', err);
      }
    });
  });
};

/** Function to select records */
export const selectRecord = (
  table,
  fields = '*',
  whereAttribute = null,
  values,
) => {
  return new Promise((resolve, reject) => {
    if (whereAttribute) {
      db.transaction(
        `SELECT ${fields} FROM ${table} WHERE ${whereAttribute}`,
        values,
        (tx, result) => {
          console.log('-----result select where ----', result.rows);
          resolve(result.rows);
        },
        err => {
          console.log('-----select where error -----', err);
          reject(err);
        },
      );
    } else {
      db.transaction(
        `SELECT ${fields} FROM ${table}`,
        [],
        (tx, result) => {
          console.log('-----result select  ----', result.rows);
          resolve(result.rows);
        },
        err => {
          console.log('-----select  error -----', err);
          reject(err);
        },
      );
    }
  });
};

/** Function to update records */

export const updateRecord = (table, fields, whereAttribute = null, values) => {
  return new Promise((resolve, reject) => {
    if (whereAttribute) {
      db.transaction(txn => {
        txn.executeSql(
          `UPDATE ${table} SET ${fieldSeparator(
            fields,
          )} WHERE ${whereAttribute}`,
          values,
          (tx, result) => {
            resolve(result);
          },
          err => {
            reject(err);
          },
        );
      });
    } else {
      db.transaction(txn => {
        txn.executeSql(
          `UPDATE ${table} SET ${fieldSeparator(fields)}`,
          values,
          (tx, result) => {
            resolve(result);
          },
          err => {
            reject(err);
          },
        );
      });
    }
  });
};

/** Function to delete records */
export const deleteRecord = (table, whereAttribute = null, values = []) => {
  return new Promise((resolve, reject) => {
    if (whereAttribute) {
      db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM ${table} WHERE ${whereAttribute}`,
          values,
          (tx, result) => {
            resolve(result);
          },
          err => {
            reject(err);
          },
        );
      });
    } else {
      db.transaction(txn => {
        txn.executeSql(
          `DELETE FROM ${table}`,
          values,
          (tx, result) => {
            resolve(result);
          },
          err => {
            reject(err);
          },
        );
      });
    }
  });
};

/** Common functiosn for database use  */

const fieldSeparator = fields => {
  const newFields = '';
  newFields = fields.split(',').join(' = ?, ') + '= ?';
  return newFields;
};

const setValue = length => {
  let valueAttribute = '?,';
  valueAttribute = valueAttribute.repeat(length - 1) + '?';
  console.log('---------ssas--------', valueAttribute);
  return valueAttribute;
};
