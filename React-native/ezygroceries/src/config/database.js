import SQLite from 'react-native-sqlite-storage'
import { db_name } from './application'

const db = SQLite.openDatabase(db_name, "1.0", db_name , 200000);

export {db as default}
