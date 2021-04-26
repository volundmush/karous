const PerchDB = await import("./perchdb.js")
const Rhost = await import("./rhost.js")

const ansiYellow = "[1;38;5;184m"
const ansiReset = "[0m"

async function getLocalJs() {
	try {
		var gotLocalJs = await import("./local.js")
		return gotLocalJs
	} catch(e) {
		var defaultLocalJs = {
			database: {
				protocol: "http",
				hostname: "localhost",
				port: 5984,
				username: "karous",
				password: "karous"
			}
		}
		return defaultLocalJs
	}
}

const LocalJs = await getLocalJs()

async function main() {
	const perch = PerchDB.client(LocalJs.database)

	async function checkDatabase(name) {
		const db = perch.db(name)
		if(await db.exists()) {
		console.log(`${name} exists!`)
			return db
		}
		console.log(`${name} does not exist! Creating.`)
		await db.create()
		return db
	}

	const sheetsDb = await checkDatabase('karous-sheets')
	const templatesDb = await checkDatabase('karous-templates')

	var execscript
	try {
		execscript = Rhost.execscript()
	} catch(e) {
		console.log("Failed parsing Rhost execscript data")
		console.log(e)
		return
	}
	console.log(execscript)
}

await main()

// vim: syn=javascript
