const PerchDB = await import("./perchdb.js")
const Rhost = await import("https://raw.githubusercontent.com/stevensmedia/deno-rhost/master/rhost.js")

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
		Rhost.print(`${name} exists!`)
			return db
		}
		Rhost.print(`${name} does not exist! Creating.`)
		await db.create()
		return db
	}

	const sheetsDb = await checkDatabase('karous-sheets')
	const templatesDb = await checkDatabase('karous-templates')

	var environment
	try {
		environment = Rhost.environment()
	} catch(e) {
		Rhost.print("Failed parsing Rhost execscript data")
		Rhost.print(e)
		return
	}
	Rhost.print(environment)
	Rhost.print(Deno.args)
	Rhost.print("ハイ")
}

await main()

// vim: syn=javascript
