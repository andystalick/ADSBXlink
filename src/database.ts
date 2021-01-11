import sqlite3 from 'sqlite3';
import { open } from 'sqlite';

interface Row {
  icao: string;
}

const connect = () => {
  return open({
    filename: './database.db',
    driver: sqlite3.Database,
  });
};

export async function read(icao: string) {
  let results: any[] = [];
  try {
    const db = await connect();
    const query = 'SELECT icao FROM aircraft WHERE ';
    results = await db.all<Row[]>(query);
    return results;
  } catch (err) {
    console.log(err);
    return results;
  }
}

export async function create(icao: string) {
  try {
    const db = await connect();
    await db.run('INSERT INTO aircraft (icao) VALUES (?)', icao);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function remove(icao: string) {
  try {
    const db = await connect();
    await db.run('DELETE FROM aircraft WHERE icao = ?', icao);
    return true;
  } catch (err) {
    console.log(err);
    return false;
  }
}
