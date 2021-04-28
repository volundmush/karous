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
		print(`${name} exists!`)
			return db
		}
		print(`${name} does not exist! Creating.`)
		await db.create()
		return db
	}

	const sheetsDb = await checkDatabase('karous-sheets')
	const templatesDb = await checkDatabase('karous-templates')

	var environment
	try {
		environment = Rhost.environment()
	} catch(e) {
		print("Failed parsing Rhost execscript data")
		print(e)
		return
	}
	print(environment)
	print(Deno.args)
	print("ハイ")
}

await main()

// vim: syn=javascript
