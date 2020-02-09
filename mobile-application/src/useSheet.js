import React, { useState, useEffect } from 'react';
import { google } from 'googleapis';
import credentials from './credentials.json';

const client = new google.auth.JWT(credentials.client_email, '', credentials.private_key, ['https://www.googleapis.com/auth/spreadsheets']);
const sheets = google.sheets('v4');

function useSheet(range) {
	const [value, setValue] = useState([]);

	useEffect(() => {
		getData();
	}, []);

	async function getData() {
		const response = await sheets.spreadsheets.values.get(
      {
          auth: client,
          spreadsheetId: credentials.sheet_id,
          range,
          majorDimension: 'ROWS'
      },
    );
		console.log('request done');
		// const values = res.data.values;
		// 	const rows = [];
		// 	for (let i = 1; i < values.length; i++) {
		// 		let row = {};
		// 		for (let j = 0; j < values[0].length; j++) {
		// 			if (values[i][j] === undefined) {
		// 				row[values[0][j]] = '' 
		// 			} else {
		// 				if (values[0][j] === 'id') row[values[0][j]] = parseInt(values[i][j]);
		// 				else row[values[0][j]] = ((values[0][j] === 'tags' || values[0][j] === 'ingredients') ? values[i][j].split(', ') : values[i][j]);
		// 			}
		// 		}
		// 		rows.push(row);
		// 	}
		setValue(response?.data?.values?.slice(1));
	}

	return value;
}

export default useSheet;
