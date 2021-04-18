export function client(opts) {
	var ret = {
		// "Public"
		opts: function() {
			return opts
		},
		rest: function(pathname, method = "GET", data = null) {
			var headers = new Headers()
			headers.append("Accept", "application/json")

			if(typeof data == "object") {
				data = JSON.stringify(data)
				headers.append("Content-Type", "application/json")
			} else {
				headers.append("Content-Type", "text/plain; charset=utf-8")
			}

			var url = this.optsURL()
			url.pathname = pathname

			return new Promise(async (resolve, reject) => {
				try {
					var ret = await fetch(url.toString(), {
						method: method,
						body: data,
						headers: headers
					})
					resolve(ret)
				} catch(e) {
					reject(e)
					return
				}
			})
		},

		db: function(dbname) {
			var client = this
			const status = function() {
				return client.rest(`/${dbname}`, 'HEAD')
			}

			const info = function() {
				return client.rest(`/${dbname}`, 'GET')
			}

			const exists = function() {
				return new Promise(async (resolve, reject) => {
					try {
						var st = await this.status()
					} catch(e) {
						reject(e)
						return
					}
					resolve(st.status != 404)
				})
			}

			const create = function() {
				return client.rest(`/${dbname}`, 'PUT')
			}

			var ret = {
				status: status,
				head: status,
				info: info,
				get: info,
				exists: exists,
				create: create,
				put: create
			}
			return ret
		},

		// "Private"
		optsURL: function() {
			const url = new URL('http://localhost:5984')
			url.protocol = opts.protocol || 'http'
			url.hostname = opts.hostname || 'localhost'
			url.port = opts.port || 5984
			url.username = opts.username
			url.password = opts.password
			return url
		},
	}
	return ret
}
