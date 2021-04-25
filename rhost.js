export function execscript() {
	console.log(Deno.env)

	var version = Deno.env.get('MUSH_VERSION')
	var playerRef = Deno.env.get('MUSH_PLAYER')
	var causeRef = Deno.env.get('MUSH_CAUSE')
	var callerRef = Deno.env.get('MUSH_CALLER')
	var ownerRef = Deno.env.get('MUSH_OWNER')
	var objIds = Deno.env.get('MUSH_OBJID').split(' ')
	var playerFlags = Deno.env.get('MUSH_FLAGS').split(' ')
	var playerToggles = Deno.env.get('MUSH_TOGGLES').split(' ')
	var playerTotems = Deno.env.get('MUSH_TOTEMS').split(' ')
	var ownerFlags = Deno.env.get('MUSH_OWNERFLAGS').split(' ')
	var ownerToggles = Deno.env.get('MUSH_OWNERTOGGLES').split(' ')
	var ownerTotems = Deno.env.get('MUSH_OWNERTOTEMS').split(' ')
	var execscriptVars = Deno.env.get('MUSHL_VARS')

	var player = {
		dbref: playerRef,
		objid: objIds[0],
		flags: playerFlags,
		toggles: playerToggles,
		totems: playerTotems
	}

	var cause = {
		dbref: causeRef,
		objid: objIds[1]
	}

	var caller = {
		dbref: callerRef,
		objid: objIds[2]
	}

	var owner = {
		dbref: ownerRef,
		objid: objIds[3],
		flags: ownerFlags,
		toggles: ownerToggles,
		totems: ownerTotems
	}

	var envObj = Deno.env.toObject()
	var registers = {}
	
	envObj.keys().filter(key => /^MUSHN_/.match(key)).forEach(function(key) {
		var name = key.replace("MUSHN_", "")
		registers[name] = envObj[key]
	})

	return {
		player: player,
		cause: cause,
		caller: caller,
		owner: owner,
		registers: registers
	}
}
