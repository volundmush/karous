export function execscript() {
	var version = Deno.env.get('MUSH_VERSION')
	var playerRef = Deno.env.get('MUSH_PLAYER')
	var causeRef = Deno.env.get('MUSH_CAUSE')
	var callerRef = Deno.env.get('MUSH_CALLER')
	var ownerRef = Deno.env.get('MUSH_OWNER')
	var objIds = Deno.env.get('MUSH_OBJID').split(' ').filter(x => x != "")
	var playerFlags = Deno.env.get('MUSH_FLAGS').split(' ').filter(x => x != "")
	var playerToggles = Deno.env.get('MUSH_TOGGLES').split(' ').filter(x => x != "")
	var playerTotems = Deno.env.get('MUSH_TOTEMS').split(' ').filter(x => x != "")
	var ownerFlags = Deno.env.get('MUSH_OWNERFLAGS').split(' ').filter(x => x != "")
	var ownerToggles = Deno.env.get('MUSH_OWNERTOGGLES').split(' ').filter(x => x != "")
	var ownerTotems = Deno.env.get('MUSH_OWNERTOTEMS').split(' ').filter(x => x != "")
	var execscriptVars = Deno.env.get('MUSHL_VARS')

	var player = {
		dbref: playerRef.split(' ')[0],
		name: playerRef.split(' ')[1],
		objid: objIds[0],
		flags: playerFlags,
		toggles: playerToggles,
		totems: playerTotems
	}

	var cause = {
		dbref: causeRef.split(' ')[0],
		name: causeRef.split(' ')[1],
		objid: objIds[1]
	}

	var caller = {
		dbref: callerRef.split(' ')[0],
		name: callerRef.split(' ')[1],
		objid: objIds[2]
	}

	var owner = {
		dbref: ownerRef.split(' ')[0],
		name: ownerRef.split(' ')[1],
		objid: objIds[3],
		flags: ownerFlags,
		toggles: ownerToggles,
		totems: ownerTotems
	}

	var envObj = Deno.env.toObject()
	var registers = {}
	
	Object.keys(envObj).filter(key => key.match(/^MUSHN_/)).forEach(function(key) {
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
