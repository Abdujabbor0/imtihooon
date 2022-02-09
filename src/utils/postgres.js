const { Pool } = require('pg')

const pool = new Pool({
	connectionString: 'postgres://lptjcgae:X4U3Eh26FThwbQKb1ngVsXsMiQo-2VSx@john.db.elephantsql.com/lptjcgae'
	// host: 'john.db.elephantsql.com (john-01)',
  	// user: 'lptjcgae',
  	// password: 'X4U3Eh26FThwbQKb1ngVsXsMiQo-2VSx',
  	// database: 'lptjcgae'
})


async function fetch (query, ...params) {
	const client = await pool.connect()
	try {
		const { rows: [ row ] } = await client.query(query, params.length ? params : null)
		return row
	} catch(error) {
		throw error
	} finally {
		client.release()
	}
}


async function fetchAll (query, ...params) {
	const client = await pool.connect()
	try {
		const { rows } = await client.query(query, params.length ? params : null)
		return rows
	} catch(error) {
		throw error
	} finally {
		client.release()
	}
}


module.exports = {
	fetchAll,
	fetch
}